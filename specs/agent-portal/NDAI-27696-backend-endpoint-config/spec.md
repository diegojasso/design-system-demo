# Feature Specification: Backend Endpoint Config

**Feature Branch**: `NDAI-27696-backend-endpoint-config`  
**Created**: 2026-02-10  
**Status**: Draft  
**Input**: User description: "Agent portal supports selecting backend service endpoint and API key by environment/hostname. In stage 1, only include the insurance backend pair using the configuration keys `APPLICATION_SERVICE_ENDPOINT` and `APPLICATION_SERVICE_API_KEY`."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Deploy the portal to multiple environments safely (Priority: P1)

As an engineering/release team member, I want the Agent Portal to automatically use the correct insurance backend service for the environment it is running in, so deployments do not require code changes and do not accidentally send traffic to the wrong backend.

**Why this priority**: Incorrect environment routing is high risk (bad data, broken quoting, security/compliance concerns). This is foundational for any real multi-environment usage.

**Independent Test**: Can be tested by deploying the same build to two different environments and confirming each environment routes requests to its intended backend without changing application code.

**Acceptance Scenarios**:

1. **Given** the portal is running in an environment that is mapped to an insurance backend endpoint and API key, **When** the portal initiates a backend request that requires the insurance service, **Then** the request uses that environment’s configured `APPLICATION_SERVICE_ENDPOINT` and `APPLICATION_SERVICE_API_KEY`.
2. **Given** the portal is running in an environment that is not explicitly mapped, **When** the portal initiates a backend request that requires the insurance service, **Then** the portal uses a predefined safe default environment mapping (non-production) and records an error/diagnostic event indicating fallback occurred.

---

### User Story 2 - Local development uses a predictable backend target (Priority: P2)

As a developer, I want local development to select a predictable insurance backend target, so I can run the portal locally without repeatedly changing configuration and without accidentally pointing at production.

**Why this priority**: This improves developer productivity and reduces accidental production access during development.

**Independent Test**: Can be tested by running the portal locally and confirming it uses the intended non-production backend mapping by default.

**Acceptance Scenarios**:

1. **Given** the portal is running in a local development context, **When** the portal initiates a backend request that requires the insurance service, **Then** the portal uses the configured non-production default mapping for `APPLICATION_SERVICE_ENDPOINT` and `APPLICATION_SERVICE_API_KEY`.

---

### User Story 3 - Operators can detect misconfiguration quickly (Priority: P3)

As an operator/support engineer, I want clear diagnostics when the backend endpoint configuration is missing or invalid, so I can resolve environment issues quickly.

**Why this priority**: Clear diagnostics reduce mean time to recovery and reduce support burden.

**Independent Test**: Can be tested by intentionally removing required configuration and verifying the portal shows a clear failure mode and captures a diagnostic event without leaking secrets.

**Acceptance Scenarios**:

1. **Given** `APPLICATION_SERVICE_ENDPOINT` is missing or empty for the current environment mapping, **When** the portal attempts to use the insurance service, **Then** the portal blocks the operation, shows a clear error, and records a diagnostic event (without including secret values).
2. **Given** `APPLICATION_SERVICE_API_KEY` is missing for the current environment mapping, **When** the portal attempts to use the insurance service, **Then** the portal blocks the operation, shows a clear error, and records a diagnostic event (without including secret values).

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- **Unknown environment**: The portal is accessed from a hostname/environment not recognized by the mapping.
- **Missing configuration**: Endpoint or API key is not provided for the selected environment mapping.
- **Invalid endpoint**: Endpoint value is not a valid URL or cannot be reached.
- **Backend rejects credentials**: API key is invalid/expired; portal must fail safely without leaking secrets.
- **Accidental production risk**: Ensure non-production contexts do not silently route to production.
- **Missing environment identifier**: If the deploy-time environment identifier is missing, default to `dev` and record a fallback diagnostic event.

## Clarifications

### Session 2026-02-10

- Q: What signal selects the active environment mapping? → A: Deploy-time environment identifier (primary), independent of hostname.
- Q: What environment identifiers are supported? → A: Exactly `dev`, `stage`, `uat`, `preprod`, `prod`.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001 (Environment Mapping)**: The system MUST determine the active environment mapping at runtime using a deploy-time environment identifier (independent of hostname) in order to select the correct insurance backend configuration.
- **FR-001a (Supported Environments)**: The system MUST support exactly these environment identifiers: `dev`, `stage`, `uat`, `preprod`, `prod`.
- **FR-002 (Config Surface Area - Stage 1)**: For this stage, the system MUST support only the insurance backend pair:
  - `APPLICATION_SERVICE_ENDPOINT` (the base endpoint to contact)
  - `APPLICATION_SERVICE_API_KEY` (a credential used to authenticate requests)
- **FR-003 (Safe Defaults)**: If the runtime environment cannot be determined or is not recognized, the system MUST fall back to a predefined safe non-production mapping and MUST record a diagnostic event indicating that a fallback occurred.
- **FR-004 (No Secret Leakage)**: The system MUST NOT expose the value of `APPLICATION_SERVICE_API_KEY` to end users, logs, analytics events, or error messages.
- **FR-005 (Fail Closed on Missing Config)**: If either `APPLICATION_SERVICE_ENDPOINT` or `APPLICATION_SERVICE_API_KEY` is missing for the selected mapping, the system MUST fail closed (block outbound calls that require the insurance service) and provide a user-safe error.
- **FR-006 (Deterministic Behavior)**: For a given runtime environment, the selected mapping MUST be deterministic (same inputs result in the same selected endpoint/key pair).
- **FR-007 (Observability)**: The system MUST emit standardized events for (a) environment selection, (b) fallback selection, and (c) configuration errors, without including secrets or PII.

### Key Entities *(include if feature involves data)*

- **Environment Mapping**: A mapping from a runtime environment identifier to the two required configuration values (`APPLICATION_SERVICE_ENDPOINT`, `APPLICATION_SERVICE_API_KEY`).
- **Application Service Configuration**: The selected pair of values used by the portal when communicating with the insurance backend service.

## Assumptions

- Only the insurance backend integration is in scope for this stage (exactly one service with two configuration values).
- The runtime context provides enough information to determine an environment mapping (directly or via a deterministic mapping rule).
- A safe non-production default mapping exists and is acceptable when the environment is unknown.

## Dependencies

- Each deployment environment can supply (a) the deploy-time environment identifier and (b) the values for `APPLICATION_SERVICE_ENDPOINT` and `APPLICATION_SERVICE_API_KEY` through a secure configuration mechanism.
- The insurance backend supports authenticating requests using an API key (or equivalent credential) without requiring end-user interaction.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001 (Multi-environment deployability)**: The same portal build can be deployed to at least 3 distinct environments and each environment uses its intended insurance backend configuration without any code changes.
- **SC-002 (Fallback safety)**: In an unmapped/unknown environment, the portal routes to a non-production default mapping 100% of the time and emits a diagnostic event indicating fallback.
- **SC-003 (Operational clarity)**: When configuration is missing/invalid, the portal surfaces a user-safe error and emits a diagnostic event in 100% of tested failure cases, without leaking secret values.
- **SC-004 (Developer setup time)**: A new developer can run the portal locally and reach a working insurance backend target within 10 minutes using documented defaults/configuration.
