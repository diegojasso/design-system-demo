# Customization Manifest - Implementation Plan

## Overview
Create a centralized customization manifest system that allows users and administrators to configure application behavior, appearance, and feature preferences. This manifest will serve as a single source of truth for all customizable aspects of the application.

## Goals
1. **Centralized Configuration**: Single manifest file/API for all customization options
2. **User Preferences**: Allow users to customize their experience
3. **Admin Configuration**: Allow administrators to set organization-wide defaults
4. **Feature Flags**: Enable/disable features per user or organization
5. **Theme Customization**: Customize colors, fonts, spacing, and other design tokens
6. **Behavior Customization**: Configure auto-save intervals, validation rules, keyboard shortcuts
7. **Persistence**: Store preferences in localStorage (user) and backend (admin)
8. **Type Safety**: Full TypeScript support for manifest structure

## Manifest Structure

### Core Manifest Interface
```typescript
interface CustomizationManifest {
  version: string // Manifest schema version
  metadata: {
    createdAt: string
    updatedAt: string
    author?: string
    organizationId?: string
  }
  
  // Feature flags
  features: FeatureFlags
  
  // Theme customization
  theme: ThemeConfig
  
  // UI customization
  ui: UIConfig
  
  // Behavior customization
  behavior: BehaviorConfig
  
  // Keyboard shortcuts
  shortcuts: ShortcutsConfig
  
  // Validation rules
  validation: ValidationConfig
  
  // Auto-save configuration
  autoSave: AutoSaveConfig
  
  // Table configurations
  tables: TablesConfig
  
  // Form configurations
  forms: FormsConfig
}
```

### Feature Flags
```typescript
interface FeatureFlags {
  // Core features
  autoSave: boolean
  commandPalette: boolean
  darkMode: boolean
  breadcrumbNavigation: boolean
  
  // Table features
  driversTable: boolean
  vehiclesTable: boolean
  missingDataHighlighting: boolean
  showMissingFieldsToggle: boolean
  
  // Form features
  clientInfoForm: boolean
  paymentForm: boolean
  coverageForm: boolean
  
  // Integration features
  mvrIntegration: boolean
  vehicleDiscovery: boolean
  ezlynxImport: boolean
  
  // Advanced features
  undoRedo: boolean
  keyboardShortcuts: boolean
  contextualPlaceholders: boolean
}
```

### Theme Configuration
```typescript
interface ThemeConfig {
  // Color customization
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    border: string
    // ... other semantic colors
  }
  
  // Typography
  typography: {
    fontFamily: {
      sans: string[]
      mono: string[]
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      // ... other sizes
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  
  // Spacing
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    // ... other spacing values
  }
  
  // Border radius
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
  
  // Shadows
  shadows: {
    sm: string
    md: string
    lg: string
  }
}
```

### UI Configuration
```typescript
interface UIConfig {
  // Layout
  layout: {
    sidebarWidth: string
    headerHeight: string
    contentPadding: string
  }
  
  // Components
  components: {
    button: {
      defaultVariant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
      defaultSize: 'default' | 'sm' | 'lg' | 'icon'
    }
    input: {
      defaultSize: 'default' | 'sm' | 'lg'
      showClearButton: boolean
    }
    table: {
      defaultPageSize: number
      showRowNumbers: boolean
      stickyHeader: boolean
    }
  }
  
  // Display preferences
  display: {
    density: 'compact' | 'comfortable' | 'spacious'
    showIcons: boolean
    showTooltips: boolean
    animationSpeed: 'fast' | 'normal' | 'slow'
  }
}
```

### Behavior Configuration
```typescript
interface BehaviorConfig {
  // Navigation
  navigation: {
    enableBreadcrumbs: boolean
    enableStepNavigation: boolean
    autoAdvanceOnComplete: boolean
  }
  
  // Data entry
  dataEntry: {
    autoFocusFirstField: boolean
    enterKeyBehavior: 'next' | 'submit' | 'newLine'
    tabBehavior: 'next' | 'skipOptional'
  }
  
  // Notifications
  notifications: {
    showSaveSuccess: boolean
    showValidationErrors: boolean
    showAutoSaveStatus: boolean
    notificationDuration: number // milliseconds
  }
  
  // Confirmation dialogs
  confirmations: {
    confirmDelete: boolean
    confirmNavigation: boolean
    confirmDiscardChanges: boolean
  }
}
```

### Shortcuts Configuration
```typescript
interface ShortcutsConfig {
  // Global shortcuts
  global: {
    commandPalette: string // Default: 'Meta+K' or 'Ctrl+K'
    save: string // Default: 'Meta+S' or 'Ctrl+S'
    undo: string // Default: 'Meta+Z' or 'Ctrl+Z'
    redo: string // Default: 'Meta+Shift+Z' or 'Ctrl+Shift+Z'
  }
  
  // Navigation shortcuts
  navigation: {
    nextStep: string
    previousStep: string
    goToStep: Record<string, string> // Step ID -> shortcut
  }
  
  // Table shortcuts
  table: {
    addRow: string
    deleteRow: string
    editCell: string
    saveCell: string
    cancelEdit: string
  }
  
  // Custom shortcuts (user-defined)
  custom: Record<string, string> // Command ID -> shortcut
}
```

