# Vehicles Table Component - Implementation Plan

## Overview
Create a power-user optimized, spreadsheet-like editable table for managing vehicles in an insurance quote. The component should replicate the drivers table functionality with vehicle-specific fields, keyboard navigation, inline editing, and integration with vehicle discovery data (similar to MVR for drivers).

## Design System Reference
- **Style**: Linear/Midday aesthetic (clean, minimal, modern) - matching drivers table
- **Colors**: Neutral palette with subtle borders and hover states
- **Typography**: Inter/Geist font family (matching existing components)
- **Spacing**: Consistent padding and gaps (matching drivers table)
- **Layout**: Column-oriented (fields as rows, vehicles as columns) - matching wireframe

## Component Architecture

### 1. Core Components

#### `EditableTableCell` Component (Reuse from Drivers Table)
- **Purpose**: Individual editable cell with different input types
- **Already implemented**: Can be reused with vehicle-specific field types
- **Additional types needed**: 
  - `radio` for "Owned/Leased/Financed" and "Yes/No" fields
  - `number-with-unit` for "Annual Mileage" (12,000 mi)

#### `VehiclesTable` Component (Main)
- **Purpose**: Main table container with keyboard navigation
- **Features**:
  - Keyboard navigation (Tab, Shift+Tab, Arrow keys, Enter, Ctrl/Cmd+N)
  - Vehicle addition (manual and from discovery)
  - Vehicle deletion
  - Cell editing
  - Focus management
  - Badge display (Clean title, Carfax ✓)

### 2. Column Definitions

```typescript
type ColumnType = 'text' | 'dropdown' | 'date' | 'number' | 'boolean' | 'radio' | 'number-with-unit'

interface ColumnDef {
  id: string
  label: string
  type: ColumnType
  options?: string[] // For dropdown/radio type
  radioOptions?: { value: string; label: string }[] // For radio groups
  required?: boolean
  width?: string
  editable?: boolean
  unit?: string // For number-with-unit type (e.g., "mi")
}
```

**Proposed Columns (from wireframe):**
- VIN (text, required)
- Year (number, required)
- Make (text/dropdown, required)
- Model (text/dropdown, required)
- Trim (dropdown)
- Primary Use* (dropdown: "Commute", "Business", "Pleasure", "Farm", "Other", required)
- Annual Mileage* (number-with-unit: "mi", required)
- Owned, Leased or Financed (radio: "Own", "Lease", "Finance")
- Ownership Length* (dropdown: "+1 year", "+2 years", "+3 years", "+4 years", "+5 years", etc., required)
- Is the garaging ZIP the same as the primary address? (radio: "Yes", "No")

### 3. Data Structure

```typescript
interface Vehicle {
  id: string
  vin: string
  year: string
  make: string
  model: string
  trim: string
  primaryUse: string
  annualMileage: string // e.g., "12000"
  ownershipType: string // "Own", "Lease", "Finance"
  ownershipLength: string
  garagingZipSame: boolean | string // true/false or "Yes"/"No"
  isFromDiscovery?: boolean
  discoveryData?: {
    source: string
    confidence: number
  }
  badges?: {
    cleanTitle?: boolean
    carfaxVerified?: boolean
  }
}

interface DiscoveredVehicle {
  make: string
  model: string
  year: string
  vin?: string
  confidence: number
  source: string
  badges?: {
    cleanTitle?: boolean
    carfaxVerified?: boolean
  }
}
```

### 4. Keyboard Navigation

#### Navigation Keys (Same as Drivers Table):
- **Tab**: Move to next cell (down, then right)
- **Shift+Tab**: Move to previous cell (up, then left)
- **Arrow Keys**: 
  - Up/Down: Move between fields (vertical)
  - Left/Right: Move between vehicles (horizontal)
- **Enter**: Start editing current cell, or move down if already editing
- **Escape**: Cancel editing, return to view mode
- **Ctrl/Cmd + N**: Add new vehicle

