# Command Palette (⌘K) Implementation Plan

## Overview
Implement a global command palette accessible via ⌘K (Mac) / Ctrl+K (Windows/Linux) that provides quick access to actions, navigation, and search functionality throughout the quote workflow application.

## Goals
- Fast access to common actions via keyboard shortcut
- Quick navigation between quote workflow steps
- Search and filter capabilities for commands
- Context-aware commands based on current workflow state
- Extensible architecture for future command additions

---

## 1. Component Structure

### 1.1 Main Command Palette Component
**Location**: `app/components/command-palette.tsx`

```tsx
"use client"

import { useState, useEffect } from "react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
import { useCommandPalette } from "./hooks/use-command-palette"

interface CommandPaletteProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  // Future: quote context, recent quotes, etc.
}

export function CommandPalette({ 
  currentStep, 
  onStepChange 
}: CommandPaletteProps) {
  const { isOpen, setIsOpen, search, setSearch, commands } = useCommandPalette({
    currentStep,
    onStepChange,
  })

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {search && commands.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6">
              <span className="text-muted-foreground">
                No results found for "{search}"
              </span>
            </div>
          </CommandEmpty>
        )}
        {commands}
      </CommandList>
    </CommandDialog>
  )
}
```

### 1.2 Command Hook
**Location**: `app/components/hooks/use-command-palette.ts`

This hook will:
- Manage open/close state
- Handle ⌘K / Ctrl+K keyboard shortcut
- Build command groups based on context
- Filter commands based on search query
- Handle command execution

---

## 2. Command Categories

### 2.1 Quick Actions (Always Available)
- **New Quote** (⌘N)
  - Action: Navigate to new quote page / reset current quote
  - Icon: `Plus` from lucide-react
  
- **Save Draft** (⌘S)
  - Action: Save current quote as draft
  - Icon: `Save` from lucide-react
  - Note: Prevent default browser save dialog
  
- **Find Client** (⌘F)
  - Action: Open client search modal/dialog
  - Icon: `Search` from lucide-react
  - Note: May conflict with browser find - consider ⌘Shift+F or different shortcut

### 2.2 Navigation (Context: In Quote Workflow)
When `currentStep` is defined, show step navigation commands:

- **Client Information** (⌘1)
  - Action: Navigate to `client-info` step
  - Icon: `User` from lucide-react
  
- **Vehicles** (⌘2)
  - Action: Navigate to `vehicle` step
  - Icon: `Car` from lucide-react
  
- **Drivers** (⌘3)
  - Action: Navigate to `driver` step
  - Icon: `Users` from lucide-react
  
- **Coverages** (⌘4)
  - Action: Navigate to `coverage` step
  - Icon: `Shield` from lucide-react
  
- **Review** (⌘5)
  - Action: Navigate to `review` step
  - Icon: `FileCheck` from lucide-react

### 2.3 Quote Actions (Context: In Quote Workflow)
When a quote is active (future enhancement):

- **Run All Reports** (MVR + CLUE)
  - Action: Trigger all report generation
  - Icon: `RefreshCw` from lucide-react
  
- **Send Quote to Client**
  - Action: Open send quote dialog
  - Icon: `Send` from lucide-react
  
- **Download PDF**
  - Action: Generate and download quote PDF
  - Icon: `Download` from lucide-react

### 2.4 Recent Quotes (Future Enhancement)
- Show last 10 recently accessed quotes
- Display client name and quote number
- Show quote status badge
- Click to navigate to quote

---

## 3. Search & Filtering

### 3.1 Search Implementation
Use cmdk's built-in filtering, but enhance with custom scoring:

```typescript
// Custom filter function for better relevance
function filterCommands(commands: Command[], search: string): Command[] {
  if (!search) return commands

  const lowerSearch = search.toLowerCase()
  
  return commands
    .map(cmd => ({
      ...cmd,
      score: calculateMatchScore(cmd, lowerSearch)
    }))
    .filter(cmd => cmd.score > 0)
    .sort((a, b) => b.score - a.score)
}

function calculateMatchScore(cmd: Command, query: string): number {
  const text = cmd.label.toLowerCase()
  const keywords = cmd.keywords?.map(k => k.toLowerCase()) || []
  
  // Exact match = highest priority
  if (text === query) return 1000
  
  // Starts with = high priority
  if (text.startsWith(query)) return 500
  
  // Contains = medium priority
  if (text.includes(query)) return 250
  
  // Keyword match = medium-high priority
  const keywordMatch = keywords.some(k => k.includes(query))
  if (keywordMatch) return 300
  
  // Fuzzy match = low priority
  return fuzzyMatch(text, query) ? 50 : 0
}
```

