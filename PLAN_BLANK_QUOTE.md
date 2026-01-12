# Plan: Make Start Quote Create Blank Quote

## Overview
Currently, when starting a new quote, the system pre-fills:
- **Client Info**: Default values (James McNulty, john@example.com, etc.)
- **Drivers**: Sample drivers are shown if none exist
- **Vehicles**: Sample vehicles are shown if none exist

This plan outlines changes to make new quotes start completely blank with no pre-filled data.

## Current State Analysis

### 1. Quote Creation (`app/contexts/quote-context.tsx`)
- ✅ `createNewQuote()` already sets `quoteData` to `{}` (line 458)
- ✅ This is correct - no changes needed here

### 2. Client Info Form (`app/components/client-info-form.tsx`)
- ❌ **Issue**: Lines 167-174 have hardcoded default values:
  ```typescript
  return {
    firstName: "James",
    lastName: "McNulty",
    dateOfBirth: new Date("1990-01-01"),
    email: "john@example.com",
    phone: "(555) 123-4567",
    address: "5211 S McQueen Rd, Chandler, AZ 85249",
  }
  ```
- **Fix**: Return empty/default values instead

### 3. Drivers Table (`app/components/drivers-table/drivers-table.tsx`)
- ❌ **Issue**: Lines 92-100 fall back to `SAMPLE_DRIVERS` if no drivers exist
- **Fix**: Return empty array `[]` instead of `SAMPLE_DRIVERS`

### 4. Vehicles Table (`app/components/vehicles-table/vehicles-table.tsx`)
- ❌ **Issue**: Lines 96-104 fall back to `SAMPLE_VEHICLES` if no vehicles exist
- **Fix**: Return empty array `[]` instead of `SAMPLE_VEHICLES`

## Implementation Steps

### Step 1: Update Client Info Form
**File**: `app/components/client-info-form.tsx`

**Change**: Modify `defaultValues` useMemo (lines 157-175) to return empty values when no `quoteData.clientInfo` exists:

```typescript
const defaultValues = React.useMemo<ClientInfoFormValues>(() => {
  if (quoteData.clientInfo) {
    return {
      ...quoteData.clientInfo,
      dateOfBirth: quoteData.clientInfo.dateOfBirth instanceof Date 
        ? quoteData.clientInfo.dateOfBirth 
        : new Date(quoteData.clientInfo.dateOfBirth),
    }
  }
  // Return empty values instead of pre-filled defaults
  return {
    firstName: "",
    lastName: "",
    dateOfBirth: undefined as any, // Will need to handle this
    email: "",
    phone: "",
    address: "",
    driversLicense: undefined,
    driversLicenseState: undefined,
  }
}, [quoteData.clientInfo])
```

**Note**: Need to handle `dateOfBirth` being optional/undefined. May need to adjust validation schema or provide a default date that's clearly not pre-filled.

### Step 2: Update Drivers Table
**File**: `app/components/drivers-table/drivers-table.tsx`

**Change**: Modify `defaultDrivers` useMemo (lines 92-100) to return empty array:

```typescript
const defaultDrivers = React.useMemo(() => {
  if (quoteData.drivers && quoteData.drivers.length > 0) {
    return quoteData.drivers
  }
  if (initialDrivers && initialDrivers.length > 0) {
    return initialDrivers
  }
  return [] // Empty array instead of SAMPLE_DRIVERS
}, [quoteData.drivers, initialDrivers])
```

**Also update**: The initialization effect (lines 119-127) to handle empty arrays:

```typescript
React.useEffect(() => {
  if (!hasInitialized.current) {
    if (quoteData.drivers !== undefined) {
      // Explicitly set to empty array if drivers is undefined or empty
      setDrivers(quoteData.drivers || [])
      hasInitialized.current = true
    } else if (initialDrivers && initialDrivers.length > 0) {
      setDrivers(initialDrivers)
      hasInitialized.current = true
    } else {
      // Initialize with empty array
      setDrivers([])
      hasInitialized.current = true
    }
  }
}, [quoteData.drivers, initialDrivers])
```

### Step 3: Update Vehicles Table
**File**: `app/components/vehicles-table/vehicles-table.tsx`

**Change**: Modify `defaultVehicles` useMemo (lines 96-104) to return empty array:

