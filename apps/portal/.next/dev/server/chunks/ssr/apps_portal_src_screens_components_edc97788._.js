module.exports = [
"[project]/apps/portal/src/screens/components/quote-save-status.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteSaveStatus",
    ()=>QuoteSaveStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function QuoteSaveStatus({ isSaving, lastSaved, error, onRetry, className }) {
    const [showSaved, setShowSaved] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    // Show "Saved" indicator briefly after successful save
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!isSaving && lastSaved && !error) {
            setShowSaved(true);
            const timer = setTimeout(()=>{
                setShowSaved(false);
            }, 2000);
            return ()=>clearTimeout(timer);
        }
    }, [
        isSaving,
        lastSaved,
        error
    ]);
    // Don't show anything if idle and no recent save
    if (!isSaving && !showSaved && !error) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm", className),
        children: [
            isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-4 w-4 animate-spin text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        style: {
                            fontFamily: "Inter, sans-serif"
                        },
                        children: "Saving..."
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            showSaved && !isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        className: "h-4 w-4 text-green-600 dark:text-green-400"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        style: {
                            fontFamily: "Inter, sans-serif"
                        },
                        children: "Saved"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            error && !isSaving && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "h-4 w-4 text-destructive"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-destructive",
                        style: {
                            fontFamily: "Inter, sans-serif"
                        },
                        children: "Save failed"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        onClick: onRetry,
                        className: "h-6 px-2 text-xs",
                        disabled: isSaving,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-3 w-3 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            "Retry"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quote-save-status.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quote-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteHeader",
    ()=>QuoteHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$save$2d$status$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quote-save-status.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function QuoteHeader() {
    const { isSaving, lastSaved, saveError, retrySave, quoteData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    const quoteTitle = quoteData.isImported && quoteData.ezlynxQuoteNumber ? `${quoteData.clientInfo?.firstName || ""} ${quoteData.clientInfo?.lastName || ""}'s Quote`.trim() || "Imported Quote" : "New Quote";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-4 flex items-center justify-between",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-semibold leading-none tracking-[-0.48px] text-foreground",
                style: {
                    fontFamily: "Geist, sans-serif"
                },
                children: quoteTitle
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quote-header.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$save$2d$status$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuoteSaveStatus"], {
                    isSaving: isSaving,
                    lastSaved: lastSaved,
                    error: saveError,
                    onRetry: retrySave
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quote-header.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quote-header.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quote-header.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quote-steps.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findActiveGroup",
    ()=>findActiveGroup,
    "getQuoteNavigation",
    ()=>getQuoteNavigation,
    "getQuoteProgressSteps",
    ()=>getQuoteProgressSteps
]);
const householdChildren = [
    {
        id: "vehicle",
        label: "Vehicles"
    },
    {
        id: "driver",
        label: "Drivers"
    },
    {
        id: "incidents",
        label: "Incidents"
    },
    {
        id: "reports",
        label: "Reports"
    }
];
const bindChildren = [
    {
        id: "payment",
        label: "Payment"
    },
    {
        id: "e-sign",
        label: "E-Sign"
    }
];
const importSummaryGroup = {
    id: "import-summary",
    label: "Import summary",
    primaryStepId: "import-summary"
};
const basicInfoGroup = {
    id: "basic-info",
    label: "Basic information",
    primaryStepId: "client-info"
};
const householdGroup = {
    id: "household",
    label: "Household",
    primaryStepId: "vehicle",
    children: householdChildren
};
const coveragesGroup = {
    id: "coverages",
    label: "Coverages",
    primaryStepId: "coverage"
};
const bindGroup = {
    id: "bind",
    label: "Bind",
    primaryStepId: "payment",
    children: bindChildren
};
function getQuoteNavigation({ isImported }) {
    if (isImported) {
        return [
            importSummaryGroup,
            householdGroup,
            coveragesGroup,
            bindGroup
        ];
    }
    return [
        basicInfoGroup,
        householdGroup,
        coveragesGroup,
        bindGroup
    ];
}
function getQuoteProgressSteps({ isImported }) {
    const groups = getQuoteNavigation({
        isImported
    });
    return groups.flatMap((group)=>{
        if (group.children && group.children.length > 0) {
            return group.children;
        }
        return [
            {
                id: group.primaryStepId,
                label: group.label
            }
        ];
    });
}
function findActiveGroup(groups, currentStep) {
    if (!currentStep) return undefined;
    return groups.find((group)=>{
        if (group.primaryStepId === currentStep) return true;
        return group.children?.some((child)=>child.id === currentStep);
    });
}
}),
"[project]/apps/portal/src/screens/components/quote-progress.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteProgress",
    ()=>QuoteProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$steps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quote-steps.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function QuoteProgress({ currentStep = "client-info", onStepChange }) {
    const { quoteData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    const activeTabRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const [indicatorStyle, setIndicatorStyle] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        left: 0,
        width: 0
    });
    const isImported = quoteData.isImported;
    const hasUncheckedItems = quoteData.importSummary?.missingInfo.some((item)=>!item.checked) ?? false;
    // Calculate indicator position when active tab changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (activeTabRef.current) {
            const { offsetLeft, offsetWidth } = activeTabRef.current;
            setIndicatorStyle({
                left: offsetLeft,
                width: offsetWidth
            });
        }
    }, [
        currentStep
    ]);
    // Handle window resize
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const handleResize = ()=>{
            if (activeTabRef.current) {
                const { offsetLeft, offsetWidth } = activeTabRef.current;
                setIndicatorStyle({
                    left: offsetLeft,
                    width: offsetWidth
                });
            }
        };
        window.addEventListener("resize", handleResize);
        return ()=>window.removeEventListener("resize", handleResize);
    }, [
        currentStep
    ]);
    const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$steps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQuoteNavigation"])({
        isImported
    });
    const activeGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$steps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findActiveGroup"])(groups, currentStep) ?? groups[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sticky top-0 z-20 mb-8 flex w-full flex-col gap-4 bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center gap-0 border-b border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-in-out",
                        style: {
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`,
                            transform: "translateZ(0)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    groups.map((group)=>{
                        const isActive = group.id === activeGroup?.id;
                        const showWarning = group.id === "import-summary" && hasUncheckedItems;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            ref: isActive ? activeTabRef : null,
                            onClick: ()=>onStepChange?.(group.primaryStepId),
                            role: "tab",
                            "aria-selected": isActive,
                            "aria-current": isActive ? "page" : undefined,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all duration-200 ease-out", "hover:bg-muted/50 hover:text-foreground hover:scale-[1.01]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "active:scale-[0.99]", isActive ? "text-foreground font-semibold" : "text-muted-foreground bg-transparent"),
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: [
                                group.label,
                                showWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                    className: "h-4 w-4 text-amber-500"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, group.id, true, {
                            fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            activeGroup?.children && activeGroup.children.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-1",
                children: activeGroup.children.map((child)=>{
                    const isChildActive = child.id === currentStep;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onStepChange?.(child.id),
                        role: "tab",
                        "aria-selected": isChildActive,
                        "aria-current": isChildActive ? "page" : undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", isChildActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"),
                        children: child.label
                    }, child.id, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                        lineNumber: 112,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quote-progress.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/incidents/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INCIDENT_SOURCE_OPTIONS",
    ()=>INCIDENT_SOURCE_OPTIONS,
    "INCIDENT_TYPE_OPTIONS",
    ()=>INCIDENT_TYPE_OPTIONS,
    "createEmptyIncident",
    ()=>createEmptyIncident
]);
const INCIDENT_TYPE_OPTIONS = [
    "Accident",
    "Violation",
    "Claim",
    "Other"
];
const INCIDENT_SOURCE_OPTIONS = [
    "Self Reported",
    "Police Report",
    "Carrier Reported",
    "Other"
];
function createEmptyIncident() {
    return {
        id: `incident-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        incidentType: "",
        incidentDate: "",
        source: "Self Reported",
        driverId: "",
        totalDamagesOver1000: false,
        atFault: false,
        policeReportFiled: false
    };
}
}),
"[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IncidentsPage",
    ()=>IncidentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/radio-group.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$incidents$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/incidents/types.ts [app-ssr] (ecmascript)");
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
const getYesNoValue = (value)=>value ? "yes" : "no";
function IncidentsPage() {
    const { quoteData, updateIncidents, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    const [incidents, setIncidents] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>{
        if (quoteData.incidents && quoteData.incidents.length > 0) {
            return quoteData.incidents;
        }
        return [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$incidents$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmptyIncident"])()
        ];
    });
    const hasInitialized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!hasInitialized.current && quoteData.incidents && quoteData.incidents.length > 0) {
            setIncidents(quoteData.incidents);
            hasInitialized.current = true;
        }
    }, [
        quoteData.incidents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: incidents,
        saveFn: async (data)=>{
            updateIncidents(data);
            await saveQuote();
        },
        debounceMs: 2000,
        enabled: incidents.length > 0
    });
    const updateIncident = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((id, updates)=>{
        setIncidents((prev)=>prev.map((incident)=>incident.id === id ? {
                    ...incident,
                    ...updates
                } : incident));
    }, []);
    const updateBooleanField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((id, field, value)=>{
        updateIncident(id, {
            [field]: value === "yes"
        });
    }, [
        updateIncident
    ]);
    const handleRemoveIncident = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((id)=>{
        setIncidents((prev)=>{
            const next = prev.filter((incident)=>incident.id !== id);
            return next.length > 0 ? next : [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$incidents$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createEmptyIncident"])()
            ];
        });
    }, []);
    const drivers = quoteData.drivers ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "overflow-hidden rounded-lg border border-border bg-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-[minmax(170px,1.1fr)_minmax(150px,0.9fr)_minmax(170px,1fr)_minmax(170px,1.1fr)_minmax(220px,1.2fr)_minmax(150px,0.8fr)_minmax(190px,1fr)_56px] border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Incident type"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Incident date"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Source"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Driver"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Total damages over $1,000?"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "At-fault?"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3",
                            children: "Police report filed?"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 py-3 text-center",
                            children: " "
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                incidents.map((incident)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[minmax(170px,1.1fr)_minmax(150px,0.9fr)_minmax(170px,1fr)_minmax(170px,1.1fr)_minmax(220px,1.2fr)_minmax(150px,0.8fr)_minmax(190px,1fr)_56px] items-center border-b border-border last:border-b-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    value: incident.incidentType || undefined,
                                    onValueChange: (value)=>updateIncident(incident.id, {
                                            incidentType: value
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-full",
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Select"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$incidents$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INCIDENT_TYPE_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: option,
                                                    children: option
                                                }, option, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    value: incident.incidentDate,
                                    onChange: (event)=>updateIncident(incident.id, {
                                            incidentDate: event.target.value
                                        }),
                                    placeholder: "MM/DD/YYYY"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    value: incident.source || undefined,
                                    onValueChange: (value)=>updateIncident(incident.id, {
                                            source: value
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-full",
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Select"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$incidents$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INCIDENT_SOURCE_OPTIONS"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: option,
                                                    children: option
                                                }, option, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                    value: incident.driverId || undefined,
                                    onValueChange: (value)=>updateIncident(incident.id, {
                                            driverId: value
                                        }),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-full",
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Select Driver"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                drivers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "no-drivers",
                                                    disabled: true,
                                                    children: "No drivers available"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 21
                                                }, this),
                                                drivers.map((driver)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: driver.id,
                                                        children: [
                                                            driver.firstName,
                                                            " ",
                                                            driver.lastName
                                                        ]
                                                    }, driver.id, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    value: getYesNoValue(incident.totalDamagesOver1000),
                                    onValueChange: (value)=>updateBooleanField(incident.id, "totalDamagesOver1000", value),
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-damages-yes`,
                                                    value: "yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-damages-yes`,
                                                    className: "text-sm",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-damages-no`,
                                                    value: "no"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-damages-no`,
                                                    className: "text-sm",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    value: getYesNoValue(incident.atFault),
                                    onValueChange: (value)=>updateBooleanField(incident.id, "atFault", value),
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-fault-yes`,
                                                    value: "yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-fault-yes`,
                                                    className: "text-sm",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-fault-no`,
                                                    value: "no"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-fault-no`,
                                                    className: "text-sm",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    value: getYesNoValue(incident.policeReportFiled),
                                    onValueChange: (value)=>updateBooleanField(incident.id, "policeReportFiled", value),
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-police-yes`,
                                                    value: "yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-police-yes`,
                                                    className: "text-sm",
                                                    children: "Yes"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                    id: `${incident.id}-police-no`,
                                                    value: "no"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: `${incident.id}-police-no`,
                                                    className: "text-sm",
                                                    children: "No"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center px-2 py-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    "aria-label": "Remove incident",
                                    onClick: ()=>handleRemoveIncident(incident.id),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4 text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)
                        ]
                    }, incident.id, true, {
                        fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/incidents/incidents-page.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/reports/reports-page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportsPage",
    ()=>ReportsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/empty.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
function ReportsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Empty"], {
            className: "border border-dashed",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyMedia"], {
                            variant: "icon",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyTitle"], {
                            children: "Reports"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyDescription"], {
                            children: "Review third-party reports before binding the policy."
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$empty$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EmptyContent"], {
                    children: "Run and review MVR, CLUE, and other underwriting reports here."
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/reports/reports-page.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/e-signature/mock-documents.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_DOCUMENTS",
    ()=>MOCK_DOCUMENTS
]);
const MOCK_DOCUMENTS = [
    {
        id: "doc-1",
        name: "Electronic Signature",
        type: "signature",
        status: "awaiting-signature",
        sentDate: new Date("2026-01-12")
    },
    {
        id: "doc-2",
        name: "Application for Insurance",
        type: "application",
        status: "awaiting-signature",
        sentDate: new Date("2026-01-12")
    },
    {
        id: "doc-3",
        name: "Uninsured motorist and underinsured motorist coverage offer form",
        type: "coverage-form",
        status: "awaiting-signature",
        sentDate: new Date("2026-01-12")
    }
];
}),
"[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ESignatureForm",
    ()=>ESignatureForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-ssr] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$e$2d$signature$2f$mock$2d$documents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/e-signature/mock-documents.ts [app-ssr] (ecmascript)");
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
// Format date as "December 13, 2025"
function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    }).format(date);
}
// Get status badge variant based on status
function getStatusBadgeVariant(status) {
    switch(status){
        case "awaiting-signature":
            return "secondary";
        case "signed":
            return "default";
        case "expired":
        case "cancelled":
            return "outline";
        default:
            return "secondary";
    }
}
// Get status badge text
function getStatusBadgeText(status) {
    switch(status){
        case "awaiting-signature":
            return "Awaiting signature";
        case "signed":
            return "Signed";
        case "expired":
            return "Expired";
        case "cancelled":
            return "Cancelled";
        default:
            return "Unknown";
    }
}
function ESignatureForm() {
    const { quoteData, updateESignature, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    const [isEditingEmail, setIsEditingEmail] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [emailValue, setEmailValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("");
    const [isDownloading, setIsDownloading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    // Initialize e-signature data if not present
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!quoteData.eSignature) {
            const clientEmail = quoteData.clientInfo?.email || "";
            const initialESignature = {
                documents: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$e$2d$signature$2f$mock$2d$documents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_DOCUMENTS"],
                sentDate: new Date("2026-01-12"),
                reminderEmail: clientEmail,
                reminderCount: 0,
                lastReminderSent: null
            };
            updateESignature(initialESignature);
        } else {
            // Update email if client email is available and reminder email is empty
            // This ensures primary insured email is suggested when no email is set
            const clientEmail = quoteData.clientInfo?.email || "";
            const currentReminderEmail = quoteData.eSignature.reminderEmail || "";
            if (clientEmail && !currentReminderEmail) {
                updateESignature({
                    ...quoteData.eSignature,
                    reminderEmail: clientEmail
                });
            }
        }
    }, [
        quoteData.eSignature,
        quoteData.clientInfo?.email,
        updateESignature
    ]);
    // Initialize email value - prioritize saved reminder email, fallback to primary insured email
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const reminderEmail = quoteData.eSignature?.reminderEmail || "";
        const primaryInsuredEmail = quoteData.clientInfo?.email || "";
        // Use reminder email if set, otherwise use primary insured email as suggestion
        if (reminderEmail) {
            setEmailValue(reminderEmail);
        } else if (primaryInsuredEmail) {
            setEmailValue(primaryInsuredEmail);
        } else {
            setEmailValue("");
        }
    }, [
        quoteData.eSignature?.reminderEmail,
        quoteData.clientInfo?.email
    ]);
    const eSignatureData = quoteData.eSignature;
    if (!eSignatureData) {
        return null;
    }
    const handleDownloadDocuments = async ()=>{
        setIsDownloading(true);
        try {
            // Mock download - simulate delay
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Documents downloaded", {
                description: "All documents have been downloaded as a ZIP file",
                duration: 2000
            });
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Download failed", {
                description: "Failed to download documents. Please try again.",
                duration: 3000
            });
        } finally{
            setIsDownloading(false);
        }
    };
    const handleEmailEdit = ()=>{
        setIsEditingEmail(true);
    };
    const handleEmailSave = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Invalid email", {
                description: "Please enter a valid email address",
                duration: 2000
            });
            return;
        }
        updateESignature({
            ...eSignatureData,
            reminderEmail: emailValue
        });
        setIsEditingEmail(false);
        saveQuote().catch(console.error);
    };
    const handleEmailCancel = ()=>{
        setEmailValue(eSignatureData.reminderEmail || quoteData.clientInfo?.email || "");
        setIsEditingEmail(false);
    };
    const handleSendReminder = async ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue || !emailRegex.test(emailValue)) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Invalid email", {
                description: "Please enter a valid email address",
                duration: 2000
            });
            return;
        }
        // Update email if changed
        if (emailValue !== eSignatureData.reminderEmail) {
            updateESignature({
                ...eSignatureData,
                reminderEmail: emailValue
            });
        }
        // Update reminder count and last sent date
        updateESignature({
            ...eSignatureData,
            reminderEmail: emailValue,
            reminderCount: eSignatureData.reminderCount + 1,
            lastReminderSent: new Date()
        });
        await saveQuote();
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Reminder sent", {
            description: `Reminder email sent to ${emailValue}`,
            duration: 2000
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "mb-8 w-full rounded-[12px] gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "px-6 pt-6 pb-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground",
                                    style: {
                                        fontFamily: "Geist, sans-serif"
                                    },
                                    children: "Signature"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    className: "text-base font-normal leading-[1.5] text-muted-foreground",
                                    style: {
                                        fontFamily: "Geist, sans-serif"
                                    },
                                    children: "The client must sign the application to finalize the binding."
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 199,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "lg",
                            onClick: handleDownloadDocuments,
                            disabled: isDownloading,
                            className: "h-9 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                "Download documents"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "px-6 pb-6 pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-6",
                    children: [
                        eSignatureData.sentDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-base leading-[1.5] text-muted-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: [
                                "Sent on ",
                                formatDate(eSignatureData.sentDate)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: eSignatureData.documents.map((document)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 rounded-lg border border-border bg-card p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                            className: "h-5 w-5 text-primary flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-base font-medium leading-[1.5] text-foreground truncate",
                                                style: {
                                                    fontFamily: "Inter, sans-serif"
                                                },
                                                children: document.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                lineNumber: 236,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: getStatusBadgeVariant(document.status),
                                            className: "flex-shrink-0",
                                            children: getStatusBadgeText(document.status)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, document.id, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4 rounded-lg border border-border bg-card p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-base font-semibold leading-[1.5] text-foreground",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "Send reminder"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        isEditingEmail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "email",
                                                    value: emailValue,
                                                    onChange: (e)=>setEmailValue(e.target.value),
                                                    className: "h-10 flex-1 text-base",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    placeholder: quoteData.clientInfo?.email || "email@example.com",
                                                    autoFocus: true,
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter") {
                                                            handleEmailSave();
                                                        } else if (e.key === "Escape") {
                                                            handleEmailCancel();
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: handleEmailSave,
                                                    className: "h-9 w-9",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: handleEmailCancel,
                                                    className: "h-9 w-9",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 text-base leading-[1.5] text-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: emailValue || "No email set"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    onClick: handleEmailEdit,
                                                    className: "h-9 w-9",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                                    lineNumber: 305,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            size: "lg",
                                            onClick: handleSendReminder,
                                            disabled: !emailValue || isEditingEmail,
                                            className: "h-9",
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                            lineNumber: 315,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                                    lineNumber: 261,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/e-signature/e-signature-form.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/command-palette/commands.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildCommands",
    ()=>buildCommands
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-ssr] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-check.js [app-ssr] (ecmascript) <export default as FileCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-down.js [app-ssr] (ecmascript) <export default as FileDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-pen-line.js [app-ssr] (ecmascript) <export default as FileSignature>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-ssr] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-ssr] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/filter.js [app-ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$steps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quote-steps.ts [app-ssr] (ecmascript)");
;
;
function buildCommands(context) {
    const commands = [];
    // Quick Actions (always available)
    commands.push({
        id: "new-quote",
        label: "New Quote",
        keywords: [
            "new",
            "create",
            "quote"
        ],
        shortcut: "⌘N",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
        group: "quick-actions",
        context: "always",
        description: "Creates a new insurance quote and navigates to the client information step",
        agentDescription: "Creates a new insurance quote. Navigates to the client information step where you can enter client details. This is the first step in the quote workflow.",
        contextRequirements: [],
        action: ()=>{
            // Navigate to new quote / reset to first step
            context.onStepChange?.("client-info");
        }
    });
    commands.push({
        id: "find-client",
        label: "Find Client",
        keywords: [
            "find",
            "search",
            "client",
            "customer"
        ],
        shortcut: "⌘F",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        group: "quick-actions",
        context: "always",
        description: "Opens the client search dialog to find and select an existing client",
        agentDescription: "Opens a client search dialog. Use this to find and select an existing client from the database. This is useful when you want to create a quote for a returning client.",
        contextRequirements: [],
        action: ()=>{
            context.onFindClient?.();
        }
    });
    commands.push({
        id: "import-ezlynx",
        label: "Import Quote from Ezlynx",
        keywords: [
            "import",
            "ezlynx",
            "quote",
            "aggregator"
        ],
        shortcut: undefined,
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileDown$3e$__["FileDown"],
        group: "quick-actions",
        context: "always",
        description: "Imports a quote from the Ezlynx aggregator system",
        agentDescription: "Imports an existing quote from the Ezlynx aggregator system. This allows you to work with quotes that were created or managed in Ezlynx. After import, you'll see an import summary before proceeding with the quote workflow.",
        contextRequirements: [],
        action: ()=>{
            context.onImportEzlynx?.();
        }
    });
    // Navigation (only in quote workflow)
    if (context.currentStep) {
        const stepMeta = {
            "import-summary": {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                keywords: [
                    "import",
                    "summary",
                    "missing",
                    "report"
                ],
                description: "Shows the import summary for the imported quote",
                agentDescription: "Navigates to the Import Summary step. Review missing info and required actions from the import before continuing the quote flow."
            },
            "client-info": {
                shortcut: "⌘1",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"],
                keywords: [
                    "basic",
                    "info",
                    "client",
                    "information",
                    "step",
                    "1"
                ],
                description: "Navigates to the Basic Information section of the quote workflow",
                agentDescription: "Navigates to the Basic Information step (step 1). Enter core client details like name, address, and contact information."
            },
            vehicle: {
                shortcut: "⌘2",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"],
                keywords: [
                    "vehicle",
                    "vehicles",
                    "car",
                    "cars",
                    "step",
                    "2"
                ],
                description: "Navigates to the Vehicles section of the quote workflow",
                agentDescription: "Navigates to the Vehicles step (step 2). Add vehicles that need coverage, including make, model, year, and VIN."
            },
            driver: {
                shortcut: "⌘3",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                keywords: [
                    "driver",
                    "drivers",
                    "step",
                    "3"
                ],
                description: "Navigates to the Drivers section of the quote workflow",
                agentDescription: "Navigates to the Drivers step (step 3). Add drivers and their license details for rating and underwriting."
            },
            incidents: {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
                keywords: [
                    "incident",
                    "incidents",
                    "claims",
                    "loss",
                    "history"
                ],
                description: "Navigates to the Incidents section of the quote workflow",
                agentDescription: "Navigates to the Incidents step. Review and record driver or vehicle incidents for underwriting."
            },
            reports: {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                keywords: [
                    "reports",
                    "report",
                    "mvr",
                    "clue",
                    "third-party"
                ],
                description: "Navigates to the Reports section of the quote workflow",
                agentDescription: "Navigates to the Reports step. Review third-party reports such as MVR and CLUE."
            },
            coverage: {
                shortcut: "⌘4",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
                keywords: [
                    "coverage",
                    "coverages",
                    "step",
                    "4"
                ],
                description: "Navigates to the Coverages section of the quote workflow",
                agentDescription: "Navigates to the Coverages step (step 4). Configure coverage limits and options for the quote."
            },
            payment: {
                shortcut: "⌘5",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
                keywords: [
                    "payment",
                    "billing",
                    "checkout",
                    "step",
                    "5"
                ],
                description: "Navigates to the Payment section of the quote workflow",
                agentDescription: "Navigates to the Payment step (step 5). Collect payment details required to bind the policy."
            },
            "e-sign": {
                shortcut: "⌘6",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$pen$2d$line$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSignature$3e$__["FileSignature"],
                keywords: [
                    "e-sign",
                    "esign",
                    "signature",
                    "sign",
                    "step",
                    "6"
                ],
                description: "Navigates to the E-Sign section of the quote workflow",
                agentDescription: "Navigates to the E-Sign step (step 6). Review and send documents for electronic signature."
            },
            review: {
                shortcut: "⌘7",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"],
                keywords: [
                    "review",
                    "final",
                    "step",
                    "7"
                ],
                description: "Navigates to the Review section of the quote workflow",
                agentDescription: "Navigates to the Review step. Review the full quote before finalizing."
            }
        };
        const steps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quote$2d$steps$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getQuoteProgressSteps"])({
            isImported: context.isImported
        });
        steps.forEach((step)=>{
            const stepInfo = stepMeta[step.id] || {
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileCheck$3e$__["FileCheck"],
                keywords: [
                    "step"
                ],
                description: `Navigates to the ${step.label} section of the quote workflow`,
                agentDescription: `Navigates to the ${step.label} step. Use this to jump directly to this section of the quote workflow.`
            };
            const keywords = Array.from(new Set([
                step.label.toLowerCase(),
                step.id,
                step.id.replace("-", " "),
                ...stepInfo.keywords
            ]));
            const isBindBlockedStep = !!context.isUnbindable && (step.id === "payment" || step.id === "e-sign");
            commands.push({
                id: `go-${step.id}`,
                label: step.label,
                keywords,
                shortcut: stepInfo.shortcut,
                icon: stepInfo.icon,
                group: "navigation",
                context: "in-quote",
                description: stepInfo.description,
                agentDescription: stepInfo.agentDescription,
                contextRequirements: [
                    "current-step"
                ],
                disabled: isBindBlockedStep,
                meta: isBindBlockedStep ? "Unavailable" : undefined,
                action: ()=>{
                    if (isBindBlockedStep) return;
                    context.onStepChange?.(step.id);
                }
            });
        });
    }
    // Quote-specific actions (only when a quote exists)
    if (context.currentQuoteId) {
        commands.push({
            id: "run-reports",
            label: "Run 3rd Party Reports",
            keywords: [
                "run",
                "reports",
                "mvr",
                "clue",
                "generate"
            ],
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"],
            group: "quote-actions",
            context: "has-quote",
            description: "Generates third-party reports (MVR, CLUE) for the current quote",
            agentDescription: "Generates third-party reports including MVR (Motor Vehicle Record) and CLUE (Comprehensive Loss Underwriting Exchange) reports for the current quote. These reports provide driving history and claims information to help assess risk and determine pricing.",
            contextRequirements: [
                "quote-id"
            ],
            action: ()=>{
                context.onRunReports?.();
            }
        });
        commands.push({
            id: "send-quote",
            label: "Send Quote to Client",
            keywords: [
                "send",
                "quote",
                "client",
                "email"
            ],
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"],
            group: "quote-actions",
            context: "has-quote",
            description: "Sends the current quote to the client via email",
            agentDescription: "Sends the current quote to the client via email. This allows the client to review the quote and either accept or reject it. The quote will be marked as 'sent' status after sending.",
            contextRequirements: [
                "quote-id"
            ],
            action: ()=>{
                context.onSendQuote?.();
            }
        });
        commands.push({
            id: "download-pdf",
            label: "Download PDF",
            keywords: [
                "download",
                "pdf",
                "export",
                "print"
            ],
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"],
            group: "quote-actions",
            context: "has-quote",
            description: "Downloads the current quote as a PDF document",
            agentDescription: "Downloads the current quote as a PDF document. This creates a formatted PDF version of the quote that can be saved, printed, or shared with the client offline.",
            contextRequirements: [
                "quote-id"
            ],
            action: ()=>{
                context.onDownloadPDF?.();
            }
        });
    }
    // Recent Quotes (if available)
    if (context.recentQuotes && context.recentQuotes.length > 0) {
        context.recentQuotes.forEach((quote)=>{
            commands.push({
                id: `recent-${quote.id}`,
                label: quote.clientName,
                keywords: [
                    quote.clientName.toLowerCase(),
                    quote.quoteNumber.toLowerCase(),
                    "recent",
                    "quote"
                ],
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                group: "recent",
                context: "always",
                meta: quote.quoteNumber,
                status: quote.status,
                description: `Opens the recent quote ${quote.quoteNumber} for ${quote.clientName}`,
                agentDescription: `Opens quote ${quote.quoteNumber} for client ${quote.clientName}. This is a recently accessed quote that you can quickly return to. The quote status is ${quote.status}.`,
                action: ()=>{
                    context.onOpenQuote?.(quote.id);
                }
            });
        });
    }
    // Quotes page commands (only on quotes page)
    if (context.isQuotesPage) {
        // Start New Quote
        if (context.onStartQuote) {
            commands.push({
                id: "start-quote",
                label: "Start New Quote",
                keywords: [
                    "start",
                    "new",
                    "quote",
                    "create"
                ],
                shortcut: "⌘N",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
                group: "quotes-list",
                context: "quotes-page",
                description: "Starts a new quote and navigates to the quote creation page",
                agentDescription: "Starts a new insurance quote. Navigates to the home page where you can begin creating a new quote from scratch. This is available on the quotes list page.",
                contextRequirements: [
                    "quotes-page"
                ],
                action: ()=>{
                    context.onStartQuote?.();
                }
            });
        }
        // Navigate to Home
        commands.push({
            id: "go-home",
            label: "Go to Home",
            keywords: [
                "home",
                "navigate",
                "main",
                "dashboard"
            ],
            shortcut: "⌘H",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
            group: "quotes-list",
            context: "quotes-page",
            description: "Navigates to the home page",
            agentDescription: "Navigates to the home page (main dashboard). Use this to return to the main quote creation interface from the quotes list page.",
            contextRequirements: [
                "quotes-page"
            ],
            action: ()=>{
                context.onStartQuote?.(); // Navigate to home
            }
        });
        // Clear Filters
        if (context.onClearFilters) {
            commands.push({
                id: "clear-filters",
                label: "Clear All Filters",
                keywords: [
                    "clear",
                    "reset",
                    "filters",
                    "all"
                ],
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"],
                group: "quotes-list",
                context: "quotes-page",
                description: "Clears all filters on the quotes list page",
                agentDescription: "Clears all active filters on the quotes list page. This resets status, date range, agency, and agent filters to their default values, showing all quotes.",
                contextRequirements: [
                    "quotes-page"
                ],
                action: ()=>{
                    context.onClearFilters?.();
                }
            });
        }
        // Filter by Status
        if (context.onFilterStatus) {
            const statuses = [
                "draft",
                "pending",
                "sent",
                "accepted",
                "rejected"
            ];
            const statusDescriptions = {
                draft: "Shows only draft quotes that are still being worked on",
                pending: "Shows only pending quotes awaiting action",
                sent: "Shows only quotes that have been sent to clients",
                accepted: "Shows only quotes that have been accepted by clients",
                rejected: "Shows only quotes that have been rejected by clients"
            };
            statuses.forEach((status)=>{
                commands.push({
                    id: `filter-status-${status}`,
                    label: `Filter: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
                    keywords: [
                        "filter",
                        "status",
                        status
                    ],
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"],
                    group: "quotes-list",
                    context: "quotes-page",
                    description: `Filters quotes to show only ${status} quotes`,
                    agentDescription: `Filters the quotes list to show only quotes with ${status} status. ${statusDescriptions[status]}. This helps you focus on quotes in a specific state.`,
                    contextRequirements: [
                        "quotes-page"
                    ],
                    parameters: [
                        {
                            name: "status",
                            type: "string",
                            required: true,
                            description: `The status to filter by: ${status}`
                        }
                    ],
                    action: ()=>{
                        context.onFilterStatus?.(status);
                    }
                });
            });
        }
        // Open quotes from list
        if (context.availableQuotes && context.availableQuotes.length > 0 && context.onOpenQuote) {
            context.availableQuotes.forEach((quote)=>{
                commands.push({
                    id: `open-quote-${quote.id}`,
                    label: quote.name,
                    keywords: [
                        quote.name.toLowerCase(),
                        quote.quoteNumber.toLowerCase(),
                        "open",
                        "quote",
                        quote.status || ""
                    ],
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                    group: "quotes-list",
                    context: "quotes-page",
                    meta: quote.quoteNumber,
                    status: quote.status,
                    description: `Opens quote ${quote.quoteNumber} for ${quote.name}`,
                    agentDescription: `Opens quote ${quote.quoteNumber} for client ${quote.name}. This quote has status ${quote.status}. Opening it will navigate to the quote detail page where you can view and edit the quote.`,
                    contextRequirements: [
                        "quotes-page"
                    ],
                    action: ()=>{
                        context.onOpenQuote?.(quote.id);
                    }
                });
            });
        }
    }
    // Theme settings (always available)
    if (context.onSetTheme) {
        const themeCommands = [
            {
                id: "theme-light",
                label: "Switch to Light Theme",
                keywords: [
                    "light",
                    "theme",
                    "bright",
                    "day"
                ],
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"],
                theme: "light"
            },
            {
                id: "theme-dark",
                label: "Switch to Dark Theme",
                keywords: [
                    "dark",
                    "theme",
                    "night",
                    "black"
                ],
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"],
                theme: "dark"
            },
            {
                id: "theme-system",
                label: "Use System Theme",
                keywords: [
                    "system",
                    "theme",
                    "auto",
                    "default"
                ],
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
                theme: "system"
            }
        ];
        themeCommands.forEach(({ id, label, keywords, icon, theme })=>{
            const isActive = context.currentTheme === theme;
            const themeDescriptions = {
                light: {
                    description: "Switches the application theme to light mode",
                    agentDescription: "Switches the application theme to light mode. This provides a bright, light-colored interface suitable for daytime use or users who prefer light backgrounds."
                },
                dark: {
                    description: "Switches the application theme to dark mode",
                    agentDescription: "Switches the application theme to dark mode. This provides a dark interface that's easier on the eyes in low-light conditions and reduces eye strain."
                },
                system: {
                    description: "Uses the system theme preference",
                    agentDescription: "Uses the system theme preference. The application will automatically match your operating system's theme setting (light or dark) and switch accordingly."
                }
            };
            const themeInfo = themeDescriptions[theme];
            commands.push({
                id,
                label,
                keywords,
                icon,
                group: "settings",
                context: "always",
                meta: isActive ? "Active" : undefined,
                description: themeInfo.description,
                agentDescription: themeInfo.agentDescription,
                contextRequirements: [],
                action: ()=>{
                    context.onSetTheme?.(theme);
                }
            });
        });
    }
    return commands;
}
}),
"[project]/apps/portal/src/screens/components/command-palette/fuzzy-search.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Calculate fuzzy match score between text and query
 * Returns a score between 0 and 1, where 1 is a perfect match
 */ __turbopack_context__.s([
    "calculateCommandScore",
    ()=>calculateCommandScore,
    "commandFilter",
    ()=>commandFilter,
    "fuzzyMatch",
    ()=>fuzzyMatch
]);
function fuzzyMatch(text, query) {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    // Exact match = highest priority
    if (lowerText === lowerQuery) {
        return 1.0;
    }
    // Starts with = very high priority
    if (lowerText.startsWith(lowerQuery)) {
        return 0.9;
    }
    // Contains = high priority
    if (lowerText.includes(lowerQuery)) {
        return 0.7;
    }
    // Fuzzy match (characters in order) = medium priority
    let queryIndex = 0;
    let consecutiveMatches = 0;
    let maxConsecutive = 0;
    for(let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++){
        if (lowerText[i] === lowerQuery[queryIndex]) {
            consecutiveMatches++;
            maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
            queryIndex++;
        } else {
            consecutiveMatches = 0;
        }
    }
    // If all query characters were found in order
    if (queryIndex === lowerQuery.length) {
        // Score based on how many consecutive matches we found
        const consecutiveScore = maxConsecutive / lowerQuery.length;
        return 0.3 + consecutiveScore * 0.2 // Range: 0.3 - 0.5
        ;
    }
    // No match
    return 0;
}
function calculateCommandScore(command, query) {
    const lowerQuery = query.toLowerCase();
    // Check label match
    const labelScore = fuzzyMatch(command.label, lowerQuery);
    // Check keyword matches
    const keywordScores = command.keywords.map((keyword)=>fuzzyMatch(keyword, lowerQuery));
    const maxKeywordScore = Math.max(...keywordScores, 0);
    // Check shortcut match (exact match only)
    let shortcutScore = 0;
    if (command.shortcut) {
        const shortcutText = command.shortcut.toLowerCase().replace(/[⌘ctrl]/g, "");
        if (shortcutText === lowerQuery || shortcutText.includes(lowerQuery)) {
            shortcutScore = 0.8;
        }
    }
    // Return the highest score
    return Math.max(labelScore, maxKeywordScore, shortcutScore);
}
function commandFilter(value, search) {
    if (!search) {
        return 1 // Show all when no search
        ;
    }
    const lowerSearch = search.toLowerCase();
    const lowerValue = value.toLowerCase();
    // Exact match
    if (lowerValue === lowerSearch) {
        return 1;
    }
    // Starts with
    if (lowerValue.startsWith(lowerSearch)) {
        return 0.9;
    }
    // Contains
    if (lowerValue.includes(lowerSearch)) {
        return 0.7;
    }
    // Fuzzy match
    return fuzzyMatch(lowerValue, lowerSearch);
}
}),
"[project]/apps/portal/src/screens/components/command-palette/use-recent-quotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRecentQuotes",
    ()=>useRecentQuotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const STORAGE_KEY = "command-palette-recent-quotes";
const MAX_RECENT_QUOTES = 10;
function useRecentQuotes() {
    const [recentQuotes, setRecentQuotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load recent quotes from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Sort by accessedAt (most recent first)
                const sorted = parsed.sort((a, b)=>new Date(b.accessedAt).getTime() - new Date(a.accessedAt).getTime());
                setRecentQuotes(sorted.slice(0, MAX_RECENT_QUOTES));
            }
        } catch (error) {
            console.error("Failed to load recent quotes:", error);
        }
    }, []);
    // Save recent quotes to localStorage
    const saveRecentQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((quotes)=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
            setRecentQuotes(quotes);
        } catch (error) {
            console.error("Failed to save recent quotes:", error);
        }
    }, []);
    // Add a quote to recent quotes
    const addRecentQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((quote)=>{
        const newRecent = {
            ...quote,
            accessedAt: new Date().toISOString()
        };
        setRecentQuotes((prev)=>{
            // Remove if already exists
            const filtered = prev.filter((q)=>q.id !== quote.id);
            // Add to beginning
            const updated = [
                newRecent,
                ...filtered
            ];
            // Keep only MAX_RECENT_QUOTES
            const limited = updated.slice(0, MAX_RECENT_QUOTES);
            saveRecentQuotes(limited);
            return limited;
        });
    }, [
        saveRecentQuotes
    ]);
    // Clear all recent quotes
    const clearRecentQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        localStorage.removeItem(STORAGE_KEY);
        setRecentQuotes([]);
    }, []);
    return {
        recentQuotes,
        addRecentQuote,
        clearRecentQuotes
    };
}
}),
"[project]/apps/portal/src/screens/components/command-palette/use-command-history.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCommandHistory",
    ()=>useCommandHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const STORAGE_KEY_HISTORY = "command-palette-history";
const STORAGE_KEY_FAVORITES = "command-palette-favorites";
const STORAGE_KEY_CUSTOM_SHORTCUTS = "command-palette-custom-shortcuts";
const MAX_HISTORY = 20;
function useCommandHistory() {
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [customShortcuts, setCustomShortcuts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        try {
            // Load history
            const storedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
            if (storedHistory) {
                const parsed = JSON.parse(storedHistory);
                setHistory(parsed.slice(0, MAX_HISTORY));
            }
            // Load favorites
            const storedFavorites = localStorage.getItem(STORAGE_KEY_FAVORITES);
            if (storedFavorites) {
                const parsed = JSON.parse(storedFavorites);
                setFavorites(new Set(parsed.map((f)=>f.commandId)));
            }
            // Load custom shortcuts
            const storedShortcuts = localStorage.getItem(STORAGE_KEY_CUSTOM_SHORTCUTS);
            if (storedShortcuts) {
                const parsed = JSON.parse(storedShortcuts);
                setCustomShortcuts(new Map(parsed.map((s)=>[
                        s.commandId,
                        s.shortcut
                    ])));
            }
        } catch (error) {
            console.error("Failed to load command preferences:", error);
        }
    }, []);
    // Track command execution
    const trackCommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((commandId)=>{
        setHistory((prev)=>{
            const existing = prev.find((entry)=>entry.commandId === commandId);
            let updated;
            if (existing) {
                // Update existing entry
                updated = prev.map((entry)=>entry.commandId === commandId ? {
                        ...entry,
                        count: entry.count + 1,
                        executedAt: new Date().toISOString()
                    } : entry);
                // Move to top
                updated = [
                    updated.find((e)=>e.commandId === commandId),
                    ...updated.filter((e)=>e.commandId !== commandId)
                ];
            } else {
                // Add new entry
                updated = [
                    {
                        commandId,
                        executedAt: new Date().toISOString(),
                        count: 1
                    },
                    ...prev
                ];
            }
            // Keep only MAX_HISTORY entries
            const limited = updated.slice(0, MAX_HISTORY);
            // Save to localStorage
            try {
                localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(limited));
            } catch (error) {
                console.error("Failed to save command history:", error);
            }
            return limited;
        });
    }, []);
    // Toggle favorite
    const toggleFavorite = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((commandId)=>{
        setFavorites((prev)=>{
            const updated = new Set(prev);
            if (updated.has(commandId)) {
                updated.delete(commandId);
            } else {
                updated.add(commandId);
            }
            // Save to localStorage
            try {
                const favoritesArray = Array.from(updated).map((id)=>({
                        commandId: id,
                        favoritedAt: new Date().toISOString()
                    }));
                localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favoritesArray));
            } catch (error) {
                console.error("Failed to save favorites:", error);
            }
            return updated;
        });
    }, []);
    // Set custom shortcut
    const setCustomShortcut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((commandId, shortcut)=>{
        setCustomShortcuts((prev)=>{
            const updated = new Map(prev);
            if (shortcut === null) {
                updated.delete(commandId);
            } else {
                updated.set(commandId, shortcut);
            }
            // Save to localStorage
            try {
                const shortcutsArray = Array.from(updated.entries()).map(([id, shortcut])=>({
                        commandId: id,
                        shortcut
                    }));
                localStorage.setItem(STORAGE_KEY_CUSTOM_SHORTCUTS, JSON.stringify(shortcutsArray));
            } catch (error) {
                console.error("Failed to save custom shortcuts:", error);
            }
            return updated;
        });
    }, []);
    // Get command usage count
    const getUsageCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((commandId)=>{
        const entry = history.find((e)=>e.commandId === commandId);
        return entry?.count || 0;
    }, [
        history
    ]);
    // Get most used commands
    const getMostUsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((limit = 5)=>{
        return [
            ...history
        ].sort((a, b)=>b.count - a.count).slice(0, limit).map((e)=>e.commandId);
    }, [
        history
    ]);
    // Clear history
    const clearHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY_HISTORY);
    }, []);
    return {
        history,
        favorites,
        customShortcuts,
        trackCommand,
        toggleFavorite,
        setCustomShortcut,
        getUsageCount,
        getMostUsed,
        clearHistory,
        isFavorite: (commandId)=>favorites.has(commandId)
    };
}
}),
"[project]/apps/portal/src/screens/components/command-palette/command-hints.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commandToHint",
    ()=>commandToHint,
    "commandsToHints",
    ()=>commandsToHints
]);
function commandToHint(command, available = true) {
    return {
        id: command.id,
        label: command.label,
        description: command.agentDescription || command.description || command.label,
        group: command.group,
        context: command.context,
        available,
        shortcut: command.shortcut || command.customShortcut,
        keywords: command.keywords,
        parameters: command.parameters,
        contextRequirements: command.contextRequirements
    };
}
function commandsToHints(commands) {
    return commands.map((cmd)=>commandToHint(cmd, true));
}
}),
"[project]/apps/portal/src/screens/components/command-palette/command-registry.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCommandRegistry",
    ()=>useCommandRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$hints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/command-hints.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useCommandRegistry(commands) {
    const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return {
            /**
       * Get all available commands
       */ getAvailableCommands: ()=>{
                return commands.filter((cmd)=>isCommandAvailable(cmd));
            },
            /**
       * Get commands filtered by group
       */ getCommandsByGroup: (group)=>{
                return commands.filter((cmd)=>cmd.group === group && isCommandAvailable(cmd));
            },
            /**
       * Get commands filtered by context requirement
       */ getCommandsByContext: (context)=>{
                return commands.filter((cmd)=>cmd.context === context && isCommandAvailable(cmd));
            },
            /**
       * Get a specific command by ID
       */ getCommandById: (id)=>{
                const cmd = commands.find((c)=>c.id === id);
                return cmd && isCommandAvailable(cmd) ? cmd : undefined;
            },
            /**
       * Get command hints optimized for AI agents
       */ getCommandHints: ()=>{
                return commands.filter((cmd)=>isCommandAvailable(cmd)).map((cmd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$hints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commandToHint"])(cmd, true));
            },
            /**
       * Get command hints filtered by group
       */ getHintsByGroup: (group)=>{
                return commands.filter((cmd)=>cmd.group === group && isCommandAvailable(cmd)).map((cmd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$hints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commandToHint"])(cmd, true));
            },
            /**
       * Get command hints filtered by context
       */ getHintsByContext: (context)=>{
                return commands.filter((cmd)=>cmd.context === context && isCommandAvailable(cmd)).map((cmd)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$hints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commandToHint"])(cmd, true));
            },
            /**
       * Search commands by keyword or label
       */ searchCommands: (query)=>{
                const lowerQuery = query.toLowerCase();
                return commands.filter((cmd)=>{
                    if (!isCommandAvailable(cmd)) //TURBOPACK unreachable
                    ;
                    const labelMatch = cmd.label.toLowerCase().includes(lowerQuery);
                    const keywordMatch = cmd.keywords.some((kw)=>kw.toLowerCase().includes(lowerQuery));
                    const descriptionMatch = cmd.description?.toLowerCase().includes(lowerQuery) || cmd.agentDescription?.toLowerCase().includes(lowerQuery);
                    return labelMatch || keywordMatch || descriptionMatch;
                });
            },
            /**
       * Check if a command is available
       */ isCommandAvailable: (id)=>{
                const cmd = commands.find((c)=>c.id === id);
                return cmd ? isCommandAvailable(cmd) : false;
            }
        };
    }, [
        commands
    ]);
    return registry;
}
/**
 * Determines if a command is available based on its context requirements
 * This is a simplified check - in a real implementation, you'd check
 * actual context values (e.g., quote-id exists, current-step is set, etc.)
 */ function isCommandAvailable(cmd) {
    // For now, all commands are considered available
    // In a real implementation, you'd check context requirements here
    // e.g., if cmd.contextRequirements includes "quote-id", check if quoteId exists
    return true;
}
}),
"[project]/apps/portal/src/screens/components/hooks/use-command-palette.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCommandPalette",
    ()=>useCommandPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$commands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/commands.ts [app-ssr] (ecmascript)");
"use client";
;
;
function useCommandPalette({ isOpen: externalIsOpen, setIsOpen: externalSetIsOpen, currentStep, onStepChange, onFindClient, currentQuoteId, isImported, isUnbindable, onRunReports, onSendQuote, onDownloadPDF, onImportEzlynx, recentQuotes, onOpenQuote, history = [], favorites = new Set(), customShortcuts = new Map(), onSetTheme, currentTheme, isQuotesPage, availableQuotes, onStartQuote, onFilterStatus, onClearFilters }) {
    const [internalIsOpen, setInternalIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isOpen = externalIsOpen ?? internalIsOpen;
    const setIsOpen = externalSetIsOpen ?? setInternalIsOpen;
    // Build commands based on context
    const allCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$commands$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildCommands"])({
            currentStep,
            onStepChange,
            onFindClient,
            currentQuoteId,
            isImported,
            isUnbindable,
            onRunReports,
            onSendQuote,
            onDownloadPDF,
            onImportEzlynx,
            recentQuotes,
            onOpenQuote,
            history,
            favorites,
            customShortcuts,
            onSetTheme,
            currentTheme,
            isQuotesPage,
            availableQuotes,
            onStartQuote,
            onFilterStatus,
            onClearFilters
        }), [
        currentStep,
        onStepChange,
        onFindClient,
        currentQuoteId,
        isImported,
        isUnbindable,
        onRunReports,
        onSendQuote,
        onDownloadPDF,
        onImportEzlynx,
        recentQuotes,
        onOpenQuote,
        history,
        favorites,
        customShortcuts,
        onSetTheme,
        currentTheme,
        isQuotesPage,
        availableQuotes,
        onStartQuote,
        onFilterStatus,
        onClearFilters
    ]);
    // Group commands by category and enhance with history/favorites
    const groupedCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const groups = new Map();
        const favoriteCommands = [];
        const historyCommands = [];
        const historyMap = new Map(history.map((entry)=>[
                entry.commandId,
                entry
            ]));
        // Process all commands
        const enhancedCommands = allCommands.map((cmd)=>{
            const customShortcut = customShortcuts.get(cmd.id);
            const historyEntry = historyMap.get(cmd.id);
            const isFav = favorites.has(cmd.id);
            return {
                ...cmd,
                customShortcut: customShortcut || cmd.customShortcut,
                usageCount: historyEntry?.count,
                isFavorite: isFav
            };
        });
        // Track command IDs that are in favorites or history to avoid duplicates
        const commandsInSpecialGroups = new Set();
        // Group commands
        enhancedCommands.forEach((cmd)=>{
            // Add to favorites if favorite
            if (cmd.isFavorite) {
                favoriteCommands.push(cmd);
                commandsInSpecialGroups.add(cmd.id);
            }
            // Add to history group if recently used
            if (cmd.usageCount && cmd.usageCount > 0) {
                historyCommands.push(cmd);
                commandsInSpecialGroups.add(cmd.id);
            }
            // Add to regular groups only if not already in favorites or history
            if (!commandsInSpecialGroups.has(cmd.id)) {
                if (!groups.has(cmd.group)) {
                    groups.set(cmd.group, []);
                }
                groups.get(cmd.group).push(cmd);
            }
        });
        // Sort history commands by most recent
        historyCommands.sort((a, b)=>{
            const aEntry = historyMap.get(a.id);
            const bEntry = historyMap.get(b.id);
            if (!aEntry || !bEntry) return 0;
            return new Date(bEntry.executedAt).getTime() - new Date(aEntry.executedAt).getTime();
        });
        // Sort favorites by usage count
        favoriteCommands.sort((a, b)=>{
            const aCount = a.usageCount || 0;
            const bCount = b.usageCount || 0;
            return bCount - aCount;
        });
        // Add favorites and history groups at the beginning
        const result = [];
        if (favoriteCommands.length > 0) {
            result.push({
                group: "favorites",
                commands: favoriteCommands
            });
        }
        if (historyCommands.length > 0) {
            result.push({
                group: "history",
                commands: historyCommands.slice(0, 5)
            });
        }
        // Add other groups
        groups.forEach((commands, group)=>{
            // Skip groups that are already added
            if (group !== "favorites" && group !== "history") {
                result.push({
                    group,
                    commands
                });
            }
        });
        return result;
    }, [
        allCommands,
        history,
        favorites,
        customShortcuts
    ]);
    // Handle ⌘K / Ctrl+K keyboard shortcut
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            // ⌘K on Mac, Ctrl+K on Windows/Linux
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
            // Prevent default browser shortcuts when palette is open
            if (isOpen) {
                // Note: ⌘S is no longer intercepted since auto-save handles saving
                // Prevent ⌘F from triggering browser find
                if ((e.metaKey || e.ctrlKey) && e.key === "f") {
                    e.preventDefault();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, [
        isOpen,
        setIsOpen
    ]);
    // Commands are already grouped in groupedCommands
    const commands = groupedCommands;
    return {
        isOpen,
        setIsOpen,
        commands
    };
}
}),
"[project]/apps/portal/src/screens/components/command-palette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandPalette",
    ()=>CommandPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/command.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$hooks$2f$use$2d$command$2d$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/hooks/use-command-palette.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$fuzzy$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/fuzzy-search.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$use$2d$recent$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/use-recent-quotes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$use$2d$command$2d$history$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/use-command-history.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette/command-registry.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
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
const groupLabels = {
    favorites: "Favorites",
    history: "Recently Used",
    "quick-actions": "Quick Actions",
    navigation: "Jump to Section",
    "quote-actions": "Reports & Actions",
    recent: "Recent Quotes",
    settings: "Settings",
    "quotes-list": "Quotes"
};
function CommandPalette({ currentStep, onStepChange, onFindClient, currentQuoteId, isImported, isUnbindable, onRunReports, onSendQuote, onDownloadPDF, onImportEzlynx, onOpenQuote, isQuotesPage, availableQuotes, onStartQuote, onFilterStatus, onClearFilters }) {
    // Get recent quotes
    const { recentQuotes, addRecentQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$use$2d$recent$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRecentQuotes"])();
    // Get command history and favorites
    const { history, favorites, customShortcuts, trackCommand, toggleFavorite, getUsageCount, getMostUsed, isFavorite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$use$2d$command$2d$history$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommandHistory"])();
    // Get theme functions
    const { setTheme, theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    // Wrap onOpenQuote to track recent quotes
    const handleOpenQuoteWithTracking = (quoteId)=>{
        // Add to recent quotes (with mock data for demo)
        // In a real app, you'd fetch quote data first
        addRecentQuote({
            id: quoteId,
            quoteNumber: `Q-${quoteId.slice(-6)}`,
            clientName: `Client ${quoteId.slice(-3)}`,
            status: "draft"
        });
        onOpenQuote?.(quoteId);
    };
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommandPaletteContext"])();
    const { commands } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$hooks$2f$use$2d$command$2d$palette$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommandPalette"])({
        isOpen: context.isOpen,
        setIsOpen: context.setIsOpen,
        currentStep,
        onStepChange,
        onFindClient,
        currentQuoteId,
        isImported,
        isUnbindable,
        onRunReports,
        onSendQuote,
        onDownloadPDF,
        onImportEzlynx,
        recentQuotes,
        onOpenQuote: handleOpenQuoteWithTracking,
        history,
        favorites,
        customShortcuts,
        onSetTheme: setTheme,
        currentTheme: theme,
        isQuotesPage,
        availableQuotes,
        onStartQuote,
        onFilterStatus,
        onClearFilters
    });
    const isOpen = context.isOpen;
    const setIsOpen = context.setIsOpen;
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Get all available commands for suggestions
    const allCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return commands.flatMap(({ commands: groupCommands })=>groupCommands);
    }, [
        commands
    ]);
    // Create registry from all commands
    const registry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$command$2d$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCommandRegistry"])(allCommands);
    // Register registry with context (for agent access)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (context && '_registerRegistry' in context && typeof context._registerRegistry === 'function') {
            context._registerRegistry(registry);
        }
    }, [
        registry,
        context
    ]);
    // Allow other components to open the palette via window event
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleOpen = ()=>setIsOpen(true);
        window.addEventListener("command-palette:open", handleOpen);
        return ()=>window.removeEventListener("command-palette:open", handleOpen);
    }, [
        setIsOpen
    ]);
    // Get popular/suggested commands for empty state
    const suggestedCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!search) {
            // When no search, suggest common commands
            return allCommands.filter((cmd)=>[
                    "new-quote",
                    "find-client"
                ].includes(cmd.id)).slice(0, 3);
        }
        // When there's a search but no results, suggest similar commands
        const lowerSearch = search.toLowerCase();
        return allCommands.filter((cmd)=>{
            const label = cmd.label.toLowerCase();
            const keywords = cmd.keywords.join(" ").toLowerCase();
            return label.includes(lowerSearch[0]) || keywords.includes(lowerSearch[0]) || cmd.label.toLowerCase().startsWith(lowerSearch[0]);
        }).slice(0, 3);
    }, [
        search,
        allCommands
    ]);
    const handleSelect = (command)=>{
        if (command.disabled) return;
        // Track command execution
        trackCommand(command.id);
        command.action();
        setIsOpen(false);
        setSearch("");
    };
    // Handle right-click or long-press to favorite (for future enhancement)
    const handleFavoriteToggle = (e, command)=>{
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(command.id);
    };
    // Reset search when dialog closes
    const handleOpenChange = (open)=>{
        setIsOpen(open);
        if (!open) {
            setSearch("");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandDialog"], {
        open: isOpen,
        onOpenChange: handleOpenChange,
        filter: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2f$fuzzy$2d$search$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["commandFilter"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandInput"], {
                placeholder: "Type a command or search...",
                value: search,
                onValueChange: setSearch
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandList"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-3 py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "h-6 w-6 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-foreground",
                                            children: [
                                                "No results found",
                                                search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: [
                                                        ' for "',
                                                        search,
                                                        '"'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this),
                                        search && suggestedCommands.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-col gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Did you mean:"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-1.5 justify-center",
                                                    children: suggestedCommands.map((cmd)=>{
                                                        const Icon = cmd.icon;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleSelect(cmd),
                                                            className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                                    lineNumber: 249,
                                                                    columnNumber: 27
                                                                }, this),
                                                                cmd.label
                                                            ]
                                                        }, cmd.id, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this),
                                        !search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: "Try searching for actions, navigation, or use shortcuts"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    commands.map(({ group, commands: groupCommands })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandGroup"], {
                            heading: groupLabels[group] || group,
                            children: groupCommands.map((command)=>{
                                const Icon = command.icon;
                                const statusColors = {
                                    draft: "bg-muted text-muted-foreground",
                                    pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
                                    sent: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
                                    accepted: "bg-green-500/10 text-green-600 dark:text-green-500",
                                    rejected: "bg-red-500/10 text-red-600 dark:text-red-500"
                                };
                                const favorite = isFavorite(command.id);
                                const displayShortcut = command.customShortcut || command.shortcut;
                                const isActiveTheme = command.meta === "Active";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandItem"], {
                                    value: `${command.id} ${command.label} ${command.keywords.join(" ")} ${displayShortcut || ""} ${command.meta || ""}`,
                                    onSelect: ()=>handleSelect(command),
                                    disabled: command.disabled,
                                    className: command.disabled ? "group/item opacity-50 cursor-not-allowed" : "group/item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-1 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: command.label
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 21
                                                }, this),
                                                command.meta && !isActiveTheme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: command.meta
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 23
                                                }, this),
                                                isActiveTheme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: "h-5 text-xs bg-primary/10 text-primary border-primary/20",
                                                    children: "Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 23
                                                }, this),
                                                command.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: `h-5 text-xs ${statusColors[command.status] || ""}`,
                                                    children: command.status
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 23
                                                }, this),
                                                command.usageCount !== undefined && command.usageCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        "(",
                                                        command.usageCount,
                                                        "x)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                favorite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                    className: "h-3.5 w-3.5 fill-yellow-500 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 23
                                                }, this),
                                                displayShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandShortcut"], {
                                                    children: displayShortcut
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 321,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, command.id, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 280,
                                    columnNumber: 17
                                }, this);
                            })
                        }, group, false, {
                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
        lineNumber: 216,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_portal_src_screens_components_edc97788._.js.map