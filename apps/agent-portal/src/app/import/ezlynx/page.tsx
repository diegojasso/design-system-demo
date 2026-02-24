"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ImportLoadingScreen } from "@/features/components/import/import-loading-screen"
import { useQuote } from "@/app/quote-context"
import { MOCK_EZLYNX_QUOTE } from "@/features/components/import/mock-ezlynx-data"

export default function ImportEzlynxPage() {
  const router = useRouter()
  const { importQuote } = useQuote()
  const [isImporting, setIsImporting] = React.useState(true)

  const handleImportComplete = React.useCallback(async () => {
    try {
      await importQuote({
        ...MOCK_EZLYNX_QUOTE,
        importSource: "ezlynx",
      })
      
      // Navigate to quote page - it will show import summary tab
      router.push("/?imported=true")
    } catch (error) {
      console.error("Failed to import quote:", error)
      // TODO: Show error message
    } finally {
      setIsImporting(false)
    }
  }, [importQuote, router])

  if (isImporting) {
    return (
      <ImportLoadingScreen
        clientName={MOCK_EZLYNX_QUOTE.clientInfo.firstName}
        source="ezlynx"
        onComplete={handleImportComplete}
      />
    )
  }

  return null
}
