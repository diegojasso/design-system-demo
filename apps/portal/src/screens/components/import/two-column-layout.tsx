"use client"

import * as React from "react"
import { cn } from "@/shared/utils"

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
      {/* Left Column - Reference Information (33% on desktop) */}
      <div className="lg:col-span-4 space-y-6">
        {leftColumn}
      </div>

      {/* Right Column - Action Required (67% on desktop) */}
      <div className="lg:col-span-8 space-y-6">
        {rightColumn}
      </div>
    </div>
  )
}
