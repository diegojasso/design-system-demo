# Data Model: Backend Endpoint Config

**Feature**: `NDAI-27696-backend-endpoint-config`  
**Date**: 2026-02-10

## Entities

### EnvironmentMapping

Represents the environment-specific selection that determines which backend configuration should be active.

- **Fields**
  - **environmentId**: Identifier for the deployment environment (`dev`, `stage`, `uat`, `preprod`, `prod`)
  - **applicationServiceEndpoint**: Base endpoint for the insurance backend service
  - **applicationServiceApiKey**: Secret credential used to authenticate to the insurance backend

- **Validation rules**
  - `environmentId` must be present and belong to the allowed set: `dev`, `stage`, `uat`, `preprod`, `prod`
  - `applicationServiceEndpoint` must be a valid absolute URL
  - `applicationServiceApiKey` must be present and non-empty

### ApplicationServiceConfiguration

The concrete configuration used when calling the insurance backend.

- **Fields**
  - **endpoint**: The selected endpoint URL
  - **apiKey**: The selected API key (server-only secret)
  - **environmentId**: The environment identifier used to select the mapping

## States / Lifecycle

- **Valid configuration** → portal can attempt insurance backend calls
- **Invalid or missing configuration** → portal must fail closed for insurance-backend-dependent operations and emit a diagnostic event (without secrets/PII)
