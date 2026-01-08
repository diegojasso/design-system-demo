import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function QuoteHeader() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1
        className="text-[48px] font-semibold leading-none tracking-[-0.48px] text-foreground"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        New Quote
      </h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button
          variant="default"
          size="lg"
          className="h-12 gap-2 shrink-0"
        >
          <FileText className="h-5 w-5 shrink-0" />
          Save draft
        </Button>
      </div>
    </div>
  )
}

