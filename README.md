# Cheatcodes - Programming Language Cheatsheet Generator

Generate professional PDF cheatsheets for popular programming languages using Nuxt 4, Tailwind CSS v4, and Puppeteer.

## Features

- 🎨 Modern, clean design with Tailwind CSS v4
- 📄 High-fidelity PDF generation with Puppeteer
- 🎯 Syntax highlighting with Shiki
- 📱 Responsive preview interface
- 🚀 Fast development with Nuxt 4
- 📦 Individual PDFs for each language

## Tech Stack

- **Nuxt 4** - Vue.js framework
- **Tailwind CSS v4** - Utility-first CSS (via @tailwindcss/vite)
- **Puppeteer** - Headless browser for PDF generation
- **Shiki** - Syntax highlighting
- **TypeScript** - Type safety
- **pnpm** - Package manager

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
cheatcodes/
├── app/
│   └── assets/
│       └── css/
│           └── main.css          # Tailwind CSS imports
├── components/
│   └── cheatsheet/               # Cheatsheet components
│       ├── CheatsheetLayout.vue
│       ├── CheatsheetHeader.vue
│       ├── CheatsheetSection.vue
│       ├── CheatsheetCodeBlock.vue
│       └── CheatsheetTable.vue
├── composables/
│   └── useCodeHighlight.ts      # Shiki syntax highlighting
├── content/                      # Cheatcode content files
│   ├── javascript/
│   │   └── index.ts
│   ├── vue/
│   │   └── index.ts
│   └── index.ts                 # Export all cheatcodes
├── pages/
│   ├── index.vue                # Home page with cheatcode list
│   └── cheatcodes/
│       └── [id].vue             # Cheatcode preview & PDF download
├── server/
│   └── api/
│       ├── generate-pdf.post.ts  # PDF generation endpoint
│       └── cheatcodes/
│           ├── index.get.ts      # List all cheatcodes
│           └── [id].get.ts       # Get single cheatcode
├── types/
│   └── cheatcode.ts             # TypeScript types
└── nuxt.config.ts               # Nuxt configuration
```

## Adding New Cheatcodes

1. Create a new folder in `content/` (e.g., `content/react/`)
2. Create an `index.ts` file with your cheatcode data following the `Cheatcode` type
3. Import and add it to `content/index.ts`

Example:

```typescript
// content/react/index.ts
import type { Cheatcode } from '~/types/cheatcode'

export const reactCheatcode: Cheatcode = {
  metadata: {
    id: 'react',
    title: 'React',
    language: 'React',
    version: '18.x',
    description: 'React hooks and patterns',
    lastUpdated: '2024-11-21',
    icon: '⚛️',
    color: '#61DAFB',
  },
  sections: [
    // Add your sections here
  ],
}
```

## PDF Generation

The PDF generation uses Puppeteer to render the HTML with full CSS support. The process:

1. User clicks "Download PDF" on a cheatcode page
2. Frontend sends the rendered HTML to `/api/generate-pdf`
3. Puppeteer converts it to a high-quality PDF with A4 format
4. PDF is downloaded to the user's device

## Available Languages

Currently available cheatcodes:

- JavaScript (ES2024)
- Vue 3

Coming soon:
- HTML
- CSS
- Nuxt
- React
- Next.js
- PHP

## License

MIT
