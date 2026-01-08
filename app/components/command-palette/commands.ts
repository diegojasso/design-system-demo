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
  RefreshCw,
  Send,
  Download,
  FileText,
  type LucideIcon,
} from "lucide-react"
import type { RecentQuote } from "./quote-types"

export interface Command {
  id: string
  label: string
  keywords: string[]
  shortcut?: string
  icon: LucideIcon
  group: "quick-actions" | "navigation" | "quote-actions" | "recent"
  context: "always" | "in-quote" | "has-quote"
  action: () => void
  // Optional metadata for display
  meta?: string
  status?: "draft" | "pending" | "sent" | "accepted" | "rejected"
}

interface CommandContext {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onSaveDraft?: () => void
  onFindClient?: () => void
  // Quote context
  currentQuoteId?: string
  onRunReports?: () => void
  onSendQuote?: () => void
  onDownloadPDF?: () => void
  // Recent quotes
  recentQuotes?: RecentQuote[]
  onOpenQuote?: (quoteId: string) => void
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

  // Quote-specific actions (only when a quote exists)
  if (context.currentQuoteId) {
    commands.push({
      id: "run-reports",
      label: "Run All Reports (MVR + CLUE)",
      keywords: ["run", "reports", "mvr", "clue", "generate"],
      icon: RefreshCw,
      group: "quote-actions",
      context: "has-quote",
      action: () => {
        context.onRunReports?.()
      },
    })

    commands.push({
      id: "send-quote",
      label: "Send Quote to Client",
      keywords: ["send", "quote", "client", "email"],
      icon: Send,
      group: "quote-actions",
      context: "has-quote",
      action: () => {
        context.onSendQuote?.()
      },
    })

    commands.push({
      id: "download-pdf",
      label: "Download PDF",
      keywords: ["download", "pdf", "export", "print"],
      icon: Download,
      group: "quote-actions",
      context: "has-quote",
      action: () => {
        context.onDownloadPDF?.()
      },
    })
  }

  // Recent Quotes (if available)
  if (context.recentQuotes && context.recentQuotes.length > 0) {
    context.recentQuotes.forEach((quote) => {
      commands.push({
        id: `recent-${quote.id}`,
        label: quote.clientName,
        keywords: [
          quote.clientName.toLowerCase(),
          quote.quoteNumber.toLowerCase(),
          "recent",
          "quote",
        ],
        icon: FileText,
        group: "recent",
        context: "always",
        meta: quote.quoteNumber,
        status: quote.status,
        action: () => {
          context.onOpenQuote?.(quote.id)
        },
      })
    })
  }

  return commands
}
