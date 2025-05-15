# Rubrion Web Client Template

A comprehensive React + TypeScript frontend starter template with built-in routing, SEO optimization, theming, mock services, and more. This template provides a standardized starting point for Rubrion web client projects.

## Table of Contents

- [Features](#features)
- [Feature Usage Guidelines](#feature-usage-guidelines)
  - [Routing (React Router)](#routing-react-router)
  - [SEO with PageHelmet](#seo-with-pagehelmet)
  - [Mock Service Worker (MSW)](#mock-service-worker-msw)
  - [Theme System (Dark/Light Modes)](#theme-system-darklight-modes)
  - [Breadcrumbs](#breadcrumbs)
  - [Lazy Loading](#lazy-loading)
  - [MSW Initialization Command](#msw-initialization-command)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [Release and Deployment](#release-and-deployment)
- [Scripts](#scripts)
- [Setting up Blackbox for File Encryption](#setting-up-blackbox-for-file-encryption)

## Features

- **Vite**: Fast, modern build tool for development
- **React + TypeScript**: Strong typing with modern React
- **ESLint & Prettier**: Code quality and consistent formatting
- **React Router**: Type-safe routing with navigation and SEO metadata
- **MSW (Mock Service Worker)**: API mocking for development and testing
- **Theme System**: Dark/light mode with CSS variables
- **SEO Optimization**: Helmet-based metadata management
- **Lazy Loading**: Code-splitting for performance
- **Breadcrumbs**: Automatic navigation breadcrumbs
- **EditorConfig**: Consistent coding styles across editors
- **Material UI**: Comprehensive UI component library
- **Automated CI/CD**: GitHub Actions for deployment and releases
- **Release Management**: Automated versioning and changelogs

## Feature Usage Guidelines

This template provides many features to make development easier. However, not all features are necessary for every project. Below are recommendations on when to use each one:

### Routing (React Router)

- Use for multi-page or multi-route apps.
- If building a simple single-page app, you can remove or reduce routing complexity.
- Named routing works best for SEO or when you need route-based metadata (e.g., dynamic blog pages).

### SEO with PageHelmet

- Ideal for public-facing apps that need search engine visibility.
- In small internal tools, you can remove it if SEO is not required.

### Mock Service Worker (MSW)

- Use when you need to mock or simulate API requests during development or tests.
- If your app has no API calls or you have full backend coverage from the start, MSW can be removed.

### Theme System (Dark/Light Modes)

- Applies consistent styles across the app and allows easy theme switching.
- If the project does not require a dark mode or theme customization, you can remove the `ThemeContext` and simplify the CSS variables.

### Breadcrumbs

- Helpful if you have nested routes or want users to navigate deeper pages more easily.
- Can be removed for flat or very simple navigation structures.

### Lazy Loading

- Improves performance by splitting code into smaller chunks.
- Recommended for larger apps, but can be skipped in small projects with minimal code.

### MSW Initialization Command

- If you use MSW to intercept requests at path `'/'`, you must run:
  ```
  npx msw init ./public --save
  ```
  once for each new project or whenever you re-create the `/public` folder.

## Getting Started

### Installation

1. Clone this template:

   ```bash
   git clone https://github.com/rubrion/web-client-template.git my-project
   cd my-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```markdown
# Vite + React + TypeScript Template with ESLint & Prettier

This template provides a consistent starting point for frontend projects built with Vite, React, and TypeScript. It integrates ESLint and Prettier to enforce code quality and style consistency across multiple development environments.
```

## How to Use

1. **Clone the Template**:

   ```bash
   git clone <template-repo-url> my-new-project
   cd my-new-project
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

4. **Build the Project**:

   ```bash
   npm run build
   ```

5. **Preview the Production Build**:

   ```bash
   npm run preview
   ```

6. **Lint the Project**:

   ```bash
   npm run lint
   ```

7. **Fix Linting Issues**:

   ```bash
   npm run lint:fix
   ```

8. **Format the Codebase**:

   ```bash
   npm run format
   ```

9. **Check Code Formatting**:

   ```bash
   npm run format:check
   ```

10. **Run Unit Tests**:

    ```bash
    npm run test
    ```

11. **Generate Coverage Reports**:

    ```bash
    npm run test:coverage
    ```

12. **Open Vitest UI**:

    ```bash
    npm run test:ui
    ```

## Release and Deployment

This project includes a comprehensive CI/CD pipeline for releases and deployments. For detailed information about the release process, see [PIPELINE.md](./PIPELINE.md).

### Main Branch Initialization

When starting a new project with an empty main branch:

```bash
npm run init-main
```

This will initialize the main branch from your develop branch, allowing the deployment pipeline to function properly.

### Release Process

1. Make your changes on the develop branch
2. The CI pipeline automatically creates release branches with semantic versioning
3. To manually release a new version:
   ```bash
   npm run release
   ```
4. To create a distributable package:
   ```bash
   npm run package
   ```
   This creates a `release.zip` file containing the built application

### Promoting Pre-releases to Production

Use the GitHub Actions workflow "Promote Release to Production" to merge a release branch into main, triggering production deployment.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Create a production-ready build.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Lint the codebase using ESLint.
- **`npm run lint:fix`**: Automatically fix linting issues where possible.
- **`npm run format`**: Format the codebase with Prettier.
- **`npm run format:check`**: Check if the codebase is properly formatted.
- **`npm run test`**: Run all unit tests with Vitest.
- **`npm run test:coverage`**: Generate a coverage report for the tests.
- **`npm run test:ui`**: Open the Vitest UI for managing and running tests interactively.
- **`npm run setup`**: Set up editor configurations and git hooks for consistent code formatting.
- **`npm run init-main`**: Initialize and sync the main branch from develop branch.
- **`npm run release`**: Create a new release with proper versioning and changelog updates.
- **`npm run package`**: Build the project and create a ZIP archive for distribution.

## Setting up Blackbox for File Encryption

To securely encrypt sensitive files in this project using **StackExchange Blackbox**, follow these steps:

#### 1. Install `BlackBox`

You can automatically install StackExchange Blackbox via the following commands:

```bash
git clone https://github.com/StackExchange/blackbox.git
cd blackbox
sudo make copy-install
```

This will copy the necessary files into `/usr/local/bin`.

#### 2. Obtain the Encoded GPG Keys

The **public** and **private** Base64-encoded GPG keys are stored in the repository's "Secrets."
Ask the project maintainer to share the keys with you if you do not have access yet.

You will receive:

- A **Base64-encoded public key**
- A **Base64-encoded private key**

#### 3. Import the Public Key

Once you receive the **Base64-encoded public key**, use the following command to decode and import it:

```bash
echo "base64_encoded_public_key" | base64 --decode | gpg --import
```

- Replace `base64_encoded_public_key` with the actual Base64-encoded string of the public key.

#### 4. Import the Private Key

After importing the public key, you'll also need to import the **private key** for decryption purposes. To do that, use the following command:

```bash
echo "base64_encoded_private_key" | base64 --decode | gpg --import
```

- Replace `base64_encoded_private_key` with the actual Base64-encoded string of the private key.

#### 5. Verify the Import

You can verify if both keys were successfully imported with the following command:

```bash
gpg --list-secret-keys
```

This will list the GPG keys on your system, and you should see both the public and private key associated with your GPG email.

#### 6. Decrypt Files with `BlackBox`

With both the public and private keys imported, you can now decrypt the files in your project:

```bash
blackbox_decrypt_all_files
```

This command will decrypt all files that were encrypted with Blackbox, using your imported GPG keys.
