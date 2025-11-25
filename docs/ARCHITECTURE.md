# Architecture

Este documento explica la arquitectura técnica del proyecto Cheatcodes.

## Visión General

```
┌─────────────────────────────────────────────────────────────┐
│                         Usuario                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Nuxt 4 Application                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                      Pages                            │  │
│  │  • index.vue - Lista de cheatcodes                   │  │
│  │  • cheatcodes/[id].vue - Preview + Download          │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Components                          │  │
│  │  • CheatsheetLayout - Layout principal               │  │
│  │  • CheatsheetHeader - Metadata y título              │  │
│  │  • CheatsheetSection - Secciones individuales        │  │
│  │  • CheatsheetCodeBlock - Código + Shiki              │  │
│  │  • CheatsheetTable - Tablas                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│                            ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Composables                         │  │
│  │  • useCodeHighlight - Shiki wrapper                  │  │
│  │  • useHTMLTemplate - HTML para PDF                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Routes (Nitro)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  GET  /api/cheatcodes          - Lista todos         │  │
│  │  GET  /api/cheatcodes/:id      - Obtiene uno         │  │
│  │  POST /api/generate-pdf        - Genera PDF          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    Content Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • content/javascript/index.ts                       │  │
│  │  • content/vue/index.ts                              │  │
│  │  • content/index.ts (export central)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  • Puppeteer - PDF Generation                        │  │
│  │  • Shiki - Syntax Highlighting                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Frontend

**Nuxt 4** (v3.20.1)
- Framework Vue.js con SSR/SSG capabilities
- File-based routing
- Auto-imports de componentes y composables
- Estructura: Todo en `/app` (Nuxt 4 standard)

**Vue 3** (v3.5.24)
- Composition API con `<script setup>`
- Reactivity con `ref()` y `reactive()`
- Lifecycle hooks (`onMounted`, etc.)

**Tailwind CSS v4** (v4.1.17)
- Utility-first CSS framework
- ⚠️ **Configuración especial**: Via `@tailwindcss/vite` (NO `@nuxtjs/tailwindcss`)
- Import directo: `@import "tailwindcss"`
- Sin archivo `tailwind.config.js`

### Backend

**Nitro** (v2.12.9)
- Server engine de Nuxt
- API routes con file-based routing
- Soporte para múltiples deployment targets

**Puppeteer** (v23.11.1)
- Headless Chromium para PDF generation
- Renderiza HTML/CSS exactamente como en browser
- Configuración para A4 format con márgenes

### Tooling

**Vite** (v7.2.4)
- Build tool y dev server
- Hot Module Replacement (HMR)
- Plugin de Tailwind integrado

**TypeScript** (v5.9.3)
- Type safety en todo el proyecto
- Interfaces para cheatcodes
- Auto-completion en IDE

**pnpm** (v9.0.0)
- Package manager rápido y eficiente
- Symlinks para ahorrar espacio en disco

**Shiki** (v3.15.0)
- Syntax highlighter basado en VSCode
- Soporte para múltiples lenguajes
- Tema: `github-dark`

## Flujo de Datos

### 1. Carga de Cheatcode (GET)

```
User Request
    │
    ▼
pages/index.vue
    │
    ├─► useFetch('/api/cheatcodes')
    │       │
    │       ▼
    │   server/api/cheatcodes/index.get.ts
    │       │
    │       ├─► getAllCheatcodes()
    │       │       │
    │       │       ▼
    │       │   content/index.ts
    │       │       │
    │       │       └─► Returns metadata[]
    │       │
    │       └─► Returns JSON
    │
    └─► Renders list with metadata
```

### 2. Preview de Cheatcode (GET específico)

```
User clicks cheatcode
    │
    ▼
pages/cheatcodes/[id].vue
    │
    ├─► useFetch('/api/cheatcodes/react')
    │       │
    │       ▼
    │   server/api/cheatcodes/[id].get.ts
    │       │
    │       ├─► getCheatcode('react')
    │       │       │
    │       │       ▼
    │       │   content/index.ts
    │       │       │
    │       │       └─► Returns Cheatcode object
    │       │
    │       └─► Returns JSON
    │
    └─► Renders with CheatsheetLayout
            │
            ├─► CheatsheetHeader (metadata)
            │
            └─► CheatsheetSection[] (content)
                    │
                    ├─► CheatsheetCodeBlock (code + Shiki)
                    ├─► CheatsheetTable (tables)
                    └─► etc.
```

### 3. Generación de PDF (POST)

```
User clicks "Download PDF"
    │
    ▼
generatePDF() in [id].vue
    │
    ├─► Get HTML from cheatsheetRef
    │
    ├─► createPDFHTML(innerHTML)
    │       │
    │       └─► Wraps with <!DOCTYPE>, <html>, CSS, etc.
    │
    ▼
$fetch('/api/generate-pdf', { html })
    │
    ▼
