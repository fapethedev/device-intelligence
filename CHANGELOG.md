# Changelog

All notable changes to the **Device Intelligence** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - 2026-10-24

### ✨ New Features

- **Fingerprint Pro SDK Playground**: Added an interactive testing sandbox (`/fingerprint`) powered by `@fingerprint/react`. Allows users to evaluate visitor identification, event IDs, confidence scores, latency metrics, and test against regional endpoints (`US`, `EU`, `AP`).
- **Spanish Language Support (Español)**: Full internationalization for Spanish speakers, including localized system diagnostic dictionaries and route mappings (`/es/acerca-de`).
- **PWA Installation Experience**: Added a dedicated Progressive Web App installation prompt with dynamic desktop and mobile workflows, including custom step-by-step guidance for iOS Safari users.
- **Offline Readiness**: Integrated Serwist service worker lifecycle management for seamless caching, asset persistence, and offline usability.
- **Privacy Analytics Integration**: Embedded Vercel Analytics and Speed Insights to measure performance with privacy-first standards.

### 🔧 Improvements

- **Layout Script Loading**: Optimized script execution flow in root layout to prevent hydration blocking.
- **Dependency & Security Upgrades**: Updated core HTTP handling and CSS parsing packages to their latest secure releases.

### 🐛 Bug Fixes

- Resolved layout rendering glitches when toggling theme states during PWA offline transitions.

---

## [v2026.3.1.0] - 2026-04-23

### 🐛 Bug Fixes

- **Localized Navigation**: Resolved build-time routing errors caused by dynamic and non-static pathname resolution within the `next-intl` navigation wrapper.

---

## [v2026.3.0.0] - 2026-04-23

### ✨ New Features

- **Full Multi-Language Support (i18n)**: Integrated `next-intl` with full TypeScript type safety, introducing initial support for English (`en`) and French (`fr`).
- **Interactive Language Switcher**: Added a responsive locale selector in the navigation bar for instant language switching without state loss.
- **Localized Web Manifest & Metadata**: Generated locale-aware Web App Manifests, OpenGraph tags, and canonical alternate hreflang links for international search indexing.

### 🔧 Improvements

- **Component Architecture**: Converted the About and Home experiences to hybrid server-client components for faster initial page loads and improved SEO metadata generation.

---

## [v2026.2.0] - 2026-04-10

### ✨ New Features

- **Session Caching for Forensics**: Implemented client-side session caching for external IP geolocation queries to eliminate redundant API requests, minimize network overhead, and accelerate re-scans.

### 🔧 Improvements

- **Modular Explorer Architecture**: Refactored the core forensic engine into dedicated custom hooks (`useForensics`, `useExport`, `useShare`) and modular UI cards for better maintainability and performance.
- **Next.js Engine Upgrade**: Upgraded to the latest Next.js release with Turbopack optimizations.

---

## [vReady] - 2026-04-10

### ✨ New Features

- **Device Intelligence Scanner**: Launched the core diagnostic platform using ClientJS for comprehensive client-side fingerprinting and hardware analysis.
- **System & Hardware Telemetry**:
  - Operating system, architecture, kernel version, and CPU profile detection.
  - Display metrics analysis: resolution, viewport area, color depth, and pixel density (XDPI / YDPI).
  - Browser engine, user agent parser, installed plugins, and MIME types.
  - Storage and environment auditing (Cookies, LocalStorage, SessionStorage).
- **Network Forensics & Live Map**: Real-time public IP resolution, ISP/ASN lookup, and live geographic coordinate mapping using Leaflet.
- **Multi-Format Export Engine**: One-click export capabilities to JSON, Markdown, plain text, printable PDF (jsPDF), and screenshot image (html2canvas).
- **Social Sharing**: Share diagnostic reports directly via web share or copyable links.
- **Glassmorphic Design & Dark Mode**: Responsive UI built with Tailwind CSS, shadcn/ui, Radix UI primitives, and `next-themes`.
