import type { PricingSummary } from "@/features/components/coverage/types";

import type { QuoteJsonRecord } from "./quote-json";
import { getNumber, getString } from "./quote-json";
import { formatMoney } from "@/shared/util/format-money";

export type PlanId = "novo-next" | "novo-flex" | "novo-classic";

export function mapParticipationOptionToPlanId(value: string | null): PlanId {
  switch (value) {
    case "MONTHLY_ADJUST":
      return "novo-flex";
    case "TERM_ADJUST":
      return "novo-next";
    case "DATA_SHARE_ONLY":
      return "novo-classic";
    default:
      return "novo-next";
  }
}

function buildPricingSummary(input: {
  planId: PlanId;
  plan: QuoteJsonRecord;
  policyEffectiveDate?: string;
}): PricingSummary {
  const monthlyPriceNum = getNumber(input.plan, "monthly_premium") ?? 0;
  const totalForPeriodNum = getNumber(input.plan, "total_premium") ?? 0;
  const downPaymentNum = getNumber(input.plan, "initial_premium") ?? 0;
  return {
    selectedPlanId: input.planId,
    startDate: input.policyEffectiveDate ?? new Date().toISOString().slice(0, 10),
    paymentFrequency: "Monthly",
    monthlyPrice: formatMoney(monthlyPriceNum),
    totalForPeriod: formatMoney(totalForPeriodNum),
    downPayment: formatMoney(downPaymentNum),
  };
}

export function buildPricingByPlanId(input: {
  plans: QuoteJsonRecord[];
  policyEffectiveDate?: string;
}): Partial<Record<PlanId, PricingSummary>> {
  const pricingByPlanId: Partial<Record<PlanId, PricingSummary>> = {};
  for (const p of input.plans) {
    if (getString(p, "type") !== "NSP") continue;
    const opt = getString(p, "participation_option");
    const id = mapParticipationOptionToPlanId(opt);
    pricingByPlanId[id] = buildPricingSummary({ planId: id, plan: p, policyEffectiveDate: input.policyEffectiveDate });
  }
  return pricingByPlanId;
}

export function pickSelectedPlan(input: {
  plans: QuoteJsonRecord[];
  applicationSelectedParticipationOption: string | null;
  selectedPlanName: string | null;
}): QuoteJsonRecord | null {
  const { plans, applicationSelectedParticipationOption, selectedPlanName } = input;

  if (applicationSelectedParticipationOption) {
    const match = plans.find(
      (p) =>
        getString(p, "type") === "NSP" &&
        getString(p, "participation_option") === applicationSelectedParticipationOption &&
        (!selectedPlanName || getString(p, "plan_name") === selectedPlanName),
    );
    if (match) return match;
  }

  if (selectedPlanName) {
    const match = plans.find((p) => getString(p, "plan_name") === selectedPlanName && getString(p, "type") === "NSP");
    if (match) return match;
  }

  return plans.find((p) => getString(p, "type") === "NSP") ?? plans[0] ?? null;
}

export function buildSelectedPricing(input: {
  selectedPlan: QuoteJsonRecord | null;
  selectedPlanId: PlanId;
  policyEffectiveDate?: string;
}): PricingSummary | undefined {
  if (!input.selectedPlan) return undefined;
  return buildPricingSummary({
    planId: input.selectedPlanId,
    plan: input.selectedPlan,
    policyEffectiveDate: input.policyEffectiveDate,
  });
}

