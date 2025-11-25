# Próximos Pasos - Cheatcodes Project

## ✅ Completado en Esta Sesión

1. **Configuración Base**
   - Nuxt 4 + Tailwind CSS v4 (con @tailwindcss/vite)
   - Puppeteer para generación de PDFs
   - Shiki para syntax highlighting
   - Estructura completa del proyecto

2. **Correcciones Realizadas**
   - ✅ Fecha actualizada a 2025
   - ✅ Error `waitForTimeout` corregido (usando `setTimeout`)
   - ✅ Contraste del botón arreglado (`bg-blue-600` en lugar de `bg-primary-600`)
   - ✅ Header con gradiente azul correcto
   - ✅ PDF generation funcionando con timeout aumentado

3. **Documentación Completa**
   - CLAUDE.md (contexto del proyecto)
   - /docs con 7 archivos de documentación
   - README.md actualizado

## 🔄 Pendiente

### 1. Traducir Todo a Español

**Archivos a traducir:**

#### Content (cheatcodes)
- `/Users/israsenior/Desktop/cheatcodes/content/javascript/index.ts`
  - Titles: "Variables & Data Types" → "Variables y Tipos de Datos"
  - "String Methods" → "Métodos de String"
  - "Array Methods" → "Métodos de Array"
  - "Functions" → "Funciones"
  - Etc.

- `/Users/israsenior/Desktop/cheatcodes/content/vue/index.ts`
  - Similar translation needed

#### UI (páginas y componentes)
- `app/pages/index.vue`
  - "Cheatcodes" → "Cheatcodes" (mantener)
  - "Generate professional PDF cheatsheets..." → "Genera hojas de referencia PDF profesionales..."
  - "View & Download" → "Ver y Descargar"

- `app/pages/cheatcodes/[id].vue`
  - "Back to all cheatcodes" → "Volver a todos los cheatcodes"
  - "Download PDF" → "Descargar PDF"
  - "Generating..." → "Generando..."

- `app/components/cheatsheet/CheatsheetHeader.vue`
  - "Version:" → "Versión:"
  - "Last updated:" → "Última actualización:"

- `app/components/cheatsheet/CheatsheetLayout.vue` (Footer)
  - "Generated with Cheatcodes Generator" → "Generado con Cheatcodes Generator"

### 2. Expandir Contenido

**JavaScript** - Agregar secciones:
- Number methods (toFixed, parseInt, parseFloat, etc.)
- Math object
- Date methods
- DOM manipulation
- Error handling (try/catch)
- Modules (import/export)
- Classes & OOP
- RegEx basics
- JSON methods
- LocalStorage/SessionStorage

**Vue** - Agregar más secciones:
- Más lifecycle hooks con ejemplos
- Watchers avanzados
- Computed properties complejas
- Slots
- Provide/Inject
- Teleport
- Suspense

### 3. Crear Cheatcodes Restantes

Faltan 6 cheatcodes:
- HTML
- CSS
- React
- Next.js
- Nuxt
- PHP

**Template para cada uno** (en `content/{nombre}/index.ts`):
```typescript
import type { Cheatcode } from '~/types/cheatcode'

export const htmlCheatcode: Cheatcode = {
  metadata: {
    id: 'html',
    title: 'HTML',
    language: 'HTML',
    version: 'HTML5',
    description: 'Guía de referencia de HTML5 con etiquetas y atributos esenciales',
    lastUpdated: '2025-11-21',
    icon: '📄',
    color: '#E34F26',
  },
  sections: [
    // Agregar secciones aquí
  ],
}
```

### 4. Mejoras de Diseño PDF

- Verificar que los colores se vean correctamente en PDF
- Ajustar column layout para mejor lectura
- Asegurar que code blocks no se corten entre páginas

### 5. Performance

- Implementar caching de PDFs generados
- Lazy load de Shiki solo cuando se necesite
- Optimizar imágenes (si se agregan)

## 📝 Comandos Útiles para Continuar

```bash
# Desarrollo
pnpm dev              # http://localhost:3001

# Test PDF
# 1. Ir a http://localhost:3001
# 2. Click en cheatcode
# 3. Click "Descargar PDF"

# Agregar nuevo cheatcode
# 1. mkdir content/html
# 2. Crear content/html/index.ts
# 3. Importar en content/index.ts
```

## 🎯 Prioridades Sugeridas

1. **ALTA**: Traducir todo a español (mejor experiencia de usuario)
2. **ALTA**: Expandir contenido de JavaScript y Vue (muy básico actualmente)
3. **MEDIA**: Crear HTML y CSS cheatcodes (complementan JavaScript)
4. **MEDIA**: Crear React/Next/Nuxt cheatcodes
5. **BAJA**: PHP cheatcode
6. **BAJA**: Optimizaciones de performance

## 💡 Notas Importantes

- **Tailwind v4**: Usar `bg-linear-to-*` NO `bg-gradient-to-*`
- **Colors**: Usar `blue-*`, `gray-*`, etc. NO `primary-*` (no están definidos)
- **PDF**: Esperar 2 segundos después de cargar HTML para que Tailwind CDN procese
- **Package Manager**: Siempre usar `pnpm`, NO `npm`

---

**Última actualización**: 2025-11-21
**Estado**: Proyecto funcional, necesita contenido y traducciones
