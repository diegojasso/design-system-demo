"use client"

import * as React from "react"
import { Progress } from "@novo/ui"
import { Badge } from "@novo/ui"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@novo/ui"
import { cn } from "@/shared/utils"

interface CompactProgressIndicatorProps {
  resolved: number
  total: number
  driversCount: number
  vehiclesCount: number
  className?: string
}

export function CompactProgressIndicator({
  resolved,
  total,
  driversCount,
  vehiclesCount,
  className,
}: CompactProgressIndicatorProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const completionPercentage = total > 0 ? Math.round((resolved / total) * 100) : 100

  return (
    <div className={cn("space-y-2", className)}>
      {/* Compact View */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Progress value={completionPercentage} className="h-1.5 flex-1" />
            <Badge variant="outline" className="text-xs font-medium">
              {completionPercentage}%
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{driversCount} Driver{driversCount !== 1 ? "s" : ""}</span>
          <span>{vehiclesCount} Vehicle{vehiclesCount !== 1 ? "s" : ""}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 px-2"
        >
          {isExpanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="rounded-md border border-border bg-muted/30 p-3 space-y-2 animate-in fade-in-0 slide-in-from-top-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Progress</span>
            <span className="text-muted-foreground">
              {resolved} of {total} resolved
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Drivers:</span>{" "}
              <span className="font-medium text-foreground">{driversCount}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Vehicles:</span>{" "}
              <span className="font-medium text-foreground">{vehiclesCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
