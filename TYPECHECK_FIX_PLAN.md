# TypeScript Fix Plan

## Summary

Running `npx tsc --noEmit` from the root directory shows **200+ errors**, but most are due to **configuration issues**, not actual code bugs. Running from `apps/portal/` after clearing `.next` cache reveals only **13 real errors**.

---

## Issue Categories

### 1. Root-Level Configuration (Critical)

**Problem**: The root `tsconfig.json` has different path aliases than `apps/portal/tsconfig.json`, causing module resolution failures when running `tsc` from root.

**Root tsconfig paths**:
```json
"@/*": ["./*"]  // Points to root, not portal src
```

**Portal tsconfig paths**:
```json
"@/*": ["./src/*", "./app/*"],
"@/pages/*": ["./src/pages/*"],
"@novo/ui": ["../../packages/ui/src/index.ts"]
```

**Fix Options**:

A. **Run typecheck from each package** (Recommended for monorepo)
   - Add script: `"typecheck": "cd apps/portal && tsc --noEmit"`
   - Or use Turborepo/workspace scripts

B. **Update root tsconfig with references**
   ```json
   {
     "references": [
       { "path": "./apps/portal" },
       { "path": "./packages/ui" }
     ]
   }
   ```

---

### 2. Storybook Boilerplate Files (Delete)

**Files**: These are leftover Storybook template files that import non-existent components:

- `packages/ui/src/components/Header.stories.ts` → imports `./Header` (doesn't exist)
- `packages/ui/src/components/Page.stories.ts` → imports `./Page` (doesn't exist)

**Fix**: Delete both files.

---

### 3. `searchParams` Possibly Null (7 occurrences)

Next.js 15+ changed `useSearchParams()` to potentially return `null` during static rendering.

**Affected files**:
| File | Lines |
|------|-------|
| `src/app/quotes/quotes-page-content.tsx` | 14-19, 32 |
| `src/pages/components/quotes-list/quotes-list.tsx` | 92 |
| `src/pages/components/top-bar/breadcrumb-utils.ts` | 32, 35 |
| `src/pages/components/top-bar/top-bar.tsx` | 20 |

**Fix**: Add null checks or use optional chaining:

```tsx
// Before
const initialSearch = searchParams.get("search") || ""

// After (Option A - early return)
if (!searchParams) return <Loading />

// After (Option B - optional chaining)
const initialSearch = searchParams?.get("search") || ""
```

---

### 4. Type Assignment Errors (2 occurrences)

#### 4a. `import-summary-item-card.tsx:219`

**Error**: `relatedSection` is `string | undefined` but params expects `string | number`

**Current code**:
```tsx
t("import-summary.item.navigate-to", {
  section: item.relatedSection,  // Could be undefined
})
```

**Fix**: Add fallback or type assertion:
```tsx
t("import-summary.item.navigate-to", {
  section: item.relatedSection ?? "",
})
```

#### 4b. `workflow-stage-group.tsx:185`

**Error**: `onVINSave` callback type mismatch

**Current code**:
```tsx
onVINSave={onVINSave ? (vin) => onVINSave(item, vin) : undefined}
```

The `onVINSave` prop on `ImportSummaryItemCard` expects:
```ts
onVINSave?: (item: ImportSummaryItem, vin: string) => Promise<void> | void
```

But it's being passed:
```ts
(vin: string) => void  // Missing first argument
```

**Fix**: The component signature is wrong. Check `ImportSummaryItemCard` - it may expect `(vin: string)` not `(item, vin)`.

Looking at line 196 of import-summary-item-card.tsx:
```tsx
await onVINSave(item, vin)  // Uses (item, vin)
```

But the prop type at line 24 is:
```ts
onVINSave?: (item: ImportSummaryItem, vin: string) => ...
```

So in workflow-stage-group.tsx, the wrapper is correctly adapting the signature. The issue is the internal implementation expects `(item, vin)` but the passed-in prop should be `(vin)`. **This is a design inconsistency.**

**Fix**: Update the prop type to match usage:
```ts
// In ImportSummaryItemCard props:
onVINSave?: (vin: string) => Promise<void> | void
```

---

### 5. Implicit `any` Types (3 occurrences)

**File**: `src/shared/hooks/use-messages.ts:10`

```ts
// Current
template.replace(/\{(\w+)\}/g, (_, token) => {

// Fix
template.replace(/\{(\w+)\}/g, (_: string, token: string) => {
```

---

### 6. Vitest Config Type Error

**File**: `vitest.config.ts:39`

**Error**: `extends: true` type is incompatible

**Fix**: Use const assertion:
```ts
extends: true as const,
```

---

## Execution Order

1. **Delete storybook boilerplate** (immediate, no risk)
2. **Fix vitest.config.ts** (1 line change)
3. **Fix use-messages.ts implicit any** (1 line)
4. **Fix searchParams null checks** (7 locations)
5. **Fix import-summary type errors** (2 locations)
6. **Configure root tsconfig or package scripts** (architectural decision)

---

## Verification Commands

```bash
# From portal directory (recommended for now)
cd apps/portal && npx tsc --noEmit

# From UI package
cd packages/ui && npx tsc --noEmit

# Full monorepo (after fixing root config)
npx tsc --noEmit
```
