import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QuoteHeader() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1
        className="text-[48px] font-semibold leading-none tracking-[-0.48px] text-[#0a0a0a]"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        New Quote
      </h1>
      <Button
        variant="default"
        size="lg"
        className="h-12 gap-2 bg-black text-white hover:bg-black/90 shrink-0"
      >
        <FileText className="h-5 w-5 shrink-0" />
        Save draft
      </Button>
    </div>
  )
}

