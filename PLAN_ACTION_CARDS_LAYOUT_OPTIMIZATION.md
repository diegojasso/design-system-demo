# Action Required Cards - Layout Optimization Plan

## Overview
Based on the current dark mode rendering, optimize the action required cards to improve visual hierarchy, spacing, and alignment with the design system.

---

## Current Issues Identified

### 1. **Content Area Background**
- **Issue**: Content area uses `bg-card` which may not provide enough contrast in dark mode
- **Screenshot shows**: Dark gray background, slightly lighter than overall UI
- **Current**: `bg-card` with `border-t border-border`

### 2. **Colored Vertical Line**
- **Issue**: Colored vertical line should be on the content area container, not individual items
- **Screenshot shows**: Thin colored vertical line along left edge of entire content area
- **Current**: `border-l-4` on individual item cards only

### 3. **Header Bar Appearance**
- **Issue**: Header bars may need darker/more saturated colors in dark mode
- **Screenshot shows**: Dark red/orange header bars with white text/icons
- **Current**: Lighter backgrounds (`bg-destructive/5`, `bg-amber-50`) with colored text

### 4. **Item Spacing**
- **Issue**: Items appear directly adjacent without visual separation
- **Screenshot shows**: Items flow together seamlessly within content area
- **Current**: `space-y-0` wrapper, but items have `p-5` padding

### 5. **Item Border Styling**
- **Issue**: Individual item left borders may conflict with content area border
- **Screenshot shows**: Single colored line on content area, not per-item
- **Current**: Each item has `border-l-4` with severity color

### 6. **VIN Input Field Integration**
- **Issue**: VIN input field layout could be better integrated
- **Screenshot shows**: VIN input appears inline with proper spacing
- **Current**: Separate section with `mt-2` spacing

---

## Optimization Plan

### **Phase 1: Content Area Structure** ⚠️ Priority: High
**Goal**: Improve content area background and add colored vertical line

#### Tasks:
1. **Content Area Background**
   - Update to use a slightly darker background in dark mode
   - Use `bg-muted/30` or similar for better contrast
   - Ensure light mode remains `bg-card` or `bg-background`

2. **Colored Vertical Line**
   - Add colored left border to content area container
   - Match color to header bar (red for quote, amber for underwriting, blue for bind)
   - Use `border-l-2` or `border-l-[3px]` for subtle but visible line
   - Remove individual item left borders (or make them match content area)

#### Files to Modify:
- `app/components/import/workflow-stage-group.tsx`

---

### **Phase 2: Header Bar Enhancement** ⚠️ Priority: Medium
**Goal**: Improve header bar appearance in dark mode

#### Tasks:
1. **Dark Mode Header Colors**
   - Use darker, more saturated backgrounds in dark mode
   - Consider `bg-destructive/20 dark:bg-destructive/30` or similar
   - Ensure white text/icons have proper contrast

2. **Badge Styling**
   - Ensure badges are visible and contrast well
   - May need lighter badge backgrounds in dark mode

#### Files to Modify:
- `app/components/import/workflow-stage-group.tsx` (stageConfig)

---

### **Phase 3: Item Card Optimization** ⚠️ Priority: High
**Goal**: Improve item card layout and spacing

#### Tasks:
1. **Remove Individual Left Borders**
   - Remove `border-l-4` from item cards when inside workflow stage group
   - Content area border provides the color indicator

2. **Item Spacing**
   - Ensure items flow seamlessly
   - May need to adjust padding or add subtle dividers
   - Consider `border-b border-border/50` between items (last item excluded)

3. **Item Background**
   - Ensure proper hover states
   - May need to adjust hover background colors for dark mode

#### Files to Modify:
- `app/components/import/import-summary-item-card.tsx`
- `app/components/import/workflow-stage-group.tsx`

---

### **Phase 4: VIN Input Field Layout** ⚠️ Priority: Medium
**Goal**: Better integrate VIN input into item layout

#### Tasks:
1. **Spacing Optimization**
   - Ensure proper spacing between label, vehicle name, and input
   - Match screenshot spacing exactly

2. **Input Field Styling**
   - Ensure input field matches design system
   - Proper placeholder styling
   - Proper focus states

#### Files to Modify:
- `app/components/import/import-summary-item-card.tsx`
- `app/components/import/inline-vin-editor.tsx`

---

### **Phase 5: Visual Polish** ⚠️ Priority: Low
**Goal**: Final visual refinements

#### Tasks:
1. **Shadow and Border Refinement**
   - Ensure card shadows are subtle but visible
   - Verify border colors match theme

2. **Typography Consistency**
   - Ensure font weights match screenshot
   - Verify text colors have proper contrast

3. **Icon Sizing and Colors**
   - Ensure icons are properly sized
   - Verify icon colors match severity

#### Files to Modify:
- `app/components/import/workflow-stage-group.tsx`
- `app/components/import/import-summary-item-card.tsx`

---

## Implementation Details

### Content Area Border Implementation
```tsx
// In WorkflowStageGroup content area:
<div 
  className={cn(
    "bg-card dark:bg-muted/20 border-t border-border",
    // Add colored left border matching stage
    stage === "quote" && "border-l-2 border-l-destructive",
    stage === "underwriting" && "border-l-2 border-l-amber-500",
    stage === "bind" && "border-l-2 border-l-blue-500"
  )}
>
```

### Item Card Border Removal
```tsx
// Remove border-l-4 from items when inside workflow group
// Keep hover states but remove left border
className={cn(
  "group relative flex items-start gap-4 p-5",
  // Remove: border-l-4 border-l-destructive
  // Keep: hover states and other styling
)}
```

### Content Area Background
```tsx
// Use theme-aware background
className="bg-card dark:bg-muted/30"
// Or
className="bg-background dark:bg-muted/20"
```

---

## Testing Checklist

- [ ] Content area has colored vertical line matching header
- [ ] Content area background has proper contrast in dark mode
- [ ] Items flow seamlessly without individual left borders
- [ ] Header bars are visible and readable in dark mode
- [ ] Badges have proper contrast
- [ ] VIN input field is properly integrated
- [ ] Hover states work correctly
- [ ] Light mode appearance is maintained
- [ ] All severity colors are properly displayed
- [ ] Spacing matches screenshot

---

## Questions to Clarify

1. **Content Area Background**: Should we use `bg-muted/30`, `bg-muted/20`, or a custom background?
2. **Border Width**: Should the colored vertical line be `border-l-2` (2px) or `border-l-[3px]` (3px)?
3. **Item Dividers**: Should we add subtle dividers between items, or keep them seamless?
4. **Header Bar Dark Mode**: Should headers be darker/more saturated in dark mode, or keep current approach?
5. **Badge Colors**: Should badges use the same color as header but lighter, or a different approach?

---

## Estimated Time

- Phase 1: 1-2 hours
- Phase 2: 1 hour
- Phase 3: 1-2 hours
- Phase 4: 30 minutes
- Phase 5: 30 minutes

**Total: 4-6 hours**