### 3.2 Command Metadata
Each command should include:
- `id`: Unique identifier
- `label`: Display text
- `keywords`: Array of searchable keywords
- `shortcut`: Keyboard shortcut display
- `icon`: Lucide icon component
- `group`: Which group it belongs to
- `action`: Function to execute
- `context`: When to show (e.g., "in-quote", "always")

---

## 4. Keyboard Shortcut Handling

### 4.1 Global Shortcut Listener
**Location**: `app/components/hooks/use-command-palette.ts`

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // ⌘K on Mac, Ctrl+K on Windows/Linux
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }
    
    // Prevent default browser shortcuts when palette is open
    if (isOpen) {
      // Prevent ⌘S from triggering browser save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
      }
      // Prevent ⌘F from triggering browser find
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault()
      }
    }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [isOpen, setIsOpen])
```

### 4.2 Shortcut Conflicts
- **⌘F (Find Client)**: May conflict with browser find. Consider:
  - Using ⌘Shift+F instead
  - Only showing when palette is open
  - Using different shortcut entirely
  
- **⌘S (Save Draft)**: Prevent browser save dialog when palette is open

---

## 5. Command Execution

### 5.1 Action Handlers
Commands should execute actions via callbacks:

```typescript
interface CommandAction {
  type: 'navigate' | 'action' | 'modal'
  handler: () => void | Promise<void>
}

// Example: Navigate to step
const navigateToStep = (step: StepId) => {
  onStepChange?.(step)
  setIsOpen(false)
}

// Example: Save draft
const saveDraft = async () => {
  // Save logic here
  setIsOpen(false)
  // Show toast notification
}
```

### 5.2 Post-Action Behavior
- Close palette after command execution
- Show toast notifications for actions (future)
- Handle async actions gracefully

---

## 6. Integration Points

### 6.1 App Layout Integration
**Location**: `app/layout.tsx` or `app/page.tsx`

Add CommandPalette to root layout or main page:

```tsx
import { CommandPalette } from "./components/command-palette"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepId>("client-info")
  
  return (
    <>
      {/* Existing content */}
      <CommandPalette 
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
    </>
  )
}
```

### 6.2 Quote Context (Future)
When quote management is implemented:
- Pass current quote ID
- Pass recent quotes list
- Pass quote status
- Enable quote-specific commands

---

## 7. Command Definitions

### 7.1 Command Registry
**Location**: `app/components/command-palette/commands.ts`

```typescript
import { StepId } from "@/app/components/quote-progress"
import { 
  Plus, Save, Search, User, Car, Users, Shield, FileCheck,
  RefreshCw, Send, Download 
} from "lucide-react"

export interface Command {
  id: string
  label: string
  keywords: string[]
  shortcut?: string
  icon: React.ComponentType<{ className?: string }>
  group: 'quick-actions' | 'navigation' | 'quote-actions' | 'recent'
  context: 'always' | 'in-quote'
  action: () => void
}