### Validation Configuration
```typescript
interface ValidationConfig {
  // Validation behavior
  behavior: {
    validateOnBlur: boolean
    validateOnChange: boolean
    showInlineErrors: boolean
    showSummaryErrors: boolean
  }
  
  // Field-specific rules
  fields: {
    email: {
      required: boolean
      pattern?: string
      customMessage?: string
    }
    phone: {
      required: boolean
      format: 'us' | 'international' | 'custom'
      pattern?: string
    }
    date: {
      required: boolean
      minDate?: string
      maxDate?: string
    }
    vin: {
      required: boolean
      validateFormat: boolean
      validateChecksum: boolean
    }
  }
  
  // Table validation
  tables: {
    drivers: {
      requiredFields: string[]
      validateOnAdd: boolean
      validateOnEdit: boolean
    }
    vehicles: {
      requiredFields: string[]
      validateOnAdd: boolean
      validateOnEdit: boolean
    }
  }
}
```

### Auto-Save Configuration
```typescript
interface AutoSaveConfig {
  enabled: boolean
  debounceMs: number // Default: 2000
  saveOnBlur: boolean
  saveOnNavigation: boolean
  saveOnUnmount: boolean
  storage: {
    type: 'localStorage' | 'indexedDB' | 'api'
    keyPrefix: string
    retentionDays: number
  }
  retry: {
    enabled: boolean
    maxAttempts: number
    backoffMs: number
  }
}
```

### Tables Configuration
```typescript
interface TablesConfig {
  drivers: {
    columns: ColumnConfig[]
    defaultSort: {
      field: string
      direction: 'asc' | 'desc'
    }
    keyboardNavigation: {
      enabled: boolean
      enterToEdit: boolean
      tabToNext: boolean
    }
    missingDataHighlighting: {
      enabled: boolean
      color: string
      showBadges: boolean
    }
  }
  vehicles: {
    columns: ColumnConfig[]
    defaultSort: {
      field: string
      direction: 'asc' | 'desc'
    }
    keyboardNavigation: {
      enabled: boolean
      enterToEdit: boolean
      tabToNext: boolean
    }
    missingDataHighlighting: {
      enabled: boolean
      color: string
      showBadges: boolean
    }
  }
}

interface ColumnConfig {
  id: string
  visible: boolean
  width?: string
  order: number
  pinned?: 'left' | 'right'
}
```

### Forms Configuration
```typescript
interface FormsConfig {
  clientInfo: {
    sections: {
      personalInfo: {
        visible: boolean
        fields: FieldConfig[]
      }
      contactInfo: {
        visible: boolean
        fields: FieldConfig[]
      }
      licenseInfo: {
        visible: boolean
        fields: FieldConfig[]
      }
    }
    layout: {
      columns: 1 | 2
      spacing: 'compact' | 'comfortable' | 'spacious'
    }
  }
  payment: {
    enabled: boolean
    requiredFields: string[]
  }
  coverage: {
    enabled: boolean
    defaultCoverages: CoverageDefaults
  }
}

interface FieldConfig {
  id: string
  visible: boolean
  required: boolean
  label?: string
  placeholder?: string
  helpText?: string
}
```

## Implementation Architecture

### 1. Manifest Provider
**File**: `app/contexts/customization-context.tsx`

```typescript
interface CustomizationContextValue {
  manifest: CustomizationManifest
  updateManifest: (updates: Partial<CustomizationManifest>) => void
  resetToDefaults: () => void
  resetToAdminDefaults: () => void
  isFeatureEnabled: (feature: keyof FeatureFlags) => boolean
  getThemeValue: (path: string) => any
  getShortcut: (commandId: string) => string | undefined
}

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  // Load manifest from localStorage or API
  // Provide context value
  // Handle updates and persistence
}
```

### 2. Manifest Storage

#### User Preferences (localStorage)
```typescript
// Storage key: 'customization-manifest-user'
// Stores user-specific overrides
interface UserManifest {
  theme?: Partial<ThemeConfig>
  shortcuts?: Partial<ShortcutsConfig>
  ui?: Partial<UIConfig>
  behavior?: Partial<BehaviorConfig>
}
```

#### Admin Defaults (Backend API - Future)
```typescript
// API endpoint: GET /api/customization/manifest
// Returns organization-wide defaults
interface AdminManifest extends CustomizationManifest {
  organizationId: string
  appliesTo: 'all' | 'specific-roles' | 'specific-users'
  roles?: string[]
  userIds?: string[]
}
```

