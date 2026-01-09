# Plan: Quote List Page

## Overview
Create a quote list page that displays all quotes with search, filtering, and pagination capabilities. This page will serve as the main entry point for managing quotes, allowing users to view, search, filter, and navigate to individual quotes.

## Wireframe Analysis

Based on the wireframe, the quote list page includes:

### Layout Structure
- **Breadcrumbs**: "Home > Quotes"
- **Page Title**: "Quotes"
- **Action Button**: "Start Quote" (green button, top right)
- **Search Section**: Search input with magnifying glass icon
- **Filter Section**: Four dropdown filters (Status, Created Date, Agency, Agent)
- **Table**: Quote data with 9 columns
- **Pagination**: Bottom right with rows per page selector

### Table Columns
1. **Quote Number** - With optional missing data indicator (red exclamation mark)
2. **Name** - Client name
3. **Email** - Client email
4. **Vehicle** - Vehicle information (can show multiple vehicles)
5. **Premium/mo** - Monthly premium amount
6. **Status** - Badge with color coding (Open = green, Expired = red)
7. **Created Date** - Date formatted as MM/DD/YYYY
8. **Agency** - Agency name
9. **Agent** - Agent name (blue text, appears clickable)

### Visual Elements
- **Status Badges**: 
  - "Open" - Green pill-shaped background
  - "Expired" - Red pill-shaped background
- **Missing Data Indicator**: Red exclamation mark icon next to quote number
- **Vehicle Display**: Can show multiple vehicles (e.g., "Acura ILX 2021 Audi A4 2020")
- **Agent Name**: Blue text, appears to be a link
- **Pagination**: Shows "1-13 of 2,000" with left/right arrows

## Current State

### Existing Components
- ✅ Table component (`components/ui/table.tsx`)
- ✅ Badge component (`components/ui/badge.tsx`)
- ✅ Button component (`components/ui/button.tsx`)
- ✅ Input component (`components/ui/input.tsx`)
- ✅ Select component (`components/ui/select.tsx`)
- ✅ Pagination component (`components/ui/pagination.tsx`)
- ✅ Breadcrumb component (`components/ui/breadcrumb.tsx`)
- ✅ Quote context (`app/contexts/quote-context.tsx`) - stores individual quote data
- ✅ Quote types (`app/components/command-palette/quote-types.ts`) - defines QuoteStatus type

### Missing Components
- ❌ Quote list page route/component
- ❌ Quote list table component
- ❌ Quote search functionality
- ❌ Quote filtering logic
- ❌ Quote data aggregation (list of all quotes)
- ❌ Navigation to individual quotes

## Data Structure

### Quote List Item Interface
```typescript
interface QuoteListItem {
  id: string
  quoteNumber: string // Uses existing quote ID format (e.g., "quote-1234567890-abc123")
  name: string // Client name (firstName + lastName)
  email: string
  status: QuoteStatus // "draft" | "pending" | "sent" | "accepted" | "rejected"
  createdDate: Date
  agency: string // Real agency names (e.g., "The Zebra", "ezlynx")
  agent: string
}
```

**Note**: Removed `vehicles`, `premiumPerMonth`, `agentId`, and `hasMissingData` per requirements.

### Filter Options
```typescript
interface QuoteFilters {
  status: QuoteStatus | "all"
  createdDate: "all" | "last-7-days" | "last-30-days" | "last-90-days" // Default: "last-7-days"
  agency: string | "all"
  agent: string | "all"
}

// Agency list (real agencies and quote aggregators)
const AGENCIES = [
  "The Zebra",
  "ezlynx",
  "EverQuote",
  "Savvy",
  "Novo",
  // Add more as needed
]

interface QuoteSearch {
  query: string // Searches name and email
}
```

### Pagination
```typescript
interface PaginationState {
  page: number
  pageSize: number // Default: 16 rows per page
  total: number
}
```

## Component Architecture

### 1. Page Route
**File**: `app/quotes/page.tsx` (new)

