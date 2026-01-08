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
import { getDisplayPlaceholder, getEditPlaceholder } from "./utils/placeholders"

interface EditableTableCellProps {
  value: any
  field: ColumnDef
  isEditing: boolean
  onFocus: () => void
  onEdit: () => void
  onBlur: (moveNext?: boolean, undo?: boolean) => void
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
      if (field.type === 'text' || field.type === 'date' || field.type === 'number' || field.type === 'number-with-unit') {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [isEditing, field.type])

  // Auto-open dropdown when entering edit mode via Enter key
  React.useEffect(() => {
    if (isEditing && field.type === 'dropdown' && selectTriggerRef.current) {
      // Small delay to ensure the select is rendered
      setTimeout(() => {
        selectTriggerRef.current?.click()
      }, 50)
    }
  }, [isEditing, field.type])

  const formatDisplayValue = () => {
    if (value === null || value === undefined || value === '') return null
    
    if (field.type === 'number-with-unit') {
      const numValue = Number(value)
      if (isNaN(numValue)) return value
      return `${numValue.toLocaleString()} ${field.unit || ''}`
    }
    
    if (field.type === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    return String(value)
  }

  const formatDateForInput = (dateValue: string): string => {
    if (!dateValue) return ''
    const date = new Date(dateValue)
    if (isNaN(date.getTime())) return dateValue
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onBlur(true, false) // Apply changes and move to next cell
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onBlur(false, true) // Undo changes and cancel editing
    } else if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
      onBlur(!e.shiftKey, false) // Apply changes and move to next/previous cell
    }
  }

  const handleKeyDownDisplay = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
        className={`h-full px-4 flex items-center cursor-text hover:bg-muted transition-colors ${
          error ? 'bg-red-50 dark:bg-red-950/30' : ''
        } ${isMissing && !error ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`}
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
            error ? 'text-red-700 dark:text-red-400' : 
            isMissing && !error && isEmpty ? 'text-amber-600 dark:text-amber-400 italic' :
            isEmpty && field.required ? 'text-amber-600 dark:text-amber-400 italic' :
            isEmpty ? 'text-muted-foreground italic' :
            isMissing && !error ? 'text-amber-900 dark:text-amber-300' : 
            'text-foreground'
          }`}>
            {displayValue || (placeholder ? placeholder : <span className="text-muted-foreground">—</span>)}
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
  if (field.type === 'text' || field.type === 'number') {
    const inputType = field.type === 'number' ? 'number' : 'text'
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

  if (field.type === 'number-with-unit') {
    const placeholder = getEditPlaceholder(field)
    return (
      <div className="h-full px-4 flex items-center gap-2">
        <Input
          ref={inputRef}
          type="number"
          value={value || ''}
          placeholder={placeholder || undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className={`h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 flex-1 ${
            error ? 'text-red-700' : ''
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${field.id}-error` : undefined}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <span className="text-sm text-muted-foreground shrink-0" style={{ fontFamily: "Inter, sans-serif" }}>
          {field.unit || ''}
        </span>
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
            onBlur(false, false) // Apply changes, don't move to next
          }}
        >
          <SelectTrigger
            ref={selectTriggerRef}
            className="h-8 text-sm border-0 bg-transparent focus:ring-0 focus:ring-offset-0 px-0 shadow-none"
            onKeyDown={handleKeyDown}
            style={{ fontFamily: "Inter, sans-serif" }}
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
        {error && (
          <span id={`${field.id}-error`} className="sr-only">
            {error}
          </span>
        )}
      </div>
    )
  }

  if (field.type === 'radio' && field.radioOptions) {
    return (
      <div className="h-full px-4 flex items-center">
        <RadioGroup
          value={value || ''}
          onValueChange={(newValue) => {
            onChange(newValue)
            // Auto-blur after selection for better UX
            setTimeout(() => onBlur(true, false), 100) // Apply changes and move to next
          }}
          className="flex flex-row gap-4"
        >
          {field.radioOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={option.value}
                id={`${field.id}-${option.value}`}
                className="h-4 w-4"
              />
              <Label
                htmlFor={`${field.id}-${option.value}`}
                className="text-sm font-normal text-foreground cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {error && (
          <span id={`${field.id}-error`} className="sr-only">
            {error}
          </span>
        )}
      </div>
    )
  }

  if (field.type === 'boolean') {
    return (
      <div className="h-full px-4 flex items-center">
        <RadioGroup
          value={value ? 'yes' : 'no'}
          onValueChange={(newValue) => {
            onChange(newValue === 'yes')
            setTimeout(() => onBlur(true, false), 100) // Apply changes and move to next
          }}
          className="flex flex-row gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id={`${field.id}-yes`} className="h-4 w-4" />
            <Label
              htmlFor={`${field.id}-yes`}
              className="text-sm font-normal text-foreground cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Yes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id={`${field.id}-no`} className="h-4 w-4" />
            <Label
              htmlFor={`${field.id}-no`}
              className="text-sm font-normal text-foreground cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              No
            </Label>
          </div>
        </RadioGroup>
        {error && (
          <span id={`${field.id}-error`} className="sr-only">
            {error}
          </span>
        )}
      </div>
    )
  }

  return null
})

