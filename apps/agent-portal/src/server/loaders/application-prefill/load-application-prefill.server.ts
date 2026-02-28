import type { ApplicationV2Response } from "@novo/api-client";

import { buildApplicationPrefillViewModels } from "@/shared/application-prefill-vm";
import { decodeInboundPayload } from "../decode-inbound-payload.server";

import type { ApplicationPrefillError, ApplicationPrefillResponse } from "./types.server";
import { createApplicationClientOrThrow } from "./application-client.server";
import { extractApplicationId } from "./extract-application-id.server";
import { normalizeApplication } from "./normalize/application.server";
import { UpstreamSchemaError } from "./upstream-schema.server";
import { getAxiosCode, getAxiosStatus, isAxiosStatus, ts } from "./upstream-errors.server";

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; error: E };

function toMalformedPayloadError(): Err<ApplicationPrefillError> {
  return {
    ok: false,
    error: { status: 400, code: "MALFORMED_PAYLOAD", message: "Invalid or malformed encoded payload." },
  };
}

function withUpstreamContext(
  viewModels: ReturnType<typeof buildApplicationPrefillViewModels>,
  input: { partner?: string; source: "agent" | "consumer" },
): ReturnType<typeof buildApplicationPrefillViewModels> {
  const participationOption = ["TERM_ADJUST", "MONTHLY_ADJUST", "DATA_SHARE_ONLY"];
  if (!input.partner) return viewModels;
  return { ...viewModels, upstreamContext: { partner: input.partner, source: input.source, participationOption } };
}

function logSchemaMismatch(error: UpstreamSchemaError) {
  console.error("Prefill upstream schema mismatch", { ts: ts(), missingPaths: error.missingPaths });
}

function handleError(error: unknown, messages: { upstreamError: string; unreachable: string }): Err<ApplicationPrefillError> {
  if (error instanceof UpstreamSchemaError) {
    logSchemaMismatch(error);
    return {
      ok: false,
      error: { status: 500, code: "UPSTREAM_SCHEMA_MISMATCH", message: "Upstream response shape was unexpected." },
    };
  }

  const status = getAxiosStatus(error);
  const axiosCode = getAxiosCode(error);

  if (isAxiosStatus(error, [401, 403])) {
    return { ok: false, error: { status: 403, code: "ACCESS_DENIED", message: "Access denied." } };
  }

  if (status === 429) {
    return { ok: false, error: { status: 429, code: "RATE_LIMITED", message: "Rate limited. Please retry." } };
  }

  if (status === null && (axiosCode === "ENOTFOUND" || axiosCode === "ECONNREFUSED" || axiosCode === "EAI_AGAIN")) {
    console.error("Prefill upstream unreachable", { ts: ts(), axiosCode });
    return { ok: false, error: { status: 500, code: "UPSTREAM_UNREACHABLE", message: messages.unreachable } };
  }

  if (status !== null) {
    console.error("Prefill upstream error", { ts: ts(), status });
    return { ok: false, error: { status: 500, code: "UPSTREAM_ERROR", message: messages.upstreamError } };
  }

  console.error("Prefill unexpected error", { ts: ts(), axiosCode });
  return {
    ok: false,
    error: { status: 500, code: "INTERNAL_ERROR", message: "Unexpected error loading application." },
  };
}

async function fetchApplicationByQuoteId(quoteId: string): Promise<{ applicationRaw: ApplicationV2Response; applicationId: string }> {
  const client = createApplicationClientOrThrow();
  const lookup = await client.getApplicationV2({ quoteId });
  const applicationId = extractApplicationId(lookup) ?? quoteId;
  const applicationRaw = await client.getApplicationById({ applicationId });
  return { applicationRaw, applicationId };
}

export async function loadApplicationPrefill(input: {
  encodedPayload: string;
  currentDraftId?: string;
}): Promise<Ok<ApplicationPrefillResponse> | Err<ApplicationPrefillError>> {
  const decoded = decodeInboundPayload(input.encodedPayload);
  if (!decoded.ok) return toMalformedPayloadError();

  const quoteId = decoded.value.policyId;
  const partner =
    decoded.value.partner ??
    (typeof decoded.value.otherFields["partner"] === "string" ? decoded.value.otherFields["partner"] : undefined);
  const source: "agent" | "consumer" = decoded.value.agent ? "agent" : "consumer";

  try {
    const { applicationRaw, applicationId } = await fetchApplicationByQuoteId(quoteId);
    const application = normalizeApplication(applicationRaw, { quoteId, applicationId });

    const baseViewModels = buildApplicationPrefillViewModels(application);
    const viewModels = withUpstreamContext(baseViewModels, { partner, source });

    const replaceLocalDraft = Boolean(input.currentDraftId && input.currentDraftId !== quoteId);
    return { ok: true, value: { quoteId, applicationId, replaceLocalDraft, viewModels } };
  } catch (error) {
    return handleError(error, {
      upstreamError: "Failed to load application from the insurance service.",
      unreachable: "Unable to reach the insurance service.",
    });
  }
}

export async function loadApplicationPrefillByQuoteId(input: {
  quoteId: string;
  currentDraftId?: string;
}): Promise<Ok<ApplicationPrefillResponse> | Err<ApplicationPrefillError>> {
  const quoteId = input.quoteId;

  try {
    const { applicationRaw, applicationId } = await fetchApplicationByQuoteId(quoteId);
    const application = normalizeApplication(applicationRaw, { quoteId, applicationId });
    const viewModels = buildApplicationPrefillViewModels(application);

    const replaceLocalDraft = Boolean(input.currentDraftId && input.currentDraftId !== quoteId);
    return { ok: true, value: { quoteId, applicationId, replaceLocalDraft, viewModels } };
  } catch (error) {
    return handleError(error, {
      upstreamError: "Upstream service error.",
      unreachable: "Upstream service unreachable.",
    });
  }
}

