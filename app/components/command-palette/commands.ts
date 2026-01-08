import type { StepId } from "../quote-progress"
import {
  Plus,
  Save,
  Search,
  User,
  Car,
  Users,
  Shield,
  FileCheck,
  type LucideIcon,
} from "lucide-react"

export interface Command {
  id: string
  label: string
  keywords: string[]
  shortcut?: string
  icon: LucideIcon
  group: "quick-actions" | "navigation" | "quote-actions" | "recent"
  context: "always" | "in-quote"
  action: () => void
}

interface CommandContext {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onSaveDraft?: () => void
  onFindClient?: () => void
}

export function buildCommands(context: CommandContext): Command[] {
  const commands: Command[] = []

  // Quick Actions (always available)
  commands.push({
    id: "new-quote",
    label: "New Quote",
    keywords: ["new", "create", "quote"],
    shortcut: "⌘N",
    icon: Plus,
    group: "quick-actions",
    context: "always",
    action: () => {
      // Navigate to new quote / reset to first step
      context.onStepChange?.("client-info")
    },
  })

  commands.push({
    id: "save-draft",
    label: "Save Draft",
    keywords: ["save", "draft", "store"],
    shortcut: "⌘S",
    icon: Save,
    group: "quick-actions",
    context: "always",
    action: () => {
      context.onSaveDraft?.()
    },
  })

  commands.push({
    id: "find-client",
    label: "Find Client",
    keywords: ["find", "search", "client", "customer"],
    shortcut: "⌘F",
    icon: Search,
    group: "quick-actions",
    context: "always",
    action: () => {
      context.onFindClient?.()
    },
  })

  // Navigation (only in quote workflow)
  if (context.currentStep) {
    const stepCommands = [
      {
        id: "client-info",
        label: "Client Information",
        shortcut: "⌘1",
        icon: User,
        keywords: ["client", "info", "information", "basic", "step", "1"],
      },
      {
        id: "vehicle",
        label: "Vehicles",
        shortcut: "⌘2",
        icon: Car,
        keywords: ["vehicle", "vehicles", "car", "cars", "step", "2"],
      },
      {
        id: "driver",
        label: "Drivers",
        shortcut: "⌘3",
        icon: Users,
        keywords: ["driver", "drivers", "step", "3"],
      },
      {
        id: "coverage",
        label: "Coverages",
        shortcut: "⌘4",
        icon: Shield,
        keywords: ["coverage", "coverages", "step", "4"],
      },
      {
        id: "review",
        label: "Review",
        shortcut: "⌘5",
        icon: FileCheck,
        keywords: ["review", "final", "step", "5"],
      },
    ]

    stepCommands.forEach(({ id, label, shortcut, icon, keywords }) => {
      commands.push({
        id: `go-${id}`,
        label,
        keywords,
        shortcut,
        icon,
        group: "navigation",
        context: "in-quote",
        action: () => {
          context.onStepChange?.(id as StepId)
        },
      })
    })
  }

  return commands
}
