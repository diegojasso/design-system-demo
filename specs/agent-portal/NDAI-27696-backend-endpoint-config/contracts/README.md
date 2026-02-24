# Contracts: Backend Endpoint Config

This feature introduces an internal **configuration contract** for selecting and validating the insurance backend service connection details.

## Required configuration values (Stage 1)

- **`APPLICATION_SERVICE_ENDPOINT`**
  - Meaning: Base endpoint URL for the insurance backend service
  - Constraints: Must be a valid absolute URL

- **`APPLICATION_SERVICE_API_KEY`**
  - Meaning: Secret credential used to authenticate requests to the insurance backend
  - Constraints: Must be present and non-empty
  - Security: Must never be exposed to the browser, logs, analytics events, or user-visible error messages

## Environment selection

- The portal selects the active environment mapping using a **deploy-time environment identifier** (independent of hostname).
- The deploy-time environment identifier is provided via `APPLICATION_ENV`.
- Supported environment identifiers are: `dev`, `stage`, `uat`, `preprod`, `prod`.
- If the environment identifier is missing or unrecognized, the portal must fall back to a predefined safe non-production mapping and emit a diagnostic event indicating fallback.

## Observability contract

The portal must emit standardized diagnostic events for:

- Environment selection (environment identifier only)
- Fallback selection (environment identifier + “fallback” indicator)
- Missing/invalid configuration (which field failed, without including secret values)
