import type { StepId } from "../../contexts/quote-context"
import {
  Plus,
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
  FileDown,
  Moon,
  Sun,
  Monitor,
  Home,
  X,
  Filter,
  type LucideIcon,
} from "lucide-react"
import type { RecentQuote } from "./quote-types"
import type { CommandHistoryEntry } from "./use-command-history"
import type { QuoteListItem } from "../../quotes-list/types"

export interface CommandParameter {
  name: string
  type: string
  required: boolean
  description?: string
}

export interface Command {
  id: string
  label: string
  keywords: string[]
  shortcut?: string
  icon: LucideIcon
  group:
    | "quick-actions"
    | "navigation"
    | "quote-actions"
    | "recent"
    | "favorites"
    | "history"
    | "settings"
    | "quotes-list"
  context: "always" | "in-quote" | "has-quote" | "quotes-page"
  action: () => void
  // Optional metadata for display
  meta?: string
  status?: "draft" | "pending" | "sent" | "accepted" | "rejected"
  // History and favorites
  usageCount?: number
  isFavorite?: boolean
  customShortcut?: string
  // Documentation for agents
  description?: string // Human-readable description of what the command does
  agentDescription?: string // Description optimized for AI agents
  parameters?: CommandParameter[] // What parameters does this command accept/require
  contextRequirements?: string[] // What conditions must be met (e.g., "quote-id", "current-step")
}

