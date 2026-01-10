"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Sparkles, Check, X } from "lucide-react"
import { CoverageTemplate, loadTemplates, applyTemplate } from "./templates"
import { CoverageData } from "./types"
import { cn } from "@/lib/utils"

interface CoverageTemplatesProps {
  currentCoverage: CoverageData
  vehicleIds: string[]
  onApplyTemplate: (coverage: CoverageData) => void
}

export function CoverageTemplates({
  currentCoverage,
  vehicleIds,
  onApplyTemplate,
}: CoverageTemplatesProps) {
  const [templates, setTemplates] = React.useState<CoverageTemplate[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<CoverageTemplate | null>(null)

  React.useEffect(() => {
    setTemplates(loadTemplates())
  }, [])

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return

    const newCoverage = applyTemplate(selectedTemplate, currentCoverage, vehicleIds)
    onApplyTemplate(newCoverage)
    setIsOpen(false)
    setSelectedTemplate(null)
  }

  const templateCategories = {
    minimum: "Minimum",
    standard: "Standard",
    comprehensive: "Comprehensive",
    "high-value": "High-Value",
    commercial: "Commercial",
    custom: "Custom",
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Sparkles className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Coverage Templates</DialogTitle>
          <DialogDescription>
            Quickly apply pre-configured coverage settings to your quote
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select a template</Label>
            <Select
              value={selectedTemplate?.id || ""}
              onValueChange={(value) => {
                const template = templates.find((t) => t.id === value)
                setSelectedTemplate(template || null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{template.name}</span>
                      {template.isDefault && (
                        <span className="text-xs text-muted-foreground ml-2">
                          Default
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTemplate && (
            <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
              <div>
                <h4 className="font-medium text-sm mb-1">{selectedTemplate.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Bodily Injury:</span>
                  <span className="ml-2 font-medium">
                    {selectedTemplate.coverage.liability.bodilyInjury}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Property Damage:</span>
                  <span className="ml-2 font-medium">
                    {selectedTemplate.coverage.liability.propertyDamage}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Medical Payments:</span>
                  <span className="ml-2 font-medium">
                    {selectedTemplate.coverage.additional.medicalPayments}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Uninsured Motorists:</span>
                  <span className="ml-2 font-medium">
                    {selectedTemplate.coverage.additional.uninsuredMotoristsBodilyInjury}
                  </span>
                </div>
              </div>

              {vehicleIds.length === 0 && (
                <div className="text-sm text-amber-600 dark:text-amber-400">
                  ⚠️ No vehicles added yet. Template will be applied when vehicles are added.
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate || vehicleIds.length === 0}
            >
              Apply Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