export function buildCommands(
  context: {
    currentStep?: StepId
    onStepChange?: (step: StepId) => void
    onSaveDraft?: () => void
    onFindClient?: () => void
    // Future: recentQuotes, currentQuote, etc.
  }
): Command[] {
  const commands: Command[] = []

  // Quick Actions (always available)
  commands.push({
    id: 'new-quote',
    label: 'New Quote',
    keywords: ['new', 'create', 'quote'],
    shortcut: '⌘N',
    icon: Plus,
    group: 'quick-actions',
    context: 'always',
    action: () => {
      // Navigate to new quote / reset
      context.onStepChange?.('client-info')
    }
  })

  commands.push({
    id: 'save-draft',
    label: 'Save Draft',
    keywords: ['save', 'draft', 'store'],
    shortcut: '⌘S',
    icon: Save,
    group: 'quick-actions',
    context: 'always',
    action: () => {
      context.onSaveDraft?.()
    }
  })

  commands.push({
    id: 'find-client',
    label: 'Find Client',
    keywords: ['find', 'search', 'client', 'customer'],
    shortcut: '⌘F',
    icon: Search,
    group: 'quick-actions',
    context: 'always',
    action: () => {
      context.onFindClient?.()
    }
  })

  // Navigation (only in quote workflow)
  if (context.currentStep) {
    const stepCommands = [
      { id: 'client-info', label: 'Client Information', shortcut: '⌘1', icon: User },
      { id: 'vehicle', label: 'Vehicles', shortcut: '⌘2', icon: Car },
      { id: 'driver', label: 'Drivers', shortcut: '⌘3', icon: Users },
      { id: 'coverage', label: 'Coverages', shortcut: '⌘4', icon: Shield },
      { id: 'review', label: 'Review', shortcut: '⌘5', icon: FileCheck },
    ]

    stepCommands.forEach(({ id, label, shortcut, icon }) => {
      commands.push({
        id: `go-${id}`,
        label,
        keywords: [id, label.toLowerCase(), ...label.split(' ')],
        shortcut,
        icon,
        group: 'navigation',
        context: 'in-quote',
        action: () => {
          context.onStepChange?.(id as StepId)
        }
      })
    })
  }

  return commands
}
```

### 7.2 Command Grouping
Group commands by category for better UX:

```typescript
function groupCommands(commands: Command[]): Map<string, Command[]> {
  const groups = new Map<string, Command[]>()
  
  commands.forEach(cmd => {
    if (!groups.has(cmd.group)) {
      groups.set(cmd.group, [])
    }
    groups.get(cmd.group)!.push(cmd)
  })
  
  return groups
}
```

---

## 8. UI/UX Considerations

### 8.1 Visual Design
- Use existing Command component styling
- Match app theme (light/dark mode support)
- Consistent icon sizing and spacing
- Clear visual hierarchy for groups

### 8.2 Accessibility
- Keyboard navigation (arrow keys, enter to select)
- Screen reader announcements
- Focus management
- ARIA labels for groups and items

### 8.3 Performance
- Lazy load command definitions
- Debounce search input
- Memoize filtered commands
- Virtual scrolling for large command lists (future)

### 8.4 Empty States
- Show helpful message when no results
- Suggest alternative search terms
- Show available commands when search is empty

---

## 9. Implementation Phases

### Phase 1: Core Functionality ✅
- [ ] Create CommandPalette component
- [ ] Create useCommandPalette hook
- [ ] Implement ⌘K keyboard shortcut
- [ ] Basic command structure (Quick Actions + Navigation)
- [ ] Integrate into app layout
- [ ] Basic search/filtering

### Phase 2: Enhanced Features
- [ ] Improved search with fuzzy matching
- [ ] Command shortcuts display
- [ ] Icon support for all commands
- [ ] Better empty states
- [ ] Keyboard shortcut conflict handling

### Phase 3: Context-Aware Commands
- [ ] Quote-specific actions (when quote management exists)
- [ ] Recent quotes integration
- [ ] Status-aware commands
- [ ] Dynamic command visibility

### Phase 4: Advanced Features
- [ ] Command history
- [ ] Favorite commands
- [ ] Custom shortcuts
- [ ] Command analytics (optional)

---

## 10. Technical Considerations

### 10.1 Dependencies
- ✅ `cmdk` - Already installed (used in command.tsx)
- ✅ `lucide-react` - Already used for icons
- No new dependencies needed

### 10.2 State Management
- Local state for open/close (useState)
- Search state managed by cmdk
- Context passed via props (can be enhanced with Context API later)

### 10.3 Testing Considerations
- Test keyboard shortcut registration
- Test command filtering
- Test command execution
- Test context-aware command visibility
- Test accessibility (keyboard navigation)

---

## 11. Future Enhancements

### 11.1 Quote Management Integration
When quote storage/persistence is implemented:
- Recent quotes list
- Quote search
- Quick quote switching
- Quote status indicators

### 11.2 Advanced Search
- Search across quote content
- Search clients by name/email
- Search vehicles by VIN
- Search drivers by name

### 11.3 Command Customization
- User preferences for shortcuts
- Custom command creation
- Command favorites
- Command history

### 11.4 Analytics & Insights
- Most used commands
- Command usage patterns
- Performance metrics

---

## 12. File Structure

```
app/
  components/
    command-palette.tsx          # Main component
    hooks/
      use-command-palette.ts     # Hook for state & logic
    command-palette/
      commands.ts                # Command definitions
      command-groups.tsx         # Command group components
      command-item.tsx           # Enhanced command item (optional)
```

---

## 13. Example Usage

```tsx
// In app/page.tsx
import { CommandPalette } from "./components/command-palette"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepId>("client-info")
  
  const handleSaveDraft = () => {
    // Save logic
    console.log("Saving draft...")
  }
  
  const handleFindClient = () => {
    // Open client search
    console.log("Finding client...")
  }
  
  return (
    <>
      {/* Existing content */}
      <CommandPalette
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onSaveDraft={handleSaveDraft}
        onFindClient={handleFindClient}
      />
    </>
  )
}
```

---

## Notes

- The spec provided uses some custom components (`ItemIcon`, `ItemText`, `ItemShortcut`, `ItemStatus`, `ItemMeta`) that don't exist in the current codebase. We'll use the existing Command components and standard React patterns instead.

- The fuzzy search implementation in the spec is a good starting point, but cmdk already has built-in filtering. We can enhance it with custom scoring.

- Keyboard shortcuts like ⌘1-⌘5 for navigation are intuitive but may conflict with browser shortcuts. Consider using ⌘Shift+1-5 or ensuring they only work when palette is open.

- The "Recent Quotes" feature requires quote persistence/storage which doesn't exist yet. This can be added in Phase 3.

- Command execution should close the palette and optionally show feedback (toast notifications - can be added later).
