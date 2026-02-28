import type { CoverageData } from "@/features/components/coverage/types";

import type { QuoteJsonRecord } from "./quote-json";
import { asRecord, getArray, getString } from "./quote-json";
import { formatBodilyInjury, formatDeductible, formatMedicalPayments, formatPropertyDamage } from "./coverage-format";
import { formatCurrency } from "@/shared/util/format-currency";

function getPolicyCoverageValue(policyCoverages: QuoteJsonRecord[], code: string): string | null {
  const row = policyCoverages.find((c) => getString(c, "coverage_code") === code);
  return row ? getString(row, "value") : null;
}

function buildLiability(policyCoverages: QuoteJsonRecord[]) {
  return {
    bodilyInjury: formatBodilyInjury(getPolicyCoverageValue(policyCoverages, "bi")),
    propertyDamage: formatPropertyDamage(getPolicyCoverageValue(policyCoverages, "pd")),
  };
}

function buildAdditional(policyCoverages: QuoteJsonRecord[]) {
  const umbi = getPolicyCoverageValue(policyCoverages, "umbi");
  const uim = getPolicyCoverageValue(policyCoverages, "uim");
  return {
    medicalPayments: formatMedicalPayments(getPolicyCoverageValue(policyCoverages, "med")),
    uninsuredMotoristsBodilyInjury: umbi?.toUpperCase() === "DECLINED" ? "Not Included" : formatBodilyInjury(umbi),
    underinsuredMotoristsBodilyInjury: uim?.toUpperCase() === "DECLINED" ? "Not Included" : formatBodilyInjury(uim),
    roadsideAssistance: false,
  };
}

function getVehicleCoverageValue(items: QuoteJsonRecord[], code: string): string | null {
  const row = items.find((c) => getString(c, "coverage_code") === code);
  return row ? getString(row, "value") : null;
}

function toVehicleCoverages(coveragesRoot: QuoteJsonRecord) {
  const vehicleCoverageRaw = getArray(coveragesRoot, "vehicle_coverage") ?? [];
  const vehicleCoverage = vehicleCoverageRaw.map(asRecord).filter(Boolean) as QuoteJsonRecord[];

  return vehicleCoverage.map((vc) => {
    const vehicleId = getString(vc, "vehicle_id") ?? "";
    const itemsRaw = getArray(vc, "coverages") ?? [];
    const items = itemsRaw.map(asRecord).filter(Boolean) as QuoteJsonRecord[];

    const comp = getVehicleCoverageValue(items, "comp");
    const coll = getVehicleCoverageValue(items, "coll");
    const glass = getVehicleCoverageValue(items, "glass");
    const loan = getVehicleCoverageValue(items, "loan");
    const acpe = getVehicleCoverageValue(items, "acpe");
    const acpeAmount = acpe ? Number(acpe) : 0;
    const hasCustomParts = Number.isFinite(acpeAmount) && acpeAmount > 0;

    return {
      vehicleId,
      comprehensiveDeductible: formatDeductible(comp),
      collisionDeductible: formatDeductible(coll),
      glassDeductible: Boolean(glass && glass.toUpperCase() !== "DECLINED" && glass.toUpperCase() !== "N"),
      loanLeasePayoff: Boolean(loan && loan.toUpperCase() !== "N" && loan.toUpperCase() !== "DECLINED"),
      customPartsEquipment: hasCustomParts,
      customPartsAmount: hasCustomParts ? formatCurrency(acpeAmount) : "",
    };
  });
}

export function buildCoverageFromSelectedPlan(selectedPlan: QuoteJsonRecord | null): CoverageData | undefined {
  const coveragesRoot = selectedPlan ? asRecord(selectedPlan["coverages"]) : null;
  if (!coveragesRoot) return undefined;

  const policyCoveragesRaw = getArray(coveragesRoot, "policy_coverage") ?? [];
  const policyCoverages = policyCoveragesRaw.map(asRecord).filter(Boolean) as QuoteJsonRecord[];
  const vehicleCoverages = toVehicleCoverages(coveragesRoot);

  if (vehicleCoverages.length === 0 && policyCoverages.length === 0) return undefined;

  return {
    liability: buildLiability(policyCoverages),
    additional: buildAdditional(policyCoverages),
    vehicleCoverages,
  };
}

