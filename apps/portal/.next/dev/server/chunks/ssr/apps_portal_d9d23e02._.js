module.exports = [
"[project]/apps/portal/src/screens/components/quotes-list/quote-search.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteSearch",
    ()=>QuoteSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function QuoteSearch({ value, onChange, placeholder = "Search by name or email" }) {
    const [localValue, setLocalValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](value);
    // Debounce search input (300ms)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const timer = setTimeout(()=>{
            onChange(localValue);
        }, 300);
        return ()=>clearTimeout(timer);
    }, [
        localValue,
        onChange
    ]);
    // Sync external value changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setLocalValue(value);
    }, [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full max-w-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-search.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                type: "text",
                value: localValue,
                onChange: (e)=>setLocalValue(e.target.value),
                placeholder: placeholder,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-full pl-9", "focus-visible:ring-ring/50 focus-visible:ring-[3px]")
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-search.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-search.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/types.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AGENCIES",
    ()=>AGENCIES
]);
const AGENCIES = [
    "The Zebra",
    "ezlynx",
    "EverQuote",
    "Savvy",
    "Novo",
    "Policygenius",
    "Insurify",
    "Compare.com",
    "The General",
    "Progressive"
];
}),
"[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteFiltersComponent",
    ()=>QuoteFiltersComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/types.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function QuoteFiltersComponent({ filters, onFiltersChange, availableAgencies, availableAgents }) {
    const handleStatusChange = (value)=>{
        onFiltersChange({
            ...filters,
            status: value
        });
    };
    const handleDateChange = (value)=>{
        onFiltersChange({
            ...filters,
            createdDate: value
        });
    };
    const handleAgencyChange = (value)=>{
        onFiltersChange({
            ...filters,
            agency: value
        });
    };
    const handleAgentChange = (value)=>{
        onFiltersChange({
            ...filters,
            agent: value
        });
    };
    // Get unique agencies from available quotes or use all agencies
    const agencies = availableAgencies && availableAgencies.length > 0 ? availableAgencies : __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AGENCIES"];
    // Get unique agents from available quotes
    const agents = availableAgents || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                value: filters.status,
                onValueChange: handleStatusChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-[140px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: "Status"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "all",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "draft",
                                children: "Draft"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "pending",
                                children: "Pending"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "sent",
                                children: "Sent"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "accepted",
                                children: "Accepted"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "rejected",
                                children: "Rejected"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                value: filters.createdDate,
                onValueChange: handleDateChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-[160px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: "Created Date"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "all",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "last-7-days",
                                children: "Last 7 days"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "last-30-days",
                                children: "Last 30 days"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "last-90-days",
                                children: "Last 90 days"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                value: filters.agency,
                onValueChange: handleAgencyChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-[140px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: "Agency"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "all",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            agencies.map((agency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                    value: agency,
                                    children: agency
                                }, agency, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                value: filters.agent,
                onValueChange: handleAgentChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-[140px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: "Agent"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: "all",
                                children: "All"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            agents.map((agent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                    value: agent,
                                    children: agent
                                }, agent, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/utils/format-quote-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Format date as MM/DD/YYYY
 */ __turbopack_context__.s([
    "formatDate",
    ()=>formatDate
]);
function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/utils/quote-status.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getStatusBadgeVariant",
    ()=>getStatusBadgeVariant,
    "getStatusColorClasses",
    ()=>getStatusColorClasses,
    "getStatusLabel",
    ()=>getStatusLabel
]);
function getStatusBadgeVariant(status) {
    // Status badges use outline variant with custom colors
    return "outline";
}
function getStatusColorClasses(status) {
    const statusColors = {
        draft: "bg-muted text-muted-foreground border-muted",
        pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20",
        sent: "bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20",
        accepted: "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20",
        rejected: "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20"
    };
    return statusColors[status] || statusColors.draft;
}
function getStatusLabel(status) {
    const labels = {
        draft: "Draft",
        pending: "Pending",
        sent: "Sent",
        accepted: "Accepted",
        rejected: "Rejected"
    };
    return labels[status] || status;
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuotesTable",
    ()=>QuotesTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$format$2d$quote$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/utils/format-quote-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$quote$2d$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/utils/quote-status.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function QuotesTable({ quotes, onQuoteClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-md border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Table"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Quote Number"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 32,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Name"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Created Date"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Agency"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableHead"], {
                                children: "Agent"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableBody"], {
                    children: quotes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                            colSpan: 7,
                            className: "h-24 text-center text-muted-foreground",
                            children: "No quotes found."
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                            lineNumber: 44,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, this) : quotes.map((quote)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableRow"], {
                            onClick: ()=>onQuoteClick(quote.id),
                            className: "cursor-pointer hover:bg-muted/50 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    className: "font-medium",
                                    children: quote.quoteNumber
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: quote.name
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: quote.email
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-full px-2 py-0.5 text-xs font-medium", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$quote$2d$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStatusColorClasses"])(quote.status)),
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$quote$2d$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getStatusLabel"])(quote.status)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                        lineNumber: 59,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 58,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$format$2d$quote$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(quote.createdDate)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 69,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: quote.agency
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 70,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TableCell"], {
                                    children: quote.agent
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                                    lineNumber: 71,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, quote.id, true, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                            lineNumber: 50,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/utils/filter-quotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySearchAndFilters",
    ()=>applySearchAndFilters,
    "filterQuotes",
    ()=>filterQuotes,
    "searchQuotes",
    ()=>searchQuotes
]);
function searchQuotes(quotes, query) {
    if (!query.trim()) {
        return quotes;
    }
    const lowerQuery = query.toLowerCase().trim();
    return quotes.filter((quote)=>{
        const nameMatch = quote.name.toLowerCase().includes(lowerQuery);
        const emailMatch = quote.email.toLowerCase().includes(lowerQuery);
        return nameMatch || emailMatch;
    });
}
function filterQuotes(quotes, filters) {
    let filtered = [
        ...quotes
    ];
    // Filter by status
    if (filters.status !== "all") {
        filtered = filtered.filter((quote)=>quote.status === filters.status);
    }
    // Filter by created date
    if (filters.createdDate !== "all") {
        const now = new Date();
        let startDate;
        switch(filters.createdDate){
            case "last-7-days":
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case "last-30-days":
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case "last-90-days":
                startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(0); // Beginning of time
        }
        filtered = filtered.filter((quote)=>{
            return quote.createdDate >= startDate && quote.createdDate <= now;
        });
    }
    // Filter by agency
    if (filters.agency !== "all") {
        filtered = filtered.filter((quote)=>quote.agency === filters.agency);
    }
    // Filter by agent
    if (filters.agent !== "all") {
        filtered = filtered.filter((quote)=>quote.agent === filters.agent);
    }
    return filtered;
}
function applySearchAndFilters(quotes, searchQuery, filters) {
    // First apply search
    const searched = searchQuotes(quotes, searchQuery);
    // Then apply filters
    return filterQuotes(searched, filters);
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuotesList",
    ()=>QuotesList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/pagination.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quote$2d$search$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/quote-search.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quote$2d$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/quote-filters.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quotes$2d$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/quotes-table.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$filter$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/utils/filter-quotes.ts [app-ssr] (ecmascript)");
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
const DEFAULT_FILTERS = {
    status: "all",
    createdDate: "last-7-days",
    agency: "all",
    agent: "all"
};
const DEFAULT_PAGE_SIZE = 16;
function QuotesList({ quotes, initialFilters, initialSearch = "", initialPagination }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [searchQuery, setSearchQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialSearch);
    const [filters, setFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialFilters || DEFAULT_FILTERS);
    const [pagination, setPagination] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({
        page: initialPagination?.page || 1,
        pageSize: initialPagination?.pageSize || DEFAULT_PAGE_SIZE,
        total: initialPagination?.total || quotes.length
    });
    // Sync initialFilters prop to internal state when URL changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (initialFilters) {
            setFilters(initialFilters);
        }
    }, [
        initialFilters?.status,
        initialFilters?.createdDate,
        initialFilters?.agency,
        initialFilters?.agent
    ]);
    // Sync initialSearch prop to internal state when URL changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setSearchQuery(initialSearch);
    }, [
        initialSearch
    ]);
    // Sync initialPagination prop to internal state when URL changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (initialPagination?.page) {
            setPagination((prev)=>({
                    ...prev,
                    page: initialPagination.page
                }));
        }
    }, [
        initialPagination?.page
    ]);
    // Update URL params when filters/search/pagination change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const params = new URLSearchParams(searchParams.toString());
        // Update search
        if (searchQuery) {
            params.set("search", searchQuery);
        } else {
            params.delete("search");
        }
        // Update filters
        if (filters.status !== "all") {
            params.set("status", filters.status);
        } else {
            params.delete("status");
        }
        if (filters.createdDate !== DEFAULT_FILTERS.createdDate) {
            params.set("date", filters.createdDate);
        } else {
            params.delete("date");
        }
        if (filters.agency !== "all") {
            params.set("agency", filters.agency);
        } else {
            params.delete("agency");
        }
        if (filters.agent !== "all") {
            params.set("agent", filters.agent);
        } else {
            params.delete("agent");
        }
        // Update pagination
        if (pagination.page > 1) {
            params.set("page", pagination.page.toString());
        } else {
            params.delete("page");
        }
        // Update URL without causing a navigation
        const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
        window.history.replaceState({}, "", newUrl);
    }, [
        searchQuery,
        filters,
        pagination.page,
        pathname,
        searchParams
    ]);
    // Apply search and filters
    const filteredQuotes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$utils$2f$filter$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applySearchAndFilters"])(quotes, searchQuery, filters);
    }, [
        quotes,
        searchQuery,
        filters
    ]);
    // Update total when filters/search change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setPagination((prev)=>({
                ...prev,
                total: filteredQuotes.length,
                page: 1
            }));
    }, [
        filteredQuotes.length
    ]);
    // Get paginated quotes
    const paginatedQuotes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const start = (pagination.page - 1) * pagination.pageSize;
        const end = start + pagination.pageSize;
        return filteredQuotes.slice(start, end);
    }, [
        filteredQuotes,
        pagination.page,
        pagination.pageSize
    ]);
    // Get unique agencies and agents from filtered quotes
    const availableAgencies = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const agencies = new Set(filteredQuotes.map((q)=>q.agency));
        return Array.from(agencies).sort();
    }, [
        filteredQuotes
    ]);
    const availableAgents = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const agents = new Set(filteredQuotes.map((q)=>q.agent));
        return Array.from(agents).sort();
    }, [
        filteredQuotes
    ]);
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    const startIndex = (pagination.page - 1) * pagination.pageSize + 1;
    const endIndex = Math.min(pagination.page * pagination.pageSize, pagination.total);
    const handlePageChange = (newPage)=>{
        setPagination((prev)=>({
                ...prev,
                page: newPage
            }));
        // Scroll to top of table
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const handlePageSizeChange = (newPageSize)=>{
        setPagination((prev)=>({
                ...prev,
                pageSize: parseInt(newPageSize),
                page: 1
            }));
    };
    const handleQuoteClick = (quoteId)=>{
        // Navigate to quote detail page
        // For now, use current pattern: /?quote=[quoteId]
        // TODO: Update to /quotes/[quoteId] when routing is updated
        router.push(`/?quote=${quoteId}`);
    };
    const handleStartQuote = ()=>{
        router.push("/");
    };
    // Generate pagination items
    const getPaginationItems = ()=>{
        const items = [];
        const currentPage = pagination.page;
        const total = totalPages;
        if (total <= 7) {
            // Show all pages if 7 or fewer
            for(let i = 1; i <= total; i++){
                items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationLink"], {
                        href: "#",
                        onClick: (e)=>{
                            e.preventDefault();
                            handlePageChange(i);
                        },
                        isActive: i === currentPage,
                        className: "cursor-pointer",
                        children: i
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 213,
                        columnNumber: 13
                    }, this)
                }, i, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this));
            }
        } else {
            // Show first page
            items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationLink"], {
                    href: "#",
                    onClick: (e)=>{
                        e.preventDefault();
                        handlePageChange(1);
                    },
                    isActive: 1 === currentPage,
                    className: "cursor-pointer",
                    children: "1"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 231,
                    columnNumber: 11
                }, this)
            }, 1, false, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this));
            if (currentPage > 3) {
                items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationEllipsis"], {}, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 248,
                        columnNumber: 13
                    }, this)
                }, "ellipsis-start", false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this));
            }
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(total - 1, currentPage + 1);
            for(let i = start; i <= end; i++){
                items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationLink"], {
                        href: "#",
                        onClick: (e)=>{
                            e.preventDefault();
                            handlePageChange(i);
                        },
                        isActive: i === currentPage,
                        className: "cursor-pointer",
                        children: i
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 260,
                        columnNumber: 13
                    }, this)
                }, i, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 259,
                    columnNumber: 11
                }, this));
            }
            if (currentPage < total - 2) {
                items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationEllipsis"], {}, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 278,
                        columnNumber: 13
                    }, this)
                }, "ellipsis-end", false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 277,
                    columnNumber: 11
                }, this));
            }
            // Show last page
            items.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationLink"], {
                    href: "#",
                    onClick: (e)=>{
                        e.preventDefault();
                        handlePageChange(total);
                    },
                    isActive: total === currentPage,
                    className: "cursor-pointer",
                    children: total
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this)
            }, total, false, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 285,
                columnNumber: 9
            }, this));
        }
        return items;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold",
                        children: "Quotes"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleStartQuote,
                        className: "bg-green-600 hover:bg-green-700",
                        children: "Start Quote"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quote$2d$search$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuoteSearch"], {
                        value: searchQuery,
                        onChange: setSearchQuery
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quote$2d$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuoteFiltersComponent"], {
                        filters: filters,
                        onFiltersChange: setFilters,
                        availableAgencies: availableAgencies,
                        availableAgents: availableAgents
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quotes$2d$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuotesTable"], {
                quotes: paginatedQuotes,
                onQuoteClick: handleQuoteClick
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            pagination.total > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Pagination"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationContent"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationPrevious"], {
                                        href: "#",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            if (pagination.page > 1) {
                                                handlePageChange(pagination.page - 1);
                                            }
                                        },
                                        className: pagination.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                        lineNumber: 334,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                    lineNumber: 333,
                                    columnNumber: 15
                                }, this),
                                getPaginationItems(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationItem"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$pagination$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaginationNext"], {
                                        href: "#",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            if (pagination.page < totalPages) {
                                                handlePageChange(pagination.page + 1);
                                            }
                                        },
                                        className: pagination.page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        style: {
                            width: "400px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                style: {
                                    width: "fit-content"
                                },
                                children: "Rows per page:"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                value: pagination.pageSize.toString(),
                                onValueChange: handlePageSizeChange,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-[80px]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                            lineNumber: 376,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                        lineNumber: 375,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "16",
                                                children: "16"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                                lineNumber: 379,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "32",
                                                children: "32"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "50",
                                                children: "50"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "100",
                                                children: "100"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                        lineNumber: 378,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    startIndex,
                                    "-",
                                    endIndex,
                                    " of ",
                                    pagination.total
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                                lineNumber: 385,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx",
        lineNumber: 305,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/quotes-list/mock-quotes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_QUOTES",
    ()=>MOCK_QUOTES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/types.ts [app-ssr] (ecmascript)");
