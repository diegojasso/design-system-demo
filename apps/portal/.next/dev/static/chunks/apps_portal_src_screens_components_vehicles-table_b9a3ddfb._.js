(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/portal/src/screens/components/vehicles-table/columns.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VEHICLE_FIELDS",
    ()=>VEHICLE_FIELDS
]);
const VEHICLE_FIELDS = [
    {
        id: 'vin',
        label: 'VIN',
        type: 'text',
        required: true,
        editable: true
    },
    {
        id: 'year',
        label: 'Year',
        type: 'number',
        required: true,
        editable: true
    },
    {
        id: 'make',
        label: 'Make',
        type: 'text',
        required: true,
        editable: true
    },
    {
        id: 'model',
        label: 'Model',
        type: 'text',
        required: true,
        editable: true
    },
    {
        id: 'trim',
        label: 'Trim',
        type: 'dropdown',
        options: [
            'Base',
            'LX',
            'EX',
            'EX-L',
            'Touring',
            'Sport',
            'Limited',
            'Premium',
            'Other'
        ],
        editable: true
    },
    {
        id: 'primaryUse',
        label: 'Primary Use',
        type: 'dropdown',
        options: [
            'Commute',
            'Business',
            'Pleasure',
            'Farm',
            'Other'
        ],
        required: true,
        editable: true
    },
    {
        id: 'annualMileage',
        label: 'Annual Mileage',
        type: 'number-with-unit',
        unit: 'mi',
        required: true,
        editable: true
    },
    {
        id: 'ownershipType',
        label: 'Owned, Leased or Financed',
        type: 'radio',
        radioOptions: [
            {
                value: 'Own',
                label: 'Own'
            },
            {
                value: 'Lease',
                label: 'Lease'
            },
            {
                value: 'Finance',
                label: 'Finance'
            }
        ],
        editable: true
    },
    {
        id: 'ownershipLength',
        label: 'Ownership Length',
        type: 'dropdown',
        options: [
            '< 1 year',
            '+1 year',
            '+2 years',
            '+3 years',
            '+4 years',
            '+5 years',
            '+6 years',
            '+7 years',
            '+8 years',
            '+9 years',
            '+10 years',
            '+10+ years'
        ],
        required: true,
        editable: true
    },
    {
        id: 'garagingZipSame',
        label: 'Is the garaging ZIP the same as the primary address?',
        type: 'radio',
        radioOptions: [
            {
                value: 'Yes',
                label: 'Yes'
            },
            {
                value: 'No',
                label: 'No'
            }
        ],
        editable: true
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/utils/placeholders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
        // Vehicles - Text fields
        vin: mode === 'edit' ? '1HGCM82633A123456' : 'Enter VIN (17 characters)',
        make: mode === 'edit' ? 'e.g., Honda, Toyota' : 'Enter make',
        model: mode === 'edit' ? 'e.g., Accord, Camry' : 'Enter model',
        year: mode === 'edit' ? 'YYYY' : 'Enter year',
        // Vehicles - Number fields
        annualMileage: mode === 'edit' ? 'e.g., 12000' : 'Enter annual mileage',
        // Vehicles - Dropdown fields
        trim: 'Select trim level',
        primaryUse: 'Select primary use',
        ownershipLength: 'Select ownership length',
        // Vehicles - Radio fields (no placeholder needed)
        ownershipType: '',
        garagingZipSame: ''
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
        case 'number-with-unit':
            return `Enter ${field.label.toLowerCase()}`;
        case 'text':
            return `Enter ${field.label.toLowerCase()}`;
        case 'radio':
        case 'boolean':
            return '' // No placeholder for radio/boolean
            ;
        default:
            return `Enter ${field.label.toLowerCase()}`;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableTableCell",
    ()=>EditableTableCell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/utils/placeholders.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const EditableTableCell = /*#__PURE__*/ _s(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](_c = _s(function EditableTableCell({ value, field, isEditing, onFocus, onEdit, onBlur, onChange, onDoubleClick, error, isMissing = false }) {
    _s();
    const inputRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const selectTriggerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    // Auto-focus input when editing starts
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EditableTableCell.EditableTableCell.useEffect": ()=>{
            if (isEditing && inputRef.current) {
                if (field.type === 'text' || field.type === 'date' || field.type === 'number' || field.type === 'number-with-unit') {
                    inputRef.current.focus();
                    inputRef.current.select();
                }
            }
        }
    }["EditableTableCell.EditableTableCell.useEffect"], [
        isEditing,
        field.type
    ]);
    // Auto-open dropdown when entering edit mode via Enter key
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "EditableTableCell.EditableTableCell.useEffect": ()=>{
            if (isEditing && field.type === 'dropdown' && selectTriggerRef.current) {
                // Small delay to ensure the select is rendered
                setTimeout({
                    "EditableTableCell.EditableTableCell.useEffect": ()=>{
                        selectTriggerRef.current?.click();
                    }
                }["EditableTableCell.EditableTableCell.useEffect"], 50);
            }
        }
    }["EditableTableCell.EditableTableCell.useEffect"], [
        isEditing,
        field.type
    ]);
    const formatDisplayValue = ()=>{
        if (value === null || value === undefined || value === '') return null;
        if (field.type === 'number-with-unit') {
            const numValue = Number(value);
            if (isNaN(numValue)) return value;
            return `${numValue.toLocaleString()} ${field.unit || ''}`;
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
    const formatDateForInput = (dateValue)=>{
        if (!dateValue) return '';
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return dateValue;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            onBlur(true, false); // Apply changes and move to next cell
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onBlur(false, true); // Undo changes and cancel editing
        } else if (e.key === 'Tab') {
            e.preventDefault();
            e.stopPropagation();
            onBlur(!e.shiftKey, false); // Apply changes and move to next/previous cell
        }
    };
    // Wrapper to convert React's FocusEvent to our onBlur signature
    const handleBlur = ()=>{
        onBlur(false, false); // Apply changes, don't move to next cell
    };
    const handleKeyDownDisplay = (e)=>{
        if (e.key === 'Enter') {
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
        const placeholder = isEmpty ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDisplayPlaceholder"])(field, field.required) : null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm font-normal w-full ${error ? 'text-red-700 dark:text-red-400' : isMissing && !error && isEmpty ? 'text-amber-600 dark:text-amber-400 italic' : isEmpty && field.required ? 'text-amber-600 dark:text-amber-400 italic' : isEmpty ? 'text-muted-foreground italic' : isMissing && !error ? 'text-amber-900 dark:text-amber-300' : 'text-foreground'}`,
                        children: displayValue || (placeholder ? placeholder : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-muted-foreground",
                            children: "—"
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 180,
                            columnNumber: 59
                        }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-red-600 shrink-0",
                        title: error,
                        children: "⚠"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this),
                    isMissing && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs text-amber-600 shrink-0",
                        title: "Required field is empty",
                        children: "○"
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                        lineNumber: 188,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this);
    }
    // Editing mode
    if (field.type === 'text' || field.type === 'number') {
        const inputType = field.type === 'number' ? 'number' : 'text';
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
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
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'number-with-unit') {
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    ref: inputRef,
                    type: "number",
                    value: value || '',
                    placeholder: placeholder || undefined,
                    onChange: (e)=>onChange(e.target.value),
                    onBlur: handleBlur,
                    onKeyDown: handleKeyDown,
                    className: `h-8 text-sm border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0 flex-1 ${error ? 'text-red-700' : ''}`,
                    "aria-invalid": error ? 'true' : 'false',
                    "aria-describedby": error ? `${field.id}-error` : undefined,
                    style: {
                        fontFamily: "Inter, sans-serif"
                    }
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-muted-foreground shrink-0",
                    style: {
                        fontFamily: "Inter, sans-serif"
                    },
                    children: field.unit || ''
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 230,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'date') {
        const dateValue = formatDateForInput(value || '');
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
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
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 263,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 262,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'dropdown' && field.options) {
        const placeholder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$placeholders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEditPlaceholder"])(field);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                    value: value || '',
                    onValueChange: (newValue)=>{
                        onChange(newValue);
                        onBlur(false, false); // Apply changes, don't move to next
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                            ref: selectTriggerRef,
                            className: "h-8 text-sm border-0 bg-transparent focus:ring-0 focus:ring-offset-0 px-0 shadow-none",
                            onKeyDown: handleKeyDown,
                            style: {
                                fontFamily: "Inter, sans-serif"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                placeholder: placeholder || "Select..."
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                            children: field.options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                    value: option,
                                    children: option
                                }, option, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 308,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 291,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 315,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'radio' && field.radioOptions) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                    value: value || '',
                    onValueChange: (newValue)=>{
                        onChange(newValue);
                        // Auto-blur after selection for better UX
                        setTimeout(()=>onBlur(true, false), 100); // Apply changes and move to next
                    },
                    className: "flex flex-row gap-4",
                    children: field.radioOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: option.value,
                                    id: `${field.id}-${option.value}`,
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 337,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${field.id}-${option.value}`,
                                    className: "text-sm font-normal text-foreground cursor-pointer",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: option.label
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 342,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, option.value, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 326,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 353,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 325,
            columnNumber: 7
        }, this);
    }
    if (field.type === 'boolean') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full px-4 flex items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                    value: value ? 'yes' : 'no',
                    onValueChange: (newValue)=>{
                        onChange(newValue === 'yes');
                        setTimeout(()=>onBlur(true, false), 100); // Apply changes and move to next
                    },
                    className: "flex flex-row gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: "yes",
                                    id: `${field.id}-yes`,
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${field.id}-yes`,
                                    className: "text-sm font-normal text-foreground cursor-pointer",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "Yes"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 372,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: "no",
                                    id: `${field.id}-no`,
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: `${field.id}-no`,
                                    className: "text-sm font-normal text-foreground cursor-pointer",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "No"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                                    lineNumber: 384,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 364,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    id: `${field.id}-error`,
                    className: "sr-only",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
                    lineNumber: 394,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx",
            lineNumber: 363,
            columnNumber: 7
        }, this);
    }
    return null;
}, "8PlJy+2D44otfrZKBeLGXMXo+1E=")), "8PlJy+2D44otfrZKBeLGXMXo+1E=");
_c1 = EditableTableCell;
var _c, _c1;
__turbopack_context__.k.register(_c, "EditableTableCell$React.memo");
__turbopack_context__.k.register(_c1, "EditableTableCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/use-keyboard-navigation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useKeyboardNavigation",
    ()=>useKeyboardNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useKeyboardNavigation({ vehicleCount, fieldCount, onCellChange, onAddVehicle }) {
    _s();
    const [activeCell, setActiveCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingCell, setEditingCell] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Move to a specific cell (navigation only - does NOT enter edit mode)
    const moveToCell = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveToCell]": (vehicleIndex, fieldIndex)=>{
            // Clamp indices to valid ranges
            const clampedVehicleIndex = Math.max(0, Math.min(vehicleIndex, vehicleCount - 1));
            const clampedFieldIndex = Math.max(0, Math.min(fieldIndex, fieldCount - 1));
            const newCell = {
                vehicleIndex: clampedVehicleIndex,
                fieldIndex: clampedFieldIndex
            };
            setActiveCell(newCell);
            // Don't automatically enter edit mode - just move focus
            // Edit mode is only entered via Enter key or click
            // Scroll cell into view and focus it (with a small delay to ensure DOM is updated)
            setTimeout({
                "useKeyboardNavigation.useCallback[moveToCell]": ()=>{
                    const cellElement = containerRef.current?.querySelector(`[data-cell-id="vehicle-${clampedVehicleIndex}-field-${clampedFieldIndex}"]`);
                    if (cellElement) {
                        // Focus the cell div so it can receive keyboard events
                        // Look for the inner div with tabindex
                        const focusableElement = cellElement.querySelector('div[tabindex]');
                        if (focusableElement) {
                            // Use setTimeout to ensure DOM is ready and prevent focus conflicts
                            setTimeout({
                                "useKeyboardNavigation.useCallback[moveToCell]": ()=>{
                                    focusableElement.focus();
                                }
                            }["useKeyboardNavigation.useCallback[moveToCell]"], 10);
                        }
                    }
                }
            }["useKeyboardNavigation.useCallback[moveToCell]"], 10);
        }
    }["useKeyboardNavigation.useCallback[moveToCell]"], [
        vehicleCount,
        fieldCount
    ]);
    // Navigation functions
    const moveNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveNext]": ()=>{
            if (!activeCell) {
                // If no active cell, start at first cell
                if (vehicleCount > 0 && fieldCount > 0) {
                    moveToCell(0, 0);
                }
                return;
            }
            const { vehicleIndex, fieldIndex } = activeCell;
            // Move down (next field), then right (next vehicle)
            if (fieldIndex < fieldCount - 1) {
                moveToCell(vehicleIndex, fieldIndex + 1);
            } else if (vehicleIndex < vehicleCount - 1) {
                moveToCell(vehicleIndex + 1, 0);
            }
        }
    }["useKeyboardNavigation.useCallback[moveNext]"], [
        activeCell,
        vehicleCount,
        fieldCount,
        moveToCell
    ]);
    const movePrevious = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[movePrevious]": ()=>{
            if (!activeCell) {
                // If no active cell, start at last cell
                if (vehicleCount > 0 && fieldCount > 0) {
                    moveToCell(vehicleCount - 1, fieldCount - 1);
                }
                return;
            }
            const { vehicleIndex, fieldIndex } = activeCell;
            // Move up (previous field), then left (previous vehicle)
            if (fieldIndex > 0) {
                moveToCell(vehicleIndex, fieldIndex - 1);
            } else if (vehicleIndex > 0) {
                moveToCell(vehicleIndex - 1, fieldCount - 1);
            }
        }
    }["useKeyboardNavigation.useCallback[movePrevious]"], [
        activeCell,
        vehicleCount,
        fieldCount,
        moveToCell
    ]);
    const moveUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveUp]": ()=>{
            if (!activeCell) return;
            const { vehicleIndex, fieldIndex } = activeCell;
            if (fieldIndex > 0) {
                moveToCell(vehicleIndex, fieldIndex - 1);
            }
        }
    }["useKeyboardNavigation.useCallback[moveUp]"], [
        activeCell,
        fieldCount,
        moveToCell
    ]);
    const moveDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveDown]": ()=>{
            if (!activeCell) return;
            const { vehicleIndex, fieldIndex } = activeCell;
            if (fieldIndex < fieldCount - 1) {
                moveToCell(vehicleIndex, fieldIndex + 1);
            }
        }
    }["useKeyboardNavigation.useCallback[moveDown]"], [
        activeCell,
        fieldCount,
        moveToCell
    ]);
    const moveLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveLeft]": ()=>{
            if (!activeCell) return;
            const { vehicleIndex, fieldIndex } = activeCell;
            if (vehicleIndex > 0) {
                moveToCell(vehicleIndex - 1, fieldIndex);
            }
        }
    }["useKeyboardNavigation.useCallback[moveLeft]"], [
        activeCell,
        vehicleCount,
        moveToCell
    ]);
    const moveRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[moveRight]": ()=>{
            if (!activeCell) return;
            const { vehicleIndex, fieldIndex } = activeCell;
            if (vehicleIndex < vehicleCount - 1) {
                moveToCell(vehicleIndex + 1, fieldIndex);
            }
        }
    }["useKeyboardNavigation.useCallback[moveRight]"], [
        activeCell,
        vehicleCount,
        moveToCell
    ]);
    // Start editing current cell
    const startEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[startEditing]": ()=>{
            if (activeCell) {
                setEditingCell(activeCell);
            }
        }
    }["useKeyboardNavigation.useCallback[startEditing]"], [
        activeCell
    ]);
    // Stop editing
    const stopEditing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[stopEditing]": ()=>{
            setEditingCell(null);
        }
    }["useKeyboardNavigation.useCallback[stopEditing]"], []);
    // Handle keyboard events
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useKeyboardNavigation.useCallback[handleKeyDown]": (e)=>{
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
                    setTimeout({
                        "useKeyboardNavigation.useCallback[handleKeyDown]": ()=>{
                            if (e.shiftKey) {
                                movePrevious();
                            } else {
                                moveNext();
                            }
                        }
                    }["useKeyboardNavigation.useCallback[handleKeyDown]"], 50);
                } else {
                    // In display mode, navigate immediately
                    // Blur any currently focused element first to prevent conflicts
                    if (document.activeElement && document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                    }
                    // Small delay to ensure blur completes
                    setTimeout({
                        "useKeyboardNavigation.useCallback[handleKeyDown]": ()=>{
                            if (e.shiftKey) {
                                movePrevious();
                            } else {
                                moveNext();
                            }
                        }
                    }["useKeyboardNavigation.useCallback[handleKeyDown]"], 10);
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
            // Handle Ctrl/Cmd + N to add new vehicle (only when not in input/select)
            if ((e.ctrlKey || e.metaKey) && e.key === "n" && !isInput && !isSelect) {
                e.preventDefault();
                if (onAddVehicle) {
                    onAddVehicle();
                }
                return;
            }
        }
    }["useKeyboardNavigation.useCallback[handleKeyDown]"], [
        editingCell,
        moveNext,
        movePrevious,
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        startEditing,
        stopEditing,
        onAddVehicle
    ]);
    // Set up keyboard listeners
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useKeyboardNavigation.useEffect": ()=>{
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "useKeyboardNavigation.useEffect": ()=>{
                    window.removeEventListener("keydown", handleKeyDown);
                }
            })["useKeyboardNavigation.useEffect"];
        }
    }["useKeyboardNavigation.useEffect"], [
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
_s(useKeyboardNavigation, "Io791Hl7Nhtyd/ZGPcZS1nT+9vY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyboardShortcuts",
    ()=>KeyboardShortcuts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/kbd.tsx [app-client] (ecmascript)");
"use client";
;
;
function KeyboardShortcuts() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 p-3 bg-muted rounded-md border border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-medium text-muted-foreground mb-2",
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                children: "Keyboard Shortcuts"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Navigate cells"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Tab"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 21,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "↑"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 24,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 25,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Edit cell"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "Enter"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Cancel editing"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                children: "Esc"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Add new vehicle"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Ctrl"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "⌘"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "N"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                style: {
                                    fontFamily: "Inter, sans-serif"
                                },
                                children: "Toggle missing fields"
                            }, void 0, false, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "Ctrl"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 58,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "⌘"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 61,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$kbd$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Kbd"], {
                                        children: "M"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = KeyboardShortcuts;
var _c;
__turbopack_context__.k.register(_c, "KeyboardShortcuts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VehicleSuggestions",
    ()=>VehicleSuggestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function VehicleSuggestions({ discoveredVehicles, existingVehicles, onAddVehicle, isLoading = false }) {
    _s();
    // Filter out vehicles that already exist in the table
    const filteredDiscoveredVehicles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "VehicleSuggestions.useMemo[filteredDiscoveredVehicles]": ()=>{
            return discoveredVehicles.filter({
                "VehicleSuggestions.useMemo[filteredDiscoveredVehicles]": (discoveredVehicle)=>{
                    // Check if a vehicle with the same VIN, or same make/model/year already exists
                    const exists = existingVehicles.some({
                        "VehicleSuggestions.useMemo[filteredDiscoveredVehicles].exists": (vehicle)=>{
                            // If both have VINs, compare by VIN
                            if (discoveredVehicle.vin && vehicle.vin) {
                                return discoveredVehicle.vin.toLowerCase() === vehicle.vin.toLowerCase();
                            }
                            // Otherwise, compare by make, model, and year
                            const vehicleMake = vehicle.make.toLowerCase().trim();
                            const vehicleModel = vehicle.model.toLowerCase().trim();
                            const vehicleYear = vehicle.year.trim();
                            const discoveredMake = discoveredVehicle.make.toLowerCase().trim();
                            const discoveredModel = discoveredVehicle.model.toLowerCase().trim();
                            const discoveredYear = discoveredVehicle.year.trim();
                            return vehicleMake === discoveredMake && vehicleModel === discoveredModel && vehicleYear === discoveredYear;
                        }
                    }["VehicleSuggestions.useMemo[filteredDiscoveredVehicles].exists"]);
                    return !exists;
                }
            }["VehicleSuggestions.useMemo[filteredDiscoveredVehicles]"]);
        }
    }["VehicleSuggestions.useMemo[filteredDiscoveredVehicles]"], [
        discoveredVehicles,
        existingVehicles
    ]);
    if (filteredDiscoveredVehicles.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-sm font-medium text-foreground mb-3",
                    style: {
                        fontFamily: "Inter, sans-serif"
                    },
                    children: "Vehicles Found"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground",
                    style: {
                        fontFamily: "Inter, sans-serif"
                    },
                    children: "No additional vehicles found"
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-medium text-foreground mb-3",
                style: {
                    fontFamily: "Inter, sans-serif"
                },
                children: "Vehicles Found"
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: filteredDiscoveredVehicles.map((discoveredVehicle, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VehicleSuggestionCard, {
                        discoveredVehicle: discoveredVehicle,
                        onAdd: ()=>onAddVehicle(discoveredVehicle),
                        isLoading: isLoading
                    }, `${discoveredVehicle.make}-${discoveredVehicle.model}-${discoveredVehicle.year}-${index}`, false, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(VehicleSuggestions, "0ZDc5OnudtyJWbLfd5A51V5navU=");
_c = VehicleSuggestions;
function VehicleSuggestionCard({ discoveredVehicle, onAdd, isLoading = false }) {
    const formatConfidence = (confidence)=>{
        return `${Math.round(confidence * 100)}%`;
    };
    const getVehicleDisplay = ()=>{
        const parts = [
            discoveredVehicle.year,
            discoveredVehicle.make,
            discoveredVehicle.model
        ].filter(Boolean);
        return parts.join(' ');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-border bg-card rounded-md p-3 hover:bg-muted transition-colors",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-foreground truncate",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: getVehicleDisplay()
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                discoveredVehicle.confidence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground shrink-0",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: formatConfidence(discoveredVehicle.confidence)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 flex-wrap",
                            children: [
                                discoveredVehicle.vin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground font-mono",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: discoveredVehicle.vin
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                discoveredVehicle.source && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: [
                                        "• ",
                                        discoveredVehicle.source
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this),
                        (discoveredVehicle.badges?.cleanTitle || discoveredVehicle.badges?.carfaxVerified) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 mt-2",
                            children: [
                                discoveredVehicle.badges.cleanTitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "Clean title"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 147,
                                    columnNumber: 17
                                }, this),
                                discoveredVehicle.badges.carfaxVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs px-1.5 py-0.5 bg-muted text-muted-foreground rounded",
                                    style: {
                                        fontFamily: "Inter, sans-serif"
                                    },
                                    children: "Carfax ✓"
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                                    lineNumber: 155,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "icon",
                    onClick: onAdd,
                    disabled: isLoading,
                    className: "h-8 w-8 shrink-0 ml-2",
                    "aria-label": isLoading ? "Adding vehicle..." : "Add vehicle",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                        className: `h-4 w-4 ${isLoading ? 'opacity-50' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
            lineNumber: 107,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
_c1 = VehicleSuggestionCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "VehicleSuggestions");
__turbopack_context__.k.register(_c1, "VehicleSuggestionCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateCellValue",
    ()=>validateCellValue,
    "validateVehicle",
    ()=>validateVehicle
]);
function validateVehicle(vehicle, fields) {
    const errors = [];
    fields.forEach((field)=>{
        if (field.required) {
            const value = vehicle[field.id];
            if (value === null || value === undefined || value === '') {
                errors.push({
                    fieldId: field.id,
                    message: `${field.label} is required`
                });
            }
        }
        // VIN validation
        if (field.id === 'vin' && vehicle.vin) {
            const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
            if (!vinRegex.test(vehicle.vin)) {
                errors.push({
                    fieldId: 'vin',
                    message: 'VIN must be 17 characters (alphanumeric)'
                });
            }
        }
        // Year validation
        if (field.id === 'year' && vehicle.year) {
            const year = parseInt(vehicle.year);
            const currentYear = new Date().getFullYear();
            const minYear = 1900;
            const maxYear = currentYear + 1 // Allow next year for new vehicles
            ;
            if (isNaN(year) || year < minYear || year > maxYear) {
                errors.push({
                    fieldId: 'year',
                    message: `Year must be between ${minYear} and ${maxYear}`
                });
            }
        }
        // Annual Mileage validation
        if (field.id === 'annualMileage' && vehicle.annualMileage) {
            const mileage = parseFloat(vehicle.annualMileage);
            if (isNaN(mileage) || mileage < 0) {
                errors.push({
                    fieldId: 'annualMileage',
                    message: 'Annual mileage must be a positive number'
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
    if (field.id === 'vin' && value) {
        const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
        if (!vinRegex.test(value)) {
            return 'VIN must be 17 characters (alphanumeric)';
        }
    }
    if (field.id === 'year' && value) {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        const minYear = 1900;
        const maxYear = currentYear + 1;
        if (isNaN(year) || year < minYear || year > maxYear) {
            return `Year must be between ${minYear} and ${maxYear}`;
        }
    }
    if (field.id === 'annualMileage' && value) {
        const mileage = parseFloat(value);
        if (isNaN(mileage) || mileage < 0) {
            return 'Annual mileage must be a positive number';
        }
    }
    return null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/utils/missing-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
    return false;
}
function getMissingFields(vehicle, fields) {
    return fields.filter((field)=>isFieldMissing(vehicle[field.id], field)).map((field)=>field.id);
}
function getAllMissingFields(vehicles, fields) {
    const missing = [];
    vehicles.forEach((vehicle, rowIndex)=>{
        fields.forEach((field)=>{
            if (isFieldMissing(vehicle[field.id], field)) {
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
function isRowComplete(vehicle, fields) {
    return getMissingFields(vehicle, fields).length === 0;
}
function getRowMissingCount(vehicle, fields) {
    return getMissingFields(vehicle, fields).length;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VehiclesTable",
    ()=>VehiclesTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/ui/src/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/columns.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$editable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/editable-table-cell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$use$2d$keyboard$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/use-keyboard-navigation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$keyboard$2d$shortcuts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/keyboard-shortcuts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$vehicle$2d$suggestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/vehicle-suggestions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$missing$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/portal/src/screens/components/vehicles-table/utils/missing-data.ts [app-client] (ecmascript)");
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
;
;
;
;
;
// Sample static data for Phase 1 - matching wireframe
const SAMPLE_VEHICLES = [
    {
        id: 'vehicle-1',
        vin: '1HGCM82633A123456',
        year: '2021',
        make: 'Honda',
        model: 'Accord',
        trim: 'EX-L',
        primaryUse: 'Commute',
        annualMileage: '12000',
        ownershipType: 'Own',
        ownershipLength: '+5 years',
        garagingZipSame: 'Yes',
        badges: {
            cleanTitle: true,
            carfaxVerified: true
        }
    },
    {
        id: 'vehicle-2',
        vin: '1HGCM82633A123457',
        year: '2021',
        make: 'Honda',
        model: 'Accord',
        trim: 'EX-L',
        primaryUse: 'Commute',
        annualMileage: '12000',
        ownershipType: 'Own',
        ownershipLength: '+5 years',
        garagingZipSame: 'Yes',
        badges: {
            cleanTitle: true,
            carfaxVerified: true
        }
    }
];
// Sample discovered vehicles
const SAMPLE_DISCOVERED_VEHICLES = [
    {
        make: 'Ford',
        model: 'Fiesta',
        year: '2010',
        confidence: 0.95,
        source: 'DMV',
        badges: {
            cleanTitle: true
        }
    },
    {
        make: 'Toyota',
        model: 'Camry',
        year: '2018',
        vin: '4T1B11HK5JU123456',
        confidence: 0.92,
        source: 'Carfax',
        badges: {
            cleanTitle: true,
            carfaxVerified: true
        }
    }
];
function VehiclesTable({ vehicles: initialVehicles, fields = __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$columns$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VEHICLE_FIELDS"] }) {
    _s();
    const { quoteData, updateVehicles, saveQuote } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"])();
    // Use quote data if available, otherwise use initialVehicles prop, otherwise use sample data
    const defaultVehicles = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "VehiclesTable.useMemo[defaultVehicles]": ()=>{
            if (quoteData.vehicles && quoteData.vehicles.length > 0) {
                return quoteData.vehicles;
            }
            if (initialVehicles && initialVehicles.length > 0) {
                return initialVehicles;
            }
            return SAMPLE_VEHICLES;
        }
    }["VehiclesTable.useMemo[defaultVehicles]"], [
        quoteData.vehicles,
        initialVehicles
    ]);
    const [vehicles, setVehicles] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultVehicles);
    const [newVehicleIds, setNewVehicleIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [discoveredVehicles] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](SAMPLE_DISCOVERED_VEHICLES);
    const [isLoadingDiscovery, setIsLoadingDiscovery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [validationErrors, setValidationErrors] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Map());
    const [missingFields, setMissingFields] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [showMissingOnly, setShowMissingOnly] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [originalEditingValue, setOriginalEditingValue] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    // Track if we've initialized from quote context
    const hasInitialized = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](false);
    // Update vehicles when quote data changes (on initial load)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            if (!hasInitialized.current && quoteData.vehicles && quoteData.vehicles.length > 0) {
                setVehicles(quoteData.vehicles);
                hasInitialized.current = true;
            } else if (initialVehicles && initialVehicles.length > 0 && !hasInitialized.current) {
                setVehicles(initialVehicles);
                hasInitialized.current = true;
            }
        }
    }["VehiclesTable.useEffect"], [
        quoteData.vehicles,
        initialVehicles
    ]);
    // Auto-save when vehicles change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"])({
        data: vehicles,
        saveFn: {
            "VehiclesTable.useAutoSave": async (data)=>{
                updateVehicles(data);
                await saveQuote();
            }
        }["VehiclesTable.useAutoSave"],
        debounceMs: 2000,
        enabled: vehicles.length > 0
    });
    // Recompute missing fields when vehicles or fields change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            const missing = new Set();
            vehicles.forEach({
                "VehiclesTable.useEffect": (vehicle, vehicleIndex)=>{
                    fields.forEach({
                        "VehiclesTable.useEffect": (field)=>{
                            if (field.required) {
                                const value = vehicle[field.id];
                                if (value === null || value === undefined || value === '' || typeof value === 'string' && value.trim() === '' || field.type === 'dropdown' && value === 'Select') {
                                    missing.add(`${vehicleIndex}-${field.id}`);
                                }
                            }
                        }
                    }["VehiclesTable.useEffect"]);
                }
            }["VehiclesTable.useEffect"]);
            setMissingFields(missing);
        }
    }["VehiclesTable.useEffect"], [
        vehicles,
        fields
    ]);
    // Filter fields to show only missing ones when toggle is on
    const visibleFields = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "VehiclesTable.useMemo[visibleFields]": ()=>{
            if (!showMissingOnly) return fields;
            return fields.filter({
                "VehiclesTable.useMemo[visibleFields]": (field)=>{
                    // Check if any vehicle has missing data for this field
                    return vehicles.some({
                        "VehiclesTable.useMemo[visibleFields]": (vehicle, vehicleIndex)=>{
                            if (!field.required) return false;
                            const errorKey = `${vehicleIndex}-${field.id}`;
                            return missingFields.has(errorKey);
                        }
                    }["VehiclesTable.useMemo[visibleFields]"]);
                }
            }["VehiclesTable.useMemo[visibleFields]"]);
        }
    }["VehiclesTable.useMemo[visibleFields]"], [
        fields,
        vehicles,
        missingFields,
        showMissingOnly
    ]);
    // Create mapping from visible field index to original field index
    const getOriginalFieldIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[getOriginalFieldIndex]": (visibleIndex)=>{
            if (!showMissingOnly) return visibleIndex;
            const field = visibleFields[visibleIndex];
            return fields.findIndex({
                "VehiclesTable.useCallback[getOriginalFieldIndex]": (f)=>f.id === field.id
            }["VehiclesTable.useCallback[getOriginalFieldIndex]"]);
        }
    }["VehiclesTable.useCallback[getOriginalFieldIndex]"], [
        showMissingOnly,
        visibleFields,
        fields
    ]);
    // Create mapping from original field index to visible field index
    const getVisibleFieldIndex = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[getVisibleFieldIndex]": (originalIndex)=>{
            if (!showMissingOnly) return originalIndex;
            const field = fields[originalIndex];
            return visibleFields.findIndex({
                "VehiclesTable.useCallback[getVisibleFieldIndex]": (f)=>f.id === field.id
            }["VehiclesTable.useCallback[getVisibleFieldIndex]"]);
        }
    }["VehiclesTable.useCallback[getVisibleFieldIndex]"], [
        showMissingOnly,
        visibleFields,
        fields
    ]);
    // Helper to find next visible field index from a given original index
    const findNextVisibleField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[findNextVisibleField]": (originalIndex)=>{
            if (!showMissingOnly) {
                return originalIndex < fields.length - 1 ? originalIndex + 1 : null;
            }
            for(let i = originalIndex + 1; i < fields.length; i++){
                if (getVisibleFieldIndex(i) !== null) {
                    return i;
                }
            }
            return null;
        }
    }["VehiclesTable.useCallback[findNextVisibleField]"], [
        showMissingOnly,
        fields.length,
        getVisibleFieldIndex
    ]);
    // Helper to find previous visible field index from a given original index
    const findPreviousVisibleField = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[findPreviousVisibleField]": (originalIndex)=>{
            if (!showMissingOnly) {
                return originalIndex > 0 ? originalIndex - 1 : null;
            }
            for(let i = originalIndex - 1; i >= 0; i--){
                if (getVisibleFieldIndex(i) !== null) {
                    return i;
                }
            }
            return null;
        }
    }["VehiclesTable.useCallback[findPreviousVisibleField]"], [
        showMissingOnly,
        getVisibleFieldIndex
    ]);
    // Use a ref to store the add vehicle function to avoid circular dependency
    const handleAddVehicleRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    // Keyboard navigation hook - update when vehicles change
    const { activeCell, editingCell, moveToCell, startEditing, stopEditing, containerRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$use$2d$keyboard$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardNavigation"])({
        vehicleCount: vehicles.length,
        fieldCount: fields.length,
        onAddVehicle: {
            "VehiclesTable.useKeyboardNavigation": ()=>handleAddVehicleRef.current?.()
        }["VehiclesTable.useKeyboardNavigation"]
    });
    // Update navigation when vehicles change
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            // If active cell is beyond current vehicle count, reset to last vehicle
            if (activeCell && activeCell.vehicleIndex >= vehicles.length) {
                if (vehicles.length > 0) {
                    moveToCell(vehicles.length - 1, activeCell.fieldIndex);
                }
            }
        }
    }["VehiclesTable.useEffect"], [
        vehicles.length,
        activeCell,
        moveToCell
    ]);
    // Handle active cell when toggle changes - move to visible field if current is hidden
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            if (!activeCell || !showMissingOnly) return;
            const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex);
            if (visibleIndex === null) {
                // Current field is hidden, find nearest visible field
                if (visibleFields.length > 0) {
                    const nextVisible = findNextVisibleField(activeCell.fieldIndex);
                    const prevVisible = findPreviousVisibleField(activeCell.fieldIndex);
                    if (nextVisible !== null) {
                        moveToCell(activeCell.vehicleIndex, nextVisible);
                    } else if (prevVisible !== null) {
                        moveToCell(activeCell.vehicleIndex, prevVisible);
                    } else {
                        // Fallback to first visible field
                        const firstVisibleOriginalIndex = getOriginalFieldIndex(0);
                        moveToCell(activeCell.vehicleIndex, firstVisibleOriginalIndex);
                    }
                } else {
                    // No visible fields, move to first field
                    moveToCell(activeCell.vehicleIndex, 0);
                }
            }
        }
    }["VehiclesTable.useEffect"], [
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            if (!activeCell || !showMissingOnly) return;
            const visibleIndex = getVisibleFieldIndex(activeCell.fieldIndex);
            if (visibleIndex === null && visibleFields.length > 0) {
                // Active cell is on a hidden field, move to nearest visible
                const nextVisible = findNextVisibleField(activeCell.fieldIndex);
                const prevVisible = findPreviousVisibleField(activeCell.fieldIndex);
                if (nextVisible !== null) {
                    moveToCell(activeCell.vehicleIndex, nextVisible);
                } else if (prevVisible !== null) {
                    moveToCell(activeCell.vehicleIndex, prevVisible);
                } else {
                    moveToCell(activeCell.vehicleIndex, getOriginalFieldIndex(0));
                }
            }
        }
    }["VehiclesTable.useEffect"], [
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            const handleKeyDown = {
                "VehiclesTable.useEffect.handleKeyDown": (event)=>{
                    // Don't trigger if user is typing in an input
                    const target = event.target;
                    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
                    const isSelect = target.closest('[data-slot="select"]') !== null;
                    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'm' && !isInput && !isSelect) {
                        event.preventDefault();
                        setShowMissingOnly({
                            "VehiclesTable.useEffect.handleKeyDown": (prev)=>!prev
                        }["VehiclesTable.useEffect.handleKeyDown"]);
                    }
                }
            }["VehiclesTable.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "VehiclesTable.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["VehiclesTable.useEffect"];
        }
    }["VehiclesTable.useEffect"], []);
    const handleCellChange = (vehicleIndex, fieldIndex, value)=>{
        const field = fields[fieldIndex];
        // Update vehicle value
        const updatedVehicles = vehicles.map((v, idx)=>idx === vehicleIndex ? {
                ...v,
                [field.id]: value
            } : v);
        setVehicles(updatedVehicles);
        // Validate the cell value
        const error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCellValue"])(value, field);
        const errorKey = `${vehicleIndex}-${field.id}`;
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
    const handleCellFocus = (vehicleIndex, fieldIndex)=>{
        moveToCell(vehicleIndex, fieldIndex);
    // Don't automatically enter edit mode - just move focus
    };
    // Handle cell edit (enters edit mode - for click/double-click)
    const handleCellEdit = (vehicleIndex, fieldIndex)=>{
        moveToCell(vehicleIndex, fieldIndex);
        startEditing();
        // Store original value when editing starts
        const field = fields[fieldIndex];
        const vehicle = vehicles[vehicleIndex];
        setOriginalEditingValue({
            vehicleIndex,
            fieldIndex,
            value: vehicle[field.id]
        });
    };
    // Handle undo - restore original value
    const handleCellUndo = ()=>{
        if (!originalEditingValue) return;
        const { vehicleIndex, fieldIndex, value } = originalEditingValue;
        const field = fields[fieldIndex];
        // Restore original value
        const updatedVehicles = vehicles.map((v, idx)=>idx === vehicleIndex ? {
                ...v,
                [field.id]: value
            } : v);
        setVehicles(updatedVehicles);
        // Clear validation errors for this cell
        const errorKey = `${vehicleIndex}-${field.id}`;
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
            const { vehicleIndex, fieldIndex } = activeCell;
            // Find next visible field
            const nextFieldIndex = findNextVisibleField(fieldIndex);
            if (nextFieldIndex !== null) {
                moveToCell(vehicleIndex, nextFieldIndex);
            } else if (vehicleIndex < vehicles.length - 1) {
                // Move to next vehicle, first visible field
                const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 ? getOriginalFieldIndex(0) : 0;
                moveToCell(vehicleIndex + 1, firstVisibleIndex);
            }
        }
    };
    // Check if a cell is being edited
    const getEditingState = (vehicleIndex, fieldIndex)=>{
        if (!editingCell) return false;
        return editingCell.vehicleIndex === vehicleIndex && editingCell.fieldIndex === fieldIndex;
    };
    // Check if a cell is active (focused)
    const getActiveState = (vehicleIndex, fieldIndex)=>{
        if (!activeCell) return false;
        return activeCell.vehicleIndex === vehicleIndex && activeCell.fieldIndex === fieldIndex;
    };
    // Define handleAddVehicle after hook so we can use moveToCell and startEditing
    const handleAddVehicle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[handleAddVehicle]": ()=>{
            const newVehicle = {
                id: `vehicle-${Date.now()}`,
                vin: '',
                year: '',
                make: '',
                model: '',
                trim: '',
                primaryUse: '',
                annualMileage: '',
                ownershipType: '',
                ownershipLength: '',
                garagingZipSame: ''
            };
            setVehicles({
                "VehiclesTable.useCallback[handleAddVehicle]": (prev)=>[
                        ...prev,
                        newVehicle
                    ]
            }["VehiclesTable.useCallback[handleAddVehicle]"]);
            setNewVehicleIds({
                "VehiclesTable.useCallback[handleAddVehicle]": (prev)=>new Set(prev).add(newVehicle.id)
            }["VehiclesTable.useCallback[handleAddVehicle]"]);
            // Focus on the new vehicle's first visible cell
            const newVehicleIndex = vehicles.length;
            setTimeout({
                "VehiclesTable.useCallback[handleAddVehicle]": ()=>{
                    const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 ? getOriginalFieldIndex(0) : 0;
                    moveToCell(newVehicleIndex, firstVisibleIndex);
                    startEditing();
                }
            }["VehiclesTable.useCallback[handleAddVehicle]"], 100);
        }
    }["VehiclesTable.useCallback[handleAddVehicle]"], [
        vehicles.length,
        showMissingOnly,
        visibleFields.length,
        getOriginalFieldIndex,
        moveToCell,
        startEditing
    ]);
    // Update the ref whenever handleAddVehicle changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "VehiclesTable.useEffect": ()=>{
            handleAddVehicleRef.current = handleAddVehicle;
        }
    }["VehiclesTable.useEffect"], [
        handleAddVehicle
    ]);
    const handleAddFromDiscovery = async (discoveredVehicle)=>{
        setIsLoadingDiscovery(true);
        // Simulate async operation (e.g., API call to add vehicle)
        await new Promise((resolve)=>setTimeout(resolve, 300));
        // Add the discovered vehicle as a new vehicle
        const newVehicle = {
            id: `discovery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            vin: discoveredVehicle.vin || '',
            year: discoveredVehicle.year,
            make: discoveredVehicle.make,
            model: discoveredVehicle.model,
            trim: '',
            primaryUse: '',
            annualMileage: '',
            ownershipType: '',
            ownershipLength: '',
            garagingZipSame: '',
            isFromDiscovery: true,
            discoveryData: {
                source: discoveredVehicle.source || 'Discovery',
                confidence: discoveredVehicle.confidence || 0.95
            },
            badges: discoveredVehicle.badges
        };
        setVehicles((prev)=>[
                ...prev,
                newVehicle
            ]);
        setNewVehicleIds((prev)=>new Set(prev).add(newVehicle.id));
        setIsLoadingDiscovery(false);
        // Focus on the new vehicle's first visible cell
        setTimeout(()=>{
            const firstVisibleIndex = showMissingOnly && visibleFields.length > 0 ? getOriginalFieldIndex(0) : 0;
            moveToCell(vehicles.length, firstVisibleIndex);
            startEditing();
        }, 100);
    };
    const isNewVehicle = (vehicleId)=>newVehicleIds.has(vehicleId);
    const getVehicleBadges = (vehicle, vehicleIndex)=>{
        const badges = [];
        // Data source badges
        if (vehicle.isFromDiscovery) {
            badges.push('Discovery');
        }
        if (isNewVehicle(vehicle.id)) {
            badges.push('New');
        }
        // Vehicle condition badges
        if (vehicle.badges?.cleanTitle) {
            badges.push('Clean title');
        }
        if (vehicle.badges?.carfaxVerified) {
            badges.push('Carfax ✓');
        }
        // Add incomplete/complete badge
        const missingCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$utils$2f$missing$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRowMissingCount"])(vehicle, fields);
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
    const handleDeleteVehicle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "VehiclesTable.useCallback[handleDeleteVehicle]": (vehicleId, vehicleIndex)=>{
            setVehicles({
                "VehiclesTable.useCallback[handleDeleteVehicle]": (prev)=>prev.filter({
                        "VehiclesTable.useCallback[handleDeleteVehicle]": (v)=>v.id !== vehicleId
                    }["VehiclesTable.useCallback[handleDeleteVehicle]"])
            }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
            setNewVehicleIds({
                "VehiclesTable.useCallback[handleDeleteVehicle]": (prev)=>{
                    const newSet = new Set(prev);
                    newSet.delete(vehicleId);
                    return newSet;
                }
            }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
            // Clear validation errors for deleted vehicle
            setValidationErrors({
                "VehiclesTable.useCallback[handleDeleteVehicle]": (prev)=>{
                    const newErrors = new Map(prev);
                    fields.forEach({
                        "VehiclesTable.useCallback[handleDeleteVehicle]": (field)=>{
                            newErrors.delete(`${vehicleIndex}-${field.id}`);
                        }
                    }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
                    // Shift errors for vehicles after the deleted one
                    const shiftedErrors = new Map();
                    prev.forEach({
                        "VehiclesTable.useCallback[handleDeleteVehicle]": (errorValue, key)=>{
                            const [vehicleIdxStr] = key.split('-');
                            const vehicleIdx = Number(vehicleIdxStr);
                            if (vehicleIdx > vehicleIndex) {
                                fields.forEach({
                                    "VehiclesTable.useCallback[handleDeleteVehicle]": (field)=>{
                                        const oldKey = `${vehicleIdx}-${field.id}`;
                                        const newKey = `${vehicleIdx - 1}-${field.id}`;
                                        const error = newErrors.get(oldKey);
                                        if (error) {
                                            shiftedErrors.set(newKey, error);
                                        }
                                    }
                                }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
                            } else if (vehicleIdx < vehicleIndex) {
                                fields.forEach({
                                    "VehiclesTable.useCallback[handleDeleteVehicle]": (field)=>{
                                        const keyToKeep = `${vehicleIdx}-${field.id}`;
                                        const error = newErrors.get(keyToKeep);
                                        if (error) {
                                            shiftedErrors.set(keyToKeep, error);
                                        }
                                    }
                                }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
                            }
                        }
                    }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
                    return shiftedErrors;
                }
            }["VehiclesTable.useCallback[handleDeleteVehicle]"]);
            // Adjust active cell if needed
            if (activeCell) {
                if (activeCell.vehicleIndex === vehicleIndex) {
                    // If deleted vehicle was active, move to previous vehicle or first vehicle
                    if (vehicles.length > 1) {
                        const newIndex = vehicleIndex > 0 ? vehicleIndex - 1 : 0;
                        moveToCell(newIndex, activeCell.fieldIndex);
                    }
                } else if (activeCell.vehicleIndex > vehicleIndex) {
                    // If active cell is after deleted vehicle, adjust index
                    moveToCell(activeCell.vehicleIndex - 1, activeCell.fieldIndex);
                }
            }
        }
    }["VehiclesTable.useCallback[handleDeleteVehicle]"], [
        vehicles.length,
        fields,
        activeCell,
        moveToCell
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8 w-full bg-card rounded-lg border border-border overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-x-auto relative",
                ref: containerRef,
                role: "grid",
                "aria-rowcount": visibleFields.length + 1,
                "aria-colcount": vehicles.length + 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex min-w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card shrink-0 sticky left-0 z-10 border-r border-border",
                            style: {
                                width: '321px'
                            },
                            role: "rowgroup",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[64px] px-4 flex flex-col justify-center gap-2 border-b border-border bg-card",
                                    role: "columnheader",
                                    "aria-label": "Field labels",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-muted-foreground",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: "Vehicles"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                            lineNumber: 612,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                    checked: showMissingOnly,
                                                    onCheckedChange: setShowMissingOnly,
                                                    className: "data-[state=checked]:bg-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                    lineNumber: 619,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    style: {
                                                        fontFamily: "Inter, sans-serif"
                                                    },
                                                    children: "Show missing questions only"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                            lineNumber: 618,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                    lineNumber: 607,
                                    columnNumber: 15
                                }, this),
                                visibleFields.length === 0 && showMissingOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-[44px] px-4 flex items-center border-b border-border bg-card",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-normal text-muted-foreground italic",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: "No missing fields"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 635,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                    lineNumber: 634,
                                    columnNumber: 17
                                }, this) : visibleFields.map((field, visibleIndex)=>{
                                    const originalFieldIndex = getOriginalFieldIndex(visibleIndex);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[44px] px-4 flex items-center border-b border-border last:border-b-0 bg-card",
                                        role: "rowheader",
                                        "aria-rowindex": visibleIndex + 2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-normal text-foreground",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: [
                                                field.label,
                                                field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-600 ml-1",
                                                    "aria-label": "required",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                            lineNumber: 652,
                                            columnNumber: 23
                                        }, this)
                                    }, field.id, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 646,
                                        columnNumber: 21
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                            lineNumber: 601,
                            columnNumber: 13
                        }, this),
                        vehicles.map((vehicle, vehicleIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `bg-card shrink-0 border-r border-border last:border-r-0 relative ${isNewVehicle(vehicle.id) ? 'ring-1 ring-blue-500/20' : ''}`,
                                style: {
                                    width: '348px'
                                },
                                role: "column",
                                "aria-label": `Vehicle ${vehicleIndex + 1}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[64px] px-4 flex items-center justify-between border-b border-border bg-card group",
                                        role: "columnheader",
                                        "aria-colindex": vehicleIndex + 2,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-start justify-start gap-2 flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium text-foreground truncate",
                                                        style: {
                                                            fontFamily: "Inter, sans-serif"
                                                        },
                                                        children: [
                                                            "Vehicle ",
                                                            vehicleIndex + 1
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 shrink-0 flex-wrap",
                                                        children: getVehicleBadges(vehicle, vehicleIndex).map((badge, idx)=>{
                                                            // Handle badge objects with type
                                                            if (typeof badge === 'object' && badge.type === 'incomplete') {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-amber-100 text-amber-800 flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                                            lineNumber: 702,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        badge.text
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                                    lineNumber: 697,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            if (typeof badge === 'object' && badge.type === 'complete') {
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    className: "text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-green-100 text-green-800 flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                                            lineNumber: 715,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        badge.text
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                                    lineNumber: 710,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            // Style badges differently based on type
                                                            const isStatusBadge = badge === 'New' || badge === 'Discovery';
                                                            const isConditionBadge = badge === 'Clean title' || badge === 'Carfax ✓';
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "secondary",
                                                                className: `text-xs px-1.5 py-0 h-5 border-0 ${isStatusBadge ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : isConditionBadge ? 'bg-muted text-muted-foreground' : 'bg-muted text-muted-foreground'}`,
                                                                children: typeof badge === 'string' ? badge : badge.text
                                                            }, idx, false, {
                                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                                lineNumber: 726,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                lineNumber: 684,
                                                columnNumber: 19
                                            }, this),
                                            vehicles.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                                onClick: ()=>handleDeleteVehicle(vehicle.id, vehicleIndex),
                                                "aria-label": `Delete vehicle ${vehicleIndex + 1}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-3.5 w-3.5 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                lineNumber: 745,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 679,
                                        columnNumber: 17
                                    }, this),
                                    visibleFields.length === 0 && showMissingOnly ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[44px] border-b border-border bg-card flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground italic",
                                            style: {
                                                fontFamily: "Inter, sans-serif"
                                            },
                                            children: "All fields complete"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                            lineNumber: 760,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 759,
                                        columnNumber: 19
                                    }, this) : visibleFields.map((field, visibleIndex)=>{
                                        const originalFieldIndex = getOriginalFieldIndex(visibleIndex);
                                        const isEditing = getEditingState(vehicleIndex, originalFieldIndex);
                                        const isActive = getActiveState(vehicleIndex, originalFieldIndex);
                                        const cellValue = vehicle[field.id];
                                        const errorKey = `${vehicleIndex}-${field.id}`;
                                        const error = validationErrors.get(errorKey);
                                        const isMissing = missingFields.has(errorKey);
                                        const hasError = !!error;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-cell-id": `vehicle-${vehicleIndex}-field-${originalFieldIndex}`,
                                            className: `h-[44px] border-b border-border last:border-b-0 transition-colors ${isActive ? 'bg-muted' : ''} ${hasError ? 'bg-red-50/30 dark:bg-red-950/30' : ''} ${isMissing && !hasError ? 'bg-amber-50 dark:bg-amber-950/30' : ''}`,
                                            role: "gridcell",
                                            "aria-rowindex": visibleIndex + 2,
                                            "aria-colindex": vehicleIndex + 2,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$editable$2d$table$2d$cell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditableTableCell"], {
                                                value: cellValue,
                                                field: field,
                                                isEditing: isEditing,
                                                onFocus: ()=>handleCellFocus(vehicleIndex, originalFieldIndex),
                                                onEdit: ()=>handleCellEdit(vehicleIndex, originalFieldIndex),
                                                onBlur: (moveNext, undo)=>handleCellBlur(moveNext, undo),
                                                onChange: (value)=>handleCellChange(vehicleIndex, originalFieldIndex, value),
                                                onDoubleClick: ()=>handleCellEdit(vehicleIndex, originalFieldIndex),
                                                error: error,
                                                isMissing: isMissing && !hasError
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                lineNumber: 791,
                                                columnNumber: 25
                                            }, this)
                                        }, field.id, false, {
                                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                            lineNumber: 779,
                                            columnNumber: 23
                                        }, this);
                                    })
                                ]
                            }, vehicle.id, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                lineNumber: 669,
                                columnNumber: 15
                            }, this)),
                        vehicles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card shrink-0 border-border",
                            style: {
                                width: '323px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: handleAddVehicle,
                                        className: "w-full h-9 mb-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                lineNumber: 820,
                                                columnNumber: 21
                                            }, this),
                                            "Add Another Vehicle"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 815,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$vehicle$2d$suggestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VehicleSuggestions"], {
                                        discoveredVehicles: discoveredVehicles,
                                        existingVehicles: vehicles,
                                        onAddVehicle: handleAddFromDiscovery,
                                        isLoading: isLoadingDiscovery
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 825,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$keyboard$2d$shortcuts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardShortcuts"], {}, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 833,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                lineNumber: 813,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                            lineNumber: 812,
                            columnNumber: 15
                        }, this),
                        vehicles.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex items-center justify-center py-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"], {
                                        className: "h-12 w-12 text-muted-foreground mx-auto mb-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 842,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-foreground mb-2",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: "No vehicles added yet"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 843,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground mb-4",
                                        style: {
                                            fontFamily: "Inter, sans-serif"
                                        },
                                        children: "Add your first vehicle to get started"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 849,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "h-10",
                                        onClick: handleAddVehicle,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-4 w-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                                lineNumber: 860,
                                                columnNumber: 21
                                            }, this),
                                            "Add First Vehicle"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                        lineNumber: 855,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                                lineNumber: 841,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                            lineNumber: 840,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                    lineNumber: 599,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
                lineNumber: 592,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
            lineNumber: 590,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/portal/src/screens/components/vehicles-table/vehicles-table.tsx",
        lineNumber: 589,
        columnNumber: 5
    }, this);
}
_s(VehiclesTable, "zWotjWt41Dmbuwv7NDAGgPG8fzM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$app$2f$quote$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuote"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$shared$2f$hooks$2f$use$2d$auto$2d$save$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAutoSave"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$portal$2f$src$2f$screens$2f$components$2f$vehicles$2d$table$2f$use$2d$keyboard$2d$navigation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useKeyboardNavigation"]
    ];
});
_c = VehiclesTable;
var _c;
__turbopack_context__.k.register(_c, "VehiclesTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_portal_src_screens_components_vehicles-table_b9a3ddfb._.js.map