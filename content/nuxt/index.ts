import type { Cheatcode } from '../types'

export const nuxtCheatcode: Cheatcode = {
  metadata: {
    id: 'nuxt',
    title: 'Nuxt',
    language: 'Nuxt',
    category: 'framework',
    tags: ['nuxt', 'vue', 'javascript', 'framework', 'frontend', 'ssr', 'ssg'],
    version: '4',
    description: 'Guía completa de Nuxt 4: SSR, SSG, Composables, Data Fetching, Middleware y más',
    lastUpdated: '2025-11-26',
    logo: '/logos/nuxt.svg',
    color: '#00DC82',
    difficulty: 'intermediate',
  },
  sections: [
    {
      id: 'instalacion',
      title: 'Instalación',
      type: 'package-install',
      content: 'Crea un nuevo proyecto Nuxt 4 con tu gestor de paquetes favorito.',
      packageCommands: {
        npm: 'npx nuxi@latest init my-app',
        pnpm: 'pnpm dlx nuxi@latest init my-app',
        yarn: 'yarn dlx nuxi@latest init my-app',
        bun: 'bunx nuxi@latest init my-app',
      },
    },
    {
      id: 'estructura-proyecto',
      title: 'Estructura de Proyecto (Nuxt 4)',
      type: 'text',
      content: 'En Nuxt 4, todo el código de la aplicación va dentro del directorio `/app`. Esta es la estructura recomendada:',
      subsections: [
        {
          id: 'estructura-directorios',
          title: 'Directorios Principales',
          type: 'list',
          items: [
            '`/app` - Todo el código de la aplicación',
            '`/app/pages` - Páginas con auto-routing',
            '`/app/components` - Componentes Vue reutilizables',
            '`/app/layouts` - Layouts de página',
            '`/app/composables` - Composables auto-importados',
            '`/app/plugins` - Plugins de la aplicación',
            '`/app/middleware` - Route middleware',
            '`/app/assets` - Assets sin procesar (CSS, imágenes)',
            '`/app/utils` - Funciones utilitarias auto-importadas',
            '`/server` - Código del servidor (API routes)',
            '`/server/api` - Endpoints de API',
            '`/server/routes` - Server routes con rendering',
            '`/server/middleware` - Server middleware',
            '`/public` - Assets estáticos servidos desde raíz',
            '`/content` - Contenido para Nuxt Content (opcional)',
          ],
        },
        {
          id: 'estructura-ejemplo',
          title: 'Ejemplo de Estructura',
          type: 'code',
          code: {
            title: 'Estructura típica de proyecto',
            language: 'plaintext',
            code: `my-nuxt-app/
├── app/
│   ├── app.vue              # Componente raíz
│   ├── app.config.ts        # Configuración runtime de app
│   ├── assets/
│   │   └── css/
│   │       └── main.css
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── ui/
│   │       └── Button.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   └── useFetch.ts
│   ├── layouts/
│   │   ├── default.vue
│   │   └── admin.vue
│   ├── middleware/
│   │   └── auth.ts
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   └── users/
│   │       ├── index.vue
│   │       └── [id].vue
│   ├── plugins/
│   │   └── api.ts
│   └── utils/
│       └── helpers.ts
├── server/
│   ├── api/
│   │   ├── users.get.ts
│   │   └── users/
│   │       └── [id].get.ts
│   ├── middleware/
│   │   └── logger.ts
│   └── utils/
│       └── db.ts
├── public/
│   ├── favicon.ico
│   └── images/
├── nuxt.config.ts
├── package.json
└── tsconfig.json`,
          },
        },
      ],
    },
    {
      id: 'paginas-routing',
      title: 'Páginas y Routing',
      type: 'text',
      content: 'Nuxt usa file-based routing. Cada archivo `.vue` en `/app/pages` se convierte automáticamente en una ruta.',
      subsections: [
        {
          id: 'routing-basico',
          title: 'Routing Básico',
          type: 'table',
          table: {
            headers: ['Archivo', 'Ruta generada'],
            rows: [
              ['`pages/index.vue`', '`/`'],
              ['`pages/about.vue`', '`/about`'],
              ['`pages/users/index.vue`', '`/users`'],
              ['`pages/users/profile.vue`', '`/users/profile`'],
              ['`pages/blog/[slug].vue`', '`/blog/:slug`'],
              ['`pages/[...slug].vue`', 'Catch-all route'],
            ],
          },
        },
        {
          id: 'pagina-basica',
          title: 'Página Básica',
          type: 'code',
          code: {
            title: 'app/pages/index.vue',
            language: 'vue',
            code: `<script setup lang="ts">
// Auto-imports disponibles
const route = useRoute()
const router = useRouter()

// SEO
useSeoMeta({
  title: 'Inicio',
  description: 'Página de inicio de mi aplicación',
})
</script>

<template>
  <div>
    <h1>Bienvenido a Nuxt 4</h1>
    <p>Esta es la página de inicio</p>
    <NuxtLink to="/about">Ir a About</NuxtLink>
  </div>
</template>`,
          },
        },
        {
          id: 'parametros-dinamicos',
          title: 'Parámetros Dinámicos',
          type: 'code',
          code: {
            title: 'app/pages/users/[id].vue',
            language: 'vue',
            code: `<script setup lang="ts">
const route = useRoute()
const userId = route.params.id

// O usando computed para reactividad
const userId = computed(() => route.params.id)

// Data fetching con el parámetro
const { data: user } = await useFetch(\`/api/users/\${userId}\`)
</script>

<template>
  <div>
    <h1>Usuario #{{ userId }}</h1>
    <div v-if="user">
      <p>Nombre: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>`,
          },
        },
        {
          id: 'catch-all-route',
          title: 'Catch-all Route',
          type: 'code',
          code: {
            title: 'app/pages/[...slug].vue',
            language: 'vue',
            code: `<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

// slug es un array: /a/b/c -> ['a', 'b', 'c']
console.log('Ruta capturada:', slug)
</script>

<template>
  <div>
    <h1>404 - Página no encontrada</h1>
    <p>Ruta solicitada: /{{ Array.isArray(slug) ? slug.join('/') : slug }}</p>
    <NuxtLink to="/">Volver al inicio</NuxtLink>
  </div>
</template>`,
          },
        },
        {
          id: 'navegacion-programatica',
          title: 'Navegación Programática',
          type: 'code',
          code: {
            title: 'useRouter() para navegación',
            language: 'typescript',
            code: `// En <script setup>
const router = useRouter()

// Navegar a una ruta
router.push('/users')
router.push({ path: '/users' })
router.push({ name: 'users' })

// Con parámetros
router.push({ path: \`/users/\${userId}\` })
router.push({ name: 'users-id', params: { id: userId } })

// Con query
router.push({ path: '/search', query: { q: 'nuxt' } })

// Reemplazar (sin añadir a history)
router.replace('/users')

// Navegar atrás/adelante
router.back()
router.forward()
router.go(-2) // 2 páginas atrás`,
          },
        },
        {
          id: 'nuxt-link',
          title: 'NuxtLink Component',
          type: 'code',
          code: {
            title: 'Uso de <NuxtLink>',
            language: 'vue',
            code: `<template>
  <!-- Link básico -->
  <NuxtLink to="/about">About</NuxtLink>

  <!-- Con parámetros -->
  <NuxtLink :to="\`/users/\${user.id}\`">
    {{ user.name }}
  </NuxtLink>

  <!-- Con objeto -->
  <NuxtLink :to="{ name: 'users-id', params: { id: user.id } }">
    Ver usuario
  </NuxtLink>

  <!-- Link externo -->
  <NuxtLink to="https://nuxt.com" external>
    Nuxt Website
  </NuxtLink>

  <!-- Prefetch deshabilitado -->
  <NuxtLink to="/heavy-page" :prefetch="false">
    Página pesada
  </NuxtLink>

  <!-- Active class personalizado -->
  <NuxtLink
    to="/dashboard"
    active-class="text-primary"
    exact-active-class="font-bold"
  >
    Dashboard
  </NuxtLink>
</template>`,
          },
        },
      ],
    },
    {
      id: 'layouts',
      title: 'Layouts',
      type: 'text',
      content: 'Los layouts envuelven páginas y permiten compartir UI común como headers, footers y sidebars.',
      subsections: [
        {
          id: 'layout-default',
          title: 'Layout por Defecto',
          type: 'code',
          code: {
            title: 'app/layouts/default.vue',
            language: 'vue',
            code: `<script setup lang="ts">
// Lógica compartida del layout
const isMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen">
    <header class="bg-gray-800 text-white">
      <nav class="container mx-auto p-4">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </nav>
    </header>

    <main class="container mx-auto p-4">
      <!-- Aquí se renderiza el contenido de la página -->
      <slot />
    </main>

    <footer class="bg-gray-100 mt-8">
      <div class="container mx-auto p-4 text-center">
        &copy; 2025 Mi App
      </div>
    </footer>
  </div>
</template>`,
          },
        },
        {
          id: 'layout-personalizado',
          title: 'Layout Personalizado',
          type: 'code',
          code: {
            title: 'app/layouts/admin.vue',
            language: 'vue',
            code: `<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <nav>
        <NuxtLink to="/admin">Dashboard</NuxtLink>
        <NuxtLink to="/admin/users">Usuarios</NuxtLink>
        <NuxtLink to="/admin/settings">Configuración</NuxtLink>
      </nav>
    </aside>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #1a202c;
  color: white;
  padding: 2rem;
}
</style>`,
          },
        },
        {
          id: 'usar-layout',
          title: 'Usar Layout en Página',
          type: 'code',
          code: {
            title: 'app/pages/admin/index.vue',
            language: 'vue',
            code: `<script setup lang="ts">
// Definir layout para esta página
definePageMeta({
  layout: 'admin',
  middleware: 'auth', // opcional
})
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Contenido del dashboard...</p>
  </div>
</template>`,
          },
        },
        {
          id: 'layout-dinamico',
          title: 'Layout Dinámico',
          type: 'code',
          code: {
            title: 'Cambiar layout dinámicamente',
            language: 'vue',
            code: `<script setup lang="ts">
const route = useRoute()

// Cambiar layout según condición
const layout = computed(() => {
  return route.path.startsWith('/admin') ? 'admin' : 'default'
})

setPageLayout(layout.value)
</script>`,
          },
        },
      ],
    },
    {
      id: 'componentes',
      title: 'Componentes',
      type: 'text',
      content: 'Los componentes en `/app/components` se auto-importan automáticamente.',
      subsections: [
        {
          id: 'auto-import-componentes',
          title: 'Auto-import de Componentes',
          type: 'code',
          code: {
            title: 'app/components/Button.vue',
            language: 'vue',
            code: `<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :class="[
      'px-4 py-2 rounded',
      variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200',
    ]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>`,
          },
        },
        {
          id: 'usar-componente',
          title: 'Usar Componente (sin import)',
          type: 'code',
          code: {
            title: 'Auto-import en acción',
            language: 'vue',
            code: `<template>
  <div>
    <!-- Sin necesidad de import! -->
    <Button variant="primary" @click="handleClick">
      Click me
    </Button>

    <!-- Componentes anidados: ui/Card.vue -->
    <UiCard>
      <h2>Título</h2>
      <p>Contenido</p>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
// NO necesitas importar Button ni UiCard
const handleClick = () => {
  console.log('Clicked!')
}
</script>`,
          },
        },
        {
          id: 'componentes-cliente',
          title: 'Client-only Components',
          type: 'code',
          code: {
            title: 'Componentes que solo se ejecutan en cliente',
            language: 'vue',
            code: `<template>
  <div>
    <!-- Solo se renderiza en el cliente -->
    <ClientOnly>
      <MapComponent />

      <!-- Fallback para SSR -->
      <template #fallback>
        <div>Cargando mapa...</div>
      </template>
    </ClientOnly>
  </div>
</template>`,
          },
        },
        {
          id: 'componentes-lazy',
          title: 'Lazy Loading de Componentes',
          type: 'code',
          code: {
            title: 'Cargar componentes bajo demanda',
            language: 'vue',
            code: `<script setup lang="ts">
// Agregar "Lazy" como prefijo para lazy loading
// El componente se cargará solo cuando se renderice
</script>

<template>
  <div>
    <!-- Se carga solo cuando showModal es true -->
    <LazyModal v-if="showModal" />

    <!-- Componente pesado que se lazy-load -->
    <LazyChartComponent :data="chartData" />
  </div>
</template>`,
          },
        },
      ],
    },
    {
      id: 'composables',
      title: 'Composables',
      type: 'text',
      content: 'Los composables en `/app/composables` se auto-importan. Son funciones reutilizables con lógica reactiva.',
      subsections: [
        {
          id: 'composable-basico',
          title: 'Composable Básico',
          type: 'code',
          code: {
            title: 'app/composables/useCounter.ts',
            language: 'typescript',
            code: `export const useCounter = (initialValue = 0) => {
  const count = ref(initialValue)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const reset = () => {
    count.value = initialValue
  }

  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
  }
}`,
          },
        },
        {
          id: 'composable-auth',
          title: 'Composable de Autenticación',
          type: 'code',
          code: {
            title: 'app/composables/useAuth.ts',
            language: 'typescript',
            code: `interface User {
  id: string
  name: string
  email: string
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      user.value = response.user
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/login')
  }

  const fetchUser = async () => {
    try {
      const response = await $fetch('/api/auth/me')
      user.value = response.user
    } catch {
      user.value = null
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
    fetchUser,
  }
}`,
          },
        },
        {
          id: 'usar-composable',
          title: 'Usar Composable',
          type: 'code',
          code: {
            title: 'Uso en componente',
            language: 'vue',
            code: `<script setup lang="ts">
// Auto-imported!
const { count, increment, decrement } = useCounter(10)
const { user, isAuthenticated, logout } = useAuth()
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Bienvenido, {{ user?.name }}</p>
      <button @click="logout">Cerrar sesión</button>
    </div>

    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </div>
  </div>
</template>`,
          },
        },
      ],
    },
    {
      id: 'data-fetching',
      title: 'Data Fetching',
      type: 'text',
      content: 'Nuxt proporciona composables para hacer fetch de datos con SSR support: useFetch, useAsyncData, useLazyFetch, useLazyAsyncData.',
      subsections: [
        {
          id: 'usefetch',
          title: 'useFetch',
          type: 'code',
          code: {
            title: 'Fetch básico de API',
            language: 'typescript',
            code: `// Fetch automático en SSR y cliente
const { data, pending, error, refresh } = await useFetch('/api/users')

// Con parámetros dinámicos
const userId = ref('1')
const { data: user } = await useFetch(\`/api/users/\${userId.value}\`)

// Con opciones
const { data, pending, error } = await useFetch('/api/posts', {
  method: 'POST',
  body: { title: 'Hello' },
  headers: {
    'Content-Type': 'application/json',
  },
  // Re-fetch cuando cambie userId
  watch: [userId],
  // Transformar data
  transform: (data) => data.posts,
  // Pick solo campos necesarios
  pick: ['id', 'title'],
})`,
          },
        },
        {
          id: 'useasyncdata',
          title: 'useAsyncData',
          type: 'code',
          code: {
            title: 'Para lógica de fetch personalizada',
            language: 'typescript',
            code: `// Cuando necesitas lógica custom
const { data, pending, error } = await useAsyncData(
  'users', // key única
  async () => {
    // Tu lógica custom
    const [users, posts] = await Promise.all([
      $fetch('/api/users'),
      $fetch('/api/posts'),
    ])
    return { users, posts }
  }
)

// Con dependencias reactivas
const userId = ref('1')
const { data: user } = await useAsyncData(
  \`user-\${userId.value}\`,
  () => $fetch(\`/api/users/\${userId.value}\`),
  {
    watch: [userId],
  }
)`,
          },
        },
        {
          id: 'lazy-fetch',
          title: 'Lazy Data Fetching',
          type: 'code',
          code: {
            title: 'No bloquea la navegación',
            language: 'typescript',
            code: `// No espera en SSR, permite navegación inmediata
const { pending, data: posts } = useLazyFetch('/api/posts')

const { pending, data: user } = useLazyAsyncData('user', () =>
  $fetch('/api/user')
)

// Uso en template
<template>
  <div>
    <div v-if="pending">Cargando...</div>
    <div v-else-if="posts">
      <div v-for="post in posts" :key="post.id">
        {{ post.title }}
      </div>
    </div>
  </div>
</template>`,
          },
        },
        {
          id: 'refresh-data',
          title: 'Refrescar Datos',
          type: 'code',
          code: {
            title: 'Refresh manual de datos',
            language: 'typescript',
            code: `const { data, refresh } = await useFetch('/api/posts')

// Refrescar manualmente
const handleRefresh = async () => {
  await refresh()
}

// Refrescar todos los datos de la página
const refreshAll = () => {
  refreshNuxtData()
}

// Refrescar datos específicos por key
const refreshPosts = () => {
  refreshNuxtData('posts')
}`,
          },
        },
        {
          id: 'error-handling-fetch',
          title: 'Manejo de Errores',
          type: 'code',
          code: {
            title: 'Manejar errores en data fetching',
            language: 'vue',
            code: `<script setup lang="ts">
const { data, error, pending } = await useFetch('/api/users', {
  // Opciones de error
  onResponseError({ response }) {
    console.error('Error:', response.status)
  },
})

// O con try-catch
const fetchData = async () => {
  try {
    const { data } = await useFetch('/api/users')
    return data.value
  } catch (err) {
    console.error('Error fetching data:', err)
    throw createError({
      statusCode: 500,
      message: 'Error al cargar usuarios',
    })
  }
}
</script>

<template>
  <div>
    <div v-if="pending">Cargando...</div>
    <div v-else-if="error">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <!-- Mostrar data -->
    </div>
  </div>
</template>`,
          },
        },
      ],
    },
    {
      id: 'usestate',
      title: 'useState - Estado Global',
      type: 'text',
      content: 'useState crea estado reactivo compartido entre componentes, compatible con SSR.',
      subsections: [
        {
          id: 'usestate-basico',
          title: 'useState Básico',
          type: 'code',
          code: {
            title: 'Estado compartido simple',
            language: 'typescript',
            code: `// En cualquier componente o composable
const counter = useState('counter', () => 0)
const user = useState<User | null>('user', () => null)

// Modificar
counter.value++
user.value = { id: '1', name: 'Juan' }

// Leer en otro componente (misma key)
const counter = useState('counter') // comparte el mismo estado`,
          },
        },
        {
          id: 'usestate-composable',
          title: 'useState en Composable',
          type: 'code',
          code: {
            title: 'app/composables/useCart.ts',
            language: 'typescript',
            code: `interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])

  const addItem = (item: CartItem) => {
    const existingItem = items.value.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...item, quantity: 1 })
    }
  }

  const removeItem = (id: string) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  return {
    items: readonly(items),
    total,
    itemCount,
    addItem,
    removeItem,
  }
}`,
          },
        },
        {
          id: 'usestate-uso',
          title: 'Usar Estado Global',
          type: 'code',
          code: {
            title: 'Compartir estado entre componentes',
            language: 'vue',
            code: `<!-- Componente A -->
<script setup lang="ts">
const { items, addItem } = useCart()

const handleAdd = () => {
  addItem({ id: '1', name: 'Producto', price: 100 })
}
</script>

<!-- Componente B (en otra parte de la app) -->
<script setup lang="ts">
const { items, total, itemCount } = useCart()
// Mismo estado compartido!
</script>

<template>
  <div>
    <p>Items en carrito: {{ itemCount }}</p>
    <p>Total: ${{ total }}</p>
  </div>
</template>`,
          },
        },
      ],
    },
    {
      id: 'server-routes',
      title: 'Server Routes (API)',
      type: 'text',
      content: 'Crea APIs RESTful en el directorio `/server/api` con auto-routing.',
      subsections: [
        {
          id: 'api-get',
          title: 'GET Endpoint',
          type: 'code',
          code: {
            title: 'server/api/users/index.get.ts',
            language: 'typescript',
            code: `export default defineEventHandler(async (event) => {
  // Query params
  const query = getQuery(event)
  const page = query.page || 1

  // Tu lógica (DB, etc)
  const users = await db.users.findMany({
    skip: (page - 1) * 10,
    take: 10,
  })

  return {
    users,
    page,
    total: users.length,
  }
})

// Accesible en: GET /api/users?page=1`,
          },
        },
        {
          id: 'api-post',
          title: 'POST Endpoint',
          type: 'code',
          code: {
            title: 'server/api/users/index.post.ts',
            language: 'typescript',
            code: `export default defineEventHandler(async (event) => {
  // Leer body
  const body = await readBody(event)

  // Validación
  if (!body.email || !body.name) {
    throw createError({
      statusCode: 400,
      message: 'Email y nombre son requeridos',
    })
  }

  // Crear usuario
  const user = await db.users.create({
    data: {
      email: body.email,
      name: body.name,
    },
  })

  return {
    success: true,
    user,
  }
})

// Accesible en: POST /api/users`,
          },
        },
        {
          id: 'api-dinamico',
          title: 'Rutas Dinámicas',
          type: 'code',
          code: {
            title: 'server/api/users/[id].get.ts',
            language: 'typescript',
            code: `export default defineEventHandler(async (event) => {
  // Obtener parámetro de ruta
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID es requerido',
    })
  }

  const user = await db.users.findUnique({
    where: { id },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'Usuario no encontrado',
    })
  }

  return user
})

// Accesible en: GET /api/users/123`,
          },
        },
        {
          id: 'api-delete',
          title: 'DELETE Endpoint',
          type: 'code',
          code: {
            title: 'server/api/users/[id].delete.ts',
            language: 'typescript',
            code: `export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  await db.users.delete({
    where: { id },
  })

  return {
    success: true,
    message: 'Usuario eliminado',
  }
})

// Accesible en: DELETE /api/users/123`,
          },
        },
        {
          id: 'api-middleware',
          title: 'Server Middleware',
          type: 'code',
          code: {
            title: 'server/middleware/auth.ts',
            language: 'typescript',
            code: `export default defineEventHandler(async (event) => {
  // Se ejecuta en TODAS las requests
  const token = getHeader(event, 'authorization')

  if (event.path.startsWith('/api/admin')) {
    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'No autorizado',
      })
    }

    // Validar token y agregar user al context
    const user = await validateToken(token)
    event.context.user = user
  }
})`,
          },
        },
        {
          id: 'api-utils',
          title: 'Server Utils',
          type: 'code',
          code: {
            title: 'server/utils/db.ts',
            language: 'typescript',
            code: `// Auto-imported en server routes
export const db = {
  users: {
    async findMany(options?: any) {
      // Tu lógica de DB
      return []
    },
    async findUnique(options: any) {
      return null
    },
    async create(options: any) {
      return {}
    },
  },
}

export const validateToken = async (token: string) => {
  // Validar JWT, etc
  return { id: '1', email: 'user@example.com' }
}`,
          },
        },
      ],
    },
    {
      id: 'middleware',
      title: 'Middleware',
      type: 'text',
      content: 'Los middleware se ejecutan antes de renderizar una página. Útiles para autenticación, logging, etc.',
      subsections: [
        {
          id: 'middleware-auth',
          title: 'Auth Middleware',
          type: 'code',
          code: {
            title: 'app/middleware/auth.ts',
            language: 'typescript',
            code: `export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})`,
          },
        },
        {
          id: 'middleware-global',
          title: 'Middleware Global',
          type: 'code',
          code: {
            title: 'app/middleware/logger.global.ts',
            language: 'typescript',
            code: `// .global.ts se ejecuta en TODAS las rutas
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Navegando de', from.path, 'a', to.path)

  // Tracking analytics
  if (import.meta.client) {
    // @ts-ignore
    window.gtag?.('event', 'page_view', {
      page_path: to.path,
    })
  }
})`,
          },
        },
        {
          id: 'middleware-page',
          title: 'Usar Middleware en Página',
          type: 'code',
          code: {
            title: 'app/pages/admin/index.vue',
            language: 'vue',
            code: `<script setup lang="ts">
definePageMeta({
  middleware: 'auth', // un middleware
  // o múltiples:
  // middleware: ['auth', 'admin'],
})
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
  </div>
</template>`,
          },
        },
        {
          id: 'middleware-inline',
          title: 'Inline Middleware',
          type: 'code',
          code: {
            title: 'Middleware directo en página',
            language: 'vue',
            code: `<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      const { user } = useAuth()
      if (user.value?.role !== 'admin') {
        return abortNavigation('No tienes permisos de admin')
      }
    },
  ],
})
</script>`,
          },
        },
      ],
    },
    {
      id: 'plugins',
      title: 'Plugins',
      type: 'text',
      content: 'Los plugins se ejecutan al inicializar la app. Útiles para configurar librerías, añadir helpers globales, etc.',
      subsections: [
        {
          id: 'plugin-basico',
          title: 'Plugin Básico',
          type: 'code',
          code: {
            title: 'app/plugins/api.ts',
            language: 'typescript',
            code: `export default defineNuxtPlugin((nuxtApp) => {
  // Configurar instancia de API
  const api = $fetch.create({
    baseURL: '/api',
    onRequest({ options }) {
      // Añadir headers
      const token = useCookie('auth-token')
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: \`Bearer \${token.value}\`,
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    },
  })

  // Proveer globalmente
  return {
    provide: {
      api,
    },
  }
})`,
          },
        },
        {
          id: 'plugin-vue',
          title: 'Plugin de Vue',
          type: 'code',
          code: {
            title: 'app/plugins/vue-plugins.ts',
            language: 'typescript',
            code: `import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueToast, {
    position: 'top-right',
  })
})`,
          },
        },
        {
          id: 'plugin-helper',
          title: 'Plugin con Helpers',
          type: 'code',
          code: {
            title: 'app/plugins/helpers.ts',
            language: 'typescript',
            code: `export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (date: Date | string) => {
        return new Date(date).toLocaleDateString('es-ES')
      },
      currency: (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(amount)
      },
    },
  }
})

// Uso en componentes:
// const { $formatDate, $currency } = useNuxtApp()
// $formatDate(new Date()) // "26/11/2025"
// $currency(1000) // "1.000,00 €"`,
          },
        },
        {
          id: 'plugin-client-only',
          title: 'Plugin Solo Cliente',
          type: 'code',
          code: {
            title: 'app/plugins/analytics.client.ts',
            language: 'typescript',
            code: `// .client.ts solo se ejecuta en el cliente
export default defineNuxtPlugin(() => {
  // Google Analytics
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', 'GA_ID')

  return {
    provide: {
      gtag,
    },
  }
})`,
          },
        },
      ],
    },
    {
      id: 'seo-meta',
      title: 'SEO y Meta Tags',
      type: 'text',
      content: 'Nuxt proporciona composables para manejar SEO: useSeoMeta, useHead, useSeoHead.',
      subsections: [
        {
          id: 'useseometa',
          title: 'useSeoMeta',
          type: 'code',
          code: {
            title: 'SEO básico en página',
            language: 'vue',
            code: `<script setup lang="ts">
useSeoMeta({
  title: 'Mi Página - Mi App',
  description: 'Descripción de mi página para SEO',
  ogTitle: 'Mi Página',
  ogDescription: 'Descripción para Open Graph',
  ogImage: 'https://miapp.com/og-image.jpg',
  ogUrl: 'https://miapp.com/mi-pagina',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Mi Página',
  twitterDescription: 'Descripción para Twitter',
  twitterImage: 'https://miapp.com/twitter-image.jpg',
})
</script>`,
          },
        },
        {
          id: 'usehead',
          title: 'useHead',
          type: 'code',
          code: {
            title: 'Control completo del <head>',
            language: 'vue',
            code: `<script setup lang="ts">
useHead({
  title: 'Mi Página',
  meta: [
    { name: 'description', content: 'Descripción de mi página' },
    { property: 'og:title', content: 'Mi Página' },
    { property: 'og:description', content: 'Descripción OG' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://miapp.com/mi-pagina' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  script: [
    {
      src: 'https://example.com/script.js',
      async: true,
      defer: true,
    },
  ],
  bodyAttrs: {
    class: 'my-page',
  },
})
</script>`,
          },
        },
        {
          id: 'seo-dinamico',
          title: 'SEO Dinámico',
          type: 'code',
          code: {
            title: 'SEO con datos dinámicos',
            language: 'vue',
            code: `<script setup lang="ts">
const route = useRoute()
const { data: post } = await useFetch(\`/api/posts/\${route.params.id}\`)

useSeoMeta({
  title: () => \`\${post.value?.title} - Mi Blog\`,
  description: () => post.value?.excerpt,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogImage: () => post.value?.coverImage,
  ogUrl: () => \`https://miapp.com/posts/\${route.params.id}\`,
})
</script>`,
          },
        },
        {
          id: 'title-template',
          title: 'Title Template',
          type: 'code',
          code: {
            title: 'app/app.vue - Template global',
            language: 'vue',
            code: `<script setup lang="ts">
// En app.vue para aplicar a todas las páginas
useHead({
  titleTemplate: (title) => {
    return title ? \`\${title} - Mi App\` : 'Mi App'
  },
})
</script>

<!-- Ahora en páginas solo defines el título:
useSeoMeta({ title: 'Home' })
// Resultado: "Home - Mi App"
-->`,
          },
        },
      ],
    },
    {
      id: 'nuxt-config',
      title: 'nuxt.config.ts',
      type: 'text',
      content: 'Configuración principal de Nuxt. Define módulos, build options, runtime config, etc.',
      subsections: [
        {
          id: 'config-basico',
          title: 'Configuración Básica',
          type: 'code',
          code: {
            title: 'nuxt.config.ts',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  // Compatibilidad Nuxt 4
  compatibilityDate: '2025-11-26',

  // Directorio de la app (default: app/)
  srcDir: 'app/',

  // CSS global
  css: ['~/assets/css/main.css'],

  // Módulos
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  // Componentes auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Vite config
  vite: {
    plugins: [],
  },

  // App config
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Mi App Nuxt',
      meta: [
        { name: 'description', content: 'Mi aplicación Nuxt' },
      ],
    },
  },
})`,
          },
        },
        {
          id: 'runtime-config',
          title: 'Runtime Config',
          type: 'code',
          code: {
            title: 'Variables de entorno y runtime',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys (solo servidor)
    apiSecret: process.env.API_SECRET,
    databaseUrl: process.env.DATABASE_URL,

    // Public keys (cliente y servidor)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      environment: process.env.NODE_ENV,
    },
  },
})

// Uso en código:
// const config = useRuntimeConfig()
// console.log(config.public.apiBase) // accesible en cliente
// console.log(config.apiSecret) // solo en servidor`,
          },
        },
        {
          id: 'config-modules',
          title: 'Configuración de Módulos',
          type: 'code',
          code: {
            title: 'Configurar módulos instalados',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/content',
  ],

  // Configuración de Tailwind
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  // Configuración de Nuxt Content
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['vue', 'typescript', 'javascript'],
    },
  },

  // Nitro (servidor)
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
  },
})`,
          },
        },
        {
          id: 'config-routes',
          title: 'Configurar Rutas',
          type: 'code',
          code: {
            title: 'Pages y routing config',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  // Rutas opcionales
  pages: true, // default

  // Router options
  router: {
    options: {
      strict: true,
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },

  // Route rules
  routeRules: {
    '/': { prerender: true },
    '/admin/**': { ssr: false }, // SPA mode
    '/api/**': { cors: true },
    '/old-page': { redirect: '/new-page' },
  },
})`,
          },
        },
      ],
    },
    {
      id: 'error-handling',
      title: 'Error Handling',
      type: 'text',
      content: 'Nuxt proporciona herramientas para manejar errores en cliente y servidor.',
      subsections: [
        {
          id: 'error-page',
          title: 'Página de Error',
          type: 'code',
          code: {
            title: 'app/error.vue',
            language: 'vue',
            code: `<script setup lang="ts">
interface Props {
  error: {
    statusCode: number
    message: string
    stack?: string
  }
}

const props = defineProps<Props>()

const handleClear = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>

    <div v-if="error.statusCode === 404">
      <h2>Página no encontrada</h2>
      <NuxtLink to="/">Ir al inicio</NuxtLink>
    </div>

    <div v-else>
      <h2>Ha ocurrido un error</h2>
      <button @click="handleClear">Volver al inicio</button>
    </div>

    <pre v-if="error.stack">{{ error.stack }}</pre>
  </div>
</template>`,
          },
        },
        {
          id: 'throw-error',
          title: 'Lanzar Errores',
          type: 'code',
          code: {
            title: 'createError y showError',
            language: 'typescript',
            code: `// En páginas o componentes
const { data: user } = await useFetch('/api/user')

if (!user.value) {
  throw createError({
    statusCode: 404,
    message: 'Usuario no encontrado',
    fatal: true, // no recuperable
  })
}

// O mostrar error sin lanzar
showError({
  statusCode: 500,
  message: 'Error al cargar datos',
})

// En server routes
export default defineEventHandler(() => {
  throw createError({
    statusCode: 401,
    message: 'No autorizado',
  })
})`,
          },
        },
        {
          id: 'clear-error',
          title: 'Limpiar Errores',
          type: 'code',
          code: {
            title: 'clearError en página de error',
            language: 'typescript',
            code: `// En error.vue o cualquier componente
const handleRetry = () => {
  clearError({ redirect: '/' })
}

// O navegar a otra página
const handleGoHome = () => {
  clearError()
  navigateTo('/')
}`,
          },
        },
        {
          id: 'error-boundary',
          title: 'Error Boundary',
          type: 'code',
          code: {
            title: 'NuxtErrorBoundary component',
            language: 'vue',
            code: `<template>
  <NuxtErrorBoundary>
    <!-- Contenido que puede fallar -->
    <SomeComponent />

    <!-- Template de error personalizado -->
    <template #error="{ error, clearError }">
      <div class="error-boundary">
        <h2>Error en este componente</h2>
        <p>{{ error.message }}</p>
        <button @click="clearError">Reintentar</button>
      </div>
    </template>
  </NuxtErrorBoundary>
</template>`,
          },
        },
      ],
    },
    {
      id: 'env-variables',
      title: 'Variables de Entorno',
      type: 'text',
      content: 'Gestión de variables de entorno en Nuxt con archivos .env y runtime config.',
      subsections: [
        {
          id: 'env-file',
          title: 'Archivo .env',
          type: 'code',
          code: {
            title: '.env',
            language: 'bash',
            code: `# Variables privadas (solo servidor)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
API_SECRET=super-secret-key

# Variables públicas (prefijo NUXT_PUBLIC_)
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_PUBLIC_APP_NAME=Mi App
NUXT_PUBLIC_ENABLE_FEATURE=true`,
          },
        },
        {
          id: 'env-nuxt-config',
          title: 'Usar en nuxt.config.ts',
          type: 'code',
          code: {
            title: 'nuxt.config.ts',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  runtimeConfig: {
    // Private - Solo servidor
    databaseUrl: process.env.DATABASE_URL,
    apiSecret: process.env.API_SECRET,

    // Public - Cliente y servidor
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      enableFeature: process.env.NUXT_PUBLIC_ENABLE_FEATURE === 'true',
    },
  },
})`,
          },
        },
        {
          id: 'env-uso-codigo',
          title: 'Usar en Código',
          type: 'code',
          code: {
            title: 'Acceder a runtime config',
            language: 'typescript',
            code: `// En componentes, páginas, composables
const config = useRuntimeConfig()

// Variables públicas
console.log(config.public.apiBase)
console.log(config.public.appName)

// En server routes (acceso a privadas)
export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  // Acceso a variables privadas
  const dbUrl = config.databaseUrl
  const secret = config.apiSecret

  // También a públicas
  const apiBase = config.public.apiBase

  return { message: 'OK' }
})`,
          },
        },
        {
          id: 'env-tipos',
          title: 'Type Safety para Env',
          type: 'code',
          code: {
            title: 'Tipos para runtime config',
            language: 'typescript',
            code: `// types/env.d.ts
