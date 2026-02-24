import { useCallback, useEffect, useRef, useState } from "react"

export type ActiveGridCell = {
  rowIndex: number
  colIndex: number
} | null

interface UseGridNavigationProps {
  rowCount: number
  colCount: number
  isCellDisabled?: (rowIndex: number, colIndex: number) => boolean
}

const getCellId = (rowIndex: number, colIndex: number) => `row-${rowIndex}-col-${colIndex}`

export function useGridNavigation({
  rowCount,
  colCount,
  isCellDisabled,
}: UseGridNavigationProps) {
  const [activeCell, setActiveCell] = useState<ActiveGridCell>(null)
  const [editingCell, setEditingCell] = useState<ActiveGridCell>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const isDisabled = useCallback(
    (rowIndex: number, colIndex: number) => {
      return isCellDisabled ? isCellDisabled(rowIndex, colIndex) : false
    },
    [isCellDisabled]
  )

  const focusCellElement = useCallback(
    (rowIndex: number, colIndex: number) => {
      const cellElement = containerRef.current?.querySelector(
        `[data-cell-id="${getCellId(rowIndex, colIndex)}"]`
      ) as HTMLElement | null

      if (!cellElement) return

      const focusableElement = cellElement.querySelector('[data-cell-focus="true"]') as HTMLElement | null
      if (focusableElement) {
        setTimeout(() => {
          focusableElement.focus()
        }, 10)
      }

      cellElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      })
    },
    []
  )

  const moveToCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      const clampedRowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1))
      const clampedColIndex = Math.max(0, Math.min(colIndex, colCount - 1))

      if (isDisabled(clampedRowIndex, clampedColIndex)) return

      const nextCell: ActiveGridCell = {
        rowIndex: clampedRowIndex,
        colIndex: clampedColIndex,
      }

      setActiveCell(nextCell)
      setTimeout(() => {
        focusCellElement(clampedRowIndex, clampedColIndex)
      }, 10)
    },
    [rowCount, colCount, isDisabled, focusCellElement]
  )

  const moveDirectional = useCallback(
    (rowDelta: number, colDelta: number) => {
      if (!activeCell) return
      let rowIndex = activeCell.rowIndex + rowDelta
      let colIndex = activeCell.colIndex + colDelta

      while (rowIndex >= 0 && rowIndex < rowCount && colIndex >= 0 && colIndex < colCount) {
        if (!isDisabled(rowIndex, colIndex)) {
          moveToCell(rowIndex, colIndex)
          return
        }
        rowIndex += rowDelta
        colIndex += colDelta
      }
    },
    [activeCell, rowCount, colCount, isDisabled, moveToCell]
  )

  const moveNext = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const startIndex = activeCell.rowIndex * colCount + activeCell.colIndex
    for (let index = startIndex + 1; index < rowCount * colCount; index += 1) {
      const rowIndex = Math.floor(index / colCount)
      const colIndex = index % colCount
      if (!isDisabled(rowIndex, colIndex)) {
        moveToCell(rowIndex, colIndex)
        return
      }
    }
  }, [activeCell, rowCount, colCount, isDisabled, moveToCell])

  const movePrevious = useCallback(() => {
    if (!activeCell) {
      moveToCell(0, 0)
      return
    }

    const startIndex = activeCell.rowIndex * colCount + activeCell.colIndex
    for (let index = startIndex - 1; index >= 0; index -= 1) {
      const rowIndex = Math.floor(index / colCount)
      const colIndex = index % colCount
      if (!isDisabled(rowIndex, colIndex)) {
        moveToCell(rowIndex, colIndex)
        return
      }
    }
  }, [activeCell, rowCount, colCount, isDisabled, moveToCell])

  const startEditing = useCallback(() => {
    if (!activeCell) return
    setEditingCell(activeCell)

    setTimeout(() => {
      const cellElement = containerRef.current?.querySelector(
        `[data-cell-id="${getCellId(activeCell.rowIndex, activeCell.colIndex)}"]`
      ) as HTMLElement | null

      if (!cellElement) return

      const selectTrigger = cellElement.querySelector('[data-slot="select-trigger"]') as HTMLElement | null
      if (selectTrigger) {
        selectTrigger.click()
        return
      }

      const input = cellElement.querySelector("input") as HTMLInputElement | null
      if (input) {
        input.focus()
        input.select()
        return
      }

      const switchButton = cellElement.querySelector('button[role="switch"]') as HTMLButtonElement | null
      if (switchButton) {
        switchButton.click()
      }
    }, 20)
  }, [activeCell])

  const stopEditing = useCallback(() => {
    setEditingCell(null)
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const container = containerRef.current
      const isWithinContainer = !!(container && target && container.contains(target))
      const isSelectContent = target.closest('[data-slot="select-content"]') !== null
      if (!isWithinContainer && !isSelectContent) {
        return
      }
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
      const isSelect = target.closest('[data-slot="select"]') !== null

      if (e.key === "Tab") {
        e.preventDefault()
        e.stopPropagation()

        if (editingCell) {
          stopEditing()
        }

        if (e.shiftKey) {
          movePrevious()
        } else {
          moveNext()
        }
        return
      }

      if (isInput || isSelect) return

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          moveDirectional(-1, 0)
          break
        case "ArrowDown":
          e.preventDefault()
          moveDirectional(1, 0)
          break
        case "ArrowLeft":
          e.preventDefault()
          moveDirectional(0, -1)
          break
        case "ArrowRight":
          e.preventDefault()
          moveDirectional(0, 1)
          break
        case "Enter":
          e.preventDefault()
          if (!editingCell) {
            startEditing()
          }
          break
        case "Escape":
          if (editingCell) {
            e.preventDefault()
            stopEditing()
          }
          break
      }
    },
    [editingCell, moveNext, movePrevious, moveDirectional, startEditing, stopEditing]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const container = containerRef.current
      if (!container || !target) return

      const isWithinContainer = container.contains(target)
      const isSelectContent = target.closest('[data-slot="select-content"]') !== null

      if (!isWithinContainer && !isSelectContent) {
        setEditingCell(null)
        setActiveCell(null)
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return {
    activeCell,
    editingCell,
    moveToCell,
    startEditing,
    stopEditing,
    containerRef,
  }
}
