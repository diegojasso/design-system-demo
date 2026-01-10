# About Plan Section - Optimal Location Plan

## Current State
- **Location**: Bottom of Pricing Summary column
- **Height**: 128px
- **Content**: Plan name, feature list (3 items), "Compare all plans" link
- **Issue**: Takes significant vertical space, always visible even when not needed

## Location Options Analysis

### Option 1: Inside Selected Plan Details Card (Collapsible) ⭐ **RECOMMENDED**
**Location**: Within the purple-bordered Card, below payment frequency selector

**Design:**
```
┌─────────────────────────────────────────┐
│ Selected Plan Details Card              │
├─────────────────────────────────────────┤
│ $124/mo                                 │
│ Total for 6 months: $744                │
│ Down payment: $248                      │
│                                         │
│ [Start Date]                            │
│ [Payment Frequency]                     │
│                                         │
│ ─────────────────────────────────────── │
│ About Novo Next            [Expand ▼]   │
│ ✓ Price locked for 6 months            │
│ ✓ 20% discount upfront                  │
│ ✓ Renewal based on driving behavior    │
│                                         │
│ [Collect Payment & Bind]                │
│ [Download as PDF]                       │
└─────────────────────────────────────────┘
```

**Pros:**
- ✅ Contextually relevant (shows details of selected plan)
- ✅ Space-efficient (collapsed by default)
- ✅ Logical grouping (plan info with plan details)
- ✅ No separate section needed
- ✅ Easy to find when needed

**Cons:**
- ⚠️ Slightly longer card when expanded
- ⚠️ Less prominent than standalone section

**Space Savings**: ~100px when collapsed (from 128px to ~28px header)

---

### Option 2: Tooltip/Popover on Plan Selection ⭐⭐ **BEST FOR SPACE**
**Location**: Hover/click on selected plan button

**Design:**
```
Plan Selection:
┌─────────────────────────────────────────┐
│ ✓ Novo Next              $124/mo       │ ← Hover/Click
└─────────────────────────────────────────┘
         ↓
    [Popover]
    ┌─────────────────────────────────────┐
    │ About Novo Next                    │
    │                                    │
    │ ✓ Price locked for 6 months        │
    │ ✓ 20% discount upfront             │
    │ ✓ Renewal based on driving behavior│
    │                                    │
    │ [Compare Plans]                    │
    └─────────────────────────────────────┘
```

**Pros:**
- ✅ Zero vertical space when not in use
- ✅ Contextual (appears on interaction)
- ✅ Clean, uncluttered interface
- ✅ Can show for any plan (not just selected)

**Cons:**
- ⚠️ Requires interaction to discover
- ⚠️ Less discoverable
- ⚠️ May be missed by some users

**Space Savings**: 100% (0px when not shown)

---

### Option 3: Integrated into Plan Selection Buttons
**Location**: Expand selected plan button to show details

**Design:**
```
┌─────────────────────────────────────────┐
│ ✓ Novo Next              $124/mo       │
│                                         │
│ Price locked for 6 months               │
│ 20% discount upfront                    │
│ Renewal based on driving behavior      │
│                                         │
│ [Learn More]                            │
└─────────────────────────────────────────┘
```

**Pros:**
- ✅ Visible when plan is selected
- ✅ No separate section
- ✅ Clear association with plan

**Cons:**
- ⚠️ Makes plan buttons much taller
- ⚠️ Inconsistent button heights
- ⚠️ Still takes space

