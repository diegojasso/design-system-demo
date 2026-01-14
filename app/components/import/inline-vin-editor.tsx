"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { InlineEditableField } from "./inline-editable-field"

interface InlineVINEditorProps {
  value: string
  vehicleName?: string
  onSave: (vin: string) => Promise<void> | void
  onCancel?: () => void
  className?: string
  disabled?: boolean
}

/**
 * Validates VIN format
 * VIN must be 17 characters, alphanumeric, excluding I, O, Q
 */
function validateVIN(vin: string): string | null {
  if (!vin || vin.trim() === "") {
    return "VIN is required"
  }

  const trimmedVIN = vin.trim().toUpperCase()
  
  // Check length
  if (trimmedVIN.length !== 17) {
    return "VIN must be exactly 17 characters"
  }

  // Check format: alphanumeric excluding I, O, Q
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/
  if (!vinRegex.test(trimmedVIN)) {
    return "VIN contains invalid characters (I, O, Q are not allowed)"
  }

  return null
}

export function InlineVINEditor({
  value,
  vehicleName,
  onSave,
  onCancel,
  className,
  disabled = false,
}: InlineVINEditorProps) {
  const handleSave = async (vin: string) => {
    // Normalize VIN (uppercase, trimmed)
    const normalizedVIN = vin.trim().toUpperCase()
    await onSave(normalizedVIN)
  }

  return (
    <div className={cn("space-y-2", className)}>
      <InlineEditableField
        value={value}
        type="text"
        label="VIN"
        placeholder="Enter 17-character VIN"
        onSave={handleSave}
        onCancel={onCancel}
        validate={validateVIN}
        disabled={disabled}
        autoFocus={true}
      />
    </div>
  )
}
