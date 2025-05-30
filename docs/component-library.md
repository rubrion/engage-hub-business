# Component Library

This document provides an overview of the core UI components available in the Rubrion Web Client Template.

## Component Organization

Components are organized into several categories:

- **UI Components**: Basic building blocks (buttons, cards, etc.)
- **Form Components**: Input fields, selectors, and form containers
- **Layout Components**: Structural elements (grids, containers)
- **Feedback Components**: Loading indicators, notifications, dialogs
- **Navigation Components**: Menus, navbars, tabs
- **Media Components**: Images, videos, galleries
- **Data Display**: Tables, lists, data grids

## Core Components

### HeroSection

A full-width section typically used at the top of pages with a prominent headline, subheadline, and call-to-action buttons.

```tsx
<HeroSection
  title="Building Better Digital Experiences"
  subtitle="Create stunning web applications with our template system"
  overline="Welcome to Rubrion"
  buttons={[
    { text: 'Get Started', onClick: () => navigate('/start') },
    {
      text: 'Learn More',
      onClick: () => scrollTo('features'),
      variant: 'outlined',
    },
  ]}
  backgroundImage="/path/to/image.jpg"
/>
```

**Props:**

- `title`: Main heading
- `subtitle`: Secondary text
- `overline`: Small text above the title
- `buttons`: Array of button configurations
- `backgroundImage`: Optional background image URL
- `overlay`: Boolean to add a dark overlay on background
- `fullHeight`: Boolean to make the section fill the viewport height

### ContentCard

A versatile card component for displaying content items such as blog posts, projects, or products.

```tsx
<ContentCard
  item={{
    id: '123',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React development',
    image: '/path/to/image.jpg',
    category: 'Development',
    ctaLink: '/blog/123',
    ctaText: 'Read More',
    date: '2023-05-15',
  }}
  variant="featured"
  imageAspectRatio="56.25%"
/>
```

**Props:**

- `item`: Content item object with title, description, image, etc.
- `variant`: Card style variant ("default", "featured", "compact")
- `imageAspectRatio`: Control the aspect ratio of the image
- `elevation`: Card elevation level (Material UI)
- `onClick`: Optional click handler for the entire card

### CTASection

A section component for call-to-action blocks with a title, content, and optional background.

```tsx
<CTASection
  id="contact-us"
  overline="Ready to start?"
  title="Get in touch with our team"
  maxWidth="lg"
  backgroundColor="primary.main"
  textColor="white"
>
  <ContactForm />
</CTASection>
```

**Props:**

- `id`: Section ID for navigation/anchoring
- `overline`: Small text above the title
- `title`: Main section heading
- `maxWidth`: Container width (Material UI container widths)
- `backgroundColor`: Background color (theme color or custom)
- `textColor`: Text color (theme color or custom)
- `children`: Section content

### LoadingIndicator

A customizable loading indicator with different variants.

```tsx
<LoadingIndicator
  message="Loading projects..."
  variant="circular"
  fullHeight={true}
  overlay={false}
/>
```

**Props:**

- `message`: Text to display below the spinner
- `variant`: Spinner style ("circular", "linear", "dots")
- `fullHeight`: Whether to take up full height of parent
- `overlay`: Whether to show as an overlay with backdrop
- `size`: Size of the spinner ("small", "medium", "large")

### DataTable

A comprehensive table component with sorting, filtering, and pagination.

```tsx
<DataTable
  columns={[
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
  ]}
  data={users}
  pagination={{
    page: currentPage,
    pageSize: 10,
    totalItems: totalUsers,
    onPageChange: handlePageChange,
  }}
  sorting={{
    sortField: sortField,
    sortDirection: sortDirection,
    onSortChange: handleSortChange,
  }}
  rowActions={[
    { icon: <EditIcon />, label: 'Edit', onClick: handleEdit },
    { icon: <DeleteIcon />, label: 'Delete', onClick: handleDelete },
  ]}
/>
```

**Props:**

- `columns`: Column definitions
- `data`: Array of data items
- `pagination`: Pagination configuration
- `sorting`: Sorting configuration
- `rowActions`: Actions to show for each row
- `onRowClick`: Handler for row click events
- `emptyState`: Component to show when there's no data

### FormBuilder

A dynamic form generation component that creates form fields from a schema.

```tsx
<FormBuilder
  schema={[
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', rows: 4 },
    { name: 'subscribe', label: 'Subscribe to newsletter', type: 'checkbox' },
  ]}
  initialValues={{ fullName: '', email: '', message: '', subscribe: false }}
  onSubmit={handleSubmit}
  submitLabel="Send Message"
  validationSchema={yupSchema}
/>
```

