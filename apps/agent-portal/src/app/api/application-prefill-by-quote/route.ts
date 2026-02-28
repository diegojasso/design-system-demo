import { NextResponse } from "next/server"
import { z } from "zod"

import { PortalConfigError } from "@/server/config/config-errors.server"
import { loadApplicationPrefillByQuoteId } from "@/server/loaders/application-prefill-loader.server"

const requestSchema = z.object({
  quoteId: z.string().min(1),
  currentDraftId: z.string().min(1).optional(),
})

export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ code: "BAD_REQUEST", message: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ code: "BAD_REQUEST", message: "Invalid request." }, { status: 400 })
  }

  try {
    const result = await loadApplicationPrefillByQuoteId(parsed.data)
    if (!result.ok) {
      return NextResponse.json({ code: result.error.code, message: result.error.message }, { status: result.error.status })
    }

    return NextResponse.json(result.value, { status: 200 })
  } catch (error) {
    if (error instanceof PortalConfigError) {
      return NextResponse.json({ code: error.code, message: "Server configuration error." }, { status: 500 })
    }

    return NextResponse.json({ code: "INTERNAL_ERROR", message: "Unexpected error." }, { status: 500 })
  }
}

