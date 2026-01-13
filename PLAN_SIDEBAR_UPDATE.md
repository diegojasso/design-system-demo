# Plan: Sidebar Update with Collapse/Expand on Hover

## Current State

- **Component**: `app/components/app-sidebar.tsx`
- **Current Width**: Fixed at `240px` (`w-[240px]`)
- **Current State**: Commented out in main page (`app/page.tsx`), not visible in quotes page
- **Menu Items**: 
  - Quotes (FileText icon) - currently active
  - Policies (Shield icon)
  - Book of Business (BookOpen icon)
  - Tasks (Bell icon) - has badge count
  - Chat History (MessageSquare icon)
  - Help Center (HelpCircle icon)

## Design Requirements (from images)

Based on the design images provided:
- **Menu Items Visible**:
  - Overview (house icon)
  - Quotes (person icon) - currently selected
  - Policies (shield icon)
  - Book of Business (document icon)
  - Tasks (checkmark icon)

- **User Profile Section**: Shows avatar, name, role (CSR), and chevron button

## Clarifying Questions

### 1. Collapse/Expand Behavior
- **Default State**: Should the sidebar start collapsed or expanded by default?
- **Collapsed Width**: What should be the collapsed width? (typically 48-64px for icon-only)
- **Expanded Width**: Keep at 240px or change?
- **Hover Trigger**: 
  - Should it expand on hover anywhere on the sidebar?
  - Or only when hovering over specific areas (e.g., icons)?
- **Transition Duration**: What animation duration? (e.g., 200ms, 300ms)

### 2. Menu Items
- **Icons**: The design shows different icons than current implementation:
  - Overview (house) vs current doesn't have Overview
  - Quotes (person icon) vs current (FileText)
  - Tasks (checkmark) vs current (Bell)
- **Question**: Should we update to match the design icons, or keep current icons?
- **Missing Items**: Design doesn't show "Chat History" or "Help Center" - should these be removed or hidden?

### 3. Logo Section
- **Collapsed State**: Should the logo be hidden, show just "novo" text, or show a logo icon?
- **Expanded State**: Show "novo" + "Canary" as currently implemented?

### 4. User Profile Section
- **Collapsed State**: 
  - Show only avatar?
  - Show avatar with tooltip on hover?
  - Hide completely?
- **Expanded State**: Keep current layout (avatar + name + role + chevron)?

### 5. Menu Item Labels
- **Collapsed State**: Hide labels completely, or show tooltips on hover?
- **Expanded State**: Show labels as currently implemented?

### 6. Badge/Notifications
- **Collapsed State**: How should badges be displayed? (e.g., tooltip, overlay on icon)
- **Expanded State**: Keep current badge display?

### 7. Active State
- **Collapsed State**: How should active state be indicated? (e.g., icon color, background, border)
- **Expanded State**: Keep current active state styling?

### 8. Integration
- Should we use the existing `Sidebar` component from `components/ui/sidebar.tsx` (which has collapse functionality) or build custom hover behavior?
- Should the sidebar be visible on all pages or only specific pages?

## Proposed Implementation Approach

### Option A: Custom Hover-Based Collapse
- Add hover state management to `AppSidebar`
- Use CSS transitions for smooth expand/collapse
- Show tooltips for menu items when collapsed
- Custom implementation for hover behavior

### Option B: Use Existing Sidebar Component
- Integrate with `components/ui/sidebar.tsx` 
- Modify to support hover-based collapse instead of click-based
- Leverage existing collapse/expand infrastructure

### Option C: Hybrid Approach
- Use existing sidebar component structure
- Add custom hover behavior on top
- Best of both worlds

## Implementation Status

✅ **Completed:**
1. ✅ Updated menu items to match design:
   - Overview (House icon)
   - Quotes (Contact icon)
   - Policies (Shield icon)
   - Book of Business (BookUser icon)
   - Tasks (ClipboardCheck icon)
2. ✅ Removed Chat History and Help Center
3. ✅ Removed logo section (already in top nav)
4. ✅ Removed user profile section (already in top nav)
5. ✅ Implemented hover-based collapse/expand:
   - Default state: Collapsed (48px)
   - Expanded state: 240px on hover
   - Smooth transitions (200ms)
6. ✅ Added tooltips for collapsed state
7. ✅ Centered icons when collapsed
8. ✅ Added sidebar to all pages (main page and quotes page)

## Next Steps

1. **Test** the implementation:
   - Verify hover behavior works smoothly
   - Check tooltips appear correctly when collapsed
   - Ensure transitions are smooth
   - Test on different screen sizes
2. **Consider mobile behavior** (if needed):
   - Should sidebar be hidden on mobile?
   - Or use a different interaction pattern?

## Technical Considerations

- **CSS Transitions**: Use Tailwind's transition utilities for smooth animations
- **State Management**: May need React state for hover tracking
- **Tooltips**: Use existing Tooltip component from `components/ui/tooltip.tsx`
- **Accessibility**: Ensure keyboard navigation and screen reader support
- **Performance**: Consider CSS-only solutions vs JavaScript state management
