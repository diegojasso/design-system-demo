"use client"

import * as React from "react"
import Link from "next/link"
import { LifeBuoy, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommandPaletteHint } from "../command-palette-hint"
import { FeedbackModal } from "./feedback-modal"
import { cn } from "@/lib/utils"

interface TopBarProps {
  className?: string
}

export function TopBar({ className }: TopBarProps) {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-border bg-background px-4",
          className
        )}
      >
        <div className="flex w-full items-center justify-between gap-4">
          {/* Left Section: Logo */}
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* Logo */}
            <Link
              href="/quotes"
              className="flex shrink-0 items-center"
              aria-label="Novo Home"
            >
              <svg
                width="70"
                height="16"
                viewBox="0 0 70 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-auto"
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
            </Link>

          </div>

          {/* Right Section: Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Feedback Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFeedbackOpen(true)}
              className="hidden gap-2 sm:flex"
            >
              <LifeBuoy className="h-4 w-4" />
              <span className="hidden md:inline">Feedback</span>
            </Button>

            {/* Command Palette */}
            <CommandPaletteHint variant="minimal" />

            {/* Help Center */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label="Help Center"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>

          </div>
        </div>
      </header>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  )
}
