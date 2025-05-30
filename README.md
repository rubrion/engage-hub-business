
<kbd>[<img title="Português (Brasil)" alt="Português (Brasil)" src="https://cdn.statically.io/gh/hjnilsson/country-flags/master/svg/br.svg" width="22">](./README-pt-BR.md)</kbd>

# Rubrion Engage Hub - Business Platform

A multilingual, multi-tenant white-label platform that serves as the core business solution within Rubrion's ecosystem. This platform enables organizations and companies to deploy their own branded digital presence with full localization support, leveraging Rubrion's "code-free, cloud-fee" model.

## 🚀 Live Demo

Experience the platform in action with mocked data:

**[https://engage-hub.rubrion.com/](https://engage-hub.rubrion.com/)**

## About Rubrion

Rubrion brings advanced digital services to organizations using a **"code-free, cloud-fee" model**: we deliver pre-configured, hosted, and maintained open-source SaaS solutions (CMS, e-commerce, LMS, etc.) so that clients don't need to code or pay for proprietary licenses—only covering infrastructure costs and usage-based fees.

We use **white-label, multi-tenant architectures**: most of the codebase is shared, but each instance is deployed as an isolated, atomic service, ensuring secure and scalable environments. As the technical lead partner, we automate deployment pipelines, manage hosting partnerships, adjust plans based on actual usage, and reinvest part of the revenue into free software—completing a cycle that makes technology accessible and strengthens the impact ecosystem.

## Platform Overview

The Engage Hub Business Platform is a comprehensive React + TypeScript solution designed for:

- **Multi-tenant Architecture**: Single codebase serving multiple isolated client instances
- **Multilingual Support**: Complete i18n implementation with remote content management
- **White-label Branding**: Customizable themes, content, and features per tenant
- **Scalable Infrastructure**: Built for cloud deployment with automated CI/CD
- **Open Source Foundation**: Leveraging community-driven technologies

## Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Multi-tenant Capabilities](#multi-tenant-capabilities)
- [Internationalization](#internationalization)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Key Features

### Core Platform Capabilities
- **Multi-tenant White-label Architecture**: Single codebase serving multiple isolated client instances
- **Comprehensive Internationalization**: Static UI translations + dynamic remote content management
- **Real-time Content Management**: Firestore-based multilingual content with language fallbacks
- **Flexible Data Sources**: Support for Firestore, REST APIs, and MSW mocking
- **Advanced Theming**: Per-tenant customizable themes with dark/light mode support
- **Enterprise-grade Routing**: Type-safe routing with SEO metadata and lazy loading

### Development & Operations
- **Modern Tech Stack**: React 19 + TypeScript + Vite for optimal performance
- **Automated CI/CD**: GitHub Actions with semantic versioning and deployment automation
- **Quality Assurance**: ESLint, Prettier, Vitest with comprehensive testing suite
- **Development Tools**: MSW for API mocking, debug utilities, and tenant switching
- **Security**: BlackBox file encryption for sensitive configuration
- **Performance**: Code splitting, lazy loading, and optimized caching strategies

### Business Features
- **Professional Pages**: Home, About, Services, Projects, Blog, Contact, Team
- **Content Showcase**: Project portfolios, team profiles, service descriptions
- **Partner Integration**: Partner logos and information display
- **Contact Management**: Multi-channel contact forms and information
- **SEO Optimization**: Helmet-based metadata management with per-tenant customization

## Architecture

### Multi-tenant Design
```
Single Deployment → Multiple Client Sites
├── acme.rubrion.com (Tenant: acme)
├── beta.rubrion.com (Tenant: beta)
└── demo.rubrion.com (Tenant: demo)
```

Each tenant has isolated:
- **Configuration**: Theme, features, contact information
- **Content**: Projects, blog posts, team members, services
- **Branding**: Logo, colors, typography, custom styling
- **Data**: Separate Firestore collections with tenant namespacing

### Technology Stack
- **Frontend**: React 19, TypeScript, Material-UI, Framer Motion
- **Routing**: React Router with type-safe navigation
- **State Management**: React Context + TanStack Query
- **Internationalization**: i18next with remote content support
- **Database**: Firestore with multi-tenant data architecture
- **Development**: Vite, MSW, Vitest, ESLint, Prettier
- **Deployment**: GitHub Actions, automated versioning

## Multi-tenant Capabilities

### Tenant Resolution
- **Production**: Subdomain-based (`acme.rubrion.com` → `acme`)
- **Development**: Query parameter (`localhost:3000?tenant=acme`)
- **Fallback**: Demo tenant for development environments

### Per-tenant Customization
- **Themes**: Primary/secondary colors, typography, spacing
- **Features**: Toggle newsletter, blog, contact forms, analytics
- **Content**: Localized projects, services, team information
- **Branding**: Custom logos, company information, social links

### Data Isolation
```
tenants/
├── acme/
│   ├── config: { theme, features, contact }
│   ├── projects/
│   ├── blog/
│   └── team/
├── beta/
│   └── ...
```

## Internationalization

### Static Translations (UI Elements)
- **Supported Languages**: English, Spanish, Portuguese (extensible)
- **Translation Files**: JSON-based with hierarchical organization
- **Utilities**: Type-safe translation functions with fallbacks
- **Development**: Missing translation detection and debugging

### Dynamic Remote Content
- **Firestore Structure**: Language-specific subcollections per document
- **API Transparency**: Returns content with actual language used
- **Fallback Strategy**: Automatic fallback to English when translations unavailable
- **MSW Integration**: Mock multilingual responses for development

### Language Selection
- **Persistent**: Language preference maintained across navigation
- **Fallback**: Graceful degradation when content unavailable

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rubrion/engage-hub-business.git
   cd engage-hub-business
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize MSW (Mock Service Worker)**
   ```bash
   npx msw init ./public --save
   ```

4. **Start Development Server**
   ```bash
   # Start with demo tenant
   npm run dev
   
   # Start with specific tenant
   npm run dev -- --tenant=acme
   ```

5. **Access the Application**
   ```
   http://localhost:3000          # Demo tenant
   http://localhost:3000?tenant=acme  # Specific tenant
   ```

### Environment Configuration

Create a `.env` file for your environment:

```env
# Firebase Configuration (for Firestore)
VITE_FIREBASE_CONFIG='{"apiKey":"...","authDomain":"...","projectId":"..."}'

# Feature Flags
VITE_USE_FIRESTORE=false
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NEWSLETTER=true
VITE_MAINTENANCE_MODE=false

# API Configuration
VITE_API_URL=https://api.rubrion.com/{tenant}
```

## Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   ├── content/         # Content-specific components
│   └── translation/     # Translation utilities
├── context/             # React contexts (Theme, Tenant, Language)
├── core/                # Core utilities (tenant resolution)
├── hooks/               # Custom React hooks
├── i18n/                # Internationalization
│   ├── locales/         # Translation files
│   └── msw/             # MSW handlers for i18n
├── pages/               # Page components
├── routes/              # Routing configuration
├── services/            # API services and data fetching
├── theme/               # Theme configuration
└── utils/               # Utility functions
```

### Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:prod         # Start in production mode

# Building
npm run build            # Build for production
npm run build:mocked     # Build with mocked data
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm run test             # Run tests
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI

# Utilities
npm run clean:logs:check # Check for console.log statements
npm run clean:logs:fix   # Replace console.log with debugLog
```

### Adding a New Tenant

1. **Create Tenant Configuration** (in Firestore or mock data)
   ```json
   {
     "name": "New Company",
     "theme": {
       "primary": "#1976d2",
       "secondary": "#dc004e"
     },
     "features": {
       "newsletter": true,
       "blog": true,
       "analytics": true
     },
     "contact": {
       "email": "info@newcompany.com",
       "phone": "+1234567890"
     }
   }
   ```

2. **Add Content** (projects, team, services)
3. **Test Locally**
   ```bash
   npm run dev -- --tenant=newcompany
   ```

### Adding New Languages

1. **Create Translation Files**
   ```
   src/i18n/locales/de/
   ├── index.ts
   ├── common.json
   ├── navigation.json
   └── screens/
       ├── home.json
       ├── about.json
       └── ...
   ```

2. **Update Language Context**
   ```typescript
   // src/context/LanguageContext.tsx
   const languages = ['en', 'es', 'pt', 'de'];
   ```

3. **Add Remote Content** (in Firestore)
   ```
   projects/{projectId}/de/content/
   blogPosts/{postId}/de/content/
   ```

## Deployment

### Automated Deployment

The platform uses GitHub Actions for automated deployment:

1. **Development**: Push to `develop` branch triggers development deployment
2. **Staging**: Create release branch for staging deployment  
3. **Production**: Merge to `main` branch triggers production deployment

### Manual Deployment

```bash
# Initialize main branch (for new projects)
bash scripts/init-main-branch.sh

# Build for production
npm run build

# Deploy to hosting provider
# (Configure based on your hosting solution)
```

### Environment-specific Builds

```bash
# Development build with mocks
npm run build:mocked

# Production build
npm run build
```

For detailed deployment information, see [docs/pipeline.md](./docs/pipeline.md).

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Architecture Overview](./docs/architecture-overview.md)** - System design and structure
- **[Multi-tenant Guide](./docs/multi-tenant.md)** - Multi-tenancy implementation
- **[Internationalization](./docs/i18n.md)** - Complete i18n guide
- **[Data Services](./docs/data-services.md)** - Data layer documentation
- **[Theming System](./docs/theming.md)** - Theme customization
- **[Routing System](./docs/routing-system.md)** - Navigation and routing
- **[Component Library](./docs/component-library.md)** - UI components
- **[Debug System](./docs/debug-system.md)** - Development tools
- **[Environment Variables](./docs/environment-variables.md)** - Configuration
- **[CI/CD Pipeline](./docs/pipeline.md)** - Deployment processes

## Contributing

### Development Setup

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make Changes**
4. **Run Tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Submit Pull Request**

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Testing**: Vitest with React Testing Library
- **Commits**: Conventional commit messages

### Tenant Data Seeding

Use the provided scripts for consistent development data:

```bash
# Seed specific tenant
npm run seed:tenant -- --tenant=acme

# Seed all tenants  
npm run seed:all
```

## Security & Configuration

### BlackBox File Encryption

For secure handling of sensitive configuration files, this project uses StackExchange BlackBox:

#### Setup Instructions

1. **Install BlackBox**
   ```bash
   git clone https://github.com/StackExchange/blackbox.git
   cd blackbox
   sudo make copy-install
   ```

2. **Import GPG Keys** (obtain from project maintainer)
   ```bash
   # Import public key
   echo "base64_encoded_public_key" | base64 --decode | gpg --import
   
   # Import private key  
   echo "base64_encoded_private_key" | base64 --decode | gpg --import
   ```

3. **Verify Import**
   ```bash
   gpg --list-secret-keys
   ```

4. **Decrypt Project Files**
   ```bash
   blackbox_decrypt_all_files
   ```

### Environment Security

- Sensitive configuration stored encrypted in repository
- Environment variables for deployment-specific settings
- Separate Firebase projects for development/staging/production
- Tenant-specific security isolation

---

## Rubrion Ecosystem Integration

This platform is part of Rubrion's broader ecosystem of open-source SaaS solutions:

### Related Platforms
- **Content Management**: Headless CMS with multi-tenant support
- **E-commerce**: White-label online store platform  
- **Learning Management**: Educational content delivery system
- **Analytics**: Privacy-focused analytics dashboard

### Business Model Benefits
- **No Coding Required**: Pre-configured solutions ready for deployment
- **No License Fees**: Open-source foundation with transparent pricing
- **Infrastructure Only**: Clients pay for actual usage, not software licenses
- **Automated Management**: Deployment, maintenance, and updates handled automatically

### Technical Partnership
As Rubrion's technical lead partner, this platform demonstrates:
- **Automated DevOps**: Complete CI/CD pipeline automation
- **Scalable Architecture**: Multi-tenant design for efficient resource usage
- **Open Source Commitment**: Revenue reinvestment into free software development
- **Hosting Partnerships**: Optimized cloud infrastructure management

---

## License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0).

## Support

- **Documentation**: Complete guides in `/docs` directory
- **Issues**: GitHub Issues for bug reports and feature requests
- **Community**: Join our community for discussions and support
- **Enterprise**: Contact Rubrion for enterprise deployment and customization

[![Donate via PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif 'Donate via PayPal')](https://www.paypal.com/donate/?hosted_button_id=KBPKKS3627FX6)

---

**Built with ❤️ by the Rubrion Team**

*Making technology accessible through open-source innovation*