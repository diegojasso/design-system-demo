export type TrackProperties = Readonly<Record<string, unknown>>;

/**
 * Placeholder analytics entrypoint.
 *
 * IMPORTANT: Must remain secret-safe by default:
 * - Do not log arbitrary properties.
 * - Do not send network requests from here without a vetted allowlist.
 */
export function track(_eventName: string, _properties?: TrackProperties): void {
  // no-op (intentionally)
}

