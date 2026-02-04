module.exports = [
"[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImportLoadingScreen",
    ()=>ImportLoadingScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
"use client";
;
;
;
function ImportLoadingScreen({ clientName = "Sally", source = "ezlynx", onComplete }) {
    const [status, setStatus] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("Connecting to Ezlynx...");
    const [isComplete, setIsComplete] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const simulateImport = async ()=>{
            // Step 1: Connect
            await delay(500);
            setStatus("Connecting to Ezlynx...");
            // Step 2: Fetch
            await delay(800);
            setStatus("Fetching quote data...");
            // Step 3: Check records
            await delay(1000);
            setStatus(`Checking ${clientName}'s records...`);
            // Step 4: Import
            await delay(700);
            setStatus("Importing quote...");
            // Complete
            await delay(300);
            setIsComplete(true);
            onComplete?.();
        };
        simulateImport();
    }, [
        clientName,
        onComplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-muted/90 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "70",
                        height: "16",
                        viewBox: "0 0 70 16",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-5 w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M69.3298 7.99496C69.3298 12.4105 65.7872 15.9899 61.4172 15.9899C57.0471 15.9899 53.5045 12.4105 53.5045 7.99496C53.5045 3.57946 57.0471 0 61.4172 0C65.7872 0 69.3298 3.57946 69.3298 7.99496ZM57.4608 7.99496C57.4608 10.2027 59.2321 11.9924 61.4172 11.9924C63.6022 11.9924 65.3735 10.2027 65.3735 7.99496C65.3735 5.78721 63.6022 3.99748 61.4172 3.99748C59.2321 3.99748 57.4608 5.78721 57.4608 7.99496Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                                d: "M47.5587 0.00452292H51.5005V8.31626C51.5005 9.41643 51.0911 10.4764 50.3535 11.2857L47.7322 14.1621C46.6646 15.3335 45.1606 16 43.5846 16C42.009 15.9995 40.5055 15.3331 39.438 14.1621L36.8166 11.2864C36.0784 10.4766 35.6687 9.41601 35.6687 8.31513V0.00452292H39.6104V7.52455C39.6104 8.54647 40.0027 9.53486 40.6979 10.2772C42.2586 11.9437 44.9106 11.9437 46.4713 10.2772C47.1664 9.53486 47.5587 8.54647 47.5587 7.52455V0.00452292ZM36.4703 0.814125H38.7749V8.91919H36.4703V0.814125ZM48.3942 0.814125H50.6988V8.91919H48.3942V0.814125Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M33.6646 7.99496C33.6646 12.4105 30.122 15.9899 25.7519 15.9899C21.3819 15.9899 17.8393 12.4105 17.8393 7.99496C17.8393 3.57946 21.3819 0 25.7519 0C30.122 0 33.6646 3.57946 33.6646 7.99496ZM21.7956 7.99496C21.7956 10.2027 23.5669 11.9924 25.7519 11.9924C27.9369 11.9924 29.7083 10.2027 29.7083 7.99496C29.7083 5.78721 27.9369 3.99748 25.7519 3.99748C23.5669 3.99748 21.7956 5.78721 21.7956 7.99496Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M13.5078 2.34167C14.9917 3.84102 15.8253 5.87456 15.8253 7.99496H15.0302V7.08288H12.7256V7.99496H11.869C11.869 6.93476 11.4522 5.91799 10.7102 5.16831C9.96825 4.41864 8.96194 3.99748 7.91266 3.99748C6.86338 3.99748 5.85707 4.41864 5.11511 5.16831C4.37316 5.91799 3.95633 6.93476 3.95633 7.99496H3.10625V7.08288H0.801618V7.99496H0C0 5.87456 0.833654 3.84101 2.31757 2.34167C3.80148 0.842323 5.81409 0 7.91266 0C10.0112 0 12.0238 0.842324 13.5078 2.34167Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0.801618 8.00104H0.000139886V15.996H3.95647V8.00104H3.10625V15.1906H0.801618V8.00104Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12.7256 8.00104H11.8789V15.996L15.8352 15.996V8.00104H15.0302V15.1906H12.7256V8.00104Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "64",
                        height: "64",
                        viewBox: "0 0 64 64",
                        className: "animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                points: "32,8 48,20 32,32 16,20",
                                fill: "#000000",
                                className: "dark:fill-white"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                points: "48,20 48,44 32,56 32,32",
                                fill: "#22c55e"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                points: "16,20 32,32 32,56 16,44",
                                fill: "#16a34a"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-medium text-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: "Importing quote from Ezlynx"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: status
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed bottom-6 left-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-sm dark:border-green-800 dark:bg-green-950",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-4 w-4 animate-spin text-green-600 dark:text-green-400"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: [
                                    "We are checking ",
                                    clientName,
                                    "'s records..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
}),
"[project]/apps/portal/src/screens/components/import/mock-ezlynx-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_EZLYNX_QUOTE",
    ()=>MOCK_EZLYNX_QUOTE
]);
const MOCK_EZLYNX_QUOTE = {
    quoteNumber: "KBD78E7747",
    clientInfo: {
        firstName: "Sally",
        lastName: "Gomez",
        dateOfBirth: new Date("1985-05-15"),
        email: "sally.gomez@example.com",
        phone: "(480) 555-1234",
        address: "5211 S McQueen Rd, Chandler, AZ 85249",
        driversLicense: "D12345678",
        driversLicenseState: "AZ"
    },
    drivers: [
        {
            id: "driver-1",
            firstName: "Sally",
            lastName: "Gomez",
            dateOfBirth: "1985-05-15",
            relationship: "Self",
            gender: "Female",
            maritalStatus: "Married",
            email: "sally.gomez@example.com",
            phone: "(480) 555-1234",
            includeInPolicy: true,
            licenseNumber: "D12345678",
            licenseState: "AZ",
            licenseStatus: "Active",
            yearsLicensed: "14"
        },
        {
            id: "driver-2",
            firstName: "Robert",
            lastName: "Gomez",
            dateOfBirth: "1983-08-22",
            relationship: "Spouse",
            gender: "Male",
            maritalStatus: "Married",
            email: "robert.gomez@example.com",
            phone: "(480) 555-1235",
            includeInPolicy: true,
            licenseNumber: "D87654321",
            licenseState: "AZ",
            licenseStatus: "Active",
            yearsLicensed: "16"
        }
    ],
    vehicles: [
        {
            id: "vehicle-1",
            year: "2023",
            make: "Honda",
            model: "Accord",
            trim: "",
            vin: "",
            ownershipType: "Own",
            primaryUse: "Commute",
            annualMileage: "12000",
            ownershipLength: "",
            garagingZipSame: "Yes"
        }
    ],
    importSummary: {
        importedInfo: {
            drivers: [
                {
                    name: "Sally Gomez"
                },
                {
                    name: "Robert Gomez"
                }
            ],
            vehicles: [
                {
                    year: "2023",
                    make: "Honda",
                    model: "Accord"
                }
            ]
        },
        premiumEstimate: {
            monthly: 142,
            currency: "USD"
        },
        missingInfo: [
            {
                id: "coverage-gap",
                label: "Verify Coverage Gap",
                checked: false,
                severity: "warning",
                workflowStage: "underwriting",
                relatedSection: "coverage",
                details: {
                    type: "coverage-gap",
                    data: {
                        gapPeriod: {
                            start: "2024-03-15",
                            end: "2024-04-30",
                            days: 45
                        },
                        previousCarrier: "State Farm",
                        currentCarrier: "Geico",
                        currentCarrierStart: "2024-05-01",
                        applicationStates: "Continuous coverage for 3+ years",
                        reportShows: "45-day gap in coverage",
                        rateImpact: {
                            current: 1847,
                            potential: 1667,
                            savings: -180
                        }
                    }
                }
            },
            {
                id: "accident-history",
                label: "Verify Accident History",
                checked: false,
                severity: "warning",
                workflowStage: "underwriting",
                relatedSection: "driver",
                details: {
                    type: "accident-history",
                    data: {
                        driverName: "Sally Gomez",
                        reportDate: "2026-01-08",
                        licenseNumber: "D12345678",
                        licenseState: "AZ",
                        status: "Clean Driver",
                        summary: {
                            violations: "No violations in past 3 years",
                            accidents: "No accidents reported",
                            licenseStatus: "Valid license status",
                            licenseClass: "License class: C (Standard)"
                        },
                        impact: "This report has no impact on the quote rating."
                    }
                }
            },
            {
                id: "missing-vin",
                label: "VIN of 2023 Accord Missing",
                checked: false,
                severity: "error",
                workflowStage: "bind",
                relatedSection: "vehicle",
                details: {
                    type: "missing-vin",
                    data: {
                        vehicleId: "vehicle-1",
                        vehicleName: "2023 Honda Accord"
                    }
                }
            },
            {
                id: "additional-driver",
                label: "(1) Additional driver found",
                checked: false,
                severity: "info",
                workflowStage: "bind",
                relatedSection: "driver",
                details: {
                    type: "additional-driver",
                    data: {
                        driverName: "Robert Gomez"
                    }
                }
            }
        ],
        thirdPartyReports: {
            status: "completed",
            reports: [
                {
                    type: "financial-score",
                    status: "completed",
                    provider: "Verisk"
                },
                {
                    type: "verify-coverage",
                    status: "completed",
                    provider: "Verisk",
                    findings: {
                        gapDetected: true,
                        gapPeriod: {
                            start: "2024-03-15",
                            end: "2024-04-30",
                            days: 45
                        }
                    }
                },
                {
                    type: "verify-claims",
                    status: "completed",
                    provider: "CLUE"
                },
                {
                    type: "mvr",
                    status: "completed",
                    provider: "State DMV"
                },
                {
                    type: "car-report",
                    status: "pending",
                    provider: "Carfax",
                    pendingReason: "VIN required"
                }
            ]
        }
    }
};
}),
"[project]/apps/portal/app/import/ezlynx/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImportEzlynxPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$import$2f$import$2d$loading$2d$screen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/import/import-loading-screen.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$import$2f$mock$2d$ezlynx$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/import/mock-ezlynx-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function ImportEzlynxPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { importQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    const [isImporting, setIsImporting] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](true);
    const handleImportComplete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async ()=>{
        try {
            await importQuote({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$import$2f$mock$2d$ezlynx$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_EZLYNX_QUOTE"],
                importSource: "ezlynx"
            });
            // Navigate to quote page - it will show import summary tab
            router.push("/?imported=true");
        } catch (error) {
            console.error("Failed to import quote:", error);
        // TODO: Show error message
        } finally{
            setIsImporting(false);
        }
    }, [
        importQuote,
        router
    ]);
    if (isImporting) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$import$2f$import$2d$loading$2d$screen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImportLoadingScreen"], {
            clientName: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$import$2f$mock$2d$ezlynx$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_EZLYNX_QUOTE"].clientInfo.firstName,
            source: "ezlynx",
            onComplete: handleImportComplete
        }, void 0, false, {
            fileName: "[project]/apps/portal/app/import/ezlynx/page.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this);
    }
    return null;
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RefreshCw
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const RefreshCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("RefreshCw", [
    [
        "path",
        {
            d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
            key: "v9h5vc"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ],
    [
        "path",
        {
            d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
            key: "3uifl3"
        }
    ],
    [
        "path",
        {
            d: "M8 16H3v5",
            key: "1cv678"
        }
    ]
]);
;
 //# sourceMappingURL=refresh-cw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshCw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_4e9548cd._.js.map