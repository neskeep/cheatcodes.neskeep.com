# API Documentation

Documentación completa de las API routes del proyecto.

## Base URL

En desarrollo: `http://localhost:3000/api`

## Endpoints

### 1. GET /api/cheatcodes

Obtiene la lista de todos los cheatcodes disponibles (solo metadata).

#### Request

```http
GET /api/cheatcodes HTTP/1.1
Host: localhost:3000
```

#### Response

```json
[
  {
    "id": "javascript",
    "title": "JavaScript",
    "language": "JavaScript",
    "version": "ES2024",
    "description": "JavaScript cheatsheet covering essential syntax...",
    "lastUpdated": "2024-11-21",
    "icon": "⚡",
    "color": "#F7DF1E"
  },
  {
    "id": "vue",
    "title": "Vue 3",
    "language": "Vue",
    "version": "3.x",
    "description": "Vue 3 Composition API and essential features...",
    "lastUpdated": "2024-11-21",
    "icon": "🖖",
    "color": "#42b883"
  }
]
```

#### Status Codes

| Code | Description |
|------|-------------|
| 200  | Success     |

#### Ejemplo con fetch

```typescript
const response = await fetch('/api/cheatcodes')
const cheatcodes = await response.json()

console.log(cheatcodes.length) // 2
```

#### Uso en Nuxt

```vue
<script setup>
const { data: cheatcodes } = await useFetch('/api/cheatcodes')
</script>
```

---

### 2. GET /api/cheatcodes/:id

Obtiene un cheatcode específico completo (metadata + sections).

#### Parameters

| Name | Type   | Description       |
|------|--------|-------------------|
| id   | string | Cheatcode ID      |

#### Request

```http
GET /api/cheatcodes/javascript HTTP/1.1
Host: localhost:3000
```

#### Response

```json
{
  "metadata": {
    "id": "javascript",
    "title": "JavaScript",
    "language": "JavaScript",
    "version": "ES2024",
    "description": "JavaScript cheatsheet covering...",
    "lastUpdated": "2024-11-21",
    "icon": "⚡",
    "color": "#F7DF1E"
  },
  "sections": [
    {
      "id": "variables",
      "title": "Variables & Data Types",
      "type": "code",
      "code": {
        "title": "Variable Declaration",
        "code": "let count = 0;\nconst PI = 3.14159;",
        "language": "javascript"
      }
    }
    // ... más secciones
  ]
}
```

#### Status Codes

| Code | Description            |
|------|------------------------|
| 200  | Success                |
| 400  | ID no proporcionado    |
| 404  | Cheatcode no encontrado|

#### Errores

**404 Not Found**:
```json
{
  "statusCode": 404,
  "statusMessage": "Cheatcode not found"
}
```

#### Ejemplo con fetch

```typescript
const id = 'javascript'
const response = await fetch(`/api/cheatcodes/${id}`)

if (!response.ok) {
  throw new Error('Cheatcode not found')
}

const cheatcode = await response.json()
console.log(cheatcode.metadata.title) // "JavaScript"
```

#### Uso en Nuxt

```vue
<script setup>
const route = useRoute()
const id = route.params.id

const { data: cheatcode, error } = await useFetch(`/api/cheatcodes/${id}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Cheatcode not found'
  })
}
</script>
```

---

### 3. POST /api/generate-pdf

Genera un PDF a partir de HTML proporcionado usando Puppeteer.

#### Request Body

```typescript
{
  cheatcodeId: string  // ID del cheatcode
  html: string         // HTML completo a convertir
}
```

#### Request

```http
POST /api/generate-pdf HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "cheatcodeId": "javascript",
  "html": "<!DOCTYPE html><html>...</html>"
}
```

#### Response

Binary PDF data con headers:

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="javascript-cheatsheet.pdf"

[PDF binary data]
```

#### Status Codes

