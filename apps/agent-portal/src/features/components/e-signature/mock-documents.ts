import { Document } from "./types"

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    name: "Electronic Signature",
    type: "signature",
    status: "awaiting-signature",
    sentDate: new Date("2026-01-12"),
  },
  {
    id: "doc-2",
    name: "Application for Insurance",
    type: "application",
    status: "awaiting-signature",
    sentDate: new Date("2026-01-12"),
  },
  {
    id: "doc-3",
    name: "Uninsured motorist and underinsured motorist coverage offer form",
    type: "coverage-form",
    status: "awaiting-signature",
    sentDate: new Date("2026-01-12"),
  },
]
