# Plan: Supabase Integration for Demo Agent Platform

## Overview
This plan outlines the integration of Supabase as the backend database for the demo agent platform, replacing the current localStorage-based persistence with a robust, scalable database solution.

## Current State Analysis

### Existing Storage Mechanisms
1. **Quote Storage**: localStorage with prefix `quote-{id}`
   - Stores full quote data including client info, drivers, vehicles, coverage, payment, e-signature
   - Includes versioning and timestamps
   - Auto-save functionality with retry logic

2. **Mock Data**: 
   - Quotes list uses `MOCK_QUOTES` array (2000 mock quotes)
   - No real persistence for quotes list

3. **Recent Quotes**: localStorage for command palette (`command-palette-recent-quotes`)

### Data Models Identified
- **Quotes**: Complete quote lifecycle (draft → pending → sent → accepted/rejected)
- **Client Info**: Personal information, contact details
- **Drivers**: Driver information with MVR data
- **Vehicles**: Vehicle details with discovery support
- **Coverage**: Coverage options and pricing
- **Payment**: Payment information
- **E-Signature**: Document signing workflow
- **Import Data**: Ezlynx import support

## Supabase Integration Plan

### Phase 1: Setup & Configuration

#### 1.1 Supabase Project Setup
- [ ] Create Supabase project
- [ ] Configure environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- [ ] Install dependencies:
  ```bash
  npm install @supabase/supabase-js @supabase/ssr
  ```

#### 1.2 Supabase Client Setup
- [ ] Create `lib/supabase/client.ts` - Client-side Supabase client
- [ ] Create `lib/supabase/server.ts` - Server-side Supabase client (for Server Actions)
- [ ] Create `lib/supabase/middleware.ts` - Middleware for auth (if needed)

### Phase 2: Database Schema Design

#### 2.1 Core Tables

**`quotes` table**
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'pending', 'sent', 'accepted', 'rejected')),
  current_step TEXT NOT NULL CHECK (current_step IN ('import-summary', 'client-info', 'vehicle', 'driver', 'coverage', 'payment', 'e-sign', 'review')),
  
  -- Import metadata
  is_imported BOOLEAN DEFAULT FALSE,
  import_source TEXT CHECK (import_source IN ('ezlynx', 'other')),
  imported_at TIMESTAMPTZ,
  ezlynx_quote_number TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_saved TIMESTAMPTZ DEFAULT NOW(),
  
  -- User/Agency context (if multi-tenant)
  user_id UUID REFERENCES auth.users(id), -- If using auth
  agency TEXT,
  agent TEXT,
  
  -- Indexes
  CONSTRAINT quotes_status_idx ON quotes(status),
  CONSTRAINT quotes_created_at_idx ON quotes(created_at),
  CONSTRAINT quotes_user_id_idx ON quotes(user_id)
);
```

**`quote_data` table** (JSONB for flexible schema)
```sql
CREATE TABLE quote_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Store all quote data as JSONB for flexibility
  data JSONB NOT NULL DEFAULT '{}',
  
  -- Version tracking
  version INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one-to-one relationship
  CONSTRAINT quote_data_quote_id_unique UNIQUE (quote_id)
);

-- Index for JSONB queries
CREATE INDEX quote_data_data_idx ON quote_data USING GIN (data);
```

**`clients` table** (Normalized client data)
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Client information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  drivers_license TEXT,
  drivers_license_state TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT clients_email_idx ON clients(email),
  CONSTRAINT clients_quote_id_idx ON clients(quote_id)
);
```

**`drivers` table**
```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Driver information (store as JSONB for flexibility with MVR data)
  data JSONB NOT NULL,
  
  -- Ordering
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT drivers_quote_id_idx ON drivers(quote_id)
);
```

**`vehicles` table**
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Vehicle information (store as JSONB for flexibility)
  data JSONB NOT NULL,
  
  -- Ordering
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Indexes
  CONSTRAINT vehicles_quote_id_idx ON vehicles(quote_id)
);
```

**`coverage` table**
```sql
CREATE TABLE coverage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Coverage data (JSONB for flexibility)
  data JSONB NOT NULL DEFAULT '{}',
  
  -- Pricing summary
  pricing_summary JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one-to-one relationship
  CONSTRAINT coverage_quote_id_unique UNIQUE (quote_id)
);
```

**`payments` table**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Payment data (JSONB for flexibility)
  data JSONB NOT NULL DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one-to-one relationship
  CONSTRAINT payments_quote_id_unique UNIQUE (quote_id)
);
```

**`e_signatures` table**
```sql
CREATE TABLE e_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- E-signature data (JSONB for flexibility with documents)
  data JSONB NOT NULL DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one-to-one relationship
  CONSTRAINT e_signatures_quote_id_unique UNIQUE (quote_id)
);
```

**`import_summaries` table**
```sql
CREATE TABLE import_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  
  -- Import summary data (JSONB for flexibility)
  data JSONB NOT NULL DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure one-to-one relationship
  CONSTRAINT import_summaries_quote_id_unique UNIQUE (quote_id)
);
```

#### 2.2 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE e_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_summaries ENABLE ROW LEVEL SECURITY;

-- Example policies (adjust based on auth requirements)
-- For now, allow all operations (can restrict later with auth)
CREATE POLICY "Allow all operations for authenticated users" ON quotes
  FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON quote_data
  FOR ALL USING (true);

-- Similar policies for other tables...
```

#### 2.3 Database Functions & Triggers

**Auto-update `updated_at` trigger**
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Similar triggers for other tables...
```

