export type DocumentStatus = "awaiting-signature" | "signed" | "expired" | "cancelled"

export interface Document {
  id: string
  name: string
  type: string
  status: DocumentStatus
  sentDate?: Date
  signedDate?: Date
  expiresAt?: Date
}

export interface ESignatureData {
  documents: Document[]
  sentDate: Date | null
  reminderEmail: string
  reminderCount: number
  lastReminderSent: Date | null
}
