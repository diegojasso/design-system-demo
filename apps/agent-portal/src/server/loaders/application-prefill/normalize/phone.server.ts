import type { JsonPath, JsonRecord } from "../upstream-schema.server";
import { getArrayAt, getFirstObjectArray, optionalString } from "../upstream-schema.server";

function pickPhoneNumber(rec: JsonRecord): string | undefined {
  return (
    optionalString(rec, ["number"]) ??
    optionalString(rec, ["phone"]) ??
    optionalString(rec, ["value"]) ??
    optionalString(rec, ["phone_number"]) ??
    optionalString(rec, ["phoneNumber"])
  );
}

function isMobilePhone(rec: JsonRecord): boolean {
  const t = (optionalString(rec, ["type"]) ?? optionalString(rec, ["phone_type"]) ?? "").toLowerCase();
  return t.includes("mobile") || t.includes("cell");
}

export function optionalFirstPhoneFromArray(root: JsonRecord, path: JsonPath): string | undefined {
  const arr = getArrayAt(root, path);
  if (!arr) return undefined;

  const rows = getFirstObjectArray(arr);
  if (!rows.length) return undefined;

  const mobile = rows.find(isMobilePhone);
  return (mobile ? pickPhoneNumber(mobile) : undefined) ?? rows.map(pickPhoneNumber).find(Boolean);
}

