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

interface EditableTableCellProps {
  value: any
  field: ColumnDef
  isEditing: boolean
  onFocus: () => void
  onBlur: (moveNext?: boolean) => void
  onChange: (value: any) => void
  onDoubleClick?: () => void
}

export function EditableTableCell({
  value,
  field,
  isEditing,
  onFocus,
  onBlur,
  onChange,
  onDoubleClick,
}: EditableTableCellProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Auto-focus input when editing starts
  React.useEffect(() => {
    if (isEditing && inputRef.current && field.type === 'text') {
      inputRef.current.focus()
      inputRef.current.select()
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
    // Tab navigation is handled by parent
    if (e.key === 'Tab') {
      // Let it bubble up to parent handler
      return
    }
  }

  // Render based on field type
  if (!isEditing) {
    // Display mode
    return (
      <div
        className="h-[44px] px-4 flex items-center cursor-text hover:bg-[#f9fafb] transition-colors"
        onDoubleClick={onDoubleClick}
        onClick={onFocus}
        onFocus={(e) => {
          // Handle focus from keyboard navigation
          e.currentTarget.focus()
          onFocus()
        }}
        tabIndex={0}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <span className="text-sm font-normal text-[#111827] w-full">
          {formatDisplayValue() || <span className="text-[#9ca3af]">—</span>}
        </span>
      </div>
    )
  }

  // Editing mode
  if (field.type === 'text') {
    return (
      <div className="h-[44px] px-4 flex items-center">
        <Input
          ref={inputRef}
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className="h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>
    )
  }

  if (field.type === 'date') {
    const dateValue = formatDateForInput(value || '')
    return (
      <div className="h-[44px] px-4 flex items-center">
        <Input
          ref={inputRef}
          type="date"
          value={dateValue}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className="h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>
    )
  }

  if (field.type === 'dropdown' && field.options) {
    return (
      <div className="h-[44px] px-4 flex items-center">
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
          <SelectTrigger className="h-8 w-full text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none">
            <SelectValue placeholder="Select..." />
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
      <div className="h-[44px] px-4 flex items-center">
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
  return (
    <div className="h-[44px] px-4 flex items-center">
      <Input
        ref={inputRef}
        type={field.type === 'number' ? 'number' : 'text'}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className="h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
    </div>
  )
}

