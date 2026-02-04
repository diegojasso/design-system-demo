module.exports = [
"[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAutoSave",
    ()=>useAutoSave
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useAutoSave({ data, saveFn, debounceMs = 2000, enabled = true, onSaveStart, onSaveSuccess, onSaveError }) {
    const [isSaving, setIsSaving] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [lastSaved, setLastSaved] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    const timeoutRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const previousDataRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](data);
    const isInitialMount = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](true);
    // Save function
    const performSave = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (!enabled) return;
        setIsSaving(true);
        setError(null);
        onSaveStart?.();
        try {
            await saveFn(data);
            setLastSaved(new Date());
            previousDataRef.current = data;
            onSaveSuccess?.();
        } catch (err) {
            const error = err instanceof Error ? err : new Error("Failed to save");
            setError(error);
            onSaveError?.(error);
        } finally{
            setIsSaving(false);
        }
    }, [
        data,
        saveFn,
        enabled,
        onSaveStart,
        onSaveSuccess,
        onSaveError
    ]);
    // Debounced save
    const debouncedSave = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(()=>{
            performSave();
        }, debounceMs);
    }, [
        performSave,
        debounceMs
    ]);
    // Check if data has changed
    const hasDataChanged = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((prev, current)=>{
        return JSON.stringify(prev) !== JSON.stringify(current);
    }, []);
    // Auto-save on data change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // Skip on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            previousDataRef.current = data;
            return;
        }
        // Only save if data has actually changed
        if (!hasDataChanged(previousDataRef.current, data)) {
            return;
        }
        debouncedSave();
        // Cleanup timeout on unmount or data change
        return ()=>{
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [
        data,
        debouncedSave,
        hasDataChanged
    ]);
    // Save immediately (for manual triggers or before navigation)
    const saveNow = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        await performSave();
    }, [
        performSave
    ]);
    // Save before unmount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        return ()=>{
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        // Optionally save on unmount if there are unsaved changes
        // This could be too aggressive, so we'll skip it for now
        };
    }, []);
    return {
        isSaving,
        lastSaved,
        error,
        saveNow
    };
}
}),
"[project]/apps/portal/src/shared/quote-binding.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUnbindableImportCount",
    ()=>getUnbindableImportCount,
    "isQuoteUnbindable",
    ()=>isQuoteUnbindable
]);
function getUnbindableImportCount(importSummary) {
    if (!importSummary) return 0;
    return importSummary.missingInfo.filter((item)=>{
        return !item.checked || item.severity === "error" || item.severity === "warning";
    }).length;
}
function isQuoteUnbindable(importSummary) {
    return getUnbindableImportCount(importSummary) > 0;
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
"[project]/apps/portal/src/shared/import-summary-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWorkflowStage",
    ()=>getWorkflowStage
]);
function getWorkflowStage(item) {
    if (item.workflowStage) {
        return item.workflowStage;
    }
    const type = item.details?.type;
    switch(type){
        case "missing-vin":
            return "bind";
        case "coverage-gap":
        case "accident-history":
            return "underwriting";
        case "additional-driver":
            return "bind";
        default:
            if (item.severity === "error") {
                return "quote";
            }
            if (item.severity === "warning") {
                return "underwriting";
            }
            return "bind";
    }
}
}),
"[project]/apps/portal/src/shared/import-summary-vm.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildImportSummaryVm",
    ()=>buildImportSummaryVm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$import$2d$summary$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/import-summary-utils.ts [app-ssr] (ecmascript)");
