"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { QuoteSearch } from "./quote-search"
import { QuoteFiltersComponent } from "./quote-filters"
import { QuotesTable } from "./quotes-table"
import type {
  QuoteListItem,
  QuoteFilters,
  PaginationState,
} from "./types"
import { applySearchAndFilters } from "./utils/filter-quotes"

interface QuotesListProps {
  quotes: QuoteListItem[]
  initialFilters?: QuoteFilters
  initialSearch?: string
  initialPagination?: Partial<PaginationState>
}

const DEFAULT_FILTERS: QuoteFilters = {
  status: "all",
  createdDate: "last-7-days",
  agency: "all",
  agent: "all",
}

const DEFAULT_PAGE_SIZE = 16

export function QuotesList({
  quotes,
  initialFilters,
  initialSearch = "",
  initialPagination,
}: QuotesListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = React.useState(initialSearch)
  const [filters, setFilters] = React.useState<QuoteFilters>(
    initialFilters || DEFAULT_FILTERS
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    page: initialPagination?.page || 1,
    pageSize: initialPagination?.pageSize || DEFAULT_PAGE_SIZE,
    total: initialPagination?.total || quotes.length,
  })

  // Sync initialFilters prop to internal state when URL changes
  React.useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters)
    }
  }, [initialFilters?.status, initialFilters?.createdDate, initialFilters?.agency, initialFilters?.agent])

  // Sync initialSearch prop to internal state when URL changes
  React.useEffect(() => {
    setSearchQuery(initialSearch)
  }, [initialSearch])

  // Sync initialPagination prop to internal state when URL changes
  React.useEffect(() => {
    if (initialPagination?.page) {
      setPagination((prev) => ({
        ...prev,
        page: initialPagination.page!,
      }))
    }
  }, [initialPagination?.page])

  // Update URL params when filters/search/pagination change
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    // Update search
    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    // Update filters
    if (filters.status !== "all") {
      params.set("status", filters.status)
    } else {
      params.delete("status")
    }

    if (filters.createdDate !== DEFAULT_FILTERS.createdDate) {
      params.set("date", filters.createdDate)
    } else {
      params.delete("date")
    }

    if (filters.agency !== "all") {
      params.set("agency", filters.agency)
    } else {
      params.delete("agency")
    }

    if (filters.agent !== "all") {
      params.set("agent", filters.agent)
    } else {
      params.delete("agent")
    }

    // Update pagination
    if (pagination.page > 1) {
      params.set("page", pagination.page.toString())
    } else {
      params.delete("page")
    }

    // Update URL without causing a navigation
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`
    window.history.replaceState({}, "", newUrl)
  }, [searchQuery, filters, pagination.page, pathname, searchParams])

  // Apply search and filters
  const filteredQuotes = React.useMemo(() => {
    return applySearchAndFilters(quotes, searchQuery, filters)
  }, [quotes, searchQuery, filters])

  // Update total when filters/search change
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredQuotes.length,
      page: 1, // Reset to first page when filters change
    }))
  }, [filteredQuotes.length])

  // Get paginated quotes
  const paginatedQuotes = React.useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return filteredQuotes.slice(start, end)
  }, [filteredQuotes, pagination.page, pagination.pageSize])

  // Get unique agencies and agents from filtered quotes
  const availableAgencies = React.useMemo(() => {
    const agencies = new Set(filteredQuotes.map((q) => q.agency))
    return Array.from(agencies).sort()
  }, [filteredQuotes])

  const availableAgents = React.useMemo(() => {
    const agents = new Set(filteredQuotes.map((q) => q.agent))
    return Array.from(agents).sort()
  }, [filteredQuotes])

  const totalPages = Math.ceil(pagination.total / pagination.pageSize)
  const startIndex = (pagination.page - 1) * pagination.pageSize + 1
  const endIndex = Math.min(
    pagination.page * pagination.pageSize,
    pagination.total
  )

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePageSizeChange = (newPageSize: string) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: parseInt(newPageSize),
      page: 1, // Reset to first page
    }))
  }

  const handleQuoteClick = (quoteId: string) => {
    // Navigate to quote detail page
    // For now, use current pattern: /?quote=[quoteId]
    // TODO: Update to /quotes/[quoteId] when routing is updated
    router.push(`/?quote=${quoteId}`)
  }

  const handleStartQuote = () => {
    router.push("/")
  }

  // Generate pagination items
  const getPaginationItems = () => {
    const items: React.ReactNode[] = []
    const currentPage = pagination.page
    const total = totalPages

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(i)
              }}
              isActive={i === currentPage}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(1)
            }}
            isActive={1 === currentPage}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(total - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(i)
              }}
              isActive={i === currentPage}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < total - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show last page
      items.push(
        <PaginationItem key={total}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(total)
            }}
            isActive={total === currentPage}
            className="cursor-pointer"
          >
            {total}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Start Quote Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quotes</h1>
        <Button onClick={handleStartQuote} className="bg-green-600 hover:bg-green-700">
          Start Quote
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <QuoteSearch value={searchQuery} onChange={setSearchQuery} />
        <QuoteFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          availableAgencies={availableAgencies}
          availableAgents={availableAgents}
        />
      </div>

      {/* Table */}
      <QuotesTable quotes={paginatedQuotes} onQuoteClick={handleQuoteClick} />

      {/* Pagination */}
      {pagination.total > 0 && (
        <div className="flex items-center justify-between">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (pagination.page > 1) {
                      handlePageChange(pagination.page - 1)
                    }
                  }}
                  className={
                    pagination.page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {getPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (pagination.page < totalPages) {
                      handlePageChange(pagination.page + 1)
                    }
                  }}
                  className={
                    pagination.page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex items-center gap-2" style={{ width: "400px" }}>
            <span className="text-sm text-muted-foreground" style={{ width: "fit-content" }}>Rows per page:</span>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="32">32</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {startIndex}-{endIndex} of {pagination.total}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
