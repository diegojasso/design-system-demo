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

## Success Criteria

- [ ] Agents can programmatically discover all available commands
- [ ] Commands include descriptive metadata for agent understanding
- [ ] Command availability is correctly filtered by context
- [ ] Visual hints optionally display available commands
- [ ] No breaking changes to existing command palette functionality
- [ ] All existing tests pass
- [ ] New tests cover registry and hint functionality
