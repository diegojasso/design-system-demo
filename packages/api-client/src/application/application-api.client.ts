import type { AxiosInstance } from "axios";

import { createAxios } from "../http/create-axios";
import { retry } from "../http/retry";
import type { ApplicationQuoteResponse, ApplicationV2Response } from "./types";

export type ApplicationApiClientConfig = {
  baseUrl: string;
  apiKey: string;
  timeoutMs?: number;
  debugLogging?: {
    enabled: boolean;
    level?: "basic" | "full";
    allowUnsafeBodyLogging?: boolean;
  };
};

export type ApplicationApiClient = {
  getApplicationV2: (input: { quoteId: string }) => Promise<ApplicationV2Response>;
  getApplicationById: (input: { applicationId: string }) => Promise<ApplicationV2Response>;
  /**
   * Calculate (or re-calculate) quote plans/pricing for an application.
   *
   * Observed in UAT:
   * - POST /application/v2/{application_uuid}/quote
   */
  calculateQuote: (input: {
    applicationId: string;
    partner: string;
    source: "agent" | "consumer";
    participationOption: string[];
  }) => Promise<ApplicationQuoteResponse>;
};

/**
 * Application API client intended for server-side usage.
 *
 * Callers must provide `apiKey` from server-only environment variables.
 */
export function createApplicationApiClient(config: ApplicationApiClientConfig): ApplicationApiClient {
  const http: AxiosInstance = createAxios({
    baseUrl: config.baseUrl,
    timeoutMs: config.timeoutMs,
    headers: { "x-api-key": config.apiKey },
    debugLogging: {
      enabled: Boolean(config.debugLogging?.enabled),
      tag: "application-api",
      level: config.debugLogging?.level,
      allowUnsafeBodyLogging: config.debugLogging?.allowUnsafeBodyLogging,
    },
  });

  const shouldRetry = (error: unknown): boolean => {
    const anyErr = error as any;
    const status = anyErr?.response?.status;
    const code = anyErr?.code;
    if (code === "ECONNABORTED" || code === "ETIMEDOUT") return true;
    if (typeof status === "number" && (status === 429 || status >= 500)) return true;
    return false;
  };

  return {
    async getApplicationV2({ quoteId }) {
      return retry(
        async () => {
          const response = await http.get<ApplicationV2Response>("/application/v2", {
            params: { quote_id: quoteId },
          });
          return response.data;
        },
        { maxRetries: 2, shouldRetry },
      );
    },
    async getApplicationById({ applicationId }) {
      return retry(
        async () => {
          const response = await http.get<ApplicationV2Response>(`/application/v2/${applicationId}`);
          return response.data;
        },
        { maxRetries: 2, shouldRetry },
      );
    },
    async calculateQuote({ applicationId, partner, source, participationOption }) {
      return retry(
        async () => {
          const response = await http.post<ApplicationQuoteResponse>(
            `/application/v2/${applicationId}/quote`,
            {
              participation_option: participationOption,
              partner,
              source,
            },
          );
          return response.data;
        },
        { maxRetries: 2, shouldRetry },
      );
    },
  };
}

