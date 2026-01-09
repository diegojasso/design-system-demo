import type { QuoteListItem } from "./types"
import { AGENCIES } from "./types"

// Generate mock quotes with realistic data
const AGENTS = [
  "Aspen L",
  "Jakob D",
  "Maren C",
  "Blake L",
  "Sarah M",
  "Michael R",
  "Emily T",
  "David K",
  "Jessica W",
  "Ryan P",
]

const FIRST_NAMES = [
  "Sally",
  "Esther",
  "Theresa",
  "Darrell",
  "John",
  "Jane",
  "Robert",
  "Maria",
  "James",
  "Patricia",
  "Michael",
  "Jennifer",
  "William",
  "Linda",
  "David",
  "Elizabeth",
]

const LAST_NAMES = [
  "Gomez",
  "Howard",
  "Webb",
  "Steward",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
]

const EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "example.com",
]

// Generate random date within last 90 days
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

// Generate quote number from ID (format: KBD78E7744)
function generateQuoteNumber(id: string, index: number): string {
  // Create format like "KBD78E7744" (alphanumeric, 10 chars)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789"
  let result = ""
  
  // Use index and timestamp to generate consistent but unique numbers
  const seed = id.charCodeAt(0) + index + Date.now()
  for (let i = 0; i < 10; i++) {
    const charIndex = (seed + i * 7) % chars.length
    result += chars[charIndex]
  }
  
  return result
}

// Generate mock quotes
function generateMockQuotes(count: number): QuoteListItem[] {
  const quotes: QuoteListItem[] = []
  const now = new Date()
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)

  const statuses: Array<QuoteListItem["status"]> = [
    "draft",
    "pending",
    "sent",
    "accepted",
    "rejected",
  ]

  for (let i = 0; i < count; i++) {
    const firstName =
      FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const emailDomain =
      EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`
    const id = `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`
    const quoteNumber = generateQuoteNumber(id, i)
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const agency = AGENCIES[Math.floor(Math.random() * AGENCIES.length)]
    const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)]
    const createdDate = randomDate(ninetyDaysAgo, now)

    quotes.push({
      id,
      quoteNumber,
      name: `${firstName} ${lastName}`,
      email,
      status,
      createdDate,
      agency,
      agent,
    })
  }

  return quotes
}

// Generate 2000 mock quotes
export const MOCK_QUOTES: QuoteListItem[] = generateMockQuotes(2000)