#### Focus Management:
- Track active cell with `{ vehicleIndex: number, fieldIndex: number }`
- Visual focus indicator (background highlight)
- Auto-scroll to keep focused cell in view

### 5. Vehicle Discovery Integration

#### Vehicle Suggestions Component
- **Trigger**: Automatic or manual detection
- **Display**: 
  - List of suggested vehicles from discovery sources
  - Show confidence score
  - Show source information
  - Show badges (Clean title, Carfax ✓)
  - "Add to Quote" action for each suggestion
- **Filtering**: Exclude vehicles already in the table (by VIN if available)

#### Discovery Data Structure:
```typescript
interface DiscoveredVehicle {
  make: string
  model: string
  year: string
  vin?: string
  confidence: number
  source: string
  badges?: {
    cleanTitle?: boolean
    carfaxVerified?: boolean
  }
}
```

### 6. UI/UX Features

#### Visual Design:
- **Table Style**: 
  - Column-oriented layout (fields on left, vehicles as columns)
  - Clean borders (`border-[#e5e7eb]`)
  - Subtle row hover (`hover:bg-[#f9fafb]`)
  - Focus ring on active cell
  - Sticky field labels column
  
- **Cell Editing**:
  - Inline editing (no modal)
  - Input appears on focus
  - Dropdown opens on focus/click
  - Radio buttons inline
  - Smooth transitions

- **Vehicle Indicators**:
  - Badges at top of vehicle column: "Clean title", "Carfax ✓"
  - New vehicles: Subtle highlight or ring
  - Discovery vehicles: Badge or icon indicating source
  - Delete button: Appears on vehicle column hover

- **Right Sidebar**:
  - "Add Another Vehicle" button
  - "Vehicles Found" section (similar to MVR suggestions)
  - Keyboard shortcuts panel

#### Responsive Behavior:
- Horizontal scroll for smaller screens
- Sticky field labels column
- Minimum column widths (348px per vehicle column, 321px for labels)

### 7. State Management

#### Local State (React):
- `vehicles`: Array of vehicle objects
- `activeCell`: `{ vehicleIndex: number, fieldIndex: number } | null`
- `editingCell`: `{ vehicleIndex: number, fieldIndex: number } | null`
- `discoveredVehicles`: Array of discovered vehicle suggestions
- `newVehicleIds`: Set of newly added vehicle IDs
- `validationErrors`: Map of validation errors by cell

#### State Updates:
- Optimistic updates for better UX
- Validation on blur/change
- Real-time validation feedback

### 8. Validation

#### Cell-Level Validation:
- Required fields: Show error state if empty
- VIN format: Validate VIN format (17 characters, alphanumeric)
- Year format: Validate year (1900-current year+1)
- Number format: Validate numeric inputs (mileage)
- Dropdown: Ensure value is in options list

#### Row-Level Validation:
- VIN must be unique across vehicles
- Year must be valid (1900 to current year+1)
- Annual mileage must be positive number

### 9. File Structure

```
app/
  components/
    vehicles-table/
      vehicles-table.tsx          # Main table component
      editable-table-cell.tsx      # Reuse from drivers-table (or create shared)
      vehicle-suggestions.tsx      # Vehicle discovery suggestions panel
      use-keyboard-navigation.ts   # Reuse from drivers-table (or create shared)
      types.ts                     # TypeScript types
      columns.ts                   # Column definitions
      validation.ts                # Validation utilities
      keyboard-shortcuts.tsx       # Reuse from drivers-table
```

### 10. Implementation Steps

1. **Phase 1: Core Table Structure**
   - Create basic table layout with static data
   - Implement column definitions
   - Style to match drivers table and wireframe
   - Add field labels column (sticky)
   - Add vehicle columns

2. **Phase 2: Cell Editing**
   - Implement inline editing for text cells (VIN, Year, Make, Model)
   - Add dropdown cells (Trim, Primary Use, Ownership Length)
   - Add number-with-unit cell (Annual Mileage)
   - Add radio button cells (Ownership Type, Garaging ZIP)

