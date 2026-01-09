# Plan: Payment & Bind Page

## Overview
Add a new "Payment & Bind" step to the quote flow, allowing agents to select how they want to collect payment from clients. Based on the wireframe, this page should display payment collection options in a card format.

## Wireframe Analysis

From the wireframe, I can see:
- **Tab Navigation**: "Payment & Bind" is a new tab that should be added after "Coverages"
- **Page Layout**: White card on the right side containing payment options
- **Payment Options**: Three radio button options:
  1. **Send secure link to client** (selected by default)
     - Shows email input field pre-filled with client's email
     - Description: "The client will receive a link to enter payment info."
  2. **Credit Card**
     - Shows credit card icons (AMEX, Mastercard, Visa, Discover/JCB)
  3. **Bank Account (ACH)**
     - Shows bank building icon

## Clarifying Questions

Before implementation, please clarify:

1. **Payment Option Behavior**:
   - When "Credit Card" is selected, should additional form fields appear (card number, expiry, CVV, etc.)?
   - When "Bank Account (ACH)" is selected, should additional form fields appear (routing number, account number, etc.)?
   - Or are these options just for selection, with actual payment collection happening elsewhere?

2. **E-Sign Tab**:
   - The wireframe shows an "E-Sign" tab after "Payment & Bind". Should we also implement this step now, or focus only on Payment & Bind?

3. **Email Pre-filling**:
   - Should the email field default to the client's email from `quoteData.clientInfo.email`?
   - Should the email be editable or read-only?

4. **Validation**:
   - What validation is needed for the email field when "Send secure link" is selected?
   - Are there any required fields before proceeding to the next step?

5. **State Management**:
   - Should payment method selection be saved to `quoteData`?
   - What data structure should we use to store payment information?

6. **Next Steps**:
   - What happens after selecting a payment method and clicking "Next"?
   - Should there be a "Bind Policy" button or action on this page?

7. **Icons**:
   - Do you have specific credit card icons, or should we use SVG icons/lucide-react icons?
   - Do you have a bank building icon, or should we use a generic icon?

## Implementation Plan

### Phase 1: Setup & Structure

1. **Update Step Definitions**
   - Add "payment" step to `quote-progress.tsx` steps array
   - Update `StepId` type in `quote-context.tsx` and `quote-progress.tsx`
   - Add "Payment & Bind" tab between "Coverages" and "Review" (or "E-Sign" if implementing)

2. **Create Payment Component Structure**
   - Create `app/components/payment/payment-form.tsx`
   - Create `app/components/payment/types.ts` for payment-related types
   - Follow the same pattern as `coverage-form.tsx` and `client-info-form.tsx`

3. **Update Quote Context**
   - Add payment data type to `QuoteData` interface
   - Add `updatePayment` method to context
   - Update storage schema to include payment data

### Phase 2: UI Implementation

1. **Payment Form Component**
   - Create card layout matching wireframe
   - Add "Payment options" heading
   - Add question: "How would you like to collect payment?"
   - Implement radio group with three options

2. **Payment Options**
   - **Option 1: Send secure link**
     - Radio button with label
     - Description text below
     - Email input field (pre-filled from client info)
   - **Option 2: Credit Card**
     - Radio button with label
     - Credit card icons display (AMEX, Mastercard, Visa, Discover)
   - **Option 3: Bank Account (ACH)**
     - Radio button with label
     - Bank building icon

3. **Styling**
   - Match existing card styling from other forms
   - Use consistent spacing and typography
   - Ensure radio buttons are properly styled
   - Add icons for credit cards and bank

### Phase 3: Functionality

1. **Form State Management**
   - Use react-hook-form for form management
   - Add validation schema (Zod)
   - Integrate with auto-save hook

2. **Data Integration**
   - Pre-fill email from `quoteData.clientInfo.email`
   - Save payment method selection to context
   - Auto-save payment data when changed

3. **Conditional Fields** (if needed)
   - Show credit card fields when "Credit Card" selected
   - Show ACH fields when "Bank Account (ACH)" selected
   - Hide/show email field based on selection

### Phase 4: Integration

1. **Update Main Page**
   - Add payment step rendering in `app/page.tsx`
   - Ensure navigation works correctly

2. **Update Navigation**
   - Ensure "Previous" and "Next" buttons work correctly
   - Update step validation if needed

3. **Command Palette** (if applicable)
   - Add payment step to command palette navigation

## File Structure

```
app/
  components/
    payment/
      payment-form.tsx      # Main payment form component
      types.ts              # Payment-related types
```

## Type Definitions (Draft)

```typescript
export type PaymentMethod = "secure-link" | "credit-card" | "ach"

export interface PaymentData {
  method: PaymentMethod
  email?: string  // For secure link option
  // Additional fields for credit card or ACH if needed
}
```

## Dependencies

- Existing UI components: `Card`, `RadioGroup`, `Input`, `Form`
- Form management: `react-hook-form`, `zod`
- Icons: `lucide-react` (or custom SVG icons)
- Auto-save: `use-auto-save` hook

## Testing Considerations

1. Test payment method selection
2. Test email pre-filling from client info
3. Test form validation
4. Test auto-save functionality
5. Test navigation between steps
6. Test conditional field display (if implemented)

## Open Questions

See "Clarifying Questions" section above.

## Next Steps

1. Get answers to clarifying questions
2. Implement Phase 1 (Setup & Structure)
3. Implement Phase 2 (UI Implementation)
4. Implement Phase 3 (Functionality)
5. Implement Phase 4 (Integration)
6. Test and refine
