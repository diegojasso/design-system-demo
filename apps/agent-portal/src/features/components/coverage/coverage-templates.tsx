"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@novo/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@novo/ui"
import { Label } from "@novo/ui"
import { Sparkles, Check, X, Save } from "lucide-react"
import { CoverageTemplate, loadTemplates, applyTemplate, saveCustomTemplate } from "./templates"
import { CoverageData } from "./types"
import { Input } from "@novo/ui"
import { cn } from "@/shared/utils"
import { useQuote } from "@/app/quote-context"

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
  const { quoteData } = useQuote()
  const [templates, setTemplates] = React.useState<CoverageTemplate[]>([])
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<CoverageTemplate | null>(null)
  const [showSaveDialog, setShowSaveDialog] = React.useState(false)
  const [templateName, setTemplateName] = React.useState("")

  React.useEffect(() => {
    const loadedTemplates = loadTemplates()
    
    // Add imported from ezlynx template if import summary exists
    if (quoteData.importSummary && quoteData.importSummary.missingInfo.length > 0) {
      const importedTemplate: CoverageTemplate = {
        id: "imported-ezlynx",
        name: "Imported from ezlynx",
        description: "Coverage configuration imported from ezlynx aggregator",
        category: "custom",
        isDefault: false,
        coverage: {
          liability: currentCoverage.liability,
          additional: currentCoverage.additional,
          vehicleCoverages: [], // Vehicle coverages are applied per vehicle
        },
      }
      setTemplates([importedTemplate, ...loadedTemplates])
    } else {
      setTemplates(loadedTemplates)
    }
  }, [quoteData.importSummary, currentCoverage])

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return

    const newCoverage = applyTemplate(selectedTemplate, currentCoverage, vehicleIds)
    onApplyTemplate(newCoverage)
    setIsOpen(false)
    setSelectedTemplate(null)
  }

  const handleSaveAsTemplate = () => {
    if (!templateName.trim()) return

    const newTemplate = saveCustomTemplate({
      name: templateName.trim(),
      description: `Custom template: ${templateName.trim()}`,
      category: "custom",
      isDefault: false,
      coverage: {
        liability: currentCoverage.liability,
        additional: currentCoverage.additional,
        vehicleCoverages: [], // Only save liability and additional
      },
    })

    setTemplates(loadTemplates())
    setShowSaveDialog(false)
    setTemplateName("")
    setSelectedTemplate(newTemplate)
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
    <>
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
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
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
                          {template.id === "imported-ezlynx" && (
                            <span className="text-xs text-muted-foreground ml-2">
                              Imported
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 gap-2"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="h-4 w-4" />
                Save as Template
              </Button>
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
                disabled={!selectedTemplate || vehicleIds.length === 0 || selectedTemplate.id === "imported-ezlynx"}
              >
                Apply Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save as Template Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save as Template</DialogTitle>
            <DialogDescription>
              Save your current liability and additional coverage settings as a reusable template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && templateName.trim()) {
                    handleSaveAsTemplate()
                  }
                }}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => {
                setShowSaveDialog(false)
                setTemplateName("")
              }}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveAsTemplate}
                disabled={!templateName.trim()}
              >
                Save Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
