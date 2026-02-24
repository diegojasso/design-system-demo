/**
 * Standardized event names for the Agent Portal.
 *
 * Note: This package must not encode business copy or secrets.
 */
export const portalConfigEvents = {
  applicationServiceEnvironmentSelected: "portal.config.application_service.environment_selected",
  applicationServiceFallbackUsed: "portal.config.application_service.fallback_used",
  applicationServiceConfigInvalid: "portal.config.application_service.config_invalid",
} as const;

export type PortalConfigEventName =
  (typeof portalConfigEvents)[keyof typeof portalConfigEvents];

