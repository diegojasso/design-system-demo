"use client"

import * as React from "react"
import { Download, FileText, Pencil, Check, X } from "lucide-react"
import { useQuote } from "@/app/contexts/quote-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ESignatureData, DocumentStatus } from "./types"
import { MOCK_DOCUMENTS } from "./mock-documents"

// Format date as "December 13, 2025"
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Get status badge variant based on status
function getStatusBadgeVariant(status: DocumentStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case "awaiting-signature":
      return "secondary"
    case "signed":
      return "default"
    case "expired":
    case "cancelled":
      return "outline"
    default:
      return "secondary"
  }
}

// Get status badge text
function getStatusBadgeText(status: DocumentStatus): string {
  switch (status) {
    case "awaiting-signature":
      return "Awaiting signature"
    case "signed":
      return "Signed"
    case "expired":
      return "Expired"
    case "cancelled":
      return "Cancelled"
    default:
      return "Unknown"
  }
}

export function ESignatureForm() {
  const { quoteData, updateESignature, saveQuote } = useQuote()
  const [isEditingEmail, setIsEditingEmail] = React.useState(false)
  const [emailValue, setEmailValue] = React.useState("")
  const [isDownloading, setIsDownloading] = React.useState(false)

  // Initialize e-signature data if not present
  React.useEffect(() => {
    if (!quoteData.eSignature) {
      const clientEmail = quoteData.clientInfo?.email || ""
      const initialESignature: ESignatureData = {
        documents: MOCK_DOCUMENTS,
        sentDate: new Date("2025-12-13"),
        reminderEmail: clientEmail,
        reminderCount: 0,
        lastReminderSent: null,
      }
      updateESignature(initialESignature)
    } else {
      // Update email if client email changed and reminder email is empty
      const clientEmail = quoteData.clientInfo?.email || ""
      if (clientEmail && !quoteData.eSignature.reminderEmail) {
        updateESignature({
          ...quoteData.eSignature,
          reminderEmail: clientEmail,
        })
      }
    }
  }, [quoteData.eSignature, quoteData.clientInfo?.email, updateESignature])

  // Initialize email value
  React.useEffect(() => {
    if (quoteData.eSignature?.reminderEmail) {
      setEmailValue(quoteData.eSignature.reminderEmail)
    } else if (quoteData.clientInfo?.email) {
      setEmailValue(quoteData.clientInfo.email)
    }
  }, [quoteData.eSignature?.reminderEmail, quoteData.clientInfo?.email])

  const eSignatureData = quoteData.eSignature

  if (!eSignatureData) {
    return null
  }

  const handleDownloadDocuments = async () => {
    setIsDownloading(true)
    try {
      // Mock download - simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Documents downloaded", {
        description: "All documents have been downloaded as a ZIP file",
        duration: 2000,
      })
    } catch (error) {
      toast.error("Download failed", {
        description: "Failed to download documents. Please try again.",
        duration: 3000,
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEmailEdit = () => {
    setIsEditingEmail(true)
  }

  const handleEmailSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailValue || !emailRegex.test(emailValue)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address",
        duration: 2000,
      })
      return
    }

    updateESignature({
      ...eSignatureData,
      reminderEmail: emailValue,
    })
    setIsEditingEmail(false)
    saveQuote().catch(console.error)
  }

  const handleEmailCancel = () => {
    setEmailValue(eSignatureData.reminderEmail || quoteData.clientInfo?.email || "")
    setIsEditingEmail(false)
  }

  const handleSendReminder = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailValue || !emailRegex.test(emailValue)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address",
        duration: 2000,
      })
      return
    }

    // Update email if changed
    if (emailValue !== eSignatureData.reminderEmail) {
      updateESignature({
        ...eSignatureData,
        reminderEmail: emailValue,
      })
    }

    // Update reminder count and last sent date
    updateESignature({
      ...eSignatureData,
      reminderEmail: emailValue,
      reminderCount: eSignatureData.reminderCount + 1,
      lastReminderSent: new Date(),
    })

    await saveQuote()

    toast.success("Reminder sent", {
      description: `Reminder email sent to ${emailValue}`,
      duration: 2000,
    })
  }

  return (
    <Card className="mb-8 w-full rounded-[12px] gap-0">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle
              className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              Signature
            </CardTitle>
            <CardDescription
              className="text-base font-normal leading-[1.5] text-muted-foreground"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              The client must sign the application to finalize the binding.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadDocuments}
            disabled={isDownloading}
            className="h-9 gap-2"
          >
            <Download className="h-4 w-4" />
            Download documents
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6">
        <div className="flex flex-col gap-6">
          {/* Sent On Date */}
          {eSignatureData.sentDate && (
            <div className="text-base leading-[1.5] text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              Sent on {formatDate(eSignatureData.sentDate)}
            </div>
          )}

          {/* Documents List */}
          <div className="flex flex-col gap-4">
            {eSignatureData.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div
                    className="text-base font-medium leading-[1.5] text-foreground truncate"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {document.name}
                  </div>
                </div>
                <Badge
                  variant={getStatusBadgeVariant(document.status)}
                  className="flex-shrink-0"
                >
                  {getStatusBadgeText(document.status)}
                </Badge>
              </div>
            ))}
          </div>

          {/* Send Reminder Section */}
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
            <div
              className="text-base font-semibold leading-[1.5] text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Send reminder
            </div>
            <div className="flex items-center gap-3">
              {isEditingEmail ? (
                <>
                  <Input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="h-10 flex-1 text-base"
                    style={{ fontFamily: "Inter, sans-serif" }}
                    placeholder="email@example.com"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEmailSave()
                      } else if (e.key === "Escape") {
                        handleEmailCancel()
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmailSave}
                    className="h-9 w-9"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmailCancel}
                    className="h-9 w-9"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div
                    className="flex-1 text-base leading-[1.5] text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {emailValue || "No email set"}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmailEdit}
                    className="h-9 w-9"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="default"
                size="lg"
                onClick={handleSendReminder}
                disabled={!emailValue || isEditingEmail}
                className="h-9"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
