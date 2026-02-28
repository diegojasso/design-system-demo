export type ApplicationV2Response = {
  [key: string]: unknown;
};

/**
 * Response for quote calculation/recalculation.
 *
 * Observed in UAT via:
 * - POST /application/v2/{application_uuid}/quote
 *
 * Kept intentionally loose until the response is formalized in a shared schema package.
 */
export type ApplicationQuoteResponse = {
  [key: string]: unknown;
};

