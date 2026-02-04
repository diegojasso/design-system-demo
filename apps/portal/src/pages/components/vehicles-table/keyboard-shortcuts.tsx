"use client"

import * as React from "react"
import { Kbd } from "@novo/ui"

export function KeyboardShortcuts() {
  return (
    <div className="mt-4 p-3 bg-muted rounded-md border border-border">
      <p
        className="text-xs font-medium text-muted-foreground mb-2"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Keyboard Shortcuts
      </p>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Navigate cells
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Tab</Kbd>
            <span className="text-muted-foreground">/</span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>←</Kbd>
            <Kbd>→</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Edit cell
          </span>
          <Kbd>Enter</Kbd>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Cancel editing
          </span>
          <Kbd>Esc</Kbd>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Add new vehicle
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-muted-foreground">/</span>
            <Kbd>⌘</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd>N</Kbd>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Toggle missing fields
          </span>
          <div className="flex items-center gap-1">
            <Kbd>Ctrl</Kbd>
            <span className="text-muted-foreground">/</span>
            <Kbd>⌘</Kbd>
            <span className="text-muted-foreground">+</span>
            <Kbd>M</Kbd>
          </div>
        </div>
      </div>
    </div>
  )
}

