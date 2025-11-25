# Deployment Guide

Guía para deployar el proyecto Cheatcodes en diferentes plataformas.

## Preparación Pre-Deployment

### 1. Build Local

Asegúrate de que el proyecto buildeé correctamente:

```bash
pnpm build
pnpm preview  # Test del build
```

### 2. Variables de Entorno

Crea un archivo `.env.example` si necesitas variables:

```bash
# .env.example
NUXT_PUBLIC_API_BASE=/api
```

### 3. Optimizaciones

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // ... config existente

  // Optimizaciones
  nitro: {
    compressPublicAssets: true,
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'shiki': ['shiki'],
          },
        },
      },
    },
  },
})
```

---

## Opción 1: Vercel (Recomendado)

### Por qué Vercel

✅ Ventajas:
- Nuxt support nativo
- Deploy automático desde git
- Edge functions
- CDN global
- SSL gratis
- Zero config

❌ Limitaciones:
- Puppeteer puede requerir Vercel Pro
- Límite de 10s en serverless functions (para PDF generation)

### Deploy Steps

1. **Instalar Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

### Configuración

Crea `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nuxtjs",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.ts": {
      "memory": 3008,
      "maxDuration": 30
    }
  }
}
```

### Puppeteer en Vercel

Necesitarás `@sparticuz/chromium` para Vercel:

```bash
pnpm add @sparticuz/chromium
```

Actualiza `server/api/generate-pdf.post.ts`:

```typescript
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

// En Vercel
const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
})

// Local (development)
const browser = await puppeteer.launch({
  headless: true,
})
```

---

## Opción 2: Netlify

### Por qué Netlify

✅ Ventajas:
- Deploy automático desde git
- CDN global
- SSL gratis
- Forms y functions

❌ Limitaciones:
- Puppeteer requiere plugin especial
- Límites en funciones serverless

### Deploy Steps

1. **Instalar Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Deploy**:
   ```bash
   netlify deploy
   ```

4. **Production**:
   ```bash
   netlify deploy --prod
   ```

### Configuración

Crea `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = ".output/public"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server/:splat"
  status = 200
```

### Puppeteer en Netlify

Usa `chrome-aws-lambda`:

```bash
pnpm add chrome-aws-lambda
```

---

## Opción 3: Node.js Server (VPS/Cloud)

### Requisitos

- Node.js 18+
- PM2 (process manager)
- Nginx (reverse proxy)

### Setup

1. **Install Dependencies**:
   ```bash
   pnpm install --prod
   pnpm build
   ```

2. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

3. **Create ecosystem file**:
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'cheatcodes',
       script: '.output/server/index.mjs',
       instances: 'max',
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
       },
     }],
   }
   ```

4. **Start with PM2**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name cheatcodes.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL con Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d cheatcodes.com
```

---

## Opción 4: Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Install chromium for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set Puppeteer env
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy app files
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["node", ".output/server/index.mjs"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  cheatcodes:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Build & Run

```bash
docker-compose up -d --build
```

---

## Opción 5: Static Generation

Para sitios completamente estáticos (sin PDF generation):

```bash
pnpm generate
```

Esto genera archivos estáticos en `.output/public` que puedes servir con:
- GitHub Pages
- Netlify
- Vercel
- S3 + CloudFront
- Cualquier servidor estático

---

## Environment Variables

### Production

```bash
# .env.production
NUXT_PUBLIC_SITE_URL=https://cheatcodes.com
NODE_ENV=production
```

### Configuración en plataformas

**Vercel**:
- Dashboard → Settings → Environment Variables

**Netlify**:
- Dashboard → Site settings → Environment variables

**Node.js**:
- Archivo `.env` en servidor

---

## Monitoreo

### Logs

**PM2**:
```bash
pm2 logs cheatcodes
```

**Vercel**:
- Dashboard → Deployment → Logs

**Netlify**:
- Dashboard → Functions → Logs

### Performance Monitoring

Considera agregar:
- [Sentry](https://sentry.io) - Error tracking
- [Vercel Analytics](https://vercel.com/analytics) - Performance
- [Google Analytics](https://analytics.google.com) - Usage

---

## CDN & Caching

### Headers recomendados

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/api/cheatcodes': { cache: { maxAge: 3600 } },
      '/_nuxt/**': { headers: { 'cache-control': 'public,max-age=31536000,immutable' } },
    },
  },
})
```

---

## Troubleshooting Deploy

### Build Fails

```bash
# Limpiar cache
rm -rf node_modules .nuxt .output pnpm-lock.yaml
pnpm install
pnpm build
```

### Puppeteer Fails

- Verificar que Chromium esté instalado
- Check memory limits
- Aumentar timeout

### Out of Memory

Aumentar heap size:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' nuxt build"
  }
}
```

---

## Checklist Pre-Deploy

- [ ] Build local funciona (`pnpm build`)
- [ ] Todas las variables de entorno configuradas
- [ ] `.gitignore` incluye archivos sensibles
- [ ] Puppeteer configurado para plataforma target
- [ ] SSL configurado (HTTPS)
- [ ] Logs y monitoreo configurados
- [ ] Backup strategy definida

---

**Siguiente**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Solución de problemas
