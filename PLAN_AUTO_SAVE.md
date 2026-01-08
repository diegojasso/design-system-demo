# Plan: Auto-Save Functionality

## Overview
Implement automatic saving of quote data as users make changes, eliminating the need for manual "Save Draft" functionality. This will improve UX by ensuring data is never lost and reducing friction in the quote creation workflow.

## Current State

### Existing Save Draft Implementation
1. **Manual Save Button**: `QuoteHeader` component has a "Save draft" button (not currently connected)
2. **Command Palette**: "Save Draft" command (⌘S) exists but only logs to console
3. **Handler**: `handleSaveDraft` in `app/page.tsx` is a TODO placeholder

### Data Sources
- **Client Info Form** (`ClientInfoForm`): Uses react-hook-form, manages form state internally
- **Drivers Table** (`DriversTable`): Manages drivers array state internally
- **Vehicles Table** (`VehiclesTable`): Manages vehicles array state internally
- **Coverage Step**: Coming soon
- **Review Step**: Coming soon

## Goals

1. **Automatic Saving**: Save quote data automatically as users make changes
2. **Debounced Saves**: Prevent excessive API calls with intelligent debouncing
3. **Save Status Indicators**: Show users when data is saving/saved
4. **Error Handling**: Gracefully handle save failures with retry logic
5. **Data Restoration**: Restore saved data when user returns to quote
6. **Remove Manual Save**: Remove "Save Draft" button and command palette entry

## Architecture

### 1. Quote State Management

#### 1.1 Create Quote Context/Provider
**File**: `app/contexts/quote-context.tsx` (new)

```typescript
interface QuoteData {
  id?: string
  clientInfo?: ClientInfoFormValues
  drivers?: Driver[]
  vehicles?: Vehicle[]
  coverage?: CoverageData // Future
  review?: ReviewData // Future
  lastSaved?: Date
  isDirty?: boolean
}

interface QuoteContextValue {
  quoteData: QuoteData
  updateClientInfo: (data: ClientInfoFormValues) => void
  updateDrivers: (drivers: Driver[]) => void
  updateVehicles: (vehicles: Vehicle[]) => void
  saveQuote: () => Promise<void>
  loadQuote: (quoteId: string) => Promise<void>
  isSaving: boolean
  lastSaved: Date | null
  saveError: Error | null
}
```

**Responsibilities**:
- Centralize quote data state
- Provide methods to update quote sections
- Handle auto-save logic
- Manage save status

#### 1.2 Quote Storage Strategy

**Phase 1: LocalStorage (MVP)**
- Store quote data in localStorage with quote ID as key
- Format: `quote-{quoteId}` → JSON string
- Include metadata: `lastSaved`, `version`, `step`

**Phase 2: Backend API (Future)**
- POST/PUT to `/api/quotes/{quoteId}`
- Handle authentication, validation, error responses
- Sync with backend for multi-device access

### 2. Auto-Save Implementation

#### 2.1 Debounced Save Hook
**File**: `hooks/use-auto-save.ts` (new)

```typescript
interface UseAutoSaveOptions {
  data: any
  saveFn: (data: any) => Promise<void>
  debounceMs?: number // Default: 2000ms
  enabled?: boolean
}

export function useAutoSave(options: UseAutoSaveOptions) {
  // Debounce save calls
  // Track saving state
  // Handle errors
  // Return save status
}
```

**Features**:
- Debounce saves (default 2 seconds after last change)
- Track saving/saved/error states
- Cancel pending saves if component unmounts
- Retry logic on failure

#### 2.2 Integration Points

**ClientInfoForm**:
- Watch form values with `form.watch()`
- Trigger auto-save on form changes
- Use `form.formState.isDirty` to determine if save needed

**DriversTable**:
- Watch `drivers` state changes
- Trigger auto-save when drivers array changes
- Include validation state if needed

**VehiclesTable**:
- Watch `vehicles` state changes
- Trigger auto-save when vehicles array changes
- Include validation state if needed

### 3. Save Status Indicators

#### 3.1 Save Status Component
**File**: `app/components/quote-save-status.tsx` (new)

**Visual States**:
- **Saving**: Spinner icon + "Saving..." text
- **Saved**: Checkmark icon + "Saved" text (fade out after 2s)
- **Error**: Alert icon + "Save failed" text + retry button
- **Idle**: No indicator (when no changes)

**Placement**:
- Replace "Save draft" button in `QuoteHeader`
- Or show as badge/indicator next to quote title

#### 3.2 Toast Notifications (Optional)
- Show toast on successful save
- Show error toast on save failure
- Use existing `sonner` toast component

### 4. Data Restoration

#### 4.1 Load Quote on Mount
**File**: `app/page.tsx`

```typescript
// On component mount or quote ID change:
// 1. Check for existing quote ID in URL or localStorage
// 2. Load quote data from storage
// 3. Populate form/table states
// 4. Navigate to last step if available
```

