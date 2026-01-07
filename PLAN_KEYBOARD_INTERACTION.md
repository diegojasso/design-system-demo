# Keyboard Navigation Interaction Plan

## Current Behavior
- Tab/Arrow keys navigate AND automatically enter edit mode
- Click/double-click enters edit mode
- Enter key also enters edit mode (redundant)

## Desired Behavior

### Navigation (Tab, Arrow Keys)
- **Tab/Shift+Tab**: Move focus to next/previous cell
- **Arrow Keys**: Move focus in direction (Up/Down/Left/Right)
- **Visual State**: Show active cell with highlight (already implemented)
- **No Edit Mode**: Navigation should NOT automatically enter edit mode
- **View Only**: User can see cell values while navigating

### Entering Edit Mode
- **Enter Key**: Only way to enter edit mode via keyboard
- **Click/Double-Click**: Still enters edit mode (mouse interaction)
- **Focus Indicator**: Active cell should be clearly visible but not editing

### Editing State
- **Once Editing**: User can type/edit text inputs
- **Dropdowns**: Open automatically when Enter is pressed on dropdown cell
- **Date Pickers**: Open automatically when Enter is pressed on date cell
- **Radio Buttons**: Show options when Enter is pressed on boolean cell

### Exiting Edit Mode
- **Enter**: Save and move to next cell (if editing)
- **Escape**: Cancel editing, return to view mode
- **Blur**: Save and exit edit mode (clicking away, tabbing away)

## Implementation Changes Needed

### 1. `use-keyboard-navigation.ts`
- **Remove auto-edit on navigation**: `moveToCell` should NOT set `startEditing` by default
- **Enter key handler**: Only Enter should trigger `startEditing()`
- **Tab/Arrow keys**: Should only call `moveToCell()` without editing

### 2. `drivers-table.tsx`
- **`handleCellFocus`**: Should NOT automatically call `startEditing()`
- **Separate handlers**: 
  - `handleCellFocus`: Just moves focus (for navigation)
  - `handleCellEdit`: Enters edit mode (for Enter key or click)

### 3. `editable-table-cell.tsx`
- **Click handler**: Should enter edit mode (keep current behavior)
- **Double-click**: Should enter edit mode (keep current behavior)
- **Display mode**: Should show value clearly, with hover state

## User Flow Examples

### Example 1: Navigating with Tab
1. User presses Tab → Focus moves to next cell
2. Cell is highlighted but NOT editing
3. User can see the value
4. User presses Enter → Now enters edit mode
5. User can edit or see dropdown options

### Example 2: Navigating with Arrow Keys
1. User presses Arrow Down → Focus moves down
2. Cell is highlighted but NOT editing
3. User can see the value
4. User presses Enter → Now enters edit mode
5. User can edit or see dropdown options

### Example 3: Dropdown Cell
1. User navigates to dropdown cell (Tab/Arrow)
2. Cell shows current value (e.g., "Married")
3. User presses Enter → Dropdown opens
4. User selects option → Saves and exits edit mode

### Example 4: Text Cell
1. User navigates to text cell (Tab/Arrow)
2. Cell shows current value (e.g., "Sally")
3. User presses Enter → Cell enters edit mode
4. User types new value → Saves on Enter or blur

## Benefits
- **Better UX**: Users can navigate and review values without accidentally editing
- **Intentional Editing**: Only edits when user explicitly wants to (Enter key)
- **Faster Navigation**: Can quickly scan through cells without triggering edit mode
- **Clearer State**: Clear distinction between "viewing" and "editing" states

## Edge Cases to Handle
- **First cell focus**: Should start in view mode, not edit mode
- **Click after keyboard nav**: Clicking should still enter edit mode
- **Enter on already editing cell**: Should save and move to next cell
- **Escape during navigation**: Should clear focus (if needed)
- **Dropdown auto-open**: When Enter is pressed on dropdown, it should open immediately

## Testing Checklist
- [ ] Tab navigation doesn't enter edit mode
- [ ] Shift+Tab navigation doesn't enter edit mode
- [ ] Arrow key navigation doesn't enter edit mode
- [ ] Enter key enters edit mode
- [ ] Click still enters edit mode
- [ ] Double-click still enters edit mode
- [ ] Enter on text cell allows editing
- [ ] Enter on dropdown cell opens dropdown
- [ ] Enter on date cell opens date picker
- [ ] Enter on boolean cell shows radio options
- [ ] Escape cancels editing
- [ ] Tab while editing moves to next cell and saves

