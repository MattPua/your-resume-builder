# 📄 Private & Free Resume Builder

A professional, privacy-first resume builder that runs 100% in your browser. Focus on your content while we handle the professional layout. No more fighting with MS Word formatting or Canva templates.

## ✨ Features

- **🔒 100% Private & Secure**: No data ever leaves your browser. Nothing is uploaded to a server. We don't collect, see, or store any of your personal information.
- **⚡ Content-First Approach**: Simply fill out your details (Experience, Education, Skills, etc.) and the layout is generated automatically.
- **📄 High-Quality PDF Export**: Download a professional, multi-page PDF. Your contact header is automatically repeated on every page for a consistent look.
- **💾 Auto-Saving**: Your changes are automatically saved to your browser so you can pick up right where you left off.
- **📂 Backup & Transfer**: Export your resume data to a local file for backup or to move it between devices. Import it back anytime.
- **🎨 Modern Customization**: Choose from professional fonts (Sans Serif, Serif, Mono), adjust colors, and reorder sections with drag-and-drop.
- **📱 Responsive & Accessible**: Optimized for both desktop and mobile use with full accessibility support.

## 🚀 Getting Started for Developers

This project is built with **React**, **Next.js (TanStack Start)**, **Tailwind CSS**, and **Shadcn UI**.

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed.

### Installation

```bash
bun install
```

### Running Locally

To start the development server:

```bash
bun --bun run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
bun --bun run build
```

## 🛠 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas-pro](https://github.com/niklasvh/html2canvas)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown)

## 📁 Project Structure

- `src/components/`: Reusable UI components and section editors.
- `src/components/preview/`: Resume preview logic and PDF export handling.
- `src/hooks/`: Custom hooks for local storage and resume actions.
- `src/types/`: TypeScript interfaces for resume data.
- `src/routes/`: Application routing and page structure.
- `src/styles.css`: Global styles and Tailwind imports.

## 📜 License

This project is free to use and open for contributions. All your data remains private and resides only on your local machine.
