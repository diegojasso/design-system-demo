# Plan: Command Palette Hints for AI Agents

## Overview
Add hints to the command palette that expose available actions programmatically, enabling AI agents to discover and understand what commands can be executed in the current context.

## Goals
1. **Programmatic Access**: Expose available commands via a hook/context that agents can query
2. **Visual Hints**: Display contextual hints about available actions (optional UI enhancement)
3. **Context Awareness**: Show only relevant commands based on current application state
4. **Documentation**: Provide structured metadata about each command (description, parameters, context requirements)

## Current State Analysis

### Existing Structure
- **Command System**: Commands are built dynamically based on context (`buildCommands` in `commands.ts`)
- **Command Groups**: Commands are organized into groups (quick-actions, navigation, quote-actions, recent, favorites, history, settings)
- **Context Types**: Commands have context requirements (`always`, `in-quote`, `has-quote`)
- **Command Metadata**: Each command has `id`, `label`, `keywords`, `shortcut`, `icon`, `group`, `context`, `action`, `meta`, `status`

### Current Limitations
- No programmatic API to query available commands
- No structured descriptions/documentation for commands
- No way for external agents to discover actions without opening the palette
- Commands are only accessible through the UI component

## Implementation Plan

### Phase 1: Command Metadata Enhancement

#### 1.1 Extend Command Interface
Add documentation fields to the `Command` interface:
```typescript
export interface Command {
  // ... existing fields
  description?: string  // Human-readable description of what the command does
  parameters?: CommandParameter[]  // What parameters does this command accept/require
  contextRequirements?: string[]  // What conditions must be met (e.g., "quote-id", "current-step")
  agentDescription?: string  // Description optimized for AI agents
}
```

#### 1.2 Add Command Descriptions
Update `buildCommands` to include descriptions for each command:
- **New Quote**: "Creates a new insurance quote and navigates to the client information step"
- **Find Client**: "Opens the client search dialog to find and select an existing client"
- **Import Ezlynx**: "Imports a quote from the Ezlynx aggregator system"
- **Navigation Commands**: "Navigates to the [step name] section of the quote workflow"
- **Run Reports**: "Generates third-party reports (MVR, CLUE) for the current quote"
- **Send Quote**: "Sends the current quote to the client via email"
- **Download PDF**: "Downloads the current quote as a PDF document"
- **Theme Commands**: "Switches the application theme to [light/dark/system]"

### Phase 2: Programmatic API

#### 2.1 Create Command Registry Hook
Create `use-command-registry.ts` that provides:
- `getAvailableCommands()`: Returns all commands available in current context
- `getCommandsByGroup(group: string)`: Returns commands filtered by group
- `getCommandsByContext(context: string)`: Returns commands filtered by context requirement
- `getCommandById(id: string)`: Returns a specific command by ID
- `getCommandHints()`: Returns a structured summary of available actions for agents

#### 2.2 Expose via Context
Extend `CommandPaletteContext` to include:
```typescript
interface CommandPaletteContextValue {
  // ... existing fields
  availableCommands: Command[]
  getCommandHints: () => CommandHint[]
  getCommandsByGroup: (group: string) => Command[]
  getCommandById: (id: string) => Command | undefined
}
```

#### 2.3 Command Hints Format
Create a structured format for agent consumption:
```typescript
interface CommandHint {
  id: string
  label: string
  description: string
  group: string
  context: string
  available: boolean
  shortcut?: string
  keywords: string[]
  parameters?: CommandParameter[]
}
```

### Phase 3: Visual Hints (Optional UI Enhancement)

#### 3.1 Enhanced Command Palette Hint Component
Update `CommandPaletteHint` to optionally show:
- Count of available commands
- Quick preview of top commands
- Contextual hints based on current state

#### 3.2 Tooltip/Popover with Command Preview
Add a hover tooltip to the hint button showing:
- "X commands available"
- Top 3-5 most relevant commands
- Context-specific suggestions

