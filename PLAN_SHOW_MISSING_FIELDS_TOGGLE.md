# Show Missing Fields Only Toggle - Implementation Plan

## Overview
Add a toggle control to the Drivers table that filters the field rows to show only fields with missing required data. This helps users focus on incomplete information.

## Current State
- ✅ Missing field detection already implemented (`missingFields` state)
- ✅ Visual highlighting for missing fields (amber background)
- ✅ Utilities for checking missing fields (`getMissingFields`, `getRowMissingCount`)
- ❌ No filtering mechanism to show only missing fields
- ❌ No toggle UI control

## Design Requirements

### Toggle Placement
Based on the wireframe, the toggle should be:
- Located in the header area, near the "Drivers" label
- Positioned in the Field Labels Column header (left fixed column)
- Label: "Show missing questions only" or "Show missing fields only"
- Style: Switch component with label

### Visual Design
- **Toggle Component**: Use existing `Switch` component from `@/components/ui/switch`
- **Label**: Text should be `text-sm text-[#6b7280]` to match existing design
- **Layout**: Flex container with label and switch, aligned horizontally
- **Spacing**: Gap between label and switch, padding consistent with header

## Implementation Steps

### Step 1: Add Toggle State
Add a new state variable to track the toggle status:
```typescript
const [showMissingOnly, setShowMissingOnly] = React.useState(false)
```

### Step 2: Create Filtered Fields Logic
Create a memoized filtered fields array that:
- Returns all fields when toggle is OFF
- Returns only fields with missing data when toggle is ON
- Checks if any driver has missing data for that field

```typescript
const visibleFields = React.useMemo(() => {
  if (!showMissingOnly) return fields
  
  return fields.filter((field) => {
    // Check if any driver has missing data for this field
    return drivers.some((driver, driverIndex) => {
      const errorKey = `${driverIndex}-${field.id}`
      return missingFields.has(errorKey)
    })
  })
}, [fields, drivers, missingFields, showMissingOnly])
```

### Step 3: Update Field Rows Rendering
Replace `fields.map()` with `visibleFields.map()` in the field rows section:
- Update the field rows loop to use `visibleFields`
- Ensure `fieldIndex` is correctly mapped (use `visibleFields.findIndex()` or track original index)
- Update `aria-rowindex` to reflect filtered position

### Step 4: Add Toggle UI to Header
Add the toggle control in the Field Labels Column header:
- Place it below or next to the "Drivers" label
- Use Switch component with proper styling
- Add label text matching wireframe

### Step 5: Handle Keyboard Navigation
Update keyboard navigation to work with filtered fields:
- The `useKeyboardNavigation` hook uses `fieldCount: fields.length`
- When filtering, navigation should only move between visible fields
- Consider updating the hook to accept filtered field count, or handle filtering within the component

### Step 6: Update Active Cell Tracking
Ensure active cell tracking works correctly:
- When toggle changes, if active cell is on a hidden field, move to nearest visible field
- Preserve active cell when possible when toggling

## Code Structure

### Header Section Update
```typescript
{/* Header */}
<div 
  className="h-[64px] px-4 flex items-center justify-between border-b border-[#e5e7eb] bg-white"
  role="columnheader"
  aria-label="Field labels"
>
  <div className="flex flex-col gap-2">
    <span
      className="text-sm font-medium text-[#6b7280]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Drivers
    </span>
    <label className="flex items-center gap-2 cursor-pointer">
      <Switch
        checked={showMissingOnly}
        onCheckedChange={setShowMissingOnly}
        className="data-[state=checked]:bg-blue-600"
      />
      <span 
        className="text-xs text-[#6b7280]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Show missing questions only
      </span>
    </label>
  </div>
</div>
```

### Field Filtering Logic
```typescript
const visibleFields = React.useMemo(() => {
  if (!showMissingOnly) return fields
  
  return fields.filter((field) => {
    // Check if any driver has missing data for this field
    return drivers.some((driver, driverIndex) => {
      if (!field.required) return false
      const errorKey = `${driverIndex}-${field.id}`
      return missingFields.has(errorKey)
    })
  })
}, [fields, drivers, missingFields, showMissingOnly])
```

### Field Rows Update
```typescript
{visibleFields.map((field, visibleIndex) => {
  const originalFieldIndex = fields.findIndex(f => f.id === field.id)
  return (
    <div
      key={field.id}
      className="h-[44px] px-4 flex items-center border-b border-[#f3f4f6] last:border-b-0 bg-white"
      role="rowheader"
      aria-rowindex={visibleIndex + 2}
    >
      {/* ... field label ... */}
    </div>
  )
})}
```

### Driver Columns Update
```typescript
{drivers.map((driver, driverIndex) => (
  <div key={driver.id} /* ... */>
    {/* Header */}
    {/* ... */}
    
    {/* Field Values */}
    {visibleFields.map((field, visibleIndex) => {
      const originalFieldIndex = fields.findIndex(f => f.id === field.id)
      // ... rest of cell rendering
    })}
  </div>
))}
```

## Edge Cases to Handle

1. **No Missing Fields**: When toggle is ON but no fields have missing data, show empty state or message
2. **Active Cell on Hidden Field**: When toggle changes, if active cell is on a now-hidden field, move to first visible field
3. **All Fields Hidden**: If all fields are hidden, show appropriate message
4. **Field Index Mapping**: Ensure field indices are correctly mapped between original and filtered arrays

## Testing Considerations

1. Toggle ON: Only fields with missing data should be visible
2. Toggle OFF: All fields should be visible
3. Adding data: When a field is completed, it should disappear if toggle is ON
4. Keyboard navigation: Should only navigate between visible fields
5. Active cell: Should handle transitions when toggle changes

## Accessibility

- Toggle should have proper `aria-label` or associated label
- Screen readers should announce when toggle changes
- Focus management when fields are filtered

## File Changes

- `app/components/drivers-table/drivers-table.tsx`: Add toggle state, filtering logic, and UI
