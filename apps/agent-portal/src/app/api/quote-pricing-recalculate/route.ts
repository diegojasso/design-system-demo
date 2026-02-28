import { NextResponse } from "next/server"
import { z } from "zod"
import { createApplicationApiClient } from "@novo/api-client"

import { getApplicationServiceConfig } from "@/server/config"
import { PortalConfigError, applicationServiceConfigErrorToPortalError } from "@/server/config/config-errors.server"
import { mapQuoteResponseToCoverageAndPricing } from "@/shared/application-prefill-vm"

const requestSchema = z.object({
  quoteId: z.string().min(1),
  coverage: z.record(z.unknown()),
  partner: z.string().min(1),
  source: z.enum(["agent", "consumer"]),
  participation_option: z.array(z.string().min(1)).min(1),
})

function extractApplicationId(value: unknown): string | null {
  if (typeof value !== "object" || value === null) return null
  const v = value as Record<string, unknown>
  const direct = v["applicationId"] ?? v["application_id"] ?? v["id"] ?? v["applicationID"]
  return typeof direct === "string" && direct.trim() ? direct : null
}

function getAxiosStatus(error: unknown): number | null {
  const anyErr = error as any
  const status = anyErr?.response?.status
  return typeof status === "number" ? status : null
}

function getAxiosCode(error: unknown): string | null {
  const anyErr = error as any
  const code = anyErr?.code
  return typeof code === "string" ? code : null
}

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

  const configResult = getApplicationServiceConfig()
  if (!configResult.ok) {
    const portalError = applicationServiceConfigErrorToPortalError(configResult.error)
    return NextResponse.json({ code: portalError.code, message: "Server configuration error." }, { status: 500 })
  }

  const client = createApplicationApiClient({
    baseUrl: configResult.value.endpoint.toString(),
    apiKey: configResult.value.apiKey,
    debugLogging: {
      enabled:
        process.env.APPLICATION_API_DEBUG_LOG === "1" ||
        process.env.APPLICATION_API_DEBUG_LOG === "true",
      level: (process.env.APPLICATION_API_DEBUG_LOG_LEVEL as any) ?? "basic",
      allowUnsafeBodyLogging:
        process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "1" ||
        process.env.APPLICATION_API_DEBUG_LOG_UNSAFE_BODY === "true",
    },
  })

  try {
    const { quoteId, partner, source, participation_option } = parsed.data

    // Coverage is validated above but intentionally not logged or forwarded yet (no upstream write-back in scope).
    const lookup = await client.getApplicationV2({ quoteId })
    const applicationId = extractApplicationId(lookup) ?? quoteId

    const quoteResponse = await client.calculateQuote({
      applicationId,
      partner,
      source,
      participationOption: participation_option,
    })

    const mapped = mapQuoteResponseToCoverageAndPricing(quoteResponse)
    if (!mapped.pricing) {
      return NextResponse.json(
        { code: "UPSTREAM_SCHEMA_MISMATCH", message: "Upstream quote response was unexpected." },
        { status: 500 },
      )
    }

    return NextResponse.json({ pricing: mapped.pricing }, { status: 200 })
  } catch (error) {
    if (error instanceof PortalConfigError) {
      return NextResponse.json({ code: error.code, message: "Server configuration error." }, { status: 500 })
    }

    const status = getAxiosStatus(error)
    const axiosCode = getAxiosCode(error)

    if (status === 401 || status === 403) {
      return NextResponse.json({ code: "ACCESS_DENIED", message: "Access denied." }, { status: 403 })
    }
    if (status === 429) {
      return NextResponse.json({ code: "RATE_LIMITED", message: "Rate limited. Please retry." }, { status: 429 })
    }

    if (status === null && (axiosCode === "ENOTFOUND" || axiosCode === "ECONNREFUSED" || axiosCode === "EAI_AGAIN")) {
      return NextResponse.json(
        { code: "UPSTREAM_UNREACHABLE", message: "Upstream service unreachable." },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { code: "UPSTREAM_ERROR", message: "Upstream pricing service error." },
      { status: 500 },
    )
  }
}