**Auto-generate quote_number**
```sql
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quote_number IS NULL THEN
    NEW.quote_number := 'Q' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NEW.id::TEXT) FROM 1 FOR 9));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_quote_number_trigger BEFORE INSERT ON quotes
  FOR EACH ROW EXECUTE FUNCTION generate_quote_number();
```

### Phase 3: API Layer Implementation

#### 3.1 Server Actions (Recommended for Next.js App Router)

**`app/actions/quotes.ts`**
```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createQuote(data: Partial<QuoteData>) {
  // Implementation
}

export async function updateQuote(id: string, data: Partial<QuoteData>) {
  // Implementation
}

export async function getQuote(id: string) {
  // Implementation
}

export async function listQuotes(filters?: QuoteFilters) {
  // Implementation
}

export async function deleteQuote(id: string) {
  // Implementation
}
```

#### 3.2 Data Access Layer

**`lib/db/quotes.ts`**
- Quote CRUD operations
- Complex queries (filtering, pagination)
- Data transformation (DB → App format)

**`lib/db/clients.ts`**
- Client operations
- Client search/find functionality

**`lib/db/drivers.ts`**
- Driver operations

**`lib/db/vehicles.ts`**
- Vehicle operations

### Phase 4: Context Migration

#### 4.1 Update Quote Context
- [ ] Replace localStorage calls with Supabase calls
- [ ] Maintain same API surface for components
- [ ] Add optimistic updates
- [ ] Handle offline scenarios (fallback to localStorage?)

#### 4.2 Migration Strategy
- [ ] Create migration utility to move localStorage data to Supabase
- [ ] One-time migration script
- [ ] Handle conflicts (localStorage vs Supabase)

### Phase 5: Quotes List Integration

#### 5.1 Replace Mock Data
- [ ] Update `/app/quotes/page.tsx` to fetch from Supabase
- [ ] Implement server-side data fetching
- [ ] Add pagination
- [ ] Add filtering (status, date, agency, agent)
- [ ] Add search functionality

#### 5.2 Real-time Updates (Optional)
- [ ] Use Supabase Realtime for live quote updates
- [ ] Show notifications when quotes are updated by other users

### Phase 6: Authentication (If Needed)

#### 6.1 Supabase Auth Setup
- [ ] Configure auth providers (email, OAuth)
- [ ] Create auth middleware
- [ ] Update RLS policies to use user_id

#### 6.2 User Management
- [ ] User profile management
- [ ] Agency/agent assignment
- [ ] Permissions/roles

### Phase 7: Advanced Features

#### 7.1 File Storage
- [ ] Use Supabase Storage for:
  - PDF quotes
  - E-signature documents
  - Import files
  - Attachments

#### 7.2 Database Functions
- [ ] Create stored procedures for complex operations
- [ ] Batch operations
- [ ] Data aggregation queries

#### 7.3 Backup & Recovery
- [ ] Configure Supabase backups
- [ ] Export functionality
- [ ] Data recovery procedures

### Phase 8: Testing & Migration

#### 8.1 Testing Strategy
- [ ] Unit tests for data access layer
- [ ] Integration tests for Server Actions
- [ ] E2E tests for quote workflow
- [ ] Performance testing

#### 8.2 Data Migration
- [ ] Create migration script
- [ ] Test migration on staging
- [ ] Backup localStorage before migration
- [ ] Run migration script
- [ ] Verify data integrity

#### 8.3 Rollback Plan
- [ ] Keep localStorage fallback initially
- [ ] Feature flag for Supabase vs localStorage
- [ ] Gradual rollout

## Implementation Order

### Phase 1: Foundation (Week 1)
1. Supabase project setup
2. Database schema creation
3. Basic CRUD operations
4. Update quote context to use Supabase

### Phase 2: Core Features (Week 2)
1. Quotes list integration
2. Filtering and search
3. Pagination
4. Data migration from localStorage

### Phase 3: Advanced Features (Week 3)
1. Real-time updates
2. File storage
3. Authentication (if needed)
4. Performance optimization

### Phase 4: Polish & Testing (Week 4)
1. Comprehensive testing
2. Error handling improvements
3. Documentation
4. Production deployment

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: Feature flags
NEXT_PUBLIC_USE_SUPABASE=true
NEXT_PUBLIC_ENABLE_REALTIME=false
```

## Considerations

### Performance
- Use database indexes strategically
- Implement pagination for large datasets
- Cache frequently accessed data
- Use database views for complex queries

### Security
- Implement RLS policies properly
- Validate all inputs
- Use parameterized queries
- Secure API keys (never expose service role key client-side)

### Scalability
- Design schema for future growth
- Consider partitioning for large tables
- Use connection pooling
- Monitor query performance

### Data Integrity
- Use database constraints
- Implement soft deletes if needed
- Version control for quote data
- Audit logging

## Migration Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] RLS policies configured
- [ ] Server Actions implemented
- [ ] Quote context updated
- [ ] Quotes list integrated
- [ ] Data migration completed
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Production deployment

## Future Enhancements

1. **Multi-tenancy**: Support for multiple agencies/agents
2. **Audit Logging**: Track all changes to quotes
3. **Advanced Search**: Full-text search with PostgreSQL
4. **Analytics**: Quote conversion tracking
5. **Webhooks**: Integrate with external systems
6. **API**: REST/GraphQL API for external integrations
7. **Caching**: Redis for frequently accessed data
8. **Queue System**: Background job processing
