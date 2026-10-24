# Contributing to Device Intelligence

Thank you for your interest in contributing to **Device Intelligence**! We welcome contributions from developers, designers, translators, and security researchers of all skill levels.

This guide will help you get started with setting up your local development environment, understanding our project conventions, and submitting your contributions.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Adding Translations (i18n)](#adding-translations-i18n)
  - [Submitting Code Changes](#submitting-code-changes)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation & Running Locally](#installation--running-locally)
- [Development Guidelines](#development-guidelines)
  - [Code Quality & Tooling](#code-quality--tooling)
  - [Privacy & Security Principles](#privacy--security-principles)
  - [Internationalization (i18n) Rules](#internationalization-i18n-rules)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful, considerate, and constructive in all interactions, issues, and pull request discussions.

---

## How Can I Contribute?

### Reporting Bugs

If you discover a bug, unexpected behavior, or browser incompatibility:

1. **Check existing issues** to see if the problem has already been reported.
2. **Open a new issue** with a clear title and description.
3. **Include helpful context**:
   - Operating system and version (e.g., Ubuntu 24.04, macOS Sonoma, Windows 11).
   - Browser name and exact version (e.g., Chrome 124, Firefox 125, Safari 17).
   - Steps to reproduce the problem.
   - Screenshots, screen recordings, or browser console errors if applicable.

### Suggesting Enhancements

Ideas for new forensic metrics, privacy audits, visualizations, or UX improvements are welcome! Please open an issue describing:

- The motivation and use case for the feature.
- Expected behavior and potential user experience.
- Any relevant web APIs, specifications, or external libraries.

### Adding Translations (i18n)

Device Intelligence supports multiple languages via `next-intl`. If you speak a language that is not yet supported or notice translation improvements:

1. Check existing dictionaries in `messages/` (`en.json`, `fr.json`, `es.json`).
2. Add or refine keys adhering to the established JSON structure.
3. If introducing a new language, update `src/i18n/routing.ts` to register the new locale.

### Submitting Code Changes

Whether you are fixing a bug or building a feature, please follow the [Development Setup](#development-setup) and [Pull Request Process](#pull-request-process) outlined below.

---

## Development Setup

### Prerequisites

- **Node.js**: `v20.x` or later (LTS recommended)
- **Package Manager**: [pnpm](https://pnpm.io/) (`v9.x` or later) is recommended:
  ```bash
  npm install -g pnpm
  ```

### Installation & Running Locally

1. **Fork and clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/device-intelligence.git
   cd device-intelligence
   ```

2. **Install project dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file based on the default configuration:

   ```bash
   cp .env .env.local
   ```

   | Variable | Description | Default |
   | :--- | :--- | :--- |
   | `NEXT_PUBLIC_SERVER_URL` | Canonical origin for SEO and OpenGraph metadata | `http://localhost:3000` (in dev) |
   | `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Optional analytics ID | Optional |
   | `SERWIST_SUPPRESS_TURBOPACK_WARNING` | Suppresses Turbopack notices with Serwist | `1` |

4. **Start the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Guidelines

### Code Quality & Tooling

Always verify your changes before opening a pull request by running the verification scripts:

| Command | Purpose |
| :--- | :--- |
| `pnpm format` | Formats all code with Prettier and sorts Tailwind CSS classes |
| `pnpm lint` | Runs ESLint 9 checks across TypeScript and React components |
| `pnpm typecheck` | Validates TypeScript types across the entire project |
| `pnpm build` | Ensures the production bundle compiles successfully |

### Privacy & Security Principles

> [!IMPORTANT]
> **Client-Side Execution Only**  
> Device Intelligence is an educational and diagnostic tool. Under no circumstances should user data, IP addresses, or device signatures be transmitted, stored, or profiled on external servers without explicit, transparent user consent.

- All forensic extraction must execute within the visitor's local browser context.
- Keep dependencies lean and audit potential supply-chain vulnerabilities.

### Internationalization (i18n) Rules

- Never hardcode user-facing strings directly in components or pages.
- Use `useTranslations` (client-side) or `getTranslations` (server-side) from `next-intl`.
- Keep translation keys synchronized between `messages/en.json`, `messages/fr.json`, and `messages/es.json`.

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```text
<type>(<optional scope>): <description>
```

### Allowed Types

- `feat`: A new feature or functionality
- `fix`: A bug fix
- `docs`: Documentation changes only (e.g., README, CHANGELOG, code comments)
- `style`: Changes that do not affect code meaning (formatting, whitespace)
- `refactor`: Code refactoring without fixing bugs or adding features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates, configuration tweaks

### Examples

- `feat(fingerprint): add latency indicator to SDK test view`
- `fix(i18n): correct Spanish navigation link paths`
- `docs: update setup steps in CONTRIBUTING.md`
- `refactor(explorer): extract export actions into separate hook`

---

## Pull Request Process

1. **Create a topic branch** from `master`:
   ```bash
   git checkout -b feature/my-awesome-feature
   # or
   git checkout -b fix/issue-description
   ```

2. **Implement your changes**:
   - Write clean, documented, and type-safe code.
   - Follow existing patterns and component architecture.

3. **Verify locally**:
   ```bash
   pnpm format
   pnpm lint
   pnpm typecheck
   pnpm build
   ```

4. **Push your branch and open a Pull Request**:
   - Give your PR a clear, descriptive title following Conventional Commits.
   - Describe the changes made and the problem being solved.
   - Attach screenshots or GIFs for UI/UX modifications.
   - Reference any related issues (e.g., `Closes #12`).

5. **Review & Iterate**:
   - Maintainers will review your submission and may suggest revisions.
   - Once approved, your PR will be squash-merged into `master`.
