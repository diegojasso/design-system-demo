"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ColumnDef } from "./types"
import { validateCellValue } from "./validation"
import { getDisplayPlaceholder, getEditPlaceholder } from "./utils/placeholders"

interface EditableTableCellProps {
  value: any
  field: ColumnDef
  isEditing: boolean
  onFocus: () => void
  onEdit: () => void
  onBlur: (moveNext?: boolean) => void
  onChange: (value: any) => void
  onDoubleClick?: () => void
  error?: string
  isMissing?: boolean
}

export const EditableTableCell = React.memo(function EditableTableCell({
  value,
  field,
  isEditing,
  onFocus,
  onEdit,
  onBlur,
  onChange,
  onDoubleClick,
  error,
  isMissing = false,
}: EditableTableCellProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const selectTriggerRef = React.useRef<HTMLButtonElement>(null)

  // Auto-focus input when editing starts
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      if (field.type === 'text' || field.type === 'date' || field.type === 'number') {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [isEditing, field.type])

  // Auto-open dropdown when entering edit mode via Enter key
  React.useEffect(() => {
    if (isEditing && field.type === 'dropdown' && selectTriggerRef.current) {
      // Small delay to ensure the select is ready, then click to open
      const timeoutId = setTimeout(() => {
        selectTriggerRef.current?.click()
      }, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [isEditing, field.type])

  const formatDisplayValue = (): string => {
    if (value === null || value === undefined || value === '') {
      return ''
    }

    if (field.type === 'boolean') {
      return value ? 'Yes' : 'No'
    }

    if (field.type === 'date' && typeof value === 'string') {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${month}/${day}/${year}`
      }
      return value
    }

    return String(value)
  }

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().split('T')[0] // YYYY-MM-DD format
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onBlur(true) // Move to next cell after blur
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      onBlur(false) // Don't move to next cell
    }
    // Tab navigation - prevent default and stop propagation
    // Global handler will handle navigation after blur
    if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
      // Blur will be called, then global handler navigates
    }
  }

  // Handle Enter key in display mode to enter edit mode
  const handleKeyDownDisplay = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isEditing) {
      e.preventDefault()
      onEdit()
      return
    }
    // Tab navigation - prevent default and stop propagation
    // Global handler will handle navigation
    if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  // Render based on field type
  if (!isEditing) {
    // Display mode - click/double-click enters edit mode, Enter key also enters edit mode
    const displayValue = formatDisplayValue()
    const isEmpty = !displayValue || displayValue === ''
    const placeholder = isEmpty ? getDisplayPlaceholder(field, field.required) : null
    
    return (
      <div
        className={`h-full px-4 flex items-center cursor-text hover:bg-[#f9fafb] transition-colors ${
          error ? 'bg-red-50' : ''
        } ${isMissing && !error ? 'bg-amber-50' : ''}`}
        onDoubleClick={onDoubleClick}
        onClick={onEdit}
        onFocus={(e) => {
          // Handle focus from keyboard navigation - just focus, don't edit
          e.currentTarget.focus()
          onFocus()
        }}
        onKeyDown={handleKeyDownDisplay}
        tabIndex={0}
        role="gridcell"
        aria-label={`${field.label}, ${error ? `Error: ${error}` : isMissing ? 'Required field is empty' : ''} ${displayValue || placeholder || 'empty'}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-required={field.required ? 'true' : 'false'}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="flex items-center gap-2 w-full">
          <span className={`text-sm font-normal w-full ${
            error ? 'text-red-700' : 
            isMissing && !error && isEmpty ? 'text-amber-600 italic' :
            isEmpty && field.required ? 'text-amber-600 italic' :
            isEmpty ? 'text-[#9ca3af] italic' :
            isMissing && !error ? 'text-amber-900' : 
            'text-[#111827]'
          }`}>
            {displayValue || (placeholder ? placeholder : <span className="text-[#9ca3af]">—</span>)}
          </span>
          {error && (
            <span className="text-xs text-red-600 shrink-0" title={error}>
              ⚠
            </span>
          )}
          {isMissing && !error && (
            <span className="text-xs text-amber-600 shrink-0" title="Required field is empty">
              ○
            </span>
          )}
        </div>
      </div>
    )
  }

  // Editing mode
  if (field.type === 'text') {
    const inputType = field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'
    const placeholder = getEditPlaceholder(field)
    return (
      <div className="h-full px-4 flex items-center">
        <Input
          ref={inputRef}
          type={inputType}
          value={value || ''}
          placeholder={placeholder || undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className={`h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 ${
            error ? 'text-red-700' : ''
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${field.id}-error` : undefined}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        {error && (
          <span id={`${field.id}-error`} className="sr-only">
            {error}
          </span>
        )}
      </div>
    )
  }

  if (field.type === 'date') {
    const dateValue = formatDateForInput(value || '')
    const placeholder = getEditPlaceholder(field)
    return (
      <div className="h-full px-4 flex items-center">
        <Input
          ref={inputRef}
          type="date"
          value={dateValue}
          placeholder={placeholder || undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className={`h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 ${
            error ? 'text-red-700' : ''
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${field.id}-error` : undefined}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        {error && (
          <span id={`${field.id}-error`} className="sr-only">
            {error}
          </span>
        )}
      </div>
    )
  }

  if (field.type === 'dropdown' && field.options) {
    const placeholder = getEditPlaceholder(field)
    return (
      <div className="h-full px-4 flex items-center">
        <Select
          value={value || ''}
          onValueChange={(newValue) => {
            onChange(newValue)
            // Auto-blur after selection
            setTimeout(() => onBlur(), 100)
          }}
          onOpenChange={(open) => {
            if (!open) {
              // Close select triggers blur
              setTimeout(() => onBlur(), 100)
            }
          }}
        >
          <SelectTrigger 
            ref={selectTriggerRef}
            className="h-8 w-full text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none"
          >
            <SelectValue placeholder={placeholder || "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (field.type === 'boolean') {
    const booleanValue = value === true || value === 'true' || value === 'yes'
    return (
      <div className="h-full px-4 flex items-center">
        <RadioGroup
          value={booleanValue ? 'yes' : 'no'}
          onValueChange={(val) => {
            onChange(val === 'yes')
            // Auto-blur after selection
            setTimeout(() => onBlur(), 100)
          }}
          className="flex flex-row gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id={`${field.id}-yes`} />
            <Label
              htmlFor={`${field.id}-yes`}
              className="text-sm font-normal text-[#111827] cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id={`${field.id}-no`} />
            <Label
              htmlFor={`${field.id}-no`}
              className="text-sm font-normal text-[#111827] cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    )
  }

  // Fallback for number or other types
  const placeholder = getEditPlaceholder(field)
  return (
    <div className="h-full px-4 flex items-center">
      <Input
        ref={inputRef}
        type={field.type === 'number' ? 'number' : 'text'}
        value={value || ''}
        placeholder={placeholder || undefined}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className="h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
    </div>
  )
})

