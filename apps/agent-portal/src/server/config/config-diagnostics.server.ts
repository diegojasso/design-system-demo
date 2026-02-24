import type { ApplicationServiceConfiguration, EnvironmentId } from "./types.server";
import type { ApplicationServiceConfigError } from "./application-service-config.server";

export type ApplicationServiceConfigDiagnostics = {
  environmentId: EnvironmentId;
  configValid: boolean;
  endpointOrigin?: string;
  invalidFields?: Array<"APPLICATION_SERVICE_ENDPOINT" | "APPLICATION_SERVICE_API_KEY">;
};

export function buildDiagnosticsFromConfig(
  config: ApplicationServiceConfiguration,
): ApplicationServiceConfigDiagnostics {
  return {
    environmentId: config.environmentId,
    configValid: true,
    endpointOrigin: config.endpoint.origin,
  };
}

export function buildDiagnosticsFromError(
  error: ApplicationServiceConfigError,
): ApplicationServiceConfigDiagnostics {
  return {
    environmentId: error.environmentId,
    configValid: false,
    invalidFields: error.invalidFields,
  };
}

