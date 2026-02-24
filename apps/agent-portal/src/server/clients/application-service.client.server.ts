import { getApplicationServiceConfig } from "@/server/config";
import { applicationServiceConfigErrorToPortalError } from "@/server/config/config-errors.server";

export type ApplicationServiceRequest = {
  /**
   * Absolute path starting with `/` relative to the configured service endpoint.
   */
  path: `/${string}`;
  init?: Omit<RequestInit, "headers"> & { headers?: HeadersInit };
};

/**
 * Minimal service client wrapper.
 *
 * Notes:
 * - Server-only; never import into client components.
 * - Fails closed if required config is missing/invalid.
 * - API key is applied as a header; never returned to callers.
 */
export async function applicationServiceFetch(input: ApplicationServiceRequest): Promise<Response> {
  const configResult = getApplicationServiceConfig();
  if (!configResult.ok) {
    // Fail closed: callers must handle config errors explicitly at the boundary.
    throw applicationServiceConfigErrorToPortalError(configResult.error);
  }

  const url = new URL(input.path, configResult.value.endpoint);

  const headers = new Headers(input.init?.headers);
  headers.set("x-api-key", configResult.value.apiKey);

  return fetch(url, {
    ...input.init,
    headers,
  });
}

