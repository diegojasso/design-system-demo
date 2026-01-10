# Import Summary: Reduce Cognitive Load & Improve Visibility

## Overview
Plan to reduce cognitive load for agents processing import summaries, minimize vertical scrolling, and add key import information (premium estimate, third-party reports).

---

## Goals

1. **Reduce Cognitive Load** - Make it easier to scan and process information
2. **Reduce Vertical Scroll** - Make warnings visible without scrolling
3. **Show Premium Estimate** - Display imported premium estimate prominently
4. **Third-Party Reports Status** - Show which reports were requested and their status

---

## Current Pain Points

### 1. Cognitive Load Issues
- Too much information at once
- Stats dashboard takes up significant vertical space
- Timeline sidebar adds complexity
- No clear visual hierarchy for what matters most
- Warnings buried below the fold

### 2. Scrolling Issues
- Stats dashboard is tall
- Need to scroll to see warnings/errors
- Timeline takes up space but isn't critical for processing
- Filters and search add to vertical space

### 3. Missing Information
- Premium estimate not shown
- Third-party reports status not clearly visible
- Report types not detailed (which reports were requested)

---

## Proposed Solutions

### 1. Compact Header Bar (Horizontal Layout)
**Priority: High**

Replace the large stats dashboard with a compact horizontal bar showing:
- Premium Estimate (from import)
- Quote Number (with copy button)
- Primary Address
- Third-Party Reports Status (with expandable details)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Premium Estimate │ Quote Number │ Primary Address │ 3rd Party   │
│ $142/mo          │ KBD78E7747 📋 │ 5211 S McQueen  │ Reports ✓   │
└─────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- Reduces vertical space by ~70%
- Key info visible at a glance
- Matches screenshot design pattern
- Less cognitive load

---

### 2. Sticky Warnings Bar
**Priority: High**

Create a sticky, collapsible warnings bar that:
- Shows unresolved errors/warnings count
- Stays visible while scrolling
- Can be expanded to show quick actions
- Auto-collapses when all resolved

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ ⚠️ 2 Warnings | ❌ 1 Error | [View All] [Resolve All]        │
└─────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- Warnings always visible
- No scrolling needed to see issues
- Quick actions accessible
- Reduces cognitive load

---

### 3. Compact Progress Indicator
**Priority: Medium**

Replace large progress section with compact inline indicator:
- Small progress bar in header
- Completion percentage badge
- Click to expand full stats

**Layout:**
```
[Progress: ████████░░ 75%] [2 Drivers] [1 Vehicle]
```

**Benefits:**
- Saves vertical space
- Still shows progress
- Expandable for details

---

### 4. Enhanced Third-Party Reports Display
**Priority: High**

Show detailed third-party reports information:
- Status badge (Completed/Pending/Failed)
- List of requested reports:
  - Financial Score
  - Verify Coverage
  - Verify Claims
  - MVR (Motor Vehicle Record)
  - Car Report (Carfax, when VIN available)
- Individual report statuses
- Expandable details

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 3rd Party Reports: ✓ Completed                                  │
│ ─────────────────────────────────────────────────────────────── │
│ • Financial Score        ✓ Completed                            │
│ • Verify Coverage        ✓ Completed                            │
│ • Verify Claims          ✓ Completed                            │
│ • MVR                    ✓ Completed                            │
│ • Car Report (Carfax)    ⏳ Pending (VIN required)              │
└─────────────────────────────────────────────────────────────────┘
```

**Benefits:**
- Clear visibility of report status
- Shows which reports were requested
- Identifies pending reports and why
- Reduces confusion

---

### 5. Collapsible Sections
**Priority: Medium**

Make sections collapsible:
- Imported Info (drivers/vehicles) - collapsed by default
- Timeline - collapsed by default
- Filters - can be toggled
- Only show what's needed

**Benefits:**
- Reduces initial visual load
- Focus on what matters (warnings)
- Expandable for details

---

### 6. Visual Hierarchy Improvements
**Priority: Medium**

Improve visual hierarchy:
- Warnings/Errors at top (most important)
- Import info below (context)
- Timeline/details at bottom (reference)
- Use color and size to indicate importance

**Benefits:**
- Easier to scan
- Focus on action items
- Less cognitive load

---

## Implementation Plan

### Phase 1: Compact Header & Reports (Week 1)
**Goal:** Reduce vertical space and show key info

1. ✅ Create `ImportSummaryHeader` component
   - Horizontal layout with 4 key metrics
   - Premium estimate display
   - Quote number with copy
   - Address display
   - Third-party reports status

2. ✅ Create `ThirdPartyReportsDetail` component
   - Expandable reports list
   - Individual report statuses
   - Report type labels (Financial Score, MVR, etc.)
   - Pending reasons

3. ✅ Update `ImportSummaryStats` to compact version
   - Horizontal progress bar
   - Inline metrics
   - Collapsible details

**Impact:** Reduces vertical space by ~60%, shows premium estimate

---

### Phase 2: Sticky Warnings Bar (Week 1)
**Goal:** Keep warnings visible without scrolling

4. ✅ Create `StickyWarningsBar` component
   - Sticky positioning
   - Error/warning counts
   - Quick actions
   - Auto-collapse when resolved

5. ✅ Integrate with main component
   - Position above item groups
   - Scroll behavior
   - Smooth transitions

**Impact:** Warnings always visible, no scrolling needed

---

### Phase 3: Collapsible Sections (Week 2)
**Goal:** Reduce initial visual load

6. ✅ Make imported info collapsible
   - Collapsed by default
   - Expand on click
   - Show summary when collapsed

7. ✅ Make timeline collapsible
   - Collapsed by default
   - Expand on click
   - Show summary when collapsed

8. ✅ Make filters collapsible
   - Toggle button
   - Hidden by default on mobile
   - Always visible on desktop

**Impact:** Focus on warnings, less visual clutter

---

### Phase 4: Visual Hierarchy (Week 2)
**Goal:** Improve scanning and processing

9. ✅ Reorder sections
   - Warnings/Errors first
   - Import info second
   - Timeline/details last

10. ✅ Enhance visual indicators
    - Larger warning icons
    - Color-coded sections
    - Clear action buttons

**Impact:** Easier to process, faster decision-making

---

## Component Architecture

### New Components

```
components/import/
  ├── import-summary-header.tsx          # Compact horizontal header
  ├── third-party-reports-detail.tsx     # Expandable reports list
  ├── sticky-warnings-bar.tsx            # Sticky warnings bar
  └── compact-progress-indicator.tsx     # Inline progress
