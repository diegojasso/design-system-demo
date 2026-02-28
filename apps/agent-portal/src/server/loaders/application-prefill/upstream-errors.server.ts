export function isAxiosStatus(error: unknown, statuses: number[]): boolean {
  const anyErr = error as any;
  const status = anyErr?.response?.status;
  return typeof status === "number" && statuses.includes(status);
}

export function getAxiosStatus(error: unknown): number | null {
  const anyErr = error as any;
  const status = anyErr?.response?.status;
  return typeof status === "number" ? status : null;
}

export function getAxiosCode(error: unknown): string | null {
  const anyErr = error as any;
  const code = anyErr?.code;
  return typeof code === "string" ? code : null;
}

export function ts(): string {
  return new Date().toISOString();
}

