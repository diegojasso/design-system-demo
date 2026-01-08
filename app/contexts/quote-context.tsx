"use client"

import * as React from "react"
import { toast } from "sonner"
import { Driver } from "@/app/components/drivers-table/types"
import { Vehicle } from "@/app/components/vehicles-table/types"

// ClientInfoFormValues type (we'll import the actual type later)
export type ClientInfoFormValues = {
  firstName: string
  lastName: string
  dateOfBirth: Date
  driversLicense?: string
  driversLicenseState?: string
  email: string
  phone: string
  address: string
}

export type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "review"

export interface QuoteData {
  id?: string
  clientInfo?: ClientInfoFormValues
  drivers?: Driver[]
  vehicles?: Vehicle[]
  currentStep?: StepId
  lastSaved?: Date
  isDirty?: boolean
}

interface StoredQuote {
  id: string
  version: number
  createdAt: string
  lastSaved: string
  currentStep: StepId
  data: {
    clientInfo?: Omit<ClientInfoFormValues, 'dateOfBirth'> & { dateOfBirth: string | Date }
    drivers?: Driver[]
    vehicles?: Vehicle[]
  }
}

interface QuoteContextValue {
  quoteData: QuoteData
  updateClientInfo: (data: ClientInfoFormValues) => void
  updateDrivers: (drivers: Driver[]) => void
  updateVehicles: (vehicles: Vehicle[]) => void
  setCurrentStep: (step: StepId) => Promise<void>
  saveQuote: () => Promise<void>
  retrySave: () => Promise<void>
  loadQuote: (quoteId: string) => Promise<void>
  createNewQuote: () => void
  isSaving: boolean
  lastSaved: Date | null
  saveError: Error | null
  quoteId: string | null
}

const QuoteContext = React.createContext<QuoteContextValue | undefined>(undefined)

const STORAGE_PREFIX = "quote-"
const STORAGE_VERSION = 1

// Generate a unique quote ID
function generateQuoteId(): string {
  return `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Load quote from localStorage
function loadQuoteFromStorage(quoteId: string): StoredQuote | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${quoteId}`)
    if (!stored) return null
    
    const parsed = JSON.parse(stored) as StoredQuote
    
    // Convert dateOfBirth string back to Date object if it exists
    if (parsed.data.clientInfo?.dateOfBirth) {
      parsed.data.clientInfo.dateOfBirth = new Date(parsed.data.clientInfo.dateOfBirth as any)
    }
    
    return parsed
  } catch (error) {
    console.error("Failed to load quote from storage:", error)
    return null
  }
}

// Save quote to localStorage with error handling
function saveQuoteToStorage(quote: StoredQuote): void {
  try {
    const key = `${STORAGE_PREFIX}${quote.id}`
    const serialized = JSON.stringify(quote)
    localStorage.setItem(key, serialized)
  } catch (error: any) {
    // Handle storage quota exceeded error
    if (error?.name === 'QuotaExceededError' || error?.code === 22) {
      // Try to free up space by removing old quotes
      try {
        clearOldQuotes()
        // Retry saving
        const key = `${STORAGE_PREFIX}${quote.id}`
        localStorage.setItem(key, JSON.stringify(quote))
        return
      } catch (retryError) {
        const quotaError = new Error("Storage quota exceeded. Please clear some space or remove old drafts.")
        quotaError.name = "QuotaExceededError"
        throw quotaError
      }
    }
    // Re-throw other errors
    console.error("Failed to save quote to storage:", error)
    throw error
  }
}