### Phase 4: Agent Integration Points

#### 4.1 Global Window API (Optional)
Expose commands via `window.commandPalette` for external scripts:
```typescript
window.commandPalette = {
  getAvailableCommands: () => Command[],
  getCommandHints: () => CommandHint[],
  executeCommand: (id: string) => void,
  isCommandAvailable: (id: string) => boolean
}
```

#### 4.2 React Hook for Agents
Create `useCommandPaletteAgent` hook:
```typescript
function useCommandPaletteAgent() {
  return {
    commands: Command[],
    hints: CommandHint[],
    execute: (id: string) => void,
    search: (query: string) => Command[],
    getByGroup: (group: string) => Command[],
    getByContext: (context: string) => Command[]
  }
}
```

## Implementation Details

### File Structure
```
app/components/command-palette/
  ├── commands.ts (enhance with descriptions)
  ├── command-registry.ts (new - programmatic API)
  ├── command-hints.ts (new - hint generation)
  ├── types.ts (new - shared types)
  ├── fuzzy-search.ts (existing)
  ├── quote-types.ts (existing)
  ├── use-command-history.ts (existing)
  └── use-recent-quotes.ts (existing)

app/components/
  ├── command-palette.tsx (update to expose registry)
  ├── command-palette-hint.tsx (enhance with visual hints)
  └── command-palette-context.tsx (extend with registry)
```

### Command Registry Implementation

```typescript
// command-registry.ts
export class CommandRegistry {
  private commands: Command[] = []
  
  register(commands: Command[]) {
    this.commands = commands
  }
  
  getAvailable(): Command[] {
    return this.commands.filter(cmd => this.isAvailable(cmd))
  }
  
  getByGroup(group: string): Command[] {
    return this.getAvailable().filter(cmd => cmd.group === group)
  }
  
  getByContext(context: string): Command[] {
    return this.getAvailable().filter(cmd => cmd.context === context)
  }
  
  getById(id: string): Command | undefined {
    return this.commands.find(cmd => cmd.id === id)
  }
  
  getHints(): CommandHint[] {
    return this.getAvailable().map(cmd => ({
      id: cmd.id,
      label: cmd.label,
      description: cmd.agentDescription || cmd.description || cmd.label,
      group: cmd.group,
      context: cmd.context,
      available: true,
      shortcut: cmd.shortcut || cmd.customShortcut,
      keywords: cmd.keywords,
    }))
  }
  
  private isAvailable(cmd: Command): boolean {
    // Logic to determine if command is available based on context
    return true // Simplified for now
  }
}
```

### Context Enhancement

```typescript
// command-palette-context.tsx
interface CommandPaletteContextValue {
  open: () => void
  close: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  // New additions
  registry: CommandRegistry
  availableCommands: Command[]
  getCommandHints: () => CommandHint[]
  getCommandsByGroup: (group: string) => Command[]
  getCommandById: (id: string) => Command | undefined
}
```

## Usage Examples

### For AI Agents
```typescript
// In an agent component
const { getCommandHints, executeCommand } = useCommandPaletteContext()

// Discover available actions
const hints = getCommandHints()
// Returns: [
//   { id: "new-quote", label: "New Quote", description: "...", ... },
//   { id: "find-client", label: "Find Client", description: "...", ... },
//   ...
// ]

// Execute a command
executeCommand("new-quote")
```

### For External Scripts
```javascript
// From browser console or external script
const hints = window.commandPalette.getCommandHints()
window.commandPalette.executeCommand("new-quote")
```

## Testing Considerations

1. **Unit Tests**: Test command registry filtering and hint generation
2. **Integration Tests**: Test context exposure and hook usage
3. **E2E Tests**: Test command execution from various entry points
4. **Agent Tests**: Test that agents can discover and execute commands

## Future Enhancements

