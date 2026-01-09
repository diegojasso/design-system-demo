"use client"

import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CreditCard, Building2, Mail } from "lucide-react"
import { PaymentIcon } from "react-svg-credit-card-payment-icons"
import { useQuote } from "@/app/contexts/quote-context"
import { useAutoSave } from "@/hooks/use-auto-save"
import { PaymentData, PaymentMethod } from "./types"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Validation schema
const paymentSchema = z.object({
  method: z.enum(["secure-link", "credit-card", "ach"]),
  email: z.string().optional(),
  creditCard: z.object({
    nameOnCard: z.string().min(1, "Name on card is required"),
    cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Invalid card number (format: XXXX XXXX XXXX XXXX)"),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),
    cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
    billingAddressSameAsHome: z.boolean(),
  }).optional(),
  ach: z.object({
    accountHolderName: z.string().min(1, "Account holder name is required"),
    accountType: z.enum(["checking", "savings"]),
    routingNumber: z.string().regex(/^\d{9}$/, "Routing number must be 9 digits"),
    accountNumber: z.string().min(4, "Account number is required"),
  }).optional(),
}).refine((data) => {
  if (data.method === "secure-link") {
    if (!data.email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(data.email)
  }
  return true
}, {
  message: "Valid email is required for secure link",
  path: ["email"],
}).refine((data) => {
  if (data.method === "credit-card") {
    return !!data.creditCard && 
           !!data.creditCard.nameOnCard &&
           !!data.creditCard.cardNumber &&
           !!data.creditCard.expirationDate &&
           !!data.creditCard.cvv
  }
  return true
}, {
  message: "All credit card fields are required",
  path: ["creditCard"],
}).refine((data) => {
  if (data.method === "ach") {
    return !!data.ach &&
           !!data.ach.accountHolderName &&
           !!data.ach.routingNumber &&
           !!data.ach.accountNumber
  }
  return true
}, {
  message: "All ACH fields are required",
  path: ["ach"],
})

type PaymentFormValues = z.infer<typeof paymentSchema>

// Format card number with spaces
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "")
  const formatted = digits.match(/.{1,4}/g)?.join(" ") || digits
  return formatted.slice(0, 19) // Max 16 digits + 3 spaces
}