// Clear old quotes to free up storage space
function clearOldQuotes(): void {
  try {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        keys.push(key)
      }
    }
    
    // Sort by last saved date (oldest first)
    const quotes = keys.map(key => {
      try {
        const stored = localStorage.getItem(key)
        if (!stored) return null
        const parsed = JSON.parse(stored) as StoredQuote
        return { key, lastSaved: parsed.lastSaved }
      } catch {
        return null
      }
    }).filter(Boolean) as Array<{ key: string; lastSaved: string }>
    
    quotes.sort((a, b) => new Date(a.lastSaved).getTime() - new Date(b.lastSaved).getTime())
    
    // Remove oldest 50% of quotes (keep recent ones)
    const toRemove = Math.floor(quotes.length / 2)
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(quotes[i].key)
    }
  } catch (error) {
    console.error("Failed to clear old quotes:", error)
    // Don't throw - this is a best-effort cleanup
  }
}

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [quoteData, setQuoteData] = React.useState<QuoteData>({})
  const [isSaving, setIsSaving] = React.useState(false)
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null)
  const [saveError, setSaveError] = React.useState<Error | null>(null)
  const [quoteId, setQuoteId] = React.useState<string | null>(null)
  const [retryCount, setRetryCount] = React.useState(0)

  // Initialize quote ID from URL or generate new one
  React.useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const urlQuoteId = params.get("quote")
    
    if (urlQuoteId) {
      // Try to load existing quote
      const stored = loadQuoteFromStorage(urlQuoteId)
      if (stored) {
        setQuoteId(urlQuoteId)
        // Convert dateOfBirth string back to Date object if needed
        const clientInfo = stored.data.clientInfo ? {
          ...stored.data.clientInfo,
          dateOfBirth: stored.data.clientInfo.dateOfBirth instanceof Date
            ? stored.data.clientInfo.dateOfBirth
            : new Date(stored.data.clientInfo.dateOfBirth as string),
        } : undefined
        
        setQuoteData({
          id: stored.id,
          clientInfo: clientInfo as ClientInfoFormValues | undefined,
          drivers: stored.data.drivers,
          vehicles: stored.data.vehicles,
          currentStep: stored.currentStep,
          lastSaved: new Date(stored.lastSaved),
        })
        setLastSaved(new Date(stored.lastSaved))
      } else {
        // Quote ID in URL but not found in storage, create new
        const newId = generateQuoteId()
        setQuoteId(newId)
        updateUrl(newId)
      }
    } else {
      // No quote ID in URL, create new
      const newId = generateQuoteId()
      setQuoteId(newId)
      updateUrl(newId)
    }
  }, [])

  // Update URL with quote ID
  const updateUrl = React.useCallback((id: string) => {
    if (typeof window === "undefined") return
    const url = new URL(window.location.href)
    url.searchParams.set("quote", id)
    window.history.replaceState({}, "", url.toString())
  }, [])

  // Save quote to storage
  const saveQuote = React.useCallback(async () => {
    if (!quoteId) return

    setIsSaving(true)
    setSaveError(null)
    setRetryCount(0)

    try {
      // Serialize clientInfo, converting Date objects to ISO strings
      const serializedClientInfo = quoteData.clientInfo ? {
        ...quoteData.clientInfo,
        dateOfBirth: quoteData.clientInfo.dateOfBirth instanceof Date
          ? quoteData.clientInfo.dateOfBirth.toISOString()
          : quoteData.clientInfo.dateOfBirth,
      } : undefined

      const storedQuote: StoredQuote = {
        id: quoteId,
        version: STORAGE_VERSION,
        createdAt: quoteData.id ? quoteData.id : new Date().toISOString(),
        lastSaved: new Date().toISOString(),
        currentStep: quoteData.currentStep || "client-info",
        data: {
          clientInfo: serializedClientInfo as any,
          drivers: quoteData.drivers,
          vehicles: quoteData.vehicles,
        },
      }

      saveQuoteToStorage(storedQuote)
      setLastSaved(new Date())
      const wasDirty = quoteData.isDirty
      setQuoteData((prev) => ({ ...prev, isDirty: false }))
      setSaveError(null)
      // Show success toast only if there were actual data changes (not just step navigation)
      if (wasDirty && retryCount === 0) {
        toast.success("Quote saved", {
          description: "Your changes have been saved automatically",
          duration: 2000,
        })
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Failed to save quote")
      setSaveError(err)
      
      // Show error toast (retry button will be added by retrySave if needed)
      const errorMessage = err.name === "QuotaExceededError" 
        ? "Storage quota exceeded. Please clear some space."
        : "Failed to save quote. Click retry to try again."
      
      toast.error("Save failed", {
        description: errorMessage,
        duration: 5000,
      })
      
      throw err
    } finally {
      setIsSaving(false)
    }
  }, [quoteId, quoteData])

  // Retry save with exponential backoff
  const retrySave = React.useCallback(async () => {
    if (!quoteId || isSaving) return

    const maxRetries = 3
    const currentRetry = retryCount + 1
    
    if (currentRetry > maxRetries) {
      const maxRetriesError = new Error("Maximum retry attempts reached. Please try again later.")
      setSaveError(maxRetriesError)
      toast.error("Retry failed", {
        description: "Maximum retry attempts reached. Please try again later.",
        duration: 5000,
      })
      return
    }

    setRetryCount(currentRetry)
    
    // Show retry toast
    toast.loading("Retrying save...", {
      id: "retry-save",
      description: `Attempt ${currentRetry} of ${maxRetries}`,
    })
    
    // Exponential backoff: wait 1s, 2s, 4s
    const delay = Math.pow(2, currentRetry - 1) * 1000
    await new Promise(resolve => setTimeout(resolve, delay))
    
    try {
      await saveQuote()
      toast.dismiss("retry-save")
    } catch (error) {
      toast.dismiss("retry-save")
      // Error is already handled in saveQuote
      console.error(`Retry ${currentRetry} failed:`, error)
    }
  }, [quoteId, isSaving, retryCount, saveQuote])

  // Load quote from storage
  const loadQuote = React.useCallback(async (id: string) => {
    const stored = loadQuoteFromStorage(id)
    if (!stored) {
      throw new Error(`Quote ${id} not found`)
    }

    setQuoteId(id)
    updateUrl(id)
    
    // Convert dateOfBirth string back to Date object if needed
    const clientInfo = stored.data.clientInfo ? {
      ...stored.data.clientInfo,
      dateOfBirth: stored.data.clientInfo.dateOfBirth instanceof Date
        ? stored.data.clientInfo.dateOfBirth
        : new Date(stored.data.clientInfo.dateOfBirth as string),
    } : undefined
    
    setQuoteData({
      id: stored.id,
      clientInfo: clientInfo as ClientInfoFormValues | undefined,
      drivers: stored.data.drivers,
      vehicles: stored.data.vehicles,
      currentStep: stored.currentStep,
      lastSaved: new Date(stored.lastSaved),
    })
    setLastSaved(new Date(stored.lastSaved))
  }, [updateUrl])

  // Create new quote
  const createNewQuote = React.useCallback(() => {
    const newId = generateQuoteId()
    setQuoteId(newId)
    updateUrl(newId)
    setQuoteData({})
    setLastSaved(null)
    setSaveError(null)
  }, [updateUrl])

  // Update client info
  const updateClientInfo = React.useCallback((data: ClientInfoFormValues) => {
    setQuoteData((prev) => ({
      ...prev,
      clientInfo: data,
      isDirty: true,
    }))
  }, [])

  // Update drivers
  const updateDrivers = React.useCallback((drivers: Driver[]) => {
    setQuoteData((prev) => ({
      ...prev,
      drivers,
      isDirty: true,
    }))
  }, [])

  // Update vehicles
  const updateVehicles = React.useCallback((vehicles: Vehicle[]) => {
    setQuoteData((prev) => ({
      ...prev,
      vehicles,
      isDirty: true,
    }))
  }, [])

  // Set current step and trigger save (without marking as dirty)
  const setCurrentStep = React.useCallback(async (step: StepId) => {
    const previousStep = quoteData.currentStep
    setQuoteData((prev) => ({
      ...prev,
      currentStep: step,
      // Only mark as dirty if there are actual data changes, not just step navigation
      // isDirty state is managed by updateClientInfo, updateDrivers, updateVehicles
    }))
    // Save immediately when step changes (but suppress toast for step-only changes)
    if (quoteId && previousStep !== step) {
      try {
        // Temporarily suppress toast for step changes
        const wasDirty = quoteData.isDirty
        await saveQuote()
        // Restore dirty state if it was dirty before (saveQuote clears it)
        if (wasDirty) {
          setQuoteData((prev) => ({ ...prev, isDirty: true }))
        }
      } catch (error) {
        // Error is already handled in saveQuote
        console.error("Failed to save step change:", error)
      }
    }
  }, [quoteId, quoteData.currentStep, quoteData.isDirty, saveQuote])

  const value: QuoteContextValue = {
    quoteData,
    updateClientInfo,
    updateDrivers,
    updateVehicles,
    setCurrentStep,
    saveQuote,
    retrySave,
    loadQuote,
    createNewQuote,
    isSaving,
    lastSaved,
    saveError,
    quoteId,
  }

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const context = React.useContext(QuoteContext)
  if (context === undefined) {
    throw new Error("useQuote must be used within a QuoteProvider")
  }
  return context
}
