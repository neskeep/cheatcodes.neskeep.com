# Getting Started

Esta guía te ayudará a configurar y ejecutar el proyecto Cheatcodes en tu máquina local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **pnpm** ([Instalar](https://pnpm.io/installation))

Para verificar las versiones instaladas:

```bash
node --version  # Debe ser v18 o superior
pnpm --version  # Cualquier versión reciente
```

## Instalación

### 1. Clonar el repositorio (si aplica)

```bash
git clone <repository-url>
cd cheatcodes
```

### 2. Instalar dependencias

⚠️ **IMPORTANTE**: Este proyecto usa `pnpm`, NO `npm`.

```bash
pnpm install
```

Esto instalará:
- Nuxt 4
- Tailwind CSS v4 con @tailwindcss/vite
- Puppeteer (descargará Chromium automáticamente)
- Shiki para syntax highlighting
- TypeScript y otras dependencias

### 3. Iniciar servidor de desarrollo

```bash
pnpm dev
```

El servidor se iniciará en: **http://localhost:3000**

Verás un output similar a:

```
[nuxi] Nuxt 3.20.1 (with Nitro 2.12.9, Vite 7.2.4 and Vue 3.5.24)

  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose

  ➜ DevTools: press Shift + Option + D in the browser (v3.1.0)
```

## Estructura del Proyecto

Una vez instalado, tendrás esta estructura:

```
cheatcodes/
├── app/                    # Código de la aplicación
│   ├── assets/            # CSS, fuentes, etc
│   ├── components/        # Componentes Vue
│   ├── composables/       # Composables Vue
│   ├── pages/             # Páginas (rutas automáticas)
│   └── types/             # Tipos TypeScript
├── content/               # Contenido de cheatcodes
├── server/                # API routes
├── docs/                  # Documentación
└── public/                # Assets estáticos
```

## Primer Uso

### Ver los cheatcodes disponibles

1. Abre http://localhost:3000
2. Verás una lista de cheatcodes disponibles:
   - JavaScript (ES2024)
   - Vue 3

### Preview de un cheatcode

1. Click en cualquier cheatcode
2. Verás el preview con diseño completo
3. Click en "Download PDF" para generar el PDF

### La generación del PDF

- Se ejecuta en el servidor usando Puppeteer
- Puede tardar 2-5 segundos la primera vez
- El PDF se descargará automáticamente

## Comandos Disponibles

```bash
# Desarrollo
pnpm dev          # Iniciar servidor de desarrollo

# Build
pnpm build        # Construir para producción
pnpm preview      # Preview del build de producción
pnpm generate     # Generar sitio estático

# Nuxt
pnpm postinstall  # Preparar tipos (automático)
```

## Siguiente Paso

Una vez que el proyecto esté corriendo:

1. 📖 Lee [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) para aprender a crear nuevos cheatcodes
2. 🏗️ Lee [ARCHITECTURE.md](./ARCHITECTURE.md) para entender la arquitectura
3. 🧩 Lee [COMPONENTS.md](./COMPONENTS.md) para conocer los componentes disponibles

## Problemas Comunes

### Error: "command not found: pnpm"

**Solución**: Instala pnpm globalmente
```bash
npm install -g pnpm
```

### Error: "Cannot find module '@tailwindcss/vite'"

**Solución**: Asegúrate de haber ejecutado `pnpm install`
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Warning: "puppeteer@23.11.1: < 24.15.0 is no longer supported"

**Solución**: Este warning no es crítico. Puedes actualizarlo si lo deseas:
```bash
pnpm add -D puppeteer@latest
```

### Puerto 3000 ya en uso

**Solución**: Puedes cambiar el puerto:
```bash
PORT=3001 pnpm dev
```

## Verificar que Todo Funciona

✅ Checklist:

- [ ] `pnpm dev` inicia sin errores
- [ ] Puedes acceder a http://localhost:3000
- [ ] Ves 2 cheatcodes en la página principal
- [ ] Puedes abrir un cheatcode y ver el preview
- [ ] Puedes descargar un PDF

Si todos los checks pasan, ¡estás listo para empezar! 🎉

## Recursos Adicionales

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Puppeteer Documentation](https://pptr.dev/)
- [Shiki Documentation](https://shiki.style/)

---

**Siguiente**: [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) - Aprende a crear tu primer cheatcode
