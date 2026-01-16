# Product Spec Draft: Design System Demo

This is a working draft of a comprehensive product spec intended to enable
full replication of the project. Fill in the TODOs and expand each section
with details as they become available.

## 1) Executive Summary
- Goal: Demonstrate a modern design system and UI patterns for a quote/import
  workflow experience.
- Target users: Product/design/engineering teams evaluating reusable UI and
  workflows.
- Success criteria (TODO): Define measurable outcomes (adoption, task speed,
  design consistency).

## 2) Scope and Non-Goals
- In scope: Next.js app screens, reusable UI components, Storybook catalog,
  theme/tokens, and example workflows.
- Out of scope (TODO): Explicitly list exclusions (auth, backend persistence,
  production infra, etc.).
- Phasing (TODO): If replication happens in phases, define each phase.

## 3) Product Overview
- Core workflow (initial):
  - Start or resume a quote; progress through steps (client info, drivers,
    vehicles, coverage, payment, e-sign, review).
  - Optional: import a quote from EzLynx, review the import summary, resolve
    missing items, then continue the quote steps.
  - Manage quotes list with search, filters, and pagination.
- Key entities (initial): Quote, Client Info, Driver, Vehicle, Coverage,
  Pricing Summary, Payment, E-Signature, Import Summary, Third-Party Reports,
  UI Components, Theme Tokens.
- Constraints (TODO): Compliance or policy constraints if any.

## 4) Functional Requirements
For each feature, capture:
- User story: As a <persona>, I want <capability>, so that <outcome>.
- Detailed behavior: Inputs, outputs, validations, and edge cases.
- State handling: Loading, empty, error, success, and offline (if applicable).
- Permissions (TODO): Role/visibility rules (if applicable).
- Dependencies: Data sources, utilities, and components.

### Initial Feature Inventory (seed list)
- App shell and navigation (sidebar, layout, theme provider).
- Quote flow and quote header/progress.
- Quotes list with search, filters, and pagination.
- Import workflow and loading/summary/report screens (EzLynx).
- Reusable UI primitives (components library).
- Storybook integration for component documentation.

### Routes and Screens (current)
- `/`: Quote flow with step-based content and command palette.
- `/quotes`: Quotes list with filters and pagination.
- `/import/ezlynx`: Import loading flow and handoff to quote import summary.

### Quote Flow (current)
- Steps: `import-summary`, `client-info`, `driver`, `vehicle`, `coverage`,
  `payment`, `e-sign`, `review`.
- Step navigation uses a progress component; step changes trigger auto-save.
- Review step is a placeholder ("Coming soon").

### Quotes List (current)
- Search, status/date/agency/agent filters, pagination.
- URL query params reflect filters and pagination.
- Selecting a quote navigates to `/?quote=<id>` to load stored data.

### Import Flow (current)
- Import page simulates EzLynx import with mock data.
- Import summary groups missing info by workflow stage (quote/underwriting/bind).
- Items can link to related steps, be resolved/dismissed, or open modals.
- Includes third-party report timeline and action-required sections.

## 5) UI/UX Specification
- Information architecture (current):
  - Primary nav: collapsible left sidebar with icon + label, hover to expand.
  - Global top bar: persistent header area above content.
  - Command palette: global overlay for navigation and actions.
  - Routes:
    - `/`: Quote workspace with step-based navigation.
    - `/quotes`: Quotes list with filtering and pagination.
    - `/import/ezlynx`: Import loading flow.
- Layout and navigation patterns:
  - App shell uses full-height layout with sidebar + main content column.
  - Content width is constrained to a max width with centered layout.
  - Step navigation is a horizontal tab bar with animated indicator.
  - Forms are presented in cards with sectioned field groups.
- Design system usage (current):
  - Typography: Geist for headings; Inter for body and UI text.
  - Spacing: 4/6/8-based scale used for gaps and padding.
  - Color tokens: `background`, `foreground`, `muted`, `border`, `primary`,
    `destructive`, `sidebar` (via CSS variables in theme).
  - State styling: hover, focus-visible ring, disabled opacity, inline validation.
  - Component primitives: shadcn-style components in `components/ui/*`.
