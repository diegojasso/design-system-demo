(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/portal/src/screens/components/coverage/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Coverage types for insurance quote
__turbopack_context__.s([
    "BODILY_INJURY_OPTIONS",
    ()=>BODILY_INJURY_OPTIONS,
    "COLLISION_DEDUCTIBLE_OPTIONS",
    ()=>COLLISION_DEDUCTIBLE_OPTIONS,
    "COMPREHENSIVE_DEDUCTIBLE_OPTIONS",
    ()=>COMPREHENSIVE_DEDUCTIBLE_OPTIONS,
    "MEDICAL_PAYMENTS_OPTIONS",
    ()=>MEDICAL_PAYMENTS_OPTIONS,
    "PROPERTY_DAMAGE_OPTIONS",
    ()=>PROPERTY_DAMAGE_OPTIONS,
    "UNDERINSURED_MOTORISTS_OPTIONS",
    ()=>UNDERINSURED_MOTORISTS_OPTIONS,
    "UNINSURED_MOTORISTS_OPTIONS",
    ()=>UNINSURED_MOTORISTS_OPTIONS
]);
const BODILY_INJURY_OPTIONS = [
    "$25K/$50K",
    "$50K/$100K",
    "$100K/$300K",
    "$250K/$500K",
    "$500K/$1M",
    "$1M/$2M"
];
const PROPERTY_DAMAGE_OPTIONS = [
    "$25K",
    "$50K",
    "$100K",
    "$250K",
    "$500K",
    "$1M"
];
const MEDICAL_PAYMENTS_OPTIONS = [
    "Not Included",
    "$1K",
    "$2K",
    "$5K",
    "$10K",
    "$25K"
];
const UNINSURED_MOTORISTS_OPTIONS = [
    "Not Included",
    ...BODILY_INJURY_OPTIONS
];
const UNDERINSURED_MOTORISTS_OPTIONS = [
    "Not Included",
    ...BODILY_INJURY_OPTIONS
];
const COMPREHENSIVE_DEDUCTIBLE_OPTIONS = [
    "Not Included",
    "$250",
    "$500",
    "$1,000",
    "$2,500",
    "$5,000"
];
const COLLISION_DEDUCTIBLE_OPTIONS = [
    "Not Included",
    "$250",
    "$500",
    "$1,000",
    "$2,500",
    "$5,000"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/pricing-calculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock pricing calculator for coverage selections
__turbopack_context__.s([
    "PRICING_PLANS",
    ()=>PRICING_PLANS,
    "calculateCoverageAdjustment",
    ()=>calculateCoverageAdjustment,
    "calculatePlanPricing",
    ()=>calculatePlanPricing
]);
const PRICING_PLANS = [
    {
        id: "novo-next",
        name: "Novo Next",
        monthlyPrice: 124,
        description: "Price locked for six months",
        features: [
            "Price locked for six months",
            "20% discount upfront",
            "Renewal is based on driving behavior"
        ],
        discount: 20
    },
    {
        id: "novo-flex",
        name: "Novo Flex",
        monthlyPrice: 113,
        description: "Flexible monthly payments",
        features: [
            "Flexible monthly payments",
            "No long-term commitment",
            "Cancel anytime"
        ]
    },
    {
        id: "novo-classic",
        name: "Novo Classic",
        monthlyPrice: 132,
        description: "Traditional annual policy",
        features: [
            "Traditional annual policy",
            "Full year coverage",
            "Best for stable drivers"
        ]
    }
];
function calculateCoverageAdjustment(coverage) {
    let adjustment = 0;
    // Bodily Injury adjustments
    const biMultipliers = {
        "$25K/$50K": 0.9,
        "$50K/$100K": 0.95,
        "$100K/$300K": 1.0,
        "$250K/$500K": 1.15,
        "$500K/$1M": 1.3,
        "$1M/$2M": 1.5
    };
    adjustment += (biMultipliers[coverage.liability.bodilyInjury] || 1.0) - 1.0;
    // Property Damage adjustments
    const pdMultipliers = {
        "$25K": 0.9,
        "$50K": 0.95,
        "$100K": 1.0,
        "$250K": 1.1,
        "$500K": 1.2,
        "$1M": 1.35
    };
    adjustment += (pdMultipliers[coverage.liability.propertyDamage] || 1.0) - 1.0;
    // Medical Payments adjustments
    if (coverage.additional.medicalPayments !== "Not Included") {
        const mpMultipliers = {
            "$1K": 1.05,
            "$2K": 1.1,
            "$5K": 1.15,
            "$10K": 1.2,
            "$25K": 1.3
        };
        adjustment += (mpMultipliers[coverage.additional.medicalPayments] || 1.0) - 1.0;
    }
    // Uninsured Motorists adjustments
    if (coverage.additional.uninsuredMotoristsBodilyInjury !== "Not Included") {
        adjustment += 0.1; // 10% increase for uninsured motorists coverage
    }
    // Underinsured Motorists adjustments
    if (coverage.additional.underinsuredMotoristsBodilyInjury && coverage.additional.underinsuredMotoristsBodilyInjury !== "Not Included") {
        adjustment += 0.08; // 8% increase for underinsured motorists coverage
    }
    // Vehicle coverage adjustments
    coverage.vehicleCoverages.forEach((vc)=>{
        // Comprehensive deductible adjustments (lower deductible = higher premium)
        const compMultipliers = {
            "$250": 1.15,
            "$500": 1.1,
            "$1,000": 1.0,
            "$2,500": 0.9,
            "$5,000": 0.85
        };
        adjustment += (compMultipliers[vc.comprehensiveDeductible] || 1.0) - 1.0;
        // Glass deductible adds cost
        if (vc.glassDeductible) {
            adjustment += 0.05;
        }
        // Loan/lease payoff adds cost
        if (vc.loanLeasePayoff) {
            adjustment += 0.1;
        }
        // Custom parts adds cost
        if (vc.customPartsEquipment) {
            adjustment += 0.08;
        }
    });
    // Policy-level roadside assistance (not per vehicle)
    if (coverage.additional.roadsideAssistance) {
        adjustment += 0.06;
    }
    return adjustment;
}
function calculatePlanPricing(planId, coverage, paymentFrequency = "Monthly") {
    const plan = PRICING_PLANS.find((p)=>p.id === planId) || PRICING_PLANS[0];
    const adjustment = calculateCoverageAdjustment(coverage);
    // Base monthly price with coverage adjustments
    let baseMonthlyPrice = plan.monthlyPrice * (1 + adjustment);
    // Apply plan-specific discounts
    if (plan.discount) {
        baseMonthlyPrice = baseMonthlyPrice * (1 - plan.discount / 100);
    }
    // Calculate based on payment frequency
    let monthlyPrice = baseMonthlyPrice;
    let totalForPeriod = baseMonthlyPrice;
    let downPayment = baseMonthlyPrice * 0.2 // 20% down payment
    ;
    if (paymentFrequency === "Semi-Annual") {
        totalForPeriod = baseMonthlyPrice * 6;
        downPayment = totalForPeriod * 0.2;
    } else if (paymentFrequency === "Annual") {
        totalForPeriod = baseMonthlyPrice * 12;
        downPayment = totalForPeriod * 0.2;
    } else {
        // Monthly
        totalForPeriod = baseMonthlyPrice * 6; // Default 6 months for Novo Next
        downPayment = baseMonthlyPrice * 2; // 2 months as down payment
    }
    return {
        monthlyPrice: Math.round(monthlyPrice),
        totalForPeriod: Math.round(totalForPeriod),
        downPayment: Math.round(downPayment)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/price-impact.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Real-time price impact calculation and visualization
__turbopack_context__.s([
    "calculateCumulativeImpact",
    ()=>calculateCumulativeImpact,
    "calculateFieldComparison",
    ()=>calculateFieldComparison,
    "calculatePriceImpact",
    ()=>calculatePriceImpact
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/pricing-calculator.ts [app-client] (ecmascript)");
;
function calculatePriceImpact(currentCoverage, newCoverage, paymentFrequency = "Monthly") {
    const impacts = [];
    // Calculate current total price
    const currentPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", currentCoverage, paymentFrequency);
    // Calculate new total price
    const newPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", newCoverage, paymentFrequency);
    const monthlyDiff = newPricing.monthlyPrice - currentPricing.monthlyPrice;
    const annualDiff = monthlyDiff * 12;
    // Check liability changes
    if (currentCoverage.liability.bodilyInjury !== newCoverage.liability.bodilyInjury) {
        impacts.push({
            field: "bodilyInjury",
            label: "Bodily Injury",
            currentValue: currentCoverage.liability.bodilyInjury,
            newValue: newCoverage.liability.bodilyInjury,
            monthlyImpact: monthlyDiff,
            annualImpact: annualDiff,
            percentageChange: monthlyDiff / currentPricing.monthlyPrice * 100
        });
    }
    if (currentCoverage.liability.propertyDamage !== newCoverage.liability.propertyDamage) {
        impacts.push({
            field: "propertyDamage",
            label: "Property Damage",
            currentValue: currentCoverage.liability.propertyDamage,
            newValue: newCoverage.liability.propertyDamage,
            monthlyImpact: monthlyDiff,
            annualImpact: annualDiff,
            percentageChange: monthlyDiff / currentPricing.monthlyPrice * 100
        });
    }
    // Check additional coverage changes
    if (currentCoverage.additional.medicalPayments !== newCoverage.additional.medicalPayments) {
        impacts.push({
            field: "medicalPayments",
            label: "Medical Payments",
            currentValue: currentCoverage.additional.medicalPayments,
            newValue: newCoverage.additional.medicalPayments,
            monthlyImpact: monthlyDiff,
            annualImpact: annualDiff,
            percentageChange: monthlyDiff / currentPricing.monthlyPrice * 100
        });
    }
    if (currentCoverage.additional.uninsuredMotoristsBodilyInjury !== newCoverage.additional.uninsuredMotoristsBodilyInjury) {
        impacts.push({
            field: "uninsuredMotoristsBodilyInjury",
            label: "Uninsured Motorists",
            currentValue: currentCoverage.additional.uninsuredMotoristsBodilyInjury,
            newValue: newCoverage.additional.uninsuredMotoristsBodilyInjury,
            monthlyImpact: monthlyDiff,
            annualImpact: annualDiff,
            percentageChange: monthlyDiff / currentPricing.monthlyPrice * 100
        });
    }
    if ((currentCoverage.additional.underinsuredMotoristsBodilyInjury || "Not Included") !== (newCoverage.additional.underinsuredMotoristsBodilyInjury || "Not Included")) {
        impacts.push({
            field: "underinsuredMotoristsBodilyInjury",
            label: "Underinsured Motorists",
            currentValue: currentCoverage.additional.underinsuredMotoristsBodilyInjury || "Not Included",
            newValue: newCoverage.additional.underinsuredMotoristsBodilyInjury || "Not Included",
            monthlyImpact: monthlyDiff,
            annualImpact: annualDiff,
            percentageChange: monthlyDiff / currentPricing.monthlyPrice * 100
        });
    }
    return impacts;
}
function calculateFieldComparison(coverage, field, options, paymentFrequency = "Monthly") {
    const currentValue = field === "bodilyInjury" || field === "propertyDamage" ? coverage.liability[field] : coverage.additional[field];
    const comparisons = [];
    for (const option of options){
        // Create modified coverage with this option
        const modifiedCoverage = {
            ...coverage,
            liability: field === "bodilyInjury" || field === "propertyDamage" ? {
                ...coverage.liability,
                [field]: option
            } : coverage.liability,
            additional: field === "medicalPayments" || field === "uninsuredMotoristsBodilyInjury" ? {
                ...coverage.additional,
                [field]: option
            } : coverage.additional
        };
        const pricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", modifiedCoverage, paymentFrequency);
        const currentPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", coverage, paymentFrequency);
        const impact = pricing.monthlyPrice - currentPricing.monthlyPrice;
        comparisons.push({
            option,
            value: option,
            monthlyPrice: pricing.monthlyPrice,
            impact,
            isSelected: option === currentValue
        });
    }
    return comparisons.sort((a, b)=>a.monthlyPrice - b.monthlyPrice);
}
function calculateCumulativeImpact(baseCoverage, modifiedCoverage, paymentFrequency = "Monthly") {
    const currentPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", baseCoverage, paymentFrequency);
    const newPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])("novo-next", modifiedCoverage, paymentFrequency);
    const monthlyImpact = newPricing.monthlyPrice - currentPricing.monthlyPrice;
    const annualImpact = monthlyImpact * 12;
    const percentageChange = monthlyImpact / currentPricing.monthlyPrice * 100;
    return {
        monthlyImpact,
        annualImpact,
        percentageChange,
        newMonthlyPrice: newPricing.monthlyPrice,
        currentMonthlyPrice: currentPricing.monthlyPrice
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PriceImpactIndicator",
    ()=>PriceImpactIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/price-impact.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PriceImpactIndicator({ currentCoverage, newCoverage, pricing, className }) {
    _s();
    const impact = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PriceImpactIndicator.useMemo[impact]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCumulativeImpact"])(currentCoverage, newCoverage, pricing.paymentFrequency);
        }
    }["PriceImpactIndicator.useMemo[impact]"], [
        currentCoverage,
        newCoverage,
        pricing.paymentFrequency
    ]);
    // Only show if there's a meaningful change (> $0.50)
    if (Math.abs(impact.monthlyImpact) < 0.5) {
        return null;
    }
    const isIncrease = impact.monthlyImpact > 0;
    const isDecrease = impact.monthlyImpact < 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium", isIncrease && "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400", isDecrease && "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400", !isIncrease && !isDecrease && "bg-muted text-muted-foreground", className),
        children: [
            isIncrease ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this) : isDecrease ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
                lineNumber: 51,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                className: "h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
                lineNumber: 53,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    isIncrease ? "+" : "",
                    "$",
                    Math.abs(impact.monthlyImpact).toFixed(0),
                    "/mo"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            Math.abs(impact.percentageChange) > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs opacity-75",
                children: [
                    "(",
                    isIncrease ? "+" : "",
                    impact.percentageChange.toFixed(1),
                    "%)"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(PriceImpactIndicator, "9agOBmtW9N3AAWqgBFEBsCV2Thg=");
_c = PriceImpactIndicator;
var _c;
__turbopack_context__.k.register(_c, "PriceImpactIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/use-grid-navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGridNavigation",
    ()=>useGridNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const getCellId = (rowIndex, colIndex)=>`row-${rowIndex}-col-${colIndex}`;
function useGridNavigation({ rowCount, colCount, isCellDisabled }) {
    _s();
    const [activeCell, setActiveCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCell, setEditingCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isDisabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[isDisabled]": (rowIndex, colIndex)=>{
            return isCellDisabled ? isCellDisabled(rowIndex, colIndex) : false;
        }
    }["useGridNavigation.useCallback[isDisabled]"], [
        isCellDisabled
    ]);
    const focusCellElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[focusCellElement]": (rowIndex, colIndex)=>{
            const cellElement = containerRef.current?.querySelector(`[data-cell-id="${getCellId(rowIndex, colIndex)}"]`);
            if (!cellElement) return;
            const focusableElement = cellElement.querySelector('[data-cell-focus="true"]');
            if (focusableElement) {
                setTimeout({
                    "useGridNavigation.useCallback[focusCellElement]": ()=>{
                        focusableElement.focus();
                    }
                }["useGridNavigation.useCallback[focusCellElement]"], 10);
            }
            cellElement.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
            });
        }
    }["useGridNavigation.useCallback[focusCellElement]"], []);
    const moveToCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[moveToCell]": (rowIndex, colIndex)=>{
            const clampedRowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1));
            const clampedColIndex = Math.max(0, Math.min(colIndex, colCount - 1));
            if (isDisabled(clampedRowIndex, clampedColIndex)) return;
            const nextCell = {
                rowIndex: clampedRowIndex,
                colIndex: clampedColIndex
            };
            setActiveCell(nextCell);
            setTimeout({
                "useGridNavigation.useCallback[moveToCell]": ()=>{
                    focusCellElement(clampedRowIndex, clampedColIndex);
                }
            }["useGridNavigation.useCallback[moveToCell]"], 10);
        }
    }["useGridNavigation.useCallback[moveToCell]"], [
        rowCount,
        colCount,
        isDisabled,
        focusCellElement
    ]);
    const moveDirectional = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[moveDirectional]": (rowDelta, colDelta)=>{
            if (!activeCell) return;
            let rowIndex = activeCell.rowIndex + rowDelta;
            let colIndex = activeCell.colIndex + colDelta;
            while(rowIndex >= 0 && rowIndex < rowCount && colIndex >= 0 && colIndex < colCount){
                if (!isDisabled(rowIndex, colIndex)) {
                    moveToCell(rowIndex, colIndex);
                    return;
                }
                rowIndex += rowDelta;
                colIndex += colDelta;
            }
        }
    }["useGridNavigation.useCallback[moveDirectional]"], [
        activeCell,
        rowCount,
        colCount,
        isDisabled,
        moveToCell
    ]);
    const moveNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[moveNext]": ()=>{
            if (!activeCell) {
                moveToCell(0, 0);
                return;
            }
            const startIndex = activeCell.rowIndex * colCount + activeCell.colIndex;
            for(let index = startIndex + 1; index < rowCount * colCount; index += 1){
                const rowIndex = Math.floor(index / colCount);
                const colIndex = index % colCount;
                if (!isDisabled(rowIndex, colIndex)) {
                    moveToCell(rowIndex, colIndex);
                    return;
                }
            }
        }
    }["useGridNavigation.useCallback[moveNext]"], [
        activeCell,
        rowCount,
        colCount,
        isDisabled,
        moveToCell
    ]);
    const movePrevious = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[movePrevious]": ()=>{
            if (!activeCell) {
                moveToCell(0, 0);
                return;
            }
            const startIndex = activeCell.rowIndex * colCount + activeCell.colIndex;
            for(let index = startIndex - 1; index >= 0; index -= 1){
                const rowIndex = Math.floor(index / colCount);
                const colIndex = index % colCount;
                if (!isDisabled(rowIndex, colIndex)) {
                    moveToCell(rowIndex, colIndex);
                    return;
                }
            }
        }
    }["useGridNavigation.useCallback[movePrevious]"], [
        activeCell,
        rowCount,
        colCount,
        isDisabled,
        moveToCell
    ]);
    const startEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[startEditing]": ()=>{
            if (!activeCell) return;
            setEditingCell(activeCell);
            setTimeout({
                "useGridNavigation.useCallback[startEditing]": ()=>{
                    const cellElement = containerRef.current?.querySelector(`[data-cell-id="${getCellId(activeCell.rowIndex, activeCell.colIndex)}"]`);
                    if (!cellElement) return;
                    const selectTrigger = cellElement.querySelector('[data-slot="select-trigger"]');
                    if (selectTrigger) {
                        selectTrigger.click();
                        return;
                    }
                    const input = cellElement.querySelector("input");
                    if (input) {
                        input.focus();
                        input.select();
                        return;
                    }
                    const switchButton = cellElement.querySelector('button[role="switch"]');
                    if (switchButton) {
                        switchButton.click();
                    }
                }
            }["useGridNavigation.useCallback[startEditing]"], 20);
        }
    }["useGridNavigation.useCallback[startEditing]"], [
        activeCell
    ]);
    const stopEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[stopEditing]": ()=>{
            setEditingCell(null);
        }
    }["useGridNavigation.useCallback[stopEditing]"], []);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGridNavigation.useCallback[handleKeyDown]": (e)=>{
            const target = e.target;
            const container = containerRef.current;
            const isWithinContainer = !!(container && target && container.contains(target));
            const isSelectContent = target.closest('[data-slot="select-content"]') !== null;
            if (!isWithinContainer && !isSelectContent) {
                return;
            }
            const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
            const isSelect = target.closest('[data-slot="select"]') !== null;
            if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                if (editingCell) {
                    stopEditing();
                }
                if (e.shiftKey) {
                    movePrevious();
                } else {
                    moveNext();
                }
                return;
            }
            if (isInput || isSelect) return;
            switch(e.key){
                case "ArrowUp":
                    e.preventDefault();
                    moveDirectional(-1, 0);
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    moveDirectional(1, 0);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    moveDirectional(0, -1);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    moveDirectional(0, 1);
                    break;
                case "Enter":
                    e.preventDefault();
                    if (!editingCell) {
                        startEditing();
                    }
                    break;
                case "Escape":
                    if (editingCell) {
                        e.preventDefault();
                        stopEditing();
                    }
                    break;
            }
        }
    }["useGridNavigation.useCallback[handleKeyDown]"], [
        editingCell,
        moveNext,
        movePrevious,
        moveDirectional,
        startEditing,
        stopEditing
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGridNavigation.useEffect": ()=>{
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "useGridNavigation.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["useGridNavigation.useEffect"];
        }
    }["useGridNavigation.useEffect"], [
        handleKeyDown
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGridNavigation.useEffect": ()=>{
            const handlePointerDown = {
                "useGridNavigation.useEffect.handlePointerDown": (event)=>{
                    const target = event.target;
                    const container = containerRef.current;
                    if (!container || !target) return;
                    const isWithinContainer = container.contains(target);
                    const isSelectContent = target.closest('[data-slot="select-content"]') !== null;
                    if (!isWithinContainer && !isSelectContent) {
                        setEditingCell(null);
                        setActiveCell(null);
                    }
                }
            }["useGridNavigation.useEffect.handlePointerDown"];
            window.addEventListener("pointerdown", handlePointerDown);
            return ({
                "useGridNavigation.useEffect": ()=>{
                    window.removeEventListener("pointerdown", handlePointerDown);
                }
            })["useGridNavigation.useEffect"];
        }
    }["useGridNavigation.useEffect"], []);
    return {
        activeCell,
        editingCell,
        moveToCell,
        startEditing,
        stopEditing,
        containerRef
    };
}
_s(useGridNavigation, "sh2RWQYA89t6UgZ9RcADp7KHTQ4=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiabilityCoverageSection",
    ()=>LiabilityCoverageSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/price-impact-indicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/use-grid-navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function LiabilityCoverageSection({ liability, additional, currentCoverage, pricing, onLiabilityChange, onAdditionalChange }) {
    _s();
    const [previewValue, setPreviewValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const rowKeys = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LiabilityCoverageSection.useMemo[rowKeys]": ()=>[
                "bodilyInjury",
                "propertyDamage",
                "medicalPayments",
                "uninsuredMotoristsBodilyInjury",
                "underinsuredMotoristsBodilyInjury",
                "roadsideAssistance"
            ]
    }["LiabilityCoverageSection.useMemo[rowKeys]"], []);
    const { activeCell, containerRef, moveToCell, startEditing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridNavigation"])({
        rowCount: rowKeys.length,
        colCount: 1
    });
    const isActiveCell = (rowIndex)=>activeCell?.rowIndex === rowIndex && activeCell?.colIndex === 0;
    const renderCell = (rowIndex, className, children)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-cell-id": `row-${rowIndex}-col-0`,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className, isActiveCell(rowIndex) && "ring-2 ring-primary ring-inset z-10"),
            onFocusCapture: ()=>moveToCell(rowIndex, 0),
            onClick: ()=>moveToCell(rowIndex, 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-cell-focus": "true",
                tabIndex: 0,
                className: "flex items-center w-full outline-none",
                onKeyDown: (e)=>{
                    if (e.key === "Enter") {
                        e.preventDefault();
                        startEditing();
                    }
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
            lineNumber: 72,
            columnNumber: 5
        }, this);
    const previewCoverage = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "LiabilityCoverageSection.useMemo[previewCoverage]": ()=>{
            if (!previewValue) return currentCoverage;
            if (previewValue.field === "bodilyInjury" || previewValue.field === "propertyDamage") {
                return {
                    ...currentCoverage,
                    liability: {
                        ...currentCoverage.liability,
                        [previewValue.field]: previewValue.value
                    }
                };
            } else if (previewValue.field === "medicalPayments" || previewValue.field === "uninsuredMotoristsBodilyInjury" || previewValue.field === "underinsuredMotoristsBodilyInjury") {
                return {
                    ...currentCoverage,
                    additional: {
                        ...currentCoverage.additional,
                        [previewValue.field]: previewValue.value
                    }
                };
            } else {
                return {
                    ...currentCoverage,
                    additional: {
                        ...currentCoverage.additional,
                        [previewValue.field]: previewValue.value
                    }
                };
            }
        }
    }["LiabilityCoverageSection.useMemo[previewCoverage]"], [
        previewValue,
        currentCoverage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-border rounded-lg overflow-hidden bg-background",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "grid grid-cols-[220px_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 border-b border-border bg-muted/60 h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                        children: "Liability Coverage"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-r border-border h-[44px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "bodily-injury",
                            className: "text-sm font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Bodily Injury"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    renderCell(0, "border-b border-border h-[44px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "bodilyInjury" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 150,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 149,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: liability.bodilyInjury,
                                onValueChange: (value)=>{
                                    setPreviewValue(null);
                                    onLiabilityChange("bodilyInjury", value);
                                },
                                onOpenChange: (open)=>{
                                    if (open) {
                                        setPreviewValue({
                                            field: "bodilyInjury",
                                            value: liability.bodilyInjury
                                        });
                                    } else {
                                        setPreviewValue(null);
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "bodily-injury",
                                        className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select coverage"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BODILY_INJURY_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: option,
                                                children: option
                                            }, option, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-r border-border h-[44px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "property-damage",
                            className: "text-sm font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Property Damage"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this),
                    renderCell(1, "border-b border-border h-[44px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "propertyDamage" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 203,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 202,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: liability.propertyDamage,
                                onValueChange: (value)=>{
                                    setPreviewValue(null);
                                    onLiabilityChange("propertyDamage", value);
                                },
                                onOpenChange: (open)=>{
                                    if (open) {
                                        setPreviewValue({
                                            field: "propertyDamage",
                                            value: liability.propertyDamage
                                        });
                                    } else {
                                        setPreviewValue(null);
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "property-damage",
                                        className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select coverage"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                            lineNumber: 228,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROPERTY_DAMAGE_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: option,
                                                children: option
                                            }, option, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                                lineNumber: 232,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 210,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-span-2 border-b border-border bg-muted/60 h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                        children: "Additional Coverage"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-r border-border h-[44px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "medical-payments",
                            className: "text-sm font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Medical Payments"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    renderCell(2, "border-b border-border h-[44px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "medicalPayments" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 259,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 258,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: additional.medicalPayments,
                                onValueChange: (value)=>{
                                    setPreviewValue(null);
                                    onAdditionalChange("medicalPayments", value);
                                },
                                onOpenChange: (open)=>{
                                    if (open) {
                                        setPreviewValue({
                                            field: "medicalPayments",
                                            value: additional.medicalPayments
                                        });
                                    } else {
                                        setPreviewValue(null);
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "medical-payments",
                                        className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select coverage"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                            lineNumber: 284,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MEDICAL_PAYMENTS_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: option,
                                                children: option
                                            }, option, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                                lineNumber: 288,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 286,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 266,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-r border-border h-[44px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "uninsured-motorists-bi",
                            className: "text-sm font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Uninsured Motorists Bodily Injury"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 297,
                        columnNumber: 11
                    }, this),
                    renderCell(3, "border-b border-border h-[44px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "uninsuredMotoristsBodilyInjury" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 312,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 311,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: additional.uninsuredMotoristsBodilyInjury,
                                onValueChange: (value)=>{
                                    setPreviewValue(null);
                                    onAdditionalChange("uninsuredMotoristsBodilyInjury", value);
                                },
                                onOpenChange: (open)=>{
                                    if (open) {
                                        setPreviewValue({
                                            field: "uninsuredMotoristsBodilyInjury",
                                            value: additional.uninsuredMotoristsBodilyInjury
                                        });
                                    } else {
                                        setPreviewValue(null);
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "uninsured-motorists-bi",
                                        className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select coverage"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                            lineNumber: 340,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 336,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNINSURED_MOTORISTS_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: option,
                                                children: option
                                            }, option, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                                lineNumber: 344,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 319,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-r border-border h-[44px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "underinsured-motorists-bi",
                            className: "text-sm font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Underinsured Motorists Bodily Injury"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 353,
                        columnNumber: 11
                    }, this),
                    renderCell(4, "border-b border-border h-[44px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "underinsuredMotoristsBodilyInjury" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 368,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 367,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: additional.underinsuredMotoristsBodilyInjury || "Not Included",
                                onValueChange: (value)=>{
                                    setPreviewValue(null);
                                    onAdditionalChange("underinsuredMotoristsBodilyInjury", value);
                                },
                                onOpenChange: (open)=>{
                                    if (open) {
                                        setPreviewValue({
                                            field: "underinsuredMotoristsBodilyInjury",
                                            value: additional.underinsuredMotoristsBodilyInjury || "Not Included"
                                        });
                                    } else {
                                        setPreviewValue(null);
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "underinsured-motorists-bi",
                                        className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                            placeholder: "Select coverage"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                            lineNumber: 396,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 392,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNDERINSURED_MOTORISTS_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: option,
                                                children: option
                                            }, option, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                                lineNumber: 400,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                        lineNumber: 398,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 375,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-r border-border h-[64px] px-4 flex items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "roadside-assistance",
                                    className: "text-sm font-medium text-foreground cursor-pointer",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "Roadside Assistance"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "24/7 towing, battery jump, flat tire, lockout service"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 418,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                        lineNumber: 409,
                        columnNumber: 11
                    }, this),
                    renderCell(5, "h-[64px] px-4 flex items-center", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            previewValue?.field === "roadsideAssistance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$price$2d$impact$2d$indicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PriceImpactIndicator"], {
                                    currentCoverage: currentCoverage,
                                    newCoverage: previewCoverage,
                                    pricing: pricing
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                    lineNumber: 432,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 431,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                id: "roadside-assistance",
                                checked: additional.roadsideAssistance || false,
                                onCheckedChange: (checked)=>{
                                    setPreviewValue({
                                        field: "roadsideAssistance",
                                        value: checked
                                    });
                                    setTimeout(()=>{
                                        setPreviewValue(null);
                                        onAdditionalChange("roadsideAssistance", checked);
                                    }, 100);
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                                lineNumber: 439,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s(LiabilityCoverageSection, "zX9sWu0lVc+3CkdCenTrJpmdmkY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridNavigation"]
    ];
});
_c = LiabilityCoverageSection;
var _c;
__turbopack_context__.k.register(_c, "LiabilityCoverageSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/vehicle-logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VehicleLogo",
    ()=>VehicleLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
"use client";
;
;
function VehicleLogo({ make, className }) {
    // For now, use a simple icon. In production, you'd use actual brand logos
    const makeLower = make.toLowerCase();
    // Return brand-specific styling or icon if available
    // For now, just use a car icon with brand name
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `flex items-center justify-center ${className || ''}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
            className: "h-5 w-5 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-logo.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-logo.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = VehicleLogo;
var _c;
__turbopack_context__.k.register(_c, "VehicleLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkVehicleActions",
    ()=>BulkVehicleActions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/types.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function BulkVehicleActions({ vehicles, vehicleCoverages, selectedVehicleIds, onSelectAll, onDeselectAll, onToggleVehicle, onBulkUpdate }) {
    _s();
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const selectedCount = selectedVehicleIds.size;
    const allSelected = vehicles.length > 0 && selectedVehicleIds.size === vehicles.length;
    const handleBulkDeductible = (deductible)=>{
        const ids = Array.from(selectedVehicleIds);
        onBulkUpdate(ids, "comprehensiveDeductible", deductible);
        setIsOpen(false);
    };
    const handleBulkToggle = (field, value)=>{
        const ids = Array.from(selectedVehicleIds);
        onBulkUpdate(ids, field, value);
        setIsOpen(false);
    };
    if (vehicles.length === 0 || vehicles.length <= 2) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between mb-4 p-3 border rounded-lg bg-muted/30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                        checked: allSelected,
                        onCheckedChange: (checked)=>{
                            if (checked) {
                                onSelectAll();
                            } else {
                                onDeselectAll();
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-sm font-medium cursor-pointer",
                        children: selectedCount > 0 ? `${selectedCount} vehicle${selectedCount > 1 ? "s" : ""} selected` : "Select vehicles for bulk actions"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            selectedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                open: isOpen,
                onOpenChange: setIsOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                "Apply to Selected"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                        align: "end",
                        className: "w-56",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                children: "Bulk Actions"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                className: "text-xs text-muted-foreground font-normal",
                                children: "Comprehensive Deductible"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPREHENSIVE_DEDUCTIBLE_OPTIONS"].map((deductible)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                    onClick: ()=>handleBulkDeductible(deductible),
                                    children: deductible
                                }, deductible, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                className: "text-xs text-muted-foreground font-normal",
                                children: "Add-ons"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("glassDeductible", true),
                                children: "Enable Glass Deductible"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("glassDeductible", false),
                                children: "Disable Glass Deductible"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("loanLeasePayoff", true),
                                children: "Enable Loan/Lease Payoff"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("loanLeasePayoff", false),
                                children: "Disable Loan/Lease Payoff"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("customPartsEquipment", true),
                                children: "Enable Custom Parts"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                onClick: ()=>handleBulkToggle("customPartsEquipment", false),
                                children: "Disable Custom Parts"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(BulkVehicleActions, "+sus0Lb0ewKHdwiUhiTAJFoFyQ0=");
_c = BulkVehicleActions;
var _c;
__turbopack_context__.k.register(_c, "BulkVehicleActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VehicleCoverageSection",
    ()=>VehicleCoverageSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$vehicle$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/vehicle-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$bulk$2d$vehicle$2d$actions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/bulk-vehicle-actions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/use-grid-navigation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function VehicleCoverageSection({ vehicles, vehicleCoverages, onVehicleCoverageChange, onBulkUpdate }) {
    _s();
    const [selectedVehicleIds, setSelectedVehicleIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const coverageRowKeys = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "VehicleCoverageSection.useMemo[coverageRowKeys]": ()=>[
                "comprehensiveDeductible",
                "collisionDeductible",
                "rentalReimbursement",
                "glassDeductible",
                "loanLeasePayoff",
                "customPartsEquipment",
                "customPartsAmount"
            ]
    }["VehicleCoverageSection.useMemo[coverageRowKeys]"], []);
    const getCoverageByColumnIndex = (colIndex)=>{
        const vehicle = vehicles[colIndex];
        if (!vehicle) return null;
        const coverage = getVehicleCoverage(vehicle.id);
        if (!coverage) return null;
        return {
            vehicle,
            coverage
        };
    };
    const isCellDisabled = (rowIndex, colIndex)=>{
        const rowKey = coverageRowKeys[rowIndex];
        const data = getCoverageByColumnIndex(colIndex);
        if (!data) return true;
        const { coverage } = data;
        if (rowKey === "rentalReimbursement" || rowKey === "glassDeductible" || rowKey === "customPartsEquipment") {
            return !hasCompOrColl(coverage);
        }
        if (rowKey === "customPartsAmount") {
            return !hasCompOrColl(coverage) || !coverage.customPartsEquipment;
        }
        return false;
    };
    const { activeCell, containerRef, moveToCell, startEditing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridNavigation"])({
        rowCount: coverageRowKeys.length,
        colCount: vehicles.length,
        isCellDisabled
    });
    const isActiveCell = (rowIndex, colIndex)=>activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex;
    const renderCell = (rowIndex, colIndex, className, children, disabled = false)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-cell-id": `row-${rowIndex}-col-${colIndex}`,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className, isActiveCell(rowIndex, colIndex) && "ring-2 ring-primary ring-inset z-10"),
            onFocusCapture: ()=>moveToCell(rowIndex, colIndex),
            onClick: ()=>moveToCell(rowIndex, colIndex),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-cell-focus": "true",
                tabIndex: 0,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center w-full outline-none", disabled && "cursor-not-allowed"),
                "aria-disabled": disabled ? "true" : "false",
                onKeyDown: (e)=>{
                    if (e.key === "Enter") {
                        e.preventDefault();
                        startEditing();
                    }
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
            lineNumber: 89,
            columnNumber: 5
        }, this);
    const getVehicleCoverage = (vehicleId)=>{
        return vehicleCoverages.find((vc)=>vc.vehicleId === vehicleId);
    };
    const getVehicleDisplayName = (vehicle)=>{
        return `${vehicle.year} ${vehicle.make} ${vehicle.model}`.trim();
    };
    const handleSelectAll = ()=>{
        setSelectedVehicleIds(new Set(vehicles.map((v)=>v.id)));
    };
    const handleDeselectAll = ()=>{
        setSelectedVehicleIds(new Set());
    };
    const handleToggleVehicle = (vehicleId)=>{
        setSelectedVehicleIds((prev)=>{
            const next = new Set(prev);
            if (next.has(vehicleId)) {
                next.delete(vehicleId);
            } else {
                next.add(vehicleId);
            }
            return next;
        });
    };
    const handleBulkUpdate = (vehicleIds, field, value)=>{
        vehicleIds.forEach((vehicleId)=>{
            onVehicleCoverageChange(vehicleId, field, value);
        });
        setSelectedVehicleIds(new Set()); // Clear selection after bulk update
        onBulkUpdate?.(vehicleIds, field, value);
    };
    // Helper to check if comp/coll are both removed
    const hasCompOrColl = (coverage)=>{
        const hasComp = coverage.comprehensiveDeductible !== "Not Included" && coverage.comprehensiveDeductible !== undefined;
        const hasColl = coverage.collisionDeductible !== "Not Included" && coverage.collisionDeductible !== undefined;
        return hasComp || hasColl;
    };
    // Handle comprehensive change - auto-add collision if comprehensive is added
    const handleComprehensiveChange = (vehicleId, value)=>{
        const coverage = getVehicleCoverage(vehicleId);
        if (!coverage) return;
        onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", value);
        // If comprehensive is added and collision is not set or is "Not Included", auto-add collision
        if (value !== "Not Included" && (!coverage.collisionDeductible || coverage.collisionDeductible === "Not Included")) {
            onVehicleCoverageChange(vehicleId, "collisionDeductible", value);
        }
        // If comprehensive is removed, remove collision and disable dependent fields
        if (value === "Not Included") {
            if (coverage.collisionDeductible !== "Not Included") {
                onVehicleCoverageChange(vehicleId, "collisionDeductible", "Not Included");
            }
            if (coverage.rentalReimbursement) {
                onVehicleCoverageChange(vehicleId, "rentalReimbursement", false);
            }
            if (coverage.glassDeductible) {
                onVehicleCoverageChange(vehicleId, "glassDeductible", false);
            }
            if (coverage.customPartsEquipment) {
                onVehicleCoverageChange(vehicleId, "customPartsEquipment", false);
            }
        }
    };
    // Handle collision change - match comprehensive or remove dependent fields if removed
    const handleCollisionChange = (vehicleId, value)=>{
        const coverage = getVehicleCoverage(vehicleId);
        if (!coverage) return;
        onVehicleCoverageChange(vehicleId, "collisionDeductible", value);
        // If collision is removed, remove comprehensive and disable dependent fields
        if (value === "Not Included") {
            if (coverage.comprehensiveDeductible !== "Not Included") {
                onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", "Not Included");
            }
            if (coverage.rentalReimbursement) {
                onVehicleCoverageChange(vehicleId, "rentalReimbursement", false);
            }
            if (coverage.glassDeductible) {
                onVehicleCoverageChange(vehicleId, "glassDeductible", false);
            }
            if (coverage.customPartsEquipment) {
                onVehicleCoverageChange(vehicleId, "customPartsEquipment", false);
            }
        } else {
            // If collision is added, match comprehensive deductible
            if (coverage.comprehensiveDeductible === "Not Included" || coverage.comprehensiveDeductible === undefined) {
                onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", value);
            }
        }
    };
    // Format currency input
    const formatCurrency = (value)=>{
        if (value === undefined || value === null) return "$0";
        return `$${value.toLocaleString()}`;
    };
    // Parse currency input
    const parseCurrency = (value)=>{
        const cleaned = value.replace(/[^0-9]/g, "");
        return cleaned ? parseInt(cleaned, 10) : 0;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: vehicles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-8 text-muted-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm",
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                children: "No vehicles added yet. Please add vehicles in the Vehicles step."
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                lineNumber: 233,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
            lineNumber: 232,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                onBulkUpdate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$bulk$2d$vehicle$2d$actions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkVehicleActions"], {
                    vehicles: vehicles,
                    vehicleCoverages: vehicleCoverages,
                    selectedVehicleIds: selectedVehicleIds,
                    onSelectAll: handleSelectAll,
                    onDeselectAll: handleDeselectAll,
                    onToggleVehicle: handleToggleVehicle,
                    onBulkUpdate: handleBulkUpdate
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                    lineNumber: 240,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border border-border rounded-lg overflow-hidden bg-background",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: containerRef,
                            className: "min-w-[720px]",
                            style: {
                                display: "grid",
                                gridTemplateColumns: `minmax(220px, 260px) repeat(${vehicles.length}, minmax(220px, 1fr))`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "contents",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sticky left-0 top-0 z-30 border-b border-r border-border bg-muted/60 h-[64px] px-4 flex items-center text-sm font-medium text-foreground",
                                            children: "Coverage Type"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this),
                                        vehicles.map((vehicle, index)=>{
                                            const isSelected = selectedVehicleIds.has(vehicle.id);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("sticky top-0 z-20 border-b border-border bg-muted/60 h-[64px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border", isSelected && "ring-2 ring-primary ring-inset"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    children: [
                                                        onBulkUpdate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                            checked: isSelected,
                                                            onCheckedChange: ()=>handleToggleVehicle(vehicle.id)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                            lineNumber: 277,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$vehicle$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleLogo"], {
                                                            make: vehicle.make
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                            lineNumber: 282,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-sm font-medium text-foreground",
                                                                    style: {
                                                                        fontFamily: "Inter, sans-serif"
                                                                    },
                                                                    children: getVehicleDisplayName(vehicle)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    children: vehicle.vin || "VIN not provided"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 25
                                                }, this)
                                            }, `header-${vehicle.id}`, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                lineNumber: 267,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 260,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Comprehensive Deductible"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 301,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    return renderCell(0, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: coverage.comprehensiveDeductible || "Not Included",
                                        onValueChange: (value)=>handleComprehensiveChange(vehicle.id, value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: `comprehensive-${vehicle.id}`,
                                                className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select deductible"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                lineNumber: 318,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMPREHENSIVE_DEDUCTIBLE_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: option,
                                                        children: option === "Not Included" ? "Not Included" : `${option} deductible`
                                                    }, option, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                        lineNumber: 326,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                lineNumber: 324,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 314,
                                        columnNumber: 21
                                    }, this));
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Collision Deductible"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 336,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    return renderCell(1, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: coverage.collisionDeductible || "Not Included",
                                        onValueChange: (value)=>handleCollisionChange(vehicle.id, value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: `collision-${vehicle.id}`,
                                                className: "w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select deductible"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                lineNumber: 353,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COLLISION_DEDUCTIBLE_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: option,
                                                        children: option === "Not Included" ? "Not Included" : `${option} deductible`
                                                    }, option, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                                lineNumber: 359,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 349,
                                        columnNumber: 21
                                    }, this));
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Rental Reimbursement"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 371,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    const disabled = !hasCompOrColl(coverage);
                                    return renderCell(2, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border", disabled && "opacity-50"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: `rental-${vehicle.id}`,
                                        checked: coverage.rentalReimbursement || false,
                                        disabled: disabled,
                                        onCheckedChange: (checked)=>onVehicleCoverageChange(vehicle.id, "rentalReimbursement", checked)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 386,
                                        columnNumber: 21
                                    }, this), disabled);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "$0 Glass Deductible"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 399,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    const disabled = !hasCompOrColl(coverage);
                                    return renderCell(3, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border", disabled && "opacity-50"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: `glass-${vehicle.id}`,
                                        checked: coverage.glassDeductible,
                                        disabled: disabled,
                                        onCheckedChange: (checked)=>onVehicleCoverageChange(vehicle.id, "glassDeductible", checked),
                                        className: "data-[state=checked]:bg-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 414,
                                        columnNumber: 21
                                    }, this), disabled);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Loan/Lease Payoff"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 428,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    return renderCell(4, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: `loan-lease-${vehicle.id}`,
                                        checked: coverage.loanLeasePayoff,
                                        onCheckedChange: (checked)=>onVehicleCoverageChange(vehicle.id, "loanLeasePayoff", checked)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 441,
                                        columnNumber: 21
                                    }, this));
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-b border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Custom Parts and Equipment"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 452,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    const disabled = !hasCompOrColl(coverage);
                                    return renderCell(5, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b border-border h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border", disabled && "opacity-50"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        id: `custom-parts-${vehicle.id}`,
                                        checked: coverage.customPartsEquipment,
                                        disabled: disabled,
                                        onCheckedChange: (checked)=>onVehicleCoverageChange(vehicle.id, "customPartsEquipment", checked)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 467,
                                        columnNumber: 21
                                    }, this), disabled);
                                }),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky left-0 z-10 border-r border-border bg-background h-[44px] px-4 flex items-center text-sm font-medium text-foreground",
                                    children: "Custom Parts Amount"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                    lineNumber: 480,
                                    columnNumber: 17
                                }, this),
                                vehicles.map((vehicle, index)=>{
                                    const coverage = getVehicleCoverage(vehicle.id);
                                    if (!coverage) return null;
                                    const disabled = !hasCompOrColl(coverage) || !coverage.customPartsEquipment;
                                    return renderCell(6, index, (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-[44px] px-4 flex items-center", index < vehicles.length - 1 && "border-r border-border"), /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        id: `custom-parts-amount-${vehicle.id}`,
                                        type: "text",
                                        value: formatCurrency(coverage.customPartsAmount),
                                        onChange: (e)=>{
                                            const value = parseCurrency(e.target.value);
                                            onVehicleCoverageChange(vehicle.id, "customPartsAmount", value);
                                        },
                                        placeholder: "$0",
                                        className: "w-full border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                                        disabled: disabled
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                                        lineNumber: 491,
                                        columnNumber: 21
                                    }, this), disabled);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                            lineNumber: 252,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                        lineNumber: 251,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_s(VehicleCoverageSection, "oCEZac9Ng1/EPIu6Z0A0iYalg3Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$use$2d$grid$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGridNavigation"]
    ];
});
_c = VehicleCoverageSection;
var _c;
__turbopack_context__.k.register(_c, "VehicleCoverageSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PricingSummarySection",
    ()=>PricingSummarySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/collapsible.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/pricing-calculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$quote$2d$binding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/quote-binding.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function PricingSummarySection({ coverage, pricing, onPricingChange, onCollectPayment, onDownloadPDF }) {
    _s();
    const { quoteData, setCurrentStep } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    const [isPlanDetailsExpanded, setIsPlanDetailsExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const calculatedPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])(pricing.selectedPlanId, coverage, pricing.paymentFrequency);
    const selectedPlan = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICING_PLANS"].find((p)=>p.id === pricing.selectedPlanId) || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICING_PLANS"][0];
    // Check for unresolved import summary items
    // Unresolved = items with checked: false OR items with error/warning severity (UW block)
    const hasUnresolvedItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PricingSummarySection.useMemo[hasUnresolvedItems]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$quote$2d$binding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isQuoteUnbindable"])(quoteData.importSummary);
        }
    }["PricingSummarySection.useMemo[hasUnresolvedItems]"], [
        quoteData.importSummary
    ]);
    const unresolvedCount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PricingSummarySection.useMemo[unresolvedCount]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$quote$2d$binding$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUnbindableImportCount"])(quoteData.importSummary);
        }
    }["PricingSummarySection.useMemo[unresolvedCount]"], [
        quoteData.importSummary
    ]);
    const handleJumpToImportSummary = ()=>{
        setCurrentStep("import-summary");
    };
    // Generate start date options (next 30 days)
    const startDateOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "PricingSummarySection.useMemo[startDateOptions]": ()=>{
            const dates = [];
            const today = new Date();
            for(let i = 0; i < 30; i++){
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                dates.push(date.toISOString().split("T")[0]);
            }
            return dates;
        }
    }["PricingSummarySection.useMemo[startDateOptions]"], []);
    const formatDate = (dateString)=>{
        try {
            const date = new Date(dateString);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(date, "MM/dd/yyyy");
        } catch  {
            return dateString;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-sm font-medium text-foreground",
                        style: {
                            fontFamily: "Inter, sans-serif"
                        },
                        children: "Plan Options"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1 rounded-lg border bg-muted/40 p-1",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRICING_PLANS"].map((plan)=>{
                            const isSelected = plan.id === pricing.selectedPlanId;
                            const planPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$calculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePlanPricing"])(plan.id, coverage, pricing.paymentFrequency);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onPricingChange("selectedPlanId", plan.id),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition", isSelected ? "bg-background text-foreground shadow-sm ring-1 ring-purple-500/50" : "text-muted-foreground hover:bg-muted"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: plan.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: [
                                            "$",
                                            planPricing.monthlyPrice,
                                            "/mo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, plan.id, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-purple-200 dark:border-purple-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "p-4 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 md:grid-cols-[1fr_1fr] md:gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-3xl font-semibold text-foreground",
                                                            style: {
                                                                fontFamily: "Inter, sans-serif"
                                                            },
                                                            children: [
                                                                "$",
                                                                calculatedPricing.monthlyPrice
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base text-muted-foreground",
                                                            style: {
                                                                fontFamily: "Inter, sans-serif"
                                                            },
                                                            children: "/mo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: [
                                                        "Total for ",
                                                        pricing.paymentFrequency === "Monthly" ? "6 months" : pricing.paymentFrequency === "Semi-Annual" ? "6 months" : "12 months",
                                                        ": $",
                                                        calculatedPricing.totalForPeriod
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-muted-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: [
                                                        "Down payment: $",
                                                        calculatedPricing.downPayment
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
                                            open: isPlanDetailsExpanded,
                                            onOpenChange: setIsPlanDetailsExpanded,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border-t border-border pt-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "flex items-center justify-between w-full text-left",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-sm font-semibold text-foreground",
                                                                    style: {
                                                                        fontFamily: "Inter, sans-serif"
                                                                    },
                                                                    children: [
                                                                        "About ",
                                                                        selectedPlan.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 163,
                                                                    columnNumber: 23
                                                                }, this),
                                                                isPlanDetailsExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 25
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    className: "h-4 w-4 text-muted-foreground"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 172,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                                                        className: "pt-2 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                className: "space-y-1.5",
                                                                children: selectedPlan.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                        className: "flex items-start gap-2 text-sm text-muted-foreground",
                                                                        style: {
                                                                            fontFamily: "Inter, sans-serif"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                className: "h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                                lineNumber: 184,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: feature
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                                lineNumber: 185,
                                                                                columnNumber: 27
                                                                            }, this)
                                                                        ]
                                                                    }, index, true, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                lineNumber: 177,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pt-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "#",
                                                                    className: "text-sm text-blue-600 hover:underline",
                                                                    style: {
                                                                        fontFamily: "Inter, sans-serif"
                                                                    },
                                                                    onClick: (e)=>{
                                                                        e.preventDefault();
                                                                        // TODO: Implement plan comparison
                                                                        console.log("Compare plans");
                                                                    },
                                                                    children: "Compare all plans"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 md:border-l md:border-border md:pl-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "start-date",
                                                    className: "text-sm font-medium text-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: "Start Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: pricing.startDate,
                                                    onValueChange: (value)=>onPricingChange("startDate", value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            id: "start-date",
                                                            className: "w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Select start date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: startDateOptions.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: date,
                                                                    children: formatDate(date)
                                                                }, date, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 227,
                                                                    columnNumber: 23
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "payment-frequency",
                                                    className: "text-sm font-medium text-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: "Payment Frequency"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: pricing.paymentFrequency,
                                                    onValueChange: (value)=>onPricingChange("paymentFrequency", value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            id: "payment-frequency",
                                                            className: "w-full",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                placeholder: "Select frequency"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                lineNumber: 251,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "Monthly",
                                                                    children: "Monthly"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "Semi-Annual",
                                                                    children: "Semi-Annual"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 255,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: "Annual",
                                                                    children: "Annual"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 pt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    onClick: onCollectPayment,
                                                    disabled: hasUnresolvedItems,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full bg-green-600 hover:bg-green-700 text-white", hasUnresolvedItems && "opacity-50 cursor-not-allowed"),
                                                    children: "Collect Payment & Bind"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "outline",
                                                    onClick: onDownloadPDF,
                                                    className: "w-full",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "h-4 w-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Download Quote as PDF"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 262,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        hasUnresolvedItems && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            className: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    className: "h-4 w-4 text-amber-600 dark:text-amber-400"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                    className: "text-sm text-amber-900 dark:text-amber-100 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Cannot bind policy: ",
                                                unresolvedCount,
                                                " unresolved item",
                                                unresolvedCount !== 1 ? "s" : "",
                                                " from import summary must be resolved before binding. You can still view and adjust coverage settings."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            type: "button",
                                            variant: "link",
                                            className: "h-auto p-0 text-amber-900 dark:text-amber-100",
                                            onClick: handleJumpToImportSummary,
                                            children: "View all in Import Summary"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx",
        lineNumber: 90,
        columnNumber: 5
    }, this);
}
_s(PricingSummarySection, "VO3Imr9XromIbElJ6CWQ6ecR2MI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"]
    ];
});
_c = PricingSummarySection;
var _c;
__turbopack_context__.k.register(_c, "PricingSummarySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Coverage templates and presets for quick setup
__turbopack_context__.s([
    "DEFAULT_TEMPLATES",
    ()=>DEFAULT_TEMPLATES,
    "applyTemplate",
    ()=>applyTemplate,
    "deleteTemplate",
    ()=>deleteTemplate,
    "loadTemplates",
    ()=>loadTemplates,
    "saveCustomTemplate",
    ()=>saveCustomTemplate,
    "saveTemplates",
    ()=>saveTemplates
]);
// Default liability coverage for minimum state requirements
const MINIMUM_LIABILITY = {
    bodilyInjury: "$25K/$50K",
    propertyDamage: "$25K"
};
// Standard liability coverage
const STANDARD_LIABILITY = {
    bodilyInjury: "$100K/$300K",
    propertyDamage: "$100K"
};
// Comprehensive liability coverage
const COMPREHENSIVE_LIABILITY = {
    bodilyInjury: "$250K/$500K",
    propertyDamage: "$250K"
};
// High-value liability coverage
const HIGH_VALUE_LIABILITY = {
    bodilyInjury: "$500K/$1M",
    propertyDamage: "$500K"
};
// Default additional coverage (none)
const NO_ADDITIONAL = {
    medicalPayments: "Not Included",
    uninsuredMotoristsBodilyInjury: "Not Included"
};
// Standard additional coverage
const STANDARD_ADDITIONAL = {
    medicalPayments: "$5K",
    uninsuredMotoristsBodilyInjury: "$100K/$300K",
    roadsideAssistance: true
};
// Comprehensive additional coverage
const COMPREHENSIVE_ADDITIONAL = {
    medicalPayments: "$10K",
    uninsuredMotoristsBodilyInjury: "$250K/$500K",
    roadsideAssistance: true
};
// Helper to create vehicle coverage defaults
function createVehicleCoverageDefaults(comprehensiveDeductible, glassDeductible, loanLeasePayoff, customPartsEquipment) {
    return (vehicleId)=>({
            vehicleId,
            comprehensiveDeductible,
            glassDeductible,
            loanLeasePayoff,
            customPartsEquipment
        });
}
const DEFAULT_TEMPLATES = [
    {
        id: "minimum",
        name: "Minimum State Requirements",
        description: "Bare minimum coverage to meet state requirements",
        category: "minimum",
        isDefault: true,
        coverage: {
            liability: MINIMUM_LIABILITY,
            additional: NO_ADDITIONAL,
            vehicleCoverages: []
        }
    },
    {
        id: "standard",
        name: "Standard Coverage",
        description: "Common coverage for typical drivers and vehicles",
        category: "standard",
        isDefault: true,
        coverage: {
            liability: STANDARD_LIABILITY,
            additional: STANDARD_ADDITIONAL,
            vehicleCoverages: []
        }
    },
    {
        id: "comprehensive",
        name: "Comprehensive Protection",
        description: "Higher coverage limits for better protection",
        category: "comprehensive",
        isDefault: true,
        coverage: {
            liability: COMPREHENSIVE_LIABILITY,
            additional: COMPREHENSIVE_ADDITIONAL,
            vehicleCoverages: []
        }
    },
    {
        id: "high-value",
        name: "High-Value Vehicle",
        description: "Enhanced coverage for expensive vehicles",
        category: "high-value",
        isDefault: true,
        coverage: {
            liability: HIGH_VALUE_LIABILITY,
            additional: COMPREHENSIVE_ADDITIONAL,
            vehicleCoverages: []
        }
    }
];
// Template storage key
const TEMPLATE_STORAGE_KEY = "coverage-templates";
function loadTemplates() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(TEMPLATE_STORAGE_KEY);
        if (!stored) return DEFAULT_TEMPLATES;
        const parsed = JSON.parse(stored);
        // Filter out commercial templates and merge with defaults
        const defaultIds = new Set(DEFAULT_TEMPLATES.map((t)=>t.id));
        const customTemplates = parsed.filter((t)=>!defaultIds.has(t.id) && t.category !== "commercial");
        // Also filter out commercial from defaults
        const filteredDefaults = DEFAULT_TEMPLATES.filter((t)=>t.category !== "commercial");
        return [
            ...filteredDefaults,
            ...customTemplates
        ];
    } catch (error) {
        console.error("Failed to load templates:", error);
        return DEFAULT_TEMPLATES.filter((t)=>t.category !== "commercial");
    }
}
function saveTemplates(templates) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Only save custom templates (not defaults)
        const defaultIds = new Set(DEFAULT_TEMPLATES.map((t)=>t.id));
        const customTemplates = templates.filter((t)=>!defaultIds.has(t.id));
        localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(customTemplates));
    } catch (error) {
        console.error("Failed to save templates:", error);
    }
}
function saveCustomTemplate(template) {
    const newTemplate = {
        ...template,
        id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        category: "custom",
        isDefault: false
    };
    const templates = loadTemplates();
    templates.push(newTemplate);
    saveTemplates(templates);
    return newTemplate;
}
function deleteTemplate(templateId) {
    const templates = loadTemplates();
    const filtered = templates.filter((t)=>t.id !== templateId);
    saveTemplates(filtered);
}
function applyTemplate(template, currentCoverage, vehicleIds) {
    // Create vehicle coverages for all vehicles
    const vehicleCoverages = vehicleIds.map((vehicleId)=>{
        // Try to preserve existing vehicle coverage if it exists
        const existing = currentCoverage.vehicleCoverages.find((vc)=>vc.vehicleId === vehicleId);
        // Determine vehicle coverage settings based on template
        let vehicleCoverage;
        switch(template.category){
            case "minimum":
                vehicleCoverage = {
                    vehicleId,
                    comprehensiveDeductible: "$2,500",
                    collisionDeductible: "$2,500",
                    glassDeductible: false,
                    loanLeasePayoff: false,
                    customPartsEquipment: false
                };
                break;
            case "standard":
                vehicleCoverage = {
                    vehicleId,
                    comprehensiveDeductible: "$1,000",
                    collisionDeductible: "$1,000",
                    glassDeductible: true,
                    loanLeasePayoff: false,
                    customPartsEquipment: false
                };
                break;
            case "comprehensive":
                vehicleCoverage = {
                    vehicleId,
                    comprehensiveDeductible: "$500",
                    collisionDeductible: "$500",
                    glassDeductible: true,
                    loanLeasePayoff: false,
                    customPartsEquipment: false
                };
                break;
            case "high-value":
                vehicleCoverage = {
                    vehicleId,
                    comprehensiveDeductible: "$500",
                    collisionDeductible: "$500",
                    glassDeductible: true,
                    loanLeasePayoff: true,
                    customPartsEquipment: true
                };
                break;
            default:
                // Use existing or default
                vehicleCoverage = existing || {
                    vehicleId,
                    comprehensiveDeductible: "$1,000",
                    collisionDeductible: "$1,000",
                    glassDeductible: true,
                    loanLeasePayoff: false,
                    customPartsEquipment: false
                };
        }
        return vehicleCoverage;
    });
    return {
        liability: template.coverage.liability,
        additional: template.coverage.additional,
        vehicleCoverages
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoverageTemplates",
    ()=>CoverageTemplates
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/templates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function CoverageTemplates({ currentCoverage, vehicleIds, onApplyTemplate }) {
    _s();
    const { quoteData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    const [templates, setTemplates] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [isOpen, setIsOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [selectedTemplate, setSelectedTemplate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [showSaveDialog, setShowSaveDialog] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [templateName, setTemplateName] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CoverageTemplates.useEffect": ()=>{
            const loadedTemplates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadTemplates"])();
            // Add imported from ezlynx template if import summary exists
            if (quoteData.importSummary && quoteData.importSummary.missingInfo.length > 0) {
                const importedTemplate = {
                    id: "imported-ezlynx",
                    name: "Imported from ezlynx",
                    description: "Coverage configuration imported from ezlynx aggregator",
                    category: "custom",
                    isDefault: false,
                    coverage: {
                        liability: currentCoverage.liability,
                        additional: currentCoverage.additional,
                        vehicleCoverages: []
                    }
                };
                setTemplates([
                    importedTemplate,
                    ...loadedTemplates
                ]);
            } else {
                setTemplates(loadedTemplates);
            }
        }
    }["CoverageTemplates.useEffect"], [
        quoteData.importSummary,
        currentCoverage
    ]);
    const handleApplyTemplate = ()=>{
        if (!selectedTemplate) return;
        const newCoverage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTemplate"])(selectedTemplate, currentCoverage, vehicleIds);
        onApplyTemplate(newCoverage);
        setIsOpen(false);
        setSelectedTemplate(null);
    };
    const handleSaveAsTemplate = ()=>{
        if (!templateName.trim()) return;
        const newTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCustomTemplate"])({
            name: templateName.trim(),
            description: `Custom template: ${templateName.trim()}`,
            category: "custom",
            isDefault: false,
            coverage: {
                liability: currentCoverage.liability,
                additional: currentCoverage.additional,
                vehicleCoverages: []
            }
        });
        setTemplates((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadTemplates"])());
        setShowSaveDialog(false);
        setTemplateName("");
        setSelectedTemplate(newTemplate);
    };
    const templateCategories = {
        minimum: "Minimum",
        standard: "Standard",
        comprehensive: "Comprehensive",
        "high-value": "High-Value",
        commercial: "Commercial",
        custom: "Custom"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: isOpen,
                onOpenChange: setIsOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                "Templates"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                        className: "max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                        children: "Coverage Templates"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                        children: "Quickly apply pre-configured coverage settings to your quote"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                        children: "Select a template"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: selectedTemplate?.id || "",
                                                        onValueChange: (value)=>{
                                                            const template = templates.find((t)=>t.id === value);
                                                            setSelectedTemplate(template || null);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Choose a template..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                    lineNumber: 137,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 136,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                children: templates.map((template)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: template.id,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-between w-full",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: template.name
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                                    lineNumber: 143,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                template.isDefault && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-muted-foreground ml-2",
                                                                                    children: "Default"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                                    lineNumber: 145,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                template.id === "imported-ezlynx" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-muted-foreground ml-2",
                                                                                    children: "Imported"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                                    lineNumber: 150,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                            lineNumber: 142,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, template.id, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                        lineNumber: 141,
                                                                        columnNumber: 23
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                className: "ml-4 gap-2",
                                                onClick: ()=>setShowSaveDialog(true),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Save as Template"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    selectedTemplate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border rounded-lg p-4 space-y-3 bg-muted/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-sm mb-1",
                                                        children: selectedTemplate.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: selectedTemplate.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 173,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Bodily Injury:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 font-medium",
                                                                children: selectedTemplate.coverage.liability.bodilyInjury
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Property Damage:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 188,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 font-medium",
                                                                children: selectedTemplate.coverage.liability.propertyDamage
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Medical Payments:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 font-medium",
                                                                children: selectedTemplate.coverage.additional.medicalPayments
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 195,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-muted-foreground",
                                                                children: "Uninsured Motorists:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 font-medium",
                                                                children: selectedTemplate.coverage.additional.uninsuredMotoristsBodilyInjury
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                                lineNumber: 201,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            vehicleIds.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-amber-600 dark:text-amber-400",
                                                children: "⚠️ No vehicles added yet. Template will be applied when vehicles are added."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 208,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-end gap-2 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                onClick: ()=>setIsOpen(false),
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 216,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: handleApplyTemplate,
                                                disabled: !selectedTemplate || vehicleIds.length === 0 || selectedTemplate.id === "imported-ezlynx",
                                                children: "Apply Template"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                                lineNumber: 219,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showSaveDialog,
                onOpenChange: setShowSaveDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Save as Template"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Save your current liability and additional coverage settings as a reusable template"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "template-name",
                                            children: "Template Name"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "template-name",
                                            value: templateName,
                                            onChange: (e)=>setTemplateName(e.target.value),
                                            placeholder: "Enter template name...",
                                            onKeyDown: (e)=>{
                                                if (e.key === "Enter" && templateName.trim()) {
                                                    handleSaveAsTemplate();
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end gap-2 pt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>{
                                                setShowSaveDialog(false);
                                                setTemplateName("");
                                            },
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                            lineNumber: 255,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleSaveAsTemplate,
                                            disabled: !templateName.trim(),
                                            children: "Save Template"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(CoverageTemplates, "mGb9eJaihU1ePE9/FpsUBO/vMoc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"]
    ];
});
_c = CoverageTemplates;
var _c;
__turbopack_context__.k.register(_c, "CoverageTemplates");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/state-requirements.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// State-specific coverage requirements and compliance checking
__turbopack_context__.s([
    "STATE_REQUIREMENTS",
    ()=>STATE_REQUIREMENTS,
    "checkCompliance",
    ()=>checkCompliance,
    "extractStateFromAddress",
    ()=>extractStateFromAddress,
    "getStateRequirements",
    ()=>getStateRequirements
]);
const STATE_REQUIREMENTS = {
    CA: {
        state: "CA",
        stateName: "California",
        minimumBodilyInjury: "$15K/$30K",
        minimumPropertyDamage: "$5K",
        requiresUninsuredMotorist: false,
        requiresMedicalPayments: false
    },
    TX: {
        state: "TX",
        stateName: "Texas",
        minimumBodilyInjury: "$30K/$60K",
        minimumPropertyDamage: "$25K",
        requiresUninsuredMotorist: false,
        requiresMedicalPayments: false
    },
    FL: {
        state: "FL",
        stateName: "Florida",
        minimumBodilyInjury: "$10K/$20K",
        minimumPropertyDamage: "$10K",
        requiresUninsuredMotorist: false,
        requiresMedicalPayments: true,
        notes: "Florida requires PIP (Personal Injury Protection) instead of traditional medical payments"
    },
    NY: {
        state: "NY",
        stateName: "New York",
        minimumBodilyInjury: "$25K/$50K",
        minimumPropertyDamage: "$10K",
        requiresUninsuredMotorist: true,
        requiresMedicalPayments: false
    },
    AZ: {
        state: "AZ",
        stateName: "Arizona",
        minimumBodilyInjury: "$15K/$30K",
        minimumPropertyDamage: "$10K",
        requiresUninsuredMotorist: false,
        requiresMedicalPayments: false
    }
};
// Default requirements for states not in database
const DEFAULT_REQUIREMENTS = {
    state: "US",
    stateName: "United States",
    minimumBodilyInjury: "$25K/$50K",
    minimumPropertyDamage: "$25K",
    requiresUninsuredMotorist: false,
    requiresMedicalPayments: false
};
function extractStateFromAddress(address) {
    if (!address) return null;
    // Try to match state abbreviation (2 letters) before ZIP code
    const stateMatch = address.match(/\b([A-Z]{2})\s+\d{5}(?:-\d{4})?\b/);
    if (stateMatch) {
        return stateMatch[1];
    }
    // Try to match state name
    const stateNames = {
        Alabama: "AL",
        Alaska: "AK",
        Arizona: "AZ",
        Arkansas: "AR",
        California: "CA",
        Colorado: "CO",
        Connecticut: "CT",
        Delaware: "DE",
        Florida: "FL",
        Georgia: "GA",
        Hawaii: "HI",
        Idaho: "ID",
        Illinois: "IL",
        Indiana: "IN",
        Iowa: "IA",
        Kansas: "KS",
        Kentucky: "KY",
        Louisiana: "LA",
        Maine: "ME",
        Maryland: "MD",
        Massachusetts: "MA",
        Michigan: "MI",
        Minnesota: "MN",
        Mississippi: "MS",
        Missouri: "MO",
        Montana: "MT",
        Nebraska: "NE",
        Nevada: "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        Ohio: "OH",
        Oklahoma: "OK",
        Oregon: "OR",
        Pennsylvania: "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        Tennessee: "TN",
        Texas: "TX",
        Utah: "UT",
        Vermont: "VT",
        Virginia: "VA",
        Washington: "WA",
        "West Virginia": "WV",
        Wisconsin: "WI",
        Wyoming: "WY",
        "District of Columbia": "DC"
    };
    for (const [name, abbr] of Object.entries(stateNames)){
        if (address.includes(name)) {
            return abbr;
        }
    }
    return null;
}
function getStateRequirements(state) {
    if (!state) return DEFAULT_REQUIREMENTS;
    return STATE_REQUIREMENTS[state.toUpperCase()] || DEFAULT_REQUIREMENTS;
}
// Parse coverage amount (e.g., "$100K/$300K" -> { perPerson: 100000, perAccident: 300000 })
function parseCoverageAmount(amount) {
    const match = amount.match(/\$(\d+)K\/\$(\d+)K/);
    if (match) {
        return {
            perPerson: parseInt(match[1]) * 1000,
            perAccident: parseInt(match[2]) * 1000
        };
    }
    const singleMatch = amount.match(/\$(\d+)K/);
    if (singleMatch) {
        const value = parseInt(singleMatch[1]) * 1000;
        return {
            perPerson: value,
            perAccident: value
        };
    }
    return null;
}
// Compare coverage amounts
function compareCoverage(current, minimum) {
    const currentParsed = parseCoverageAmount(current);
    const minimumParsed = parseCoverageAmount(minimum);
    if (!currentParsed || !minimumParsed) return 0;
    // Compare per-accident amounts (more important)
    if (currentParsed.perAccident > minimumParsed.perAccident) return 1;
    if (currentParsed.perAccident < minimumParsed.perAccident) return -1;
    // If per-accident is equal, compare per-person
    if (currentParsed.perPerson > minimumParsed.perPerson) return 1;
    if (currentParsed.perPerson < minimumParsed.perPerson) return -1;
    return 0;
}
function checkCompliance(coverage, state) {
    const requirements = getStateRequirements(state);
    const issues = [];
    // Check bodily injury
    const biComparison = compareCoverage(coverage.liability.bodilyInjury, requirements.minimumBodilyInjury);
    if (biComparison < 0) {
        issues.push({
            field: "bodilyInjury",
            severity: "error",
            message: `Bodily injury coverage (${coverage.liability.bodilyInjury}) is below ${requirements.stateName} minimum requirement (${requirements.minimumBodilyInjury})`,
            currentValue: coverage.liability.bodilyInjury,
            requiredValue: requirements.minimumBodilyInjury,
            autoFix: {
                action: "Increase to minimum",
                newValue: requirements.minimumBodilyInjury
            }
        });
    }
    // Check property damage
    const pdComparison = compareCoverage(coverage.liability.propertyDamage, requirements.minimumPropertyDamage);
    if (pdComparison < 0) {
        issues.push({
            field: "propertyDamage",
            severity: "error",
            message: `Property damage coverage (${coverage.liability.propertyDamage}) is below ${requirements.stateName} minimum requirement (${requirements.minimumPropertyDamage})`,
            currentValue: coverage.liability.propertyDamage,
            requiredValue: requirements.minimumPropertyDamage,
            autoFix: {
                action: "Increase to minimum",
                newValue: requirements.minimumPropertyDamage
            }
        });
    }
    // Check uninsured motorist requirement
    if (requirements.requiresUninsuredMotorist && coverage.additional.uninsuredMotoristsBodilyInjury === "Not Included") {
        issues.push({
            field: "uninsuredMotoristsBodilyInjury",
            severity: "error",
            message: `${requirements.stateName} requires uninsured motorist coverage`,
            currentValue: "Not Included",
            requiredValue: "Required",
            autoFix: {
                action: "Add uninsured motorist coverage",
                newValue: requirements.minimumBodilyInjury
            }
        });
    }
    // Check medical payments requirement
    if (requirements.requiresMedicalPayments && coverage.additional.medicalPayments === "Not Included") {
        issues.push({
            field: "medicalPayments",
            severity: "error",
            message: `${requirements.stateName} requires medical payments coverage`,
            currentValue: "Not Included",
            requiredValue: "Required",
            autoFix: {
                action: "Add medical payments coverage",
                newValue: "$5K"
            }
        });
    }
    return {
        isCompliant: issues.length === 0,
        issues
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StateRequirementsPanel",
    ()=>StateRequirementsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/collapsible.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/state-requirements.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function StateRequirementsPanel({ coverage, onFixIssue }) {
    _s();
    const { quoteData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    const [isExpanded, setIsExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    // Determine state from client info
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StateRequirementsPanel.useMemo[state]": ()=>{
            if (quoteData.clientInfo?.driversLicenseState) {
                return quoteData.clientInfo.driversLicenseState;
            }
            if (quoteData.clientInfo?.address) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractStateFromAddress"])(quoteData.clientInfo.address);
            }
            return null;
        }
    }["StateRequirementsPanel.useMemo[state]"], [
        quoteData.clientInfo
    ]);
    const requirements = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StateRequirementsPanel.useMemo[requirements]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStateRequirements"])(state);
        }
    }["StateRequirementsPanel.useMemo[requirements]"], [
        state
    ]);
    const compliance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "StateRequirementsPanel.useMemo[compliance]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkCompliance"])(coverage, state);
        }
    }["StateRequirementsPanel.useMemo[compliance]"], [
        coverage,
        state
    ]);
    if (!state) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-muted/30 text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                    className: "h-3.5 w-3.5 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-muted-foreground",
                    children: "Add client address or driver's license state to check compliance"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    // Compact compliant view
    if (compliance.isCompliant && !isExpanded) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
            open: isExpanded,
            onOpenChange: setIsExpanded,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 px-3 py-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                            className: "h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex items-center gap-2 flex-wrap text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-green-900 dark:text-green-100",
                                    children: [
                                        requirements.stateName,
                                        " Requirements Met"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-700 dark:text-green-300",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-700 dark:text-green-300",
                                    children: [
                                        "BI: ",
                                        coverage.liability.bodilyInjury,
                                        " ✓"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-700 dark:text-green-300",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-700 dark:text-green-300",
                                    children: [
                                        "PD: ",
                                        coverage.liability.propertyDamage,
                                        " ✓"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                            asChild: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "h-6 px-2 text-xs",
                                children: [
                                    "Details",
                                    isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 84,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                    className: "mt-2 px-3 py-2 rounded-md border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10 text-sm",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium text-xs text-green-900 dark:text-green-100",
                                children: "Minimum Required:"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-green-700 dark:text-green-300 space-y-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Bodily Injury: ",
                                            requirements.minimumBodilyInjury
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Property Damage: ",
                                            requirements.minimumPropertyDamage
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    requirements.requiresUninsuredMotorist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Uninsured Motorist: Required"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 98,
                                        columnNumber: 17
                                    }, this),
                                    requirements.requiresMedicalPayments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Medical Payments: Required"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            requirements.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-green-600 dark:text-green-400 italic pt-1",
                                children: [
                                    "Note: ",
                                    requirements.notes
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
            lineNumber: 62,
            columnNumber: 7
        }, this);
    }
    // Non-compliant or expanded view
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
        open: isExpanded,
        onOpenChange: setIsExpanded,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-2 rounded-md border", compliance.isCompliant ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20" : "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"),
                children: [
                    compliance.isCompliant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "h-3.5 w-3.5 text-green-600 dark:text-green-400 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center gap-2 flex-wrap text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", compliance.isCompliant ? "text-green-900 dark:text-green-100" : "text-amber-900 dark:text-amber-100"),
                            children: [
                                requirements.stateName,
                                " Requirements",
                                compliance.issues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "destructive",
                                    className: "ml-2 h-4 px-1.5 text-xs",
                                    children: [
                                        compliance.issues.length,
                                        " issue",
                                        compliance.issues.length > 1 ? "s" : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    compliance.issues.length > 0 && compliance.issues[0].autoFix && onFixIssue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        className: "h-6 px-2 text-xs",
                        onClick: ()=>onFixIssue(compliance.issues[0].field, compliance.issues[0].autoFix.newValue),
                        children: "Fix"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            className: "h-6 px-2 text-xs",
                            children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Hide",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Details",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                className: "mt-2 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-3 py-2 rounded-md border border-border bg-background/50 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-medium mb-1.5 text-xs",
                                children: "Minimum Required:"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground space-y-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Bodily Injury: ",
                                            requirements.minimumBodilyInjury
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "Property Damage: ",
                                            requirements.minimumPropertyDamage
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    requirements.requiresUninsuredMotorist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Uninsured Motorist: Required"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    requirements.requiresMedicalPayments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "Medical Payments: Required"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    compliance.issues.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: compliance.issues.map((issue)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-medium mb-1 text-xs",
                                        children: issue.message
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this),
                                    issue.autoFix && onFixIssue && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-6 px-2 text-xs mt-1",
                                        onClick: ()=>onFixIssue(issue.field, issue.autoFix.newValue),
                                        children: issue.autoFix.action
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                        lineNumber: 199,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, issue.field, true, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this),
                    requirements.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-muted-foreground italic px-3",
                        children: [
                            "Note: ",
                            requirements.notes
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(StateRequirementsPanel, "ZX3QEz04xRsfS4nph4yr0ICAfsg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"]
    ];
});
_c = StateRequirementsPanel;
var _c;
__turbopack_context__.k.register(_c, "StateRequirementsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Coverage validation and warnings
__turbopack_context__.s([
    "validateCoverage",
    ()=>validateCoverage
]);
// Calculate vehicle value (rough estimate based on year, make, model)
function estimateVehicleValue(vehicle) {
    // Very rough estimation - in production, this would use actual valuation APIs
    const currentYear = new Date().getFullYear();
    const vehicleYear = vehicle.year ? parseInt(vehicle.year, 10) : currentYear;
    const age = currentYear - vehicleYear;
    // Base value assumptions (very rough)
    const baseValues = {
        tesla: 45000,
        bmw: 35000,
        mercedes: 40000,
        audi: 35000,
        lexus: 40000,
        porsche: 60000
    };
    const makeLower = vehicle.make?.toLowerCase() || "";
    let baseValue = 25000 // Default
    ;
    for (const [brand, value] of Object.entries(baseValues)){
        if (makeLower.includes(brand)) {
            baseValue = value;
            break;
        }
    }
    // Depreciation: ~15% per year
    const depreciation = Math.max(0, 1 - age * 0.15);
    return Math.round(baseValue * depreciation);
}
// Parse property damage amount
function parsePropertyDamage(amount) {
    const match = amount.match(/\$(\d+)K/);
    if (match) {
        return parseInt(match[1]) * 1000;
    }
    return 0;
}
function validateCoverage(coverage, vehicles) {
    const warnings = [];
    // Check if property damage is adequate for vehicle values
    const propertyDamageLimit = parsePropertyDamage(coverage.liability.propertyDamage);
    for (const vehicle of vehicles){
        const vehicleValue = estimateVehicleValue(vehicle);
        const vehicleCoverage = coverage.vehicleCoverages.find((vc)=>vc.vehicleId === vehicle.id);
        if (!vehicleCoverage) {
            warnings.push({
                id: `missing-coverage-${vehicle.id}`,
                severity: "error",
                message: `No coverage configuration found for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
                vehicleId: vehicle.id
            });
            continue;
        }
        // Check if property damage is lower than vehicle value
        if (propertyDamageLimit > 0 && vehicleValue > propertyDamageLimit) {
            warnings.push({
                id: `low-property-damage-${vehicle.id}`,
                severity: "warning",
                message: `Vehicle value ($${vehicleValue.toLocaleString()}) exceeds property damage limit (${coverage.liability.propertyDamage}). Consider increasing coverage.`,
                field: "propertyDamage",
                vehicleId: vehicle.id,
                autoFix: {
                    action: "Increase property damage",
                    newValue: `$${Math.ceil(vehicleValue / 1000)}K`
                }
            });
        }
        // Check for high-value vehicles without gap insurance
        if (vehicleValue > 30000 && !vehicleCoverage.loanLeasePayoff) {
            warnings.push({
                id: `gap-insurance-${vehicle.id}`,
                severity: "info",
                message: `High-value vehicle detected. Gap insurance recommended for better protection.`,
                field: "loanLeasePayoff",
                vehicleId: vehicle.id,
                autoFix: {
                    action: "Add gap insurance",
                    newValue: true
                }
            });
        }
        // Check for new vehicles without rental reimbursement
        const currentYear = new Date().getFullYear();
        const vehicleYear = vehicle.year ? parseInt(vehicle.year, 10) : 0;
        if (vehicle.year && vehicleYear >= currentYear - 2 && !vehicleCoverage.rentalReimbursement) {
            warnings.push({
                id: `rental-reimbursement-${vehicle.id}`,
                severity: "info",
                message: `Newer vehicle detected. Rental reimbursement recommended during repairs.`,
                field: "rentalReimbursement",
                vehicleId: vehicle.id,
                autoFix: {
                    action: "Add rental reimbursement",
                    newValue: true
                }
            });
        }
        // Check for low comprehensive deductible on high-value vehicles
        if (vehicleValue > 40000) {
            const deductibleMatch = vehicleCoverage.comprehensiveDeductible.match(/\$(\d+),?(\d+)?/);
            if (deductibleMatch) {
                const deductible = parseInt(deductibleMatch[1] + (deductibleMatch[2] || ""));
                if (deductible > 1000) {
                    warnings.push({
                        id: `high-deductible-${vehicle.id}`,
                        severity: "info",
                        message: `High-value vehicle with high deductible. Consider lower deductible for better protection.`,
                        field: "comprehensiveDeductible",
                        vehicleId: vehicle.id
                    });
                }
            }
        }
    }
    // Check for missing uninsured motorist coverage
    if (coverage.additional.uninsuredMotoristsBodilyInjury === "Not Included") {
        warnings.push({
            id: "missing-uninsured-motorist",
            severity: "warning",
            message: "Uninsured motorist coverage is not included. Recommended for better protection.",
            field: "uninsuredMotoristsBodilyInjury",
            autoFix: {
                action: "Add uninsured motorist coverage",
                newValue: coverage.liability.bodilyInjury
            }
        });
    }
    // Check for low bodily injury limits
    const biMatch = coverage.liability.bodilyInjury.match(/\$(\d+)K\/\$(\d+)K/);
    if (biMatch) {
        const perPerson = parseInt(biMatch[1]) * 1000;
        const perAccident = parseInt(biMatch[2]) * 1000;
        if (perAccident < 100000) {
            warnings.push({
                id: "low-bodily-injury",
                severity: "warning",
                message: "Bodily injury limits are relatively low. Consider higher limits for better protection.",
                field: "bodilyInjury"
            });
        }
        // Check if Property Damage exceeds BI per-person amount
        const pdMatch = coverage.liability.propertyDamage.match(/\$(\d+)K/);
        if (pdMatch) {
            const pdAmount = parseInt(pdMatch[1]) * 1000;
            if (pdAmount > perPerson) {
                warnings.push({
                    id: "property-damage-exceeds-bi",
                    severity: "warning",
                    message: `Property Damage (${coverage.liability.propertyDamage}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Property Damage.`,
                    field: "propertyDamage",
                    autoFix: {
                        action: "Increase Bodily Injury to match Property Damage",
                        newValue: `$${pdMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(pdMatch[1]) * 2)}K`
                    }
                });
            }
        }
        // Check if Uninsured Motorists exceeds BI per-person amount
        if (coverage.additional.uninsuredMotoristsBodilyInjury !== "Not Included") {
            const umMatch = coverage.additional.uninsuredMotoristsBodilyInjury.match(/\$(\d+)K\/\$(\d+)K/);
            if (umMatch) {
                const umPerPerson = parseInt(umMatch[1]) * 1000;
                if (umPerPerson > perPerson) {
                    warnings.push({
                        id: "um-exceeds-bi",
                        severity: "warning",
                        message: `Uninsured Motorists Bodily Injury (${coverage.additional.uninsuredMotoristsBodilyInjury}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Uninsured Motorists.`,
                        field: "uninsuredMotoristsBodilyInjury",
                        autoFix: {
                            action: "Increase Bodily Injury to match Uninsured Motorists",
                            newValue: `$${umMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(umMatch[2]))}K`
                        }
                    });
                }
            }
        }
        // Check if Underinsured Motorists exceeds BI per-person amount
        if (coverage.additional.underinsuredMotoristsBodilyInjury && coverage.additional.underinsuredMotoristsBodilyInjury !== "Not Included") {
            const uimMatch = coverage.additional.underinsuredMotoristsBodilyInjury.match(/\$(\d+)K\/\$(\d+)K/);
            if (uimMatch) {
                const uimPerPerson = parseInt(uimMatch[1]) * 1000;
                if (uimPerPerson > perPerson) {
                    warnings.push({
                        id: "uim-exceeds-bi",
                        severity: "warning",
                        message: `Underinsured Motorists Bodily Injury (${coverage.additional.underinsuredMotoristsBodilyInjury}) exceeds Bodily Injury per-person limit ($${biMatch[1]}K). Consider increasing Bodily Injury coverage to match or exceed Underinsured Motorists.`,
                        field: "underinsuredMotoristsBodilyInjury",
                        autoFix: {
                            action: "Increase Bodily Injury to match Underinsured Motorists",
                            newValue: `$${uimMatch[1]}K/$${Math.max(parseInt(biMatch[2]), parseInt(uimMatch[2]))}K`
                        }
                    });
                }
            }
        }
    }
    return warnings;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoverageWarnings",
    ()=>CoverageWarnings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/collapsible.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function CoverageWarnings({ coverage, vehicles, onFixWarning, onDismissWarning }) {
    _s();
    const [dismissedWarnings, setDismissedWarnings] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [isExpanded, setIsExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const warnings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CoverageWarnings.useMemo[warnings]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCoverage"])(coverage, vehicles);
        }
    }["CoverageWarnings.useMemo[warnings]"], [
        coverage,
        vehicles
    ]);
    const visibleWarnings = warnings.filter((w)=>!dismissedWarnings.has(w.id));
    const handleDismiss = (warningId)=>{
        setDismissedWarnings((prev)=>new Set(prev).add(warningId));
        onDismissWarning?.(warningId);
    };
    const handleFix = (warning)=>{
        onFixWarning?.(warning);
    };
    const handleFixAll = ()=>{
        visibleWarnings.forEach((warning)=>{
            if (warning.autoFix) {
                handleFix(warning);
            }
        });
    };
    if (visibleWarnings.length === 0) {
        return null;
    }
    const errors = visibleWarnings.filter((w)=>w.severity === "error");
    const warningsOnly = visibleWarnings.filter((w)=>w.severity === "warning");
    const infoOnly = visibleWarnings.filter((w)=>w.severity === "info");
    const fixableWarnings = visibleWarnings.filter((w)=>w.autoFix);
    const getSeverityColor = ()=>{
        if (errors.length > 0) return "red";
        if (warningsOnly.length > 0) return "amber";
        return "blue";
    };
    const severityColor = getSeverityColor();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Collapsible"], {
        open: isExpanded,
        onOpenChange: setIsExpanded,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 px-3 py-2 rounded-md border text-sm", severityColor === "red" && "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20", severityColor === "amber" && "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20", severityColor === "blue" && "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-3.5 w-3.5 flex-shrink-0", severityColor === "red" && "text-red-600 dark:text-red-400", severityColor === "amber" && "text-amber-600 dark:text-amber-400", severityColor === "blue" && "text-blue-600 dark:text-blue-400")
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center gap-2 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-medium", severityColor === "red" && "text-red-900 dark:text-red-100", severityColor === "amber" && "text-amber-900 dark:text-amber-100", severityColor === "blue" && "text-blue-900 dark:text-blue-100"),
                                children: "Coverage Warnings"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "destructive",
                                className: "h-4 px-1.5 text-xs",
                                children: errors.length
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            warningsOnly.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 px-1.5 text-xs", severityColor === "amber" && "border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"),
                                children: warningsOnly.length
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            infoOnly.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 px-1.5 text-xs", severityColor === "blue" && "border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"),
                                children: infoOnly.length
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    fixableWarnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        className: "h-6 px-2 text-xs",
                        onClick: handleFixAll,
                        children: "Fix All"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleTrigger"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            className: "h-6 px-2 text-xs",
                            children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Hide",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                        lineNumber: 150,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    "Details",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "h-3 w-3 ml-1"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$collapsible$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CollapsibleContent"], {
                className: "mt-2 space-y-1.5",
                children: visibleWarnings.map((warning)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3 py-2 rounded-md border text-sm", warning.severity === "error" && "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10", warning.severity === "warning" && "border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10", warning.severity === "info" && "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex items-start gap-2",
                                    children: [
                                        warning.severity === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "h-3.5 w-3.5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 178,
                                            columnNumber: 19
                                        }, this),
                                        warning.severity === "warning" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "h-3.5 w-3.5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 181,
                                            columnNumber: 19
                                        }, this),
                                        warning.severity === "info" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            className: "h-3.5 w-3.5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 184,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium flex-1",
                                            children: warning.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 186,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        warning.autoFix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            className: "h-6 px-2 text-xs",
                                            onClick: ()=>handleFix(warning),
                                            children: warning.autoFix.action
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            className: "h-6 w-6 p-0",
                                            onClick: ()=>handleDismiss(warning.id),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    }, warning.id, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(CoverageWarnings, "pt6x/EseRastva6JI5o9+G5CPC0=");
_c = CoverageWarnings;
var _c;
__turbopack_context__.k.register(_c, "CoverageWarnings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CoverageForm",
    ()=>CoverageForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$liability$2d$coverage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/liability-coverage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$vehicle$2d$coverage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/vehicle-coverage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$summary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/pricing-summary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$coverage$2d$templates$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/coverage-templates.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/state-requirements-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$coverage$2d$warnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/coverage/coverage-warnings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
// Default coverage values
const DEFAULT_LIABILITY = {
    bodilyInjury: "$100K/$300K",
    propertyDamage: "$100K"
};
const DEFAULT_ADDITIONAL = {
    medicalPayments: "Not Included",
    uninsuredMotoristsBodilyInjury: "Not Included",
    underinsuredMotoristsBodilyInjury: "Not Included",
    roadsideAssistance: false
};
const DEFAULT_PRICING = {
    selectedPlanId: "novo-next",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    paymentFrequency: "Monthly",
    monthlyPrice: 124,
    totalForPeriod: 744,
    downPayment: 248
};
function CoverageForm() {
    _s();
    const { quoteData, updateCoverage, updatePricing, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    const vehicles = quoteData.vehicles || [];
    // Initialize coverage data from context or defaults
    const [coverage, setCoverage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "CoverageForm.useState": ()=>{
            if (quoteData.coverage) {
                return quoteData.coverage;
            }
            // Initialize vehicle coverages for existing vehicles
            const vehicleCoverages = vehicles.map({
                "CoverageForm.useState.vehicleCoverages": (vehicle)=>({
                        vehicleId: vehicle.id,
                        comprehensiveDeductible: "$1,000",
                        collisionDeductible: "$1,000",
                        glassDeductible: true,
                        loanLeasePayoff: false,
                        customPartsEquipment: false,
                        customPartsAmount: 0
                    })
            }["CoverageForm.useState.vehicleCoverages"]);
            return {
                liability: DEFAULT_LIABILITY,
                additional: DEFAULT_ADDITIONAL,
                vehicleCoverages
            };
        }
    }["CoverageForm.useState"]);
    const [pricing, setPricing] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "CoverageForm.useState": ()=>{
            return quoteData.pricing || DEFAULT_PRICING;
        }
    }["CoverageForm.useState"]);
    // Update vehicle coverages when vehicles change
    const vehicleIdsString = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "CoverageForm.useMemo[vehicleIdsString]": ()=>vehicles.map({
                "CoverageForm.useMemo[vehicleIdsString]": (v)=>v.id
            }["CoverageForm.useMemo[vehicleIdsString]"]).join(",")
    }["CoverageForm.useMemo[vehicleIdsString]"], [
        vehicles
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "CoverageForm.useEffect": ()=>{
            const existingVehicleIds = new Set(coverage.vehicleCoverages.map({
                "CoverageForm.useEffect": (vc)=>vc.vehicleId
            }["CoverageForm.useEffect"]));
            const currentVehicleIds = new Set(vehicles.map({
                "CoverageForm.useEffect": (v)=>v.id
            }["CoverageForm.useEffect"]));
            // Add coverage for new vehicles
            const newVehicles = vehicles.filter({
                "CoverageForm.useEffect.newVehicles": (v)=>!existingVehicleIds.has(v.id)
            }["CoverageForm.useEffect.newVehicles"]);
            if (newVehicles.length > 0) {
                const newVehicleCoverages = newVehicles.map({
                    "CoverageForm.useEffect.newVehicleCoverages": (vehicle)=>({
                            vehicleId: vehicle.id,
                            comprehensiveDeductible: "$1,000",
                            collisionDeductible: "$1,000",
                            glassDeductible: true,
                            loanLeasePayoff: false,
                            customPartsEquipment: false,
                            customPartsAmount: 0
                        })
                }["CoverageForm.useEffect.newVehicleCoverages"]);
                setCoverage({
                    "CoverageForm.useEffect": (prev)=>({
                            ...prev,
                            vehicleCoverages: [
                                ...prev.vehicleCoverages,
                                ...newVehicleCoverages
                            ]
                        })
                }["CoverageForm.useEffect"]);
            }
            // Remove coverage for deleted vehicles
            const removedVehicleIds = Array.from(existingVehicleIds).filter({
                "CoverageForm.useEffect.removedVehicleIds": (id)=>!currentVehicleIds.has(id)
            }["CoverageForm.useEffect.removedVehicleIds"]);
            if (removedVehicleIds.length > 0) {
                setCoverage({
                    "CoverageForm.useEffect": (prev)=>({
                            ...prev,
                            vehicleCoverages: prev.vehicleCoverages.filter({
                                "CoverageForm.useEffect": (vc)=>!removedVehicleIds.includes(vc.vehicleId)
                            }["CoverageForm.useEffect"])
                        })
                }["CoverageForm.useEffect"]);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CoverageForm.useEffect"], [
        vehicleIdsString
    ]); // Sync when vehicle IDs change
    // Auto-save coverage data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: coverage,
        saveFn: {
            "CoverageForm.useAutoSave": async (data)=>{
                updateCoverage(data);
                await saveQuote();
            }
        }["CoverageForm.useAutoSave"],
        debounceMs: 2000,
        enabled: true
    });
    // Auto-save pricing data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: pricing,
        saveFn: {
            "CoverageForm.useAutoSave": async (data)=>{
                updatePricing(data);
                await saveQuote();
            }
        }["CoverageForm.useAutoSave"],
        debounceMs: 2000,
        enabled: true
    });
    const handleLiabilityChange = (field, value)=>{
        setCoverage((prev)=>({
                ...prev,
                liability: {
                    ...prev.liability,
                    [field]: value
                }
            }));
    };
    const handleAdditionalChange = (field, value)=>{
        setCoverage((prev)=>({
                ...prev,
                additional: {
                    ...prev.additional,
                    [field]: value
                }
            }));
    };
    const handleVehicleCoverageChange = (vehicleId, field, value)=>{
        setCoverage((prev)=>({
                ...prev,
                vehicleCoverages: prev.vehicleCoverages.map((vc)=>vc.vehicleId === vehicleId ? {
                        ...vc,
                        [field]: value
                    } : vc)
            }));
    };
    const handlePricingChange = (field, value)=>{
        setPricing((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleCollectPayment = ()=>{
        console.log("Collecting payment and binding policy...");
    // TODO: Implement payment collection
    };
    const handleDownloadPDF = ()=>{
        console.log("Downloading quote as PDF...");
    // TODO: Implement PDF generation
    };
    const handleApplyTemplate = (newCoverage)=>{
        setCoverage(newCoverage);
    };
    const handleFixStateIssue = (field, newValue)=>{
        if (field === "bodilyInjury" || field === "propertyDamage") {
            handleLiabilityChange(field, newValue);
        } else if (field === "medicalPayments" || field === "uninsuredMotoristsBodilyInjury") {
            handleAdditionalChange(field, newValue);
        }
    };
    const handleFixWarning = (warning)=>{
        if (warning.autoFix) {
            if (warning.field === "propertyDamage" || warning.field === "bodilyInjury") {
                handleLiabilityChange(warning.field, warning.autoFix.newValue);
            } else if (warning.field && warning.vehicleId) {
                // Vehicle-specific warning
                handleVehicleCoverageChange(warning.vehicleId, warning.field, warning.autoFix.newValue);
            } else if (warning.field === "uninsuredMotoristsBodilyInjury") {
                handleAdditionalChange("uninsuredMotoristsBodilyInjury", warning.autoFix.newValue);
            }
        }
    };
    const vehicleIds = vehicles.map((v)=>v.id);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: "Coverage Configuration"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$coverage$2d$templates$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageTemplates"], {
                        currentCoverage: coverage,
                        vehicleIds: vehicleIds,
                        onApplyTemplate: handleApplyTemplate
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$state$2d$requirements$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateRequirementsPanel"], {
                        coverage: coverage,
                        onFixIssue: handleFixStateIssue
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$coverage$2d$warnings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CoverageWarnings"], {
                        coverage: coverage,
                        vehicles: vehicles,
                        onFixWarning: handleFixWarning
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$liability$2d$coverage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiabilityCoverageSection"], {
                        liability: coverage.liability,
                        additional: coverage.additional,
                        currentCoverage: coverage,
                        pricing: pricing,
                        onLiabilityChange: handleLiabilityChange,
                        onAdditionalChange: handleAdditionalChange
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:sticky lg:top-6 self-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$pricing$2d$summary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PricingSummarySection"], {
                            coverage: coverage,
                            pricing: pricing,
                            onPricingChange: handlePricingChange,
                            onCollectPayment: handleCollectPayment,
                            onDownloadPDF: handleDownloadPDF
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$coverage$2f$vehicle$2d$coverage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleCoverageSection"], {
                    vehicles: vehicles,
                    vehicleCoverages: coverage.vehicleCoverages,
                    onVehicleCoverageChange: handleVehicleCoverageChange,
                    onBulkUpdate: (vehicleIds, field, value)=>{
                        vehicleIds.forEach((id)=>{
                            handleVehicleCoverageChange(id, field, value);
                        });
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/coverage/coverage-form.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_s(CoverageForm, "5XdeULAdMpZZpvdQDEI1trFYAXY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"]
    ];
});
_c = CoverageForm;
var _c;
__turbopack_context__.k.register(_c, "CoverageForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_portal_src_screens_components_coverage_cfea3378._.js.map