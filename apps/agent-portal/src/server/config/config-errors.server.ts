import type { ApplicationServiceConfigError } from "./application-service-config.server";

export type PortalSafeError = {
  code: string;
  details?: Readonly<Record<string, unknown>>;
};

/**
 * Portal-safe error for server-side boundaries.
 *
 * Requirements:
 * - no secrets in message/details
 * - safe to serialize for diagnostic endpoints
 */
export class PortalConfigError extends Error {
  readonly code: string;
  readonly details?: Readonly<Record<string, unknown>>;

  constructor(input: { code: string; details?: Readonly<Record<string, unknown>> }) {
    super(input.code);
    this.name = "PortalConfigError";
    this.code = input.code;
    this.details = input.details;
  }

  toPublic(): PortalSafeError {
    return { code: this.code, details: this.details };
  }
}

export function applicationServiceConfigErrorToPortalError(
  error: ApplicationServiceConfigError,
): PortalConfigError {
  return new PortalConfigError({
    code: error.code,
    details: {
      environmentId: error.environmentId,
      invalidFields: error.invalidFields,
    },
  });
}