declare module 'nuxt/schema' {
  interface RuntimeConfig {
    databaseUrl: string
    apiSecret: string
  }
  interface PublicRuntimeConfig {
    apiBase: string
    appName: string
    enableFeature: boolean
  }
}

export {}`,
          },
        },
      ],
    },
    {
      id: 'deployment',
      title: 'Deployment',
      type: 'text',
      content: 'Nuxt soporta múltiples plataformas de deployment con presets específicos.',
      subsections: [
        {
          id: 'build-commands',
          title: 'Comandos de Build',
          type: 'table',
          table: {
            headers: ['Comando', 'Descripción'],
            rows: [
              ['`nuxt build`', 'Build para producción (SSR/SSG)'],
              ['`nuxt generate`', 'Static site generation (SSG)'],
              ['`nuxt preview`', 'Preview del build local'],
              ['`nuxt analyze`', 'Analizar bundle size'],
            ],
          },
        },
        {
          id: 'deploy-vercel',
          title: 'Vercel',
          type: 'code',
          code: {
            title: 'nuxt.config.ts',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },
})

// Vercel detecta automáticamente Nuxt
// Solo haz push a GitHub y conecta en Vercel`,
          },
        },
        {
          id: 'deploy-netlify',
          title: 'Netlify',
          type: 'code',
          code: {
            title: 'nuxt.config.ts',
            language: 'typescript',
            code: `export default defineNuxtConfig({
  nitro: {
    preset: 'netlify',
  },
})

// netlify.toml
/*
[build]
  command = "npm run build"
  publish = ".output/public"
*/`,
          },
        },
        {
          id: 'deploy-node',
          title: 'Node.js Server',
          type: 'code',
          code: {
            title: 'Deploy en servidor Node',
            language: 'bash',
            code: `# Build
npm run build

# La salida estará en .output/
# Ejecutar servidor:
node .output/server/index.mjs

# Con PM2
pm2 start .output/server/index.mjs --name my-app`,
          },
        },
        {
          id: 'deploy-static',
          title: 'Static Hosting (SSG)',
          type: 'code',
          code: {
            title: 'Generate static site',
            language: 'bash',
            code: `# Generar sitio estático
npm run generate

# Los archivos estáticos estarán en .output/public/
# Puedes subirlos a:
# - GitHub Pages
# - Cloudflare Pages
# - AWS S3
# - Cualquier hosting estático`,
          },
        },
        {
          id: 'deploy-docker',
          title: 'Docker',
          type: 'code',
          code: {
            title: 'Dockerfile',
            language: 'dockerfile',
            code: `FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm ci

# Copiar código
COPY . .

# Build
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Ejecutar
CMD ["node", ".output/server/index.mjs"]`,
          },
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      type: 'text',
      content: 'Mejores prácticas para desarrollo con Nuxt 4.',
      subsections: [
        {
          id: 'practices-list',
          title: 'Recomendaciones Generales',
          type: 'list',
          items: [
            '**Usa TypeScript**: Type safety previene errores y mejora DX',
            '**Auto-imports**: Aprovecha auto-imports de componentes, composables y utils',
            '**useFetch sobre $fetch**: Usa `useFetch()` en componentes para SSR support automático',
            '**useState para estado global**: Mejor que Pinia para estado simple compartido',
            '**Lazy loading**: Usa `<ClientOnly>` y `Lazy` prefix para componentes pesados',
            '**SEO**: Define `useSeoMeta()` en todas las páginas importantes',
            '**Error handling**: Implementa página `error.vue` personalizada',
            '**Environment vars**: Usa `NUXT_PUBLIC_` prefix para variables públicas',
            '**Code splitting**: Nuxt lo hace automático, pero verifica con `nuxt analyze`',
            '**Runtime config**: Nunca hagas hardcode de secrets, usa `runtimeConfig`',
          ],
        },
        {
          id: 'practices-performance',
          title: 'Performance',
          type: 'code',
          code: {
            title: 'Optimizaciones de performance',
            language: 'vue',
            code: `<!-- 1. Lazy load componentes pesados -->
<ClientOnly>
  <LazyHeavyChart :data="chartData" />
  <template #fallback>
    <div>Cargando gráfico...</div>
  </template>
</ClientOnly>

<!-- 2. Prefetch selectivo -->
<NuxtLink to="/heavy-page" :prefetch="false">
  Página pesada
</NuxtLink>

<!-- 3. useLazyFetch para datos no críticos -->
<script setup>
const { data } = useLazyFetch('/api/non-critical')
</script>

<!-- 4. Optimizar imágenes -->
<NuxtImg
  src="/large-image.jpg"
  width="800"
  height="600"
  format="webp"
  loading="lazy"
/>`,
          },
        },
        {
          id: 'practices-structure',
          title: 'Estructura de Código',
          type: 'code',
          code: {
            title: 'Organización recomendada',
            language: 'typescript',
            code: `// 1. Composables para lógica compartida
// app/composables/useProducts.ts
export const useProducts = () => {
  const products = useState<Product[]>('products', () => [])

  const fetchProducts = async () => {
    const { data } = await useFetch('/api/products')
    products.value = data.value || []
  }

  return { products, fetchProducts }
}

// 2. Utils para funciones puras
// app/utils/format.ts
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

// 3. Types centralizados
// app/types/models.ts
export interface Product {
  id: string
  name: string
  price: number
}

// 4. Server utils separados
// server/utils/db.ts
export const getProducts = async () => {
  return await prisma.product.findMany()
}`,
          },
        },
        {
          id: 'practices-security',
          title: 'Seguridad',
          type: 'list',
          items: [
            '**Nunca expongas secrets**: Usa variables privadas en `runtimeConfig`',
            '**Valida inputs**: Valida todos los datos de usuario en server routes',
            '**CORS**: Configura CORS apropiadamente en `routeRules`',
            '**Rate limiting**: Implementa rate limiting en APIs públicas',
            '**Sanitiza HTML**: Usa `v-html` con cuidado, sanitiza contenido UGC',
            '**Headers de seguridad**: Configura CSP, X-Frame-Options, etc.',
            '**Autenticación**: Usa middleware para proteger rutas',
            '**HTTPS**: Siempre usa HTTPS en producción',
          ],
        },
        {
          id: 'practices-testing',
          title: 'Testing',
          type: 'code',
          code: {
            title: 'Setup de testing recomendado',
            language: 'typescript',
            code: `// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'nuxt',
    globals: true,
  },
})

// tests/components/Button.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '~/components/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })
})`,
          },
        },
      ],
    },
    {
      id: 'recursos',
      title: 'Recursos Adicionales',
      type: 'text',
      content: 'Enlaces útiles para aprender más sobre Nuxt 4.',
      subsections: [
        {
          id: 'recursos-links',
          title: 'Links Importantes',
          type: 'list',
          items: [
            '[Documentación oficial de Nuxt](https://nuxt.com)',
            '[Nuxt Modules](https://nuxt.com/modules)',
            '[Nuxt Examples](https://nuxt.com/docs/examples)',
            '[Vue 3 Docs](https://vuejs.org)',
            '[Nitro (Nuxt Server)](https://nitro.unjs.io)',
            '[UnJS Ecosystem](https://unjs.io)',
            '[Nuxt Discord](https://discord.com/invite/nuxt)',
          ],
        },
      ],
    },
  ],
}
