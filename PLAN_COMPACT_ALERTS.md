# Compact Alerts Optimization Plan

## Goal
Reduce visual footprint of State Requirements and Coverage Warnings components while maintaining functionality and readability.

## Current Issues
- **State Requirements**: 114px height - shows full details even when compliant
- **Coverage Warnings**: 128px height - expanded by default, takes significant space
- Both use full Alert components with generous padding
- Information density is low

## Optimization Strategy

### 1. **Compact State Requirements** ✅
**Target: <60px when compliant, <80px with issues**

**Design:**
- Collapsed by default when compliant (just badge + state name)
- Inline format: `✓ AZ Requirements Met • BI: $100K/$300K ✓ • PD: $100K ✓`
- Expandable to show full details
- Compact badge-style when compliant
- Full alert only when issues exist

**Implementation:**
- Use compact badge/button style for compliant state
- Inline display of requirements vs current coverage
- Collapsible details section
- Minimal padding when compliant

### 2. **Compact Coverage Warnings** ✅
**Target: <50px collapsed, expandable**

**Design:**
- Collapsed by default (just count + severity badges)
- Format: `⚠️ 1 Warning • 2 Suggestions [Expand]`
- Inline action buttons when collapsed
- Expand to show full details
- Dismissible inline

**Implementation:**
- Badge-style header when collapsed
- Inline quick actions
- Expandable details section
- Group by severity with counts

### 3. **Combined Compact Bar** (Optional)
**Target: Single <60px bar**

**Design:**
- Single horizontal bar combining both
- Format: `✓ AZ Requirements Met | ⚠️ 1 Warning [View]`
- Click to expand either section
- Space-efficient horizontal layout

## Visual Design

### Compliant State (Compact)
```
┌─────────────────────────────────────────────────────┐
│ ✓ AZ Requirements Met • BI: $100K/$300K ✓ • PD: $100K ✓ [Details ▼] │
└─────────────────────────────────────────────────────┘
```

### Non-Compliant State (Compact)
```
┌─────────────────────────────────────────────────────┐
│ ⚠️ AZ Requirements • 1 Issue [Fix] [Details ▼]    │
└─────────────────────────────────────────────────────┘
```

### Warnings (Compact)
```
┌─────────────────────────────────────────────────────┐
│ ⚠️ 1 Warning • 2 Suggestions [Fix All] [Details ▼] │
└─────────────────────────────────────────────────────┘
```

## Implementation Details

### State Requirements Component
- **Compliant**: Badge-style compact bar (py-2 px-3)
- **Non-Compliant**: Compact alert with inline fix button
- **Expandable**: Show full requirements list
- **Inline comparison**: Show current vs required side-by-side

### Coverage Warnings Component
- **Collapsed**: Badge-style header with counts
- **Quick Actions**: Inline "Fix All" button
- **Expandable**: Show individual warnings
- **Grouped**: By severity with badges

## Benefits
- **Space Savings**: 50-60% reduction in vertical space
- **Better Scanning**: Key info visible at a glance
- **Progressive Disclosure**: Details available when needed
- **Cleaner UI**: Less visual clutter
- **Faster Workflow**: Quick actions visible upfront