- Main page component
- Uses QuoteList component
- Handles routing and navigation
- Breadcrumbs: "Home > Quotes"

### 1.1 Individual Quote Route (Optional)
**File**: `app/quotes/[quoteId]/page.tsx` (new, optional)

**Routing Recommendation**:
- **Option A**: `/quotes/[quoteId]` - Cleaner, more RESTful URLs
  - Pros: Clean URLs, better SEO, more intuitive
  - Cons: Requires updating quote context to handle new route pattern
- **Option B**: `/` with `?quote=[quoteId]` - Current pattern
  - Pros: No changes needed to existing quote context
  - Cons: Less clean URLs, query params can be messy

**Recommendation**: Use Option A (`/quotes/[quoteId]`) for better UX, but maintain backward compatibility with Option B during migration.

### 2. Quote List Component
**File**: `app/components/quotes-list/quotes-list.tsx` (new)

**Features**:
- Search input with icon
- Filter dropdowns (Status, Created Date, Agency, Agent)
- Table with quote data
- Pagination controls
- "Start Quote" button
- Loading states
- Empty states

**Props**:
```typescript
interface QuotesListProps {
  initialQuotes?: QuoteListItem[]
  initialFilters?: QuoteFilters
  initialSearch?: string
  initialPagination?: PaginationState
}
```

### 3. Quote Table Component
**File**: `app/components/quotes-list/quotes-table.tsx` (new)

**Features**:
- Renders table rows
- Handles row clicks (navigate to quote)
- Displays status badges
- Shows missing data indicators
- Formats vehicle display
- Formats premium display
- Formats date display

**Props**:
```typescript
interface QuotesTableProps {
  quotes: QuoteListItem[]
  onQuoteClick: (quoteId: string) => void
}
```

**Table Columns** (simplified):
1. Quote Number
2. Name
3. Email
4. Status
5. Created Date
6. Agency
7. Agent

### 4. Quote Filters Component
**File**: `app/components/quotes-list/quote-filters.tsx` (new)

**Features**:
- Status dropdown
- Created Date dropdown (with calendar icon)
- Agency dropdown
- Agent dropdown
- Filter state management
- URL query parameter sync

**Props**:
```typescript
interface QuoteFiltersProps {
  filters: QuoteFilters
  onFiltersChange: (filters: QuoteFilters) => void
  agencies?: string[]
  agents?: string[]
}
```

### 5. Quote Search Component
**File**: `app/components/quotes-list/quote-search.tsx` (new)

**Features**:
- Search input with magnifying glass icon
- Debounced search
- URL query parameter sync
- Placeholder: "Search by name or email"

**Props**:
```typescript
interface QuoteSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}
```

### 6. Utilities

#### Data Fetching/Filtering
**File**: `app/components/quotes-list/utils/filter-quotes.ts` (new)

```typescript
export function filterQuotes(
  quotes: QuoteListItem[],
  search: string,
  filters: QuoteFilters
): QuoteListItem[]

export function searchQuotes(
  quotes: QuoteListItem[],
  query: string
): QuoteListItem[]
```

#### Data Formatting
**File**: `app/components/quotes-list/utils/format-quote-data.ts` (new)

```typescript
export function formatVehicles(vehicles: Vehicle[]): string
export function formatPremium(amount: number): string
export function formatDate(date: Date): string
```

#### Status Helpers
**File**: `app/components/quotes-list/utils/quote-status.ts` (new)

```typescript
export function getStatusBadgeVariant(status: QuoteStatus): BadgeVariant
export function getStatusColor(status: QuoteStatus): string
```

## Implementation Steps

### Phase 1: Basic Page Structure
1. Create `app/quotes/page.tsx`
2. Create `app/components/quotes-list/quotes-list.tsx`
3. Add basic layout with breadcrumbs and title
4. Add "Start Quote" button
5. Create mock data for development

