# Troubleshooting Guide

Soluciones a problemas comunes del proyecto Cheatcodes.

## Instalación y Setup

### Error: "command not found: pnpm"

**Síntomas**:
```bash
$ pnpm install
bash: pnpm: command not found
```

**Solución**:
```bash
# Instalar pnpm globalmente
npm install -g pnpm

# O usar corepack (Node 16.9+)
corepack enable
corepack prepare pnpm@latest --activate
```

---

### Error: "Cannot find module '@tailwindcss/vite'"

**Síntomas**:
```
[nuxt] Cannot find module '@tailwindcss/vite'
```

**Causa**: Dependencias no instaladas correctamente

**Solución**:
```bash
# Limpiar todo y reinstalar
rm -rf node_modules pnpm-lock.yaml .nuxt
pnpm install
```

---

### Error: "Failed to resolve import '#app-manifest'"

**Síntomas**:
```
ERROR Pre-transform error: Failed to resolve import "#app-manifest"
```

**Causa**: Error interno de Nuxt (puede ser ignorado)

**Solución**:
- Este error es **ignorable** en la mayoría de casos
- Si persiste, reinicia el servidor:
  ```bash
  # Ctrl+C para detener
  pnpm dev
  ```

---

## Tailwind CSS

### Tailwind no funciona / No se aplican estilos

**Síntomas**:
- Página sin estilos
- Clases de Tailwind no funcionan

**Checklist**:

1. **Verificar nuxt.config.ts**:
   ```typescript
   import tailwindcss from '@tailwindcss/vite'

   export default defineNuxtConfig({
     css: ['./app/assets/css/main.css'],
     vite: {
       plugins: [tailwindcss()],
     },
   })
   ```

2. **Verificar main.css**:
   ```css
   /* app/assets/css/main.css */
   @import "tailwindcss";
   ```

3. **NO debe existir** `tailwind.config.js` en v4

4. **Reiniciar servidor**:
   ```bash
   pnpm dev
   ```

---

### Error: "Cannot use @tailwind directives"

**Síntomas**:
```
ERROR: Unexpected @tailwind rule
```

**Causa**: Usando sintaxis antigua de Tailwind v3

