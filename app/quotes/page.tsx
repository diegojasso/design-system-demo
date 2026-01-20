import { Suspense } from "react"
import { QuotesPageContent } from "./quotes-page-content"

export const dynamic = "force-dynamic"

export default function QuotesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotesPageContent />
    </Suspense>
  )
}
