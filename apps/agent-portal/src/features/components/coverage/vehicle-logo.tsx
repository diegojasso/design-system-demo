"use client"

import * as React from "react"
import { Car } from "lucide-react"

interface VehicleLogoProps {
  make: string
  className?: string
}

// Simple vehicle logo component - can be enhanced with actual logos later
export function VehicleLogo({ make, className }: VehicleLogoProps) {
  // For now, use a simple icon. In production, you'd use actual brand logos
  const makeLower = make.toLowerCase()
  
  // Return brand-specific styling or icon if available
  // For now, just use a car icon with brand name
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <Car className="h-5 w-5 text-muted-foreground" />
    </div>
  )
}
