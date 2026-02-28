# Data Model: Application Prefill View Models

**Branch**: `NDAI-27921-more-vm-bind`  
**Date**: 2026-02-26  
**Spec**: [spec.md](./spec.md)  

## Context

The upstream “Application” payload is normalized server-side into a stable internal model (`PrefillApplication`), then mapped into UI-ready “view models” that are saved into the quote draft.

This document describes the additional entities needed to support binding:
- Incidents
- Reports (view-only)
- Coverage selections + pricing

## Entities

### PrefillApplication (normalized upstream)

Existing required fields (already implemented):
- `applicationId: string`
- `quoteId: string`
- `applicant: { firstName, lastName, dob?, email?, phone?, addressLine1?, city?, state?, zip? }`
- `drivers: Array<{ driverId, personal_detail..., contact_info..., license... }>`
- `vehicles: Array<{ vehicleId, description..., usage..., ownership... }>`

New optional fields (to add):
- `incidents?: PrefillIncidentRecord[]`
- `reports?: PrefillReportSummary[]`
- `coverage?: PrefillCoverageSelection`
- `pricing?: PrefillPricingSummary`

Additional prefill-only context (to persist in the draft to enable explicit pricing recalculation):
- `upstreamContext?: { partner: string; source: "agent" | "consumer"; participationOption: string[] }`

### Incident

Purpose: editable incident records used by the Incidents step.

Minimum fields (aligned to existing `Incident` UI model):
- `id: string` (stable within the draft)
- `incidentType: string`
- `incidentDate: string` (UI expects `MM/DD/YYYY`)
- `source: string`
- `driverId?: string`
- `totalDamagesOver1000: boolean`
- `atFault: boolean`
- `policeReportFiled: boolean`

Notes:
- Upstream fields may be partial; mapping should default safely without blocking the UI.
- Agent edits are stored only in the draft for this Jira (no upstream write-back).

### Report (view-only)

Purpose: display upstream report summaries in the Reports step; not editable.

Recommended shape (aligned with `ImportSummaryData["thirdPartyReports"]`):
- `overallStatus: "completed" | "pending" | "failed"`
- `reports: Array<{ type, status, provider?, findings?, pendingReason? }>`

### Coverage Selection

Purpose: editable coverage selections for the Coverage step.

Aligned with existing UI types:
- `CoverageData`:
  - `liability: { bodilyInjury, propertyDamage }`
  - `additional: { medicalPayments, uninsuredMotoristsBodilyInjury, underinsuredMotoristsBodilyInjury, roadsideAssistance }`
  - `vehicleCoverages: Array<{ vehicleId, comprehensiveDeductible, collisionDeductible, glassDeductible, loanLeasePayoff, customPartsEquipment, customPartsAmount }>`

### Pricing Summary

Purpose: read-only pricing display and persisted pricing values.

Aligned with existing UI type (`PricingSummary`):
- `selectedPlanId: string`
- `startDate: string` (YYYY-MM-DD)
- `paymentFrequency: "Monthly" | "Semi-Annual" | "Annual"`
- `monthlyPrice: number`
- `totalForPeriod: number`
- `downPayment: number`

Additional derived state (recommended):
- `pricingStale: boolean` (true after coverage edits until explicit recalculation completes)

## Relationships

- Incidents may reference drivers via `driverId`.
- Vehicle coverages reference vehicles via `vehicleId`.
- Pricing is a function of quote inputs and coverage selections; it is updated only after explicit recalculation.
