# Reference: Filters and Bulk Actions Logic

This document preserves the filter and bulk actions logic that was removed from the ImportSummary component for future reference.

## Filter Logic

### Filter Types

```typescript
type FilterSeverity = "all" | "error" | "warning" | "info"
type FilterStatus = "all" | "resolved" | "unresolved"
```

### Filter State Management

```typescript
const [severityFilter, setSeverityFilter] = React.useState<FilterSeverity>("all")
const [statusFilter, setStatusFilter] = React.useState<FilterStatus>("all")
const [searchQuery, setSearchQuery] = React.useState<string>("")
```

### Filtering Logic

The filtering logic combines severity, status, and search filters:

```typescript
const filteredItems = React.useMemo(() => {
  return importSummary.missingInfo.filter((item) => {
    const matchesSeverity =
      severityFilter === "all" || item.severity === severityFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "resolved" && item.checked) ||
      (statusFilter === "unresolved" && !item.checked)
    const matchesSearch =
      !searchQuery.trim() ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())

    return matchesSeverity && matchesStatus && matchesSearch
  })
}, [
  importSummary.missingInfo,
  severityFilter,
  statusFilter,
  searchQuery,
])
```

### Filter Counts Calculation

The filter component calculates counts for each filter option:

```typescript
// From ImportSummaryFilters component
const totalCount = items.length
const resolvedCount = items.filter((item) => item.checked).length
const unresolvedCount = totalCount - resolvedCount

const errorCount = items.filter(
  (item) => item.severity === "error" && !item.checked
).length
const warningCount = items.filter(
  (item) => item.severity === "warning" && !item.checked
).length
const infoCount = items.filter(
  (item) => item.severity === "info" && !item.checked
).length
```

### Filter UI Components

- **ImportSummaryFilters**: Base filter component with severity and status filter buttons
- **CollapsibleFilters**: Wrapper component that makes filters collapsible with a header

## Bulk Actions Logic

### Selection State Management

```typescript
const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())
```

### Unresolved Items Calculation

```typescript
const unresolvedItems = React.useMemo(() => {
  return filteredItems.filter((item) => !item.checked)
}, [filteredItems])
```

### Bulk Selection Handlers

```typescript
// Select all unresolved items
const handleSelectAll = React.useCallback(() => {
  const allUnresolvedIds = new Set(
    unresolvedItems.map((item) => item.id)
  )
  setSelectedItems(allUnresolvedIds)
}, [unresolvedItems])

// Deselect all items
const handleDeselectAll = React.useCallback(() => {
  setSelectedItems(new Set())
}, [])

// Individual item selection toggle
const handleBulkSelect = (itemId: string, selected: boolean) => {
  setSelectedItems((prev) => {
    const next = new Set(prev)
    if (selected) {
      next.add(itemId)
    } else {
      next.delete(itemId)
    }
    return next
  })
}
```

### Bulk Action Handlers

```typescript
// Resolve selected items
const handleResolveSelected = React.useCallback(() => {
  selectedItems.forEach((itemId) => {
    updateImportSummaryItem?.(itemId, true)
  })
  setSelectedItems(new Set())
}, [selectedItems, updateImportSummaryItem])

// Dismiss selected items (currently same as resolve)
const handleDismissSelected = React.useCallback(() => {
  selectedItems.forEach((itemId) => {
    updateImportSummaryItem?.(itemId, true)
  })
  setSelectedItems(new Set())
}, [selectedItems, updateImportSummaryItem])
```

### Checkbox Change Handler

```typescript
const handleCheckboxChange = (itemId: string, checked: boolean) => {
  updateImportSummaryItem?.(itemId, checked)
  // Remove from selection if resolved
  if (checked) {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      next.delete(itemId)
      return next
    })
  }
}
```

### Keyboard Shortcuts

The component supported keyboard shortcuts for bulk actions:

```typescript
React.useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Don't handle shortcuts when typing in inputs or modals are open
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      selectedItem
    ) {
      return
    }

    // Cmd/Ctrl + A: Select all unresolved items
    if ((e.metaKey || e.ctrlKey) && e.key === "a") {
      e.preventDefault()
      if (unresolvedItems.length > 0) {
        handleSelectAll()
      }
      return
    }

    // Cmd/Ctrl + D: Dismiss selected items
    if ((e.metaKey || e.ctrlKey) && e.key === "d") {
      e.preventDefault()
      if (selectedItems.size > 0) {
        handleDismissSelected()
      }
      return
    }

    // Cmd/Ctrl + R: Resolve selected items
    if ((e.metaKey || e.ctrlKey) && e.key === "r") {
      e.preventDefault()
      if (selectedItems.size > 0) {
        handleResolveSelected()
      }
      return
    }
  }

  window.addEventListener("keydown", handleKeyDown)
  return () => window.removeEventListener("keydown", handleKeyDown)
}, [
  selectedItem,
  unresolvedItems.length,
  selectedItems.size,
  handleSelectAll,
  handleDismissSelected,
  handleResolveSelected,
  handleCloseModal,
])
```

### Bulk Actions UI Component

**ImportSummaryBulkActions** component features:
- Sticky positioning (sticky top-0 z-10)
- Select all/deselect all toggle button
- Shows count of selected items
- Resolve and Dismiss action buttons
- Only displays when there are unresolved items or selected items

## Integration Points

### ImportSummary Component Integration

The filters and bulk actions were integrated in the ImportSummary component:

```typescript
// Search and Filters section
<div className="flex flex-col gap-4">
  <ImportSummarySearch
    value={searchQuery}
    onChange={setSearchQuery}
    placeholder="Search items..."
  />
  <CollapsibleFilters
    items={importSummary.missingInfo}
    severityFilter={severityFilter}
    statusFilter={statusFilter}
    onSeverityChange={setSeverityFilter}
    onStatusChange={setStatusFilter}
    defaultOpen={false}
  />
</div>

// Bulk Actions section
{unresolvedItems.length > 0 && (
  <ImportSummaryBulkActions
    selectedItems={selectedItems}
    totalItems={filteredItems.length}
    unresolvedItems={unresolvedItems.length}
    onSelectAll={handleSelectAll}
    onDeselectAll={handleDeselectAll}
    onResolveSelected={handleResolveSelected}
    onDismissSelected={handleDismissSelected}
  />
)}
```

### ImportSummaryGroup Integration

The bulk selection was also integrated into the ImportSummaryGroup component:

```typescript
<ImportSummaryGroup
  severity="error"
  items={groupedItems.error}
  onItemClick={handleItemClick}
  onCheckboxChange={handleCheckboxChange}
  defaultExpanded={true}
  startIndex={0}
  selectedItems={selectedItems}
  onBulkSelect={handleBulkSelect}
  onQuickResolve={handleQuickResolve}
  onQuickDismiss={handleQuickDismiss}
  showQuickActions={selectedItems.size === 0}
/>
```

## Files Preserved

The following component files are preserved for future reference:

- `app/components/import/import-summary-filters.tsx` - Base filter component
- `app/components/import/collapsible-filters.tsx` - Collapsible filter wrapper
- `app/components/import/import-summary-bulk-actions.tsx` - Bulk actions component

## Notes

- Filters were removed to simplify the UI for the demo
- Bulk actions were removed to reduce cognitive load
- Individual item actions (quick resolve/dismiss) may still be available
- Search functionality may still be present depending on requirements
- The underlying data structure and item resolution logic remains unchanged
