"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Car } from "lucide-react"
import { DiscoveredVehicle, Vehicle } from "./types"

interface VehicleSuggestionsProps {
  discoveredVehicles: DiscoveredVehicle[]
  existingVehicles: Vehicle[]
  onAddVehicle: (discoveredVehicle: DiscoveredVehicle) => void
  isLoading?: boolean
}

export function VehicleSuggestions({
  discoveredVehicles,
  existingVehicles,
  onAddVehicle,
  isLoading = false,
}: VehicleSuggestionsProps) {
  // Filter out vehicles that already exist in the table
  const filteredDiscoveredVehicles = React.useMemo(() => {
    return discoveredVehicles.filter((discoveredVehicle) => {
      // Check if a vehicle with the same VIN, or same make/model/year already exists
      const exists = existingVehicles.some((vehicle) => {
        // If both have VINs, compare by VIN
        if (discoveredVehicle.vin && vehicle.vin) {
          return discoveredVehicle.vin.toLowerCase() === vehicle.vin.toLowerCase()
        }
        // Otherwise, compare by make, model, and year
        const vehicleMake = vehicle.make.toLowerCase().trim()
        const vehicleModel = vehicle.model.toLowerCase().trim()
        const vehicleYear = vehicle.year.trim()
        const discoveredMake = discoveredVehicle.make.toLowerCase().trim()
        const discoveredModel = discoveredVehicle.model.toLowerCase().trim()
        const discoveredYear = discoveredVehicle.year.trim()
        
        return (
          vehicleMake === discoveredMake &&
          vehicleModel === discoveredModel &&
          vehicleYear === discoveredYear
        )
      })
      return !exists
    })
  }, [discoveredVehicles, existingVehicles])

  if (filteredDiscoveredVehicles.length === 0) {
    return (
      <div>
        <h3
          className="text-sm font-medium text-foreground mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Vehicles Found
        </h3>
        <p
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          No additional vehicles found
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
        Vehicles Found
      </h3>
      <div className="space-y-2">
        {filteredDiscoveredVehicles.map((discoveredVehicle, index) => (
          <VehicleSuggestionCard
            key={`${discoveredVehicle.make}-${discoveredVehicle.model}-${discoveredVehicle.year}-${index}`}
            discoveredVehicle={discoveredVehicle}
            onAdd={() => onAddVehicle(discoveredVehicle)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}

interface VehicleSuggestionCardProps {
  discoveredVehicle: DiscoveredVehicle
  onAdd: () => void
  isLoading?: boolean
}

function VehicleSuggestionCard({ discoveredVehicle, onAdd, isLoading = false }: VehicleSuggestionCardProps) {
  const formatConfidence = (confidence: number): string => {
    return `${Math.round(confidence * 100)}%`
  }

  const getVehicleDisplay = (): string => {
    const parts = [discoveredVehicle.year, discoveredVehicle.make, discoveredVehicle.model].filter(Boolean)
    return parts.join(' ')
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
              {getVehicleDisplay()}
            </p>
            {discoveredVehicle.confidence && (
              <span
                className="text-xs text-muted-foreground shrink-0"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {formatConfidence(discoveredVehicle.confidence)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {discoveredVehicle.vin && (
              <p
                className="text-xs text-muted-foreground font-mono"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {discoveredVehicle.vin}
              </p>
            )}
            {discoveredVehicle.source && (
              <span
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                • {discoveredVehicle.source}
              </span>
            )}
          </div>
          {/* Badges from discovery */}
          {(discoveredVehicle.badges?.cleanTitle || discoveredVehicle.badges?.carfaxVerified) && (
            <div className="flex items-center gap-1 mt-2">
              {discoveredVehicle.badges.cleanTitle && (
                <span
                  className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Clean title
                </span>
              )}
              {discoveredVehicle.badges.carfaxVerified && (
                <span
                  className="text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Carfax ✓
                </span>
              )}
            </div>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onAdd}
          disabled={isLoading}
          className="h-8 w-8 shrink-0 ml-2"
          aria-label={isLoading ? "Adding vehicle..." : "Add vehicle"}
        >
          <Car className={`h-4 w-4 ${isLoading ? 'opacity-50' : ''}`} />
        </Button>
      </div>
    </div>
  )
}

