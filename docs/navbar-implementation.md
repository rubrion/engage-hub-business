# Navbar Component Documentation

This document explains the implementation of the Navbar component in the web-client-template project.

## Features

- **Hide on Scroll Down**: The navbar automatically hides when scrolling down the page
- **Show on Scroll Up**: The navbar reappears when scrolling back up
- **Transparent Mode**: The navbar can be transparent when at the top of hero sections
- **Blur Effect**: Applies a backdrop blur effect when scrolling down
- **Theme Aware**: Colors adapt to both light and dark theme
- **Language Support**: Fully internationalized with multi-language support
- **Debug Mode**: Includes a debug toggle in development mode

## Technical Implementation

### Scroll Direction Detection

The navbar uses a custom scroll direction tracker to determine whether to show or hide:

```typescript
function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const scrollTracker = useRef(createScrollDirectionTracker());
  const prevScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;

      // Only apply hide/show after a small threshold
      if (Math.abs(currentScrollY - prevScrollY.current) < 10) return;

      // Show/hide based on direction
      const direction = scrollTracker.current.checkDirection();
      setVisible(direction === 'up');

      prevScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ...rest of implementation
}
```

### Hero Page Detection

The navbar detects whether the current page has a hero section to apply different styling:

```typescript
// Define hero pages as a constant
const HERO_PAGES = [
  ROUTES.PUBLIC.HOME.path,
  ROUTES.BLOG.LIST.path,
  ROUTES.PUBLIC.PROJECTS.path,
];

// In component:
const isHeroPage = useMemo(() => {
  return HERO_PAGES.includes(location.pathname);
}, [location.pathname]);
```

### Background Styling Logic

The background color and transparency of the navbar depends on:

1. Whether the current page has a hero section
2. Whether the user has scrolled down
3. Whether the user has scrolled beyond the hero section
4. The current theme (light/dark)

```typescript
backgroundColor: (theme) => {
  // For hero pages
  if (isHeroPage && !beyondHero) {
    return transparent && !scrolled
      ? 'transparent'
      : theme.palette.primary.main;
  }

  // For regular pages or beyond hero
  return themeMode === 'dark'
    ? 'rgba(15, 23, 42, 0.8)'
    : 'rgba(255, 255, 255, 0.8)';
};
```

### Debug Mode

The navbar includes a debug mode toggle button (only in development) that:

1. Displays the current debug state
2. Dispatches a custom event for other components to listen to

```typescript
const toggleDebugMode = () => {
  setDebugMode((prev) => !prev);
  const event = new CustomEvent('toggle-debug-mode', {
    detail: { active: !debugMode },
  });
  document.dispatchEvent(event);
};
```

Other components can listen for this event to enable their own debugging features:

```typescript
useEffect(() => {
  const handleDebugToggle = (e: CustomEvent) => {
    if (e.detail.active) {
      // Enable debug features
    } else {
      // Disable debug features
    }
  };

  document.addEventListener(
    'toggle-debug-mode',
    handleDebugToggle as EventListener
  );
  return () => {
    document.removeEventListener(
      'toggle-debug-mode',
      handleDebugToggle as EventListener
    );
  };
}, []);
```

## Animation Utilities

The navbar uses utility functions from `animationUtils.ts`:

1. **throttle**: Limits how frequently the scroll handler functions are called
2. **createScrollDirectionTracker**: Manages the scroll direction state

## Usage in Layouts

When using the navbar in different layouts, you can control:

1. Whether the navbar should be shown at all with the `showNavbar` prop
2. Whether the navbar should start in transparent mode with the `transparent` prop

Example:

```tsx
// For a page with a hero section
<BaseLayout showNavbar={false}>
  <HeroSection showNavbar={true} />
  {/* Other content */}
</BaseLayout>

// For a regular page
<BaseLayout showNavbar={true}>
  {/* Page content */}
</BaseLayout>
```

## Spacer Logic

The navbar adds a spacer element that compensates for its height, but only when needed:

```tsx
{
  (!isHeroPage || !transparent) && (
    <Toolbar sx={{ minHeight: { xs: '64px', sm: '80px' } }} />
  );
}
```

This prevents unwanted spacing at the top of hero pages.
