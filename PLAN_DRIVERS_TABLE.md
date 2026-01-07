# Drivers Table Component - Implementation Plan

## Overview
Create a power-user optimized, spreadsheet-like editable table for managing drivers in an insurance quote. The component should support keyboard navigation, inline editing, and integration with MVR (Motor Vehicle Report) data.

## Design System Reference
- **Style**: Linear/Midday aesthetic (clean, minimal, modern)
- **Colors**: Neutral palette with subtle borders and hover states
- **Typography**: Inter/Geist font family (matching existing components)
- **Spacing**: Consistent padding and gaps (matching existing form components)

## Component Architecture

### 1. Core Components

#### `EditableTableCell` Component
- **Purpose**: Individual editable cell with different input types
- **Props**:
  - `value`: Current cell value
  - `type`: `'text' | 'dropdown' | 'date' | 'number'`
  - `options`: Array of options (for dropdown type)
  - `onChange`: Value change handler
  - `onFocus`: Focus handler
  - `onBlur`: Blur handler
  - `isEditing`: Whether cell is currently being edited
  - `isFocused`: Whether cell is focused
  - `placeholder`: Placeholder text
  - `disabled`: Whether cell is disabled

#### `EditableTableRow` Component
- **Purpose**: Table row containing multiple editable cells
- **Props**:
  - `driver`: Driver data object
  - `columns`: Column definitions
  - `onChange`: Handler for cell changes
  - `onDelete`: Handler for row deletion
  - `isNew`: Whether this is a newly added row
  - `isFromMVR`: Whether this row was suggested from MVR data

#### `DriversTable` Component (Main)
- **Purpose**: Main table container with keyboard navigation
- **Features**:
  - Keyboard navigation (Tab, Shift+Tab, Arrow keys, Enter)
  - Row addition (manual and from MVR)
  - Row deletion
  - Cell editing
  - Focus management

### 2. Column Definitions

```typescript
type ColumnType = 'text' | 'dropdown' | 'date' | 'number' | 'boolean'

interface ColumnDef {
  id: string
  label: string
  type: ColumnType
  options?: string[] // For dropdown type
  required?: boolean
  width?: string
  editable?: boolean
}
```

**Proposed Columns:**
- Name (text, required)
- Relationship (dropdown: "Primary", "Spouse", "Child", "Other")
- Date of Birth (date, required)
- Gender (dropdown: "Male", "Female", "Other")
- Marital Status (dropdown: "Single", "Married", "Divorced", "Widowed")
- License Number (text)
- License State (dropdown: US states)
- License Status (dropdown: "Valid", "Suspended", "Expired")
- Years Licensed (number)
- Accidents (number)
- Violations (number)

### 3. Data Structure

```typescript
interface Driver {
  id: string
  name: string
  relationship: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  licenseNumber: string
  licenseState: string
  licenseStatus: string
  yearsLicensed: number
  accidents: number
  violations: number
  isFromMVR?: boolean
  mvrData?: {
    source: string
    confidence: number
  }
}
```

### 4. Keyboard Navigation

#### Navigation Keys:
- **Tab**: Move to next cell (right, then down)
- **Shift+Tab**: Move to previous cell (left, then up)
- **Arrow Keys**: Move in direction (Up/Down/Left/Right)
- **Enter**: Start editing current cell, or move down if already editing
- **Escape**: Cancel editing, return to view mode
- **Delete/Backspace**: Clear cell value (when not editing)
- **Ctrl/Cmd + Enter**: Add new row
- **Ctrl/Cmd + Delete**: Delete current row

#### Focus Management:
- Track active cell with `{ rowIndex: number, columnId: string }`
- Visual focus indicator (border highlight)
- Auto-scroll to keep focused cell in view

### 5. MVR Integration

#### MVR Suggestions Component
- **Trigger**: Button or automatic detection
- **Display**: 
  - List of suggested drivers from MVR
  - Show confidence score
  - Show source information
  - "Add to Quote" action for each suggestion
- **Filtering**: Exclude drivers already in the table

#### MVR Data Structure:
```typescript
interface MVRDriver {
  name: string
  dateOfBirth: string
  licenseNumber: string
  licenseState: string
  violations: number
  accidents: number
  confidence: number
  source: string
}
```

