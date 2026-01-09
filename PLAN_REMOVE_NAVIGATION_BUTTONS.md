# Plan: Remove Redundant Navigation Buttons

## Overview
Remove the back/next navigation buttons from most pages since navigation is already controlled by the progress tabs at the top. Keep CTAs only where they serve a specific purpose:
- **Basic Info page**: CTA to start/continue the quote
- **Checkout page**: Individual CTAs for each payment option

## Current State

### Navigation Components
- `QuoteNavigation` component (`app/components/quote-navigation.tsx`) renders back/next buttons
- Used in `app/page.tsx` for all steps
- Progress tabs in `QuoteProgress` component already allow direct navigation

### Pages Affected
1. **client-info** (Basic Info) - Needs CTA to start quote
2. **vehicle** (Vehicles) - Remove navigation buttons
3. **driver** (Drivers) - Remove navigation buttons
4. **coverage** (Coverages) - Remove navigation buttons
5. **payment** (Checkout) - Remove navigation buttons, add per-option CTAs
6. **review** - Remove navigation buttons

## Implementation Plan

### Phase 1: Update QuoteNavigation Component
- [ ] Modify `QuoteNavigation` to conditionally render based on step
- [ ] Only show for `client-info` step (as a "Start Quote" or "Continue" button)
- [ ] Hide for all other steps

### Phase 2: Add CTA to Client Info Form
- [ ] Add a "Start Quote" or "Continue" button to `ClientInfoForm`
- [ ] Button should navigate to next step (vehicle) when clicked
- [ ] Button should be disabled if form is invalid
- [ ] Position button at bottom of the form card

### Phase 3: Add CTAs to Payment Options
- [ ] Add individual CTA buttons for each payment option:
  - **Secure Link**: "Send Link" button (when email is provided)
  - **Credit Card**: "Pay Now" button (when all card fields are valid)
  - **ACH**: "Pay Now" button (when all ACH fields are valid)
- [ ] Each button should be positioned within its respective payment option section
- [ ] Buttons should be disabled until the respective payment method is selected and valid
- [ ] Update `PaymentForm` component to include these CTAs

### Phase 4: Update Main Page
- [ ] Conditionally render `QuoteNavigation` only for `client-info` step
- [ ] Remove `QuoteNavigation` from all other steps

### Phase 5: Cleanup
- [ ] Review and remove any unused navigation logic from `QuoteNavigation`
- [ ] Ensure keyboard navigation still works via progress tabs
- [ ] Test navigation flow end-to-end

## Design Considerations

### Client Info CTA
- Button text: "Start Quote" (if no data) or "Continue" (if data exists)
- Variant: `default` (primary)
- Size: `lg`
- Position: Bottom of card, right-aligned or full-width
- Disabled state: When form validation fails

### Payment Option CTAs
- **Secure Link**: 
  - Button text: "Send Secure Link"
  - Position: Below email input field
  - Disabled: When email is invalid or empty
  
- **Credit Card**:
  - Button text: "Pay Now"
  - Position: Below authorization text, within credit card section
  - Disabled: When any required card field is invalid
  
- **ACH**:
  - Button text: "Pay Now"
  - Position: Below account number field, within ACH section
  - Disabled: When any required ACH field is invalid

## Technical Details

### Files to Modify
1. `app/components/quote-navigation.tsx` - Conditional rendering logic
2. `app/components/client-info-form.tsx` - Add CTA button
3. `app/components/payment/payment-form.tsx` - Add per-option CTAs
4. `app/page.tsx` - Conditional QuoteNavigation rendering

### Dependencies
- `useQuote` hook for step navigation
- Form validation from react-hook-form
- Step navigation via `onStepChange` callback

## Testing Checklist
- [ ] Client info form CTA appears and works correctly
- [ ] Client info form CTA is disabled when form is invalid
- [ ] Payment option CTAs appear only when respective option is selected
- [ ] Payment option CTAs are disabled when fields are invalid
- [ ] Navigation buttons are removed from vehicle, driver, coverage, and review pages
- [ ] Progress tabs still allow navigation between steps
- [ ] Keyboard navigation still works
- [ ] Auto-save functionality is not affected

## Future Considerations
- Consider adding a "Save & Continue Later" option
- May want to add progress indicators showing which steps are complete
- Consider adding validation feedback before allowing navigation
