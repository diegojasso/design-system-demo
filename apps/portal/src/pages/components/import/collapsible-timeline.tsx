"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@novo/ui"
import { cn } from "@/shared/utils"
import { useMessages } from "@/shared/hooks/use-messages"
import { ImportTimeline } from "./import-timeline"

interface TimelineEvent {
  id: string
  label: string
  status: "completed" | "pending" | "failed"
  timestamp?: Date
  details?: string
}

interface CollapsibleTimelineProps {
  events: TimelineEvent[]
  defaultOpen?: boolean
  className?: string
}

export function CollapsibleTimeline({
  events,
  defaultOpen = false,
  className,
}: CollapsibleTimelineProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const t = useMessages()
  const completedCount = events.filter((e) => e.status === "completed").length
  const pendingCount = events.filter((e) => e.status === "pending").length
  const pendingSuffix =
    pendingCount > 0
      ? t("import-summary.timeline.pending-suffix", { count: pendingCount })
      : ""
  const summary = t("import-summary.timeline.summary", {
    completed: completedCount,
    pendingSuffix,
  })

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn("space-y-2", className)}>
      <div className="rounded-lg border border-border bg-card">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("import-summary.timeline.title")}
                </h3>
                <p className="text-xs text-muted-foreground">{summary}</p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="px-4 pb-4 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-2 overflow-hidden">
          <div className="pt-2">
            <ImportTimeline events={events} />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
