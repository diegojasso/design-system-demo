"use client"

import * as React from "react"
import { Suspense } from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { QuotesList } from "@/app/components/quotes-list/quotes-list"
import { MOCK_QUOTES } from "@/app/components/quotes-list/mock-quotes"
import { useSearchParams } from "next/navigation"

function QuotesPageContent() {
  const searchParams = useSearchParams()

  // Get initial values from URL params
  const initialSearch = searchParams.get("search") || ""
  const initialStatus = searchParams.get("status") || "all"
  const initialDate = searchParams.get("date") || "last-7-days"
  const initialAgency = searchParams.get("agency") || "all"
  const initialAgent = searchParams.get("agent") || "all"
  const initialPage = parseInt(searchParams.get("page") || "1", 10)

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-auto bg-background pb-0 pt-[88px]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList className="gap-1.5">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-base leading-[1.5] text-muted-foreground hover:text-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className="text-base leading-[1.5] text-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Quotes
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Quote List */}
          <QuotesList
            quotes={MOCK_QUOTES}
            initialFilters={{
              status: initialStatus as any,
              createdDate: initialDate as any,
              agency: initialAgency,
              agent: initialAgent,
            }}
            initialSearch={initialSearch}
            initialPagination={{
              page: initialPage,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function QuotesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotesPageContent />
    </Suspense>
  )
}
