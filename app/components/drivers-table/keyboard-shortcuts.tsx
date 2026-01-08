"use client"

import * as React from "react"
import { Kbd } from "@/components/ui/kbd"

export function KeyboardShortcuts() {
  return (
    <div className="mt-4 p-3 bg-[#f9fafb] rounded-md border border-[#e5e7eb]">
      <p
        className="text-xs font-medium text-[#6b7280] mb-2"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Keyboard Shortcuts
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#111827]" style={{ fontFamily: "Inter, sans-serif" }}>
            Navigate cells
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Tab</Kbd>
            <span className="text-[#6b7280]">/</span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#111827]" style={{ fontFamily: "Inter, sans-serif" }}>
            Edit cell
          </span>
          <Kbd>Enter</Kbd>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#111827]" style={{ fontFamily: "Inter, sans-serif" }}>
            Cancel editing
          </span>
          <Kbd>Esc</Kbd>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#111827]" style={{ fontFamily: "Inter, sans-serif" }}>
            Add new driver
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-[#6b7280]">/</span>
            <Kbd>⌘</Kbd>
            <span className="text-[#6b7280]">+</span>
            <Kbd>N</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#111827]" style={{ fontFamily: "Inter, sans-serif" }}>
            Toggle missing fields
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-[#6b7280]">/</span>
            <Kbd>⌘</Kbd>
            <span className="text-[#6b7280]">+</span>
            <Kbd>M</Kbd>
          </div>
        </div>
      </div>
    </div>
  )
}

