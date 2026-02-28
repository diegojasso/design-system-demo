# Research: Upstream binding for Incidents, Reports, Coverage/Pricing

**Branch**: `NDAI-27921-more-vm-bind`  
**Date**: 2026-02-26  
**Spec**: [spec.md](./spec.md)  

## Findings & Decisions

### Decision 1: Treat new upstream sections as optional

- **Decision**: Incidents, reports, coverage selections, and pricing are treated as optional in upstream responses.
- **Rationale**: The current loader strictly validates core fields (applicant/drivers/vehicles). Extending strictness to optional sections would increase failure rate for partially-populated upstream applications and violate the spec’s “graceful fallback” requirements.
- **Alternatives considered**:
  - Fail the entire prefill if any new section is missing → rejected due to poor UX and higher support burden.

### Decision 2: One-time prefill wins over re-sync

- **Decision**: Prefill is performed only when the draft is first created from an imported application; it never overwrites an existing stored draft.
- **Rationale**: Matches spec clarification (Option A) and reduces data-loss risk.
- **Alternatives considered**:
  - Fill blanks only or always re-sync → rejected for now; can be revisited in a future change if upstream becomes authoritative.

### Decision 3: Reports are view-only and modeled as “third-party reports” summary

- **Decision**: Bind Reports into a view-only summary model (no editing), similar to the third-party reports summary displayed in the Import Summary header.
- **Rationale**: The current “Reports” step is placeholder; the repo already contains a view-only presentation component (`ThirdPartyReportsDetail`) and a stable status-driven model in `ImportSummaryData`.
- **Alternatives considered**:
  - Editable report records → rejected (conflicts with clarified scope and likely doesn’t match upstream ownership).

### Decision 4: Pricing is read-only; recalculation requires explicit action

- **Decision**: Coverage selections are editable, but pricing is not directly editable. Pricing updates only after an explicit “Recalculate/Update Price” action.
- **Rationale**: Matches spec clarification (B + B2) and avoids misleading continuous UI recomputation.
- **Alternatives considered**:
  - Always recalc on change → rejected; user explicitly chose explicit action.
  - Keep mock calculator and treat it as “pricing” → rejected; conflicts with upstream-bound pricing semantics.

Implementation note:
- The prefill flow persists an `upstreamContext` (partner/source/participation option) into the draft so the Coverage step can trigger recalculation later without access to the original inbound payload.

## Open Questions / Dependencies (to resolve before implementation)

These are **not** spec clarifications; they’re implementation dependencies that require upstream alignment:

- **Upstream schema paths**:
  - Where are incidents located in the application response? What fields exist?
  - Where are reports located? Are they third-party underwriting reports or something else?
  - Where are coverage selections and pricing located, and what is the expected shape?
- **Pricing recalculation endpoint**:
  - Which upstream service recalculates pricing?
  - What inputs are required (coverage selections only, or additional quote fields)?
  - What response shape is returned (summary only vs detailed breakdown)?

## Next steps

- Validate upstream schema/paths with sample payload(s) and document the final mapping in `data-model.md`.
- Confirm or implement the pricing recalc upstream client contract and finalize `contracts/quote-pricing-recalc.openapi.yaml`.
