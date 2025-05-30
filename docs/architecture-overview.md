# Architecture Overview

This document provides a high-level overview of the Rubrion Web Client Template architecture, explaining the key design decisions and patterns used throughout the application.

## Application Structure

The application follows a modular structure with clear separation of concerns:

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── layouts/          # Page layout templates
├── lib/              # Core utilities and helpers
├── mocks/            # Mock service workers and data
├── pages/            # Page components
├── routes/           # Route definitions
├── services/         # Data services
└── utils/            # Utility functions
```

## Key Architectural Patterns

### 1. Provider Pattern

The application uses React Context providers to manage global state and provide functionality across the component tree:

```tsx
// In App.tsx
<TenantProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TranslationProvider>
          <ContentProvider>
            <LanguageUpdater />
            <div className="app-container">{/* Application content */}</div>
          </ContentProvider>
        </TranslationProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
</TenantProvider>
```

### 2. Service Layer Pattern

Data access is abstracted through a service layer that provides a consistent interface regardless of the data source (mock data, REST API, or Firestore):

```
┌─────────────────┐
│   Component     │
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │
└────────┬────────┘
         │
┌────────▼────────┐
│   Data Source   │
└─────────────────┘
```

See the [Data Services](./data-services.md) documentation for more details.

### 3. Composition over Inheritance

The application favors composition over inheritance for component architecture:

```tsx
// Example of composition pattern
const Page = () => (
  <BaseLayout>
    <HeroSection />
    <ContentSection>
      <Card />
      <Card />
    </ContentSection>
    <FooterSection />
  </BaseLayout>
);
```

### 4. Container/Presentation Pattern

Components are often split into "container" components (managing data and state) and "presentation" components (rendering UI):

```tsx
// Container component
const UserListContainer = () => {
  const { data, isLoading } = useUsers();
  return <UserList users={data} loading={isLoading} />;
};

// Presentation component
const UserList = ({ users, loading }) => {
  if (loading) return <Loading />;
  return (
    <List>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </List>
  );
};
```

### 5. Hook Pattern

Custom hooks encapsulate and reuse stateful logic:

```tsx
// Custom hook example
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    // Logic to detect scroll direction
    // ...
  }, []);

  return scrollDirection;
}

// Used in components
const Navbar = () => {
  const scrollDirection = useScrollDirection();
  // ...
};
```

## Core Technical Stack

1. **React**: UI library using functional components and hooks
2. **TypeScript**: For type safety throughout the application
3. **Material UI**: Component library for consistent design
4. **React Router**: For declarative routing
5. **React Query**: For data fetching, caching, and state management
6. **i18next**: For internationalization
7. **MSW**: For API mocking during development
8. **Zod**: For runtime type validation

## State Management

The application uses a combination of state management approaches:

1. **Local Component State**: For UI-specific state (useState)
2. **React Context**: For global state like theme, language, etc.
3. **React Query**: For server state (data fetching, caching, mutations)

## Performance Optimizations

1. **Code Splitting**: Using React's lazy loading and Suspense
2. **Memoization**: Using React.memo, useMemo, and useCallback
3. **Debouncing/Throttling**: For scroll and resize event handlers
4. **Virtualization**: For long lists using virtualized lists
5. **Lazy Loading**: For images and non-critical resources

## Deployment and Environments

The application supports multiple deployment environments:

1. **Development**: With hot reloading and MSW for API mocking
2. **Staging**: With configurable backend endpoints
3. **Production**: With optimized builds and real backend services

Environment variables control feature flags and service endpoints.

## Testing Strategy

1. **Unit Tests**: For utility functions and isolated components
2. **Integration Tests**: For component combinations
3. **End-to-End Tests**: For critical user flows
4. **Visual Regression Tests**: For UI consistency

## Error Handling

The application implements a comprehensive error handling strategy:

1. **Boundary Pattern**: React Error Boundaries catch rendering errors
2. **Service-Level Errors**: Handled at the service layer with fallbacks
3. **UI Error States**: Standardized error UI components
4. **Monitoring**: Error logging to external services (configurable)

## Security Considerations

1. **Content Security Policy**: Configured for production
2. **XSS Prevention**: React's built-in protection + careful handling of user input
3. **CSRF Protection**: Token-based approach for API requests
4. **Authentication**: JWT-based authentication flow

## Conclusion

This architecture provides a solid foundation for building complex web applications while maintaining good separation of concerns, testability, and developer experience. The modular approach allows teams to work on different parts of the application independently and facilitates the addition of new features.
