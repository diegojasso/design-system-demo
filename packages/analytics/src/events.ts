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

export const portalPrefillEvents = {
  initialLoadStarted: "portal.prefill.initial_load.started",
  initialLoadSucceeded: "portal.prefill.initial_load.succeeded",
  initialLoadFailed: "portal.prefill.initial_load.failed",
  initialLoadAccessDenied: "portal.prefill.initial_load.access_denied",
} as const;

export type PortalPrefillEventName =
  (typeof portalPrefillEvents)[keyof typeof portalPrefillEvents];

export const portalPricingEvents = {
  recalcClicked: "portal.pricing.recalc.clicked",
  recalcSucceeded: "portal.pricing.recalc.succeeded",
  recalcFailed: "portal.pricing.recalc.failed",
} as const;

export type PortalPricingEventName =
  (typeof portalPricingEvents)[keyof typeof portalPricingEvents];

