export type InboundLinkPayload = {
  policyId: string;
  agentId?: string;
  agent?: boolean;
  channel?: string;
  partner?: string;
  timeStamp?: string;
  otherFields: Readonly<Record<string, string>>;
};

export type DecodeInboundPayloadError =
  | { code: "INBOUND_PAYLOAD_DECODE_FAILED" }
  | { code: "INBOUND_PAYLOAD_INVALID"; reason: "missing_policy_id" | "empty" };

function normalizeBase64(input: string): string {
  const trimmed = input.trim();
  const b64 = trimmed.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (b64.length % 4)) % 4;
  return b64 + "=".repeat(padding);
}

export function decodeInboundPayload(
  encodedPayload: string,
): { ok: true; value: InboundLinkPayload } | { ok: false; error: DecodeInboundPayloadError } {
  if (!encodedPayload.trim()) {
    return { ok: false, error: { code: "INBOUND_PAYLOAD_INVALID", reason: "empty" } };
  }

  let decoded: string;
  try {
    decoded = Buffer.from(normalizeBase64(encodedPayload), "base64").toString("utf8");
  } catch {
    return { ok: false, error: { code: "INBOUND_PAYLOAD_DECODE_FAILED" } };
  }

  const params = new URLSearchParams(decoded);
  const policyId = params.get("policyId")?.trim();
  if (!policyId) {
    return { ok: false, error: { code: "INBOUND_PAYLOAD_INVALID", reason: "missing_policy_id" } };
  }

  const otherFields: Record<string, string> = {};
  params.forEach((value, key) => {
    otherFields[key] = value;
  });

  const agentRaw = params.get("agent");
  const agent =
    agentRaw === null
      ? undefined
      : agentRaw === "true"
        ? true
        : agentRaw === "false"
          ? false
          : undefined;

  return {
    ok: true,
    value: {
      policyId,
      agentId: params.get("agentId") ?? undefined,
      agent,
      channel: params.get("channel") ?? undefined,
      partner: params.get("partner") ?? undefined,
      timeStamp: params.get("timeStamp") ?? undefined,
      otherFields,
    },
  };
}

