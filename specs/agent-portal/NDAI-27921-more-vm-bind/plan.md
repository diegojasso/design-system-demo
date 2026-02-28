# Implementation Plan: More view-model binding (Incidents, Reports, Coverage/Pricing)

**Branch**: `NDAI-27921-more-vm-bind` | **Date**: 2026-02-26 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/agent-portal/NDAI-27921-more-vm-bind/spec.md`

## Summary

Extend the existing “Application Prefill” flow so imported application data binds into additional quote steps:

- **Incidents**: pre-fill `quoteData.incidents` when upstream provides incidents; otherwise show the existing default empty form.
- **Reports**: replace placeholder UI with a bound, view-only representation of report data (or an empty state when none is provided).
- **Coverage selections/pricing**: pre-fill `quoteData.coverage` and `quoteData.pricing` when upstream provides them. Coverage selections remain editable; pricing is read-only and updates only after an explicit **Recalculate/Update Price** action.

Key behavioral constraints from spec clarifications:

- **Updated 2026-02-27 — upstream source of truth**: do not rely on `localStorage` drafts. On reload/revisit, fetch and bind the latest upstream application data for the quote. (Future: quote lock + upstream write-back.)
- **No upstream write-back**: pushing agent edits back to upstream is explicitly out of scope for this Jira.

## Technical Context

**Language/Version**: TypeScript (TS 5.x), Node.js (via Next.js)  
**Primary Dependencies**: Next.js 16 (App Router), React 19, Zod (runtime validation), Axios (server-side HTTP via `@novo/api-client`), Tailwind CSS 4, Radix UI via `@novo/ui`  
**Storage**: No local draft persistence (upstream is source of truth on reload/revisit; in-memory only within a session)  
**Testing**: Vitest (workspace scripts at repo root), Playwright for Storybook tests  
**Target Platform**: Web (Next.js app), server-side routes + loaders on Node runtime  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Prefill and step loads feel sub-second where feasible; avoid blocking UI on non-critical work  
**Constraints**:
- Server/client separation: server-only logic in `apps/agent-portal/src/server/**` and route handlers; UI must not access secrets or call upstream services directly
- No PII in analytics/events or logs; portal-safe error messages
- Runtime validation at boundaries for external inputs (already used with Zod in routes and custom validation in loader)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Server/client separation**: All upstream fetches remain in `apps/agent-portal/src/server/loaders/**` invoked from `apps/agent-portal/src/app/api/**` routes. UI uses internal routes only. **PASS**
- **No secrets to client**: API keys remain in server config (`apps/agent-portal/src/server/config/**`). Route responses are portal-safe. **PASS**
- **Runtime validation at boundaries**: Request body validation via Zod in route handlers; upstream response shape validated in loader normalization. **PASS** (must extend for new fields)
- **Observability**: Use `@novo/analytics` events; avoid ad-hoc names; no PII. **PASS** (must add events for pricing recalculation)
- **Performance**: Prefer server-side fetch; keep UI responsive; avoid unnecessary recomputation. **PASS** (must avoid continuous pricing recalculation)

## Project Structure

### Documentation (this feature)

```text
specs/agent-portal/NDAI-27921-more-vm-bind/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── (no per-feature OpenAPI; see shared contracts below)
```

Shared OpenAPI contracts (repository root):

```text
contracts/openapi/agent-portal/
├── application-prefill.openapi.yaml
└── quote-pricing-recalc.openapi.yaml
```

### Source Code (repository root)

```text
apps/
  agent-portal/
    src/
      app/
        api/
          application-prefill/route.ts     # Server boundary (Zod validation)
        quote-context.tsx                  # Draft storage + prefill orchestration
        initial-info/page.tsx              # Prefill entry page (client -> internal API)
        page.tsx                           # Step router
      server/
        loaders/
          application-prefill-loader.server.ts   # Upstream fetch + normalization
          decode-inbound-payload.server.ts
      shared/
        application-prefill-vm.ts          # Prefill VM mapping (extend here)
      features/
        components/
          incidents/incidents-page.tsx
          reports/reports-page.tsx         # Currently placeholder; bind data here
          coverage/coverage-form.tsx
          coverage/pricing-summary.tsx

packages/
  api-client/
    src/application/application-api.client.ts     # Upstream client (prefill + quote calculation)
```

**Structure Decision**: This is a Next.js App Router application. We’ll extend the existing prefill loader + view-model builder (`application-prefill-loader.server.ts` + `application-prefill-vm.ts`) and then wire the additional data into `QuoteProvider.prefillFromApplication`, with UI changes localized to the affected steps.

## Phase 0: Research (output: `research.md`)

Goals: resolve schema/contract unknowns and align on a safe binding approach.

- Identify upstream response paths for **incidents**, **reports**, **coverage selections**, and **pricing** (or confirm they are absent).
- Confirm what “Reports” means for this flow (e.g., third-party underwriting report summaries) and decide a stable UI model.
- Determine the contract for the **price recalculation** action:
  - Internal route shape (request/response) and error semantics
  - Upstream endpoint (if any) to call for recalculation and required inputs

## Phase 1: Design & Contracts (outputs: `data-model.md`, `contracts/*`, `quickstart.md`)

### Design decisions (updated)

- **Upstream source of truth** (spec update 2026-02-27): remove dependence on persisted drafts. Load by `quoteId` from upstream on page load/revisit, so backend “datafix” changes show up immediately.
- **Incidents editable**: map upstream incidents into existing `Incident` UI model (or best-effort mapping) and store in `quoteData.incidents`.
- **Reports view-only**: add a `quoteData.reports` model and render in `ReportsPage`; no editing.
- **Coverage selections editable**: prefill `quoteData.coverage` when present; store edits locally.
- **Pricing read-only + explicit recalc**:
  - Pricing values displayed come from `quoteData.pricing`
  - After changing selections, pricing is considered “stale” until the user triggers **Recalculate/Update Price**
  - Recalc triggers an internal API call; on success, update `quoteData.pricing` and persist.

### Contracts

- Update `/api/application-prefill` response to include optional `incidents`, `reports`, `coverage`, `pricing` view models.
- Add an internal API route for pricing recalculation (name TBD; propose `/api/quote-pricing-recalculate`), taking `quoteId` + current coverage selections **plus** persisted upstream context (`partner`, `source`, `participation_option`) and returning updated pricing summary.
- Use the upstream Application API quote endpoint via `@novo/api-client`:
  - `POST /application/v2/{application_uuid}/quote`
  - Request body (observed in UAT): `{ participation_option: string[], partner: string, source: "agent" | "consumer" }`

Shared OpenAPI references:

- `contracts/openapi/agent-portal/application-prefill.openapi.yaml`
- `contracts/openapi/agent-portal/quote-pricing-recalc.openapi.yaml`

### Observability

- Add analytics events for:
  - pricing recalc clicked
  - pricing recalc succeeded / failed (include only non-PII codes)

## Phase 2: Implementation Plan (high-level steps)

1. **Upstream normalization** (`apps/agent-portal/src/server/loaders/application-prefill-loader.server.ts`)
   - Extend `normalizeApplication` with optional extraction for incidents/reports/coverage/pricing.
   - Keep strict validation for required existing fields (applicant/drivers/vehicles).
   - Never log upstream payloads; only log safe diagnostics (missing paths, status codes).

2. **Prefill view-model expansion** (`apps/agent-portal/src/shared/application-prefill-vm.ts`)
   - Extend `PrefillApplication` + `ApplicationPrefillViewModels` to include:
     - `incidents` (mapped to `Incident[]`)
     - `reports` (view-only model)
     - `coverage` (`CoverageData`) and `pricing` (`PricingSummary`) when provided

3. **Quote state binding (no persistence)** (`apps/agent-portal/src/app/quote-context.tsx`)
   - Bind `reports` (and other optional models) into `QuoteData`.
   - Update quote loading to fetch latest upstream view models by `quoteId` (internal API) rather than loading `localStorage` drafts.

4. **Prefill entry page wiring** (`apps/agent-portal/src/app/initial-info/page.tsx`)
   - Expand the `PrefillApiResponse` typing and pass through new view-model fields to `prefillFromApplication`.

5. **UI binding updates**
   - **Incidents** already binds from `quoteData.incidents`; verify prefill shape matches `Incident` type.
   - **Reports** (`apps/agent-portal/src/features/components/reports/reports-page.tsx`): replace placeholder with:
     - a view-only report summary list if `quoteData.reports` present
     - an empty state message when absent
   - **Coverage/Pricing**:
     - Initialize from `quoteData.coverage` / `quoteData.pricing` when present.
     - Make pricing display reflect stored pricing (not continuously re-calculated).
     - Add explicit **Recalculate/Update Price** action that calls internal recalc route and updates `quoteData.pricing`.

6. **Tests**
   - Unit tests for mapping/normalization functions:
     - `buildApplicationPrefillViewModels` mapping for optional fields
     - one-time prefill behavior in `prefillFromApplication` (storage present vs not)

## Risks & Mitigations

- **Upstream schema uncertainty**: normalization is currently hand-validated. Mitigation: treat new sections as optional; add safe fallbacks; document expected paths in `research.md`.
- **Pricing behavior mismatch**: current UI uses a mock calculator that updates instantly. Mitigation: introduce an explicit “recalc” mode for upstream-priced quotes and preserve existing behavior for non-upstream flows if needed.
- **Draft overwrite**: existing `prefillFromApplication` overwrites. Mitigation: add explicit storage check and adhere to “one-time prefill” clarification.
- **Updated 2026-02-27**: Draft persistence is deferred; “quote lock” + upstream write-back is the future mitigation for multi-session stability.
