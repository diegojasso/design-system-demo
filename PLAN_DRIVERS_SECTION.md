# Driver Section Plan

## Overview
Dedicated plan for the Drivers step in the quote flow. This section captures
required fields, behaviors, validation, and UX expectations for the drivers
table/grid.

## Status
Planned documentation (implementation already exists in `app/components/drivers-table/*`).

## Required Fields
These fields are required in the drivers table:
- First Name (`firstName`)
- Last Name (`lastName`)
- Date of Birth (`dateOfBirth`)
- Relation to Primary Insured (`relationship`)

## Optional Fields (Current)
Based on current columns:
- Gender
- Marital Status
- Email
- Phone
- Include in Policy?
- Driver's License
- Driver's License State
- Years Licensed
- License Status
- Home Ownership
- Employment Status
- Education Level

## UX and Interaction
- Spreadsheet-like grid with inline editing.
- Keyboard navigation: Tab/Arrow to move, Enter to edit/save, Escape to cancel.
- Missing-only toggle to focus on required data.
- Row add/delete actions with auto-save.
- MVR suggestions panel for driver-related prompts.

## Validation and Missing Data
- Required fields use proactive missing-data highlighting.
- Validation errors display inline for invalid formats (email/phone/date).
- Row-level completeness indicator and missing count.

## Field-Level Validation (Current)
- First Name: required, non-empty.
- Last Name: required, non-empty.
- Date of Birth: required, valid date; cannot be in the future.
- Relation to Primary Insured: required selection.
- Email: if present, must match basic email format.
- Phone: if present, must contain only digits, spaces, parentheses, plus, or dash.
- Date fields (any): must parse to a valid date.

## Screen States
- Loading: show table skeletons or spinner when quote data is loading.
- Empty: show an empty-state prompt with “Add driver” action.
- Error: toast + inline validation errors; preserve user input on failure.
- Success: auto-save toast and resolved missing indicators.

## Accessibility
- Grid uses `role="grid"` and `gridcell` semantics.
- Focus-visible rings on interactive cells.
- Keyboard-first flow is supported for all cell types.

## Data Model References
- Column definitions: `app/components/drivers-table/columns.ts`
- Missing-data utilities: `app/components/drivers-table/utils/missing-data.ts`
- Driver type: `app/components/drivers-table/types.ts`

## Open Questions
- Confirm required fields beyond current implementation.
- Define any conditional requirements (e.g., license fields by state or age).
- Confirm validation rules for DOB range and license formats.