### 3. Manifest Merging Strategy
```typescript
function mergeManifests(
  adminDefaults: CustomizationManifest,
  userOverrides: UserManifest
): CustomizationManifest {
  // Deep merge user overrides into admin defaults
  // User preferences take precedence
  return {
    ...adminDefaults,
    theme: { ...adminDefaults.theme, ...userOverrides.theme },
    shortcuts: { ...adminDefaults.shortcuts, ...userOverrides.shortcuts },
    // ... merge other sections
  }
}
```

### 4. Default Manifest
**File**: `lib/customization/default-manifest.ts`

```typescript
export const DEFAULT_MANIFEST: CustomizationManifest = {
  version: '1.0.0',
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  features: {
    autoSave: true,
    commandPalette: true,
    darkMode: true,
    // ... all features enabled by default
  },
  theme: {
    // Default theme values matching current design system
  },
  // ... other default configurations
}
```

## Integration Points

### 1. Theme Integration
- Use manifest theme values to override CSS variables
- Apply custom colors, fonts, spacing at runtime
- Support theme switching based on manifest

### 2. Feature Flags Integration
```typescript
// In components
const { isFeatureEnabled } = useCustomization()

if (!isFeatureEnabled('autoSave')) {
  // Hide auto-save UI
}
```

### 3. Shortcuts Integration
```typescript
// In command palette
const { getShortcut } = useCustomization()
const shortcut = getShortcut('command-palette') || 'Meta+K'
```

### 4. Validation Integration
```typescript
// In form components
const { manifest } = useCustomization()
const emailConfig = manifest.validation.fields.email
```

### 5. Auto-Save Integration
```typescript
// In auto-save hook
const { manifest } = useCustomization()
const debounceMs = manifest.autoSave.debounceMs
```

## UI for Customization

### 1. Settings Page
**File**: `app/settings/page.tsx`

- Theme customization panel
- Keyboard shortcuts editor
- Feature flags toggles
- Behavior preferences
- Reset to defaults button
- Export/import manifest (JSON)

### 2. Settings Components

#### Theme Customizer
- Color pickers for semantic colors
- Font family selector
- Spacing slider
- Preview pane

#### Shortcuts Editor
- List of all shortcuts
- Click to edit
- Conflict detection
- Reset to defaults

#### Feature Flags Panel
- Toggle switches for each feature
- Feature descriptions
- Warning for disabling critical features

## Implementation Phases

### Phase 1: Core Infrastructure
1. Create manifest TypeScript interfaces
2. Create default manifest
3. Create CustomizationProvider context
4. Implement localStorage persistence
5. Create useCustomization hook

### Phase 2: Theme Customization
1. Integrate theme values with CSS variables
2. Create theme customizer UI
3. Support runtime theme switching
4. Persist theme preferences

### Phase 3: Feature Flags
1. Integrate feature flags throughout app
2. Create feature flags UI
3. Add feature descriptions and warnings

### Phase 4: Shortcuts Customization
1. Integrate shortcuts from manifest
2. Create shortcuts editor UI
3. Implement conflict detection
4. Support custom shortcuts

### Phase 5: Behavior & Validation
1. Integrate behavior config
2. Integrate validation config
3. Create settings UI for behavior
4. Create validation rules editor

### Phase 6: Advanced Customization
1. Table column customization
2. Form field customization
3. Admin manifest API (backend)
4. Organization-wide defaults

## File Structure

```
app/
  contexts/
    customization-context.tsx      # NEW: Customization provider
  settings/
    page.tsx                        # NEW: Settings page
    components/
      theme-customizer.tsx          # NEW: Theme customization UI
      shortcuts-editor.tsx          # NEW: Shortcuts editor
      feature-flags-panel.tsx       # NEW: Feature flags UI
      behavior-settings.tsx         # NEW: Behavior settings
lib/
  customization/
    default-manifest.ts             # NEW: Default manifest
    manifest-types.ts                # NEW: TypeScript types
    manifest-utils.ts                # NEW: Utility functions
    storage.ts                       # NEW: Storage helpers
hooks/
  use-customization.ts               # NEW: Customization hook
```

## Benefits

1. **Centralized Configuration**: Single source of truth for all customization
2. **Type Safety**: Full TypeScript support prevents errors
3. **User Empowerment**: Users can customize their experience
4. **Admin Control**: Organizations can set defaults
5. **Feature Management**: Easy to enable/disable features
6. **Consistency**: Ensures consistent behavior across app
7. **Extensibility**: Easy to add new customization options
8. **Testing**: Easy to test different configurations

## Migration Strategy

1. **Phase 1**: Implement manifest system alongside existing code
2. **Phase 2**: Gradually migrate components to use manifest
3. **Phase 3**: Remove hardcoded values, use manifest exclusively
4. **Phase 4**: Add UI for customization

## Future Enhancements

1. **Backend API**: Store admin manifests in database
2. **Role-Based**: Different manifests for different user roles
3. **A/B Testing**: Support multiple manifest variants
4. **Analytics**: Track which customizations are most used
5. **Templates**: Pre-configured manifest templates
6. **Import/Export**: Share customization configurations
7. **Versioning**: Support manifest versioning and migration