// Format expiration date as MM/YY
function formatExpirationDate(value: string): string {
  const digits = value.replace(/\D/g, "")
  if (digits.length <= 2) {
    return digits
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
}

export function PaymentForm() {
  const { quoteData, updatePayment, saveQuote } = useQuote()
  
  // Get client name for credit card name field
  const clientName = quoteData.clientInfo
    ? `${quoteData.clientInfo.firstName} ${quoteData.clientInfo.lastName}`
    : ""
  
  // Get client email for secure link
  const clientEmail = quoteData.clientInfo?.email || ""

  // Load initial values from quote context if available
  const defaultValues = React.useMemo<PaymentFormValues>(() => {
    if (quoteData.payment) {
      return {
        method: quoteData.payment.method,
        email: quoteData.payment.email || clientEmail,
        creditCard: quoteData.payment.creditCard,
        ach: quoteData.payment.ach,
      }
    }
    return {
      method: "secure-link" as PaymentMethod,
      email: clientEmail,
      creditCard: {
        nameOnCard: clientName,
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddressSameAsHome: true,
      },
      ach: {
        accountHolderName: clientName,
        accountType: "checking" as const,
        routingNumber: "",
        accountNumber: "",
      },
    }
  }, [quoteData.payment, clientEmail, clientName])

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
    mode: "onChange",
  })

  // Reset form when quote data is loaded
  const hasInitialized = React.useRef(false)
  React.useEffect(() => {
    if (!hasInitialized.current && quoteData.payment) {
      form.reset(defaultValues)
      hasInitialized.current = true
    }
  }, [quoteData.payment, defaultValues, form])

  // Watch form values for auto-save
  const formValues = form.watch()
  const paymentMethod = useWatch({ control: form.control, name: "method" })
  const email = useWatch({ control: form.control, name: "email" })
  const creditCard = useWatch({ control: form.control, name: "creditCard" })
  const ach = useWatch({ control: form.control, name: "ach" })

  // Auto-save when form values change
  useAutoSave({
    data: formValues,
    saveFn: async (data) => {
      const paymentData: PaymentData = {
        method: data.method,
        email: data.method === "secure-link" ? data.email : undefined,
        creditCard: data.method === "credit-card" ? data.creditCard : undefined,
        ach: data.method === "ach" ? data.ach : undefined,
      }
      updatePayment(paymentData)
      await saveQuote()
    },
    debounceMs: 2000,
    enabled: form.formState.isDirty,
  })

  const onSubmit = (data: PaymentFormValues) => {
    const paymentData: PaymentData = {
      method: data.method,
      email: data.method === "secure-link" ? data.email : undefined,
      creditCard: data.method === "credit-card" ? data.creditCard : undefined,
      ach: data.method === "ach" ? data.ach : undefined,
    }
    updatePayment(paymentData)
    console.log("Payment form submitted:", paymentData)
  }

  // Validation helpers for each payment method
  const isSecureLinkValid = React.useMemo(() => {
    if (paymentMethod !== "secure-link") return false
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [paymentMethod, email])

  const isCreditCardValid = React.useMemo(() => {
    if (paymentMethod !== "credit-card") return false
    return !!(
      creditCard?.nameOnCard &&
      creditCard?.cardNumber &&
      creditCard?.cardNumber.match(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/) &&
      creditCard?.expirationDate &&
      creditCard?.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
      creditCard?.cvv &&
      creditCard?.cvv.match(/^\d{3,4}$/)
    )
  }, [paymentMethod, creditCard])

  const isAchValid = React.useMemo(() => {
    if (paymentMethod !== "ach") return false
    return !!(
      ach?.accountHolderName &&
      ach?.routingNumber &&
      ach?.routingNumber.match(/^\d{9}$/) &&
      ach?.accountNumber &&
      ach.accountNumber.length >= 4
    )
  }, [paymentMethod, ach])

  const handleSecureLinkSubmit = () => {
    const email = form.getValues("email")
    if (isSecureLinkValid && email) {
      const paymentData: PaymentData = {
        method: "secure-link",
        email,
      }
      updatePayment(paymentData)
      console.log("Sending secure link to:", email)
      // TODO: Implement actual secure link sending
    }
  }

  const handleCreditCardSubmit = () => {
    const creditCard = form.getValues("creditCard")
    if (isCreditCardValid && creditCard) {
      const paymentData: PaymentData = {
        method: "credit-card",
        creditCard,
      }
      updatePayment(paymentData)
      console.log("Processing credit card payment")
      // TODO: Implement actual payment processing
    }
  }

  const handleAchSubmit = () => {
    const ach = form.getValues("ach")
    if (isAchValid && ach) {
      const paymentData: PaymentData = {
        method: "ach",
        ach,
      }
      updatePayment(paymentData)
      console.log("Processing ACH payment")
      // TODO: Implement actual payment processing
    }
  }

  return (
    <Card className="mb-8 w-full rounded-[12px] gap-0">
      <CardHeader className="px-6 pt-6 pb-0">
        <div className="flex flex-col gap-1">
          <CardTitle
            className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            Payment options
          </CardTitle>
          <CardDescription
            className="text-base font-normal leading-[1.5] text-muted-foreground"
            style={{ fontFamily: "Geist, sans-serif" }}
          >
            How would you like to collect payment?
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-4"
                    >
                      {/* Option 1: Send secure link */}
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="secure-link" id="secure-link" className="mt-1" />
                        <div className="flex-1 space-y-2">
                          <Label
                            htmlFor="secure-link"
                            className="text-base font-semibold leading-[1.5] cursor-pointer"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Send secure link to client
                          </Label>
                          <p
                            className="text-sm text-muted-foreground leading-[1.5]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            The client will receive a link to enter payment info.
                          </p>
                          {paymentMethod === "secure-link" && (
                            <div className="pt-2 space-y-4">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FieldLabel>
                                      <FormLabel>Email address</FormLabel>
                                    </FieldLabel>
                                    <FieldContent>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          type="email"
                                          placeholder="email@example.com"
                                          className="h-10 text-base leading-[1.5]"
                                          style={{ fontFamily: "Inter, sans-serif" }}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FieldContent>
                                  </FormItem>
                                )}
                              />
                              <div className="flex justify-end">
                                <Button
                                  type="button"
                                  variant="default"
                                  size="lg"
                                  disabled={!isSecureLinkValid}
                                  onClick={handleSecureLinkSubmit}
                                  className="h-9"
                                >
                                  Send Secure Link
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <Mail className="h-5 w-5 text-muted-foreground mt-1" />
                      </div>

                      {/* Option 2: Credit Card */}
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="credit-card"
                              className="text-base font-semibold leading-[1.5] cursor-pointer"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              Credit Card
                            </Label>
                            <div className="flex items-center gap-2">
                              {/* Credit card icons */}
                              <div className="flex items-center gap-1.5">
                                <PaymentIcon type="amex" format="flatRounded" width={32} />
                                <PaymentIcon type="mastercard" format="flatRounded" width={32} />
                                <PaymentIcon type="visa" format="flatRounded" width={32} />
                                <PaymentIcon type="discover" format="flatRounded" width={32} />
                              </div>
                            </div>
                          </div>
                          {paymentMethod === "credit-card" && (
                            <div className="pt-2 space-y-4">
                              <FieldGroup className="gap-4">
                                {/* Name on Card */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="creditCard.nameOnCard"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Name On Card</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger className="h-10 text-base">
                                                <SelectValue placeholder="Select name" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              {clientName && (
                                                <SelectItem value={clientName}>
                                                  {clientName}
                                                </SelectItem>
                                              )}
                                            </SelectContent>
                                          </Select>
                                          <FormDescription className="text-sm text-muted-foreground mt-1">
                                            Card must belong to the policyholder or to another person on the policy.
                                          </FormDescription>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Card Number */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="creditCard.cardNumber"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Card Number</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Card Number"
                                              className="h-10 text-base leading-[1.5]"
                                              style={{ fontFamily: "Inter, sans-serif" }}
                                              maxLength={19}
                                              onChange={(e) => {
                                                const formatted = formatCardNumber(e.target.value)
                                                field.onChange(formatted)
                                              }}
                                            />
                                          </FormControl>
                                          <FormDescription className="text-sm text-muted-foreground mt-1">
                                            Card must belong to the policyholder or to another person on the policy.
                                          </FormDescription>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Expiration Date and CVV */}
                                <div className="grid grid-cols-2 gap-4">
                                  <Field>
                                    <FormField
                                      control={form.control}
                                      name="creditCard.expirationDate"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FieldLabel>
                                            <FormLabel>Expiration Date</FormLabel>
                                          </FieldLabel>
                                          <FieldContent>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                placeholder="MM/YY"
                                                className="h-10 text-base leading-[1.5]"
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                                maxLength={5}
                                                onChange={(e) => {
                                                  const formatted = formatExpirationDate(e.target.value)
                                                  field.onChange(formatted)
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
                                      name="creditCard.cvv"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FieldLabel>
                                            <FormLabel>CVV</FormLabel>
                                          </FieldLabel>
                                          <FieldContent>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                type="password"
                                                placeholder="CVV"
                                                className="h-10 text-base leading-[1.5]"
                                                style={{ fontFamily: "Inter, sans-serif" }}
                                                maxLength={4}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FieldContent>
                                        </FormItem>
                                      )}
                                    />
                                  </Field>
                                </div>

                                {/* Billing Address Checkbox */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="creditCard.billingAddressSameAsHome"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            Billing address is the same as home address
                                          </FormLabel>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Authorization Text */}
                                <div className="pt-2 pb-2">
                                  <p className="text-sm text-muted-foreground leading-[1.5]" style={{ fontFamily: "Inter, sans-serif" }}>
                                    By clicking on &apos;Pay Now&apos;, the client authorize Novo Insurance, LLC to:
                                  </p>
                                  <ul className="list-disc list-inside text-sm text-muted-foreground leading-[1.5] mt-2 space-y-1" style={{ fontFamily: "Inter, sans-serif" }}>
                                    <li>charge the above amount on the card provided.</li>
                                    <li>securely store payment information.</li>
                                    <li>use the stored payment information to automatically process monthly premium payments on the due date.</li>
                                  </ul>
                                </div>

                                {/* Pay Now Button */}
                                <div className="flex justify-end pt-2">
                                  <Button
                                    type="button"
                                    variant="default"
                                    size="lg"
                                    disabled={!isCreditCardValid}
                                    onClick={handleCreditCardSubmit}
                                    className="h-9"
                                  >
                                    Pay Now
                                  </Button>
                                </div>
                              </FieldGroup>
                            </div>
                          )}
                        </div>
                        <CreditCard className="h-5 w-5 text-muted-foreground mt-1" />
                      </div>

                      {/* Option 3: Bank Account (ACH) */}
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="ach" id="ach" className="mt-1" />
                        <div className="flex-1 space-y-2">
                          <Label
                            htmlFor="ach"
                            className="text-base font-semibold leading-[1.5] cursor-pointer"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            Bank Account (ACH)
                          </Label>
                          {paymentMethod === "ach" && (
                            <div className="pt-2 space-y-4">
                              <FieldGroup className="gap-4">
                                {/* Account Holder Name */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="ach.accountHolderName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Account Holder Name</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Account holder name"
                                              className="h-10 text-base leading-[1.5]"
                                              style={{ fontFamily: "Inter, sans-serif" }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Account Type */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="ach.accountType"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Account Type</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                          >
                                            <FormControl>
                                              <SelectTrigger className="h-10 text-base">
                                                <SelectValue placeholder="Select account type" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                              <SelectItem value="checking">Checking</SelectItem>
                                              <SelectItem value="savings">Savings</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Routing Number */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="ach.routingNumber"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Routing Number</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Routing number"
                                              className="h-10 text-base leading-[1.5]"
                                              style={{ fontFamily: "Inter, sans-serif" }}
                                              maxLength={9}
                                              onChange={(e) => {
                                                const digits = e.target.value.replace(/\D/g, "")
                                                field.onChange(digits.slice(0, 9))
                                              }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Account Number */}
                                <Field>
                                  <FormField
                                    control={form.control}
                                    name="ach.accountNumber"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FieldLabel>
                                          <FormLabel>Account Number</FormLabel>
                                        </FieldLabel>
                                        <FieldContent>
                                          <FormControl>
                                            <Input
                                              {...field}
                                              type="password"
                                              placeholder="Account number"
                                              className="h-10 text-base leading-[1.5]"
                                              style={{ fontFamily: "Inter, sans-serif" }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FieldContent>
                                      </FormItem>
                                    )}
                                  />
                                </Field>

                                {/* Pay Now Button */}
                                <div className="flex justify-end pt-2">
                                  <Button
                                    type="button"
                                    variant="default"
                                    size="lg"
                                    disabled={!isAchValid}
                                    onClick={handleAchSubmit}
                                    className="h-9"
                                  >
                                    Pay Now
                                  </Button>
                                </div>
                              </FieldGroup>
                            </div>
                          )}
                        </div>
                        <Building2 className="h-5 w-5 text-muted-foreground mt-1" />
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
