"use client"

import { AlertTriangle } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function IncidentsPage() {
  return (
    <div className="w-full">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle className="h-5 w-5" />
          </EmptyMedia>
          <EmptyTitle>Incidents</EmptyTitle>
          <EmptyDescription>
            Track household incidents that affect underwriting and pricing.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          Add prior accidents, violations, and claims for drivers or vehicles.
        </EmptyContent>
      </Empty>
    </div>
  )
}
