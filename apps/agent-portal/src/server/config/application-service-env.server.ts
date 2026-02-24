import { z } from "zod";

export const APPLICATION_SERVICE_ENDPOINT_KEY = "APPLICATION_SERVICE_ENDPOINT" as const;
export const APPLICATION_SERVICE_API_KEY_KEY = "APPLICATION_SERVICE_API_KEY" as const;

export type ApplicationServiceEnv = {
  endpoint: URL;
  apiKey: string;
};

export type ApplicationServiceEnvIssue = {
  field: "APPLICATION_SERVICE_ENDPOINT" | "APPLICATION_SERVICE_API_KEY";
  reason: "missing" | "invalid";
};

const schema = z.object({
  endpoint: z.string().url(),
  apiKey: z.string().min(1),
});

export function parseApplicationServiceEnv(
  env: NodeJS.ProcessEnv = process.env,
):
  | { ok: true; value: ApplicationServiceEnv }
  | { ok: false; issues: ApplicationServiceEnvIssue[] } {
  const endpointRaw = env[APPLICATION_SERVICE_ENDPOINT_KEY];
  const apiKeyRaw = env[APPLICATION_SERVICE_API_KEY_KEY];

  const issues: ApplicationServiceEnvIssue[] = [];
  if (!endpointRaw) issues.push({ field: "APPLICATION_SERVICE_ENDPOINT", reason: "missing" });
  if (!apiKeyRaw) issues.push({ field: "APPLICATION_SERVICE_API_KEY", reason: "missing" });
  if (issues.length > 0) return { ok: false, issues };

  const parsed = schema.safeParse({ endpoint: endpointRaw, apiKey: apiKeyRaw });
  if (!parsed.success) {
    // Redact all values; report only which field failed.
    const endpointInvalid = parsed.error.issues.some((i) => i.path[0] === "endpoint");
    const apiKeyInvalid = parsed.error.issues.some((i) => i.path[0] === "apiKey");
    if (endpointInvalid) issues.push({ field: "APPLICATION_SERVICE_ENDPOINT", reason: "invalid" });
    if (apiKeyInvalid) issues.push({ field: "APPLICATION_SERVICE_API_KEY", reason: "invalid" });
    return { ok: false, issues };
  }

  return { ok: true, value: { endpoint: new URL(parsed.data.endpoint), apiKey: parsed.data.apiKey } };
}

