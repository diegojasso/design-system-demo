# E-Signature Page Implementation Plan

## Overview
Plan for implementing the E-Signature page based on the wireframe. This page allows agents to manage document signatures for quotes, send reminders, and track signature status.

## Wireframe Analysis

### Page Structure
- **Header**: Logo + "Novo Agent Platform" + hamburger menu
- **Breadcrumbs**: "Home > Quotes > New Quote"
- **Page Title**: "{Client Name}'s Quote"
- **Navigation Tabs**: Summary, Quote, Payment, **E-Sign** (active), Finalize
- **Main Content**: Signature section with document list and reminder functionality

### Key Components Identified

1. **Signature Section Header**
   - Title: "Signature"
   - Description: "The client must sign the application to finalize the binding."
   - Action: "Download documents" button with download icon

2. **Sent On Date**
   - Label: "Sent on"
   - Date: "December 13, 2025" (formatted date)

3. **Documents List**
   - Each document shows:
     - Document icon (green document with pen)
     - Document name
     - Status badge: "Awaiting signature" (light orange pill)
   - Documents shown:
     - Electronic Signature
     - Application for Insurance
     - Uninsured motorist and underinsured motorist coverage offer form

4. **Send Reminder Section**
   - Title: "Send reminder"
   - Email field: "sally.g@gmail.com" (editable with pencil icon)
   - Action: "Send" button

## Questions for Clarification

### 1. Tab/Step Naming
**Question**: The wireframe shows tabs: "Summary", "Quote", "Payment", "E-Sign", "Finalize"
- Current codebase has: "Basic Info", "Vehicles", "Drivers", "Coverages", "Checkout", "Review"
- Should we:
  - A) Add "E-Sign" as a new step between "payment" and "review"?
  - B) Rename "review" to "Finalize" and add "E-Sign" before it?
  - C) Create a separate tab structure that matches the wireframe exactly?

**Recommendation**: Add "e-sign" step between "payment" and "review", keeping existing step names but adding the new step.

### 2. Step Flow & Position
**Question**: Where should E-Sign appear in the quote flow?
- After Payment? (Payment → E-Sign → Review/Finalize)
- Before Payment? (Coverage → E-Sign → Payment → Review)
- As a parallel step?

**Recommendation**: After Payment, before Review/Finalize, as shown in wireframe.

### 3. Document Data Structure
**Question**: How should documents be stored and managed?
- Should documents be:
  - A) Hardcoded/mock data for now?
  - B) Stored in quote context?
  - C) Fetched from an API?
- What document properties are needed? (name, type, status, sentDate, signedDate, etc.)

**Recommendation**: Start with mock data structure in quote context, prepare for API integration.

### 4. Email Editing
**Question**: How should email editing work?
- Should clicking the pencil icon:
  - A) Open an inline edit (input field replaces text)?
  - B) Open a modal/dialog?
  - C) Navigate to a different view?
- Should email default to client's email from quote data?

**Recommendation**: Inline edit with pencil icon toggle, default to client email from quote context.

### 5. Download Documents Functionality
**Question**: What should "Download documents" do?
- A) Download all documents as a ZIP?
- B) Download individual documents?
- C) Show a dropdown to select which documents to download?
- Should this be a mock action for now?

**Recommendation**: Mock action for now, prepare for future PDF generation/download.

### 6. Send Reminder Functionality
**Question**: What happens when "Send" is clicked?
- A) Show success toast and update UI?
- B) Track reminder count/sent date?
- C) Integrate with email service?
- Should there be rate limiting (e.g., max reminders per day)?

**Recommendation**: Mock action with toast notification, track reminder count and last sent date.

### 7. Signature Status Tracking
**Question**: How should signature status be managed?
- Status options: "Awaiting signature", "Signed", "Expired", etc.?
- Should status update automatically or manually?
- Should there be a way to mark documents as signed manually?

**Recommendation**: Start with "Awaiting signature" status, add status update functionality later.

### 8. Document Icons
**Question**: What icon should be used for documents?
- Wireframe shows green document with pen icon
- Should we use:
  - A) Lucide icons (FileText, FileSignature, etc.)?
  - B) Custom SVG?
  - C) Different icon per document type?

**Recommendation**: Use Lucide icons (FileText or FileSignature) with appropriate styling.

### 9. Badge Styling
**Question**: The wireframe shows light orange "Awaiting signature" badges
- Should we:
  - A) Create a custom badge variant?
  - B) Use existing badge with custom colors?
  - C) Use a different component?

**Recommendation**: Create custom badge variant or use existing badge with custom className.