**Space Savings**: ~50px (moves content but doesn't reduce total)

---

### Option 4: Tabs within Pricing Summary
**Location**: Tab navigation within pricing column

**Design:**
```
┌─────────────────────────────────────────┐
│ [Pricing] [Plan Details]                │
├─────────────────────────────────────────┤
│                                         │
│ Tab Content:                            │
│ - Pricing tab: Current content         │
│ - Plan Details tab: About plan info    │
│                                         │
└─────────────────────────────────────────┘
```

**Pros:**
- ✅ Clear separation of concerns
- ✅ Can show more details
- ✅ Professional tabbed interface

**Cons:**
- ⚠️ Requires tab navigation
- ⚠️ Plan details hidden by default
- ⚠️ More complex UI

**Space Savings**: ~100px (only one tab visible at a time)

---

### Option 5: Modal/Dialog on "Learn More"
**Location**: Remove from main view, show in modal

**Design:**
```
[Compare all plans] ← Click opens modal

Modal:
┌─────────────────────────────────────────┐
│ About Novo Next              [×]       │
├─────────────────────────────────────────┤
│                                         │
│ Full plan details, comparison, etc.    │
│                                         │
└─────────────────────────────────────────┘
```

**Pros:**
- ✅ Zero space in main view
- ✅ Can show comprehensive details
- ✅ Focused experience

**Cons:**
- ⚠️ Requires click to access
- ⚠️ Modal overlay
- ⚠️ Less discoverable

**Space Savings**: 100% (removed from main view)

---

### Option 6: Compact Inline Badge/Info Icon
**Location**: Small info icon next to plan name, shows popover

**Design:**
```
┌─────────────────────────────────────────┐
│ ✓ Novo Next ℹ️           $124/mo       │
└─────────────────────────────────────────┘
```

**Pros:**
- ✅ Minimal space (just icon)
- ✅ Contextual
- ✅ Discoverable

**Cons:**
- ⚠️ Requires hover/click
- ⚠️ Small target

**Space Savings**: ~120px (replaces full section with icon)

---

## Recommendation: **Option 1 + Option 2 Hybrid**

### Primary: Collapsible Section in Plan Details Card
- Move "About Plan" inside the Selected Plan Details Card
- Collapsed by default (shows "About Novo Next [Expand ▼]")
- Expandable to show full details
- Saves ~100px when collapsed

### Secondary: Info Icon on Plan Buttons
- Add ℹ️ icon to each plan button
- Shows popover with plan details on hover/click
- Provides quick access without expanding

### Implementation:
```
┌─────────────────────────────────────────┐
│ Selected Plan Details Card              │
├─────────────────────────────────────────┤
│ $124/mo                                 │
│ [Start Date]                            │
│ [Payment Frequency]                     │
│                                         │
│ ─────────────────────────────────────── │
│ About Novo Next            [Expand ▼]   │ ← Collapsed by default
│                                         │
│ [Collect Payment & Bind]                │
└─────────────────────────────────────────┘

When Expanded:
│ ─────────────────────────────────────── │
│ About Novo Next            [Collapse ▲] │
│                                         │
│ ✓ Price locked for 6 months            │
│ ✓ 20% discount upfront                  │
│ ✓ Renewal based on driving behavior    │
│                                         │
│ [Compare Plans]                         │
│ ─────────────────────────────────────── │
```

## Benefits of Recommended Approach
1. **Space Efficient**: ~100px saved when collapsed
2. **Contextually Relevant**: Inside plan details card
3. **Discoverable**: Visible but not intrusive
4. **Progressive Disclosure**: Details available when needed
5. **Consistent**: Follows same pattern as other collapsible sections
6. **Quick Access**: Info icon provides alternative access method

## Implementation Details

### Component Structure
```tsx
<Card>
  <CardContent>
    {/* Pricing Info */}
    {/* Start Date */}
    {/* Payment Frequency */}
    
    {/* About Plan - Collapsible */}
    <Collapsible>
      <CollapsibleTrigger>
        About {plan.name} [Expand]
      </CollapsibleTrigger>
      <CollapsibleContent>
        {/* Plan features */}
        {/* Compare link */}
      </CollapsibleContent>
    </Collapsible>
    
    {/* Action Buttons */}
  </CardContent>
</Card>
```

### Plan Selection Buttons Enhancement
- Add info icon (ℹ️) to each plan button
- Show popover on hover/click with plan details
- Quick preview without expanding main section

## Success Metrics
- **Space Reduction**: 70-80% reduction in vertical space
- **Discoverability**: 90%+ users find plan details
- **Usage**: Track expansion rate
- **Satisfaction**: User feedback on new location