**Props:**

- `schema`: Array of field definitions
- `initialValues`: Initial form values
- `onSubmit`: Form submission handler
- `submitLabel`: Text for submit button
- `validationSchema`: Yup validation schema
- `disabled`: Whether the form is disabled
- `loading`: Whether to show loading state

### AlertMessage

A component for displaying alert messages with different severity levels.

```tsx
<AlertMessage
  message="Your profile has been updated successfully"
  severity="success"
  onClose={() => setAlertVisible(false)}
  action={<Button color="inherit">Undo</Button>}
/>
```

**Props:**

- `message`: Alert message text
- `severity`: Alert type ("success", "info", "warning", "error")
- `onClose`: Handler for close button click
- `action`: Optional action component to display
- `variant`: Visual variant ("filled", "outlined", "standard")
- `icon`: Custom icon to display

### ImageGallery

A component for displaying multiple images with lightbox functionality.

```tsx
<ImageGallery
  images={[
    {
      src: '/image1.jpg',
      alt: 'Project photo 1',
      thumbnail: '/thumbnail1.jpg',
    },
    {
      src: '/image2.jpg',
      alt: 'Project photo 2',
      thumbnail: '/thumbnail2.jpg',
    },
  ]}
  aspectRatio="4:3"
  enableLightbox={true}
/>
```

**Props:**

- `images`: Array of image objects
- `aspectRatio`: Aspect ratio for images
- `enableLightbox`: Whether to enable full-screen lightbox
- `thumbnailPosition`: Position of thumbnails ("bottom", "left", "right")
- `initialIndex`: Index of initially selected image

## Form Components

### TextField

Enhanced version of Material UI's TextField with additional features.

```tsx
<TextField
  name="email"
  label="Email Address"
  type="email"
  required
  helperText="We'll never share your email"
  startAdornment={<EmailIcon />}
  endAdornment={<InfoIcon />}
  onChange={handleChange}
  validation={{ pattern: /^\S+@\S+\.\S+$/ }}
/>
```

### SelectField

Enhanced select field with additional features.

```tsx
<SelectField
  name="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
  ]}
  multiple={false}
  required
  onChange={handleChange}
/>
```

### FileUpload

A file upload component with preview and progress indication.

```tsx
<FileUpload
  name="document"
  label="Upload Document"
  accept="application/pdf"
  maxSize={5000000} // 5MB
  multiple={false}
  onUpload={handleUpload}
/>
```

### DatePicker

A date picker component with various configuration options.

```tsx
<DatePicker
  name="appointmentDate"
  label="Appointment Date"
  minDate={new Date()}
  format="MM/dd/yyyy"
  onChange={handleChange}
/>
```

## Usage Guidelines

### Component Composition

Components are designed to be composable. For example, you can nest components to create complex layouts:

```tsx
<BaseLayout>
  <HeroSection title="Welcome" />
  <CTASection title="Features">
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <ContentCard item={featureOne} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ContentCard item={featureTwo} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ContentCard item={featureThree} />
      </Grid>
    </Grid>
  </CTASection>
</BaseLayout>
```

### Responsive Design

All components are built with responsive design in mind. Use the appropriate props to control behavior on different screen sizes:

```tsx
<Grid container spacing={{ xs: 2, md: 4 }}>
  <Grid item xs={12} sm={6} md={4}>
    <ContentCard item={post} variant={{ xs: 'compact', md: 'default' }} />
  </Grid>
</Grid>
```

### Theme Integration

Components automatically adapt to the current theme. Use theme-aware props for colors:

```tsx
<CTASection backgroundColor="primary.main" textColor="primary.contrastText">
  {/* content */}
</CTASection>
```

### Accessibility

All components are designed with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Color contrast compliance
- Screen reader support

## Extending Components

To extend a component with additional functionality:

```tsx
import { ContentCard } from '../components/ui';

const EnhancedContentCard = (props) => {
  const { item, ...rest } = props;

  // Add custom functionality
  const handleAnalytics = () => {
    trackEvent('card_view', { id: item.id });
  };

  useEffect(() => {
    handleAnalytics();
  }, []);

  return <ContentCard item={item} {...rest} />;
};
```

## Creating New Components

When creating new components, follow these guidelines:

1. Use TypeScript for type safety
2. Include proper PropTypes and default props
3. Implement responsive design
4. Consider accessibility requirements
5. Use theme variables for styling
6. Document props and usage examples
7. Include necessary tests
