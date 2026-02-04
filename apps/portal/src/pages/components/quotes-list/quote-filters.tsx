"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@novo/ui"
import type { QuoteFilters, Agency } from "./types"
import { AGENCIES } from "./types"
import type { QuoteStatus } from "@/pages/components/command-palette/quote-types"

interface QuoteFiltersProps {
  filters: QuoteFilters
  onFiltersChange: (filters: QuoteFilters) => void
  availableAgencies?: string[]
  availableAgents?: string[]
}

export function QuoteFiltersComponent({
  filters,
  onFiltersChange,
  availableAgencies,
  availableAgents,
}: QuoteFiltersProps) {
  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as QuoteFilters["status"],
    })
  }

  const handleDateChange = (value: string) => {
    onFiltersChange({
      ...filters,
      createdDate: value as QuoteFilters["createdDate"],
    })
  }

  const handleAgencyChange = (value: string) => {
    onFiltersChange({
      ...filters,
      agency: value as QuoteFilters["agency"],
    })
  }

  const handleAgentChange = (value: string) => {
    onFiltersChange({
      ...filters,
      agent: value as QuoteFilters["agent"],
    })
  }

  // Get unique agencies from available quotes or use all agencies
  const agencies = availableAgencies && availableAgencies.length > 0
    ? availableAgencies
    : AGENCIES

  // Get unique agents from available quotes
  const agents = availableAgents || []

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <Select value={filters.status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="sent">Sent</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      {/* Created Date Filter */}
      <Select value={filters.createdDate} onValueChange={handleDateChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Created Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="last-7-days">Last 7 days</SelectItem>
          <SelectItem value="last-30-days">Last 30 days</SelectItem>
          <SelectItem value="last-90-days">Last 90 days</SelectItem>
        </SelectContent>
      </Select>

      {/* Agency Filter */}
      <Select value={filters.agency} onValueChange={handleAgencyChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Agency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {agencies.map((agency) => (
            <SelectItem key={agency} value={agency}>
              {agency}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Agent Filter */}
      <Select value={filters.agent} onValueChange={handleAgentChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Agent" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {agents.map((agent) => (
            <SelectItem key={agent} value={agent}>
              {agent}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
