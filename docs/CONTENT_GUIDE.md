# Content Guide - Cómo Crear Cheatcodes

Esta guía te enseñará cómo crear nuevos cheatcodes para el proyecto.

## Estructura de un Cheatcode

Cada cheatcode es un objeto TypeScript que sigue la interfaz `Cheatcode`:

```typescript
interface Cheatcode {
  metadata: CheatcodeMetadata    // Información del cheatcode
  sections: CheatcodeSection[]   // Contenido organizado en secciones
}
```

## Paso a Paso: Crear un Nuevo Cheatcode

### 1. Crear la Carpeta

Crea una carpeta en `content/` con el nombre del lenguaje (en minúsculas, sin espacios):

```bash
mkdir content/react
```

### 2. Crear el Archivo `index.ts`

Dentro de la carpeta, crea `index.ts`:

```typescript
// content/react/index.ts
import type { Cheatcode } from '~/types/cheatcode'

export const reactCheatcode: Cheatcode = {
  metadata: {
    id: 'react',                 // Identificador único (mismo que carpeta)
    title: 'React',              // Título display
    language: 'React',           // Lenguaje
    version: '18.x',             // Versión (opcional)
    description: 'React hooks and essential patterns',  // Descripción corta
    lastUpdated: '2024-11-21',   // Fecha última actualización
    icon: '⚛️',                  // Emoji icon (opcional)
    color: '#61DAFB',            // Color hex (opcional)
  },
  sections: [
    // Aquí van tus secciones (ver ejemplos abajo)
  ],
}
```

### 3. Agregar Secciones

Cada sección puede ser de 4 tipos: `text`, `code`, `table`, o `list`.

#### Tipo: Code (Bloques de Código)

Para mostrar código con syntax highlighting:

```typescript
{
  id: 'hooks',
  title: 'React Hooks',
  type: 'code',
  code: {
    title: 'useState & useEffect',
    code: `import { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = \`Count: \${count}\`
  }, [count])

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`,
    language: 'typescript',  // javascript, typescript, vue, html, css, etc
    description: 'Basic hooks example',  // Opcional
  },
}
```

#### Tipo: Table (Tablas)

Para información tabular:

```typescript
{
  id: 'lifecycle',
  title: 'Lifecycle Methods',
  type: 'table',
  table: {
    title: 'Class Component Lifecycle',
    headers: ['Method', 'When', 'Use Case'],
    rows: [
      {
        Method: 'componentDidMount()',
        When: 'After first render',
        Use Case: 'API calls, subscriptions'
      },
      {
        Method: 'componentWillUnmount()',
        When: 'Before unmount',
        Use Case: 'Cleanup, unsubscribe'
      },
    ],
  },
}
```

#### Tipo: List (Listas)

Para listas simples:

```typescript
{
  id: 'rules',
  title: 'Rules of Hooks',
  type: 'list',
  items: [
    'Only call hooks at the top level',
    'Only call hooks from React functions',
    'Don\'t call hooks in loops or conditions',
    'Custom hooks must start with "use"',
  ],
}
```

#### Tipo: Text (Texto Simple)

Para párrafos de texto:

```typescript
{
  id: 'intro',
  title: 'Introduction',
  type: 'text',
  content: 'React is a JavaScript library for building user interfaces...',
}
```

### 4. Exportar el Cheatcode

Agrega tu cheatcode a `content/index.ts`:

```typescript
// content/index.ts
import { javascriptCheatcode } from './javascript'
import { vueCheatcode } from './vue'
import { reactCheatcode } from './react'  // 👈 Importa

export const cheatcodes: CheatcodeList = {
  javascript: javascriptCheatcode,
  vue: vueCheatcode,
  react: reactCheatcode,  // 👈 Agrega
}
```

### 5. Verificar

1. Reinicia el servidor (`Ctrl+C` y luego `pnpm dev`)
2. Abre http://localhost:3000
3. Deberías ver tu nuevo cheatcode en la lista
4. Click para ver el preview
5. Descarga el PDF para verificar el formato

## Ejemplo Completo: PHP Cheatcode

```typescript
// content/php/index.ts
import type { Cheatcode } from '~/types/cheatcode'

