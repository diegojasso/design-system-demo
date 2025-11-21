import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuoteNavigation() {
  return (
    <div className="flex h-9 items-center justify-between">
      <Button
        variant="secondary"
        size="lg"
        disabled
        className="h-9 gap-2"
      >
        <ChevronLeft className="h-5 w-5" />
        ← Next
      </Button>
      <Button
        variant="default"
        size="lg"
        className="h-9 gap-2 bg-black text-white hover:bg-black/90"
      >
        Next →
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

