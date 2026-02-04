import type { Command } from "./commands"

/**
 * Structured format for agent consumption
 * Provides a simplified view of commands optimized for AI agents
 */
export interface CommandHint {
  id: string
  label: string
  description: string
  group: string
  context: string
  available: boolean
  shortcut?: string
  keywords: string[]
  parameters?: Array<{
    name: string
    type: string
    required: boolean
    description?: string
  }>
  contextRequirements?: string[]
}

/**
 * Converts a Command to a CommandHint for agent consumption
 */
export function commandToHint(command: Command, available: boolean = true): CommandHint {
  return {
    id: command.id,
    label: command.label,
    description: command.agentDescription || command.description || command.label,
    group: command.group,
    context: command.context,
    available,
    shortcut: command.shortcut || command.customShortcut,
    keywords: command.keywords,
    parameters: command.parameters,
    contextRequirements: command.contextRequirements,
  }
}

/**
 * Converts an array of Commands to CommandHints
 */
export function commandsToHints(commands: Command[]): CommandHint[] {
  return commands.map((cmd) => commandToHint(cmd, true))
}
