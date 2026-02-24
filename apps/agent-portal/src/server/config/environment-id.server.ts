import { z } from "zod";

import { environmentIds, type EnvironmentId } from "./types.server";

export const APPLICATION_ENV_KEY = "APPLICATION_ENV" as const;

export type EnvironmentIdResolution = {
  environmentId: EnvironmentId;
  didFallback: boolean;
  reason?: "missing" | "unrecognized";
};

const envIdSchema = z.enum(environmentIds);

export function getEnvironmentId(env: NodeJS.ProcessEnv = process.env): EnvironmentIdResolution {
  const raw = env[APPLICATION_ENV_KEY];

  if (!raw) {
    return { environmentId: "dev", didFallback: true, reason: "missing" };
  }

  const parsed = envIdSchema.safeParse(raw);
  if (!parsed.success) {
    return { environmentId: "dev", didFallback: true, reason: "unrecognized" };
  }

  return { environmentId: parsed.data, didFallback: false };
}

