"use client"

import { FileText } from "lucide-react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function ReportsPage() {
  return (
    <div className="w-full">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText className="h-5 w-5" />
          </EmptyMedia>
          <EmptyTitle>Reports</EmptyTitle>
          <EmptyDescription>
            Review third-party reports before binding the policy.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          Run and review MVR, CLUE, and other underwriting reports here.
        </EmptyContent>
      </Empty>
    </div>
  )
}
