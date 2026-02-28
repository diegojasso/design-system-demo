export type JsonRecord = Record<string, unknown>;
export type JsonPath = ReadonlyArray<string>;

export function asRecord(value: unknown): JsonRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

export function getFirstObjectArray(value: unknown): JsonRecord[] {
  if (!Array.isArray(value)) return [];
  return value.map(asRecord).filter(Boolean) as JsonRecord[];
}

export class UpstreamSchemaError extends Error {
  readonly code = "UPSTREAM_SCHEMA_MISMATCH";
  readonly missingPaths: string[];

  constructor(missingPaths: string[]) {
    super("Upstream response shape was unexpected.");
    this.name = "UpstreamSchemaError";
    this.missingPaths = missingPaths;
  }
}

export function pathToString(path: JsonPath): string {
  return `$${path.length ? "." : ""}${path.join(".")}`;
}

export function getRecordAt(root: JsonRecord, path: JsonPath): JsonRecord | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return asRecord(cur);
}

export function getStringAt(root: JsonRecord, path: JsonPath): string | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return typeof cur === "string" ? cur : null;
}

export function getArrayAt(root: JsonRecord, path: JsonPath): unknown[] | null {
  let cur: unknown = root;
  for (const key of path) {
    const rec = asRecord(cur);
    if (!rec) return null;
    cur = rec[key];
  }
  return Array.isArray(cur) ? cur : null;
}

export function requiredString(root: JsonRecord, path: JsonPath, missing: string[]): string {
  const v = getStringAt(root, path);
  if (typeof v === "string" && v.trim().length > 0) return v;
  missing.push(pathToString(path));
  return "";
}

export function optionalString(root: JsonRecord, path: JsonPath): string | undefined {
  const v = getStringAt(root, path);
  return typeof v === "string" ? v : undefined;
}

