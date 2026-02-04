"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode
  rightColumn: React.ReactNode
  className?: string
}

export function TwoColumnLayout({
  leftColumn,
  rightColumn,
  className,
}: TwoColumnLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 lg:grid-cols-12",
        className
      )}
    >
      {/* Left Column - Action Required */}
      <div className="lg:col-span-5 space-y-6">
        {leftColumn}
      </div>

      {/* Right Column - Imported Info */}
      <div className="lg:col-span-7 space-y-6">
        {rightColumn}
      </div>
    </div>
  )
}