interface CommandContext {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onFindClient?: () => void
  // Quote context
  currentQuoteId?: string
  onRunReports?: () => void
  onSendQuote?: () => void
  onDownloadPDF?: () => void
  onImportEzlynx?: () => void
  // Recent quotes
  recentQuotes?: RecentQuote[]
  onOpenQuote?: (quoteId: string) => void
  // History and favorites
  history?: CommandHistoryEntry[]
  favorites?: Set<string>
  customShortcuts?: Map<string, string>
  // Theme
  onSetTheme?: (theme: "light" | "dark" | "system") => void
  currentTheme?: "light" | "dark" | "system"
  // Quotes page context
  isQuotesPage?: boolean
  availableQuotes?: QuoteListItem[]
  onStartQuote?: () => void
  onFilterStatus?: (status: string) => void
  onClearFilters?: () => void
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
    description: "Creates a new insurance quote and navigates to the client information step",
    agentDescription: "Creates a new insurance quote. Navigates to the client information step where you can enter client details. This is the first step in the quote workflow.",
    contextRequirements: [],
    action: () => {
      // Navigate to new quote / reset to first step
      context.onStepChange?.("client-info")
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
    description: "Opens the client search dialog to find and select an existing client",
    agentDescription: "Opens a client search dialog. Use this to find and select an existing client from the database. This is useful when you want to create a quote for a returning client.",
    contextRequirements: [],
    action: () => {
      context.onFindClient?.()
    },
  })

  commands.push({
    id: "import-ezlynx",
    label: "Import Quote from Ezlynx",
    keywords: ["import", "ezlynx", "quote", "aggregator"],
    shortcut: undefined,
    icon: FileDown,
    group: "quick-actions",
    context: "always",
    description: "Imports a quote from the Ezlynx aggregator system",
    agentDescription: "Imports an existing quote from the Ezlynx aggregator system. This allows you to work with quotes that were created or managed in Ezlynx. After import, you'll see an import summary before proceeding with the quote workflow.",
    contextRequirements: [],
    action: () => {
      context.onImportEzlynx?.()
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
      const stepDescriptions: Record<string, { description: string; agentDescription: string }> = {
        "client-info": {
          description: "Navigates to the Client Information section of the quote workflow",
          agentDescription: "Navigates to the Client Information step (step 1). This is where you enter basic client details like name, address, and contact information. Required for creating a new quote.",
        },
        vehicle: {
          description: "Navigates to the Vehicles section of the quote workflow",
          agentDescription: "Navigates to the Vehicles step (step 2). Add vehicles that need to be insured. You can add multiple vehicles with details like make, model, year, and VIN.",
        },
        driver: {
          description: "Navigates to the Drivers section of the quote workflow",
          agentDescription: "Navigates to the Drivers step (step 3). Add drivers who will be covered by the insurance policy. Include driver information like license number and driving history.",
        },
        coverage: {
          description: "Navigates to the Coverages section of the quote workflow",
          agentDescription: "Navigates to the Coverages step (step 4). Configure insurance coverages and limits for the quote. This includes liability, comprehensive, collision, and other coverage options.",
        },
        review: {
          description: "Navigates to the Review section of the quote workflow",
          agentDescription: "Navigates to the Review step (step 5). Review all quote information before finalizing. This is the final step where you can verify all details before sending or accepting the quote.",
        },
      }
      const stepInfo = stepDescriptions[id] || {
        description: `Navigates to the ${label} section of the quote workflow`,
        agentDescription: `Navigates to the ${label} step. Use this to jump directly to this section of the quote workflow.`,
      }
      commands.push({
        id: `go-${id}`,
        label,
        keywords,
        shortcut,
        icon,
        group: "navigation",
        context: "in-quote",
        description: stepInfo.description,
        agentDescription: stepInfo.agentDescription,
        contextRequirements: ["current-step"],
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
      label: "Run 3rd Party Reports",
      keywords: ["run", "reports", "mvr", "clue", "generate"],
      icon: RefreshCw,
      group: "quote-actions",
      context: "has-quote",
      description: "Generates third-party reports (MVR, CLUE) for the current quote",
      agentDescription: "Generates third-party reports including MVR (Motor Vehicle Record) and CLUE (Comprehensive Loss Underwriting Exchange) reports for the current quote. These reports provide driving history and claims information to help assess risk and determine pricing.",
      contextRequirements: ["quote-id"],
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
      description: "Sends the current quote to the client via email",
      agentDescription: "Sends the current quote to the client via email. This allows the client to review the quote and either accept or reject it. The quote will be marked as 'sent' status after sending.",
      contextRequirements: ["quote-id"],
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
      description: "Downloads the current quote as a PDF document",
      agentDescription: "Downloads the current quote as a PDF document. This creates a formatted PDF version of the quote that can be saved, printed, or shared with the client offline.",
      contextRequirements: ["quote-id"],
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
        description: `Opens the recent quote ${quote.quoteNumber} for ${quote.clientName}`,
        agentDescription: `Opens quote ${quote.quoteNumber} for client ${quote.clientName}. This is a recently accessed quote that you can quickly return to. The quote status is ${quote.status}.`,
        action: () => {
          context.onOpenQuote?.(quote.id)
        },
      })
    })
  }

  // Quotes page commands (only on quotes page)
  if (context.isQuotesPage) {
    // Start New Quote
    if (context.onStartQuote) {
      commands.push({
        id: "start-quote",
        label: "Start New Quote",
        keywords: ["start", "new", "quote", "create"],
        shortcut: "⌘N",
        icon: Plus,
        group: "quotes-list",
        context: "quotes-page",
        description: "Starts a new quote and navigates to the quote creation page",
        agentDescription: "Starts a new insurance quote. Navigates to the home page where you can begin creating a new quote from scratch. This is available on the quotes list page.",
        contextRequirements: ["quotes-page"],
        action: () => {
          context.onStartQuote?.()
        },
      })
    }

    // Navigate to Home
    commands.push({
      id: "go-home",
      label: "Go to Home",
      keywords: ["home", "navigate", "main", "dashboard"],
      shortcut: "⌘H",
      icon: Home,
      group: "quotes-list",
      context: "quotes-page",
      description: "Navigates to the home page",
      agentDescription: "Navigates to the home page (main dashboard). Use this to return to the main quote creation interface from the quotes list page.",
      contextRequirements: ["quotes-page"],
      action: () => {
        context.onStartQuote?.() // Navigate to home
      },
    })

    // Clear Filters
    if (context.onClearFilters) {
      commands.push({
        id: "clear-filters",
        label: "Clear All Filters",
        keywords: ["clear", "reset", "filters", "all"],
        icon: X,
        group: "quotes-list",
        context: "quotes-page",
        description: "Clears all filters on the quotes list page",
        agentDescription: "Clears all active filters on the quotes list page. This resets status, date range, agency, and agent filters to their default values, showing all quotes.",
        contextRequirements: ["quotes-page"],
        action: () => {
          context.onClearFilters?.()
        },
      })
    }

    // Filter by Status
    if (context.onFilterStatus) {
      const statuses = ["draft", "pending", "sent", "accepted", "rejected"] as const
      const statusDescriptions: Record<string, string> = {
        draft: "Shows only draft quotes that are still being worked on",
        pending: "Shows only pending quotes awaiting action",
        sent: "Shows only quotes that have been sent to clients",
        accepted: "Shows only quotes that have been accepted by clients",
        rejected: "Shows only quotes that have been rejected by clients",
      }
      statuses.forEach((status) => {
        commands.push({
          id: `filter-status-${status}`,
          label: `Filter: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          keywords: ["filter", "status", status],
          icon: Filter,
          group: "quotes-list",
          context: "quotes-page",
          description: `Filters quotes to show only ${status} quotes`,
          agentDescription: `Filters the quotes list to show only quotes with ${status} status. ${statusDescriptions[status]}. This helps you focus on quotes in a specific state.`,
          contextRequirements: ["quotes-page"],
          parameters: [{ name: "status", type: "string", required: true, description: `The status to filter by: ${status}` }],
          action: () => {
            context.onFilterStatus?.(status)
          },
        })
      })
    }

    // Open quotes from list
    if (context.availableQuotes && context.availableQuotes.length > 0 && context.onOpenQuote) {
      context.availableQuotes.forEach((quote) => {
        commands.push({
          id: `open-quote-${quote.id}`,
          label: quote.name,
          keywords: [
            quote.name.toLowerCase(),
            quote.quoteNumber.toLowerCase(),
            "open",
            "quote",
            quote.status || "",
          ],
          icon: FileText,
          group: "quotes-list",
          context: "quotes-page",
          meta: quote.quoteNumber,
          status: quote.status as "draft" | "pending" | "sent" | "accepted" | "rejected",
          description: `Opens quote ${quote.quoteNumber} for ${quote.name}`,
          agentDescription: `Opens quote ${quote.quoteNumber} for client ${quote.name}. This quote has status ${quote.status}. Opening it will navigate to the quote detail page where you can view and edit the quote.`,
          contextRequirements: ["quotes-page"],
          action: () => {
            context.onOpenQuote?.(quote.id)
          },
        })
      })
    }
  }

  // Theme settings (always available)
  if (context.onSetTheme) {
    const themeCommands = [
      {
        id: "theme-light",
        label: "Switch to Light Theme",
        keywords: ["light", "theme", "bright", "day"],
        icon: Sun,
        theme: "light" as const,
      },
      {
        id: "theme-dark",
        label: "Switch to Dark Theme",
        keywords: ["dark", "theme", "night", "black"],
        icon: Moon,
        theme: "dark" as const,
      },
      {
        id: "theme-system",
        label: "Use System Theme",
        keywords: ["system", "theme", "auto", "default"],
        icon: Monitor,
        theme: "system" as const,
      },
    ]

    themeCommands.forEach(({ id, label, keywords, icon, theme }) => {
      const isActive = context.currentTheme === theme
      const themeDescriptions: Record<string, { description: string; agentDescription: string }> = {
        light: {
          description: "Switches the application theme to light mode",
          agentDescription: "Switches the application theme to light mode. This provides a bright, light-colored interface suitable for daytime use or users who prefer light backgrounds.",
        },
        dark: {
          description: "Switches the application theme to dark mode",
          agentDescription: "Switches the application theme to dark mode. This provides a dark interface that's easier on the eyes in low-light conditions and reduces eye strain.",
        },
        system: {
          description: "Uses the system theme preference",
          agentDescription: "Uses the system theme preference. The application will automatically match your operating system's theme setting (light or dark) and switch accordingly.",
        },
      }
      const themeInfo = themeDescriptions[theme]
      commands.push({
        id,
        label,
        keywords,
        icon,
        group: "settings",
        context: "always",
        meta: isActive ? "Active" : undefined,
        description: themeInfo.description,
        agentDescription: themeInfo.agentDescription,
        contextRequirements: [],
        action: () => {
          context.onSetTheme?.(theme)
        },
      })
    })
  }

  return commands
}