```

### Updated Components

- `import-summary.tsx` - Main orchestrator
- `import-summary-stats.tsx` - Compact version
- `import-timeline.tsx` - Collapsible version

---

## Design Specifications

### Header Bar Layout

**Desktop (4 columns):**
```
┌──────────────┬──────────────┬──────────────────────┬──────────────┐
│ Premium      │ Quote Number │ Primary Address      │ 3rd Party    │
│ Estimate     │              │                      │ Reports      │
│ $142/mo      │ KBD78E7747 📋│ 5211 S McQueen Rd... │ ✓ Completed  │
└──────────────┴──────────────┴──────────────────────┴──────────────┘
```

**Mobile (Stacked):**
```
┌─────────────────────────────────────┐
│ Premium Estimate: $142/mo            │
│ Quote Number: KBD78E7747 📋          │
│ Primary Address: 5211 S McQueen...  │
│ 3rd Party Reports: ✓ Completed      │
└─────────────────────────────────────┘
```

### Sticky Warnings Bar

**Collapsed:**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ 2 Warnings | ❌ 1 Error | [View All] [Resolve All]    │
└─────────────────────────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ 2 Warnings | ❌ 1 Error                                 │
│ ─────────────────────────────────────────────────────────── │
│ • Verify Coverage Gap                                       │
│ • Verify Accident History                                   │
│ • VIN of 2023 Accord Missing                               │
│ [Resolve All] [Dismiss All]                                │
└─────────────────────────────────────────────────────────────┘
```

### Third-Party Reports Detail

**Collapsed:**
```
3rd Party Reports: ✓ Completed [▼]
```

**Expanded:**
```
3rd Party Reports: ✓ Completed [▲]
─────────────────────────────────────
• Financial Score        ✓ Completed
• Verify Coverage        ✓ Completed
• Verify Claims          ✓ Completed
• MVR                    ✓ Completed
• Car Report (Carfax)    ⏳ Pending (VIN required)
```

---

## Data Structure Updates

### Enhanced ImportSummaryData

```typescript
export interface ImportSummaryData {
  // ... existing fields
  
  // New fields
  premiumEstimate?: {
    monthly: number
    currency?: string
  }
  
  thirdPartyReports: {
    status: "completed" | "pending" | "failed"
    reports: Array<{
      type: "financial-score" | "verify-coverage" | "verify-claims" | "mvr" | "car-report"
      status: "completed" | "pending" | "failed"
      provider?: string // e.g., "Carfax", "Verisk"
      findings?: any
      pendingReason?: string // e.g., "VIN required"
    }>
  }
}
```

### Report Type Labels

```typescript
const REPORT_TYPE_LABELS = {
  "financial-score": "Financial Score",
  "verify-coverage": "Verify Coverage",
  "verify-claims": "Verify Claims",
  "mvr": "MVR",
  "car-report": "Car Report (Carfax)",
}
```

---

## Success Metrics

### Quantitative
- Vertical scroll reduction: Target 60%+
- Time to see warnings: Target < 1 second (no scroll)
- Cognitive load score: Target 30% reduction
- Premium estimate visibility: 100% (always visible)

### Qualitative
- Agent feedback on ease of processing
- Reduced confusion about report status
- Faster decision-making
- Better understanding of import status

---

## Accessibility Considerations

- ✅ Sticky bar doesn't block content
- ✅ Keyboard navigation for collapsible sections
- ✅ Screen reader announcements for status changes
- ✅ Focus management for expanded sections
- ✅ Color contrast for status indicators

---

## Technical Considerations

### Performance
- Lazy load timeline/details
- Memoize report calculations
- Virtual scrolling if needed (unlikely)

### Responsive Design
- Stack layout on mobile
- Horizontal layout on desktop
- Touch-friendly sticky bar

### State Management
- Collapse/expand state
- Sticky bar visibility
- Report detail expansion

---

## Migration Strategy

1. **Add new components** alongside existing
2. **Feature flag** to toggle between old/new
3. **Gradual rollout** to test with users
4. **Remove old components** after validation

---

## Questions to Resolve

1. Where does premium estimate come from? (Import data or calculated?)
2. Should premium estimate be editable?
3. What happens when reports are pending? (Auto-retry? Manual trigger?)
4. Should we show report timestamps?
5. Should we show report providers (Carfax, Verisk, etc.)?

---

## Next Steps

1. **Review & Approval** - Get stakeholder sign-off
2. **Design Mockups** - Create detailed designs
3. **Data Structure** - Update types and mock data
4. **Implementation** - Start with Phase 1
5. **Testing** - User testing after each phase
6. **Iteration** - Refine based on feedback

---

*Last Updated: 2025-01-27*
*Status: Planning Phase*
