(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/portal/src/screens/components/client-info-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientInfoForm",
    ()=>ClientInfoForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as CalendarIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/calendar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/popover.tsx [app-client] (ecmascript)");
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
// US States list
const US_STATES = [
    {
        value: "AL",
        label: "Alabama"
    },
    {
        value: "AK",
        label: "Alaska"
    },
    {
        value: "AZ",
        label: "Arizona"
    },
    {
        value: "AR",
        label: "Arkansas"
    },
    {
        value: "CA",
        label: "California"
    },
    {
        value: "CO",
        label: "Colorado"
    },
    {
        value: "CT",
        label: "Connecticut"
    },
    {
        value: "DE",
        label: "Delaware"
    },
    {
        value: "FL",
        label: "Florida"
    },
    {
        value: "GA",
        label: "Georgia"
    },
    {
        value: "HI",
        label: "Hawaii"
    },
    {
        value: "ID",
        label: "Idaho"
    },
    {
        value: "IL",
        label: "Illinois"
    },
    {
        value: "IN",
        label: "Indiana"
    },
    {
        value: "IA",
        label: "Iowa"
    },
    {
        value: "KS",
        label: "Kansas"
    },
    {
        value: "KY",
        label: "Kentucky"
    },
    {
        value: "LA",
        label: "Louisiana"
    },
    {
        value: "ME",
        label: "Maine"
    },
    {
        value: "MD",
        label: "Maryland"
    },
    {
        value: "MA",
        label: "Massachusetts"
    },
    {
        value: "MI",
        label: "Michigan"
    },
    {
        value: "MN",
        label: "Minnesota"
    },
    {
        value: "MS",
        label: "Mississippi"
    },
    {
        value: "MO",
        label: "Missouri"
    },
    {
        value: "MT",
        label: "Montana"
    },
    {
        value: "NE",
        label: "Nebraska"
    },
    {
        value: "NV",
        label: "Nevada"
    },
    {
        value: "NH",
        label: "New Hampshire"
    },
    {
        value: "NJ",
        label: "New Jersey"
    },
    {
        value: "NM",
        label: "New Mexico"
    },
    {
        value: "NY",
        label: "New York"
    },
    {
        value: "NC",
        label: "North Carolina"
    },
    {
        value: "ND",
        label: "North Dakota"
    },
    {
        value: "OH",
        label: "Ohio"
    },
    {
        value: "OK",
        label: "Oklahoma"
    },
    {
        value: "OR",
        label: "Oregon"
    },
    {
        value: "PA",
        label: "Pennsylvania"
    },
    {
        value: "RI",
        label: "Rhode Island"
    },
    {
        value: "SC",
        label: "South Carolina"
    },
    {
        value: "SD",
        label: "South Dakota"
    },
    {
        value: "TN",
        label: "Tennessee"
    },
    {
        value: "TX",
        label: "Texas"
    },
    {
        value: "UT",
        label: "Utah"
    },
    {
        value: "VT",
        label: "Vermont"
    },
    {
        value: "VA",
        label: "Virginia"
    },
    {
        value: "WA",
        label: "Washington"
    },
    {
        value: "WV",
        label: "West Virginia"
    },
    {
        value: "WI",
        label: "Wisconsin"
    },
    {
        value: "WY",
        label: "Wyoming"
    },
    {
        value: "DC",
        label: "District of Columbia"
    }
];
// Phone number formatting helper
function formatPhoneNumber(value) {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
        return digits;
    } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
}
// Zod validation schema
const clientInfoSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    firstName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "First name is required"),
    lastName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Last name is required"),
    dateOfBirth: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["date"]({
        required_error: "Date of birth is required",
        invalid_type_error: "Please select a valid date"
    }).max(new Date(), "Date cannot be in the future"),
    driversLicense: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional(),
    driversLicenseState: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().email("Invalid email address").min(1, "Email is required"),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Phone number is required").regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number must be in format (555) 123-4567"),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Address is required")
}).refine((data)=>{
    // If license number is provided, state is required
    if (data.driversLicense && !data.driversLicenseState) {
        return false;
    }
    return true;
}, {
    message: "License state is required when license number is provided",
    path: [
        "driversLicenseState"
    ]
});
function ClientInfoForm() {
    _s();
    const { quoteData, updateClientInfo, saveQuote, setCurrentStep } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    // Track if we've initialized the form
    const hasInitialized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Load initial values from quote context if available, otherwise use defaults
    const defaultValues = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ClientInfoForm.useMemo[defaultValues]": ()=>{
            if (quoteData.clientInfo) {
                return {
                    ...quoteData.clientInfo,
                    // Ensure dateOfBirth is a Date object
                    dateOfBirth: quoteData.clientInfo.dateOfBirth instanceof Date ? quoteData.clientInfo.dateOfBirth : new Date(quoteData.clientInfo.dateOfBirth)
                };
            }
            return {
                firstName: "Sally",
                lastName: "Gomez",
                dateOfBirth: new Date("1990-01-01"),
                email: "sally.gomez@example.com",
                phone: "(555) 123-4567",
                address: "5211 S McQueen Rd, Chandler, AZ 85249"
            };
        }
    }["ClientInfoForm.useMemo[defaultValues]"], [
        quoteData.clientInfo
    ]);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(clientInfoSchema),
        defaultValues
    });
    // Reset form when quote data is loaded (only once on initial load)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ClientInfoForm.useEffect": ()=>{
            if (!hasInitialized.current && quoteData.clientInfo) {
                form.reset(defaultValues);
                hasInitialized.current = true;
            }
        }
    }["ClientInfoForm.useEffect"], [
        quoteData.clientInfo,
        defaultValues,
        form
    ]);
    // Watch form values for auto-save
    const formValues = form.watch();
    // Auto-save when form values change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: formValues,
        saveFn: {
            "ClientInfoForm.useAutoSave": async (data)=>{
                updateClientInfo(data);
                await saveQuote();
            }
        }["ClientInfoForm.useAutoSave"],
        debounceMs: 2000,
        enabled: form.formState.isDirty
    });
    // Track form snapshot for undo functionality
    const [formSnapshot, setFormSnapshot] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    // Capture snapshot when user starts editing (on focus of any field)
    const handleFieldFocus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "ClientInfoForm.useCallback[handleFieldFocus]": ()=>{
            if (!formSnapshot) {
                setFormSnapshot(form.getValues());
            }
        }
    }["ClientInfoForm.useCallback[handleFieldFocus]"], [
        form,
        formSnapshot
    ]);
    // Track if snapshot was set by submission (vs initial edit)
    const snapshotFromSubmissionRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Reset snapshot when form becomes clean (after undo, but not after submission)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ClientInfoForm.useEffect": ()=>{
            if (!form.formState.isDirty && formSnapshot && !snapshotFromSubmissionRef.current) {
                // Form is clean after undo, reset snapshot so we can capture a new one when editing starts again
                setFormSnapshot(null);
            }
            // Reset the flag when form becomes dirty again
            if (form.formState.isDirty) {
                snapshotFromSubmissionRef.current = false;
            }
        }
    }["ClientInfoForm.useEffect"], [
        form.formState.isDirty,
        formSnapshot
    ]);
    // Handle ESC key to undo changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ClientInfoForm.useEffect": ()=>{
            const handleKeyDown = {
                "ClientInfoForm.useEffect.handleKeyDown": (e)=>{
                    // Only handle ESC if form has been modified and we have a snapshot
                    if (e.key === 'Escape' && form.formState.isDirty && formSnapshot) {
                        // Don't trigger if user is interacting with a select dropdown
                        const target = e.target;
                        const isSelect = target.closest('[data-slot="select"]') !== null;
                        const isPopover = target.closest('[data-radix-popper-content-wrapper]') !== null;
                        // Allow ESC in input fields and buttons, but not in select dropdowns or popovers
                        if (!isSelect && !isPopover) {
                            e.preventDefault();
                            form.reset(formSnapshot);
                        }
                    }
                }
            }["ClientInfoForm.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "ClientInfoForm.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["ClientInfoForm.useEffect"];
        }
    }["ClientInfoForm.useEffect"], [
        form,
        formSnapshot
    ]);
    const onSubmit = (data)=>{
        console.log("Form submitted:", data);
        // Update snapshot to current values after successful submission
        snapshotFromSubmissionRef.current = true;
        setFormSnapshot(data);
        // Navigate to next step
        setCurrentStep("vehicle").catch((error)=>{
            console.error("Failed to navigate to next step:", error);
        });
    };
    // Handle phone number formatting
    const handlePhoneChange = (value)=>{
        const formatted = formatPhoneNumber(value);
        form.setValue("phone", formatted, {
            shouldValidate: true
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "mb-8 w-full rounded-[12px] gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "px-6 pt-6 pb-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground",
                            style: {
                                fontFamily: "Geist, sans-serif"
                            },
                            children: "Client Information"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "text-base font-normal leading-[1.5] text-muted-foreground",
                            style: {
                                fontFamily: "Geist, sans-serif"
                            },
                            children: "Enter the primary insured's basic information"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "px-6 pb-6 pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
                    ...form,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: form.handleSubmit(onSubmit),
                        className: "space-y-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                className: "gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldSet"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLegend"], {
                                                children: "Personal Information"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                                className: "gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                    control: form.control,
                                                                    name: "firstName",
                                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                        children: "First Name"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 307,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 306,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                ...field,
                                                                                                className: "h-10 text-base leading-[1.5]",
                                                                                                style: {
                                                                                                    fontFamily: "Inter, sans-serif"
                                                                                                },
                                                                                                onFocus: handleFieldFocus,
                                                                                                onKeyDown: (e)=>{
                                                                                                    if (e.key === "Enter") {
                                                                                                        e.preventDefault();
                                                                                                        form.setFocus("lastName");
                                                                                                    }
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 311,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 310,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 324,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 309,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 305,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 301,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 300,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                    control: form.control,
                                                                    name: "lastName",
                                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                        children: "Last Name"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 337,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 336,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                ...field,
                                                                                                className: "h-10 text-base leading-[1.5]",
                                                                                                style: {
                                                                                                    fontFamily: "Inter, sans-serif"
                                                                                                },
                                                                                                onFocus: handleFieldFocus,
                                                                                                onKeyDown: (e)=>{
                                                                                                    if (e.key === "Enter") {
                                                                                                        e.preventDefault();
                                                                                                        // Focus date picker trigger
                                                                                                        document.getElementById("date-of-birth-trigger")?.click();
                                                                                                    }
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 341,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 340,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 355,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 339,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 335,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 331,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 330,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                            control: form.control,
                                                            name: "dateOfBirth",
                                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                children: "Date of Birth"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 371,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 370,
                                                                            columnNumber: 27
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                                                            asChild: true,
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                                    id: "date-of-birth-trigger",
                                                                                                    variant: "outline",
                                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-10 w-full justify-start text-left font-normal text-base", !field.value && "text-muted-foreground"),
                                                                                                    style: {
                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                    },
                                                                                                    onFocus: handleFieldFocus,
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarIcon$3e$__["CalendarIcon"], {
                                                                                                            className: "mr-2 h-4 w-4"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                            lineNumber: 387,
                                                                                                            columnNumber: 37
                                                                                                        }, void 0),
                                                                                                        field.value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(field.value, "MM/dd/yyyy") : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            children: "MM/DD/YYYY"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                            lineNumber: 391,
                                                                                                            columnNumber: 39
                                                                                                        }, void 0)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                    lineNumber: 377,
                                                                                                    columnNumber: 35
                                                                                                }, void 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 376,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 375,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                                                            className: "w-auto p-0",
                                                                                            align: "start",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$calendar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Calendar"], {
                                                                                                mode: "single",
                                                                                                selected: field.value,
                                                                                                onSelect: field.onChange,
                                                                                                disabled: (date)=>date > new Date() || date < new Date("1900-01-01"),
                                                                                                initialFocus: true
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 397,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 396,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 374,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 408,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 373,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 369,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                            lineNumber: 365,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldSet"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLegend"], {
                                                children: "License Information"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 419,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                                className: "gap-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                control: form.control,
                                                                name: "driversLicense",
                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                    children: [
                                                                                        "Driver's License",
                                                                                        " ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-muted-foreground font-normal",
                                                                                            children: "(optional)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 432,
                                                                                            columnNumber: 33
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 430,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 429,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                            ...field,
                                                                                            placeholder: "Driver's License",
                                                                                            className: "h-10 text-base leading-[1.5]",
                                                                                            style: {
                                                                                                fontFamily: "Inter, sans-serif"
                                                                                            },
                                                                                            onFocus: handleFieldFocus,
                                                                                            onKeyDown: (e)=>{
                                                                                                if (e.key === "Enter") {
                                                                                                    e.preventDefault();
                                                                                                    form.setFocus("driversLicenseState");
                                                                                                }
                                                                                            }
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 437,
                                                                                            columnNumber: 33
                                                                                        }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 436,
                                                                                        columnNumber: 31
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 451,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 435,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                        lineNumber: 428,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                            lineNumber: 423,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                control: form.control,
                                                                name: "driversLicenseState",
                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                    children: "Driver's License State"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 464,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 463,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                                        onValueChange: field.onChange,
                                                                                        value: field.value,
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                                    className: "h-10 text-base",
                                                                                                    style: {
                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                    },
                                                                                                    onFocus: handleFieldFocus,
                                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                        placeholder: "Select state"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                        lineNumber: 477,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                    lineNumber: 472,
                                                                                                    columnNumber: 35
                                                                                                }, void 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 471,
                                                                                                columnNumber: 33
                                                                                            }, void 0),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                                children: US_STATES.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                        value: state.value,
                                                                                                        children: state.label
                                                                                                    }, state.value, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                        lineNumber: 482,
                                                                                                        columnNumber: 37
                                                                                                    }, void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 480,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 467,
                                                                                        columnNumber: 31
                                                                                    }, void 0),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 488,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 466,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                        lineNumber: 462,
                                                                        columnNumber: 27
                                                                    }, void 0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 458,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                    lineNumber: 422,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 420,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldSet"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLegend"], {
                                                children: "Contact Information"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 500,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                                className: "gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                    control: form.control,
                                                                    name: "email",
                                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                        children: "Email"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 511,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 510,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                ...field,
                                                                                                type: "email",
                                                                                                className: "h-10 text-base leading-[1.5]",
                                                                                                style: {
                                                                                                    fontFamily: "Inter, sans-serif"
                                                                                                },
                                                                                                onFocus: handleFieldFocus,
                                                                                                onKeyDown: (e)=>{
                                                                                                    if (e.key === "Enter") {
                                                                                                        e.preventDefault();
                                                                                                        form.setFocus("phone");
                                                                                                    }
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 515,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 514,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 529,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 513,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 509,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 505,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                                    control: form.control,
                                                                    name: "phone",
                                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                        children: "Phone"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 542,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 541,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                ...field,
                                                                                                type: "tel",
                                                                                                placeholder: "(555) 123-4567",
                                                                                                className: "h-10 text-base leading-[1.5]",
                                                                                                style: {
                                                                                                    fontFamily: "Inter, sans-serif"
                                                                                                },
                                                                                                onFocus: handleFieldFocus,
                                                                                                onChange: (e)=>{
                                                                                                    const formatted = formatPhoneNumber(e.target.value);
                                                                                                    field.onChange(formatted);
                                                                                                },
                                                                                                maxLength: 17,
                                                                                                onKeyDown: (e)=>{
                                                                                                    if (e.key === "Enter") {
                                                                                                        e.preventDefault();
                                                                                                        form.setFocus("address");
                                                                                                    }
                                                                                                }
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                                lineNumber: 546,
                                                                                                columnNumber: 33
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 545,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                            lineNumber: 566,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 544,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 540,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 536,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                        lineNumber: 503,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                            control: form.control,
                                                            name: "address",
                                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                children: "Address"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                lineNumber: 582,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 581,
                                                                            columnNumber: 27
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                                        ...field,
                                                                                        className: "h-10 text-base leading-[1.5]",
                                                                                        style: {
                                                                                            fontFamily: "Inter, sans-serif"
                                                                                        },
                                                                                        onFocus: handleFieldFocus,
                                                                                        onKeyDown: (e)=>{
                                                                                            if (e.key === "Enter") {
                                                                                                e.preventDefault();
                                                                                                form.handleSubmit(onSubmit)();
                                                                                            }
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                        lineNumber: 586,
                                                                                        columnNumber: 31
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 585,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                                    lineNumber: 599,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                            lineNumber: 584,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                                    lineNumber: 580,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                                lineNumber: 501,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                lineNumber: 293,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end pt-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    variant: "default",
                                    size: "lg",
                                    disabled: !form.formState.isValid,
                                    className: "h-9 gap-2",
                                    onClick: form.handleSubmit(onSubmit),
                                    children: [
                                        quoteData.clientInfo ? "Continue" : "Start Quote",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                            lineNumber: 620,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                    lineNumber: 611,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                                lineNumber: 610,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                    lineNumber: 291,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/client-info-form.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_s(ClientInfoForm, "Ekf3Zn1QMq2uvRwFS3v4leY63Zs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"]
    ];
});
_c = ClientInfoForm;
var _c;
__turbopack_context__.k.register(_c, "ClientInfoForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_portal_src_screens_components_client-info-form_tsx_ed3dd76a._.js.map