;
function buildImportSummaryVm({ importSummary, quoteNumber, primaryAddress, clientName }) {
    const groupedItems = {
        quote: [],
        underwriting: [],
        bind: []
    };
    importSummary.missingInfo.forEach((item)=>{
        const stage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$import$2d$summary$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWorkflowStage"])(item);
        groupedItems[stage].push(item);
    });
    const timelineEvents = [
        {
            id: "connect",
            labelKey: "import-summary.timeline.connected",
            status: "completed",
            timestamp: new Date(Date.now() - 5000)
        },
        {
            id: "fetch",
            labelKey: "import-summary.timeline.fetched",
            status: "completed",
            timestamp: new Date(Date.now() - 4000)
        },
        {
            id: "import-drivers",
            labelKey: "import-summary.timeline.import-drivers",
            labelParams: {
                count: importSummary.importedInfo.drivers.length,
                countSuffix: importSummary.importedInfo.drivers.length === 1 ? "" : "s"
            },
            status: "completed",
            timestamp: new Date(Date.now() - 3000)
        },
        {
            id: "import-vehicles",
            labelKey: "import-summary.timeline.import-vehicles",
            labelParams: {
                count: importSummary.importedInfo.vehicles.length,
                countSuffix: importSummary.importedInfo.vehicles.length === 1 ? "" : "s"
            },
            status: "completed",
            timestamp: new Date(Date.now() - 2000)
        }
    ];
    if (importSummary.thirdPartyReports) {
        importSummary.thirdPartyReports.reports.forEach((report)=>{
            const status = report.status === "completed" ? "completed" : report.status === "failed" ? "failed" : "pending";
            timelineEvents.push({
                id: `report-${report.type}`,
                labelKey: "import-summary.timeline.report",
                labelParams: {
                    reportType: report.type.toUpperCase(),
                    status
                },
                status,
                timestamp: new Date(Date.now() - 1000)
            });
        });
    }
    return {
        header: {
            quoteNumber,
            primaryAddress,
            premiumEstimate: importSummary.premiumEstimate,
            thirdPartyReports: importSummary.thirdPartyReports
        },
        groupedItems,
        importedInfo: importSummary.importedInfo,
        timelineEvents,
        clientName
    };
}
}),
"[project]/apps/portal/src/shared/messages/import-summary-messages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "importSummaryMessages",
    ()=>importSummaryMessages
]);
const importSummaryMessages = {
    "import-summary.empty": "No import summary available",
    "import-summary.action-required": "Action Required",
    "import-summary.aria-label": "Import summary",
    "import-summary.all-requirements-met": "All requirements met",
    "import-summary.ready-to-proceed": "Ready to proceed with quote generation",
    "import-summary.clients-information": "Client's Information",
    "import-summary.coverage-gap-title": "Coverage Gap Resolution",
    "import-summary.coverage-gap-description": "Step-by-step guide to resolve the coverage gap for {clientName}",
    "import-summary.mvr-title": "MVR Report - {driverName}",
    "import-summary.mvr-description": "Review the Motor Vehicle Record report for this driver.",
    "import-summary.driver-information": "Driver Information",
    "import-summary.status-label": "Status:",
    "import-summary.report-date-label": "Report Date:",
    "import-summary.license-number-label": "License Number:",
    "import-summary.summary": "Summary",
    "import-summary.close": "Close",
    "import-summary.download-report": "Download Full Report PDF ↓",
    "import-summary.verify-close": "Verify & Close",
    "import-summary.timeline.connected": "Connected to Ezlynx",
    "import-summary.timeline.fetched": "Fetched quote data",
    "import-summary.timeline.import-drivers": "Imported {count} driver{countSuffix}",
    "import-summary.timeline.import-vehicles": "Imported {count} vehicle{countSuffix}",
    "import-summary.timeline.report": "{reportType} report {status}",
    "import-summary.timeline.title": "Import Timeline",
    "import-summary.timeline.summary": "{completed} completed{pendingSuffix}",
    "import-summary.timeline.pending-suffix": ", {count} pending",
    "import-summary.timeline.status.completed": "completed",
    "import-summary.timeline.status.pending": "pending",
    "import-summary.timeline.status.failed": "failed",
    "import-summary.stage.quote.label": "Needed for Quote",
    "import-summary.stage.quote.description": "Items required to generate quote",
    "import-summary.stage.underwriting.label": "Needed for Underwriting",
    "import-summary.stage.underwriting.description": "Items required for underwriting review",
    "import-summary.stage.bind.label": "Needed for Bind",
    "import-summary.stage.bind.description": "Items required to bind policy",
    "import-summary.stage.unresolved": "{count} unresolved",
    "import-summary.stage.all-resolved": "All resolved ✓",
    "import-summary.item.help.error": "This is a critical issue that must be resolved before proceeding.",
    "import-summary.item.help.warning": "This item requires review. It may impact the quote rating.",
    "import-summary.item.help.info": "This is informational. Review and resolve as needed.",
    "import-summary.item.vehicle-label": "Vehicle: {vehicleName}",
    "import-summary.item.click-details": "Click to view details",
    "import-summary.item.navigate-to": "Navigate to {section}",
    "import-summary.header.premium-estimate": "Premium Estimate",
    "import-summary.header.quote-number": "Quote Number",
    "import-summary.header.primary-address": "Primary Address",
    "import-summary.header.third-party-reports": "3rd Party Reports",
    "import-summary.header.copy-quote-number": "Copy quote number",
    "import-summary.header.premium-unavailable": "N/A"
};
}),
"[project]/apps/portal/src/shared/hooks/use-messages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMessages",
    ()=>useMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$messages$2f$import$2d$summary$2d$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/messages/import-summary-messages.ts [app-ssr] (ecmascript)");
;
function useMessages() {
    return (key, params)=>{
        const template = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$messages$2f$import$2d$summary$2d$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["importSummaryMessages"][key];
        if (!template) {
            return key;
        }
        if (!params) return template;
        return template.replace(/\{(\w+)\}/g, (_, token)=>{
            const value = params[token];
            return value === undefined ? "" : String(value);
        });
    };
}
}),
];

//# sourceMappingURL=apps_portal_src_shared_ce2a0895._.js.map