### Phase 2: Table Display
1. Create `app/components/quotes-list/quotes-table.tsx`
2. Implement table with 7 columns (Quote Number, Name, Email, Status, Created Date, Agency, Agent)
3. Add status badges with appropriate colors:
   - `draft`: muted colors
   - `pending`: yellow
   - `sent`: blue
   - `accepted`: green
   - `rejected`: red
4. Format date display (MM/DD/YYYY)
5. Display quote number using existing format

### Phase 3: Search Functionality
1. Create `app/components/quotes-list/quote-search.tsx`
2. Implement search input with icon
3. Add debounced search (300ms)
4. Search by name and email
5. Update table based on search results

### Phase 4: Filtering
1. Create `app/components/quotes-list/quote-filters.tsx`
2. Implement Status filter dropdown
3. Implement Created Date filter dropdown
4. Implement Agency filter dropdown
5. Implement Agent filter dropdown
6. Add filter logic to filter-quotes.ts
7. Combine search and filters

### Phase 5: Pagination
1. Integrate Pagination component
2. Add rows per page selector (default: 16)
3. Implement page navigation
4. Calculate total pages
5. Display "X-Y of Z" format (e.g., "1-16 of 2,000")

### Phase 6: Navigation & Interactions
1. Implement row click → navigate to quote
   - **Routing Decision**: Use `/quotes/[quoteId]` route pattern for cleaner URLs
   - Alternative: Maintain current pattern `/` with `?quote=[quoteId]` for consistency
   - **Recommendation**: `/quotes/[quoteId]` is cleaner and more RESTful
   - Update quote context to handle both patterns or migrate to new pattern
2. Implement "Start Quote" button → navigate to `/` (new quote)
3. Add URL query parameter sync for filters/search/pagination
4. Handle browser back/forward navigation

### Phase 7: Data Integration
1. Create data fetching hook (`use-quotes-list.ts`)
2. **Data Source**: Mock data for now
   - Create mock quotes with realistic data
   - Use real agency names (The Zebra, ezlynx, EverQuote, Savvy, Novo, etc.)
   - Generate sample quotes with various statuses
   - Store in a mock data file or generate programmatically
3. **Performance**: Client-side filtering for now
   - Load all quotes and filter client-side (fine for < 10,000 items)
   - Can optimize later with server-side filtering or virtual scrolling
   - Use React.useMemo for expensive filter operations
4. Handle loading states
5. Handle error states
6. Handle empty states

### Phase 8: Polish & Enhancements
1. Add loading skeletons
2. Add empty state message
3. Add keyboard shortcuts (e.g., Cmd/Ctrl+K for search focus)
4. Add accessibility features (ARIA labels, keyboard navigation)
5. Optimize performance (virtual scrolling if needed)
6. Add sorting (optional, if needed)

## Design Specifications

### Colors
- **Status Badges** (matching command palette):
  - `draft`: Muted colors (`bg-muted text-muted-foreground`)
  - `pending`: Yellow (`bg-yellow-500/10 text-yellow-600 dark:text-yellow-500`)
  - `sent`: Blue (`bg-blue-500/10 text-blue-600 dark:text-blue-500`)
  - `accepted`: Green (`bg-green-500/10 text-green-600 dark:text-green-500`)
  - `rejected`: Red (`bg-red-500/10 text-red-600 dark:text-red-500`)
- **Start Quote Button**: Green (`bg-green-600` or primary variant)

### Typography
- **Page Title**: Large, bold
- **Table Headers**: Medium weight, muted foreground
- **Table Cells**: Regular weight
- **Status Badges**: Small text, rounded-full

### Spacing
- Consistent padding in table cells
- Gap between filters
- Margin between sections

### Icons
- **Search**: Magnifying glass (lucide-react `Search`)
- **Calendar**: Calendar icon (lucide-react `Calendar`)
- **Pagination**: Chevron left/right (lucide-react `ChevronLeft`, `ChevronRight`)

## Answers to Clarifying Questions

