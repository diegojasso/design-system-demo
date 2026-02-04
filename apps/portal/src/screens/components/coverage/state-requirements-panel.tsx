"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@novo/ui"
import { Badge } from "@novo/ui"
import { CheckCircle2, AlertTriangle, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { checkCompliance, getStateRequirements, extractStateFromAddress } from "./state-requirements"
import { CoverageData } from "./types"
import { useQuote } from "@/app/quote-context"
import { cn } from "@/shared/utils"

interface StateRequirementsPanelProps {
  coverage: CoverageData
  onFixIssue?: (field: string, newValue: string) => void
}

export function StateRequirementsPanel({
  coverage,
  onFixIssue,
}: StateRequirementsPanelProps) {
  const { quoteData } = useQuote()
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  // Determine state from client info
  const state = React.useMemo(() => {
    if (quoteData.clientInfo?.driversLicenseState) {
      return quoteData.clientInfo.driversLicenseState
    }
    if (quoteData.clientInfo?.address) {
      return extractStateFromAddress(quoteData.clientInfo.address)
    }
    return null
  }, [quoteData.clientInfo])

  const requirements = React.useMemo(() => {
    return getStateRequirements(state)
  }, [state])

  const compliance = React.useMemo(() => {
    return checkCompliance(coverage, state)
  }, [coverage, state])

  if (!state) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/30 text-sm">
        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-muted-foreground">
          Add client address or driver's license state to check compliance
        </span>
      </div>
    )
  }

  // Compact compliant view
  if (compliance.isCompliant && !isExpanded) {
    return (
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div className="flex-1 flex items-center gap-2 flex-wrap text-sm">
            <span className="font-medium text-green-900 dark:text-green-100">
              {requirements.stateName} Requirements Met
            </span>
            <span className="text-green-700 dark:text-green-300">•</span>
            <span className="text-green-700 dark:text-green-300">
              BI: {coverage.liability.bodilyInjury} ✓
            </span>
            <span className="text-green-700 dark:text-green-300">•</span>
            <span className="text-green-700 dark:text-green-300">
              PD: {coverage.liability.propertyDamage} ✓
            </span>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              Details
              {isExpanded ? (
                <ChevronUp className="h-3 w-3 ml-1" />
              ) : (
                <ChevronDown className="h-3 w-3 ml-1" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2 px-3 py-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10 text-sm">
          <div className="space-y-1.5">
            <div className="font-medium text-xs text-green-900 dark:text-green-100">
              Minimum Required:
            </div>
            <div className="text-xs text-green-700 dark:text-green-300 space-y-0.5">
              <div>Bodily Injury: {requirements.minimumBodilyInjury}</div>
              <div>Property Damage: {requirements.minimumPropertyDamage}</div>
              {requirements.requiresUninsuredMotorist && (
                <div>Uninsured Motorist: Required</div>
              )}
              {requirements.requiresMedicalPayments && (
                <div>Medical Payments: Required</div>
              )}
            </div>
            {requirements.notes && (
              <div className="text-xs text-green-600 dark:text-green-400 italic pt-1">
                Note: {requirements.notes}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  // Non-compliant or expanded view
  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md border",
          compliance.isCompliant
            ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
            : "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"
        )}
      >
        {compliance.isCompliant ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0" />
        ) : (
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
        )}
        <div className="flex-1 flex items-center gap-2 flex-wrap text-sm">
          <span
            className={cn(
              "font-medium",
              compliance.isCompliant
                ? "text-green-900 dark:text-green-100"
                : "text-amber-900 dark:text-amber-100"
            )}
          >
            {requirements.stateName} Requirements
            {compliance.issues.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-4 px-1.5 text-xs">
                {compliance.issues.length} issue{compliance.issues.length > 1 ? "s" : ""}
              </Badge>
            )}
          </span>
        </div>
        {compliance.issues.length > 0 && compliance.issues[0].autoFix && onFixIssue && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() =>
              onFixIssue(compliance.issues[0].field, compliance.issues[0].autoFix!.newValue)
            }
          >
            Fix
          </Button>
        )}
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            {isExpanded ? (
              <>
                Hide
                <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                Details
                <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 space-y-2">
        <div className="px-3 py-2 rounded-md border border-border bg-background/50 text-sm">
          <div className="font-medium mb-1.5 text-xs">Minimum Required:</div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>Bodily Injury: {requirements.minimumBodilyInjury}</div>
            <div>Property Damage: {requirements.minimumPropertyDamage}</div>
            {requirements.requiresUninsuredMotorist && (
              <div>Uninsured Motorist: Required</div>
            )}
            {requirements.requiresMedicalPayments && (
              <div>Medical Payments: Required</div>
            )}
          </div>
        </div>
        {compliance.issues.length > 0 && (
          <div className="space-y-1.5">
            {compliance.issues.map((issue) => (
              <div
                key={issue.field}
                className="px-3 py-2 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10 text-sm"
              >
                <div className="font-medium mb-1 text-xs">{issue.message}</div>
                {issue.autoFix && onFixIssue && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 text-xs mt-1"
                    onClick={() => onFixIssue(issue.field, issue.autoFix!.newValue)}
                  >
                    {issue.autoFix.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
        {requirements.notes && (
          <div className="text-xs text-muted-foreground italic px-3">
            Note: {requirements.notes}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
