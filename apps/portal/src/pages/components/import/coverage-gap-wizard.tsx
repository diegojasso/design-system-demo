"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle2, ChevronRight, Upload, FileText } from "lucide-react"
import { Button } from "@novo/ui"
import { RadioGroup, RadioGroupItem } from "@novo/ui"
import { Label } from "@novo/ui"
import { Progress } from "@novo/ui"
import { cn } from "@/shared/utils"

interface CoverageGapWizardProps {
  data: {
    gapPeriod: {
      start: string
      end: string
      days: number
    }
    previousCarrier: string
    currentCarrier: string
    currentCarrierStart: string
    applicationStates: string
    reportShows: string
    rateImpact: {
      current: number
      potential: number
      savings: number
    }
  }
  clientName: string
  onResolve: (option: string) => void
  onClose: () => void
}

type WizardStep = "overview" | "resolution" | "confirmation"

export function CoverageGapWizard({
  data,
  clientName,
  onResolve,
  onClose,
}: CoverageGapWizardProps) {
  const [currentStep, setCurrentStep] = React.useState<WizardStep>("overview")
  const [resolutionOption, setResolutionOption] = React.useState<string>("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const steps: Array<{ id: WizardStep; label: string }> = [
    { id: "overview", label: "Overview" },
    { id: "resolution", label: "Resolution" },
    { id: "confirmation", label: "Confirmation" },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep === "overview") {
      setCurrentStep("resolution")
    } else if (currentStep === "resolution" && resolutionOption) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        setCurrentStep("confirmation")
        setIsSubmitting(false)
      }, 500)
    }
  }

  const handleBack = () => {
    if (currentStep === "resolution") {
      setCurrentStep("overview")
    } else if (currentStep === "confirmation") {
      setCurrentStep("resolution")
    }
  }

  const handleFinish = () => {
    onResolve(resolutionOption)
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">Progress</span>
          <span className="text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex items-center gap-2",
                  index <= currentStepIndex
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    index < currentStepIndex
                      ? "bg-primary text-primary-foreground"
                      : index === currentStepIndex
                        ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-xs font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === "overview" && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            {/* Discrepancy */}
            <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
              <h4 className="flex items-center gap-2 font-semibold text-foreground">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Discrepancy Detected
              </h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <span className="font-medium">Application states:</span> "
                  {data.applicationStates}"
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Verisk RC2 report shows:</span>{" "}
                  {data.reportShows}
                </p>
              </div>
            </div>

            {/* Report Details */}
            <div className="space-y-4 rounded-lg border border-border bg-card p-4">
              <h4 className="font-semibold text-foreground">Report Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Gap Period</p>
                  <p className="font-medium text-foreground">
                    {new Date(data.gapPeriod.start).toLocaleDateString()} -{" "}
                    {new Date(data.gapPeriod.end).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {data.gapPeriod.days} days
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Previous Carrier</p>
                  <p className="font-medium text-foreground">
                    {data.previousCarrier}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current Carrier</p>
                  <p className="font-medium text-foreground">
                    {data.currentCarrier}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Started</p>
                  <p className="font-medium text-foreground">
                    {new Date(data.currentCarrierStart).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Rate Impact */}
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <h4 className="font-semibold text-foreground">Rate Impact</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Current rate (with gap)
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    ${data.rateImpact.current.toLocaleString()}/6mo
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Potential rate (if resolved)
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${data.rateImpact.potential.toLocaleString()}/6mo
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Savings if resolved
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${Math.abs(data.rateImpact.savings)}/6mo
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === "resolution" && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Select Resolution Option
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose how you want to resolve this coverage gap.
              </p>
            </div>

            <RadioGroup
              value={resolutionOption}
              onValueChange={setResolutionOption}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <RadioGroupItem
                    value="provide-proof"
                    id="provide-proof"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="provide-proof"
                      className="cursor-pointer font-medium"
                    >
                      Provide proof of coverage
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upload declarations page or certificate showing coverage
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 h-auto p-0 text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        // TODO: Implement file upload
                        console.log("Upload documents")
                      }}
                    >
                      <Upload className="mr-1 h-3 w-3" />
                      Upload Documents
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <RadioGroupItem
                    value="confirm-gap"
                    id="confirm-gap"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="confirm-gap"
                      className="cursor-pointer font-medium"
                    >
                      Confirm gap is accurate
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Proceed with current rating
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <RadioGroupItem
                    value="manual-review"
                    id="manual-review"
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="manual-review"
                      className="cursor-pointer font-medium"
                    >
                      Request manual review
                    </Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Escalate to underwriting for override consideration
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 h-auto p-0 text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        // TODO: Implement note for underwriter
                        console.log("Add note for underwriter")
                      }}
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Add Note for Underwriter
                    </Button>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}

        {currentStep === "confirmation" && (
          <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Resolution Submitted
              </h3>
              <p className="text-sm text-muted-foreground">
                Your resolution option has been recorded. The coverage gap will
                be processed accordingly.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex gap-2">
          {currentStep !== "overview" && (
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          )}
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
        <div className="flex gap-2">
          {currentStep === "overview" && (
            <Button onClick={handleNext}>Continue</Button>
          )}
          {currentStep === "resolution" && (
            <Button
              onClick={handleNext}
              disabled={!resolutionOption || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
          {currentStep === "confirmation" && (
            <Button onClick={handleFinish}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  )
}
