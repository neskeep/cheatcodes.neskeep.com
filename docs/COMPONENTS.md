# Components Documentation

Este documento detalla todos los componentes Vue del proyecto.

## Componentes de Cheatsheet

### CheatsheetLayout.vue

**Ubicación**: `app/components/cheatsheet/CheatsheetLayout.vue`

Componente principal que contiene todo el layout de un cheatcode.

#### Props

```typescript
interface Props {
  cheatcode: Cheatcode  // El cheatcode completo
}
```

#### Estructura

```vue
<CheatsheetLayout :cheatcode="cheatcode">
  <!-- Renderiza automáticamente:
    - CheatsheetHeader (metadata)
    - CheatsheetSection[] (todas las secciones)
    - Footer
  -->
</CheatsheetLayout>
```

#### Features

- Layout responsive
- Optimizado para impresión (2 columnas en PDF)
- Footer con información de generación
- Estilos print-friendly

---

### CheatsheetHeader.vue

**Ubicación**: `app/components/cheatsheet/CheatsheetHeader.vue`

Header con metadata del cheatcode (título, descripción, versión, etc.).

#### Props

```typescript
interface Props {
  metadata: CheatcodeMetadata
}
```

#### Features

- Gradient background con colores primarios
- Emoji icon display
- Versión y fecha de actualización
- Responsive

#### Ejemplo de Uso

```vue
<CheatsheetHeader :metadata="cheatcode.metadata" />
```

#### Salida Visual

```
┌─────────────────────────────────────────────┐
│  ⚡  JavaScript                              │
│  JavaScript cheatsheet covering...          │
│  Version: ES2024  |  Updated: 2024-11-21    │
└─────────────────────────────────────────────┘
```

---

### CheatsheetSection.vue

**Ubicación**: `app/components/cheatsheet/CheatsheetSection.vue`

Sección individual que renderiza diferentes tipos de contenido.

#### Props

```typescript
interface Props {
  section: CheatcodeSection
}
```

#### Tipos Soportados

| Tipo    | Renderiza                      |
|---------|--------------------------------|
| `code`  | CheatsheetCodeBlock            |
| `table` | CheatsheetTable                |
| `list`  | Lista HTML `<ul>`              |
| `text`  | Párrafo de texto               |

#### Features

- Auto-detecta el tipo de sección
- Soporte para subsecciones recursivas
- Break-inside-avoid para PDFs
- Border decorativo en título

#### Ejemplo de Uso

```vue
<CheatsheetSection :section="section" />
```

---

### CheatsheetCodeBlock.vue

**Ubicación**: `app/components/cheatsheet/CheatsheetCodeBlock.vue`

Bloque de código con syntax highlighting via Shiki.

#### Props

```typescript
interface Props {
  code: CodeExample  // { title, code, language, description }
}
```

#### Features

- **Syntax highlighting** con Shiki
- Tema: `github-dark`
- Loading state mientras carga Shiki
- Responsive con scroll horizontal
- Print-friendly (word-wrap en PDF)
- Font monospace (JetBrains Mono, Fira Code, etc.)

#### Lenguajes Soportados

Shiki soporta 100+ lenguajes:
- `javascript`, `typescript`
- `vue`, `html`, `css`
- `python`, `php`, `ruby`
- `bash`, `json`, `yaml`
- Y muchos más...

#### Ejemplo de Uso

```vue
<CheatsheetCodeBlock
  :code="{
    title: 'Basic Function',
    code: 'function hello() { return \"Hello!\" }',
    language: 'javascript'
  }"
/>
```

#### Ciclo de Vida

```
1. onMounted() →
2. useCodeHighlight() →
3. Shiki highlights code →
4. v-html renders highlighted HTML
```

---

### CheatsheetTable.vue

**Ubicación**: `app/components/cheatsheet/CheatsheetTable.vue`

Tabla HTML estilizada para mostrar datos tabulares.

#### Props

```typescript
interface Props {
  table: ContentTable  // { title, headers, rows }
}
```

#### Features

- Headers con background gris
- Hover effect en rows
- Auto-detecta código en celdas (aplica estilo monospace)
- Responsive con scroll horizontal
- Borders consistentes

#### Ejemplo de Uso

```vue
<CheatsheetTable
  :table="{
    title: 'Array Methods',
    headers: ['Method', 'Description', 'Example'],
    rows: [
      { Method: 'map()', Description: 'Transform', Example: '[1,2].map(x => x*2)' },
      { Method: 'filter()', Description: 'Select', Example: '[1,2,3].filter(x => x>1)' }
    ]
  }"
/>
```

#### Salida Visual

