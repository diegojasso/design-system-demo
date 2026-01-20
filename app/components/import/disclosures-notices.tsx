import { AlertTriangle } from "lucide-react"

const DEFAULT_DISCLOSURES = [
  {
    id: "rideshare",
    text: "Novo doesn't currently cover vehicles used for ride-share.",
  },
  {
    id: "sr22",
    text: "We are unable to offer an SR-22.",
  },
]

export function DisclosuresNotices() {
  return (
    <section
      className="rounded-lg border border-amber-200/70 bg-amber-50/60 dark:border-amber-800/60 dark:bg-amber-950/40"
      aria-label="Disclosures and notices"
    >
      <div className="flex items-center gap-2 border-b border-amber-200/70 px-4 py-3 dark:border-amber-800/60">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <h3 className="text-sm font-semibold text-foreground">Disclosures / Notices</h3>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Disclose to client
        </p>
        <ul className="mt-2 space-y-2 text-sm text-foreground">
          {DEFAULT_DISCLOSURES.map((disclosure) => (
            <li key={disclosure.id} className="flex gap-2">
              <span className="text-muted-foreground">•</span>
              <span>{disclosure.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
