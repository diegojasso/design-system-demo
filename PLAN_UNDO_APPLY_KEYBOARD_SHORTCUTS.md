# Plan: ESC to Undo / Enter to Apply Keyboard Shortcuts

## Overview
Add keyboard shortcuts to allow users to undo changes with ESC and apply changes with Enter when editing form fields and table cells.

## Current Behavior

### Tables (Drivers & Vehicles)
- Changes are applied immediately on every keystroke via `handleCellChange`
- ESC key calls `onBlur(false)` which stops editing but doesn't undo changes
- Enter key calls `onBlur(true)` which stops editing and moves to next cell
- No mechanism to track original values before editing starts

### Client Info Form
- Uses react-hook-form for state management
- Enter key moves focus between fields
- No undo functionality currently
- Form submission happens on Enter in the last field

## Requirements

### Tables (Drivers & Vehicles)
1. **Track Original Value**: When editing starts, store the original value
2. **ESC to Undo**: On ESC, restore the original value and exit edit mode
3. **Enter to Apply**: On Enter, keep current value (already applied) and move to next cell
4. **Blur Behavior**: On blur (clicking away), keep current value (already applied)

### Client Info Form
1. **Track Form State**: When user starts editing any field, store the current form values
2. **ESC to Undo**: On ESC, restore form to the saved state
3. **Enter to Apply**: On Enter, keep current values and move focus (existing behavior)
4. **Scope**: ESC should undo all changes made since the last "apply" (Enter on last field or form submission)

## Implementation Plan

### Phase 1: Tables (Drivers & Vehicles)

#### 1.1 Update Table Components
**Files**: 
- `app/components/drivers-table/drivers-table.tsx`
- `app/components/vehicles-table/vehicles-table.tsx`

**Changes**:
- Add state to track original value when editing starts: `originalEditingValue`
- Store original value in `handleCellEdit` or when `startEditing()` is called
- Modify `handleCellBlur` to accept an `undo` parameter
- Create `handleCellUndo` function that restores original value

#### 1.2 Update EditableTableCell Components
**Files**:
- `app/components/drivers-table/editable-table-cell.tsx`
- `app/components/vehicles-table/editable-table-cell.tsx`

**Changes**:
- Modify `onBlur` callback to accept an `undo` boolean parameter
- Update `handleKeyDown` to pass `undo: true` when ESC is pressed
- Update `handleKeyDown` to pass `undo: false` when Enter is pressed
- Ensure ESC properly restores original value before calling `onBlur`

#### 1.3 Update Change Handling
**Files**: Same as 1.1

**Changes**:
- Modify `handleCellChange` to only update state (keep current behavior)
- Add `handleCellUndo` that restores the original value from `originalEditingValue`
- Ensure validation errors are cleared when undoing

### Phase 2: Client Info Form

#### 2.1 Track Form State
**File**: `app/components/client-info-form.tsx`

**Changes**:
- Add state to track form snapshot: `formSnapshot`
- Use `form.getValues()` to capture current form state
- Store snapshot when user starts editing (onFocus of any field)
- Store snapshot when form is submitted (after successful submission)

#### 2.2 Add ESC Handler
**File**: `app/components/client-info-form.tsx`

**Changes**:
- Add keyboard event listener for ESC key
- On ESC, restore form using `form.reset(formSnapshot)`
- Only trigger if form has been modified since last snapshot
- Use `form.formState.isDirty` to check if form has changes

#### 2.3 Update Enter Behavior
**File**: `app/components/client-info-form.tsx`

**Changes**:
- Keep existing Enter behavior (move focus between fields)
- On Enter in last field, update snapshot after submission
- Ensure snapshot is updated after successful form submission

## Technical Details

### Table Implementation

