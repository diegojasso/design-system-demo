import { useState, useCallback, useEffect, useRef } from "react"

export type ActiveCell = {
  vehicleIndex: number
  fieldIndex: number
} | null

interface UseKeyboardNavigationProps {
  vehicleCount: number
  fieldCount: number
  onCellChange?: (vehicleIndex: number, fieldIndex: number, value: any) => void
  onAddVehicle?: () => void
}

export function useKeyboardNavigation({
  vehicleCount,
  fieldCount,
  onCellChange,
  onAddVehicle,
}: UseKeyboardNavigationProps) {
  const [activeCell, setActiveCell] = useState<ActiveCell>(null)
  const [editingCell, setEditingCell] = useState<ActiveCell>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Move to a specific cell (navigation only - does NOT enter edit mode)
  const moveToCell = useCallback(
    (vehicleIndex: number, fieldIndex: number) => {
      // Clamp indices to valid ranges
      const clampedVehicleIndex = Math.max(0, Math.min(vehicleIndex, vehicleCount - 1))
      const clampedFieldIndex = Math.max(0, Math.min(fieldIndex, fieldCount - 1))

      const newCell: ActiveCell = {
        vehicleIndex: clampedVehicleIndex,
        fieldIndex: clampedFieldIndex,
      }

      setActiveCell(newCell)
      // Don't automatically enter edit mode - just move focus
      // Edit mode is only entered via Enter key or click

      // Scroll cell into view and focus it (with a small delay to ensure DOM is updated)
      setTimeout(() => {
        const cellElement = containerRef.current?.querySelector(
          `[data-cell-id="vehicle-${clampedVehicleIndex}-field-${clampedFieldIndex}"]`
        ) as HTMLElement

        if (cellElement) {
          // Focus the cell div so it can receive keyboard events
          // Look for the inner div with tabindex
          const focusableElement = cellElement.querySelector('div[tabindex]') as HTMLElement
          if (focusableElement) {
            // Use setTimeout to ensure DOM is ready and prevent focus conflicts
            setTimeout(() => {
              focusableElement.focus()
            }, 10)
          }
        }
      }, 10)
    },
    [vehicleCount, fieldCount]
  )

  // Navigation functions
  const moveNext = useCallback(() => {
    if (!activeCell) {
      // If no active cell, start at first cell
      if (vehicleCount > 0 && fieldCount > 0) {
        moveToCell(0, 0)
      }
      return
    }

    const { vehicleIndex, fieldIndex } = activeCell
    // Move down (next field), then right (next vehicle)
    if (fieldIndex < fieldCount - 1) {
      moveToCell(vehicleIndex, fieldIndex + 1)
    } else if (vehicleIndex < vehicleCount - 1) {
      moveToCell(vehicleIndex + 1, 0)
    }
  }, [activeCell, vehicleCount, fieldCount, moveToCell])

  const movePrevious = useCallback(() => {
    if (!activeCell) {
      // If no active cell, start at last cell
      if (vehicleCount > 0 && fieldCount > 0) {
        moveToCell(vehicleCount - 1, fieldCount - 1)
      }
      return
    }

    const { vehicleIndex, fieldIndex } = activeCell
    // Move up (previous field), then left (previous vehicle)
    if (fieldIndex > 0) {
      moveToCell(vehicleIndex, fieldIndex - 1)
    } else if (vehicleIndex > 0) {
      moveToCell(vehicleIndex - 1, fieldCount - 1)
    }
  }, [activeCell, vehicleCount, fieldCount, moveToCell])

  const moveUp = useCallback(() => {
    if (!activeCell) return
    const { vehicleIndex, fieldIndex } = activeCell
    if (fieldIndex > 0) {
      moveToCell(vehicleIndex, fieldIndex - 1)
    }
  }, [activeCell, fieldCount, moveToCell])

  const moveDown = useCallback(() => {
    if (!activeCell) return
    const { vehicleIndex, fieldIndex } = activeCell
    if (fieldIndex < fieldCount - 1) {
      moveToCell(vehicleIndex, fieldIndex + 1)
    }
  }, [activeCell, fieldCount, moveToCell])

  const moveLeft = useCallback(() => {
    if (!activeCell) return
    const { vehicleIndex, fieldIndex } = activeCell
    if (vehicleIndex > 0) {
      moveToCell(vehicleIndex - 1, fieldIndex)
    }
  }, [activeCell, vehicleCount, moveToCell])

  const moveRight = useCallback(() => {
    if (!activeCell) return
    const { vehicleIndex, fieldIndex } = activeCell
    if (vehicleIndex < vehicleCount - 1) {
      moveToCell(vehicleIndex + 1, fieldIndex)
    }
  }, [activeCell, vehicleCount, moveToCell])

  // Start editing current cell
  const startEditing = useCallback(() => {
    if (activeCell) {
      setEditingCell(activeCell)
    }
  }, [activeCell])

  // Stop editing
  const stopEditing = useCallback(() => {
    setEditingCell(null)
  }, [])

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't handle keys if user is typing in an input
      const target = e.target as HTMLElement
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
      const isSelect = target.closest('[data-slot="select"]') !== null
      
      // Handle Tab key for navigation (both in inputs and display mode)
      if (e.key === "Tab") {
        e.preventDefault()
        e.stopPropagation()
        
        if (isInput || isSelect) {
          // If in an input/select, stop editing first, then navigate
          if (editingCell) {
            stopEditing()
          }
          // Small delay to let blur/stopEditing complete, then navigate
          setTimeout(() => {
            if (e.shiftKey) {
              movePrevious()
            } else {
              moveNext()
            }
          }, 50)
        } else {
          // In display mode, navigate immediately
          // Blur any currently focused element first to prevent conflicts
          if (document.activeElement && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
          }
          // Small delay to ensure blur completes
          setTimeout(() => {
            if (e.shiftKey) {
              movePrevious()
            } else {
              moveNext()
            }
          }, 10)
        }
        return
      }
      
      if (isInput || isSelect) {
        // For other keys in inputs/selects, let them work normally
        return
      }

      switch (e.key) {

        case "ArrowUp":
          e.preventDefault()
          moveUp()
          break

        case "ArrowDown":
          e.preventDefault()
          moveDown()
          break

        case "ArrowLeft":
          e.preventDefault()
          moveLeft()
          break

        case "ArrowRight":
          e.preventDefault()
          moveRight()
          break

        case "Enter":
          if (!editingCell) {
            e.preventDefault()
            // Enter key is the only way to enter edit mode via keyboard
            startEditing()
          }
          // If already editing, let the input handle it (it will call onBlur which stops editing)
          break

        case "Escape":
          if (editingCell) {
            e.preventDefault()
            stopEditing()
          }
          break
      }

      // Handle Ctrl/Cmd + N to add new vehicle (only when not in input/select)
      if ((e.ctrlKey || e.metaKey) && e.key === "n" && !isInput && !isSelect) {
        e.preventDefault()
        if (onAddVehicle) {
          onAddVehicle()
        }
        return
      }
    },
    [editingCell, moveNext, movePrevious, moveUp, moveDown, moveLeft, moveRight, startEditing, stopEditing, onAddVehicle]
  )

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    activeCell,
    editingCell,
    moveToCell,
    startEditing,
    stopEditing,
    containerRef,
  }
}

