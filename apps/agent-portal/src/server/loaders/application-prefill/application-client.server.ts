import { createApplicationApiClient } from "@novo/api-client";

import { getApplicationServiceConfig } from "@/server/config";
import { applicationServiceConfigErrorToPortalError } from "@/server/config/config-errors.server";

function getDebugLoggingConfig() {
  return {
    enabled:
      process.env.APPLICATION_API_DEBUG_LOG === "1" ||
      process.env.APPLICATION_API_DEBUG_LOG === "true",
    level: (process.env.APPLICATION_API_DEBUG_LOG_LEVEL as any) ?? "basic",
    allowUnsafeBodyLogging:
      process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "1" ||
      process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "true",
  };
}

export function createApplicationClientOrThrow() {
  const configResult = getApplicationServiceConfig();
  if (!configResult.ok) {
    throw applicationServiceConfigErrorToPortalError(configResult.error);
  }

  return createApplicationApiClient({
    baseUrl: configResult.value.endpoint.toString(),
    apiKey: configResult.value.apiKey,
    debugLogging: getDebugLoggingConfig(),
  });
}

