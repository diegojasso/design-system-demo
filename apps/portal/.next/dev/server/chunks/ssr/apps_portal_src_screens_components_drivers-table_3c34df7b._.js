module.exports = [
"[project]/apps/portal/src/screens/components/drivers-table/columns.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DRIVER_FIELDS",
    ()=>DRIVER_FIELDS
]);
// US States for license state dropdown
const US_STATES = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
];
const DRIVER_FIELDS = [
    {
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        editable: true
    },
    {
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        editable: true
    },
    {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
        required: true,
        editable: true
    },
    {
        id: 'gender',
        label: 'Gender',
        type: 'dropdown',
        options: [
            'Male',
            'Female',
            'Other'
        ],
        editable: true
    },
    {
        id: 'maritalStatus',
        label: 'Marital Status',
        type: 'dropdown',
        options: [
            'Single',
            'Married',
            'Divorced',
            'Widowed'
        ],
        editable: true
    },
    {
        id: 'relationship',
        label: 'Relation to primary Insured',
        type: 'dropdown',
        options: [
            'Self',
            'Spouse',
            'Child',
            'Other'
        ],
        required: true,
        editable: true
    },
    {
        id: 'email',
        label: 'Email',
        type: 'text',
        editable: true
    },
    {
        id: 'phone',
        label: 'Phone',
        type: 'text',
        editable: true
    },
    {
        id: 'includeInPolicy',
        label: 'Include in Policy?',
        type: 'boolean',
        editable: true
    },
    {
        id: 'licenseNumber',
        label: "Driver's License",
        type: 'text',
        editable: true
    },
    {
        id: 'licenseState',
        label: "Driver's License State",
        type: 'dropdown',
        options: US_STATES,
        editable: true
    },
    {
        id: 'yearsLicensed',
        label: 'How long since driver license was obtained',
        type: 'dropdown',
        options: [
            'Less than 1 year',
            '1-3 years',
            '3-5 years',
            '5-10 years',
            '10+ years'
        ],
        editable: true
    },
    {
        id: 'licenseStatus',
        label: "Driver's License Status",
        type: 'dropdown',
        options: [
            'Valid',
            'Suspended',
            'Expired'
        ],
        editable: true
    },
    {
        id: 'homeOwnership',
        label: 'Does the client own or rent their home?',
        type: 'dropdown',
        options: [
            'Own',
            'Rent',
            'Other'
        ],
        editable: true
    },
    {
        id: 'employmentStatus',
        label: 'Employment Status',
        type: 'dropdown',
        options: [
            'Employed',
            'Self-Employed',
            'Unemployed',
            'Retired',
            'Student'
        ],
        editable: true
    },
    {
        id: 'educationLevel',
        label: 'Highest Education Level',
        type: 'dropdown',
        options: [
            'High School',
            'Some College',
            "Bachelor's",
            "Master's",
            'Doctorate'
        ],
        editable: true
    }
];
}),
"[project]/apps/portal/src/screens/components/drivers-table/utils/placeholders.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDisplayPlaceholder",
    ()=>getDisplayPlaceholder,
    "getEditPlaceholder",
    ()=>getEditPlaceholder
]);
function getDisplayPlaceholder(field, isRequired = false) {
    // Check if field has explicit placeholder
    if (field.placeholder) {
        return field.placeholder;
    }
    // Generate based on field type and ID
    return generatePlaceholder(field, 'display');
}
function getEditPlaceholder(field) {
    // Check if field has explicit placeholder
    if (field.placeholder) {
        return field.placeholder;
    }
    // Generate based on field type and ID
    return generatePlaceholder(field, 'edit');
}
/**
 * Generate placeholder based on field properties
 */ function generatePlaceholder(field, mode) {
    // Field-ID specific placeholders
    const fieldSpecificPlaceholders = {
        // Drivers - Text fields
        firstName: 'Enter first name',
        lastName: 'Enter last name',
        email: mode === 'edit' ? 'example@email.com' : 'Enter email address',
        phone: mode === 'edit' ? '(555) 123-4567' : 'Enter phone number',
        licenseNumber: 'Enter license number',
        // Drivers - Date fields
        dateOfBirth: mode === 'display' ? 'Select date of birth' : 'MM/DD/YYYY',
        // Drivers - Dropdown fields (use generic for now, can be customized)
        relationship: 'Select relationship',
        gender: 'Select gender',
        maritalStatus: 'Select marital status',
        licenseState: 'Select state',
        licenseStatus: 'Select status',
        yearsLicensed: 'Select years licensed',
        homeOwnership: 'Select ownership type',
        employmentStatus: 'Select employment status',
        educationLevel: 'Select education level'
    };
    if (fieldSpecificPlaceholders[field.id]) {
        return fieldSpecificPlaceholders[field.id];
    }
    // Type-based placeholders (fallback)
    switch(field.type){
        case 'dropdown':
            return `Select ${field.label.toLowerCase()}`;
        case 'date':
            return mode === 'display' ? 'Select date' : 'MM/DD/YYYY';
        case 'number':
            return `Enter ${field.label.toLowerCase()}`;
        case 'text':
            return `Enter ${field.label.toLowerCase()}`;
        case 'boolean':
            return '' // No placeholder for boolean/radio
            ;
        default:
            return `Enter ${field.label.toLowerCase()}`;
    }
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableTableCell",
    ()=>EditableTableCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/radio-group.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/utils/placeholders.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const EditableTableCell = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](function EditableTableCell({ value, field, isEditing, onFocus, onEdit, onBlur, onChange, onDoubleClick, error, isMissing = false }) {
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const selectTriggerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Auto-focus input when editing starts
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (isEditing && inputRef.current) {
            if (field.type === 'text' || field.type === 'date' || field.type === 'number') {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [
        isEditing,
        field.type
    ]);
    // Auto-open dropdown when entering edit mode via Enter key
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (isEditing && field.type === 'dropdown' && selectTriggerRef.current) {
            // Small delay to ensure the select is ready, then click to open
            const timeoutId = setTimeout(()=>{
                selectTriggerRef.current?.click();
            }, 50);
            return ()=>clearTimeout(timeoutId);
        }
    }, [
        isEditing,
        field.type
    ]);
    const formatDisplayValue = ()=>{
        if (value === null || value === undefined || value === '') {
            return '';
        }
        if (field.type === 'boolean') {
            return value ? 'Yes' : 'No';
        }
        if (field.type === 'date') {
            // Handle both Date objects and date strings
            let date;
            if (value instanceof Date) {
                date = value;
            } else if (typeof value === 'string') {
                date = new Date(value);
            } else {
                return String(value);
            }
            if (!isNaN(date.getTime())) {
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            }
            return String(value);
        }
        return String(value);
    };
    const formatDateForInput = (dateString)=>{
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        return date.toISOString().split('T')[0] // YYYY-MM-DD format
        ;
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onBlur(true, false); // Apply changes and move to next cell
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            onBlur(false, true); // Undo changes and don't move to next cell
        }
        // Tab navigation - prevent default and stop propagation
        // Global handler will handle navigation after blur
        if (e.key === 'Tab') {
            e.preventDefault();
            e.stopPropagation();
        // Blur will be called, then global handler navigates
        }
    };
    // Wrapper to convert React's FocusEvent to our onBlur signature
    const handleBlur = ()=>{
        onBlur(false, false); // Apply changes, don't move to next cell
    };
    // Handle Enter key in display mode to enter edit mode
    const handleKeyDownDisplay = (e)=>{
        if (e.key === 'Enter' && !isEditing) {
            e.preventDefault();
            onEdit();
            return;
        }
        // Tab navigation - prevent default and stop propagation
        // Global handler will handle navigation
        if (e.key === 'Tab') {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    // Render based on field type
    if (!isEditing) {
        // Display mode - click/double-click enters edit mode, Enter key also enters edit mode
        const displayValue = formatDisplayValue();
        const isEmpty = !displayValue || displayValue === '';
        const placeholder = isEmpty ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDisplayPlaceholder"])(field, field.required) : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `h-full px-4 flex items-center cursor-text hover:bg-muted transition-colors ${error ? 'bg-red-50 dark:bg-red-950/30' : ''} ${isMissing && !error ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`,
            onDoubleClick: onDoubleClick,
            onClick: onEdit,
            onFocus: (e)=>{
                // Handle focus from keyboard navigation - just focus, don't edit
                e.currentTarget.focus();
                onFocus();
            },
            onKeyDown: handleKeyDownDisplay,
            tabIndex: 0,
            role: "gridcell",
            "aria-label": `${field.label}, ${error ? `Error: ${error}` : isMissing ? 'Required field is empty' : ''} ${displayValue || placeholder || 'empty'}`,
            "aria-invalid": error ? 'true' : 'false',
            "aria-required": field.required ? 'true' : 'false',
            style: {
                fontFamily: "Inter, sans-serif"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-normal w-full ${error ? 'text-red-700 dark:text-red-400' : isMissing && !error && isEmpty ? 'text-amber-600 dark:text-amber-400 italic' : isEmpty && field.required ? 'text-amber-600 dark:text-amber-400 italic' : isEmpty ? 'text-muted-foreground italic' : isMissing && !error ? 'text-amber-900 dark:text-amber-300' : 'text-foreground'}`,
                        children: displayValue || (placeholder ? placeholder : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-muted-foreground",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                            lineNumber: 180,
                            columnNumber: 59
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-red-600 shrink-0",
                        title: error,
                        children: "⚠"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this),
                    isMissing && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-amber-600 shrink-0",
                        title: "Required field is empty",
                        children: "○"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    // Editing mode
    if (field.type === 'text') {
        const inputType = field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text';
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                    ref: inputRef,
                    type: inputType,
                    value: value || '',
                    placeholder: placeholder || undefined,
                    onChange: (e)=>onChange(e.target.value),
                    onBlur: handleBlur,
                    onKeyDown: handleKeyDown,
                    className: `h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 ${error ? 'text-red-700' : ''}`,
                    "aria-invalid": error ? 'true' : 'false',
                    "aria-describedby": error ? `${field.id}-error` : undefined,
                    style: {
                        fontFamily: "Inter, sans-serif"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'date') {
        const dateValue = formatDateForInput(value || '');
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                    ref: inputRef,
                    type: "date",
                    value: dateValue,
                    placeholder: placeholder || undefined,
                    onChange: (e)=>onChange(e.target.value),
                    onBlur: handleBlur,
                    onKeyDown: handleKeyDown,
                    className: `h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 ${error ? 'text-red-700' : ''}`,
                    "aria-invalid": error ? 'true' : 'false',
                    "aria-describedby": error ? `${field.id}-error` : undefined,
                    style: {
                        fontFamily: "Inter, sans-serif"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                    lineNumber: 248,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 231,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'dropdown' && field.options) {
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                value: value || '',
                onValueChange: (newValue)=>{
                    onChange(newValue);
                    // Auto-blur after selection
                    setTimeout(()=>onBlur(false, false), 100); // Apply changes, don't move to next
                },
                onOpenChange: (open)=>{
                    if (!open) {
                        // Close select triggers blur
                        setTimeout(()=>onBlur(false, false), 100); // Apply changes, don't move to next
                    }
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        ref: selectTriggerRef,
                        className: "h-8 w-full text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                            placeholder: placeholder || "Select..."
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 274,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: field.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                lineNumber: 260,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 259,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'boolean') {
        const booleanValue = value === true || value === 'true' || value === 'yes';
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                value: booleanValue ? 'yes' : 'no',
                onValueChange: (val)=>{
                    onChange(val === 'yes');
                    // Auto-blur after selection
                    setTimeout(()=>onBlur(true, false), 100); // Apply changes and move to next
                },
                className: "flex flex-row gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "yes",
                                id: `${field.id}-yes`
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: `${field.id}-yes`,
                                className: "text-sm font-normal text-foreground cursor-pointer",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Yes"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                value: "no",
                                id: `${field.id}-no`
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: `${field.id}-no`,
                                className: "text-sm font-normal text-foreground cursor-pointer",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "No"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
                lineNumber: 296,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 295,
            columnNumber: 7
        }, this);
    }
    // Fallback for number or other types
    const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full px-4 flex items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
            ref: inputRef,
            type: field.type === 'number' ? 'number' : 'text',
            value: value || '',
            placeholder: placeholder || undefined,
            onChange: (e)=>onChange(e.target.value),
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            className: "h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0",
            style: {
                fontFamily: "Inter, sans-serif"
            }
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
            lineNumber: 334,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx",
        lineNumber: 333,
        columnNumber: 5
    }, this);
});
}),
"[project]/apps/portal/src/screens/components/drivers-table/use-keyboard-navigation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardNavigation",
    ()=>useKeyboardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useKeyboardNavigation({ driverCount, fieldCount, onCellChange, onAddDriver }) {
    const [activeCell, setActiveCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCell, setEditingCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Move to a specific cell (navigation only - does NOT enter edit mode)
    const moveToCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((driverIndex, fieldIndex)=>{
        // Clamp indices to valid ranges
        const clampedDriverIndex = Math.max(0, Math.min(driverIndex, driverCount - 1));
        const clampedFieldIndex = Math.max(0, Math.min(fieldIndex, fieldCount - 1));
        const newCell = {
            driverIndex: clampedDriverIndex,
            fieldIndex: clampedFieldIndex
        };
        setActiveCell(newCell);
        // Don't automatically enter edit mode - just move focus
        // Edit mode is only entered via Enter key or click
        // Scroll cell into view and focus it (with a small delay to ensure DOM is updated)
        setTimeout(()=>{
            const cellElement = containerRef.current?.querySelector(`[data-cell-id="driver-${clampedDriverIndex}-field-${clampedFieldIndex}"]`);
            if (cellElement) {
                // Focus the cell div so it can receive keyboard events
                // Look for the inner div with tabindex
                const focusableElement = cellElement.querySelector('div[tabindex]');
                if (focusableElement) {
                    // Use setTimeout to ensure DOM is ready and prevent focus conflicts
                    setTimeout(()=>{
                        // Only focus if this is still the active cell
                        if (activeCell?.driverIndex === clampedDriverIndex && activeCell?.fieldIndex === clampedFieldIndex) {
                            focusableElement.focus();
                        }
                    }, 20);
                }
                cellElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });
            }
        }, 10);
    }, [
        driverCount,
        fieldCount
    ]);
    // Move to next cell (right, then down)
    const moveNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (fieldIndex < fieldCount - 1) {
            // Move right
            moveToCell(driverIndex, fieldIndex + 1);
        } else if (driverIndex < driverCount - 1) {
            // Move to next driver, first field
            moveToCell(driverIndex + 1, 0);
        }
    }, [
        activeCell,
        driverCount,
        fieldCount,
        moveToCell
    ]);
    // Move to previous cell (left, then up)
    const movePrevious = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (fieldIndex > 0) {
            // Move left
            moveToCell(driverIndex, fieldIndex - 1);
        } else if (driverIndex > 0) {
            // Move to previous driver, last field
            moveToCell(driverIndex - 1, fieldCount - 1);
        }
    }, [
        activeCell,
        driverCount,
        fieldCount,
        moveToCell
    ]);
    // Move up (previous field - vertical movement in column layout)
    const moveUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (fieldIndex > 0) {
            moveToCell(driverIndex, fieldIndex - 1);
        }
    }, [
        activeCell,
        moveToCell
    ]);
    // Move down (next field - vertical movement in column layout)
    const moveDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (fieldIndex < fieldCount - 1) {
            moveToCell(driverIndex, fieldIndex + 1);
        }
    }, [
        activeCell,
        fieldCount,
        moveToCell
    ]);
    // Move left (previous driver - horizontal movement in column layout)
    const moveLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (driverIndex > 0) {
            moveToCell(driverIndex - 1, fieldIndex);
        }
    }, [
        activeCell,
        moveToCell
    ]);
    // Move right (next driver - horizontal movement in column layout)
    const moveRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!activeCell) {
            moveToCell(0, 0);
            return;
        }
        const { driverIndex, fieldIndex } = activeCell;
        if (driverIndex < driverCount - 1) {
            moveToCell(driverIndex + 1, fieldIndex);
        }
    }, [
        activeCell,
        driverCount,
        moveToCell
    ]);
    // Start editing current cell
    const startEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (activeCell) {
            setEditingCell(activeCell);
        }
    }, [
        activeCell
    ]);
    // Stop editing
    const stopEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setEditingCell(null);
    }, []);
    // Handle keyboard events
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        // Don't handle keys if user is typing in an input
        const target = e.target;
        const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
        const isSelect = target.closest('[data-slot="select"]') !== null;
        // Handle Tab key for navigation (both in inputs and display mode)
        if (e.key === "Tab") {
            e.preventDefault();
            e.stopPropagation();
            if (isInput || isSelect) {
                // If in an input/select, stop editing first, then navigate
                if (editingCell) {
                    stopEditing();
                }
                // Small delay to let blur/stopEditing complete, then navigate
                setTimeout(()=>{
                    if (e.shiftKey) {
                        movePrevious();
                    } else {
                        moveNext();
                    }
                }, 50);
            } else {
                // In display mode, navigate immediately
                // Blur any currently focused element first to prevent conflicts
                if (document.activeElement && document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                // Small delay to ensure blur completes
                setTimeout(()=>{
                    if (e.shiftKey) {
                        movePrevious();
                    } else {
                        moveNext();
                    }
                }, 10);
            }
            return;
        }
        // Handle Ctrl/Cmd + N to add new driver (only when not in input/select)
        if ((e.ctrlKey || e.metaKey) && e.key === "n" && !isInput && !isSelect) {
            e.preventDefault();
            if (onAddDriver) {
                onAddDriver();
            }
            return;
        }
        if (isInput || isSelect) {
            // For other keys in inputs/selects, let them work normally
            return;
        }
        switch(e.key){
            case "ArrowUp":
                e.preventDefault();
                moveUp();
                break;
            case "ArrowDown":
                e.preventDefault();
                moveDown();
                break;
            case "ArrowLeft":
                e.preventDefault();
                moveLeft();
                break;
            case "ArrowRight":
                e.preventDefault();
                moveRight();
                break;
            case "Enter":
                if (!editingCell) {
                    e.preventDefault();
                    // Enter key is the only way to enter edit mode via keyboard
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
    }, [
        editingCell,
        moveNext,
        movePrevious,
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        startEditing,
        stopEditing,
        onAddDriver
    ]);
    // Set up keyboard listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        window.addEventListener("keydown", handleKeyDown);
        return ()=>{
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        handleKeyDown
    ]);
    return {
        activeCell,
        editingCell,
        moveToCell,
        startEditing,
        stopEditing,
        containerRef
    };
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MVRSuggestions",
    ()=>MVRSuggestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>");
"use client";
;
;
;
;
function MVRSuggestions({ mvrDrivers, existingDrivers, onAddDriver, isLoading = false }) {
    // Filter out drivers that already exist in the table
    const filteredMVRDrivers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return mvrDrivers.filter((mvrDriver)=>{
            // Check if a driver with the same name and DOB already exists
            const exists = existingDrivers.some((driver)=>{
                const driverFullName = `${driver.firstName} ${driver.lastName}`.toLowerCase().trim();
                const mvrName = mvrDriver.name.toLowerCase().trim();
                const driverDOB = driver.dateOfBirth;
                const mvrDOB = mvrDriver.dateOfBirth;
                return driverFullName === mvrName && driverDOB === mvrDOB;
            });
            return !exists;
        });
    }, [
        mvrDrivers,
        existingDrivers
    ]);
    if (filteredMVRDrivers.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-medium text-foreground mb-3",
                    style: {
                        fontFamily: "Inter, sans-serif"
                    },
                    children: "Drivers Found"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground",
                    style: {
                        fontFamily: "Inter, sans-serif"
                    },
                    children: "No additional drivers found"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-medium text-foreground mb-3",
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                children: "Drivers Found"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: filteredMVRDrivers.map((mvrDriver, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MVRSuggestionCard, {
                        mvrDriver: mvrDriver,
                        onAdd: ()=>onAddDriver(mvrDriver),
                        isLoading: isLoading
                    }, `${mvrDriver.name}-${mvrDriver.dateOfBirth}-${index}`, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
function MVRSuggestionCard({ mvrDriver, onAdd, isLoading = false }) {
    const formatDate = (dateString)=>{
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/../${year}`;
    };
    const formatConfidence = (confidence)=>{
        return `${Math.round(confidence * 100)}%`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-border bg-card rounded-md p-3 hover:bg-muted transition-colors",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-foreground truncate",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: mvrDriver.name
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                mvrDriver.confidence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground shrink-0",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: formatConfidence(mvrDriver.confidence)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: formatDate(mvrDriver.dateOfBirth)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                mvrDriver.source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: [
                                        "• ",
                                        mvrDriver.source
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "icon",
                    onClick: onAdd,
                    disabled: isLoading,
                    className: "h-8 w-8 shrink-0 ml-2",
                    "aria-label": isLoading ? "Adding driver..." : "Add driver",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                        className: `h-4 w-4 ${isLoading ? 'opacity-50' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/validation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateCellValue",
    ()=>validateCellValue,
    "validateDriver",
    ()=>validateDriver
]);
function validateDriver(driver, fields) {
    const errors = [];
    fields.forEach((field)=>{
        if (field.required) {
            const value = driver[field.id];
            if (value === null || value === undefined || value === '') {
                errors.push({
                    fieldId: field.id,
                    message: `${field.label} is required`
                });
            }
        }
        // Email validation
        if (field.id === 'email' && driver.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(driver.email)) {
                errors.push({
                    fieldId: 'email',
                    message: 'Please enter a valid email address'
                });
            }
        }
        // Date validation
        if (field.type === 'date' && driver[field.id]) {
            const dateValue = driver[field.id];
            const date = new Date(dateValue);
            if (isNaN(date.getTime())) {
                errors.push({
                    fieldId: field.id,
                    message: 'Please enter a valid date'
                });
            } else {
                // Check if date is in the future (for DOB)
                if (field.id === 'dateOfBirth' && date > new Date()) {
                    errors.push({
                        fieldId: 'dateOfBirth',
                        message: 'Date of birth cannot be in the future'
                    });
                }
            }
        }
        // Phone validation (basic)
        if (field.id === 'phone' && driver.phone) {
            const phoneRegex = /^[\d\s()\-+]+$/;
            if (!phoneRegex.test(driver.phone)) {
                errors.push({
                    fieldId: 'phone',
                    message: 'Please enter a valid phone number'
                });
            }
        }
    });
    return errors;
}
function validateCellValue(value, field) {
    if (field.required && (value === null || value === undefined || value === '')) {
        return `${field.label} is required`;
    }
    if (field.id === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
    }
    if (field.type === 'date' && value) {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return 'Please enter a valid date';
        }
        if (field.id === 'dateOfBirth' && date > new Date()) {
            return 'Date of birth cannot be in the future';
        }
    }
    if (field.id === 'phone' && value) {
        const phoneRegex = /^[\d\s()\-+]+$/;
        if (!phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
        }
    }
    return null;
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyboardShortcuts",
    ()=>KeyboardShortcuts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/kbd.tsx [app-ssr] (ecmascript)");
"use client";
;
;
function KeyboardShortcuts() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 p-3 bg-muted rounded-md border border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-medium text-muted-foreground mb-2",
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                children: "Keyboard Shortcuts"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Navigate cells"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Tab"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 21,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "↑"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 24,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Edit cell"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "Enter"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Cancel editing"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "Esc"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Add new driver"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Ctrl"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "⌘"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "N"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Toggle missing fields"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Ctrl"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "⌘"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "M"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/utils/missing-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllMissingFields",
    ()=>getAllMissingFields,
    "getMissingFields",
    ()=>getMissingFields,
    "getRowMissingCount",
    ()=>getRowMissingCount,
    "isFieldMissing",
    ()=>isFieldMissing,
    "isRowComplete",
    ()=>isRowComplete
]);
function isFieldMissing(value, field) {
    if (!field.required) return false;
    // Check for empty values
    if (value === null || value === undefined || value === '') {
        return true;
    }
    // Check for empty strings after trim
    if (typeof value === 'string' && value.trim() === '') {
        return true;
    }
    // Check for "Select" placeholder in dropdowns
    if (field.type === 'dropdown' && value === 'Select') {
        return true;
    }
    // Check for false boolean values if field is required
    // Note: For boolean fields, we might want to allow false, so this is optional
    // if (field.type === 'boolean' && value === false && field.required) {
    //   return true
    // }
    return false;
}
function getMissingFields(driver, fields) {
    return fields.filter((field)=>isFieldMissing(driver[field.id], field)).map((field)=>field.id);
}
function getAllMissingFields(drivers, fields) {
    const missing = [];
    drivers.forEach((driver, rowIndex)=>{
        fields.forEach((field)=>{
            if (isFieldMissing(driver[field.id], field)) {
                missing.push({
                    rowIndex,
                    fieldId: field.id,
                    isRequired: field.required || false
                });
            }
        });
    });
    return missing;
}
function isRowComplete(driver, fields) {
    return getMissingFields(driver, fields).length === 0;
}
function getRowMissingCount(driver, fields) {
    return getMissingFields(driver, fields).length;
}
}),
"[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DriversTable",
    ()=>DriversTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/switch.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/columns.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$editable$2d$table$2d$cell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/editable-table-cell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$use$2d$keyboard$2d$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/use-keyboard-navigation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$mvr$2d$suggestions$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/mvr-suggestions.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/validation.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$keyboard$2d$shortcuts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/keyboard-shortcuts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$missing$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/drivers-table/utils/missing-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/app/quote-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/shared/hooks/use-auto-save.ts [app-ssr] (ecmascript)");
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
// Sample static data for Phase 1 - matching wireframe
const SAMPLE_DRIVERS = [
    {
        id: '1',
        firstName: 'Sally',
        lastName: 'Gomez',
        relationship: 'Self',
        dateOfBirth: '1990-10-15',
        gender: 'Female',
        maritalStatus: 'Married',
        email: 'sally.g@example.com',
        phone: '(555) 123-4567',
        includeInPolicy: true,
        licenseNumber: 'A192019291',
        licenseState: 'Arizona',
        licenseStatus: 'Valid',
        yearsLicensed: 'Select'
    },
    {
        id: '2',
        firstName: 'Peter',
        lastName: 'Gomez',
        relationship: 'Spouse',
        dateOfBirth: '1992-08-22',
        gender: 'Male',
        maritalStatus: 'Married',
        email: 'sally.g@example.com',
        phone: '(555) 123-4567',
        includeInPolicy: true,
        licenseNumber: 'A192019291',
        licenseState: 'Arizona',
        licenseStatus: 'Valid',
        yearsLicensed: 'Select'
    }
];
// Sample MVR drivers
const SAMPLE_MVR_DRIVERS = [
    {
        name: 'Jennifer Gomez',
        dateOfBirth: '2010-11-05',
        licenseNumber: '',
        licenseState: '',
        violations: 0,
        accidents: 0,
        confidence: 0.95,
        source: 'MVR'
    }
];
function DriversTable({ drivers: initialDrivers, fields = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$columns$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DRIVER_FIELDS"] }) {
    const { quoteData, updateDrivers, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuote"])();
    // Use quote data if available, otherwise use initialDrivers prop, otherwise use sample data
    const defaultDrivers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (quoteData.drivers && quoteData.drivers.length > 0) {
            return quoteData.drivers;
        }
        if (initialDrivers && initialDrivers.length > 0) {
            return initialDrivers;
        }
        return SAMPLE_DRIVERS;
    }, [
        quoteData.drivers,
        initialDrivers
    ]);
    const [drivers, setDrivers] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultDrivers);
    const [newDriverIds, setNewDriverIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [mvrDrivers] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](SAMPLE_MVR_DRIVERS);
    const [validationErrors, setValidationErrors] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Map());
    const [isLoadingMVR, setIsLoadingMVR] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [missingFields, setMissingFields] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [showMissingOnly, setShowMissingOnly] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const [originalEditingValue, setOriginalEditingValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](null);
    // Track if we've initialized from quote context
    const hasInitialized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](false);
    // Update drivers when quote data changes (on initial load)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!hasInitialized.current && quoteData.drivers && quoteData.drivers.length > 0) {
            setDrivers(quoteData.drivers);
            hasInitialized.current = true;
        } else if (initialDrivers && initialDrivers.length > 0 && !hasInitialized.current) {
            setDrivers(initialDrivers);
            hasInitialized.current = true;
        }
    }, [
        quoteData.drivers,
        initialDrivers
    ]);
    // Auto-save when drivers change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: drivers,
        saveFn: async (data)=>{
            updateDrivers(data);
            await saveQuote();
        },
        debounceMs: 2000,
        enabled: drivers.length > 0
    });
    // Recompute missing fields when drivers or fields change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const missing = new Set();
        drivers.forEach((driver, driverIndex)=>{
            fields.forEach((field)=>{
                if (field.required) {
                    const value = driver[field.id];
                    if (value === null || value === undefined || value === '' || typeof value === 'string' && value.trim() === '' || field.type === 'dropdown' && value === 'Select') {
                        missing.add(`${driverIndex}-${field.id}`);
                    }
                }
            });
        });
        setMissingFields(missing);
    }, [
        drivers,
        fields
    ]);
    // Filter fields to show only missing ones when toggle is on
    const visibleFields = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!showMissingOnly) return fields;
        return fields.filter((field)=>{
            // Check if any driver has missing data for this field
            return drivers.some((driver, driverIndex)=>{
                if (!field.required) return false;
                const errorKey = `${driverIndex}-${field.id}`;
                return missingFields.has(errorKey);
            });
        });
    }, [
        fields,
        drivers,
        missingFields,
        showMissingOnly
    ]);
    // Create mapping from visible field index to original field index
    const getOriginalFieldIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((visibleIndex)=>{
        if (!showMissingOnly) return visibleIndex;
        const field = visibleFields[visibleIndex];
        return fields.findIndex((f)=>f.id === field.id);
    }, [
        showMissingOnly,
        visibleFields,
        fields
    ]);
    // Create mapping from original field index to visible field index
    const getVisibleFieldIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((originalIndex)=>{
        if (!showMissingOnly) return originalIndex;
        const field = fields[originalIndex];
        return visibleFields.findIndex((f)=>f.id === field.id);
    }, [
        showMissingOnly,
        visibleFields,
        fields
    ]);
    // Use a ref to store the add driver function to avoid circular dependency
    const handleAddDriverRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    // Helper to find next visible field index from a given original index
    const findNextVisibleField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((originalIndex)=>{
        if (!showMissingOnly) {
            return originalIndex < fields.length - 1 ? originalIndex + 1 : null;
        }
        for(let i = originalIndex + 1; i < fields.length; i++){
            if (getVisibleFieldIndex(i) !== null) {
                return i;
            }
        }
        return null;
    }, [
        showMissingOnly,
        fields.length,
        getVisibleFieldIndex
    ]);
    // Helper to find previous visible field index from a given original index
    const findPreviousVisibleField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((originalIndex)=>{
        if (!showMissingOnly) {
            return originalIndex > 0 ? originalIndex - 1 : null;
        }
        for(let i = originalIndex - 1; i >= 0; i--){
            if (getVisibleFieldIndex(i) !== null) {
                return i;
            }
        }
        return null;
    }, [
        showMissingOnly,
        getVisibleFieldIndex
    ]);
    // Keyboard navigation hook - keep using original field count for bounds checking
    const { activeCell, editingCell, moveToCell, startEditing, stopEditing, containerRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$use$2d$keyboard$2d$navigation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useKeyboardNavigation"])({
        driverCount: drivers.length,
        fieldCount: fields.length,
        onAddDriver: ()=>handleAddDriverRef.current?.()
    });
    // Update navigation when drivers change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // If active cell is beyond current driver count, reset to last driver
        if (activeCell && activeCell.driverIndex >= drivers.length) {
            if (drivers.length > 0) {
                moveToCell(drivers.length - 1, activeCell.fieldIndex);
            }
        }
    }, [
        drivers.length,
        activeCell,
        moveToCell
    ]);
    // Handle active cell when toggle changes - move to visible field if current is hidden
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!activeCell || !showMissingOnly) return;
        const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex);
        if (visibleIndex === null) {
            // Current field is hidden, find nearest visible field
            if (visibleFields.length > 0) {
                const nextVisible = findNextVisibleField(activeCell.fieldIndex);
                const prevVisible = findPreviousVisibleField(activeCell.fieldIndex);
                if (nextVisible !== null) {
                    moveToCell(activeCell.driverIndex, nextVisible);
                } else if (prevVisible !== null) {
                    moveToCell(activeCell.driverIndex, prevVisible);
                } else {
                    // Fallback to first visible field
                    const firstVisibleOriginalIndex = getOriginalFieldIndex(0);
                    moveToCell(activeCell.driverIndex, firstVisibleOriginalIndex);
                }
            } else {
                // No visible fields, move to first field
                moveToCell(activeCell.driverIndex, 0);
            }
        }
    }, [
        showMissingOnly,
        activeCell,
        visibleFields.length,
        getVisibleFieldIndex,
        getOriginalFieldIndex,
        findNextVisibleField,
        findPreviousVisibleField,
        moveToCell
    ]);
    // Ensure active cell is always visible when filtering (handles navigation to hidden fields)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!activeCell || !showMissingOnly) return;
        const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex);
        if (visibleIndex === null && visibleFields.length > 0) {
            // Active cell is on a hidden field, move to nearest visible
            const nextVisible = findNextVisibleField(activeCell.fieldIndex);
            const prevVisible = findPreviousVisibleField(activeCell.fieldIndex);
            if (nextVisible !== null) {
                moveToCell(activeCell.driverIndex, nextVisible);
            } else if (prevVisible !== null) {
                moveToCell(activeCell.driverIndex, prevVisible);
            } else {
                moveToCell(activeCell.driverIndex, getOriginalFieldIndex(0));
            }
        }
    }, [
        activeCell,
        showMissingOnly,
        visibleFields.length,
        getVisibleFieldIndex,
        findNextVisibleField,
        findPreviousVisibleField,
        getOriginalFieldIndex,
        moveToCell
    ]);
    // Keyboard shortcut to toggle missing fields filter (Ctrl/Cmd + M)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const handleKeyDown = (event)=>{
            // Don't trigger if user is typing in an input
            const target = event.target;
            const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
            const isSelect = target.closest('[data-slot="select"]') !== null;
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'm' && !isInput && !isSelect) {
                event.preventDefault();
                setShowMissingOnly((prev)=>!prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return ()=>window.removeEventListener("keydown", handleKeyDown);
    }, []);
    const handleCellChange = (driverIndex, fieldIndex, value)=>{
        const field = fields[fieldIndex];
        const driver = drivers[driverIndex];
        // Update driver value
        const updatedDrivers = drivers.map((d, idx)=>idx === driverIndex ? {
                ...d,
                [field.id]: value
            } : d);
        setDrivers(updatedDrivers);
        // Validate the cell value
        const updatedDriver = updatedDrivers[driverIndex];
        const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$validation$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateCellValue"])(value, field);
        const errorKey = `${driverIndex}-${field.id}`;
        setValidationErrors((prev)=>{
            const newErrors = new Map(prev);
            if (error) {
                newErrors.set(errorKey, error);
            } else {
                newErrors.delete(errorKey);
            }
            return newErrors;
        });
    };
    // Handle cell focus (navigation only - no edit mode)
    const handleCellFocus = (driverIndex, fieldIndex)=>{
        moveToCell(driverIndex, fieldIndex);
    // Don't automatically enter edit mode - just move focus
    };
    // Handle cell edit (enters edit mode - for click/double-click)
    const handleCellEdit = (driverIndex, fieldIndex)=>{
        moveToCell(driverIndex, fieldIndex);
        startEditing();
        // Store original value when editing starts
        const field = fields[fieldIndex];
        const driver = drivers[driverIndex];
        setOriginalEditingValue({
            driverIndex,
            fieldIndex,
            value: driver[field.id]
        });
    };
    // Handle undo - restore original value
    const handleCellUndo = ()=>{
        if (!originalEditingValue) return;
        const { driverIndex, fieldIndex, value } = originalEditingValue;
        const field = fields[fieldIndex];
        // Restore original value
        const updatedDrivers = drivers.map((d, idx)=>idx === driverIndex ? {
                ...d,
                [field.id]: value
            } : d);
        setDrivers(updatedDrivers);
        // Clear validation errors for this cell
        const errorKey = `${driverIndex}-${field.id}`;
        setValidationErrors((prev)=>{
            const newErrors = new Map(prev);
            newErrors.delete(errorKey);
            return newErrors;
        });
        // Clear original value tracking
        setOriginalEditingValue(null);
    };
    const handleCellBlur = (moveNextAfterBlur = false, undo = false)=>{
        if (undo && originalEditingValue) {
            handleCellUndo();
        }
        stopEditing();
        setOriginalEditingValue(null);
        // After blur, if Enter was pressed, move to next cell
        if (moveNextAfterBlur && !undo && activeCell) {
            const { driverIndex, fieldIndex } = activeCell;
            // Find next visible field
            const nextFieldIndex = findNextVisibleField(fieldIndex);
            if (nextFieldIndex !== null) {
                moveToCell(driverIndex, nextFieldIndex);
            } else if (driverIndex < drivers.length - 1) {
                // Move to next driver, first visible field
                const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 ? getOriginalFieldIndex(0) : 0;
                moveToCell(driverIndex + 1, firstVisibleIndex);
            }
        }
    };
    // Check if a cell is being edited
    const getEditingState = (driverIndex, fieldIndex)=>{
        if (!editingCell) return false;
        return editingCell.driverIndex === driverIndex && editingCell.fieldIndex === fieldIndex;
    };
    // Check if a cell is active (focused)
    const getActiveState = (driverIndex, fieldIndex)=>{
        if (!activeCell) return false;
        return activeCell.driverIndex === driverIndex && activeCell.fieldIndex === fieldIndex;
    };
    // Define handleAddDriver after hook so we can use moveToCell and startEditing
    const handleAddDriver = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        const newDriver = {
            id: `driver-${Date.now()}`,
            firstName: '',
            lastName: '',
            relationship: '',
            dateOfBirth: '',
            gender: '',
            maritalStatus: '',
            email: '',
            phone: '',
            includeInPolicy: false,
            licenseNumber: '',
            licenseState: '',
            licenseStatus: '',
            yearsLicensed: ''
        };
        setDrivers((prev)=>[
                ...prev,
                newDriver
            ]);
        setNewDriverIds((prev)=>new Set(prev).add(newDriver.id));
        // Focus on the new driver's first cell
        setTimeout(()=>{
            moveToCell(drivers.length, 0);
            startEditing();
        }, 100);
    }, [
        drivers.length,
        moveToCell,
        startEditing
    ]);
    // Update the ref whenever handleAddDriver changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        handleAddDriverRef.current = handleAddDriver;
    }, [
        handleAddDriver
    ]);
    const handleDeleteDriver = (driverId)=>{
        setDrivers((prev)=>prev.filter((driver)=>driver.id !== driverId));
        setNewDriverIds((prev)=>{
            const newSet = new Set(prev);
            newSet.delete(driverId);
            return newSet;
        });
    };
    const handleAddFromMVR = async (mvrDriver)=>{
        setIsLoadingMVR(true);
        // Simulate async operation (e.g., API call to add driver)
        await new Promise((resolve)=>setTimeout(resolve, 300));
        // Parse name into first and last name
        const nameParts = mvrDriver.name.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        // Add the MVR driver as a new driver
        const newDriver = {
            id: `mvr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            firstName,
            lastName,
            relationship: 'Child',
            dateOfBirth: mvrDriver.dateOfBirth,
            gender: '',
            maritalStatus: '',
            email: '',
            phone: '',
            includeInPolicy: false,
            licenseNumber: mvrDriver.licenseNumber || '',
            licenseState: mvrDriver.licenseState || '',
            licenseStatus: '',
            yearsLicensed: '',
            isFromMVR: true,
            mvrData: {
                source: mvrDriver.source || 'MVR',
                confidence: mvrDriver.confidence || 0.95
            }
        };
        setDrivers((prev)=>[
                ...prev,
                newDriver
            ]);
        setNewDriverIds((prev)=>new Set(prev).add(newDriver.id));
        setIsLoadingMVR(false);
        // Focus on the new driver's first cell
        setTimeout(()=>{
            moveToCell(drivers.length, 0);
            startEditing();
        }, 100);
    };
    const getDriverBadges = (driver, index)=>{
        const badges = [];
        if (index === 0) {
            badges.push('Primary Insured');
        } else {
            badges.push('Additional Driver');
        }
        if (driver.includeInPolicy) {
            badges.push('Covered');
        }
        if (newDriverIds.has(driver.id)) {
            badges.push('New');
        }
        if (driver.isFromMVR) {
            badges.push('MVR');
        }
        // Add incomplete/complete badge
        const missingCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$utils$2f$missing$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRowMissingCount"])(driver, fields);
        if (missingCount > 0) {
            badges.push({
                type: 'incomplete',
                text: missingCount === 1 ? '1 missing' : `${missingCount} missing`,
                count: missingCount
            });
        } else if (missingCount === 0 && fields.some((f)=>f.required)) {
            badges.push({
                type: 'complete',
                text: 'Complete'
            });
        }
        return badges;
    };
    const isNewDriver = (driverId)=>newDriverIds.has(driverId);
    const isMVRDriver = (driver)=>driver.isFromMVR === true;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 w-full bg-card rounded-lg border border-border overflow-hidden",
        role: "table",
        "aria-label": "Drivers table",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-x-auto relative",
                ref: containerRef,
                role: "grid",
                "aria-rowcount": visibleFields.length + 1,
                "aria-colcount": drivers.length + 1,
                children: drivers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-64 text-muted-foreground",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm mb-2",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "No drivers added yet"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                lineNumber: 548,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: handleAddDriver,
                                className: "h-9 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 556,
                                        columnNumber: 19
                                    }, this),
                                    "Add First Driver"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                lineNumber: 551,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                        lineNumber: 547,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                    lineNumber: 546,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex min-w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card shrink-0 sticky left-0 z-10 border-r border-border",
                            style: {
                                width: '321px'
                            },
                            role: "rowgroup",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[64px] px-4 flex flex-col justify-center gap-2 border-b border-border bg-card",
                                    role: "columnheader",
                                    "aria-label": "Field labels",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-muted-foreground",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: "Drivers"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                            lineNumber: 575,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Switch"], {
                                                    checked: showMissingOnly,
                                                    onCheckedChange: setShowMissingOnly,
                                                    className: "data-[state=checked]:bg-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                    lineNumber: 582,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: "Show missing questions only"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                    lineNumber: 587,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                            lineNumber: 581,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                    lineNumber: 570,
                                    columnNumber: 17
                                }, this),
                                visibleFields.length === 0 && showMissingOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[44px] px-4 flex items-center border-b border-border bg-card",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-normal text-muted-foreground italic",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: "No missing fields"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 598,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                    lineNumber: 597,
                                    columnNumber: 19
                                }, this) : visibleFields.map((field, visibleIndex)=>{
                                    const originalFieldIndex = getOriginalFieldIndex(visibleIndex);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[44px] px-4 flex items-center border-b border-border last:border-b-0 bg-card",
                                        role: "rowheader",
                                        "aria-rowindex": visibleIndex + 2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-normal text-foreground",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: [
                                                field.label,
                                                field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600 ml-1",
                                                    "aria-label": "required",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                            lineNumber: 615,
                                            columnNumber: 25
                                        }, this)
                                    }, field.id, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 609,
                                        columnNumber: 23
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                            lineNumber: 564,
                            columnNumber: 15
                        }, this),
                        drivers.map((driver, driverIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `bg-card shrink-0 border-r border-border last:border-r-0 relative ${isNewDriver(driver.id) ? 'ring-1 ring-blue-500/20' : ''}`,
                                style: {
                                    width: '348px'
                                },
                                role: "column",
                                "aria-label": `Driver ${driverIndex + 1}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[64px] px-4 flex items-center justify-between border-b border-border bg-card group",
                                        role: "columnheader",
                                        "aria-colindex": driverIndex + 2,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-start justify-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-foreground",
                                                        style: {
                                                            fontFamily: "Inter, sans-serif"
                                                        },
                                                        children: [
                                                            "Driver ",
                                                            driverIndex + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-1.5",
                                                        children: getDriverBadges(driver, driverIndex).map((badge, idx)=>{
                                                            // Handle badge objects with type
                                                            if (typeof badge === 'object' && badge.type === 'incomplete') {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-amber-100 text-amber-800 flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                                            lineNumber: 664,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        badge.text
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                                    lineNumber: 659,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            if (typeof badge === 'object' && badge.type === 'complete') {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-green-100 text-green-800 flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                                            lineNumber: 677,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        badge.text
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            // Handle string badges
                                                            if (typeof badge === 'string') {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: `text-xs font-medium border-0 px-1.5 py-0.5 h-5 ${badge === 'New' ? 'bg-blue-50 text-blue-700' : badge === 'MVR' ? 'bg-green-50 text-green-700' : 'bg-muted text-muted-foreground'}`,
                                                                    children: badge
                                                                }, idx, false, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                                    lineNumber: 686,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            // Fallback (should never reach here, but satisfies TypeScript)
                                                            return null;
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                        lineNumber: 654,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                lineNumber: 647,
                                                columnNumber: 19
                                            }, this),
                                            drivers.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "icon",
                                                onClick: ()=>handleDeleteDriver(driver.id),
                                                className: "h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground hover:bg-muted",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                lineNumber: 709,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 642,
                                        columnNumber: 17
                                    }, this),
                                    visibleFields.length === 0 && showMissingOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[44px] border-b border-border bg-card flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground italic",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: "All fields complete"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                            lineNumber: 722,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 721,
                                        columnNumber: 21
                                    }, this) : visibleFields.map((field, visibleIndex)=>{
                                        const originalFieldIndex = getOriginalFieldIndex(visibleIndex);
                                        const isEditing = getEditingState(driverIndex, originalFieldIndex);
                                        const isActive = getActiveState(driverIndex, originalFieldIndex);
                                        const cellValue = driver[field.id];
                                        const errorKey = `${driverIndex}-${field.id}`;
                                        const error = validationErrors.get(errorKey);
                                        const isMissing = missingFields.has(errorKey);
                                        const hasError = !!error;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-cell-id": `driver-${driverIndex}-field-${originalFieldIndex}`,
                                            className: `h-[44px] border-b border-border last:border-b-0 transition-colors ${isActive ? 'bg-muted' : ''} ${hasError ? 'bg-red-50/30 dark:bg-red-950/30' : ''} ${isMissing && !hasError ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`,
                                            role: "gridcell",
                                            "aria-rowindex": visibleIndex + 2,
                                            "aria-colindex": driverIndex + 2,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$editable$2d$table$2d$cell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditableTableCell"], {
                                                value: cellValue,
                                                field: field,
                                                isEditing: isEditing,
                                                onFocus: ()=>handleCellFocus(driverIndex, originalFieldIndex),
                                                onEdit: ()=>handleCellEdit(driverIndex, originalFieldIndex),
                                                onBlur: (moveNext, undo)=>handleCellBlur(moveNext, undo),
                                                onChange: (value)=>handleCellChange(driverIndex, originalFieldIndex, value),
                                                onDoubleClick: ()=>handleCellEdit(driverIndex, originalFieldIndex),
                                                error: error,
                                                isMissing: isMissing && !hasError
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                lineNumber: 753,
                                                columnNumber: 27
                                            }, this)
                                        }, field.id, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                            lineNumber: 741,
                                            columnNumber: 25
                                        }, this);
                                    })
                                ]
                            }, driver.id, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                lineNumber: 632,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card shrink-0 border-border",
                            style: {
                                width: '323px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: handleAddDriver,
                                        className: "w-full h-9 mb-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                                lineNumber: 781,
                                                columnNumber: 21
                                            }, this),
                                            "Add Another Driver"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 776,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$mvr$2d$suggestions$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MVRSuggestions"], {
                                        mvrDrivers: mvrDrivers,
                                        existingDrivers: drivers,
                                        onAddDriver: handleAddFromMVR,
                                        isLoading: isLoadingMVR
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 786,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$drivers$2d$table$2f$keyboard$2d$shortcuts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KeyboardShortcuts"], {}, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                        lineNumber: 794,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                                lineNumber: 774,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                            lineNumber: 773,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                    lineNumber: 562,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
                lineNumber: 538,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
            lineNumber: 536,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/drivers-table/drivers-table.tsx",
        lineNumber: 531,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_portal_src_screens_components_drivers-table_3c34df7b._.js.map