**Solución**:
Cambiar de:
```css
/* ❌ Antiguo (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

A:
```css
/* ✅ Nuevo (v4) */
@import "tailwindcss";
```

---

## Puppeteer

### Error: "Could not find Chrome"

**Síntomas**:
```
Error: Could not find Chrome (ver. 116.0.5845.96)
```

**Causa**: Chromium no se descargó durante `pnpm install`

**Solución 1** - Reinstalar Puppeteer:
```bash
pnpm add -D puppeteer
```

**Solución 2** - Usar Chromium del sistema:
```typescript
// server/api/generate-pdf.post.ts
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium-browser',  // Linux
  // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',  // macOS
})
```

---

### PDF Generation muy lento

**Síntomas**:
- Tarda más de 10 segundos en generar PDF
- Timeout errors

**Soluciones**:

1. **Reducir viewport size**:
   ```typescript
   await page.setViewport({
     width: 794,
     height: 1123,
     deviceScaleFactor: 1,  // ← Reducir de 2 a 1
   })
   ```

2. **Simplificar contenido**:
   - Menos secciones
   - Código más corto
   - Menos imágenes

3. **Usar headless new**:
   ```typescript
   const browser = await puppeteer.launch({
     headless: 'new',  // Más rápido
   })
   ```

---

### PDF con colores incorrectos

**Síntomas**:
- Backgrounds no se imprimen
- Colores diferentes al preview

**Solución**:
Asegúrate de usar `print-color-adjust`:

```css
* {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
```

Y en Puppeteer:
```typescript
const pdf = await page.pdf({
  printBackground: true,  // ← Importante
})
```

---

## Shiki / Syntax Highlighting

### Código sin colores

**Síntomas**:
- Código aparece sin syntax highlighting
- Todo en blanco/negro

**Solución**:

1. **Verificar que Shiki esté cargando**:
   ```vue
   <script setup>
   const { highlightCode } = useCodeHighlight()

   onMounted(async () => {
     console.log('Highlighting...')
     const html = await highlightCode(code, 'javascript')
     console.log('Done!', html)
   })
   </script>
   ```

2. **Verificar language tag**:
   ```typescript
   // ✅ Correcto
   language: 'javascript'

   // ❌ Incorrecto
   language: 'js'  // Usa 'javascript'
   ```

3. **Check v-html rendering**:
   ```vue
   <div v-html="highlightedCode" />  <!-- Necesita v-html -->
   ```

---

### Error: "Failed to load onig.wasm"

**Síntomas**:
```
Failed to load onig.wasm
```

**Causa**: Shiki no puede cargar WASM file

**Solución**:
```bash
pnpm add shiki@latest
```

---

## API Routes

### 404 en API calls

**Síntomas**:
```
GET /api/cheatcodes → 404 Not Found
```

**Checklist**:

1. **Verificar archivo existe**: `server/api/cheatcodes/index.get.ts`

2. **Verificar sintaxis**:
   ```typescript
   // ✅ Correcto
   export default defineEventHandler(() => {
     // ...
   })

   // ❌ Incorrecto
   export function handler() {
     // ...
   }
   ```

3. **Reiniciar servidor**:
   ```bash
   pnpm dev
   ```

---

### CORS errors

**Síntomas**:
```
Access to fetch blocked by CORS policy
```

**Causa**: Llamando API desde dominio diferente

**Solución**:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
})
```

---

## Content / Cheatcodes

### Cheatcode no aparece en lista

**Síntomas**:
- Creaste nuevo cheatcode pero no aparece
- 404 al acceder

**Checklist**:

1. **Verificar export en content/index.ts**:
   ```typescript
   import { reactCheatcode } from './react'  // ← Importado?

   export const cheatcodes = {
     javascript: javascriptCheatcode,
     vue: vueCheatcode,
     react: reactCheatcode,  // ← Agregado?
   }
   ```

2. **Verificar ID coincide**:
   ```typescript
   // content/react/index.ts
   metadata: {
     id: 'react',  // ← Debe coincidir con carpeta
   }
   ```

3. **Reiniciar servidor**

---

### TypeScript errors en contenido

**Síntomas**:
```typescript
Type 'X' is not assignable to type 'Y'
```

**Solución**:
Verificar que el objeto siga la interfaz `Cheatcode`:

```typescript
import type { Cheatcode } from '~/types/cheatcode'

export const myCheatcode: Cheatcode = {  // ← Type annotation
  metadata: { /* ... */ },
  sections: [ /* ... */ ],
}
```

---

## Build / Production

### Build falla con "Out of memory"

**Síntomas**:
```
FATAL ERROR: Reached heap limit Allocation failed
```

**Solución**:
Aumentar heap size:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' nuxt build"
  }
}
```

---

### Build exitoso pero página en blanco

**Síntomas**:
- `pnpm build` exitoso
- Pero al abrir página, pantalla en blanco

**Checklist**:

1. **Verificar preview**:
   ```bash
   pnpm preview
   ```

2. **Check console errors** en browser

3. **Verificar baseURL**:
   ```typescript
   // nuxt.config.ts
   app: {
     baseURL: '/',  // Ajustar si está en subdirectorio
   }
   ```

---

## Performance

### Página carga lento

**Causas comunes**:
- Shiki cargando en cada componente
- Demasiadas secciones
- Código muy largo

**Soluciones**:

1. **Lazy load Shiki**:
   ```vue
   <script setup>
   onMounted(async () => {
     const { highlightCode } = useCodeHighlight()
     // Solo carga cuando se necesita
   })
   </script>
   ```

2. **Limitar longitud de código**:
   - Max 30 líneas por bloque
   - Dividir en múltiples bloques

---

## IDE / Editor

### Auto-import no funciona

**Solución**:
```bash
# Regenerar tipos
pnpm postinstall
```

---

### ESLint errors

**Si usas ESLint**, crea `.eslintrc`:

```json
{
  "extends": ["@nuxtjs/eslint-config-typescript"],
  "rules": {
    "vue/multi-word-component-names": "off"
  }
}
```

---

## Otros Problemas

### Puerto 3000 ya en uso

**Solución**:
```bash
# Cambiar puerto
PORT=3001 pnpm dev

# O matar proceso en 3000
lsof -ti:3000 | xargs kill -9
```

---

### Hot reload no funciona

**Solución**:
```bash
# Reiniciar servidor
# Ctrl+C
pnpm dev

# O limpiar cache
rm -rf .nuxt
pnpm dev
```

---

## Debugging Tips

### Enable Debug Logs

```bash
# Nuxt debug
DEBUG=nuxt:* pnpm dev

# Nitro debug
DEBUG=nitro:* pnpm dev
```

### Chrome DevTools para Node

```bash
node --inspect .output/server/index.mjs
```

### Vue DevTools

Instala [Vue DevTools extension](https://devtools.vuejs.org/) para Chrome/Firefox.

---

## Getting Help

Si ninguna solución funciona:

1. **Check logs** completos
2. **Reproduce** el error en proyecto limpio
3. **GitHub Issues**: Busca issues similares
4. **Discord**: [Nuxt Discord](https://discord.nuxt.com)

### Template de Issue

```markdown
**Descripción del problema**:
[Describe qué está pasando]

**Pasos para reproducir**:
1. [Paso 1]
2. [Paso 2]

**Comportamiento esperado**:
[Qué debería pasar]

**Logs**:
```
[Pega logs aquí]
```

**Environment**:
- OS: [macOS/Linux/Windows]
- Node: [versión]
- pnpm: [versión]
- Nuxt: [versión]
```

---

## Logs Útiles

```bash
# Verificar versiones
node --version
pnpm --version
pnpm list nuxt

# Ver todas las dependencias
pnpm list

# Check disk space
df -h

# Memory usage
free -h  # Linux
vm_stat  # macOS
```

---

**¿Problema no listado?** Consulta [CLAUDE.md](../CLAUDE.md) para contexto completo del proyecto.
