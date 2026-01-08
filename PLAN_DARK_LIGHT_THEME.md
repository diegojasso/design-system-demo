# Plan: Dark/Light Theme Implementation

## Current State Analysis

### ✅ What's Already in Place
1. **CSS Variables**: Dark mode color variables are already defined in `app/globals.css` (lines 81-113)
2. **Tailwind Configuration**: Custom dark variant is configured: `@custom-variant dark (&:is(.dark *));`
3. **Dependencies**: `next-themes` package is already installed (v0.4.6)
4. **Component Support**: Some UI components already have dark mode classes (e.g., `switch.tsx`)

### ❌ What's Missing
1. **Theme Provider**: No `ThemeProvider` from `next-themes` in the app layout
2. **Theme Toggle UI**: No component to switch between light/dark themes
3. **Hardcoded Colors**: Many components use hardcoded hex colors instead of theme-aware CSS variables
4. **System Preference**: No detection of user's system theme preference
5. **Persistence**: No localStorage persistence of theme preference

## Implementation Plan

### Phase 1: Core Theme Infrastructure

#### 1.1 Create Theme Provider Component
- **File**: `app/components/theme-provider.tsx` (new)
- **Purpose**: Wrap the app with `next-themes` ThemeProvider
- **Features**:
  - Support for "light", "dark", and "system" modes
  - Suppress hydration warnings (Next.js requirement)
  - Enable attribute-based theme switching (adds `class="dark"` to `<html>`)

#### 1.2 Update Root Layout
- **File**: `app/layout.tsx`
- **Changes**:
  - Wrap children with `ThemeProvider`
  - Ensure `<html>` tag can receive the `dark` class
  - Add `suppressHydrationWarning` to `<html>` tag

### Phase 2: Theme Toggle Component

#### 2.1 Create Theme Toggle Component
- **File**: `components/ui/theme-toggle.tsx` (new)
- **Purpose**: UI component to switch between light/dark/system themes
- **Design Options**:
  - **Option A**: Dropdown menu with Light/Dark/System options
  - **Option B**: Toggle button that cycles Light → Dark → System
  - **Option C**: Separate buttons for Light/Dark with system detection indicator
- **Recommended**: Option A (dropdown) for clarity and user control
- **Icons**: Use `lucide-react` icons (Sun, Moon, Monitor)

#### 2.2 Create Theme Toggle Hook (Optional)
- **File**: `hooks/use-theme.ts` (new)
- **Purpose**: Custom hook for theme management
- **Features**:
  - `useTheme()` hook wrapper
  - Theme state getter
  - Theme setter functions
  - System preference detection

### Phase 3: Replace Hardcoded Colors

#### 3.1 Update Main Page Component
- **File**: `app/page.tsx`
- **Changes**:
  - Replace `bg-white` with `bg-background`
  - Replace hardcoded text colors (`text-[#32383e]`, `text-[#9fa6ad]`, etc.) with theme-aware classes
  - Use semantic color tokens: `text-foreground`, `text-muted-foreground`, etc.

#### 3.2 Update App Sidebar Component
- **File**: `app/components/app-sidebar.tsx`
- **Changes**:
  - Replace `bg-[#f0f4f8]` with `bg-sidebar`
  - Replace hardcoded colors with theme variables
  - Update border colors: `border-[rgba(99,107,116,0.3)]` → `border-sidebar-border`
  - Update hover states to use theme-aware colors

#### 3.3 Audit Other Components
- **Files to Check**:
  - `app/components/quote-header.tsx`
  - `app/components/quote-progress.tsx`
  - `app/components/quote-navigation.tsx`
  - `app/components/client-info-form.tsx`
  - `app/components/drivers-table/drivers-table.tsx`
  - `app/components/vehicles-table/vehicles-table.tsx`
- **Action**: Replace hardcoded colors with semantic tokens

### Phase 4: Add Theme Toggle to UI

#### 4.1 Add Toggle to Header/Navigation
- **Location**: `app/components/quote-header.tsx` or create a new header component
- **Placement**: Top-right corner or in navigation area
- **Implementation**: Add `ThemeToggle` component

#### 4.2 Alternative: Add to Sidebar
- **Location**: `app/components/app-sidebar.tsx`
- **Placement**: Bottom of sidebar, near user profile section
- **Implementation**: Add `ThemeToggle` component

### Phase 5: Testing & Refinement

#### 5.1 Visual Testing
- Test all pages/components in both light and dark modes
- Verify contrast ratios meet accessibility standards
- Check for any color inconsistencies

#### 5.2 Functional Testing
- Test theme persistence across page reloads
- Test system preference detection
- Test theme switching transitions (should be smooth)

#### 5.3 Component Audit
- Verify all shadcn/ui components work correctly in dark mode
- Check for any components that need dark mode adjustments

## Technical Details

### Theme Provider Configuration
```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
>
  {children}
</ThemeProvider>
```

### CSS Variable Usage
- Use semantic tokens: `bg-background`, `text-foreground`, `border-border`, etc.
- Avoid hardcoded colors in components
- Use Tailwind's dark mode classes when needed: `dark:bg-card`

### Theme Toggle Component Structure
```typescript
- DropdownMenu trigger (button with current theme icon)
- DropdownMenu content with:
  - Light option (Sun icon)
  - Dark option (Moon icon)
  - System option (Monitor icon)
```

## Files to Create

1. `app/components/theme-provider.tsx` - Theme provider wrapper
2. `components/ui/theme-toggle.tsx` - Theme toggle UI component
3. `hooks/use-theme.ts` - Optional theme hook (if needed)

## Files to Modify

1. `app/layout.tsx` - Add ThemeProvider
2. `app/page.tsx` - Replace hardcoded colors
3. `app/components/app-sidebar.tsx` - Replace hardcoded colors
4. `app/components/quote-header.tsx` - Add theme toggle (or create header)
5. Other component files with hardcoded colors

## Dependencies

- ✅ `next-themes` - Already installed
- ✅ `lucide-react` - Already installed (for icons)
- ✅ `@radix-ui/react-dropdown-menu` - Already installed (for toggle UI)

## Implementation Order

1. **Phase 1**: Set up theme provider infrastructure
2. **Phase 2**: Create theme toggle component
3. **Phase 3**: Replace hardcoded colors (can be done incrementally)
4. **Phase 4**: Add toggle to UI
5. **Phase 5**: Test and refine

## Notes

- The CSS variables are already well-defined for both themes
- The dark variant uses `class="dark"` approach (not `data-theme` attribute)
- System preference detection should be enabled for better UX
- Consider adding smooth transitions when switching themes
- Ensure accessibility: theme toggle should be keyboard navigable
