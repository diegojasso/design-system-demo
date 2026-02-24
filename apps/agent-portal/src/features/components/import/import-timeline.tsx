"use client"

import * as React from "react"
import { CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/shared/utils"
import { useMessages } from "@/shared/hooks/use-messages"

interface TimelineEvent {
  id: string
  label: string
  status: "completed" | "pending" | "failed"
  timestamp?: Date
  details?: string
}

interface ImportTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export function ImportTimeline({ events, className }: ImportTimelineProps) {
  const t = useMessages()
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-semibold text-foreground">
        {t("import-summary.timeline.title")}
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />

        {/* Timeline Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const isLast = index === events.length - 1
            const getStatusIcon = () => {
              switch (event.status) {
                case "completed":
                  return (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )
                case "pending":
                  return (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  )
                case "failed":
                  return (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )
              }
            }

            return (
              <div
                key={event.id}
                className="relative flex items-start gap-4 animate-in fade-in-0 slide-in-from-left-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "300ms",
                }}
              >
                {/* Icon */}
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background">
                  {getStatusIcon()}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1 pb-6">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        event.status === "completed"
                          ? "text-foreground"
                          : event.status === "failed"
                            ? "text-destructive"
                            : "text-muted-foreground"
                      )}
                    >
                      {event.label}
                    </p>
                    {event.status === "pending" && (
                      <Clock className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  {event.details && (
                    <p className="text-xs text-muted-foreground">
                      {event.details}
                    </p>
                  )}
                  {event.timestamp && (
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