| Code | Description                  |
|------|------------------------------|
| 200  | Success - PDF generado       |
| 400  | cheatcodeId no proporcionado |
| 404  | Cheatcode no encontrado      |
| 500  | Error en generación PDF      |

#### Errores

**400 Bad Request**:
```json
{
  "statusCode": 400,
  "statusMessage": "Cheatcode ID is required"
}
```

**500 Internal Server Error**:
```json
{
  "statusCode": 500,
  "statusMessage": "Failed to generate PDF"
}
```

#### Ejemplo con fetch

```typescript
const generatePDF = async (cheatcodeId: string, html: string) => {
  try {
    const response = await $fetch('/api/generate-pdf', {
      method: 'POST',
      body: { cheatcodeId, html },
      responseType: 'blob',
    })

    // Crear download link
    const blob = new Blob([response], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${cheatcodeId}-cheatsheet.pdf`
    link.click()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('PDF generation failed:', error)
  }
}
```

#### Configuración de Puppeteer

El PDF se genera con estas opciones:

```typescript
{
  format: 'A4',
  printBackground: true,
  margin: {
    top: '1.5cm',
    right: '1.5cm',
    bottom: '1.5cm',
    left: '1.5cm',
  },
  preferCSSPageSize: false,
}
```

---

## Tipos TypeScript

### CheatcodeMetadata

```typescript
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
```

### Cheatcode

```typescript
interface Cheatcode {
  metadata: CheatcodeMetadata
  sections: CheatcodeSection[]
}
```

### CheatcodeSection

```typescript
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
```

---

## Rate Limiting

⚠️ **Actualmente NO implementado**

Consideraciones para implementar:

```typescript
// server/middleware/rate-limit.ts
import { defineEventHandler } from 'h3'

const requests = new Map()

export default defineEventHandler((event) => {
  const ip = getRequestIP(event)
  // Implementar lógica de rate limiting
})
```

Límites sugeridos:
- `/api/cheatcodes` - Sin límite (lecturas)
- `/api/cheatcodes/:id` - Sin límite (lecturas)
- `/api/generate-pdf` - **10 requests/min** (CPU intensive)

---

## Caching

### Actualmente

- ❌ No hay caching implementado
- Cada request genera nuevo PDF
- Content siempre se lee desde archivos TS

### Recomendaciones

1. **Redis para PDFs**:
   ```typescript
   // Cache PDFs generados
   const cachedPDF = await redis.get(`pdf:${id}`)
   if (cachedPDF) return cachedPDF
   ```

2. **Static Content**:
   Los cheatcodes podrían cachearse en build time:
   ```typescript
   // nuxt.config.ts
   nitro: {
     prerender: {
       routes: ['/api/cheatcodes', '/api/cheatcodes/javascript', ...]
     }
   }
   ```

---

## Error Handling

Todas las API routes usan el sistema de errores de Nuxt:

```typescript
throw createError({
  statusCode: 404,
  statusMessage: 'Not found',
})
```

Los errores se devuelven como JSON:

```json
{
  "statusCode": 404,
  "statusMessage": "Not found"
}
```

---

## Testing API

### Manual con curl

```bash
# Get all cheatcodes
curl http://localhost:3000/api/cheatcodes

# Get specific cheatcode
curl http://localhost:3000/api/cheatcodes/javascript

# Generate PDF
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"cheatcodeId":"javascript","html":"<!DOCTYPE html>..."}' \
  --output test.pdf
```

### Con Postman/Insomnia

1. Import collection
2. Set base URL: `http://localhost:3000`
3. Test endpoints

---

## Future Enhancements

Posibles mejoras:

1. **Authentication** - Para endpoints admin
2. **Webhook** - Notificar cuando PDF está listo
3. **Async PDF Generation** - Queue system
4. **PDF Options** - Permitir customización (theme, format, etc.)
5. **Analytics** - Track de PDFs generados

---

**Siguiente**: [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía de deployment
