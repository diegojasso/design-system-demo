"use client"

import * as React from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertTriangle, MapPin } from "lucide-react"
import { checkCompliance, getStateRequirements, extractStateFromAddress } from "./state-requirements"
import { CoverageData } from "./types"
import { useQuote } from "@/app/contexts/quote-context"
import { cn } from "@/lib/utils"

interface StateRequirementsPanelProps {
  coverage: CoverageData
  onFixIssue?: (field: string, newValue: string) => void
}

export function StateRequirementsPanel({
  coverage,
  onFixIssue,
}: StateRequirementsPanelProps) {
  const { quoteData } = useQuote()
  
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
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>State not detected</AlertTitle>
        <AlertDescription>
          Add client address or driver's license state to check compliance requirements.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert
      className={cn(
        compliance.isCompliant
          ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20"
          : "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"
      )}
    >
      {compliance.isCompliant ? (
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      )}
      <AlertTitle>
        {compliance.isCompliant
          ? `${requirements.stateName} Requirements Met`
          : `${requirements.stateName} Requirements`}
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <div className="text-sm">
          <div className="font-medium mb-1">Minimum Required:</div>
          <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
            <li>Bodily Injury: {requirements.minimumBodilyInjury}</li>
            <li>Property Damage: {requirements.minimumPropertyDamage}</li>
            {requirements.requiresUninsuredMotorist && (
              <li>Uninsured Motorist: Required</li>
            )}
            {requirements.requiresMedicalPayments && (
              <li>Medical Payments: Required</li>
            )}
          </ul>
        </div>

        {compliance.issues.length > 0 && (
          <div className="pt-2 space-y-2">
            <div className="font-medium text-sm">Issues Found:</div>
            {compliance.issues.map((issue) => (
              <div
                key={issue.field}
                className="text-sm p-2 rounded bg-background/50 border border-border"
              >
                <div className="font-medium mb-1">{issue.message}</div>
                {issue.autoFix && onFixIssue && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-1 h-7 text-xs"
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
          <div className="text-xs text-muted-foreground pt-1 italic">
            Note: {requirements.notes}
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}
