"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@novo/ui"
import { Input } from "@novo/ui"
import { Label } from "@novo/ui"
import { RadioGroup, RadioGroupItem } from "@novo/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@novo/ui"
import { useQuote } from "@/app/quote-context"
import { useAutoSave } from "@/shared/hooks/use-auto-save"
import {
  Incident,
  createEmptyIncident,
  INCIDENT_SOURCE_OPTIONS,
  INCIDENT_TYPE_OPTIONS,
} from "./types"

const getYesNoValue = (value: boolean) => (value ? "yes" : "no")

export function IncidentsPage() {
  const { quoteData, updateIncidents, saveQuote } = useQuote()

  const [incidents, setIncidents] = React.useState<Incident[]>(() => {
    if (quoteData.incidents && quoteData.incidents.length > 0) {
      return quoteData.incidents
    }
    return [createEmptyIncident()]
  })

  const hasInitialized = React.useRef(false)

  React.useEffect(() => {
    if (!hasInitialized.current && quoteData.incidents && quoteData.incidents.length > 0) {
      setIncidents(quoteData.incidents)
      hasInitialized.current = true
    }
  }, [quoteData.incidents])

  useAutoSave({
    data: incidents,
    saveFn: async (data) => {
      updateIncidents(data)
      await saveQuote()
    },
    debounceMs: 2000,
    enabled: incidents.length > 0,
  })

  const updateIncident = React.useCallback(
    (id: string, updates: Partial<Incident>) => {
      setIncidents((prev) =>
        prev.map((incident) =>
          incident.id === id ? { ...incident, ...updates } : incident
        )
      )
    },
    []
  )

  const updateBooleanField = React.useCallback(
    (
      id: string,
      field: "totalDamagesOver1000" | "atFault" | "policeReportFiled",
      value: string
    ) => {
      updateIncident(id, { [field]: value === "yes" } as Pick<Incident, typeof field>)
    },
    [updateIncident]
  )

  const handleRemoveIncident = React.useCallback((id: string) => {
    setIncidents((prev) => {
      const next = prev.filter((incident) => incident.id !== id)
      return next.length > 0 ? next : [createEmptyIncident()]
    })
  }, [])

  const drivers = quoteData.drivers ?? []

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid grid-cols-[minmax(170px,1.1fr)_minmax(150px,0.9fr)_minmax(170px,1fr)_minmax(170px,1.1fr)_minmax(220px,1.2fr)_minmax(150px,0.8fr)_minmax(190px,1fr)_56px] border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
          <div className="px-4 py-3">Incident type</div>
          <div className="px-4 py-3">Incident date</div>
          <div className="px-4 py-3">Source</div>
          <div className="px-4 py-3">Driver</div>
          <div className="px-4 py-3">Total damages over $1,000?</div>
          <div className="px-4 py-3">At-fault?</div>
          <div className="px-4 py-3">Police report filed?</div>
          <div className="px-4 py-3 text-center"> </div>
        </div>

        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="grid grid-cols-[minmax(170px,1.1fr)_minmax(150px,0.9fr)_minmax(170px,1fr)_minmax(170px,1.1fr)_minmax(220px,1.2fr)_minmax(150px,0.8fr)_minmax(190px,1fr)_56px] items-center border-b border-border last:border-b-0"
          >
            <div className="px-4 py-3">
              <Select
                value={incident.incidentType || undefined}
                onValueChange={(value) => updateIncident(incident.id, { incidentType: value })}
              >
                <SelectTrigger className="w-full" size="sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {INCIDENT_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="px-4 py-3">
              <Input
                value={incident.incidentDate}
                onChange={(event) =>
                  updateIncident(incident.id, { incidentDate: event.target.value })
                }
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div className="px-4 py-3">
              <Select
                value={incident.source || undefined}
                onValueChange={(value) => updateIncident(incident.id, { source: value })}
              >
                <SelectTrigger className="w-full" size="sm">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {INCIDENT_SOURCE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="px-4 py-3">
              <Select
                value={incident.driverId || undefined}
                onValueChange={(value) => updateIncident(incident.id, { driverId: value })}
              >
                <SelectTrigger className="w-full" size="sm">
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.length === 0 && (
                    <SelectItem value="no-drivers" disabled>
                      No drivers available
                    </SelectItem>
                  )}
                  {drivers.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.firstName} {driver.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="px-4 py-3">
              <RadioGroup
                value={getYesNoValue(incident.totalDamagesOver1000)}
                onValueChange={(value) =>
                  updateBooleanField(incident.id, "totalDamagesOver1000", value)
                }
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-damages-yes`} value="yes" />
                  <Label htmlFor={`${incident.id}-damages-yes`} className="text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-damages-no`} value="no" />
                  <Label htmlFor={`${incident.id}-damages-no`} className="text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="px-4 py-3">
              <RadioGroup
                value={getYesNoValue(incident.atFault)}
                onValueChange={(value) =>
                  updateBooleanField(incident.id, "atFault", value)
                }
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-fault-yes`} value="yes" />
                  <Label htmlFor={`${incident.id}-fault-yes`} className="text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-fault-no`} value="no" />
                  <Label htmlFor={`${incident.id}-fault-no`} className="text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="px-4 py-3">
              <RadioGroup
                value={getYesNoValue(incident.policeReportFiled)}
                onValueChange={(value) =>
                  updateBooleanField(incident.id, "policeReportFiled", value)
                }
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-police-yes`} value="yes" />
                  <Label htmlFor={`${incident.id}-police-yes`} className="text-sm">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id={`${incident.id}-police-no`} value="no" />
                  <Label htmlFor={`${incident.id}-police-no`} className="text-sm">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-center px-2 py-3">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Remove incident"
                onClick={() => handleRemoveIncident(incident.id)}
              >
                <Trash2 className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