1. **Command Permissions**: Add permission checks for commands
2. **Command Parameters**: Support parameterized commands
3. **Command History API**: Expose command execution history
4. **Command Analytics**: Track which commands agents use most
5. **Dynamic Commands**: Support plugins/extensions that add commands
6. **Command Validation**: Validate command availability before execution

## Migration Path

1. **Phase 1**: Add descriptions to existing commands (non-breaking)
2. **Phase 2**: Create registry and expose via context (non-breaking)
3. **Phase 3**: Add visual hints to UI (optional enhancement)
4. **Phase 4**: Add window API (optional, for external integration)

## Extension: Quotes Page Integration

### Overview
Extend the command palette to the quotes list page (`/quotes`) with context-specific commands for quote management.

### Quotes Page Commands

#### New Command Context: `"quotes-page"`
Add a new context type for commands that are only available on the quotes list page.

#### Commands to Add:
1. **Start New Quote**
   - ID: `start-quote`
   - Label: "Start New Quote"
   - Keywords: ["start", "new", "quote", "create"]
   - Action: Navigate to `/` (home page)
   - Context: `quotes-page`

2. **Open Quote** (from list)
   - ID: `open-quote-[id]`
   - Label: Quote client name
   - Keywords: [client name, quote number, "open", "quote"]
   - Action: Navigate to `/?quote=[id]`
   - Context: `quotes-page`
   - Dynamic: Generated from available quotes

3. **Filter by Status**
   - ID: `filter-status-[status]`
   - Label: `Filter: [Status]` (e.g., "Filter: Draft", "Filter: Sent")
   - Keywords: ["filter", "status", status name]
   - Action: Apply status filter
   - Context: `quotes-page`
   - Dynamic: Generated from available statuses

4. **Clear Filters**
   - ID: `clear-filters`
   - Label: "Clear All Filters"
   - Keywords: ["clear", "reset", "filters", "all"]
   - Action: Reset all filters to defaults
   - Context: `quotes-page`

5. **Navigate to Home**
   - ID: `go-home`
   - Label: "Go to Home"
   - Keywords: ["home", "navigate", "main"]
   - Action: Navigate to `/`
   - Context: `quotes-page`

### Implementation Steps

1. **Update Command Context Type**
   - Add `"quotes-page"` to context union type
   - Update `buildCommands` to accept quotes page context

2. **Add Quotes Page Props**
   - Extend `CommandPaletteProps` with quotes page callbacks:
     - `onStartQuote?: () => void`
     - `onOpenQuote?: (quoteId: string) => void`
     - `onFilterStatus?: (status: string) => void`
     - `onClearFilters?: () => void`
     - `availableQuotes?: QuoteListItem[]`

3. **Update Quotes Page**
   - Import and render `CommandPalette` component
   - Pass quotes data and handlers
   - Add `CommandPaletteHint` to header (optional)

4. **Update Command Builder**
   - Add logic to build quotes-page commands when context is `quotes-page`
   - Generate dynamic commands from available quotes
   - Generate filter commands from available statuses

### File Changes

```
app/quotes/page.tsx
  - Add CommandPalette component
  - Add command handlers
  - Pass quotes data to palette

app/components/command-palette/commands.ts
  - Add "quotes-page" context type
  - Add quotes page command builders
  - Accept quotes page props in CommandContext

app/components/command-palette.tsx
  - Extend props interface with quotes page handlers
  - Pass quotes page context to buildCommands
```

## Success Criteria

- [ ] Agents can programmatically discover all available commands
- [ ] Commands include descriptive metadata for agent understanding
- [ ] Command availability is correctly filtered by context
- [ ] Visual hints optionally display available commands
- [ ] Command palette works on quotes page with context-specific commands
- [ ] Quotes page commands include dynamic quote list and filters
- [ ] No breaking changes to existing command palette functionality
- [ ] All existing tests pass
- [ ] New tests cover registry and hint functionality
