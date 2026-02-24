"use client"

import * as React from "react"

interface UseAutoSaveOptions<T> {
  data: T
  saveFn: (data: T) => Promise<void>
  debounceMs?: number
  enabled?: boolean
  onSaveStart?: () => void
  onSaveSuccess?: () => void
  onSaveError?: (error: Error) => void
}

interface UseAutoSaveReturn {
  isSaving: boolean
  lastSaved: Date | null
  error: Error | null
  saveNow: () => Promise<void>
}

export function useAutoSave<T>({
  data,
  saveFn,
  debounceMs = 2000,
  enabled = true,
  onSaveStart,
  onSaveSuccess,
  onSaveError,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn {
  const [isSaving, setIsSaving] = React.useState(false)
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null)
  const [error, setError] = React.useState<Error | null>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const previousDataRef = React.useRef<T>(data)
  const isInitialMount = React.useRef(true)

  // Save function
  const performSave = React.useCallback(async () => {
    if (!enabled) return

    setIsSaving(true)
    setError(null)
    onSaveStart?.()

    try {
      await saveFn(data)
      setLastSaved(new Date())
      previousDataRef.current = data
      onSaveSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to save")
      setError(error)
      onSaveError?.(error)
    } finally {
      setIsSaving(false)
    }
  }, [data, saveFn, enabled, onSaveStart, onSaveSuccess, onSaveError])

  // Debounced save
  const debouncedSave = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      performSave()
    }, debounceMs)
  }, [performSave, debounceMs])

  // Check if data has changed
  const hasDataChanged = React.useCallback((prev: T, current: T): boolean => {
    return JSON.stringify(prev) !== JSON.stringify(current)
  }, [])

  // Auto-save on data change
  React.useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousDataRef.current = data
      return
    }

    // Only save if data has actually changed
    if (!hasDataChanged(previousDataRef.current, data)) {
      return
    }

    debouncedSave()

    // Cleanup timeout on unmount or data change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [data, debouncedSave, hasDataChanged])

  // Save immediately (for manual triggers or before navigation)
  const saveNow = React.useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    await performSave()
  }, [performSave])

  // Save before unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      // Optionally save on unmount if there are unsaved changes
      // This could be too aggressive, so we'll skip it for now
    }
  }, [])

  return {
    isSaving,
    lastSaved,
    error,
    saveNow,
  }
}
