# Data Model: NDAI-27811 Initial API Load

**Feature**: `NDAI-27811-init-api-call`  
**Date**: 2026-02-23  
**Source**: [spec.md](./spec.md), [research.md](./research.md)

This document defines the logical entities and view models needed to load and bind application data into the three tabs: Basic Information, Drivers, Vehicles.

## Entities (logical)

### InboundLinkPayload

Represents the decoded content of the encoded payload.

- **policyId**: string (required) — identifier used to load the application (maps to Insurance API `quote_id`)
- **agentId**: string (optional)
- **agent**: boolean (optional)
- **channel**: string (optional)
- **partner**: string (optional)
- **timeStamp**: string (optional)
- **otherFields**: key/value pairs preserved for troubleshooting (server-only; never sent to analytics if it contains PII)

### QuoteIdentifier

- **quoteId**: string — same value as `policyId` for this flow

### Application

Logical application container used for binding.

- **applicationId**: string
- **quoteId**: string
- **applicant**: Applicant
- **drivers**: DriverRecord[]
- **vehicles**: VehicleRecord[]

### Applicant

- **firstName**: string
- **lastName**: string
- **dateOfBirth**: date
- **email**: string
- **phone**: string (if available)
- **addressLine1**: string
- **city**: string
- **state**: string
- **zip**: string

### DriverRecord

Source record from Insurance API (subset needed for tab binding).

- **driverId**: string
- **firstName**: string
- **lastName**: string
- **relationshipToPni**: string (optional)
- **dateOfBirth**: date
- **gender**: string (optional)
- **maritalStatus**: string (optional)
- **email**: string (optional)
- **phone**: string (optional)
- **licenseNumber**: string (optional)
- **licenseState**: string (optional)
- **licenseStatus**: string (optional)
- **yearsLicensed**: string (optional)

### VehicleRecord

Source record from Insurance API (subset needed for tab binding).

- **vehicleId**: string
- **vin**: string
- **year**: string
- **make**: string
- **model**: string
- **trim/style**: string (optional)
- **primaryUse**: string (optional)
- **annualMileage**: string (optional)
- **ownershipType**: string (optional)
- **ownershipLength**: string (optional)

## View Models (for UI binding)

These view models align with existing UI component types used in `agent-portal`.

### Basic Information VM

- **Type**: `ClientInfoFormValues`
- **Source**: `Applicant` fields + best-effort mapping from Insurance API driver/applicant information.
- **Normalization rules**:
  - `dateOfBirth` must be a valid Date object in-memory.
  - Do not fabricate values; missing fields remain empty and should be shown as missing/unconfirmed.

### Drivers VM

- **Type**: `Driver[]` (from `apps/agent-portal/src/features/components/drivers-table/types.ts`)
- **Identity rules**:
  - `Driver.id` MUST be stable and derived from backend `driverId` (not array index).
- **Normalization rules**:
  - Convert date values into the string format expected by the table (current UI type uses `dateOfBirth: string`).

### Vehicles VM

- **Type**: `Vehicle[]` (from `apps/agent-portal/src/features/components/vehicles-table/types.ts`)
- **Identity rules**:
  - `Vehicle.id` MUST be stable and derived from backend `vehicleId` (not array index).
- **Normalization rules**:
  - Missing values should be empty strings rather than placeholders that imply confirmation.

## State Transitions (high-level)

- **Initial state**: UI shows loading state; no bound application data.
- **Loaded**: UI binds prefill VMs; quote workflow proceeds with bound state.
- **Access denied**: UI shows access denied; no data bound.
- **Failed after retries**: UI shows error + manual retry; no partial binding unless explicitly safe.