- Screen catalog (current):
  - Quote workspace (`/`): app shell, quote header + save status, step tabs,
    content area (per step), command palette overlay.
  - Quotes list (`/quotes`): search, filters, table, pagination.
  - Import loading (`/import/ezlynx`): full-screen import status with progress
    messaging.
  - Import summary (step): two-column layout with action required + client info,
    modal workflows (coverage gap, accident history).
  - Client info (step): multi-section form with date picker and validation.
  - Drivers (step): editable grid with missing-only toggle, MVR suggestions,
    keyboard navigation, empty state.
  - Vehicles (step): editable grid with missing-only toggle, discovery
    suggestions, keyboard navigation, empty state.
  - Coverage (step): templates, state requirements panel, warnings, liability,
    vehicle coverage, pricing summary.
  - Payment (step): method selection with credit card, ACH, or secure link.
  - E-Sign (step): document list, download actions, reminder email editor.
  - Review (step): placeholder state ("Coming soon").
- Screen states (current):
  - Loading: import loading screen; quote list suspense fallback.
  - Empty: drivers/vehicles empty states; import summary missing data empty.
  - Error: save error toast + retry; form validation errors; invalid email in
    e-sign and payment.
  - Success: save toast; import success toast; reminder sent toast.
- Accessibility (current and TODO):
  - Keyboard: command palette, driver/vehicle grids support keyboard navigation.
  - Focus: focus-visible rings on interactive elements.
  - ARIA: grids use `role="grid"`/`gridcell` and labels in tables.
  - TODO: define tab order per screen, minimum contrast targets, and
    screen-reader labels for dynamic states (toasts, dialogs).

## 6) Data Model and API
- Schema (initial): QuoteData includes client info, drivers, vehicles, coverage,
  pricing, payment, e-signature, import summary, and metadata.
- Storage (current): LocalStorage by quote ID, versioned and date-serialized.
- API contracts (TODO): Endpoints, payloads, status codes, errors.
- Auth/session (TODO): Token/role behavior if applicable.
- Caching (TODO): Client/server caching rules and invalidation.

## 7) Business Logic
- Rules (initial): Auto-save on step changes; dirty state controls save toasts.
- Workflows (initial): Create/load quote, import quote, update missing info.
- Integrations (TODO): External services, error handling, fallbacks.

## 8) Non-Functional Requirements
- Performance (TODO): Page load and interaction targets.
- Reliability (TODO): Error recovery and resilience expectations.
- Security (TODO): PII handling, audit requirements, threat model notes.

## 9) Analytics and Telemetry
- Events (TODO): Key events per workflow.
- Dashboards (TODO): What metrics define success.
- Privacy (TODO): Retention and opt-out rules.

## 10) QA and Acceptance Criteria
- Test matrix (TODO): Unit/integration/e2e coverage per feature.
- Acceptance tests (initial):
  - Quote start/resume:
    - Creating a new quote generates a quote ID in the URL.
    - Opening `/?quote=<id>` loads the saved data if present.
  - Step navigation:
    - Changing steps updates the current step and triggers a save.
    - Import summary step appears only for imported quotes.
  - Client info:
    - Required fields validate; invalid email/phone/dob show errors.
    - Auto-save triggers after edits; save status updates.
  - Drivers and vehicles:
    - Add/delete rows update the grid and auto-save.
    - Missing-only toggle filters fields; keyboard navigation remains usable.
    - Empty state shows add-first button when list is empty.
  - Coverage:
    - Templates update coverage values.
    - State warnings display and can be auto-fixed when applicable.
  - Payment:
    - Method selection toggles appropriate form fields.
    - Pay/send actions disabled until the selected method is valid.
  - E-sign:
    - Documents list renders with status badges.
    - Reminder email edit validates and persists to quote.
  - Import flow:
    - Import loading screen transitions to imported quote summary.
    - Missing items can be resolved/dismissed or routed to related steps.
- Edge cases (TODO): Negative and boundary scenarios.

## 11) Delivery and Ops
- Environments (TODO): local/dev/stage/prod differences.
- Build/deploy (initial): `next build` and `next start`.
- Migration plan (TODO): Data migration and rollback steps.

## Appendix A: Technical Stack Snapshot
- Framework: Next.js 16 + React 19 + TypeScript.
- Styling: Tailwind CSS 4.
- UI primitives: Radix UI, shadcn-style components (in `components/ui`).
- Forms/validation: react-hook-form + zod.
- Charts/visuals: Recharts.
- Theming: next-themes.
- Docs: Storybook.

## Appendix B: Codebase Map (initial)
- App entry: `app/layout.tsx`, `app/page.tsx`.
- Routes: `app/quotes`, `app/import/ezlynx`.
- Components: `app/components/*`, `components/ui/*`.
- Hooks: `hooks/*`.
- Utilities: `lib/utils.ts`.
- Stories: `stories/*`.

## Appendix C: Open Questions
- What is the definitive list of user flows and screens to replicate?
- Are there backend/API requirements or is the project UI-only?
- What environments and deployment targets must be supported?