### Data & Status
1. **Quote Status Values**: ✅ **ANSWERED**
   - Codebase statuses: `"draft" | "pending" | "sent" | "accepted" | "rejected"`
   - Wireframe shows "Open" and "Expired" - these are display labels, not status values
   - **Solution**: Use existing status types, map to display labels:
     - "Open" = `"draft" | "pending"` (green badge)
     - "Expired" = `"rejected"` (red badge)
     - Other statuses: `"sent"` (blue), `"accepted"` (green), `"rejected"` (red)

2. **Data Source**: ✅ **ANSWERED** - Mock data for now

3. **Missing Data Indicator**: ✅ **ANSWERED** - Don't add missing data indicator yet

### Filters
4. **Agency & Agent Data**: ✅ **ANSWERED**
   - Use real agency names: The Zebra, ezlynx, EverQuote, Savvy, Novo, etc.
   - Include quote aggregators
   - Hardcoded list for now, can be extracted from quotes later

5. **Date Filter Default**: ✅ **ANSWERED** - Default to "Last 7 days"

6. **Custom Date Range**: Not needed for initial implementation

### Navigation
7. **Quote Navigation**: ✅ **RECOMMENDATION**
   - **Better approach**: Use `/quotes/[quoteId]` route pattern
   - Cleaner URLs, more RESTful
   - Can maintain backward compatibility with current `?quote=[quoteId]` pattern
   - Update quote context to handle both or migrate

8. **Agent Click**: ✅ **ANSWERED** - Don't add agent click functionality yet

9. **Start Quote Button**: Navigate to `/` (new quote, current pattern)

### Display & Formatting
10. **Vehicle Display**: ✅ **ANSWERED** - Don't add vehicle column

11. **Premium Calculation**: ✅ **ANSWERED** - Don't add premium column

12. **Quote Number Format**: ✅ **ANSWERED** - Use existing quote format (e.g., "quote-1234567890-abc123")

### Pagination
13. **Default Page Size**: ✅ **ANSWERED** - 16 rows per page

14. **Total Count**: Mock value for now (e.g., 2,000)

### Performance
15. **Large Datasets**: ✅ **RECOMMENDATION**
   - **Client-side filtering** is better for initial implementation:
     - Simpler to implement with mock data
     - No API needed
     - Fast enough for < 10,000 items
     - Can optimize later with virtual scrolling or server-side filtering
   - Use `React.useMemo` for expensive filter operations
   - Debounce search input (300ms)

## Status Mapping

Since the wireframe shows "Open" and "Expired" but the codebase uses different statuses, we'll map them as follows:

- **"Open"** (green badge) = `"draft" | "pending"` - Quotes that are in progress
- **"Expired"** (red badge) = `"rejected"` - Quotes that have been rejected/expired
- Other statuses will display with their respective colors:
  - `"sent"` - Blue badge
  - `"accepted"` - Green badge
  - `"rejected"` - Red badge (same as "Expired")

## Mock Data Structure

Create a mock data file with sample quotes:

```typescript
// app/components/quotes-list/mock-quotes.ts
export const MOCK_QUOTES: QuoteListItem[] = [
  {
    id: "quote-1234567890-abc123",
    quoteNumber: "quote-1234567890-abc123",
    name: "Sally Gomez",
    email: "sally.gomez@example.com",
    status: "pending",
    createdDate: new Date("2025-01-01"),
    agency: "The Zebra",
    agent: "Aspen L",
  },
  // ... more mock quotes with various statuses, agencies, dates
]
```

## Next Steps

1. ✅ **Answer clarifying questions** - All questions answered
2. **Create data structure** - Define final interfaces (updated above)
3. **Set up routing** - Create `/quotes` route and `/quotes/[quoteId]` route
4. **Build components** - Implement components phase by phase
5. **Add mock data** - Create sample quotes with real agency names
6. **Test interactions** - Verify search, filters, pagination, navigation
7. **Polish UI** - Match wireframe design (simplified columns)
8. **Future integration** - Connect to real data source when ready
