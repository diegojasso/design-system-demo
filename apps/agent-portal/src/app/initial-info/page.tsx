"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { track, events } from "@novo/analytics"

import { useQuote } from "@/app/quote-context"
import type { ApplicationPrefillViewModels } from "@/shared/application-prefill-vm"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@novo/ui"

type PrefillApiResponse = {
  quoteId: string
  applicationId: string
  replaceLocalDraft: boolean
  viewModels: ApplicationPrefillViewModels
}

function getEncodedPayloadFromLocation(): string {
  const search = window.location.search.startsWith("?")
    ? window.location.search.slice(1)
    : window.location.search

  // QuoteProvider may add `quote=<id>`; the encoded payload is always the first segment.
  return search.split("&")[0] ?? ""
}

export default function InitialInfoPage() {
  const router = useRouter()
  const { prefillFromApplication, quoteId: currentDraftId } = useQuote()
  const [error, setError] = React.useState<{ message: string; canRetry: boolean } | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const hasAutoRun = React.useRef(false)

  const run = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    track(events.portalPrefillEvents.initialLoadStarted, {
      hasCurrentDraftId: Boolean(currentDraftId),
    })

    const encodedPayload = getEncodedPayloadFromLocation()
    if (!encodedPayload) {
      track(events.portalPrefillEvents.initialLoadFailed, { code: "MISSING_PAYLOAD" })
      setError({ message: "Missing encoded payload.", canRetry: false })
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/application-prefill", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          encodedPayload,
          currentDraftId: currentDraftId ?? undefined,
        }),
      })

      if (!res.ok) {
        let body: any = null
        try {
          body = await res.json()
        } catch {
          // ignore
        }

        const code = body?.code ?? "UNKNOWN"
        if (res.status === 403) {
          track(events.portalPrefillEvents.initialLoadAccessDenied, { code })
          setError({ message: body?.message ?? "Access denied.", canRetry: false })
        } else {
          track(events.portalPrefillEvents.initialLoadFailed, { code })
          setError({ message: body?.message ?? "Failed to load application.", canRetry: true })
        }
        setIsLoading(false)
        return
      }

      const data = (await res.json()) as PrefillApiResponse
      await prefillFromApplication({
        quoteId: data.quoteId,
        viewModels: data.viewModels,
      })

      track(events.portalPrefillEvents.initialLoadSucceeded, {})
      router.replace(`/?quote=${encodeURIComponent(data.quoteId)}`)
    } catch {
      track(events.portalPrefillEvents.initialLoadFailed, { code: "NETWORK_ERROR" })
      setError({ message: "Failed to load application.", canRetry: true })
      setIsLoading(false)
    }
  }, [currentDraftId, prefillFromApplication, router])

  React.useEffect(() => {
    if (hasAutoRun.current) return
    hasAutoRun.current = true
    run()
  }, [run])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background px-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Loading application…</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Please wait while we prefill your quote.
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background px-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Unable to load</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground">{error.message}</div>
            <div className="flex gap-2">
              {error.canRetry ? <Button onClick={run}>Retry</Button> : null}
              <Button variant="outline" onClick={() => router.replace("/")}>
                Go to quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}

