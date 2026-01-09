"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { QuoteListItem } from "./types"
import { formatDate } from "./utils/format-quote-data"
import {
  getStatusColorClasses,
  getStatusLabel,
} from "./utils/quote-status"

interface QuotesTableProps {
  quotes: QuoteListItem[]
  onQuoteClick: (quoteId: string) => void
}

export function QuotesTable({ quotes, onQuoteClick }: QuotesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quote Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Agent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No quotes found.
              </TableCell>
            </TableRow>
          ) : (
            quotes.map((quote) => (
              <TableRow
                key={quote.id}
                onClick={() => onQuoteClick(quote.id)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                <TableCell>{quote.name}</TableCell>
                <TableCell>{quote.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      getStatusColorClasses(quote.status)
                    )}
                  >
                    {getStatusLabel(quote.status)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(quote.createdDate)}</TableCell>
                <TableCell>{quote.agency}</TableCell>
                <TableCell>{quote.agent}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
