"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useQuote } from "@/app/contexts/quote-context"
import { useAutoSave } from "@/hooks/use-auto-save"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldGroup,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// US States list
const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
]

// Phone number formatting helper
function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "")
  
  // Format as (XXX) XXX-XXXX
  if (digits.length <= 3) {
    return digits
  } else if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  } else {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }
}

// Zod validation schema
const clientInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Please select a valid date",
  }).max(new Date(), "Date cannot be in the future"),
  driversLicense: z.string().optional(),
  driversLicenseState: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required").regex(
    /^\(\d{3}\) \d{3}-\d{4}$/,
    "Phone number must be in format (555) 123-4567"
  ),
  address: z.string().min(1, "Address is required"),
}).refine(
  (data) => {
    // If license number is provided, state is required
    if (data.driversLicense && !data.driversLicenseState) {
      return false
    }
    return true
  },
  {
    message: "License state is required when license number is provided",
    path: ["driversLicenseState"],
  }
)

type ClientInfoFormValues = z.infer<typeof clientInfoSchema>

export function ClientInfoForm() {
  const { quoteData, updateClientInfo, saveQuote } = useQuote()
  
  // Track if we've initialized the form
  const hasInitialized = React.useRef(false)

  // Load initial values from quote context if available, otherwise use defaults
  const defaultValues = React.useMemo<ClientInfoFormValues>(() => {
    if (quoteData.clientInfo) {
      return {
        ...quoteData.clientInfo,
        // Ensure dateOfBirth is a Date object
        dateOfBirth: quoteData.clientInfo.dateOfBirth instanceof Date 
          ? quoteData.clientInfo.dateOfBirth 
          : new Date(quoteData.clientInfo.dateOfBirth),
      }
    }
    return {
      firstName: "James",
      lastName: "McNulty",
      dateOfBirth: new Date("1990-01-01"),
      email: "john@example.com",
      phone: "(555) 123-4567",
      address: "5211 S McQueen Rd, Chandler, AZ 85249",
    }
  }, [quoteData.clientInfo])

  const form = useForm<ClientInfoFormValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues,
  })

  // Reset form when quote data is loaded (only once on initial load)
  React.useEffect(() => {
    if (!hasInitialized.current && quoteData.clientInfo) {
      form.reset(defaultValues)
      hasInitialized.current = true
    }
  }, [quoteData.clientInfo, defaultValues, form])

  // Watch form values for auto-save
  const formValues = form.watch()

  // Auto-save when form values change
  useAutoSave({
    data: formValues,
    saveFn: async (data) => {
      updateClientInfo(data)
      await saveQuote()
    },
    debounceMs: 2000,
    enabled: form.formState.isDirty,
  })

  // Track form snapshot for undo functionality
  const [formSnapshot, setFormSnapshot] = React.useState<ClientInfoFormValues | null>(null)

  // Capture snapshot when user starts editing (on focus of any field)
  const handleFieldFocus = React.useCallback(() => {
    if (!formSnapshot) {
      setFormSnapshot(form.getValues())
    }
  }, [form, formSnapshot])

  // Track if snapshot was set by submission (vs initial edit)
  const snapshotFromSubmissionRef = React.useRef(false)

  // Reset snapshot when form becomes clean (after undo, but not after submission)
  React.useEffect(() => {
    if (!form.formState.isDirty && formSnapshot && !snapshotFromSubmissionRef.current) {
      // Form is clean after undo, reset snapshot so we can capture a new one when editing starts again
      setFormSnapshot(null)
    }
    // Reset the flag when form becomes dirty again
    if (form.formState.isDirty) {
      snapshotFromSubmissionRef.current = false
    }
  }, [form.formState.isDirty, formSnapshot])

  // Handle ESC key to undo changes
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle ESC if form has been modified and we have a snapshot
      if (
        e.key === 'Escape' &&
        form.formState.isDirty &&
        formSnapshot
      ) {
        // Don't trigger if user is interacting with a select dropdown
        const target = e.target as HTMLElement
        const isSelect = target.closest('[data-slot="select"]') !== null
        const isPopover = target.closest('[data-radix-popper-content-wrapper]') !== null
        
        // Allow ESC in input fields and buttons, but not in select dropdowns or popovers
        if (!isSelect && !isPopover) {
          e.preventDefault()
          form.reset(formSnapshot)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [form, formSnapshot])

  const onSubmit = (data: ClientInfoFormValues) => {
    console.log("Form submitted:", data)
    // Update snapshot to current values after successful submission
    snapshotFromSubmissionRef.current = true
    setFormSnapshot(data)
    // TODO: Handle form submission
  }

  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value)
    form.setValue("phone", formatted, { shouldValidate: true })
  }

  return (
    <Card className="mb-8 w-full rounded-[12px] gap-0">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex flex-col gap-1">
          <CardTitle
            className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Client Information
          </CardTitle>
          <CardDescription
            className="text-base font-normal leading-[1.5] text-muted-foreground"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Enter the primary insured's basic information
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <FieldGroup className="gap-6">
              {/* Personal Information Section */}
              <FieldSet>
                <FieldLegend>Personal Information</FieldLegend>
                <FieldGroup className="gap-4">
                  {/* First Name, Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>First Name</FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="h-10 text-base leading-[1.5]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  onFocus={handleFieldFocus}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      form.setFocus("lastName")
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>Last Name</FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="h-10 text-base leading-[1.5]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  onFocus={handleFieldFocus}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      // Focus date picker trigger
                                      document.getElementById("date-of-birth-trigger")?.click()
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                  </div>

                  {/* Date of Birth */}
                  <Field>
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel>
                            <FormLabel>Date of Birth</FormLabel>
                          </FieldLabel>
                          <FieldContent>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    id="date-of-birth-trigger"
                                    variant="outline"
                                    className={cn(
                                      "h-10 w-full justify-start text-left font-normal text-base",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                    onFocus={handleFieldFocus}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "MM/dd/yyyy")
                                    ) : (
                                      <span>MM/DD/YYYY</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FieldContent>
                        </FormItem>
                      )}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>

              {/* License Information Section */}
              <FieldSet>
                <FieldLegend>License Information</FieldLegend>
                <FieldGroup className="gap-4">
                  {/* Driver's License, Driver's License State */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FormField
                        control={form.control}
                        name="driversLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>
                                Driver's License{" "}
                                <span className="text-muted-foreground font-normal">(optional)</span>
                              </FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Driver's License"
                                  className="h-10 text-base leading-[1.5]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  onFocus={handleFieldFocus}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      form.setFocus("driversLicenseState")
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={form.control}
                        name="driversLicenseState"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>Driver's License State</FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    className="h-10 text-base"
                                    style={{ fontFamily: "Inter, sans-serif" }}
                                    onFocus={handleFieldFocus}
                                  >
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {US_STATES.map((state) => (
                                    <SelectItem key={state.value} value={state.value}>
                                      {state.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>

              {/* Contact Information Section */}
              <FieldSet>
                <FieldLegend>Contact Information</FieldLegend>
                <FieldGroup className="gap-4">
                  {/* Email, Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>Email</FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="h-10 text-base leading-[1.5]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  onFocus={handleFieldFocus}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      form.setFocus("phone")
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                    <Field>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FieldLabel>
                              <FormLabel>Phone</FormLabel>
                            </FieldLabel>
                            <FieldContent>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="(555) 123-4567"
                                  className="h-10 text-base leading-[1.5]"
                                  style={{ fontFamily: "Inter, sans-serif" }}
                                  onFocus={handleFieldFocus}
                                  onChange={(e) => {
                                    const formatted = formatPhoneNumber(e.target.value)
                                    field.onChange(formatted)
                                  }}
                                  maxLength={17}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      form.setFocus("address")
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FieldContent>
                          </FormItem>
                        )}
                      />
                    </Field>
                  </div>

                  {/* Address */}
                  <Field>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FieldLabel>
                            <FormLabel>Address</FormLabel>
                          </FieldLabel>
                          <FieldContent>
                            <FormControl>
                              <Input
                                {...field}
                                className="h-10 text-base leading-[1.5]"
                                style={{ fontFamily: "Inter, sans-serif" }}
                                onFocus={handleFieldFocus}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    form.handleSubmit(onSubmit)()
                                  }
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FieldContent>
                        </FormItem>
                      )}
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
