"use client"

import * as React from "react"
import { Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/shared/utils"

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="mb-4">
          <svg
            width="70"
            height="16"
            viewBox="0 0 70 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-auto"
          >
            <path
              d="M69.3298 7.99496C69.3298 12.4105 65.7872 15.9899 61.4172 15.9899C57.0471 15.9899 53.5045 12.4105 53.5045 7.99496C53.5045 3.57946 57.0471 0 61.4172 0C65.7872 0 69.3298 3.57946 69.3298 7.99496ZM57.4608 7.99496C57.4608 10.2027 59.2321 11.9924 61.4172 11.9924C63.6022 11.9924 65.3735 10.2027 65.3735 7.99496C65.3735 5.78721 63.6022 3.99748 61.4172 3.99748C59.2321 3.99748 57.4608 5.78721 57.4608 7.99496Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.5587 0.00452292H51.5005V8.31626C51.5005 9.41643 51.0911 10.4764 50.3535 11.2857L47.7322 14.1621C46.6646 15.3335 45.1606 16 43.5846 16C42.009 15.9995 40.5055 15.3331 39.438 14.1621L36.8166 11.2864C36.0784 10.4766 35.6687 9.41601 35.6687 8.31513V0.00452292H39.6104V7.52455C39.6104 8.54647 40.0027 9.53486 40.6979 10.2772C42.2586 11.9437 44.9106 11.9437 46.4713 10.2772C47.1664 9.53486 47.5587 8.54647 47.5587 7.52455V0.00452292ZM36.4703 0.814125H38.7749V8.91919H36.4703V0.814125ZM48.3942 0.814125H50.6988V8.91919H48.3942V0.814125Z"
              fill="currentColor"
            />
            <path
              d="M33.6646 7.99496C33.6646 12.4105 30.122 15.9899 25.7519 15.9899C21.3819 15.9899 17.8393 12.4105 17.8393 7.99496C17.8393 3.57946 21.3819 0 25.7519 0C30.122 0 33.6646 3.57946 33.6646 7.99496ZM21.7956 7.99496C21.7956 10.2027 23.5669 11.9924 25.7519 11.9924C27.9369 11.9924 29.7083 10.2027 29.7083 7.99496C29.7083 5.78721 27.9369 3.99748 25.7519 3.99748C23.5669 3.99748 21.7956 5.78721 21.7956 7.99496Z"
              fill="currentColor"
            />
            <path
              d="M13.5078 2.34167C14.9917 3.84102 15.8253 5.87456 15.8253 7.99496H15.0302V7.08288H12.7256V7.99496H11.869C11.869 6.93476 11.4522 5.91799 10.7102 5.16831C9.96825 4.41864 8.96194 3.99748 7.91266 3.99748C6.86338 3.99748 5.85707 4.41864 5.11511 5.16831C4.37316 5.91799 3.95633 6.93476 3.95633 7.99496H3.10625V7.08288H0.801618V7.99496H0C0 5.87456 0.833654 3.84101 2.31757 2.34167C3.80148 0.842323 5.81409 0 7.91266 0C10.0112 0 12.0238 0.842324 13.5078 2.34167Z"
              fill="currentColor"
            />
            <path
              d="M0.801618 8.00104H0.000139886V15.996H3.95647V8.00104H3.10625V15.1906H0.801618V8.00104Z"
              fill="currentColor"
            />
            <path
              d="M12.7256 8.00104H11.8789V15.996L15.8352 15.996V8.00104H15.0302V15.1906H12.7256V8.00104Z"
              fill="currentColor"
            />
          </svg>
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
