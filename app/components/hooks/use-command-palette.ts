"use client"

import { useState, useEffect, useMemo } from "react"
import { buildCommands, Command } from "../command-palette/commands"
import type { StepId } from "../quote-progress"

interface UseCommandPaletteProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
  onSaveDraft?: () => void
  onFindClient?: () => void
}

interface GroupedCommand {
  group: string
  commands: Command[]
}

interface UseCommandPaletteReturn {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  commands: GroupedCommand[]
}

export function useCommandPalette({
  currentStep,
  onStepChange,
  onSaveDraft,
  onFindClient,
}: UseCommandPaletteProps): UseCommandPaletteReturn {
  const [isOpen, setIsOpen] = useState(false)

  // Build commands based on context
  const allCommands = useMemo(
    () =>
      buildCommands({
        currentStep,
        onStepChange,
        onSaveDraft,
        onFindClient,
      }),
    [currentStep, onStepChange, onSaveDraft, onFindClient]
  )

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups = new Map<string, Command[]>()
    allCommands.forEach((cmd) => {
      if (!groups.has(cmd.group)) {
        groups.set(cmd.group, [])
      }
      groups.get(cmd.group)!.push(cmd)
    })
    return groups
  }, [allCommands])

  // Handle ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K on Mac, Ctrl+K on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }

      // Prevent default browser shortcuts when palette is open
      if (isOpen) {
        // Prevent ⌘S from triggering browser save
        if ((e.metaKey || e.ctrlKey) && e.key === "s") {
          e.preventDefault()
        }
        // Prevent ⌘F from triggering browser find
        if ((e.metaKey || e.ctrlKey) && e.key === "f") {
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Build command groups for rendering
  const commands = useMemo(() => {
    return Array.from(groupedCommands.entries()).map(([group, cmds]) => ({
      group,
      commands: cmds,
    }))
  }, [groupedCommands])

  return {
    isOpen,
    setIsOpen,
    commands,
  }
}
