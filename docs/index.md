# Rubrion Web Client Template Documentation

Welcome to the documentation for the Rubrion Web Client Template. This documentation provides an overview of the various components and features of the template.

## Table of Contents

- [Architecture Overview](./architecture-overview.md) - High-level overview of application structure
- [Component Library](./component-library.md) - Documentation for UI components
- [Data Services](./data-services.md) - Documentation for the data service layer implementation
- [Data Sources](./data-sources.md) - Guide for working with different data sources
- [Routing System](./routing-system.md) - Documentation for the routing system
- [Multi-tenant Architecture](./multi-tenant.md) - Documentation for multi-tenant capabilities
- [Internationalization](./i18n.md) - Documentation for internationalization and remote content
- [Theming](./theming.md) - Documentation for theme customization
- [Debug System](./debug-system.md) - Documentation for debug utilities and mock data
- [Environment Variables](./environment-variables.md) - Documentation for environment configuration
- [Firestore Integration](./firestore-sync.md) - Guide for testing Firestore integration
- [Navbar Implementation](./navbar-implementation.md) - Documentation for navbar component
- [CI/CD Pipeline](./pipeline.md) - Documentation for deployment and release management

## Getting Started

To get started with the Rubrion Web Client Template, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-org/rubrion-web-client-template.git
cd rubrion-web-client-template
npm install
```

Then start the development server:

```bash
npm run dev
```

For testing with a specific tenant:

```bash
npm run dev -- --tenant=your-tenant-name
```

## Environment Configuration

The application uses the following environment variables:

- `VITE_API_URL` - Base URL for the API (supports {tenant} placeholder)
- `VITE_USE_FIRESTORE` - Set to 'true' to use Firestore instead of the REST API
- `VITE_FIREBASE_CONFIG` - JSON string containing Firebase configuration
- `VITE_ENABLE_ANALYTICS` - Set to 'true' to enable analytics
- `VITE_ENABLE_NEWSLETTER` - Set to 'true' to enable newsletter functionality
- `VITE_MAINTENANCE_MODE` - Set to 'true' to enable maintenance mode

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run seed:tenant` - Seed data for a specific tenant
- `npm run seed:all` - Seed data for all configured tenants
