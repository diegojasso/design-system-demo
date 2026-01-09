"use client"

import * as React from "react"
import { Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportLoadingScreenProps {
  clientName?: string
  source?: "ezlynx" | "other"
  onComplete?: () => void
}

export function ImportLoadingScreen({
  clientName = "Sally",
  source = "ezlynx",
  onComplete,
}: ImportLoadingScreenProps) {
  const [status, setStatus] = React.useState("Connecting to Ezlynx...")
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    const simulateImport = async () => {
      // Step 1: Connect
      await delay(500)
      setStatus("Connecting to Ezlynx...")

      // Step 2: Fetch
      await delay(800)
      setStatus("Fetching quote data...")

      // Step 3: Check records
      await delay(1000)
      setStatus(`Checking ${clientName}'s records...`)

      // Step 4: Import
      await delay(700)
      setStatus("Importing quote...")

      // Complete
      await delay(300)
      setIsComplete(true)
      onComplete?.()
    }

    simulateImport()
  }, [clientName, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="mb-4">
          <span
            className="text-4xl font-semibold leading-none tracking-tight text-foreground"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            novo
          </span>
        </div>

        {/* 3D Cube Icon - Using SVG for better control */}
        <div className="mb-4">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            className="animate-pulse"
          >
            {/* Isometric cube */}
            {/* Top face (black) */}
            <polygon
              points="32,8 48,20 32,32 16,20"
              fill="#000000"
              className="dark:fill-white"
            />
            {/* Right face (green) */}
            <polygon
              points="48,20 48,44 32,56 32,32"
              fill="#22c55e"
            />
            {/* Left face (darker green) */}
            <polygon
              points="16,20 32,32 32,56 16,44"
              fill="#16a34a"
            />
          </svg>
        </div>

        {/* Status Message */}
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-lg font-medium text-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Importing quote from Ezlynx
          </p>
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {status}
          </p>
        </div>

        {/* Banner/Toast at bottom */}
        <div className="fixed bottom-6 left-6">
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-sm dark:border-green-800 dark:bg-green-950">
            <RefreshCw className="h-4 w-4 animate-spin text-green-600 dark:text-green-400" />
            <span
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are checking {clientName}'s records...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
