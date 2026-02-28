# Feature Specification: Pre-fill Incidents, Reports, and Coverage

**Feature Branch**: `NDAI-27921-more-vm-bind`  
**Created**: 2026-02-26  
**Status**: Draft  
**Input**: User description: "Based on the data model returned from upstream application data, we need to pre-fill more of the quote experience: Incidents currently shows a default empty incident form; Reports is placeholder text; Coverage selections/pricing shows defaults (only vehicles reflect imported/bound data)."

## Clarifications

### Session 2026-02-26

- Q: If an agent already has quote data (edited/reopened/navigated), should upstream pre-fill ever overwrite existing values? → A: **Updated 2026-02-27**: Upstream is the source of truth. Do not persist drafts in local storage; always fetch and display the latest upstream data for the quote.
- Q: When upstream provides coverage pricing, can agents change coverages/pricing, and how is price recalculation triggered? → A: Coverage selections are editable, pricing is not directly editable, and pricing updates only after an explicit “Recalculate/Update Price” action.
- Q: After pre-fill, should agents be able to edit imported Incidents and/or Reports? → A: Incidents are editable; Reports are view-only.
- Q: Should agent edits be pushed back to the upstream system as part of this feature? → A: No; upstream write-back is deferred to a future Jira.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review imported Incidents/Reports/Coverage (Priority: P1)

As an agent starting a quote from an imported application, I can see the Incidents, Reports, and Coverage selections/pricing already filled in (when that information exists upstream) so I can review and move forward without re-entering data.

**Why this priority**: This removes the highest-cost manual re-keying and reduces the risk of missing or inconsistent information when quoting.

**Independent Test**: Can be fully tested by loading an imported application that includes incident, report, and coverage data and verifying those sections display the expected values immediately.

**Acceptance Scenarios**:

1. **Given** an imported application that includes one or more incidents, **When** the agent views the Incidents step, **Then** the incident form shows the imported incident details instead of a blank default form.
2. **Given** an imported application that includes one or more reports, **When** the agent views the Reports step, **Then** the page shows the report data (not placeholder text) and clearly indicates when multiple reports exist.
3. **Given** an imported application that includes coverage choices and pricing, **When** the agent views the Coverage step, **Then** the selected coverages and displayed pricing match the imported values.
4. **Given** an imported application with pre-filled coverage selections/pricing, **When** the agent changes a coverage selection, **Then** the displayed price does not change until the agent triggers a “Recalculate/Update Price” action.
5. **Given** the agent triggers a “Recalculate/Update Price” action after changing coverages, **When** recalculation completes, **Then** the displayed price updates to reflect the current selections.

---

### User Story 2 - Graceful fallback when upstream data is missing (Priority: P2)

As an agent, if the imported application does not include incidents, reports, or coverage selections/pricing, I can still proceed with sensible defaults and clear empty states.

**Why this priority**: Imported data is often partial. The workflow must remain usable and not block quoting.

**Independent Test**: Can be tested by loading an imported application with vehicles only (no incidents, reports, or coverage data) and verifying each affected step shows a clear empty/default state.

**Acceptance Scenarios**:

1. **Given** an imported application with no incidents, **When** the agent views the Incidents step, **Then** the default empty incident form is shown (and is clearly ready for manual entry).
2. **Given** an imported application with no reports, **When** the agent views the Reports step, **Then** the page shows an empty state explaining that no reports were provided (not placeholder text).
3. **Given** an imported application with no coverage selections/pricing, **When** the agent views the Coverage step, **Then** the coverage defaults are shown and the agent can make selections normally.

---

### User Story 3 - Agent edits stay stable after pre-fill (Priority: P3)

As an agent, after reviewing pre-filled incidents/reports/coverage, I can make adjustments and trust that my edits remain as I navigate forward/back in the workflow **within the current session**.

**Why this priority**: Agents must be able to correct or refine imported information without it reverting unexpectedly.

**Independent Test**: Can be tested by changing one field in each of the three areas, navigating away and back, and verifying the updated values remain.

**Acceptance Scenarios**:

1. **Given** an imported application with pre-filled incident information, **When** the agent edits an incident field and navigates away and back, **Then** the edited value remains.
2. **Given** an imported application with pre-filled coverage selections, **When** the agent changes a coverage selection and navigates away and back, **Then** the updated selections remain.
3. **Given** an imported application that is reloaded or revisited after the agent has made edits, **When** upstream data is available again, **Then** the agent’s existing incident/report/coverage edits are not overwritten by upstream pre-fill.
   - **Updated 2026-02-27**: This is **deferred**. Reload/revisit must reflect the latest upstream state (future: quote lock + upstream write-back).

---

### Edge Cases

