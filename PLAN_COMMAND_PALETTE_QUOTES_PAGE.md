# Plan: Extend Command Palette to Quotes Page

## Overview
Extend the command palette functionality to the quotes page (`/quotes`), enabling users to quickly navigate, search, filter, and perform actions on quotes directly from the command palette.

## Current State

### Command Palette Implementation
- **Location**: Currently only rendered on home page (`app/page.tsx`)
- **Context Provider**: `CommandPaletteProvider` wraps entire app in `app/layout.tsx`
- **Context Hook**: `useCommandPaletteContext()` allows opening palette from anywhere
- **Keyboard Shortcut**: ⌘K / Ctrl+K (handled globally in `useCommandPalette` hook)

### Current Commands Available
- **Quick Actions**: New Quote, Find Client, Import Ezlynx
- **Navigation**: Jump to sections (when in quote workflow)
- **Quote Actions**: Run Reports, Send Quote, Download PDF (when quote exists)
- **Recent Quotes**: Recently opened quotes
- **Settings**: Theme switching

### Quotes Page
- **Location**: `app/quotes/page.tsx`
- **Features**: Search, filters (status, date, agency, agent), pagination, quote table
- **Actions**: Start Quote button, click quote to open
- **Missing**: Command palette integration

## Goals

1. **Add Command Palette to Quotes Page**
   - Render `CommandPalette` component on quotes page
   - Ensure keyboard shortcut (⌘K) works on quotes page
   - Add command palette hint button (optional)

2. **Add Quotes Page-Specific Commands**
   - Filter commands (by status, date range, agency, agent)
   - Search quotes command
   - Navigate to specific quotes
   - Bulk actions (if applicable)
   - Quick navigation to filtered views

3. **Context-Aware Commands**
   - Commands should adapt based on current page context
   - Show relevant commands for quotes page vs quote workflow page
   - Maintain existing commands that are always available

## Implementation Plan

### Phase 1: Basic Integration

#### 1.1 Add CommandPalette to Quotes Page
**File**: `app/quotes/page.tsx`

- Import `CommandPalette` component
- Add handler functions for quotes page actions:
  - `handleStartQuote()` - Navigate to home page
  - `handleOpenQuote(quoteId)` - Navigate to quote detail
  - `handleFilterQuotes(filter)` - Apply filters
  - `handleSearchQuotes(query)` - Set search query
- Render `CommandPalette` component with appropriate props
- Since quotes page doesn't have quote context, pass `undefined` for quote-specific props

**Changes**:
```tsx
// Add imports
import { CommandPalette } from "@/app/components/command-palette"
import { useRouter } from "next/navigation"

// Add handlers
const handleStartQuote = () => router.push("/")
const handleOpenQuote = (quoteId: string) => router.push(`/?quote=${quoteId}`)
const handleFilterQuotes = (filter: QuoteFilters) => { /* update filters */ }
const handleSearchQuotes = (query: string) => { /* update search */ }

// Add CommandPalette component
<CommandPalette
  onOpenQuote={handleOpenQuote}
  onImportEzlynx={() => router.push("/import/ezlynx")}
  // ... other props
/>
```

#### 1.2 Verify Keyboard Shortcut Works
- The keyboard shortcut handler is in `useCommandPalette` hook
- Since it's a global event listener, it should work automatically
- Test that ⌘K opens palette on quotes page

### Phase 2: Add Quotes Page Commands

#### 2.1 Extend Command Context
**File**: `app/components/command-palette/commands.ts`

Add new command context properties:
```typescript
interface CommandContext {
  // ... existing properties
  // Quotes page context
  currentPage?: "quotes-list" | "quote-workflow"
  onFilterQuotes?: (filter: Partial<QuoteFilters>) => void
  onSearchQuotes?: (query: string) => void
  availableQuotes?: QuoteListItem[] // For quick navigation
}
```

#### 2.2 Add Quotes Page Commands
**File**: `app/components/command-palette/commands.ts`

Add new command groups:
- **Filter Commands** (group: "quotes-filters")
  - Filter by Status (Draft, Pending, Sent, Accepted, Rejected)
  - Filter by Date Range (Last 7 days, Last 30 days, Last 90 days, All time)
  - Filter by Agency
  - Filter by Agent
  - Clear All Filters

- **Search Commands** (group: "quotes-search")
  - Focus Search Input
  - Search by Quote Number
  - Search by Client Name

- **Navigation Commands** (group: "quotes-navigation")
  - Go to First Page
  - Go to Last Page
  - Next Page
  - Previous Page

- **Quick Actions** (extend existing group)
  - Start New Quote (already exists, but ensure it works)
  - Import from Ezlynx (already exists)

