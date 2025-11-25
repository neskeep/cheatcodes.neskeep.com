# CLAUDE.md - Project Context

> **Propósito**: Este archivo contiene el contexto completo del proyecto para mantener continuidad en futuras sesiones de Claude Code.

## Resumen Ejecutivo

**Nombre del Proyecto**: Cheatcodes
**Descripción**: Plataforma web de cheatsheets (hojas de referencia) para lenguajes de programación
**Stack Principal**: Nuxt 4, Tailwind CSS v4, TypeScript, Shiki
**Package Manager**: pnpm
**Estado**: Funcional - Plataforma web con múltiples cheatcodes

## Objetivo del Proyecto

Crear una plataforma web moderna y fácil de usar para consultar cheatsheets de diferentes lenguajes de programación, con diseño limpio y syntax highlighting de alta calidad.

## Arquitectura

### Stack Tecnológico

1. **Nuxt 4** (v4.2.1)
   - Framework Vue.js para SSR/SSG
   - Estructura: Todo dentro de `/app` (estándar de Nuxt 4)

2. **Tailwind CSS v4** (v4.x)
   - **IMPORTANTE**: Usando `@tailwindcss/vite` (NO `@nuxtjs/tailwindcss`)
   - Configuración via Vite plugin
   - Import: `@import "tailwindcss"` en CSS (no directivas @tailwind)

3. **Shiki** (v3.15.0)
   - Syntax highlighting de código
   - Tema: `github-dark`

4. **TypeScript** (v5.9.3)
   - Type safety en todo el proyecto

### Estructura de Carpetas

```
cheatcodes/
├── app/                          # TODO dentro de /app (Nuxt 4)
│   ├── app.vue                   # Punto de entrada
│   ├── assets/
│   │   └── css/
│   │       └── main.css         # Tailwind v4: @import "tailwindcss"
│   ├── components/
│   │   └── cheatsheet/          # Componentes del layout
│   │       ├── CheatsheetLayout.vue
│   │       ├── CheatsheetHeader.vue
│   │       ├── CheatsheetSection.vue
│   │       ├── CheatsheetCodeBlock.vue (con Shiki)
│   │       └── CheatsheetTable.vue
│   ├── composables/
│   │   └── useCodeHighlight.ts  # Wrapper de Shiki
│   ├── pages/
│   │   ├── index.vue            # Lista de cheatcodes
│   │   └── cheatcodes/
│   │       └── [id].vue         # Vista de cheatcode individual
│   └── types/
│       └── cheatcode.ts         # TypeScript interfaces
├── content/                      # Contenido de cheatcodes
│   ├── javascript/
│   │   └── index.ts
│   ├── vue/
│   │   └── index.ts
│   ├── css/
│   │   └── index.ts
│   ├── html/
│   │   └── index.ts
│   └── index.ts                 # Export central
├── server/
│   └── api/
│       └── cheatcodes/
│           ├── index.get.ts     # Lista todos
│           └── [id].get.ts      # Get uno específico
├── public/                       # Assets estáticos
├── nuxt.config.ts               # Config con Tailwind Vite plugin
├── package.json                 # pnpm como package manager
├── CLAUDE.md                    # Este archivo
└── README.md                    # README público
```

## Decisiones Técnicas Importantes

### 1. Tailwind CSS v4 con Vite
**Por qué**: El usuario específicamente pidió NO usar `@nuxtjs/tailwindcss`, sino la configuración directa con Vite.

**Configuración**:
```typescript
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

```css
/* app/assets/css/main.css */
@import "tailwindcss";
```

**NO** usar:
- `tailwind.config.js` (no es necesario en v4)
- `@tailwind base/components/utilities` (antigua sintaxis)
- `@nuxtjs/tailwindcss` module

### 2. Estructura en /app
**Por qué**: Nuxt 4 recomienda todo dentro de `/app` para mejor organización.

### 3. Contenido en TypeScript
**Por qué**: Type safety y autocompletado. Fácil de mantener y escalar.

## Tipos de Datos Principales

```typescript
// Metadata del cheatcode
interface CheatcodeMetadata {
  id: string
  title: string
  language: string
  version?: string
  description: string
  lastUpdated: string
  icon?: string
  color?: string
}

// Sección individual
interface CheatcodeSection {
  id: string
  title: string
  type: 'text' | 'code' | 'table' | 'list'
  content?: string
  items?: string[]
  code?: CodeExample
  table?: ContentTable
  subsections?: CheatcodeSection[]
}

// Cheatcode completo
interface Cheatcode {
  metadata: CheatcodeMetadata
  sections: CheatcodeSection[]
}
```

## Comandos

```bash
# Desarrollo
pnpm install      # Instalar dependencias
pnpm dev          # http://localhost:3000

# Build
pnpm build        # Build producción
pnpm preview      # Preview del build

# Otros
pnpm generate     # Static site generation
```

## Estado Actual

### Completado
- [x] Setup Nuxt 4 con estructura correcta
- [x] Tailwind CSS v4 con @tailwindcss/vite
- [x] Shiki para syntax highlighting
- [x] Sistema de tipos TypeScript
- [x] Componentes Vue reutilizables
- [x] API routes para datos
- [x] UI responsive con lista y preview
- [x] Múltiples cheatcodes: JavaScript, Vue 3, CSS, HTML, Accessibility

### Por Hacer
- [ ] Más cheatcodes: React, Next, Nuxt, PHP, etc.
- [ ] Búsqueda de contenido
- [ ] Filtros por categoría/lenguaje
- [ ] Favoritos/bookmarks
- [ ] Modo oscuro
- [ ] Optimizaciones de performance
- [ ] Tests (unit + e2e)
- [ ] CI/CD
- [ ] Deployment

## Cómo Agregar un Nuevo Cheatcode

1. Crear carpeta en `content/{nombre}/`
2. Crear `index.ts` con estructura `Cheatcode`
3. Importar y exportar desde `content/index.ts`

Ejemplo:
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
    // Tu contenido aquí
  ],
}

// content/index.ts
import { reactCheatcode } from './react'

export const cheatcodes: CheatcodeList = {
  // ...
  react: reactCheatcode,
}
```

## Problemas Conocidos

1. **Errores de #app-manifest**: Ignorables, Nuxt los maneja internamente

## Referencias Importantes

- Tailwind v4 con Nuxt: https://tailwindcss.com/docs/installation/framework-guides/nuxt
- Nuxt 4 docs: https://nuxt.com/docs
- Shiki: https://shiki.style/

## Última Actualización

**Fecha**: 2025-11-25
**Estado**: Plataforma web funcional (sin generación de PDF)
**Servidor**: Corriendo en http://localhost:3000

## Notas para Futuras Sesiones

1. **NUNCA** usar `@nuxtjs/tailwindcss` - siempre `@tailwindcss/vite`
2. **TODO** debe estar en `/app` (no en raíz)
3. Usar `pnpm`, no `npm`
4. Shiki se carga async en `onMounted()` para mejor performance
5. **NO hay generación de PDF** - es una plataforma web pura
