import axios, { type AxiosInstance } from "axios";
import { inspect } from "node:util";

export type CreateAxiosInput = {
  baseUrl: string;
  timeoutMs?: number;
  headers?: Readonly<Record<string, string>>;
  debugLogging?: {
    enabled: boolean;
    tag: string;
    level?: "basic" | "full";
    /**
     * When true, response bodies are logged as-is (may include PII).
     * Prefer leaving this false and relying on redaction.
     */
    allowUnsafeBodyLogging?: boolean;
  };
};

function nowIso(): string {
  return new Date().toISOString();
}

function redact(value: unknown): unknown {
  const SENSITIVE_KEY =
    /(^|_)(api[-_]?key|authorization|token|secret|password|email|phone|firstName|lastName|dob|dateOfBirth|address|ssn|license|vin)($|_)/i;

  if (value === null || value === undefined) return value;
  if (typeof value === "string") return value.length > 500 ? `${value.slice(0, 500)}…` : value;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) return value.map(redact);

  const obj = value as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = SENSITIVE_KEY.test(k) ? "[REDACTED]" : redact(v);
  }
  return out;
}

function formatForLog(value: unknown): string {
  return inspect(value, {
    depth: null,
    colors: false,
    maxArrayLength: 200,
    maxStringLength: 5000,
    breakLength: 120,
    compact: false,
  });
}

export function createAxios(input: CreateAxiosInput): AxiosInstance {
  const instance = axios.create({
    baseURL: input.baseUrl,
    timeout: input.timeoutMs ?? 15000,
    headers: {
      accept: "application/json",
      ...input.headers,
    },
  });

  if (input.debugLogging?.enabled) {
    const tag = input.debugLogging.tag;
    const level = input.debugLogging.level ?? "basic";
    const allowUnsafeBodyLogging = Boolean(input.debugLogging.allowUnsafeBodyLogging);

    instance.interceptors.request.use((config) => {
      (config as any).__novoStartTimeMs = Date.now();

      const url = config.url ?? "";
      const paramsKeys =
        config.params && typeof config.params === "object"
          ? Object.keys(config.params as Record<string, unknown>)
          : [];

      const base = {
        ts: nowIso(),
        method: (config.method ?? "get").toUpperCase(),
        url,
      };

      if (level === "full") {
        const payload = {
          ...base,
          baseURL: config.baseURL,
          params: redact(config.params),
          headers: redact(config.headers),
          data: redact(config.data),
        };
        console.info(`[${tag}] request ${formatForLog(payload)}`);
      } else {
        const payload = {
          ...base,
          paramsKeys,
        };
        console.info(`[${tag}] request ${formatForLog(payload)}`);
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => {
        const start = (response.config as any).__novoStartTimeMs as number | undefined;
        const durationMs = typeof start === "number" ? Date.now() - start : undefined;

        const base = {
          ts: nowIso(),
          method: (response.config.method ?? "get").toUpperCase(),
          url: response.config.url ?? "",
          status: response.status,
          durationMs,
        };

        if (level === "full") {
          const payload = {
            ...base,
            headers: redact(response.headers),
            data: allowUnsafeBodyLogging ? response.data : redact(response.data),
          };
          console.info(`[${tag}] response ${formatForLog(payload)}`);
        } else {
          console.info(`[${tag}] response ${formatForLog(base)}`);
        }

        return response;
      },
      (error) => {
        const anyErr = error as any;
        const config = anyErr?.config as any;
        const start = config?.__novoStartTimeMs as number | undefined;
        const durationMs = typeof start === "number" ? Date.now() - start : undefined;

        const base = {
          ts: nowIso(),
          method: (config?.method ?? "get").toUpperCase(),
          url: config?.url ?? "",
          status: anyErr?.response?.status ?? null,
          code: anyErr?.code ?? null,
          durationMs,
        };

        if (level === "full") {
          const payload = {
            ...base,
            responseHeaders: redact(anyErr?.response?.headers),
            responseData: allowUnsafeBodyLogging ? anyErr?.response?.data : redact(anyErr?.response?.data),
          };
          console.info(`[${tag}] response_error ${formatForLog(payload)}`);
        } else {
          console.info(`[${tag}] response_error ${formatForLog(base)}`);
        }

        return Promise.reject(error);
      },
    );
  }

  return instance;
}