- Imported application contains multiple incidents and/or multiple reports; the UI clearly shows each record and does not merge unrelated items.
- Imported application contains partial incident/report details; missing fields show as blank/unknown and do not break the step.
- Imported application includes coverage selections but not pricing (or pricing but not selections); the Coverage step remains usable and clearly indicates what was and wasn’t provided.
- Imported data contains unexpected or unsupported values; the system falls back to defaults for only the affected fields while still showing the rest of the imported content.
- Large imported payloads (many vehicles, incidents, reports) still allow an agent to reach each step and see content without obvious lag.
- Agent changes coverages but does not trigger recalculation; the UI clearly indicates the displayed price may be out of date until “Recalculate/Update Price” is used.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: When an imported application includes incident data, the system MUST pre-fill the Incidents step with that incident data.
- **FR-002**: When an imported application includes no incident data, the system MUST show the default empty incident form (ready for manual entry).
- **FR-003**: The Reports step MUST display imported report data when present and MUST NOT show placeholder text.
- **FR-004**: When no report data is present, the Reports step MUST show a clear empty state indicating no reports were provided.
- **FR-005**: When an imported application includes coverage selections, the Coverage step MUST pre-select those coverages.
- **FR-006**: When an imported application includes coverage pricing, the Coverage step MUST display pricing consistent with the imported values.
- **FR-007**: When coverage selections and/or pricing are not present upstream, the Coverage step MUST fall back to the existing default behavior and remain fully usable.
- **FR-008**: Pre-filled values MUST be visible without requiring the agent to manually refresh or re-import.
- **FR-009**: The workflow MUST support partial upstream data by pre-filling what is available and falling back for what is missing.
- **FR-010**: If upstream data cannot be interpreted for a specific field or record, the system MUST not block the agent from proceeding and MUST fall back to a safe empty/default representation for only the affected portion.
- **FR-011**: Agent edits to incidents, reports, or coverage selections/pricing MUST remain stable as the agent navigates between steps within the same quote workflow.
- **FR-012**: **Updated 2026-02-27**: The system MUST treat upstream as the source of truth on reload/revisit and MUST NOT rely on local draft storage to preserve state (future: quote lock + upstream write-back).
- **FR-013**: Coverage pricing MUST NOT be directly editable by the agent on the Coverage step.
- **FR-014**: The Coverage step MUST provide an explicit “Recalculate/Update Price” action; after the agent changes coverage selections, pricing MUST update only after this action is triggered.
- **FR-015**: Imported Incidents MUST be editable by agents within the quote workflow (including adding, updating, and removing incident entries).
- **FR-016**: Imported Reports MUST be view-only within the quote workflow; agents MUST NOT edit report content via the UI.
- **FR-017**: This feature MUST NOT introduce upstream write-back for agent edits; any synchronization of incident/coverage edits back to the upstream system is explicitly out of scope for this Jira.
- **FR-018**: When the agent triggers “Recalculate/Update Price”, the system MUST invoke the upstream Application Quote endpoint to obtain updated plans/pricing for the current application.

### Key Entities *(include if feature involves data)*

- **Imported Application Data**: Upstream application information used to pre-fill the quote workflow.
- **Incident**: A record describing a prior event relevant to rating/underwriting (may include dates, types, descriptions, and involved parties).
- **Report**: A record or document summary provided upstream for agent review (may include identifiers, status, and summary details).
- **Coverage Selection**: The set of coverage choices associated with vehicles/drivers/property in the quote.
- **Coverage Pricing**: The cost information associated with coverage selections (including any per-coverage and/or total amounts).

### Assumptions & Scope Boundaries

- Imported/“upstream” data may be present for vehicles, incidents, reports, and coverage; vehicles are already pre-filled today and are not the primary focus of this change.
- This feature focuses on display and pre-fill of these sections when data exists; it does not require that upstream sources provide new data they don’t already provide.
- If upstream data is absent for a section, the existing defaults remain the expected behavior.
- Upstream pre-fill is intended for initial quote creation only; agent edits take precedence thereafter.
- Pushing agent edits back to the upstream system is out of scope for this Jira and will be addressed in a separate future Jira.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For imported applications that include incidents, reports, and coverage data, agents can reach each of the three steps and see the corresponding pre-filled information within 5 seconds of entering the step.
- **SC-002**: For imported applications with incidents/reports/coverage provided upstream, manual re-entry for those sections is reduced by at least 80% (measured by number of fields the agent must type before proceeding).
- **SC-003**: Placeholder content is eliminated from the Reports step (0 occurrences in the primary imported-quote flow).
- **SC-004**: In a test set of imported applications with partial/malformed values, at least 95% of sessions allow agents to proceed through Incidents, Reports, and Coverage without being blocked by data issues.
