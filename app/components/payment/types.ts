export type PaymentMethod = "secure-link" | "credit-card" | "ach"

export interface CreditCardData {
  nameOnCard: string
  cardNumber: string
  expirationDate: string // MM/YY format
  cvv: string
  billingAddressSameAsHome: boolean
}

export interface ACHData {
  accountHolderName: string
  accountType: "checking" | "savings"
  routingNumber: string
  accountNumber: string
}

export interface PaymentData {
  method: PaymentMethod
  // For secure-link method
  email?: string
  // For credit-card method
  creditCard?: CreditCardData
  // For ACH method
  ach?: ACHData
}
