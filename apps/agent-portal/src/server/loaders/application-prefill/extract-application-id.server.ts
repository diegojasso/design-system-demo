import type { ApplicationV2Response } from "@novo/api-client";

export function extractApplicationId(value: ApplicationV2Response): string | null {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;
  const direct = v["applicationId"] ?? v["application_id"] ?? v["id"] ?? v["applicationID"];
  return typeof direct === "string" && direct.trim() ? direct : null;
}

