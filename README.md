<div align="center">

# 🍵 Matcha Log

**A minimal personal tracker for your matcha tin collection.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://matcha-log-zeta.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
<img width="1901" height="963" alt="Screenshot 2026-03-26 114650" src="https://github.com/user-attachments/assets/5e6ea4f8-77b6-4740-b702-47e65c860748" />

</div>

---

## ✨ Overview

Matcha Log is a single-page React application for matcha enthusiasts who want to catalog their collection. Log your matcha tins with a name and rating, sort your list, and come back to it anytime — your data persists automatically in the browser.

The UI takes inspiration from Japanese minimalism, with a warm off-white background, matcha green accents, and smooth GSAP-powered animations throughout.

---

## 🎯 Features

- **Add matcha tins** — record a tin by name and rating (1–5 in 0.5 increments)
- **Sortable list** — click column headers to sort by name (A–Z / Z–A) or rating (low–high / high–low), with direction toggling
- **Delete entries** — remove any tin with a trash icon, animated on exit
- **Persistent storage** — data is saved to `localStorage` so your log survives page refreshes
- **Empty state** — a friendly message when no tins have been added yet
- **GSAP animations** — staggered fade-in/slide-up on add, smooth reorder on sort, and a scale pulse on form submission

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Bundler | Vite |
| Animations | GSAP |
| Styling | CSS (Japanese-inspired minimalism) |
| Persistence | localStorage |
| Linting | ESLint |
| Deployment | Vercel |

---

## 🎨 Design System

The visual identity is built around a Japanese minimalist aesthetic:

| Token | Value | Usage |
|---|---|---|
| Background | `#FAFAF5` | Warm off-white, like matcha paper |
| Primary | `#7C9A5E` | Matcha green |
| Secondary | `#4A5D3E` | Deep matcha |
| Accent | `#D4A574` | Ceramic / warm highlight |
| Text | `#2D2D2D` | Soft black |
| Muted | `#9B9B8B` | Stone gray |

Typography uses **Noto Serif JP** for headings and system sans-serif for body text.

---

## 🗂️ Data Model

```ts
interface MatchaTin {
  id: string;
  name: string;
  rating: number; // 1–5, allows 0.5 increments
  createdAt: number;
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/NipunKushwaha-web/Matcha-Log.git

# Navigate into the project
cd Matcha-Log

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static host.

---

## 📁 Project Structure

```
Matcha-Log/
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # React components
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
├── SPEC.md              # Full product specification
└── README.md
```

---

## 📜 License

This project is open source. Feel free to fork and adapt it for your own collection-tracking needs.

---

<div align="center">
  Made with 🍵 by <a href="https://github.com/NipunKushwaha-web">Nipun Kushwaha</a>
</div>