;
// Generate mock quotes with realistic data
const AGENTS = [
    "Aspen L",
    "Jakob D",
    "Maren C",
    "Blake L",
    "Sarah M",
    "Michael R",
    "Emily T",
    "David K",
    "Jessica W",
    "Ryan P"
];
const FIRST_NAMES = [
    "Sally",
    "Esther",
    "Theresa",
    "Darrell",
    "John",
    "Jane",
    "Robert",
    "Maria",
    "James",
    "Patricia",
    "Michael",
    "Jennifer",
    "William",
    "Linda",
    "David",
    "Elizabeth"
];
const LAST_NAMES = [
    "Gomez",
    "Howard",
    "Webb",
    "Steward",
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez"
];
const EMAIL_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "example.com"
];
// Generate random date within last 90 days
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Generate quote number from ID (format: KBD78E7744)
function generateQuoteNumber(id, index) {
    // Create format like "KBD78E7744" (alphanumeric, 10 chars)
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    let result = "";
    // Use index and timestamp to generate consistent but unique numbers
    const seed = id.charCodeAt(0) + index + Date.now();
    for(let i = 0; i < 10; i++){
        const charIndex = (seed + i * 7) % chars.length;
        result += chars[charIndex];
    }
    return result;
}
// Generate mock quotes
function generateMockQuotes(count) {
    const quotes = [];
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const statuses = [
        "draft",
        "pending",
        "sent",
        "accepted",
        "rejected"
    ];
    for(let i = 0; i < count; i++){
        const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
        const emailDomain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;
        const id = `quote-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${i}`;
        const quoteNumber = generateQuoteNumber(id, i);
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const agency = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AGENCIES"][Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$types$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AGENCIES"].length)];
        const agent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
        const createdDate = randomDate(ninetyDaysAgo, now);
        quotes.push({
            id,
            quoteNumber,
            name: `${firstName} ${lastName}`,
            email,
            status,
            createdDate,
            agency,
            agent
        });
    }
    return quotes;
}
const MOCK_QUOTES = generateMockQuotes(200);
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
"[project]/apps/portal/src/shared/hooks/use-theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
function useTheme() {
    const { theme, setTheme, resolvedTheme, systemTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return {
        theme,
        setTheme,
        resolvedTheme,
        systemTheme,
        isDark: resolvedTheme === "dark",
        isLight: resolvedTheme === "light"
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
    useEffect(()=>{
        if (context && '_registerRegistry' in context && typeof context._registerRegistry === 'function') {
            context._registerRegistry(registry);
        }
    }, [
        registry,
        context
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
                lineNumber: 210,
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
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 218,
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
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 222,
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
                                                    lineNumber: 230,
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
                                                                    lineNumber: 242,
                                                                    columnNumber: 27
                                                                }, this),
                                                                cmd.label
                                                            ]
                                                        }, cmd.id, true, {
                                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        !search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground mt-1",
                                            children: "Try searching for actions, navigation, or use shortcuts"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                        lineNumber: 216,
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
                                            lineNumber: 284,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-1 items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: command.label
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, this),
                                                command.meta && !isActiveTheme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: command.meta
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 288,
                                                    columnNumber: 23
                                                }, this),
                                                isActiveTheme && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: "h-5 text-xs bg-primary/10 text-primary border-primary/20",
                                                    children: "Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 23
                                                }, this),
                                                command.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: `h-5 text-xs ${statusColors[command.status] || ""}`,
                                                    children: command.status
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 301,
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
                                                    lineNumber: 309,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                favorite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                    className: "h-3.5 w-3.5 fill-yellow-500 text-yellow-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 316,
                                                    columnNumber: 23
                                                }, this),
                                                displayShortcut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$command$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandShortcut"], {
                                                    children: displayShortcut
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                                    lineNumber: 319,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                            lineNumber: 314,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, command.id, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                                    lineNumber: 273,
                                    columnNumber: 17
                                }, this);
                            })
                        }, group, false, {
                            fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/command-palette.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/app/quotes/quotes-page-content.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuotesPageContent",
    ()=>QuotesPageContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quotes$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/quotes-list.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$mock$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/quotes-list/mock-quotes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/command-palette.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function QuotesPageContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Get initial values from URL params
    const initialSearch = searchParams.get("search") || "";
    const initialStatus = searchParams.get("status") || "all";
    const initialDate = searchParams.get("date") || "last-7-days";
    const initialAgency = searchParams.get("agency") || "all";
    const initialAgent = searchParams.get("agent") || "all";
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    // Command palette handlers
    const handleStartQuote = ()=>{
        router.push("/");
    };
    const handleOpenQuote = (quoteId)=>{
        router.push(`/?quote=${quoteId}`);
    };
    const handleFilterStatus = (status)=>{
        // Update URL params
        const params = new URLSearchParams(searchParams.toString());
        if (status === "all") {
            params.delete("status");
        } else {
            params.set("status", status);
        }
        // Keep other params
        params.set("page", "1"); // Reset to first page when filtering
        router.push(`/quotes?${params.toString()}`);
    };
    const handleClearFilters = ()=>{
        router.push("/quotes");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-screen w-full bg-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 flex-col overflow-auto bg-background pb-0 pt-14",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 pt-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$quotes$2d$list$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuotesList"], {
                            quotes: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$mock$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_QUOTES"],
                            initialFilters: {
                                status: initialStatus,
                                createdDate: initialDate,
                                agency: initialAgency,
                                agent: initialAgent
                            },
                            initialSearch: initialSearch,
                            initialPagination: {
                                page: initialPage
                            }
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/app/quotes/quotes-page-content.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/app/quotes/quotes-page-content.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/app/quotes/quotes-page-content.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/app/quotes/quotes-page-content.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$command$2d$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandPalette"], {
                isQuotesPage: true,
                availableQuotes: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$quotes$2d$list$2f$mock$2d$quotes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_QUOTES"],
                onStartQuote: handleStartQuote,
                onOpenQuote: handleOpenQuote,
                onFilterStatus: handleFilterStatus,
                onClearFilters: handleClearFilters
            }, void 0, false, {
                fileName: "[project]/apps/portal/app/quotes/quotes-page-content.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=apps_portal_d9d23e02._.js.map