# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern insurance quote management system built as a design system demo. It showcases a complete multi-step quote workflow with advanced UI components, form handling, and user experience features. The application uses Next.js 16 with App Router, React 19, Tailwind CSS 4, and Radix UI components styled in the shadcn/ui pattern.

## Key Commands

### Development
```bash
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

### Storybook
```bash
npm run storybook        # Start Storybook dev server on port 6006
npm run build-storybook  # Build static Storybook
```

### Testing
```bash
npx vitest               # Run Vitest tests (Storybook integration tests)
```

## Architecture

### Context-Based State Management

The application uses React Context for global state management with three main providers:

1. **QuoteProvider** (`app/contexts/quote-context.tsx`) - Central state management for quote data
   - Manages all quote-related data: client info, drivers, vehicles, coverage, payment, e-signature
   - Handles localStorage persistence with automatic serialization/deserialization of dates
   - Provides auto-save functionality via the `useAutoSave` hook (2s debounce)
   - Manages step progression through the quote workflow
   - Supports quote import from external systems (EZLynx)

2. **CommandPaletteProvider** (`app/components/command-palette-context.tsx`) - Keyboard shortcut handler
   - Manages command palette visibility (Cmd/Ctrl+K)
   - Provides navigation and action shortcuts

3. **ThemeProvider** (`app/components/theme-provider.tsx`) - Dark/light mode management
   - Uses next-themes for system preference detection
   - Provides theme toggle functionality accessible via command palette

### Multi-Step Quote Workflow

The application follows a linear multi-step form pattern defined in `quote-context.tsx`:

**Step Flow:**
1. `import-summary` - Review imported data (optional, only if quote was imported)
2. `client-info` - Client information form (React Hook Form + Zod validation)
3. `driver` - Drivers table management
4. `vehicle` - Vehicles table management
5. `coverage` - Coverage selection and pricing
6. `payment` - Payment method and billing
7. `e-sign` - Electronic signature workflow
8. `review` - Final review (coming soon)

Each step:
- Is rendered conditionally in `app/page.tsx` based on `currentStep`
- Has its own component in `app/components/`
- Updates state through QuoteProvider methods (e.g., `updateClientInfo`, `updateDrivers`)
- Auto-saves changes via `useAutoSave` hook

### Component Organization

```
components/ui/           # 54 shadcn/ui-style Radix UI components
                        # Built with class-variance-authority for variants
                        # Use cn() utility for className merging

app/components/         # Application-specific components
  ├── client-info-form.tsx       # Form with React Hook Form + Zod
  ├── drivers-table/             # CRUD table for drivers
  ├── vehicles-table/            # CRUD table for vehicles
  ├── coverage/                  # Coverage selection with pricing
  ├── payment/                   # Payment form with credit card
  ├── e-signature/               # E-signature document workflow
  ├── import/                    # Import summary from EZLynx
  ├── command-palette/           # Cmd+K command palette
  └── quotes-list/               # Quote management list

hooks/                  # Custom React hooks
  ├── use-auto-save.ts           # Debounced auto-save (2s default)
  ├── use-mobile.ts              # Mobile breakpoint detection
  └── use-theme.ts               # Theme management wrapper
```

### Path Aliases

TypeScript is configured with the following path alias in `tsconfig.json`:
- `@/*` maps to `./*` (project root)

Use imports like: `@/components/ui/button`, `@/hooks/use-auto-save`, `@/lib/utils`

### Styling Approach

- **Tailwind CSS 4** with CSS variables for theming
- **shadcn/ui pattern**: Components use `cn()` utility (from `lib/utils.ts`) to merge Tailwind classes
- **class-variance-authority (CVA)**: For component variants (see `components/ui/button.tsx` as example)
- **Dark mode**: Handled via CSS variables, toggle available in command palette
- **Responsive**: Mobile-first approach, use Tailwind breakpoints (sm, md, lg, xl, 2xl)

### Forms and Validation

All forms use **React Hook Form** + **Zod** for validation:
- Define Zod schemas for validation rules
- Use `@hookform/resolvers/zod` for integration
- Access form state via `useForm` hook
- All form components are controlled via QuoteProvider state

Example pattern (see `client-info-form.tsx`):
1. Define Zod schema with validation rules
2. Use `useForm` with zod resolver
3. Update QuoteProvider on successful validation
4. Auto-save triggers after state update

### Auto-Save System

The `useAutoSave` hook provides debounced auto-saving:
- 2-second default debounce (configurable)
- Skips initial mount to avoid unnecessary saves
- Deep comparison to detect actual changes
- Exposes `saveNow()` for immediate saves
- Provides `isSaving`, `lastSaved`, and `error` states

The QuoteProvider uses this hook to automatically persist changes to localStorage.

### localStorage Persistence

Quote data is stored in localStorage with the following structure:
- Key: `quote-{quoteId}`
- Version: `1` (for future migration support)
- Dates are serialized as ISO strings and deserialized back to Date objects
- All quote state is preserved: client info, drivers, vehicles, coverage, payment, e-signature

### Import Workflow

The application supports importing quotes from external systems:
- EZLynx import: `/import/ezlynx` route
- Import data is validated and transformed in `app/components/import/mock-ezlynx-data.ts`
- After import, quote starts at `import-summary` step for review
- User can selectively include/exclude imported items (drivers, vehicles, coverage)

## Development Patterns

### Adding New Components

1. Create component in `app/components/` (feature-specific) or `components/ui/` (reusable)
2. Use TypeScript for all components with proper type definitions
3. Use `"use client"` directive for components with interactivity
4. Follow the shadcn/ui pattern for styling (CVA variants + cn() utility)
5. Create corresponding `.stories.tsx` file in `stories/` for Storybook

### Adding New UI Components

This project uses the shadcn/ui component system. To add new components:
```bash
npx shadcn@latest add [component-name]
```

Components are configured via `components.json` (New York style, CSS variables, no prefix).

### Adding New Steps to Quote Flow

1. Add step ID to `StepId` type in `quote-context.tsx`
2. Add step data structure to `QuoteData` interface
3. Create update method in QuoteProvider (e.g., `updateNewStep`)
4. Add step rendering in `app/page.tsx`
5. Create step component in `app/components/`
6. Update `QuoteProgress` component to include new step

### Command Palette Actions

To add new command palette actions:
1. Update `CommandPalette` component (`app/components/command-palette.tsx`)
2. Add new command group or item with icon, label, and onSelect handler
3. For navigation: use `setCurrentStep`
4. For actions: pass handler through props from parent

## Important Notes

- **React 19**: Uses latest React features, ensure compatibility with hooks and Suspense patterns
- **Next.js App Router**: All routes in `app/` directory, use Server Components by default
- **Turbopack**: Development mode uses Turbopack for faster builds
- **Replit Deployment**: Configured with `.replit` and `replit.nix` for one-click deployment
- **Standalone Output**: `next.config.ts` uses `output: 'standalone'` for optimized production builds
- **No Backend**: All data is stored in localStorage, no API routes or database
- **Type Safety**: Strict TypeScript mode enabled, ensure all components are properly typed
- **Date Handling**: Use `date-fns` for date operations, store as Date objects in memory and ISO strings in storage

## Testing

Storybook stories serve as visual regression tests and component documentation:
- Run tests with Vitest browser mode (Playwright)
- Stories are in `stories/` directory, organized by component category
- Use `@storybook/addon-vitest` for running tests from Storybook
- Accessibility testing available via `@storybook/addon-a11y`
