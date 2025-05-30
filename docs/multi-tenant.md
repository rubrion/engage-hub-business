# Multi-tenant Architecture

This document provides an overview of the multi-tenant capabilities in the Rubrion Web Client Template.

## Overview

The application follows a multi-tenant white-label architecture where each tenant has its own:

- Configuration
- Theme
- Content
- Data
- Feature flags

This approach allows a single deployment to serve multiple client websites with their own branding and features.

## Tenant Resolution

Tenants are identified through one of two methods:

### In Production

Tenants are identified by subdomain:

```
acme.rubrion.com -> Tenant: "acme"
beta.rubrion.com -> Tenant: "beta"
```

### In Development

Tenants are identified by the `tenant` query parameter:

```
http://localhost:3000?tenant=acme -> Tenant: "acme"
http://localhost:3000?tenant=beta -> Tenant: "beta"
```

If no tenant is specified in development mode, a default tenant ("demo") is used.

## Core Components

### 1. Tenant Context

The `TenantProvider` and `useTenant` hook provide tenant identification throughout the application:

```tsx
// In App.tsx
<TenantProvider>{/* Application content */}</TenantProvider>;

// In any component
const currentTenant = useTenant(); // Returns the current tenant ID
```

### 2. Tenant-Aware Services

Data services automatically namespace data by tenant:

```typescript
// Service implementation
const response = await projectService.list(currentTenant, page, limit);

// Legacy function with tenant parameter
const data = await fetchProjects(page, limit, tenant);
```

### 3. Tenant Configuration

Tenant configurations are stored in Firestore and accessed through a configuration provider:

```typescript
// Firestore structure
tenants / { tenantId }; // Tenant configuration document
blogs / { tenantId } / { postId }; // Tenant-specific blog post
projects / { tenantId } / { projectId }; // Tenant-specific project
translations / { tenantId } / { locale } / { key }; // Tenant-specific translations
```

## Data Model

Each tenant has its own namespace in Firestore:

```
tenants/
|-- acme/
|   |-- name: "Acme Corp"
|   |-- theme: { primary: "#ff0000", ... }
|   |-- features: { newsletter: true, blog: true, ... }
|   |-- contact: { email: "info@acme.com", ... }
|-- beta/
|   |-- ...
```

## Theme Customization

Themes are dynamically loaded based on tenant configuration:

```typescript
// Theme creation based on tenant config
const tenantTheme = createTenantTheme(tenantConfig.theme);

// Theme provider using tenant-specific theme
<ThemeProvider theme={tenantTheme}>
  {/* Application content */}
</ThemeProvider>
```

## Feature Flags

Features can be enabled/disabled per tenant:

```typescript
// Check if a feature is enabled for the current tenant
const isNewsletterEnabled = useFeature('newsletter');

// Conditional rendering based on feature flag
{isNewsletterEnabled && <NewsletterSignup />}
```

## Caching Strategy

To optimize performance, tenant data is cached at multiple levels:

1. **Browser Cache**: Using standard HTTP caching headers
2. **Edge Cache**: Using Cloudflare Workers and KV storage
3. **Application Cache**: Using React Query for client-side caching

The cache key format includes the tenant to ensure proper isolation:

```
`${tenant}|${lang}|${path}|${queryParams}`
```

## Development Utilities

### Tenant Switcher

A development-only component for switching between tenants:

```tsx
// Only shown in development environment
{
  import.meta.env.DEV && <TenantSwitcher />;
}
```

### Debug Tools

Debug tools allow inspection of tenant-specific configuration:

```tsx
// DataSourceToggle component shows the current tenant
import.meta.env.DEV && <DataSourceToggle />;
```

## Seeding Tenant Data

Tenant data can be seeded using the provided scripts:

```bash
# Seed data for a specific tenant
npm run seed:tenant -- --tenant=acme

# Seed data for all tenants
npm run seed:all
```

## Security Considerations

1. **Data Isolation**: Each tenant's data is isolated in separate Firestore collections
2. **Authentication**: Separate authentication settings per tenant
3. **Authorization**: Role-based access control scoped to tenants
4. **Rate Limiting**: Per-tenant rate limiting prevents abuse

## Best Practices

1. **Always Use Tenant Context**: Never hardcode tenant IDs; use the tenant context
2. **Test Multiple Tenants**: Test with different tenant configurations
3. **Feature Flag Control**: Use feature flags instead of hardcoded conditionals
4. **Theme Variables**: Use theme variables instead of hardcoded styles
5. **Lazy Loading**: Consider lazy loading tenant-specific assets

## Conclusion

The multi-tenant architecture provides a scalable solution for serving multiple branded applications from a single codebase. By clearly separating tenant-specific concerns and providing appropriate isolation, the system maintains high performance while offering customization options.