```
┌──────────┬─────────────┬────────────────────┐
│ Method   │ Description │ Example            │
├──────────┼─────────────┼────────────────────┤
│ map()    │ Transform   │ [1,2].map(x=>x*2)  │
│ filter() │ Select      │ [1,2,3].filter...  │
└──────────┴─────────────┴────────────────────┘
```

---

## Composables

### useCodeHighlight

**Ubicación**: `app/composables/useCodeHighlight.ts`

Wrapper de Shiki para syntax highlighting.

#### API

```typescript
const { highlightCode } = useCodeHighlight()

const html = await highlightCode(
  'const x = 42',  // code
  'javascript'     // language
)
```

#### Returns

HTML string con syntax highlighting aplicado.

#### Ejemplo Completo

```vue
<script setup>
const { highlightCode } = useCodeHighlight()

const code = ref('const hello = "world"')
const highlightedCode = ref('')

onMounted(async () => {
  highlightedCode.value = await highlightCode(code.value, 'javascript')
})
</script>

<template>
  <div v-html="highlightedCode" />
</template>
```

---

### useHTMLTemplate

**Ubicación**: `app/composables/useHTMLTemplate.ts`

Genera HTML completo para PDF generation (con Puppeteer).

#### API

```typescript
const { createPDFHTML } = useHTMLTemplate()

const fullHTML = createPDFHTML(contentHTML)
```

#### Input

String HTML del contenido (ej: `cheatsheetRef.value.innerHTML`)

#### Output

HTML completo con:
- `<!DOCTYPE html>`
- `<head>` con charset, viewport, Tailwind CDN
- Estilos para impresión
- Fonts (Inter, JetBrains Mono)
- Print-friendly CSS

#### ¿Por qué existe este composable?

Para evitar problemas de parsing cuando se escribe HTML dentro de template literals en Vue. Vue trata de parsear las etiquetas como parte del template, causando errores.

**Solución**: Construir el HTML via array de strings.

---

## Patrones de Uso

### Patrón 1: Renderizado Condicional

```vue
<script setup>
const cheatcode = ref<Cheatcode | null>(null)

onMounted(async () => {
  cheatcode.value = await fetchCheatcode('react')
})
</script>

<template>
  <div v-if="cheatcode">
    <CheatsheetLayout :cheatcode="cheatcode" />
  </div>
  <div v-else>
    Loading...
  </div>
</template>
```

### Patrón 2: Loop de Secciones

```vue
<template>
  <div v-for="section in cheatcode.sections" :key="section.id">
    <CheatsheetSection :section="section" />
  </div>
</template>
```

### Patrón 3: Async Highlighting

```vue
<script setup>
const props = defineProps<{ code: string }>()
const highlighted = ref('')
const loading = ref(true)

onMounted(async () => {
  const { highlightCode } = useCodeHighlight()
  highlighted.value = await highlightCode(props.code, 'javascript')
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else v-html="highlighted" />
</template>
```

---

## Estilos

### Tailwind Classes Comunes

```css
/* Containers */
.max-w-7xl mx-auto px-4 py-8

/* Cards */
.bg-white rounded-lg shadow hover:shadow-lg

/* Buttons */
.bg-primary-600 text-white px-4 py-2 rounded-lg

/* Text */
.text-3xl font-bold text-gray-900
.text-sm text-gray-600

/* Responsive */
.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

### Print Styles

Todos los componentes incluyen estilos específicos para impresión:

```css
@media print {
  .no-print {
    display: none !important;
  }

  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @page {
    margin: 1.5cm;
    size: A4;
  }
}
```

---

## Testing Componentes

### Manual Testing

1. **CheatsheetCodeBlock**:
   ```bash
   # Test diferentes lenguajes
   - JavaScript
   - TypeScript
   - Vue
   - HTML/CSS
   ```

2. **CheatsheetTable**:
   ```bash
   # Test con diferentes datos
   - 2 columnas
   - 5+ columnas
   - Muchas rows (scroll)
   - Contenido con código
   ```

3. **CheatsheetLayout**:
   ```bash
   # Test responsive
   - Mobile (< 768px)
   - Tablet (768-1024px)
   - Desktop (> 1024px)
   - Print preview (Cmd+P)
   ```

---

## Extensión de Componentes

### Agregar Nuevo Tipo de Sección

1. Agregar tipo a `CheatcodeSection`:
   ```typescript
   type: 'text' | 'code' | 'table' | 'list' | 'diagram'  // nuevo
   ```

2. Crear componente:
   ```bash
   touch app/components/cheatsheet/CheatsheetDiagram.vue
   ```

3. Importar en `CheatsheetSection.vue`:
   ```vue
   <CheatsheetDiagram v-if="section.type === 'diagram'" :diagram="section.diagram" />
   ```

---

**Siguiente**: [API.md](./API.md) - Documentación de API routes
