"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CollapsibleImportedInfoProps {
  drivers: Array<{ name: string }>
  vehicles: Array<{ year: string; make: string; model: string; vin?: string }>
  defaultOpen?: boolean
  className?: string
}

export function CollapsibleImportedInfo({
  drivers,
  vehicles,
  defaultOpen = false,
  className,
}: CollapsibleImportedInfoProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  const summary = `${drivers.length} driver${drivers.length !== 1 ? "s" : ""}, ${vehicles.length} vehicle${vehicles.length !== 1 ? "s" : ""}`

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={cn("space-y-2", className)}>
      <div className="rounded-lg border border-border bg-card">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Imported Information
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
          <div className="space-y-4 pt-2">
            {/* Drivers */}
            <div>
              <h4 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Drivers ({drivers.length})
              </h4>
              <div className="space-y-1.5">
                {drivers.map((driver, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    <span>{driver.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicles */}
            <div>
              <h4 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Vehicles ({vehicles.length})
              </h4>
              <div className="space-y-1.5">
                {vehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    <span>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