### 6. UI/UX Features

#### Visual Design:
- **Table Style**: 
  - Clean borders (matching existing: `border-[#cdd7e1]`)
  - Subtle row hover (`hover:bg-muted/50`)
  - Focus ring on active cell (`focus-visible:ring-ring/50`)
  - Alternating row colors (optional, subtle)
  
- **Cell Editing**:
  - Inline editing (no modal)
  - Input appears on focus
  - Dropdown opens on focus/click
  - Smooth transitions

- **Row Indicators**:
  - New rows: Subtle highlight or icon
  - MVR rows: Badge or icon indicating source
  - Delete button: Appears on row hover

#### Responsive Behavior:
- Horizontal scroll for smaller screens
- Sticky header row
- Minimum column widths

### 7. State Management

#### Local State (React):
- `drivers`: Array of driver objects
- `activeCell`: `{ rowIndex: number, columnId: string } | null`
- `editingCell`: `{ rowIndex: number, columnId: string } | null`
- `mvrSuggestions`: Array of MVR driver suggestions
- `showMVRSuggestions`: Boolean

#### State Updates:
- Optimistic updates for better UX
- Validation on blur/change
- Debounced auto-save (optional)

### 8. Validation

#### Cell-Level Validation:
- Required fields: Show error state if empty
- Date format: Validate date inputs
- Number format: Validate numeric inputs
- Dropdown: Ensure value is in options list

#### Row-Level Validation:
- At least one required field must be filled
- Date of birth must be valid date
- License number format validation (if applicable)

### 9. File Structure

```
app/
  components/
    drivers-table/
      drivers-table.tsx          # Main table component
      editable-table-cell.tsx    # Individual cell component
      editable-table-row.tsx     # Row component
      mvr-suggestions.tsx        # MVR suggestions panel
      use-drivers-table.ts       # Custom hook for table logic
      types.ts                   # TypeScript types
```

### 10. Implementation Steps

1. **Phase 1: Core Table Structure**
   - Create basic table layout with static data
   - Implement column definitions
   - Style to match Linear/Midday aesthetic

2. **Phase 2: Cell Editing**
   - Implement inline editing for text cells
   - Add dropdown cells
   - Add date picker cells
   - Add number input cells

3. **Phase 3: Keyboard Navigation**
   - Implement Tab/Shift+Tab navigation
   - Add Arrow key navigation
   - Add Enter/Escape handling
   - Implement focus management

4. **Phase 4: Row Management**
   - Add "Add Row" functionality
   - Implement row deletion
   - Add row indicators (new, MVR)

5. **Phase 5: MVR Integration**
   - Create MVR suggestions component
   - Add "Add from MVR" functionality
   - Filter out existing drivers

6. **Phase 6: Polish & Optimization**
   - Add validation
   - Improve accessibility
   - Add loading states
   - Optimize performance (virtualization if needed)

### 11. Dependencies

Already available in project:
- `@radix-ui/react-select` - For dropdown cells
- `react-day-picker` - For date cells (already in package.json)
- `lucide-react` - For icons
- Tailwind CSS - For styling

May need to add:
- `react-hook-form` - Already available, for form validation
- `zod` - Already available, for schema validation

### 12. Accessibility

- **Keyboard Navigation**: Full keyboard support (as specified)
- **ARIA Labels**: Proper labels for screen readers
- **Focus Indicators**: Clear visual focus states
- **Error Messages**: Accessible error announcements
- **Table Semantics**: Proper `<table>` structure with headers

### 13. Performance Considerations

- **Virtualization**: Consider `@tanstack/react-virtual` if table grows large (>100 rows)
- **Debouncing**: Debounce cell value changes if auto-saving
- **Memoization**: Memoize cell components to prevent unnecessary re-renders
- **Lazy Loading**: Load MVR suggestions on demand

### 14. Testing Strategy

- **Unit Tests**: Test cell editing, navigation logic
- **Integration Tests**: Test full table workflows
- **Keyboard Tests**: Test all keyboard shortcuts
- **Accessibility Tests**: Test with screen readers

## Next Steps

1. Review and approve this plan
2. Start with Phase 1: Core Table Structure
3. Iterate based on feedback
4. Continue through phases sequentially