**Example command structure**:
```typescript
// Filter by status
{
  id: "filter-status-draft",
  label: "Filter: Draft Quotes",
  keywords: ["filter", "draft", "status"],
  icon: FileText,
  group: "quotes-filters",
  context: "quotes-list",
  action: () => context.onFilterQuotes?.({ status: "draft" })
}
```

#### 2.3 Update Command Building Logic
**File**: `app/components/command-palette/commands.ts`

- Add conditional logic to include quotes page commands when `currentPage === "quotes-list"`
- Ensure commands are filtered appropriately based on context
- Add group labels for new command groups

#### 2.4 Update CommandPalette Component Props
**File**: `app/components/command-palette.tsx`

Add new props:
```typescript
interface CommandPaletteProps {
  // ... existing props
  currentPage?: "quotes-list" | "quote-workflow"
  onFilterQuotes?: (filter: Partial<QuoteFilters>) => void
  onSearchQuotes?: (query: string) => void
  availableQuotes?: QuoteListItem[]
}
```

#### 2.5 Update useCommandPalette Hook
**File**: `app/components/hooks/use-command-palette.ts`

- Add new props to interface
- Pass props to `buildCommands`
- Ensure commands are properly grouped

### Phase 3: Enhanced Features

#### 3.1 Quick Quote Navigation
- Add commands to open specific quotes from recent/filtered list
- Show quote number and client name in command label
- Display quote status badge

#### 3.2 Filter Presets
- Add saved filter presets (e.g., "My Drafts", "Pending Review", "This Week")
- Allow users to create custom filter presets
- Store presets in localStorage (similar to command history)

#### 3.3 Search Integration
- When user types in command palette, show matching quotes
- Allow opening quotes directly from search results
- Highlight matching text in quote results

#### 3.4 Command Palette Hint
**File**: `app/quotes/page.tsx`

- Optionally add `CommandPaletteHint` component to quotes page header
- Provides visual cue that command palette is available
- Can be placed near search bar or in header

### Phase 4: Testing & Refinement

#### 4.1 Test Scenarios
- [ ] Command palette opens on quotes page with ⌘K
- [ ] All quotes page commands appear and work correctly
- [ ] Filter commands update URL params and filters
- [ ] Search commands focus/search correctly
- [ ] Navigation commands change pages correctly
- [ ] Opening quotes navigates correctly
- [ ] Keyboard shortcuts work as expected
- [ ] Command palette hint button works (if added)
- [ ] Commands are contextually hidden/shown based on page

#### 4.2 Edge Cases
- Empty quote list
- No search results
- Filter with no matches
- Very long quote lists
- Rapid command execution

## File Changes Summary

### New Files
- None (reusing existing components)

### Modified Files
1. `app/quotes/page.tsx`
   - Add CommandPalette component
   - Add handler functions
   - Add command palette hint (optional)

2. `app/components/command-palette.tsx`
   - Add new props for quotes page context
   - Pass props to useCommandPalette hook

3. `app/components/command-palette/commands.ts`
   - Add quotes page command context
   - Add new command groups and commands
   - Update buildCommands function

4. `app/components/hooks/use-command-palette.ts`
   - Add quotes page props to interface
   - Pass props to buildCommands

### Type Definitions
- May need to import `QuoteFilters` and `QuoteListItem` types in commands.ts
- Ensure types are properly exported from quotes-list components

## Implementation Order

1. **Phase 1**: Basic integration (CommandPalette on quotes page)
   - Quickest to implement
   - Provides immediate value
   - Tests basic functionality

2. **Phase 2**: Add quotes page commands
   - Core functionality
   - Most user-facing value
   - Requires command building logic updates

3. **Phase 3**: Enhanced features
   - Nice-to-have improvements
   - Can be added incrementally
   - Enhances user experience

4. **Phase 4**: Testing & refinement
   - Ongoing throughout implementation
   - Ensure quality and reliability

## Success Criteria

- [ ] Command palette accessible on quotes page via ⌘K
- [ ] Quotes page-specific commands available and functional
- [ ] Filters can be applied via command palette
- [ ] Search can be triggered via command palette
- [ ] Quotes can be opened via command palette
- [ ] Navigation commands work correctly
- [ ] No regressions in existing command palette functionality
- [ ] Keyboard shortcuts work consistently across pages
- [ ] Commands are contextually appropriate for current page

## Future Enhancements

- Bulk actions (delete multiple quotes, change status)
- Advanced search with operators (e.g., "status:draft client:John")
- Saved searches and filter presets
- Quote templates and quick quote creation
- Integration with quote detail page commands
- Command palette analytics (track most used commands)