#### 4.2 Quote ID Management
- Generate quote ID on first change (UUID or timestamp-based)
- Store quote ID in URL query param: `?quote=quote-123`
- Use quote ID as localStorage key
- Allow creating new quote (clears current data)

### 5. Component Updates

#### 5.1 QuoteHeader Component
**Changes**:
- Remove "Save draft" button
- Add save status indicator component
- Show quote ID if available

#### 5.2 ClientInfoForm Component
**Changes**:
- Accept `onDataChange` callback prop
- Call callback on form value changes (debounced)
- Load initial values from quote context if available

#### 5.3 DriversTable Component
**Changes**:
- Accept `onDataChange` callback prop
- Call callback when drivers array changes
- Load initial drivers from quote context if available

#### 5.4 VehiclesTable Component
**Changes**:
- Accept `onDataChange` callback prop
- Call callback when vehicles array changes
- Load initial vehicles from quote context if available

#### 5.5 Command Palette
**Changes**:
- Remove "Save Draft" command (⌘S)
- Optionally add "New Quote" command if not exists
- Optionally add "Load Quote" command

### 6. Error Handling

#### 6.1 Save Error Scenarios
- **Network failure**: Retry with exponential backoff
- **Storage quota exceeded**: Show error, suggest clearing old drafts
- **Invalid data**: Validate before save, show field errors
- **Concurrent edits**: Last-write-wins or conflict resolution

#### 6.2 Error Recovery
- Retry button in save status component
- Auto-retry on network reconnect
- Fallback to localStorage if API unavailable

## Implementation Steps

### Phase 1: Foundation (MVP)
1. ✅ Create `QuoteContext` provider
2. ✅ Create `useAutoSave` hook
3. ✅ Implement localStorage storage
4. ✅ Add save status component
5. ✅ Integrate with ClientInfoForm
6. ✅ Update QuoteHeader to show save status
7. ✅ Remove manual save button

### Phase 2: Full Integration
8. ✅ Integrate with DriversTable
9. ✅ Integrate with VehiclesTable
10. ✅ Add data restoration on mount
11. ✅ Add quote ID management
12. ✅ Remove save draft from command palette

### Phase 3: Polish
13. ✅ Add error handling and retry logic
14. ✅ Add toast notifications
15. ✅ Add loading states
16. ✅ Add tests

### Phase 4: Future Enhancements
17. ⏳ Backend API integration
18. ⏳ Multi-device sync
19. ⏳ Conflict resolution
20. ⏳ Draft management UI (list of saved drafts)

## Technical Details

### Debounce Strategy
- **Initial delay**: 500ms (user stops typing)
- **Subsequent saves**: 2000ms debounce
- **Before navigation**: Immediate save
- **Before unmount**: Immediate save

### Storage Format
```typescript
interface StoredQuote {
  id: string
  version: number
  createdAt: string
  lastSaved: string
  currentStep: StepId
  data: {
    clientInfo?: ClientInfoFormValues
    drivers?: Driver[]
    vehicles?: Vehicle[]
  }
}
```

### Performance Considerations
- Use `React.useMemo` for expensive computations
- Debounce saves to prevent excessive writes
- Batch multiple field changes into single save
- Use `requestIdleCallback` for non-critical saves (if available)

## Testing Strategy

### Unit Tests
- `useAutoSave` hook behavior
- Debounce timing
- Error handling
- Data serialization/deserialization

### Integration Tests
- Form changes trigger saves
- Table changes trigger saves
- Data restoration works correctly
- Save status updates correctly

### E2E Tests
- User types in form → auto-save triggers
- User refreshes page → data restored
- User navigates between steps → data persists
- Network failure → error shown, retry works

## Migration Plan

### Removing Manual Save
1. Remove "Save draft" button from `QuoteHeader`
2. Remove "Save Draft" command from command palette
3. Remove `handleSaveDraft` handler from `page.tsx`
4. Remove `onSaveDraft` prop from `CommandPalette`
5. Update keyboard shortcut documentation

### Backward Compatibility
- If existing drafts exist in localStorage, migrate to new format
- Handle legacy save draft data gracefully

## Success Metrics

1. **User Experience**:
   - No data loss reported
   - Reduced time to complete quotes
   - Positive feedback on auto-save

2. **Technical**:
   - Save success rate > 99%
   - Average save latency < 500ms
   - No performance degradation

3. **Business**:
   - Increased quote completion rate
   - Reduced support tickets about lost data

## Open Questions

1. **Quote ID Generation**: UUID vs timestamp-based vs sequential?
2. **Draft Retention**: How long to keep drafts? Auto-cleanup?
3. **Multi-tab Support**: Handle multiple tabs editing same quote?
4. **Offline Support**: Queue saves when offline, sync when online?
5. **Save Frequency**: Is 2s debounce optimal? User-configurable?

## References

- React Hook Form: https://react-hook-form.com/
- Debouncing: https://davidwalsh.name/javascript-debounce-function
- LocalStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- React Context: https://react.dev/reference/react/createContext
