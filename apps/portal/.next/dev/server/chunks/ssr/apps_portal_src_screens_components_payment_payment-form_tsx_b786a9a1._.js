module.exports = [
"[project]/apps/portal/src/screens/components/payment/payment-form.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentForm",
    ()=>PaymentForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/types.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-svg-credit-card-payment-icons/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/form.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/field.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/radio-group.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
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
// Validation schema
const paymentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
    method: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
        "secure-link",
        "credit-card",
        "ach"
    ]),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
    creditCard: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
        nameOnCard: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().min(1, "Name on card is required"),
        cardNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Invalid card number (format: XXXX XXXX XXXX XXXX)"),
        expirationDate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),
        cvv: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().regex(/^\d{3,4}$/, "Invalid CVV"),
        billingAddressSameAsHome: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]()
    }).optional(),
    ach: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
        accountHolderName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().min(1, "Account holder name is required"),
        accountType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
            "checking",
            "savings"
        ]),
        routingNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().regex(/^\d{9}$/, "Routing number must be 9 digits"),
        accountNumber: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().min(4, "Account number is required")
    }).optional()
}).refine((data)=>{
    if (data.method === "secure-link") {
        if (!data.email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(data.email);
    }
    return true;
}, {
    message: "Valid email is required for secure link",
    path: [
        "email"
    ]
}).refine((data)=>{
    if (data.method === "credit-card") {
        return !!data.creditCard && !!data.creditCard.nameOnCard && !!data.creditCard.cardNumber && !!data.creditCard.expirationDate && !!data.creditCard.cvv;
    }
    return true;
}, {
    message: "All credit card fields are required",
    path: [
        "creditCard"
    ]
}).refine((data)=>{
    if (data.method === "ach") {
        return !!data.ach && !!data.ach.accountHolderName && !!data.ach.routingNumber && !!data.ach.accountNumber;
    }
    return true;
}, {
    message: "All ACH fields are required",
    path: [
        "ach"
    ]
});
// Format card number with spaces
function formatCardNumber(value) {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.match(/.{1,4}/g)?.join(" ") || digits;
    return formatted.slice(0, 19) // Max 16 digits + 3 spaces
    ;
}
// Format expiration date as MM/YY
function formatExpirationDate(value) {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 2) {
        return digits;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}
function PaymentForm() {
    const { quoteData, updatePayment, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    // Get client name for credit card name field
    const clientName = quoteData.clientInfo ? `${quoteData.clientInfo.firstName} ${quoteData.clientInfo.lastName}` : "";
    // Get client email for secure link
    const clientEmail = quoteData.clientInfo?.email || "";
    // Load initial values from quote context if available
    const defaultValues = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (quoteData.payment) {
            return {
                method: quoteData.payment.method,
                email: quoteData.payment.email || clientEmail,
                creditCard: quoteData.payment.creditCard,
                ach: quoteData.payment.ach
            };
        }
        return {
            method: "credit-card",
            email: clientEmail,
            creditCard: {
                nameOnCard: clientName,
                cardNumber: "",
                expirationDate: "",
                cvv: "",
                billingAddressSameAsHome: true
            },
            ach: {
                accountHolderName: clientName,
                accountType: "checking",
                routingNumber: "",
                accountNumber: ""
            }
        };
    }, [
        quoteData.payment,
        clientEmail,
        clientName
    ]);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["zodResolver"])(paymentSchema),
        defaultValues,
        mode: "onChange"
    });
    // Reset form when quote data is loaded
    const hasInitialized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!hasInitialized.current && quoteData.payment) {
            form.reset(defaultValues);
            hasInitialized.current = true;
        }
    }, [
        quoteData.payment,
        defaultValues,
        form
    ]);
    // Watch form values for auto-save
    const formValues = form.watch();
    const paymentMethod = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "method"
    });
    const email = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "email"
    });
    const creditCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "creditCard"
    });
    const ach = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])({
        control: form.control,
        name: "ach"
    });
    // Auto-save when form values change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: formValues,
        saveFn: async (data)=>{
            const paymentData = {
                method: data.method,
                email: data.method === "secure-link" ? data.email : undefined,
                creditCard: data.method === "credit-card" ? data.creditCard : undefined,
                ach: data.method === "ach" ? data.ach : undefined
            };
            updatePayment(paymentData);
            await saveQuote();
        },
        debounceMs: 2000,
        enabled: form.formState.isDirty
    });
    const onSubmit = (data)=>{
        const paymentData = {
            method: data.method,
            email: data.method === "secure-link" ? data.email : undefined,
            creditCard: data.method === "credit-card" ? data.creditCard : undefined,
            ach: data.method === "ach" ? data.ach : undefined
        };
        updatePayment(paymentData);
        console.log("Payment form submitted:", paymentData);
    };
    // Validation helpers for each payment method
    const isSecureLinkValid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (paymentMethod !== "secure-link") return false;
        return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, [
        paymentMethod,
        email
    ]);
    const isCreditCardValid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (paymentMethod !== "credit-card") return false;
        return !!(creditCard?.nameOnCard && creditCard?.cardNumber && creditCard?.cardNumber.match(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/) && creditCard?.expirationDate && creditCard?.expirationDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) && creditCard?.cvv && creditCard?.cvv.match(/^\d{3,4}$/));
    }, [
        paymentMethod,
        creditCard
    ]);
    const isAchValid = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (paymentMethod !== "ach") return false;
        return !!(ach?.accountHolderName && ach?.routingNumber && ach?.routingNumber.match(/^\d{9}$/) && ach?.accountNumber && ach.accountNumber.length >= 4);
    }, [
        paymentMethod,
        ach
    ]);
    const handleSecureLinkSubmit = ()=>{
        const email = form.getValues("email");
        if (isSecureLinkValid && email) {
            const paymentData = {
                method: "secure-link",
                email
            };
            updatePayment(paymentData);
            console.log("Sending secure link to:", email);
        // TODO: Implement actual secure link sending
        }
    };
    const handleCreditCardSubmit = ()=>{
        const creditCard = form.getValues("creditCard");
        if (isCreditCardValid && creditCard) {
            const paymentData = {
                method: "credit-card",
                creditCard
            };
            updatePayment(paymentData);
            console.log("Processing credit card payment");
        // TODO: Implement actual payment processing
        }
    };
    const handleAchSubmit = ()=>{
        const ach = form.getValues("ach");
        if (isAchValid && ach) {
            const paymentData = {
                method: "ach",
                ach
            };
            updatePayment(paymentData);
            console.log("Processing ACH payment");
        // TODO: Implement actual payment processing
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "mb-8 w-full rounded-[12px] gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                className: "px-6 pt-6 pb-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-card-foreground",
                            style: {
                                fontFamily: "Geist, sans-serif"
                            },
                            children: "Payment options"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                            lineNumber: 278,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "text-base font-normal leading-[1.5] text-muted-foreground",
                            style: {
                                fontFamily: "Geist, sans-serif"
                            },
                            children: "How would you like to collect payment?"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                    lineNumber: 277,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "px-6 pb-6 pt-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Form"], {
                    ...form,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: form.handleSubmit(onSubmit),
                        className: "space-y-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                            control: form.control,
                            name: "method",
                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                                value: field.value,
                                                onValueChange: field.onChange,
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                value: "credit-card",
                                                                id: "credit-card",
                                                                className: "mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 space-y-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                                htmlFor: "credit-card",
                                                                                className: "text-base font-semibold leading-[1.5] cursor-pointer",
                                                                                style: {
                                                                                    fontFamily: "Inter, sans-serif"
                                                                                },
                                                                                children: "Credit Card"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                lineNumber: 311,
                                                                                columnNumber: 29
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-1.5",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PaymentIcon"], {
                                                                                            type: "Amex",
                                                                                            format: "flatRounded",
                                                                                            width: 32
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 321,
                                                                                            columnNumber: 33
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PaymentIcon"], {
                                                                                            type: "Mastercard",
                                                                                            format: "flatRounded",
                                                                                            width: 32
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 322,
                                                                                            columnNumber: 33
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PaymentIcon"], {
                                                                                            type: "Visa",
                                                                                            format: "flatRounded",
                                                                                            width: 32
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 323,
                                                                                            columnNumber: 33
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$svg$2d$credit$2d$card$2d$payment$2d$icons$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PaymentIcon"], {
                                                                                            type: "Discover",
                                                                                            format: "flatRounded",
                                                                                            width: 32
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 324,
                                                                                            columnNumber: 33
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 320,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                lineNumber: 318,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 310,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    paymentMethod === "credit-card" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-2 space-y-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                                                            className: "gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "creditCard.nameOnCard",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Name On Card"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 339,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 338,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                                                onValueChange: field.onChange,
                                                                                                                value: field.value,
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                                                            className: "h-10 text-base",
                                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                                                placeholder: "Select name"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                                lineNumber: 348,
                                                                                                                                columnNumber: 49
                                                                                                                            }, void 0)
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                            lineNumber: 347,
                                                                                                                            columnNumber: 47
                                                                                                                        }, void 0)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 346,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                                                        children: clientName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                                            value: clientName,
                                                                                                                            children: clientName
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                            lineNumber: 353,
                                                                                                                            columnNumber: 49
                                                                                                                        }, void 0)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 351,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0)
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 342,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormDescription"], {
                                                                                                                className: "text-sm text-muted-foreground mt-1",
                                                                                                                children: "Card must belong to the policyholder or to another person on the policy."
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 359,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 362,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 341,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 337,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 333,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 332,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "creditCard.cardNumber",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Card Number"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 377,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 376,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                    ...field,
                                                                                                                    placeholder: "Card Number",
                                                                                                                    className: "h-10 text-base leading-[1.5]",
                                                                                                                    style: {
                                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                                    },
                                                                                                                    maxLength: 19,
                                                                                                                    onChange: (e)=>{
                                                                                                                        const formatted = formatCardNumber(e.target.value);
                                                                                                                        field.onChange(formatted);
                                                                                                                    }
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 381,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 380,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormDescription"], {
                                                                                                                className: "text-sm text-muted-foreground mt-1",
                                                                                                                children: "Card must belong to the policyholder or to another person on the policy."
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 393,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 396,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 379,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 375,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 371,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 370,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "grid grid-cols-2 gap-4",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                                control: form.control,
                                                                                                name: "creditCard.expirationDate",
                                                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                                    children: "Expiration Date"
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 412,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 411,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                            ...field,
                                                                                                                            placeholder: "MM/YY",
                                                                                                                            className: "h-10 text-base leading-[1.5]",
                                                                                                                            style: {
                                                                                                                                fontFamily: "Inter, sans-serif"
                                                                                                                            },
                                                                                                                            maxLength: 5,
                                                                                                                            onChange: (e)=>{
                                                                                                                                const formatted = formatExpirationDate(e.target.value);
                                                                                                                                field.onChange(formatted);
                                                                                                                            }
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                            lineNumber: 416,
                                                                                                                            columnNumber: 47
                                                                                                                        }, void 0)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 415,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 428,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0)
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 414,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 410,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 406,
                                                                                                columnNumber: 37
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 405,
                                                                                            columnNumber: 35
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                                control: form.control,
                                                                                                name: "creditCard.cvv",
                                                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                                    children: "CVV"
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 441,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 440,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                            ...field,
                                                                                                                            type: "password",
                                                                                                                            placeholder: "CVV",
                                                                                                                            className: "h-10 text-base leading-[1.5]",
                                                                                                                            style: {
                                                                                                                                fontFamily: "Inter, sans-serif"
                                                                                                                            },
                                                                                                                            maxLength: 4
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                            lineNumber: 445,
                                                                                                                            columnNumber: 47
                                                                                                                        }, void 0)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 444,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 454,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0)
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 443,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 439,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 435,
                                                                                                columnNumber: 37
                                                                                            }, void 0)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 434,
                                                                                            columnNumber: 35
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 404,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "creditCard.billingAddressSameAsHome",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                className: "flex flex-row items-start space-x-3 space-y-0",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                                                            checked: field.value,
                                                                                                            onCheckedChange: field.onChange
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 470,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 469,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "space-y-1 leading-none",
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            className: "text-sm font-normal cursor-pointer",
                                                                                                            children: "Billing address is the same as home address"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 476,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 475,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 468,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 464,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 463,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "pt-2 pb-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-sm text-muted-foreground leading-[1.5]",
                                                                                            style: {
                                                                                                fontFamily: "Inter, sans-serif"
                                                                                            },
                                                                                            children: "By clicking on 'Pay Now', the client authorize Novo Insurance, LLC to:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 487,
                                                                                            columnNumber: 35
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                                            className: "list-disc list-inside text-sm text-muted-foreground leading-[1.5] mt-2 space-y-1",
                                                                                            style: {
                                                                                                fontFamily: "Inter, sans-serif"
                                                                                            },
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                                    children: "charge the above amount on the card provided."
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                    lineNumber: 491,
                                                                                                    columnNumber: 37
                                                                                                }, void 0),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                                    children: "securely store payment information."
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                    lineNumber: 492,
                                                                                                    columnNumber: 37
                                                                                                }, void 0),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                                    children: "use the stored payment information to automatically process monthly premium payments on the due date."
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                    lineNumber: 493,
                                                                                                    columnNumber: 37
                                                                                                }, void 0)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                            lineNumber: 490,
                                                                                            columnNumber: 35
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 486,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex justify-end pt-2",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        type: "button",
                                                                                        variant: "default",
                                                                                        size: "lg",
                                                                                        disabled: !isCreditCardValid,
                                                                                        onClick: handleCreditCardSubmit,
                                                                                        className: "h-9",
                                                                                        children: "Pay Now"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 499,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 498,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                            lineNumber: 330,
                                                                            columnNumber: 31
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 329,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                                className: "h-5 w-5 text-muted-foreground mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 514,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                value: "ach",
                                                                id: "ach",
                                                                className: "mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "ach",
                                                                        className: "text-base font-semibold leading-[1.5] cursor-pointer",
                                                                        style: {
                                                                            fontFamily: "Inter, sans-serif"
                                                                        },
                                                                        children: "Bank Account (ACH)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 521,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    paymentMethod === "ach" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-2 space-y-4",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldGroup"], {
                                                                            className: "gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "ach.accountHolderName",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Account Holder Name"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 539,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 538,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                    ...field,
                                                                                                                    placeholder: "Account holder name",
                                                                                                                    className: "h-10 text-base leading-[1.5]",
                                                                                                                    style: {
                                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                                    }
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 543,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 542,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 550,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 541,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 537,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 533,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 532,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "ach.accountType",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Account Type"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 565,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 564,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                                                                                onValueChange: field.onChange,
                                                                                                                value: field.value,
                                                                                                                children: [
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                                                            className: "h-10 text-base",
                                                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                                                                placeholder: "Select account type"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                                lineNumber: 574,
                                                                                                                                columnNumber: 49
                                                                                                                            }, void 0)
                                                                                                                        }, void 0, false, {
                                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                            lineNumber: 573,
                                                                                                                            columnNumber: 47
                                                                                                                        }, void 0)
                                                                                                                    }, void 0, false, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 572,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0),
                                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                                                                        children: [
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                                                value: "checking",
                                                                                                                                children: "Checking"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                                lineNumber: 578,
                                                                                                                                columnNumber: 47
                                                                                                                            }, void 0),
                                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                                                                value: "savings",
                                                                                                                                children: "Savings"
                                                                                                                            }, void 0, false, {
                                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                                lineNumber: 579,
                                                                                                                                columnNumber: 47
                                                                                                                            }, void 0)
                                                                                                                        ]
                                                                                                                    }, void 0, true, {
                                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                        lineNumber: 577,
                                                                                                                        columnNumber: 45
                                                                                                                    }, void 0)
                                                                                                                ]
                                                                                                            }, void 0, true, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 568,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 582,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 567,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 563,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 559,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 558,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "ach.routingNumber",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Routing Number"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 597,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 596,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                    ...field,
                                                                                                                    placeholder: "Routing number",
                                                                                                                    className: "h-10 text-base leading-[1.5]",
                                                                                                                    style: {
                                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                                    },
                                                                                                                    maxLength: 9,
                                                                                                                    onChange: (e)=>{
                                                                                                                        const digits = e.target.value.replace(/\D/g, "");
                                                                                                                        field.onChange(digits.slice(0, 9));
                                                                                                                    }
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 601,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 600,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 613,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 599,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 595,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 591,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 590,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Field"], {
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                        control: form.control,
                                                                                        name: "ach.accountNumber",
                                                                                        render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                            children: "Account Number"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 628,
                                                                                                            columnNumber: 43
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 627,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                                    ...field,
                                                                                                                    type: "password",
                                                                                                                    placeholder: "Account number",
                                                                                                                    className: "h-10 text-base leading-[1.5]",
                                                                                                                    style: {
                                                                                                                        fontFamily: "Inter, sans-serif"
                                                                                                                    }
                                                                                                                }, void 0, false, {
                                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                    lineNumber: 632,
                                                                                                                    columnNumber: 45
                                                                                                                }, void 0)
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 631,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0),
                                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                                lineNumber: 640,
                                                                                                                columnNumber: 43
                                                                                                            }, void 0)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 630,
                                                                                                        columnNumber: 41
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 626,
                                                                                                columnNumber: 39
                                                                                            }, void 0)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 622,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 621,
                                                                                    columnNumber: 33
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex justify-end pt-2",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        type: "button",
                                                                                        variant: "default",
                                                                                        size: "lg",
                                                                                        disabled: !isAchValid,
                                                                                        onClick: handleAchSubmit,
                                                                                        className: "h-9",
                                                                                        children: "Pay Now"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 649,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 648,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                            lineNumber: 530,
                                                                            columnNumber: 31
                                                                        }, void 0)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 529,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 520,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                                                className: "h-5 w-5 text-muted-foreground mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start space-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                                                value: "secure-link",
                                                                id: "secure-link",
                                                                className: "mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 669,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        htmlFor: "secure-link",
                                                                        className: "text-base font-semibold leading-[1.5] cursor-pointer",
                                                                        style: {
                                                                            fontFamily: "Inter, sans-serif"
                                                                        },
                                                                        children: "Send secure link to client"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 671,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-muted-foreground leading-[1.5]",
                                                                        style: {
                                                                            fontFamily: "Inter, sans-serif"
                                                                        },
                                                                        children: "The client will receive a link to enter payment info."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 27
                                                                    }, void 0),
                                                                    paymentMethod === "secure-link" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-2 space-y-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormField"], {
                                                                                control: form.control,
                                                                                name: "email",
                                                                                render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormItem"], {
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldLabel"], {
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                                                    children: "Email address"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                    lineNumber: 692,
                                                                                                    columnNumber: 39
                                                                                                }, void 0)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 691,
                                                                                                columnNumber: 37
                                                                                            }, void 0),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$field$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FieldContent"], {
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                                                            ...field,
                                                                                                            type: "email",
                                                                                                            placeholder: clientEmail || "email@example.com",
                                                                                                            className: "h-10 text-base leading-[1.5]",
                                                                                                            style: {
                                                                                                                fontFamily: "Inter, sans-serif"
                                                                                                            }
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                            lineNumber: 696,
                                                                                                            columnNumber: 41
                                                                                                        }, void 0)
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 695,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                        lineNumber: 704,
                                                                                                        columnNumber: 39
                                                                                                    }, void 0)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                                lineNumber: 694,
                                                                                                columnNumber: 37
                                                                                            }, void 0)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                        lineNumber: 690,
                                                                                        columnNumber: 35
                                                                                    }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                lineNumber: 686,
                                                                                columnNumber: 31
                                                                            }, void 0),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex justify-end",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    type: "button",
                                                                                    variant: "default",
                                                                                    size: "lg",
                                                                                    disabled: !isSecureLinkValid,
                                                                                    onClick: handleSecureLinkSubmit,
                                                                                    className: "h-9",
                                                                                    children: "Send Secure Link"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                    lineNumber: 710,
                                                                                    columnNumber: 33
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                                lineNumber: 709,
                                                                                columnNumber: 31
                                                                            }, void 0)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                        lineNumber: 685,
                                                                        columnNumber: 29
                                                                    }, void 0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 25
                                                            }, void 0),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                className: "h-5 w-5 text-muted-foreground mt-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 25
                                                            }, void 0)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                                lineNumber: 301,
                                                columnNumber: 21
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                            lineNumber: 300,
                                            columnNumber: 19
                                        }, void 0),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$form$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                            lineNumber: 728,
                                            columnNumber: 19
                                        }, void 0)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                                    lineNumber: 299,
                                    columnNumber: 17
                                }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                        lineNumber: 294,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/payment/payment-form.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_portal_src_screens_components_payment_payment-form_tsx_b786a9a1._.js.map