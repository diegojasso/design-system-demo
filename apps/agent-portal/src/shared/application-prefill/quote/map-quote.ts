import type { ApplicationQuoteResponse } from "@novo/api-client";

import type { CoverageData, PricingSummary } from "@/features/components/coverage/types";

import type { QuoteJsonRecord } from "./quote-json";
import { asRecord, getArray, getString } from "./quote-json";
import { buildCoverageFromSelectedPlan } from "./coverage";
import {
  buildPricingByPlanId,
  buildSelectedPricing,
  mapParticipationOptionToPlanId,
  pickSelectedPlan,
  type PlanId,
} from "./plans";

export function mapQuoteResponseToCoverageAndPricing(
  quote: ApplicationQuoteResponse | undefined,
  selectedParticipationOption?: string,
): {
  coverage?: CoverageData;
  pricing?: PricingSummary;
  pricingMode?: "upstream";
  pricingByPlanId?: Partial<Record<PlanId, PricingSummary>>;
} {
  const root = asRecord(quote);
  if (!root) return {};

  const coveragePlan = asRecord(root["coverage_plan"]);
  const selectedPlanName = coveragePlan ? getString(coveragePlan, "plan_name") : null;

  const plansRaw = getArray(root, "plans") ?? [];
  const plans = plansRaw.map(asRecord).filter(Boolean) as QuoteJsonRecord[];

  const applicationSelectedParticipationOption =
    typeof selectedParticipationOption === "string" && selectedParticipationOption.trim()
      ? selectedParticipationOption
      : null;

  const selectedPlanId = mapParticipationOptionToPlanId(applicationSelectedParticipationOption);
  const selectedPlan = pickSelectedPlan({
    plans,
    applicationSelectedParticipationOption,
    selectedPlanName,
  });

  const policyEffectiveDate = getString(root, "policy_effective_date") ?? undefined;
  const pricingByPlanId = buildPricingByPlanId({ plans, policyEffectiveDate });
  const pricing = buildSelectedPricing({ selectedPlan, selectedPlanId, policyEffectiveDate });
  const coverage = buildCoverageFromSelectedPlan(selectedPlan);

  return {
    coverage,
    pricing,
    pricingMode: pricing ? "upstream" : undefined,
    pricingByPlanId: Object.keys(pricingByPlanId).length ? pricingByPlanId : undefined,
  };
}

