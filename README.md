# Device Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-16.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Device Intelligence** is a cutting-edge browser fingerprinting and system analysis tool built with Next.js 16 and React 19. It allows users to explore the depths of their browser's identity, detect fingerprinting vulnerabilities, and analyze system-level metadata in real-time.

---

## Key Features

- **Deep System Scan:** Analyze the kernel, OS version, and underlying software libraries.
- **Network Forensics:** Integrated IP geolocation, ISP detection, and detailed network analysis with interactive maps.
- **Privacy Audit:** Real-time verification of browser fingerprinting vulnerabilities and cookie security.
- **Advanced Metadata:** Extraction of detailed browser specifications (User-Agent, Canvas fingerprinting, AudioContext, etc.).
- **Export Capabilities:** Save your system scan results as PDF or high-resolution images.
- **PWA Ready:** Installable on desktop and mobile with offline support via Serwist.
- **Dynamic Themes:** Full support for dark and light modes with a polished glassmorphism UI.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** [Motion (Framer Motion)](https://motion.dev/)
- **PWA:** [Serwist/Next](https://serwist.pages.dev/)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Fingerprinting:** [ClientJS](https://clientjs.org/)
- **Maps:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Exports:** [jspdf](https://parall.ax/products/jspdf), [html2canvas](https://html2canvas.hertzen.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [pnpm](https://pnpm.io/) (Recommended) or `npm` / `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fapethedev/device-intelligence.git
   cd device-intelligence
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Scripts

- `pnpm dev`: Start development server with Turbopack.
- `pnpm build`: Create a production build.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run ESLint checks.
- `pnpm format`: Format code with Prettier.
- `pnpm typecheck`: Run TypeScript compiler checks.

---

## Project Structure

```text
src/
├── app/          # Next.js App Router (pages, actions, layouts)
├── components/   # React components (UI, layout, features)
│   ├── ui/       # shadcn/ui shared components
│   └── layout/   # Navbar, Footer, etc.
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and shared logic
public/       # Static assets (icons, manifest)
```

---

## Security & Privacy

This tool is designed for **informational and educational purposes only**. It helps developers and privacy-conscious users understand how much data is exposed by modern browsers. **Device Intelligence** does not store any personal data on its own servers unless explicitly configured by the user.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Developed with ❤️ by [fapethedev](https://github.com/fapethedev)

## Contact

- Email [@fapethedev](mailto:mpetrivlin@gmail.com)
- LinkedIn [@fapethedev](https://www.linkedin.com/in/abiola-fatigba-a0532a27b/)