```typescript
const defaultVehicles = React.useMemo(() => {
  if (quoteData.vehicles && quoteData.vehicles.length > 0) {
    return quoteData.vehicles
  }
  if (initialVehicles && initialVehicles.length > 0) {
    return initialVehicles
  }
  return [] // Empty array instead of SAMPLE_VEHICLES
}, [quoteData.vehicles, initialVehicles])
```

**Also update**: The initialization effect (lines 123-131) to handle empty arrays:

```typescript
React.useEffect(() => {
  if (!hasInitialized.current) {
    if (quoteData.vehicles !== undefined) {
      // Explicitly set to empty array if vehicles is undefined or empty
      setVehicles(quoteData.vehicles || [])
      hasInitialized.current = true
    } else if (initialVehicles && initialVehicles.length > 0) {
      setVehicles(initialVehicles)
      hasInitialized.current = true
    } else {
      // Initialize with empty array
      setVehicles([])
      hasInitialized.current = true
    }
  }
}, [quoteData.vehicles, initialVehicles])
```

### Step 4: Verify Empty State Handling
Ensure components properly handle empty arrays:
- ✅ DriversTable likely already handles empty arrays (shows "Add Driver" button)
- ✅ VehiclesTable likely already handles empty arrays (shows "Add Vehicle" button)
- ✅ ClientInfoForm should show empty form fields (already handled by form library)

### Step 5: Test Edge Cases
1. **New quote creation**: Should start with all empty fields
2. **Loading existing quote**: Should load saved data correctly
3. **Import flow**: Should still work (imports have their own data)
4. **Navigation between steps**: Empty state should persist correctly
5. **Auto-save**: Should save empty arrays correctly

## Additional Notes

### Coverage Form Defaults
The `coverage-form.tsx` component has default coverage values (`DEFAULT_LIABILITY`, `DEFAULT_ADDITIONAL`, `DEFAULT_PRICING`). These are likely intentional since coverage needs some structure to function properly. However, if we want coverage to also start blank, we would need to:
- Initialize with empty/minimal coverage structure
- Handle the case where no vehicles exist (empty vehicleCoverages array)

**Recommendation**: Keep coverage defaults for now - they're less intrusive than pre-filled client/driver/vehicle data. Can be addressed in a future iteration if needed.

### Payment Form Defaults
The `payment-form.tsx` component has defaults but they're derived from client info (clientName, clientEmail). If client info is empty, payment defaults will also be empty. No changes needed here.

## Considerations

### Date of Birth Handling
The `dateOfBirth` field is required in the validation schema but we want it empty initially. Options:
1. Make it optional in the schema (may require form changes)
2. Use a placeholder date that's clearly not real (e.g., `new Date("1900-01-01")`)
3. Use `undefined` and handle validation differently

**Recommendation**: Option 1 - Make `dateOfBirth` optional initially, but validate on form submission. This is the cleanest UX.

### Sample Data Usage
- Sample data (`SAMPLE_DRIVERS`, `SAMPLE_VEHICLES`) should still be available for:
  - Testing/demo purposes
  - Potentially a "Load Sample Data" button in the future
- Just remove the automatic fallback behavior

### Backward Compatibility
- Existing quotes with data should continue to work
- Empty arrays should be saved correctly to localStorage
- Loading quotes should restore empty arrays as empty arrays (not fall back to samples)

## Testing Checklist

- [ ] New quote starts with empty client info form
- [ ] New quote starts with empty drivers table
- [ ] New quote starts with empty vehicles table
- [ ] Existing quotes load correctly with their saved data
- [ ] Import flow still works (has its own data)
- [ ] Empty arrays save correctly to localStorage
- [ ] Empty arrays load correctly from localStorage
- [ ] Navigation between steps preserves empty state
- [ ] Auto-save works with empty data
- [ ] Form validation works with empty fields

## Files to Modify

1. `app/components/client-info-form.tsx` - Remove default values
2. `app/components/drivers-table/drivers-table.tsx` - Remove SAMPLE_DRIVERS fallback
3. `app/components/vehicles-table/vehicles-table.tsx` - Remove SAMPLE_VEHICLES fallback

## Estimated Impact

- **User Experience**: Cleaner start - users see blank forms instead of pre-filled demo data
- **Code Changes**: Minimal - mostly removing fallback logic
- **Risk**: Low - changes are straightforward and well-scoped