export const phpCheatcode: Cheatcode = {
  metadata: {
    id: 'php',
    title: 'PHP',
    language: 'PHP',
    version: '8.x',
    description: 'PHP syntax and common functions',
    lastUpdated: '2024-11-21',
    icon: '🐘',
    color: '#777BB4',
  },
  sections: [
    {
      id: 'basics',
      title: 'PHP Basics',
      type: 'code',
      code: {
        title: 'Basic Syntax',
        code: `<?php
// Variables
$name = "John";
$age = 30;

// Echo
echo "Hello, " . $name;

// Arrays
$fruits = ["apple", "banana", "orange"];
$person = [
  "name" => "John",
  "age" => 30
];

// Functions
function greet($name) {
  return "Hello, " . $name;
}

echo greet("World");
?>`,
        language: 'php',
      },
    },
    {
      id: 'superglobals',
      title: 'Superglobals',
      type: 'table',
      table: {
        title: 'PHP Superglobal Variables',
        headers: ['Variable', 'Description', 'Example'],
        rows: [
          {
            Variable: '$_GET',
            Description: 'URL parameters',
            Example: '$_GET["id"]'
          },
          {
            Variable: '$_POST',
            Description: 'Form data',
            Example: '$_POST["username"]'
          },
          {
            Variable: '$_SERVER',
            Description: 'Server info',
            Example: '$_SERVER["REQUEST_METHOD"]'
          },
        ],
      },
    },
  ],
}
```

## Tips y Mejores Prácticas

### 1. Organización de Secciones

Agrupa el contenido de forma lógica:
- Basics / Fundamentos
- Syntax / Sintaxis
- Common Functions / Funciones Comunes
- Advanced / Avanzado
- Best Practices / Mejores Prácticas

### 2. Código Limpio

- **Usa espacios consistentes** (2 o 4 espacios)
- **Comenta el código** cuando sea necesario
- **Mantén ejemplos cortos** (max 20-30 líneas)
- **Usa ejemplos prácticos** y reales

### 3. Language Tags Correctos

Para syntax highlighting, usa estos language tags en Shiki:

- `javascript` - JavaScript
- `typescript` - TypeScript
- `vue` - Vue SFC
- `html` - HTML
- `css` - CSS
- `python` - Python
- `php` - PHP
- `bash` - Bash/Shell
- `json` - JSON
- `yaml` - YAML
- `markdown` - Markdown

### 4. Metadata

- **icon**: Usa emojis relevantes ([emoji list](https://emojipedia.org/))
- **color**: Usa el color oficial del lenguaje/framework
- **version**: Especifica la versión para evitar confusión
- **lastUpdated**: Usa formato YYYY-MM-DD

### 5. Longitud del Cheatcode

Para PDFs óptimos:
- **Mínimo**: 4-6 secciones
- **Óptimo**: 8-12 secciones
- **Máximo**: 15-20 secciones (más puede crear PDFs muy largos)

## Estructura de Tipos

Para referencia, aquí están los tipos completos:

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

interface CodeExample {
  title: string
  code: string
  language?: string
  description?: string
}

interface TableRow {
  [key: string]: string
}

interface ContentTable {
  title: string
  headers: string[]
  rows: TableRow[]
}

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

interface Cheatcode {
  metadata: CheatcodeMetadata
  sections: CheatcodeSection[]
}
```

## Cheatcodes Pendientes

Estos cheatcodes aún necesitan ser creados:

- [ ] HTML
- [ ] CSS
- [ ] Nuxt
- [ ] React
- [ ] Next.js
- [ ] PHP

¡Puedes contribuir creando alguno de estos!

## Referencias

Puedes inspirarte en estos cheatcodes existentes:
- `content/javascript/index.ts` - Ejemplo completo con varios tipos de secciones
- `content/vue/index.ts` - Ejemplo con tablas y lifecycle hooks

---

**Siguiente**: [COMPONENTS.md](./COMPONENTS.md) - Entiende los componentes del layout