### 10. Date Formatting
**Question**: How should dates be formatted?
- Wireframe shows: "December 13, 2025"
- Should we:
  - A) Use a date formatting library (date-fns, dayjs)?
  - B) Use native Intl.DateTimeFormat?
  - C) Format manually?

**Recommendation**: Use date-fns or Intl.DateTimeFormat for consistent formatting.

## Implementation Plan

### Phase 1: Core Structure & Types

1. **Update Quote Context**
   - Add `eSignature` field to `QuoteData` type
   - Create `ESignatureData` type with:
     - `documents`: Array of document objects
     - `sentDate`: Date | null
     - `reminderEmail`: string
     - `reminderCount`: number
     - `lastReminderSent`: Date | null
   - Add `updateESignature` method to context

2. **Update Step Types**
   - Add `"e-sign"` to `StepId` type
   - Update `quote-progress.tsx` to include E-Sign step
   - Add step label: "E-Sign"

3. **Create E-Signature Component Structure**
   - Create `app/components/e-signature/e-signature-form.tsx`
   - Create `app/components/e-signature/types.ts`
   - Create `app/components/e-signature/mock-documents.ts` (if needed)

### Phase 2: UI Components

1. **Document List Component**
   - Document item with icon, name, and status badge
   - Responsive layout
   - Status badge styling (light orange for "Awaiting signature")

2. **Send Reminder Section**
   - Email input with inline edit functionality
   - Pencil icon toggle
   - Send button with validation

3. **Download Documents Button**
   - Button with download icon
   - Positioned in header area

4. **Sent On Date Display**
   - Formatted date display
   - Conditional rendering (only show if sent)

### Phase 3: Integration

1. **Update Main Page**
   - Add E-Sign step to step rendering logic
   - Import and render `ESignatureForm` component

2. **Update Quote Progress**
   - Add E-Sign tab to navigation
   - Ensure proper step ordering

3. **Update Command Palette**
   - Add E-Sign step to navigation commands (if applicable)

### Phase 4: Functionality

1. **Email Editing**
   - Implement inline edit with pencil icon
   - Default to client email from quote context
   - Save to quote context on change

2. **Send Reminder**
   - Implement send action (mock for now)
   - Show success toast
   - Track reminder count and last sent date
   - Update UI state

3. **Download Documents**
   - Implement download action (mock for now)
   - Show loading state
   - Prepare for future PDF generation

### Phase 5: Polish & Edge Cases

1. **Empty States**
   - Handle case when no documents exist
   - Handle case when email is not set

2. **Loading States**
   - Show loading indicators for async actions

3. **Error Handling**
   - Handle email validation errors
   - Handle send reminder failures
   - Handle download failures

4. **Accessibility**
   - Ensure proper ARIA labels
   - Keyboard navigation
   - Screen reader support

## File Structure

```
app/
  components/
    e-signature/
      e-signature-form.tsx      # Main E-Signature form component
      types.ts                   # TypeScript types for E-Signature data
      mock-documents.ts          # Mock document data (optional)
      document-item.tsx          # Individual document list item component
      reminder-section.tsx       # Send reminder section component
```

## Type Definitions

```typescript
// types.ts
export type DocumentStatus = "awaiting-signature" | "signed" | "expired" | "cancelled"

export interface Document {
  id: string
  name: string
  type: string
  status: DocumentStatus
  sentDate?: Date
  signedDate?: Date
  expiresAt?: Date
}

export interface ESignatureData {
  documents: Document[]
  sentDate: Date | null
  reminderEmail: string
  reminderCount: number
  lastReminderSent: Date | null
}
```

## Component Structure

```typescript
// e-signature-form.tsx
export function ESignatureForm() {
  // Main component structure:
  // - Card wrapper
  // - Header section (title, description, download button)
  // - Sent on date (conditional)
  // - Documents list
  // - Send reminder section
}
```

## Styling Notes

- Use existing Card component for main container
- Match typography styles from other forms (Geist for titles, Inter for body)
- Use existing Button, Badge, Input components
- Light orange badge: Custom variant or className override
- Document icons: Use Lucide icons (FileText, FileSignature, etc.)

## Next Steps

1. **Get answers to clarification questions**
2. **Create type definitions**
3. **Build core component structure**
4. **Implement UI components**
5. **Add functionality**
6. **Test and polish**

## Dependencies

- Existing UI components (Card, Button, Badge, Input)
- Lucide icons
- Quote context
- Date formatting utility (date-fns or native Intl)
- Toast notifications (sonner - already in use)
