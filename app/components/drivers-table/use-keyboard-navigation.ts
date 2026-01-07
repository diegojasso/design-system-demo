import { useState, useCallback, useEffect, useRef } from "react"

export type ActiveCell = {
  driverIndex: number
  fieldIndex: number
} | null

interface UseKeyboardNavigationProps {
  driverCount: number
  fieldCount: number
  onCellChange?: (driverIndex: number, fieldIndex: number, value: any) => void
  onAddDriver?: () => void
}

export function useKeyboardNavigation({
  driverCount,
  fieldCount,
  onCellChange,
  onAddDriver,
}: UseKeyboardNavigationProps) {
  const [activeCell, setActiveCell] = useState<ActiveCell>(null)
  const [editingCell, setEditingCell] = useState<ActiveCell>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Move to a specific cell (navigation only - does NOT enter edit mode)
  const moveToCell = useCallback(
    (driverIndex: number, fieldIndex: number) => {
      // Clamp indices to valid ranges
      const clampedDriverIndex = Math.max(0, Math.min(driverIndex, driverCount - 1))
      const clampedFieldIndex = Math.max(0, Math.min(fieldIndex, fieldCount - 1))

      const newCell: ActiveCell = {
        driverIndex: clampedDriverIndex,
        fieldIndex: clampedFieldIndex,
      }

      setActiveCell(newCell)
      // Don't automatically enter edit mode - just move focus
      // Edit mode is only entered via Enter key or click

      // Scroll cell into view and focus it (with a small delay to ensure DOM is updated)
      setTimeout(() => {
        const cellElement = containerRef.current?.querySelector(
          `[data-cell-id="driver-${clampedDriverIndex}-field-${clampedFieldIndex}"]`
        ) as HTMLElement

        if (cellElement) {
          // Focus the cell div so it can receive keyboard events
          // Look for the inner div with tabindex
          const focusableElement = cellElement.querySelector('div[tabindex]') as HTMLElement
          if (focusableElement) {
            // Use setTimeout to ensure DOM is ready and prevent focus conflicts
            setTimeout(() => {
              // Only focus if this is still the active cell
              if (activeCell?.driverIndex === clampedDriverIndex && 
                  activeCell?.fieldIndex === clampedFieldIndex) {
                focusableElement.focus()
              }
            }, 20)
          }
          
          cellElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
          })
        }
      }, 10)
    },
    [driverCount, fieldCount]
  )

  // Move to next cell (right, then down)
  const moveNext = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (fieldIndex < fieldCount - 1) {
      // Move right
      moveToCell(driverIndex, fieldIndex + 1)
    } else if (driverIndex < driverCount - 1) {
      // Move to next driver, first field
      moveToCell(driverIndex + 1, 0)
    }
  }, [activeCell, driverCount, fieldCount, moveToCell])

  // Move to previous cell (left, then up)
  const movePrevious = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (fieldIndex > 0) {
      // Move left
      moveToCell(driverIndex, fieldIndex - 1)
    } else if (driverIndex > 0) {
      // Move to previous driver, last field
      moveToCell(driverIndex - 1, fieldCount - 1)
    }
  }, [activeCell, driverCount, fieldCount, moveToCell])

  // Move up (previous field - vertical movement in column layout)
  const moveUp = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (fieldIndex > 0) {
      moveToCell(driverIndex, fieldIndex - 1)
    }
  }, [activeCell, moveToCell])

  // Move down (next field - vertical movement in column layout)
  const moveDown = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (fieldIndex < fieldCount - 1) {
      moveToCell(driverIndex, fieldIndex + 1)
    }
  }, [activeCell, fieldCount, moveToCell])

  // Move left (previous driver - horizontal movement in column layout)
  const moveLeft = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (driverIndex > 0) {
      moveToCell(driverIndex - 1, fieldIndex)
    }
  }, [activeCell, moveToCell])

  // Move right (next driver - horizontal movement in column layout)
  const moveRight = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const { driverIndex, fieldIndex } = activeCell
    if (driverIndex < driverCount - 1) {
      moveToCell(driverIndex + 1, fieldIndex)
    }
  }, [activeCell, driverCount, moveToCell])

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
      
      // Handle Ctrl/Cmd + N to add new driver (only when not in input/select)
      if ((e.ctrlKey || e.metaKey) && e.key === "n" && !isInput && !isSelect) {
        e.preventDefault()
        if (onAddDriver) {
          onAddDriver()
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
    },
    [editingCell, moveNext, movePrevious, moveUp, moveDown, moveLeft, moveRight, startEditing, stopEditing, onAddDriver]
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

