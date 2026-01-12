# Plan: Primary Insured Email as Suggested Email

## Overview
Plan to use the primary insured's email address as the suggested/default email for:
1. **Payment secure link** - When sending payment links to clients
2. **E-signature email reminders** - When sending reminder emails for document signatures

## Current State Analysis

### Primary Insured Email Source
The primary insured email is stored in:
- `quoteData.clientInfo.email` - The email from the Client Information form
- This represents the primary insured (the person whose name appears on the policy)

### Payment Form (`app/components/payment/payment-form.tsx`)
**Current Implementation:**
- Line 124: Gets `clientEmail` from `quoteData.clientInfo?.email`
- Line 131: Uses `quoteData.payment.email || clientEmail` as fallback when payment data exists
- Line 138: Uses `clientEmail` as default when no payment data exists
- Line 338: Email input placeholder is generic: `"email@example.com"`

**Status:** ✅ Already using primary insured email as default value
**Improvement Needed:** Could enhance UX by showing primary insured email as placeholder or helper text

### E-Signature Form (`app/components/e-signature/e-signature-form.tsx`)
**Current Implementation:**
- Lines 63-67: Initializes `reminderEmail` with `clientEmail` from `quoteData.clientInfo?.email`
- Lines 74-80: Updates email if client email changed and reminder email is empty
- Lines 85-91: Initializes email value from either `reminderEmail` or `clientInfo.email`
- Line 141: Uses `clientInfo.email` as fallback when canceling email edit

**Status:** ✅ Already using primary insured email as default value
**Improvement Needed:** Should ensure email updates when `clientInfo.email` changes (even if reminder email was previously set)

## Goals

1. **Ensure primary insured email is always suggested** when:
   - Payment form loads for the first time
   - Payment form email field is empty
   - E-signature form loads for the first time
   - E-signature reminder email field is empty

2. **Improve UX** by:
   - Showing primary insured email as placeholder text in payment form
   - Making it clear that the email comes from primary insured information
   - Ensuring email suggestions update when primary insured email changes