server/api/generate-pdf.post.ts
    │
    ├─► puppeteer.launch()
    │
    ├─► page.setContent(html)
    │
    ├─► page.pdf({ format: 'A4', ... })
    │
    ├─► browser.close()
    │
    └─► Returns PDF Buffer
        │
        ▼
    Browser downloads PDF
```

## Decisiones de Diseño

### 1. ¿Por qué Nuxt 4 en lugar de Vue puro?

✅ **Ventajas**:
- SSR/SSG out of the box
- File-based routing automático
- API routes integradas (Nitro)
- Auto-imports (menos boilerplate)
- SEO-friendly

### 2. ¿Por qué Tailwind v4 con Vite en lugar de @nuxtjs/tailwindcss?

✅ **Ventajas**:
- Configuración más limpia y moderna
- Menos dependencias
- Mejor integración con Vite
- Requisito específico del usuario

### 3. ¿Por qué Puppeteer en lugar de jsPDF?

✅ **Ventajas Puppeteer**:
- Fidelidad visual 100% (lo que ves es lo que obtienes)
- Soporta CSS moderno (Flexbox, Grid, etc.)
- Maneja fuentes y emojis correctamente
- No requiere reescribir diseño

❌ **Desventajas**:
- Más pesado (descarga Chromium)
- Más lento que jsPDF
- Requiere servidor (no funciona client-side)

### 4. ¿Por qué TypeScript para contenido?

✅ **Ventajas**:
- Type safety (evita errores)
- Autocompletado en IDE
- Refactoring seguro
- Validación en tiempo de desarrollo

### 5. ¿Por qué Shiki en lugar de Prism/Highlight.js?

✅ **Ventajas**:
- Colores idénticos a VSCode
- Más lenguajes soportados
- Mejor tokenización
- No requiere CSS adicional

## Patrones de Código

### Composables

Los composables siguen el patrón de Vue 3:

```typescript
// composables/useCodeHighlight.ts
export const useCodeHighlight = () => {
  const highlightCode = async (code: string, lang: string) => {
    // Implementation
  }

  return {
    highlightCode,  // ✅ Retorna funciones/valores
  }
}

// Uso en componente
const { highlightCode } = useCodeHighlight()
```

### Componentes

Todos los componentes usan `<script setup>`:

```vue
<script setup lang="ts">
import type { CodeExample } from '~/types/cheatcode'

const props = defineProps<{
  code: CodeExample
}>()

// Logic aquí
</script>

<template>
  <!-- Template aquí -->
</template>
```

### API Routes

Siguen el patrón de Nitro:

```typescript
// server/api/example.get.ts
export default defineEventHandler((event) => {
  // GET /api/example
  return { data: 'value' }
})

// server/api/example.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // POST /api/example
  return { success: true }
})
```

## Performance

### Optimizaciones Implementadas

1. **Code Splitting automático** - Nuxt hace lazy loading de páginas
2. **Tree Shaking** - Vite elimina código no usado
3. **Async Syntax Highlighting** - Shiki se carga en `onMounted()`
4. **Static Imports** - Contenido en TypeScript (no runtime fetch)

### Áreas de Mejora

1. **PDF Caching** - Cache PDFs generados para evitar regeneración
2. **Image Optimization** - Optimizar assets si se agregan imágenes
3. **Component Lazy Loading** - Lazy load componentes pesados
4. **Service Worker** - Offline support con PWA

## Security

### Consideraciones

1. **XSS Prevention**:
   - `v-html` solo se usa con contenido highlighteado por Shiki (seguro)
   - No se acepta HTML del usuario

2. **PDF Generation**:
   - HTML sanitizado antes de enviar a Puppeteer
   - Puppeteer corre en sandbox mode

3. **API Routes**:
   - Validación de inputs
   - Error handling apropiado
   - No expone información sensible

## Escalabilidad

### Horizontal Scaling

El proyecto está diseñado para escalar horizontalmente:

- **Stateless** - No mantiene estado en servidor
- **PDF Generation** - Puede moverse a workers/queue
- **Content** - Puede moverse a CMS/Database

### Carga Proyectada

Con la arquitectura actual:
- **50-100 PDFs/min** por instancia
- **Infinitos reads** (contenido es estático)
- **Bottleneck**: Puppeteer (CPU-intensive)

### Solución para Alta Carga

```
┌─────────────┐
│  Nuxt App   │
└──────┬──────┘
       │
       ▼
┌─────────────┐      ┌──────────────┐
│  Queue      │─────►│  Workers     │
│  (Redis)    │      │  (Puppeteer) │
└─────────────┘      └──────────────┘
```

## Deployment

El proyecto puede ser deployado en:

1. **Vercel** - Recommended (Nuxt support)
2. **Netlify** - Con Nitro preset
3. **Node.js Server** - Tradicional
4. **Docker** - Containerizado

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para detalles.

---

**Siguiente**: [COMPONENTS.md](./COMPONENTS.md) - Documentación de componentes
