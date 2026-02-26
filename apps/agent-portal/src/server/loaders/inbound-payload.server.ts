export type EncodedPayloadError =
  | { code: "ENCODED_PAYLOAD_MISSING" }
  | { code: "ENCODED_PAYLOAD_INVALID" };

export function extractEncodedPayloadFromSearch(
  search: string,
): { ok: true; value: string } | { ok: false; error: EncodedPayloadError } {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  if (!raw) return { ok: false, error: { code: "ENCODED_PAYLOAD_MISSING" } };

  // Inbound links in this flow use the encoded payload as the full querystring (no `key=value` pairs).
  // If multiple query params exist, it is not a valid encoded payload for this feature.
  if (raw.includes("&")) return { ok: false, error: { code: "ENCODED_PAYLOAD_INVALID" } };

  // Be tolerant of internal usage that passes `encodedPayload=<token>`.
  if (raw.startsWith("encodedPayload=")) {
    const params = new URLSearchParams(raw);
    const value = params.get("encodedPayload");
    if (!value) return { ok: false, error: { code: "ENCODED_PAYLOAD_MISSING" } };
    return { ok: true, value };
  }

  return { ok: true, value: raw };
}