3. **Handle edge cases:**
   - Primary insured email is not set (empty/null)
   - User manually changes email (should preserve user's choice)
   - Primary insured email changes after user has already set a different email

## Implementation Plan

### Phase 1: Payment Form Enhancements

#### 1.1 Update Email Input Placeholder
**File:** `app/components/payment/payment-form.tsx`

**Changes:**
- Update placeholder to show primary insured email when available
- Format: `clientEmail || "email@example.com"`
- This provides visual feedback that the email is pre-filled from primary insured

**Code Change:**
```typescript
// Line ~338
<Input
  {...field}
  type="email"
  placeholder={clientEmail || "email@example.com"}
  className="h-10 text-base leading-[1.5]"
  style={{ fontFamily: "Inter, sans-serif" }}
/>
```

#### 1.2 Add Helper Text (Optional Enhancement)
**Consideration:** Add helper text below email field indicating it's from primary insured
- Text: "Using primary insured's email address"
- Only show when email matches primary insured email
- Could be a subtle hint to improve UX

#### 1.3 Ensure Email Updates When Client Info Changes
**Current Behavior:** Email is set from `defaultValues` memo, which depends on `clientEmail`
**Status:** ✅ Already reactive to `clientEmail` changes via `useMemo` dependency

**Enhancement:** Consider resetting email field if:
- Payment method is "secure-link"
- Current email is empty or matches old primary insured email
- New primary insured email is available

### Phase 2: E-Signature Form Enhancements

#### 2.1 Improve Email Initialization Logic
**File:** `app/components/e-signature/e-signature-form.tsx`

**Current Issue:** Lines 74-80 only update email if `reminderEmail` is empty. Should also update if:
- Primary insured email changed
- Reminder email matches old primary insured email (suggest update)

**Proposed Logic:**
```typescript
// Enhanced logic to suggest update when primary insured email changes
React.useEffect(() => {
  if (!quoteData.eSignature) {
    const clientEmail = quoteData.clientInfo?.email || ""
    const initialESignature: ESignatureData = {
      documents: MOCK_DOCUMENTS,
      sentDate: new Date("2026-01-12"),
      reminderEmail: clientEmail,
      reminderCount: 0,
      lastReminderSent: null,
    }
    updateESignature(initialESignature)
  } else {
    const clientEmail = quoteData.clientInfo?.email || ""
    const currentReminderEmail = quoteData.eSignature.reminderEmail || ""
    
    // Update email if:
    // 1. Reminder email is empty, OR
    // 2. Reminder email matches old primary insured email (suggest update)
    if (clientEmail && (!currentReminderEmail || currentReminderEmail === quoteData.clientInfo?.email)) {
      updateESignature({
        ...quoteData.eSignature,
        reminderEmail: clientEmail,
      })
    }
  }
}, [quoteData.eSignature, quoteData.clientInfo?.email, updateESignature])
```

**Note:** Be careful not to overwrite user's manually entered email. Only update if:
- Email is empty, OR
- Email matches the primary insured email (user hasn't customized it)

#### 2.2 Update Email Value Initialization
**Current:** Lines 85-91 already handle this well
**Status:** ✅ No changes needed

#### 2.3 Add Visual Indicator (Optional Enhancement)
**Consideration:** Show a small indicator when email matches primary insured email
- Could be a badge or icon next to email field
- Text: "Primary insured email"
- Helps users understand where the email comes from

### Phase 3: Edge Cases & Error Handling

#### 3.1 Handle Missing Primary Insured Email
**Scenario:** `quoteData.clientInfo?.email` is empty or undefined

**Current Behavior:**
- Payment form: Uses empty string `""` as default
- E-signature form: Uses empty string `""` as default

**Recommendation:** ✅ Current behavior is acceptable
- Forms should still work without primary insured email
- Users can manually enter email
- No blocking errors

#### 3.2 Handle Email Changes After User Customization
**Scenario:** User manually changes email, then primary insured email changes

**Current Behavior:**
- Payment form: Preserves user's entered email (via form state)
- E-signature form: Preserves user's entered email (via `reminderEmail` in context)

**Recommendation:** ✅ Current behavior is correct
- Don't overwrite user's manual changes
- Only suggest primary insured email when field is empty or matches old primary insured email

#### 3.3 Handle Multiple Email Sources (Future Consideration)
**Potential Enhancement:** If drivers table has email addresses, could:
- Show dropdown with all available emails (primary insured + drivers)
- Allow selection from list
- Default to primary insured email

**Status:** Out of scope for current plan, but worth noting for future

### Phase 4: Testing Scenarios

#### 4.1 Payment Form Tests
1. ✅ Load payment form with primary insured email set → Email field should be pre-filled
2. ✅ Load payment form without primary insured email → Email field should be empty
3. ✅ Change primary insured email → Payment form email should update if empty
4. ✅ User manually changes email → Should preserve user's email
5. ✅ Switch payment methods → Email should persist when switching back to secure-link

#### 4.2 E-Signature Form Tests
1. ✅ Load e-signature form with primary insured email → Reminder email should be pre-filled
2. ✅ Load e-signature form without primary insured email → Reminder email should be empty
3. ✅ Change primary insured email → Reminder email should update if empty or matches old email
4. ✅ User manually changes reminder email → Should preserve user's email
5. ✅ Cancel email edit → Should revert to saved reminder email or primary insured email

## Implementation Checklist

### Payment Form
- [ ] Update email input placeholder to show primary insured email
- [ ] Verify email updates when primary insured email changes
- [ ] Test edge cases (empty email, user customization)
- [ ] (Optional) Add helper text indicating email source

### E-Signature Form
- [ ] Enhance email initialization logic to handle primary insured email changes
- [ ] Verify email updates appropriately when primary insured email changes
- [ ] Test edge cases (empty email, user customization)
- [ ] (Optional) Add visual indicator when email matches primary insured email

### Documentation
- [ ] Document the primary insured email suggestion behavior
- [ ] Add comments in code explaining the logic
- [ ] Update any relevant user-facing documentation

## Code Locations

### Files to Modify
1. `app/components/payment/payment-form.tsx`
   - Line ~338: Update placeholder
   - Lines 127-153: Review defaultValues logic (already correct)

2. `app/components/e-signature/e-signature-form.tsx`
   - Lines 61-82: Enhance email initialization logic
   - Lines 85-91: Review email value initialization (already correct)

### Files to Review (No Changes Expected)
1. `app/components/client-info-form.tsx` - Source of primary insured email
2. `app/contexts/quote-context.tsx` - Quote data structure
3. `app/components/drivers-table/` - Drivers may have emails, but primary insured is in clientInfo

## Success Criteria

1. ✅ Primary insured email is automatically suggested in payment form
2. ✅ Primary insured email is automatically suggested in e-signature form
3. ✅ Email suggestions update when primary insured email changes (when appropriate)
4. ✅ User's manual email changes are preserved
5. ✅ Forms work correctly when primary insured email is not set
6. ✅ No breaking changes to existing functionality

## Future Enhancements (Out of Scope)

1. **Email Selection Dropdown:** Allow users to select from primary insured + drivers' emails
2. **Email Validation:** Show warning if email doesn't match any driver's email
3. **Email History:** Track previously used emails for suggestions
4. **Bulk Email Updates:** Option to update all email fields when primary insured email changes

## Notes

- The primary insured is identified by `quoteData.clientInfo` (not by driver relationship)
- Drivers can have their own emails, but primary insured email takes precedence for payment and e-sign
- Current implementation already handles most cases correctly; this plan focuses on UX improvements and edge case handling