```typescript
// In table component
const [originalEditingValue, setOriginalEditingValue] = React.useState<{
  vehicleIndex: number
  fieldIndex: number
  value: any
} | null>(null)

const handleCellEdit = (vehicleIndex: number, fieldIndex: number) => {
  moveToCell(vehicleIndex, fieldIndex)
  startEditing()
  // Store original value
  const field = fields[fieldIndex]
  const vehicle = vehicles[vehicleIndex]
  setOriginalEditingValue({
    vehicleIndex,
    fieldIndex,
    value: vehicle[field.id as keyof Vehicle]
  })
}

const handleCellUndo = () => {
  if (!originalEditingValue) return
  const { vehicleIndex, fieldIndex, value } = originalEditingValue
  const field = fields[fieldIndex]
  
  // Restore original value
  const updatedVehicles = vehicles.map((v, idx) =>
    idx === vehicleIndex
      ? { ...v, [field.id]: value }
      : v
  )
  setVehicles(updatedVehicles)
  
  // Clear validation errors for this cell
  const errorKey = `${vehicleIndex}-${field.id}`
  setValidationErrors((prev) => {
    const newErrors = new Map(prev)
    newErrors.delete(errorKey)
    return newErrors
  })
  
  // Clear original value tracking
  setOriginalEditingValue(null)
}

const handleCellBlur = (moveNextAfterBlur = false, undo = false) => {
  if (undo && originalEditingValue) {
    handleCellUndo()
  }
  stopEditing()
  setOriginalEditingValue(null)
  
  // After blur, if Enter was pressed, move to next cell
  if (moveNextAfterBlur && !undo && activeCell) {
    // ... existing navigation logic
  }
}
```

### Form Implementation

```typescript
// In client-info-form component
const [formSnapshot, setFormSnapshot] = React.useState<ClientInfoFormValues | null>(null)

// Capture snapshot when user starts editing
const handleFieldFocus = () => {
  if (!formSnapshot) {
    setFormSnapshot(form.getValues())
  }
}

// Handle ESC key
React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && form.formState.isDirty && formSnapshot) {
      e.preventDefault()
      form.reset(formSnapshot)
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [form, formSnapshot])

// Update snapshot after successful submission
const onSubmit = (data: ClientInfoFormValues) => {
  console.log("Form submitted:", data)
  setFormSnapshot(data) // Update snapshot to current values
  // TODO: Handle form submission
}
```

## Edge Cases

### Tables
1. **Multiple rapid edits**: Only track the value when editing starts, not on every change
2. **Validation errors**: Clear errors when undoing
3. **New rows**: Handle new rows that don't have original values
4. **Dropdown/Radio changes**: These auto-apply, so ESC should still undo them

### Form
1. **No changes**: ESC should do nothing if form hasn't been modified
2. **Form submission**: After submission, snapshot should be updated to current values
3. **Multiple fields**: ESC should undo all changes, not just the current field
4. **Validation errors**: Undoing should clear validation errors

## Testing Checklist

### Tables
- [ ] ESC restores original value when editing a cell
- [ ] ESC exits edit mode without moving to next cell
- [ ] Enter applies changes and moves to next cell
- [ ] Clicking away applies changes (no undo)
- [ ] Validation errors are cleared when undoing
- [ ] Works for all field types (text, number, date, dropdown, radio, boolean)
- [ ] Works for new rows

### Form
- [ ] ESC restores form to last snapshot
- [ ] ESC does nothing if form hasn't been modified
- [ ] Snapshot is created when user starts editing
- [ ] Snapshot is updated after form submission
- [ ] Enter still moves focus between fields
- [ ] Validation errors are cleared when undoing

## Accessibility

- Ensure screen readers announce undo/apply actions
- Maintain keyboard navigation flow
- ESC should be consistent with user expectations (cancel/undo)

## Future Enhancements

1. Visual feedback when changes are pending (e.g., highlight modified fields)
2. Undo/redo stack for multiple operations
3. Confirmation dialog for ESC if significant changes were made
4. Per-field undo (currently ESC undoes all form changes)
