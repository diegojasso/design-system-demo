import type { buildApplicationPrefillViewModels } from "@/shared/application-prefill-vm";

export type ApplicationPrefillResponse = {
  quoteId: string;
  applicationId: string;
  replaceLocalDraft: boolean;
  viewModels: ReturnType<typeof buildApplicationPrefillViewModels>;
};

export type ApplicationPrefillError =
  | { status: 400; code: "MALFORMED_PAYLOAD"; message: string }
  | { status: 403; code: "ACCESS_DENIED"; message: string }
  | { status: 429; code: "RATE_LIMITED"; message: string }
  | { status: 500; code: "UPSTREAM_UNREACHABLE"; message: string }
  | { status: 500; code: "UPSTREAM_ERROR"; message: string }
  | { status: 500; code: "UPSTREAM_SCHEMA_MISMATCH"; message: string }
  | { status: 500; code: "INTERNAL_ERROR"; message: string };

