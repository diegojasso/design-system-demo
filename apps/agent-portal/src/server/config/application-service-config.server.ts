import { track, events } from "@novo/analytics";

import { getEnvironmentId } from "./environment-id.server";
import { parseApplicationServiceEnv } from "./application-service-env.server";
import type { ApplicationServiceConfiguration, EnvironmentId } from "./types.server";

export type ApplicationServiceConfigError = {
  code: "APPLICATION_SERVICE_CONFIG_INVALID";
  environmentId: EnvironmentId;
  invalidFields: Array<"APPLICATION_SERVICE_ENDPOINT" | "APPLICATION_SERVICE_API_KEY">;
};

export function getApplicationServiceConfig(
  env: NodeJS.ProcessEnv = process.env,
):
  | { ok: true; value: ApplicationServiceConfiguration }
  | { ok: false; error: ApplicationServiceConfigError } {
  const envId = getEnvironmentId(env);

  track(events.portalConfigEvents.applicationServiceEnvironmentSelected, {
    environmentId: envId.environmentId,
  });

  if (envId.didFallback) {
    track(events.portalConfigEvents.applicationServiceFallbackUsed, {
      environmentId: envId.environmentId,
      reason: envId.reason,
    });
  }

  const parsed = parseApplicationServiceEnv(env);
  if (!parsed.ok) {
    const invalidFields = parsed.issues.map((i) => i.field);

    track(events.portalConfigEvents.applicationServiceConfigInvalid, {
      environmentId: envId.environmentId,
      invalidFields,
    });

    return {
      ok: false,
      error: {
        code: "APPLICATION_SERVICE_CONFIG_INVALID",
        environmentId: envId.environmentId,
        invalidFields,
      },
    };
  }

  return {
    ok: true,
    value: {
      environmentId: envId.environmentId,
      endpoint: parsed.value.endpoint,
      apiKey: parsed.value.apiKey,
    },
  };
}

