"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import { UserPlus } from "lucide-react"
import { MVRDriver, Driver } from "./types"

interface MVRSuggestionsProps {
  mvrDrivers: MVRDriver[]
  existingDrivers: Driver[]
  onAddDriver: (mvrDriver: MVRDriver) => void
  isLoading?: boolean
}

export function MVRSuggestions({
  mvrDrivers,
  existingDrivers,
  onAddDriver,
  isLoading = false,
}: MVRSuggestionsProps) {
  // Filter out drivers that already exist in the table
  const filteredMVRDrivers = React.useMemo(() => {
    return mvrDrivers.filter((mvrDriver) => {
      // Check if a driver with the same name and DOB already exists
      const exists = existingDrivers.some((driver) => {
        const driverFullName = `${driver.firstName} ${driver.lastName}`.toLowerCase().trim()
        const mvrName = mvrDriver.name.toLowerCase().trim()
        const driverDOB = driver.dateOfBirth
        const mvrDOB = mvrDriver.dateOfBirth
        
        return driverFullName === mvrName && driverDOB === mvrDOB
      })
      return !exists
    })
  }, [mvrDrivers, existingDrivers])

  if (filteredMVRDrivers.length === 0) {
    return (
      <div>
        <h3
          className="text-sm font-medium text-foreground mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Drivers Found
        </h3>
        <p
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          No additional drivers found
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3
        className="text-sm font-medium text-foreground mb-3"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Drivers Found
      </h3>
      <div className="space-y-2">
        {filteredMVRDrivers.map((mvrDriver, index) => (
          <MVRSuggestionCard
            key={`${mvrDriver.name}-${mvrDriver.dateOfBirth}-${index}`}
            mvrDriver={mvrDriver}
            onAdd={() => onAddDriver(mvrDriver)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}

interface MVRSuggestionCardProps {
  mvrDriver: MVRDriver
  onAdd: () => void
  isLoading?: boolean
}

function MVRSuggestionCard({ mvrDriver, onAdd, isLoading = false }: MVRSuggestionCardProps) {
  const formatDate = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/../${year}`
  }

  const formatConfidence = (confidence: number): string => {
    return `${Math.round(confidence * 100)}%`
  }

  return (
    <div className="border border-border bg-card rounded-md p-3 hover:bg-muted transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p
              className="text-sm font-medium text-foreground truncate"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {mvrDriver.name}
            </p>
            {mvrDriver.confidence && (
              <span
                className="text-xs text-muted-foreground shrink-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {formatConfidence(mvrDriver.confidence)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {formatDate(mvrDriver.dateOfBirth)}
            </p>
            {mvrDriver.source && (
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                • {mvrDriver.source}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onAdd}
          disabled={isLoading}
          className="h-8 w-8 shrink-0 ml-2"
          aria-label={isLoading ? "Adding driver..." : "Add driver"}
        >
          <UserPlus className={`h-4 w-4 ${isLoading ? 'opacity-50' : ''}`} />
        </Button>
      </div>
    </div>
  )
}

