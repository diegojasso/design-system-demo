"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type FieldType = "text" | "number" | "date" | "vin"

interface InlineEditableFieldProps {
  value: string
  type?: FieldType
  placeholder?: string
  label?: string
  onSave: (value: string) => Promise<void> | void
  onCancel?: () => void
  validate?: (value: string) => string | null // Returns error message or null
  className?: string
  disabled?: boolean
  autoFocus?: boolean
}

export function InlineEditableField({
  value: initialValue,
  type = "text",
  placeholder,
  label,
  onSave,
  onCancel,
  validate,
  className,
  disabled = false,
  autoFocus = false,
}: InlineEditableFieldProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editValue, setEditValue] = React.useState(initialValue)
  const [isSaving, setIsSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [saveStatus, setSaveStatus] = React.useState<"idle" | "saving" | "saved" | "error">("idle")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Reset when initial value changes
  React.useEffect(() => {
    if (!isEditing) {
      setEditValue(initialValue)
      setError(null)
      setSaveStatus("idle")
    }
  }, [initialValue, isEditing])

  // Auto-focus when entering edit mode
  React.useEffect(() => {
    if (isEditing && inputRef.current && autoFocus) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing, autoFocus])

  const handleStartEdit = () => {
    if (disabled) return
    setEditValue(initialValue)
    setError(null)
    setIsEditing(true)
    setSaveStatus("idle")
  }

  const handleCancel = () => {
    setEditValue(initialValue)
    setError(null)
    setIsEditing(false)
    setSaveStatus("idle")
    onCancel?.()
  }

  const handleSave = async () => {
    // Validate
    if (validate) {
      const validationError = validate(editValue)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    // Don't save if value hasn't changed
    if (editValue === initialValue) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    setSaveStatus("saving")
    setError(null)

    try {
      await onSave(editValue)
      setSaveStatus("saved")
      setIsEditing(false)
      
      // Reset status after a delay
      setTimeout(() => {
        setSaveStatus("idle")
      }, 2000)
    } catch (err) {
      setSaveStatus("error")
      setError(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Don't blur if clicking on save/cancel buttons
    const relatedTarget = e.relatedTarget as HTMLElement
    if (relatedTarget?.closest('[data-inline-edit-controls]')) {
      return
    }
    
    // Auto-save on blur if value changed
    if (editValue !== initialValue && !error) {
      handleSave()
    } else if (editValue === initialValue) {
      setIsEditing(false)
    }
  }

  // Determine input type
  const inputType = type === "number" ? "number" : type === "date" ? "date" : "text"

  // Display mode
  if (!isEditing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {label && (
          <span className="text-sm font-medium text-muted-foreground">{label}:</span>
        )}
        <button
          onClick={handleStartEdit}
          disabled={disabled}
          className={cn(
            "text-sm text-foreground hover:text-primary transition-all duration-200 rounded px-2 py-1 -mx-2 -my-1 hover:bg-muted/50",
            !initialValue && "text-muted-foreground italic",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {initialValue || placeholder || "Click to edit"}
        </button>
        {saveStatus === "saved" && (
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 animate-in zoom-in-50 duration-300" />
        )}
      </div>
    )
  }

  // Edit mode
  return (
    <div className={cn("flex flex-col gap-2 animate-in fade-in-0 slide-in-from-top-1 duration-200", className)}>
      <div className="flex items-center gap-2">
        {label && (
          <span className="text-sm font-medium text-muted-foreground">{label}:</span>
        )}
        <Input
          ref={inputRef}
          type={inputType}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value)
            setError(null) // Clear error on change
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isSaving}
          className={cn(
            "flex-1 transition-all duration-200",
            error && "border-destructive focus-visible:ring-destructive animate-in shake"
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${label}-error` : undefined}
        />
        <div data-inline-edit-controls className="flex items-center gap-1 animate-in fade-in-0 slide-in-from-right-2 duration-200">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !!error}
            className="h-8 px-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            {isSaving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSaving}
            className="h-8 px-2 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {error && (
        <p
          id={`${label}-error`}
          className="text-xs text-destructive flex items-center gap-1 animate-in fade-in-0 slide-in-from-top-1 duration-200"
        >
          <XCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
      {saveStatus === "saving" && (
        <p className="text-xs text-muted-foreground flex items-center gap-1 animate-in fade-in-0 duration-200">
          <Loader2 className="h-3 w-3 animate-spin flex-shrink-0" />
          Saving...
        </p>
      )}
    </div>
  )
}