3. **Phase 3: Keyboard Navigation**
   - Reuse keyboard navigation hook from drivers table
   - Implement Tab/Shift+Tab navigation
   - Add Arrow key navigation
   - Add Enter/Escape handling
   - Add Ctrl/Cmd+N for new vehicle
   - Implement focus management

4. **Phase 4: Vehicle Management**
   - Add "Add Vehicle" functionality
   - Implement vehicle deletion
   - Add vehicle indicators (new, discovery)
   - Add badges (Clean title, Carfax ✓)

5. **Phase 5: Vehicle Discovery Integration**
   - Create vehicle suggestions component
   - Add "Add from Discovery" functionality
   - Filter out existing vehicles
   - Display badges from discovery data

6. **Phase 6: Polish & Optimization**
   - Add validation (VIN format, year, mileage)
   - Improve accessibility
   - Add loading states
   - Optimize performance
   - Add error states and visual feedback

### 11. Reusable Components Strategy

#### Option 1: Shared Components
- Create `shared/editable-table/` directory
- Move `EditableTableCell`, `useKeyboardNavigation` to shared
- Both drivers and vehicles tables use shared components

#### Option 2: Copy and Adapt
- Copy drivers table components
- Adapt for vehicles-specific needs
- Keep separate for easier independent evolution

**Recommendation**: Start with Option 2 (copy and adapt) for faster iteration, then refactor to shared components if needed.

### 12. Dependencies

Already available in project:
- `@radix-ui/react-select` - For dropdown cells
- `@radix-ui/react-radio-group` - For radio button cells
- `lucide-react` - For icons
- Tailwind CSS - For styling
- All validation utilities from drivers table

### 13. Accessibility

- **Keyboard Navigation**: Full keyboard support (as specified)
- **ARIA Labels**: Proper labels for screen readers
- **Focus Indicators**: Clear visual focus states
- **Error Messages**: Accessible error announcements
- **Table Semantics**: Proper grid structure with headers
- **Radio Groups**: Properly labeled radio button groups

### 14. Performance Considerations

- **Memoization**: Memoize cell components to prevent unnecessary re-renders
- **Virtualization**: Consider if table grows large (>50 vehicles)
- **Debouncing**: Debounce cell value changes if needed
- **Lazy Loading**: Load vehicle discovery suggestions on demand

### 15. Key Differences from Drivers Table

1. **Field Types**:
   - Radio buttons (not in drivers table)
   - Number with unit (Annual Mileage)
   - VIN validation (unique, format)

2. **Badges**:
   - Display at top of vehicle column
   - "Clean title", "Carfax ✓" badges

3. **Discovery vs MVR**:
   - Similar concept but for vehicles
   - Different data structure
   - Different filtering logic (by VIN)

4. **Layout**:
   - Same column-oriented layout
   - Same sticky field labels
   - Same right sidebar pattern

### 16. Sample Data

```typescript
const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: 'vehicle-1',
    vin: '1HGCM82633A123456',
    year: '2021',
    make: 'Honda',
    model: 'Accord',
    trim: 'EX-L',
    primaryUse: 'Commute',
    annualMileage: '12000',
    ownershipType: 'Own',
    ownershipLength: '+5 years',
    garagingZipSame: 'Yes',
    badges: {
      cleanTitle: true,
      carfaxVerified: true,
    },
  },
  // ... more vehicles
]

const SAMPLE_DISCOVERED_VEHICLES: DiscoveredVehicle[] = [
  {
    make: 'Ford',
    model: 'Fiesta',
    year: '2010',
    confidence: 0.95,
    source: 'DMV',
    badges: {
      cleanTitle: true,
    },
  },
]
```

## Next Steps

1. Review and approve this plan
2. Start with Phase 1: Core Table Structure
3. Reuse/adapt components from drivers table
4. Iterate based on feedback
5. Continue through phases sequentially

