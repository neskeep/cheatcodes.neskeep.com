import type { Cheatcode } from '../types'

export const nextCheatcode: Cheatcode = {
  metadata: {
    id: 'next',
    title: 'Next.js',
    language: 'Next.js',
    category: 'framework',
    tags: ['next', 'react', 'javascript', 'framework', 'frontend'],
    version: '15',
    description: 'Guía completa de Next.js 15: App Router, Server Components, Server Actions, Caching y más',
    lastUpdated: '2025-11-26',
    logo: '/logos/next.svg',
    color: '#000000',
    difficulty: 'intermediate',
  },
  sections: [
    {
      id: 'instalacion',
      title: 'Instalación y Setup',
      type: 'package-install',
      content: 'Crea un nuevo proyecto de Next.js 15 con App Router',
      packageCommands: {
        npm: 'npx create-next-app@latest',
        pnpm: 'pnpm create next-app',
        yarn: 'yarn create next-app',
        bun: 'bunx create-next-app',
      },
    },
    {
      id: 'estructura-proyecto',
      title: 'Estructura de Proyecto (App Router)',
      type: 'text',
      content: 'Next.js 15 usa el App Router por defecto. Esta es la estructura básica:',
      subsections: [
        {
          id: 'estructura-basica',
          title: 'Estructura básica',
          type: 'code',
          code: {
            title: 'Árbol de directorios',
            language: 'plaintext',
            code: `my-app/
├── app/                    # App Router (nuevo)
│   ├── layout.tsx         # Layout raíz (requerido)
│   ├── page.tsx           # Página principal (/)
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error UI
│   ├── not-found.tsx      # 404 UI
│   ├── about/
│   │   └── page.tsx       # Ruta /about
│   ├── blog/
│   │   ├── page.tsx       # Ruta /blog
│   │   └── [slug]/
│   │       └── page.tsx   # Ruta dinámica /blog/[slug]
│   └── api/
│       └── route.ts       # Route Handler (API)
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y helpers
├── public/                # Assets estáticos
├── styles/                # CSS global
├── .env.local            # Variables de entorno
├── next.config.js        # Configuración de Next.js
├── package.json
└── tsconfig.json`,
          },
        },
      ],
    },
    {
      id: 'routing',
      title: 'Routing y Navegación',
      type: 'text',
      content: 'Sistema de routing basado en archivos con el App Router',
      subsections: [
        {
          id: 'routing-basico',
          title: 'Rutas básicas',
          type: 'code',
          code: {
            title: 'Creando rutas con archivos',
            language: 'tsx',
            code: `// app/page.tsx - Ruta: /
export default function HomePage() {
  return <h1>Página Principal</h1>
}

// app/about/page.tsx - Ruta: /about
export default function AboutPage() {
  return <h1>Acerca de</h1>
}

// app/blog/page.tsx - Ruta: /blog
export default function BlogPage() {
  return <h1>Blog</h1>
}`,
          },
        },
        {
          id: 'rutas-dinamicas',
          title: 'Rutas dinámicas',
          type: 'code',
          code: {
            title: 'Rutas con parámetros dinámicos',
            language: 'tsx',
            code: `// app/blog/[slug]/page.tsx - Ruta: /blog/:slug
interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <article>
      <h1>Post: {slug}</h1>
    </article>
  )
}

// app/shop/[category]/[product]/page.tsx
// Ruta: /shop/:category/:product
export default async function ProductPage({ params }: PageProps) {
  const { category, product } = await params

  return (
    <div>
      <h1>{product}</h1>
      <p>Categoría: {category}</p>
    </div>
  )
}`,
          },
        },
        {
          id: 'catch-all-routes',
          title: 'Catch-all routes',
          type: 'code',
          code: {
            title: 'Rutas que capturan múltiples segmentos',
            language: 'tsx',
            code: `// app/docs/[...slug]/page.tsx
// Captura: /docs/a, /docs/a/b, /docs/a/b/c
interface PageProps {
  params: Promise<{ slug: string[] }>
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div>
      <h1>Docs</h1>
      <p>Ruta: {slug.join('/')}</p>
    </div>
  )
}

// app/blog/[[...slug]]/page.tsx
// Catch-all opcional: también captura /blog
export default async function OptionalCatchAll({ params }: PageProps) {
  const { slug } = await params

  if (!slug) {
    return <h1>Blog Index</h1>
  }

  return <h1>Blog: {slug.join('/')}</h1>
}`,
          },
        },
        {
          id: 'navegacion-link',
          title: 'Navegación con Link',
          type: 'code',
          code: {
            title: 'Componente Link para navegación',
            language: 'tsx',
            code: `import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* Link básico */}
      <Link href="/">Inicio</Link>

      {/* Link con ruta dinámica */}
      <Link href="/blog/mi-post">Mi Post</Link>

      {/* Link con objeto */}
      <Link
        href={{
          pathname: '/blog/[slug]',
          query: { slug: 'mi-post' },
        }}
      >
        Post dinámico
      </Link>

      {/* Prefetch deshabilitado */}
      <Link href="/slow-page" prefetch={false}>
        Página lenta
      </Link>

      {/* Replace history */}
      <Link href="/login" replace>
        Login
      </Link>

      {/* Link externo */}
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        Enlace externo
      </Link>
    </nav>
  )
}`,
          },
        },
        {
          id: 'navegacion-programatica',
          title: 'Navegación programática',
          type: 'code',
          code: {
            title: 'useRouter hook para navegación',
            language: 'tsx',
            code: `'use client'

import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Lógica de login...

    // Navegar a otra página
    router.push('/dashboard')

    // Reemplazar en history
    // router.replace('/dashboard')

    // Navegar hacia atrás
    // router.back()

    // Navegar hacia adelante
    // router.forward()

    // Refrescar la página actual
    // router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'layouts',
      title: 'Layouts y Templates',
      type: 'text',
      content: 'Layouts compartidos y templates para diferentes rutas',
      subsections: [
        {
          id: 'root-layout',
          title: 'Root Layout (Requerido)',
          type: 'code',
          code: {
            title: 'Layout raíz de la aplicación',
            language: 'tsx',
            code: `// app/layout.tsx - REQUERIDO
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mi App',
  description: 'Descripción de mi aplicación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <header>
          <nav>Mi Navegación</nav>
        </header>
        <main>{children}</main>
        <footer>Mi Footer</footer>
      </body>
    </html>
  )
}`,
          },
        },
        {
          id: 'nested-layouts',
          title: 'Layouts anidados',
          type: 'code',
          code: {
            title: 'Layouts específicos para secciones',
            language: 'tsx',
            code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside>
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  )
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard Overview</h1>
}

// app/dashboard/settings/page.tsx
export default function SettingsPage() {
  return <h1>Settings</h1>
}`,
          },
        },
        {
          id: 'templates',
          title: 'Templates (reinician estado)',
          type: 'code',
          code: {
            title: 'Templates vs Layouts',
            language: 'tsx',
            code: `// app/template.tsx
// Los templates recrean el estado en cada navegación
// Los layouts mantienen el estado
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="template">{children}</div>
}

// Caso de uso: animaciones en cada página
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'pages',
      title: 'Pages y Loading States',
      type: 'text',
      content: 'Páginas, estados de carga y UI especiales',
      subsections: [
        {
          id: 'page-basica',
          title: 'Página básica',
          type: 'code',
          code: {
            title: 'Estructura de una página',
            language: 'tsx',
            code: `// app/about/page.tsx
import type { Metadata } from 'next'

// Metadata estática
export const metadata: Metadata = {
  title: 'Acerca de',
  description: 'Información sobre nuestra empresa',
}

export default function AboutPage() {
  return (
    <div>
      <h1>Acerca de Nosotros</h1>
      <p>Contenido de la página...</p>
    </div>
  )
}`,
          },
        },
        {
          id: 'loading-ui',
          title: 'Loading UI',
          type: 'code',
          code: {
            title: 'Estado de carga automático',
            language: 'tsx',
            code: `// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>Cargando dashboard...</p>
    </div>
  )
}

// Con Suspense manual
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<LoadingSkeleton />}>
        <UserData />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}

function LoadingSkeleton() {
  return <div className="skeleton">Cargando...</div>
}`,
          },
        },
        {
          id: 'not-found',
          title: 'Not Found (404)',
          type: 'code',
          code: {
            title: 'Página 404 personalizada',
            language: 'tsx',
            code: `// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que buscas no existe.</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}

// Trigger not-found desde una página
import { notFound } from 'next/navigation'

export default async function UserPage({ params }: PageProps) {
  const { id } = await params
  const user = await getUser(id)

  if (!user) {
    notFound() // Muestra la UI de not-found
  }

  return <div>{user.name}</div>
}`,
          },
        },
      ],
    },
    {
      id: 'server-components',
      title: 'Server Components',
      type: 'text',
      content: 'Componentes de servidor por defecto en Next.js 15',
      subsections: [
        {
          id: 'server-component-basico',
          title: 'Server Component básico',
          type: 'code',
          code: {
            title: 'Componentes del servidor (por defecto)',
            language: 'tsx',
            code: `// Todos los componentes son Server Components por defecto
// No se envían al cliente, se ejecutan en el servidor

// app/components/UserList.tsx
import { db } from '@/lib/db'

export default async function UserList() {
  // Acceso directo a la base de datos
  const users = await db.user.findMany()

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// Beneficios:
// - Bundle size más pequeño (código no va al cliente)
// - Acceso directo a backend (DB, filesystem, APIs privadas)
// - Mejor SEO (HTML renderizado en servidor)
// - Menos JavaScript al cliente`,
          },
        },
        {
          id: 'async-server-components',
          title: 'Server Components asíncronos',
          type: 'code',
          code: {
            title: 'Fetch de datos en Server Components',
            language: 'tsx',
            code: `// Server Components pueden ser async
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  // Fetch directo en el componente
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`)
    .then(res => res.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

// Múltiples fetches en paralelo
export default async function DashboardPage() {
  // Se ejecutan en paralelo
  const [users, posts, stats] = await Promise.all([
    fetch('https://api.example.com/users').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json()),
    fetch('https://api.example.com/stats').then(r => r.json()),
  ])

  return (
    <div>
      <UserCount count={users.length} />
      <PostCount count={posts.length} />
      <Stats data={stats} />
    </div>
  )
}`,
          },
        },
        {
          id: 'server-only',
          title: 'Código solo del servidor',
          type: 'code',
          code: {
            title: 'Garantizar que código se ejecute solo en servidor',
            language: 'tsx',
            code: `// Instalar: pnpm add server-only
import 'server-only'

// Este módulo solo puede ser importado en Server Components
export async function getSecretData() {
  const apiKey = process.env.SECRET_API_KEY

  const response = await fetch('https://api.example.com/secret', {
    headers: {
      Authorization: \`Bearer \${apiKey}\`,
    },
  })

  return response.json()
}

// Si intentas importar esto en un Client Component, obtendrás un error`,
          },
        },
      ],
    },
    {
      id: 'client-components',
      title: 'Client Components',
      type: 'text',
      content: 'Componentes del cliente con interactividad',
      subsections: [
        {
          id: 'use-client',
          title: 'Directiva "use client"',
          type: 'code',
          code: {
            title: 'Crear un Client Component',
            language: 'tsx',
            code: `'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  )
}

// Usa 'use client' cuando necesites:
// - Event handlers (onClick, onChange, etc.)
// - State y Lifecycle (useState, useEffect, etc.)
// - Browser APIs (window, localStorage, etc.)
// - Custom hooks que usan hooks de React`,
          },
        },
        {
          id: 'client-server-composition',
          title: 'Composición Server + Client',
          type: 'code',
          code: {
            title: 'Combinar Server y Client Components',
            language: 'tsx',
            code: `// app/page.tsx (Server Component)
import ClientComponent from './ClientComponent'
import { db } from '@/lib/db'

export default async function HomePage() {
  const data = await db.query('SELECT * FROM users')

  return (
    <div>
      <h1>Mi App</h1>
      {/* Server Component renderiza datos */}
      <UserList users={data} />

      {/* Client Component para interactividad */}
      <ClientComponent initialData={data} />
    </div>
  )
}

// ClientComponent.tsx
'use client'

import { useState } from 'react'

export default function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData)

  return (
    <div>
      <button onClick={() => setData([...data, newItem])}>
        Agregar
      </button>
    </div>
  )
}`,
          },
        },
        {
          id: 'client-only',
          title: 'Código solo del cliente',
          type: 'code',
          code: {
            title: 'Garantizar que código se ejecute solo en cliente',
            language: 'tsx',
            code: `// Instalar: pnpm add client-only
import 'client-only'

// Este módulo solo puede ser importado en Client Components
export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key)
  })

  const setStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue)
    setValue(newValue)
  }

  return [value, setStoredValue]
}`,
          },
        },
      ],
    },
    {
      id: 'data-fetching',
      title: 'Data Fetching',
      type: 'text',
      content: 'Estrategias de obtención de datos',
      subsections: [
        {
          id: 'fetch-basico',
          title: 'Fetch básico',
          type: 'code',
          code: {
            title: 'Fetch en Server Components',
            language: 'tsx',
            code: `// Next.js extiende fetch() nativo con opciones de caching
export default async function PostsPage() {
  // Fetch con cache por defecto
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

// Fetch sin cache
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// Fetch con revalidación cada 60 segundos
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 }
})`,
          },
        },
        {
          id: 'cache-strategies',
          title: 'Estrategias de cache',
          type: 'code',
          code: {
            title: 'Opciones de caching',
            language: 'tsx',
            code: `// 1. Static (default) - Cache indefinido
const data = await fetch('https://api.example.com/static')
// o explícitamente:
const data = await fetch('https://api.example.com/static', {
  cache: 'force-cache'
})

// 2. Dynamic - No cache, siempre fresco
const data = await fetch('https://api.example.com/dynamic', {
  cache: 'no-store'
})

// 3. Revalidate - Cache con revalidación periódica (ISR)
const data = await fetch('https://api.example.com/revalidate', {
  next: { revalidate: 3600 } // 1 hora
})

// 4. Revalidar por tag
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] }
})

// Luego puedes revalidar:
import { revalidateTag } from 'next/cache'
revalidateTag('posts')`,
          },
        },
        {
          id: 'segment-config',
          title: 'Configuración de segmento',
          type: 'code',
          code: {
            title: 'Configurar comportamiento de página/layout',
            language: 'tsx',
            code: `// app/dashboard/page.tsx

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic' // 'auto' | 'force-dynamic' | 'error' | 'force-static'

// Configurar revalidación por defecto
export const revalidate = 3600 // segundos, o false para cache indefinido

// Runtime
export const runtime = 'nodejs' // 'nodejs' | 'edge'

// Configurar fetch cache
export const fetchCache = 'default-cache' // 'auto' | 'default-cache' | 'only-cache' | 'force-cache' | 'force-no-store' | 'default-no-store' | 'only-no-store'

export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/data')

  return <div>{/* ... */}</div>
}`,
          },
        },
        {
          id: 'parallel-fetching',
          title: 'Fetching paralelo',
          type: 'code',
          code: {
            title: 'Optimizar múltiples requests',
            language: 'tsx',
            code: `// Mal - Secuencial (lento)
export default async function Page() {
  const user = await fetch('https://api.example.com/user').then(r => r.json())
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())
  const comments = await fetch('https://api.example.com/comments').then(r => r.json())

  // Total: tiempo(user) + tiempo(posts) + tiempo(comments)
}

// Bien - Paralelo (rápido)
export default async function Page() {
  const [user, posts, comments] = await Promise.all([
    fetch('https://api.example.com/user').then(r => r.json()),
    fetch('https://api.example.com/posts').then(r => r.json()),
    fetch('https://api.example.com/comments').then(r => r.json()),
  ])

  // Total: máximo(tiempo(user), tiempo(posts), tiempo(comments))
}`,
          },
        },
        {
          id: 'streaming',
          title: 'Streaming con Suspense',
          type: 'code',
          code: {
            title: 'Renderizado progresivo',
            language: 'tsx',
            code: `import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Mi Dashboard</h1>

      {/* Se renderiza inmediatamente */}
      <UserInfo />

      {/* Se renderiza cuando los datos están listos */}
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  )
}

async function SlowComponent() {
  const data = await fetch('https://api.example.com/slow', {
    cache: 'no-store'
  }).then(r => r.json())

  return <div>{data.content}</div>
}`,
          },
        },
      ],
    },
    {
      id: 'server-actions',
      title: 'Server Actions',
      type: 'text',
      content: 'Mutaciones de datos con Server Actions',
      subsections: [
        {
          id: 'server-action-basica',
          title: 'Server Action básica',
          type: 'code',
          code: {
            title: 'Crear y usar Server Actions',
            language: 'tsx',
            code: `'use server'

// actions/user.ts
export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // Acceso directo a la DB
  await db.user.create({
    data: { name, email }
  })

  // Revalidar cache
  revalidatePath('/users')
}

// app/users/page.tsx
import { createUser } from '@/actions/user'

export default function UsersPage() {
  return (
    <form action={createUser}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit">Crear Usuario</button>
    </form>
  )
}`,
          },
        },
        {
          id: 'server-action-client',
          title: 'Server Actions desde Client Components',
          type: 'code',
          code: {
            title: 'Usar Server Actions con estado del cliente',
            language: 'tsx',
            code: `'use client'

import { createUser } from '@/actions/user'
import { useState } from 'react'

export default function UserForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError('')

    try {
      await createUser(formData)
      // Éxito
    } catch (err) {
      setError('Error al crear usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Usuario'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}`,
          },
        },
        {
          id: 'use-form-status',
          title: 'useFormStatus hook',
          type: 'code',
          code: {
            title: 'Estado del formulario con useFormStatus',
            language: 'tsx',
            code: `'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  )
}

export default function Form({ action }) {
  return (
    <form action={action}>
      <input name="name" type="text" required />
      <SubmitButton />
    </form>
  )
}`,
          },
        },
        {
          id: 'use-form-state',
          title: 'useFormState hook',
          type: 'code',
          code: {
            title: 'Manejar estado del formulario',
            language: 'tsx',
            code: `'use client'

import { useFormState } from 'react-dom'
import { createUser } from '@/actions/user'

const initialState = {
  message: '',
  errors: {},
}

export default function UserForm() {
  const [state, formAction] = useFormState(createUser, initialState)

  return (
    <form action={formAction}>
      <input name="name" type="text" required />
      {state.errors?.name && <p>{state.errors.name}</p>}

      <input name="email" type="email" required />
      {state.errors?.email && <p>{state.errors.email}</p>}

      <button type="submit">Crear Usuario</button>

      {state.message && <p>{state.message}</p>}
    </form>
  )
}

// actions/user.ts
'use server'

export async function createUser(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // Validación
  const errors = {}
  if (!name) errors.name = 'Nombre requerido'
  if (!email) errors.email = 'Email requerido'

  if (Object.keys(errors).length > 0) {
    return { errors, message: 'Error de validación' }
  }

  await db.user.create({ data: { name, email } })
  revalidatePath('/users')

  return { message: 'Usuario creado', errors: {} }
}`,
          },
        },
        {
          id: 'revalidation',
          title: 'Revalidación de cache',
          type: 'code',
          code: {
            title: 'Revalidar rutas y tags',
            language: 'tsx',
            code: `'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({
    data: { title, content }
  })

  // Revalidar una ruta específica
  revalidatePath('/blog')

  // Revalidar con layout
  revalidatePath('/blog', 'layout') // también revalida rutas anidadas

  // Revalidar por tag
  revalidateTag('posts')

  // Redirigir después de la acción
  redirect('/blog')
}`,
          },
        },
      ],
    },
    {
      id: 'route-handlers',
      title: 'Route Handlers (API Routes)',
      type: 'text',
      content: 'Endpoints de API en el App Router',
      subsections: [
        {
          id: 'route-handler-basico',
          title: 'Route Handler básico',
          type: 'code',
          code: {
            title: 'Crear endpoints de API',
            language: 'tsx',
            code: `// app/api/hello/route.ts
export async function GET(request: Request) {
  return Response.json({ message: 'Hello World' })
}

export async function POST(request: Request) {
  const body = await request.json()

  return Response.json({
    message: 'Datos recibidos',
    data: body
  })
}

// Todos los métodos HTTP
export async function PUT(request: Request) { }
export async function PATCH(request: Request) { }
export async function DELETE(request: Request) { }
export async function HEAD(request: Request) { }
export async function OPTIONS(request: Request) { }`,
          },
        },
        {
          id: 'route-params',
          title: 'Route Handlers con parámetros',
          type: 'code',
          code: {
            title: 'Parámetros dinámicos y query strings',
            language: 'tsx',
            code: `// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const post = await db.post.findUnique({
    where: { id }
  })

  if (!post) {
    return Response.json(
      { error: 'Post no encontrado' },
      { status: 404 }
    )
  }

  return Response.json(post)
}

// Query strings
// GET /api/search?q=next&limit=10
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const limit = searchParams.get('limit') || '10'

  const results = await db.post.findMany({
    where: {
      title: { contains: query }
    },
    take: parseInt(limit)
  })

  return Response.json(results)
}`,
          },
        },
        {
          id: 'route-headers-cookies',
          title: 'Headers y Cookies',
          type: 'code',
          code: {
            title: 'Trabajar con headers y cookies',
            language: 'tsx',
            code: `import { cookies, headers } from 'next/headers'

export async function GET(request: Request) {
  // Leer headers
  const headersList = await headers()
  const authorization = headersList.get('authorization')
  const userAgent = headersList.get('user-agent')

  // Leer cookies
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return Response.json({
    authorization,
    userAgent,
    token: token?.value
  })
}

export async function POST(request: Request) {
  const cookieStore = await cookies()

  // Establecer cookie
  cookieStore.set('token', 'abc123', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
  })

  return Response.json({ message: 'Cookie establecida' })
}`,
          },
        },
        {
          id: 'route-cors',
          title: 'CORS',
          type: 'code',
          code: {
            title: 'Configurar CORS',
            language: 'tsx',
            code: `// app/api/external/route.ts
export async function GET(request: Request) {
  const data = { message: 'API pública' }

  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}`,
          },
        },
        {
          id: 'route-streaming',
          title: 'Streaming responses',
          type: 'code',
          code: {
            title: 'Respuestas en streaming',
            language: 'tsx',
            code: `// app/api/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        const message = \`Mensaje \${i + 1}\\n\`
        controller.enqueue(encoder.encode(message))
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
    },
  })
}`,
          },
        },
      ],
    },
    {
      id: 'middleware',
      title: 'Middleware',
      type: 'text',
      content: 'Middleware para interceptar requests',
      subsections: [
        {
          id: 'middleware-basico',
          title: 'Middleware básico',
          type: 'code',
          code: {
            title: 'Crear middleware',
            language: 'tsx',
            code: `// middleware.ts (en la raíz del proyecto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Leer cookies
  const token = request.cookies.get('token')

  // Verificar autenticación
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Agregar header personalizado
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'my-value')

  return response
}

// Configurar qué rutas ejecutan el middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ]
}`,
          },
        },
        {
          id: 'middleware-auth',
          title: 'Middleware de autenticación',
          type: 'code',
          code: {
            title: 'Proteger rutas con middleware',
            language: 'tsx',
            code: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  // Rutas públicas
  const publicPaths = ['/login', '/register', '/']
  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Si es ruta pública, permitir
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Verificar token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    await jwtVerify(token, secret)

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}`,
          },
        },
        {
          id: 'middleware-rewrite',
          title: 'Rewrite y Redirect',
          type: 'code',
          code: {
            title: 'Reescribir URLs y redirigir',
            language: 'tsx',
            code: `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect permanente
  if (pathname === '/old-page') {
    return NextResponse.redirect(
      new URL('/new-page', request.url),
      { status: 308 } // 308 = permanent redirect
    )
  }

  // Rewrite (cambia la URL sin redirigir al usuario)
  if (pathname.startsWith('/blog')) {
    return NextResponse.rewrite(
      new URL(\`/content\${pathname}\`, request.url)
    )
  }

  // A/B testing
  const bucket = request.cookies.get('bucket')?.value || 'a'
  if (pathname === '/') {
    return NextResponse.rewrite(
      new URL(\`/\${bucket}\`, request.url)
    )
  }

  return NextResponse.next()
}`,
          },
        },
      ],
    },
    {
      id: 'metadata',
      title: 'Metadata y SEO',
      type: 'text',
      content: 'Optimización SEO con metadata',
      subsections: [
        {
          id: 'metadata-estatica',
          title: 'Metadata estática',
          type: 'code',
          code: {
            title: 'Metadata estática en páginas y layouts',
            language: 'tsx',
            code: `// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi App',
  description: 'Descripción de mi aplicación',
  keywords: ['next.js', 'react', 'javascript'],
  authors: [{ name: 'Tu Nombre' }],
  creator: 'Tu Nombre',
  openGraph: {
    title: 'Mi App',
    description: 'Descripción para redes sociales',
    url: 'https://example.com',
    siteName: 'Mi App',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mi App',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi App',
    description: 'Descripción para Twitter',
    images: ['https://example.com/twitter-image.jpg'],
    creator: '@tuusuario',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}`,
          },
        },
        {
          id: 'metadata-dinamica',
          title: 'Metadata dinámica',
          type: 'code',
          code: {
            title: 'generateMetadata para metadata dinámica',
            language: 'tsx',
            code: `// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`)
    .then(res => res.json())

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await fetch(\`https://api.example.com/posts/\${slug}\`)
    .then(res => res.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}`,
          },
        },
        {
          id: 'metadata-templates',
          title: 'Templates de metadata',
          type: 'code',
          code: {
            title: 'Templates para títulos consistentes',
            language: 'tsx',
            code: `// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Mi App',
    default: 'Mi App',
  },
  description: 'Descripción por defecto',
}

// app/blog/page.tsx
export const metadata: Metadata = {
  title: 'Blog', // Se convierte en "Blog | Mi App"
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  return {
    title: post.title, // Se convierte en "{post.title} | Mi App"
  }
}`,
          },
        },
        {
          id: 'json-ld',
          title: 'JSON-LD para SEO',
          type: 'code',
          code: {
            title: 'Structured data con JSON-LD',
            language: 'tsx',
            code: `// app/blog/[slug]/page.tsx
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'image-optimization',
      title: 'Optimización de Imágenes',
      type: 'text',
      content: 'Componente Image para imágenes optimizadas',
      subsections: [
        {
          id: 'image-basico',
          title: 'Componente Image',
          type: 'code',
          code: {
            title: 'Usar el componente Image',
            language: 'tsx',
            code: `import Image from 'next/image'

export default function Page() {
  return (
    <div>
      {/* Imagen local (en /public) */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority // Carga inmediata (LCP)
      />

      {/* Imagen remota */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote image"
        width={800}
        height={400}
        quality={85}
      />

      {/* Imagen responsive con fill */}
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}`,
          },
        },
        {
          id: 'image-config',
          title: 'Configuración de imágenes',
          type: 'code',
          code: {
            title: 'next.config.js',
            language: 'typescript',
            code: `// next.config.js
module.exports = {
  images: {
    // Dominios permitidos para imágenes remotas
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],

    // Tamaños de dispositivos para responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Tamaños de imágenes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Formatos soportados
    formats: ['image/webp', 'image/avif'],

    // Calidad por defecto (1-100)
    quality: 75,
  },
}`,
          },
        },
        {
          id: 'image-loader',
          title: 'Custom Image Loader',
          type: 'code',
          code: {
            title: 'Loader personalizado para CDN',
            language: 'tsx',
            code: `// Loader de Cloudinary
const cloudinaryLoader = ({ src, width, quality }) => {
  const params = ['f_auto', 'c_limit', \`w_\${width}\`, \`q_\${quality || 'auto'}\`]
  return \`https://res.cloudinary.com/demo/image/upload/\${params.join(',')}$\{src}\`
}

export default function Page() {
  return (
    <Image
      loader={cloudinaryLoader}
      src="/sample.jpg"
      alt="Sample"
      width={800}
      height={600}
    />
  )
}

// Configurar loader globalmente en next.config.js
module.exports = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/demo/image/upload/',
  },
}`,
          },
        },
        {
          id: 'image-placeholder',
          title: 'Placeholders',
          type: 'code',
          code: {
            title: 'Blur placeholder para mejor UX',
            language: 'tsx',
            code: `import Image from 'next/image'

export default function Page() {
  return (
    <div>
      {/* Blur placeholder automático (imágenes locales) */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        placeholder="blur"
      />

      {/* Blur placeholder con data URL personalizada */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote"
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      />
    </div>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'font-optimization',
      title: 'Optimización de Fuentes',
      type: 'text',
      content: 'next/font para fuentes optimizadas',
      subsections: [
        {
          id: 'google-fonts',
          title: 'Google Fonts',
          type: 'code',
          code: {
            title: 'Usar Google Fonts',
            language: 'tsx',
            code: `// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

// En CSS o Tailwind
// font-family: var(--font-inter);
// font-family: var(--font-roboto-mono);`,
          },
        },
        {
          id: 'local-fonts',
          title: 'Fuentes locales',
          type: 'code',
          code: {
            title: 'Usar fuentes locales',
            language: 'tsx',
            code: `// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={myFont.variable}>
      <body className={myFont.className}>
        {children}
      </body>
    </html>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'error-handling',
      title: 'Manejo de Errores',
      type: 'text',
      content: 'Error boundaries y páginas de error',
      subsections: [
        {
          id: 'error-boundary',
          title: 'Error boundary',
          type: 'code',
          code: {
            title: 'Manejo de errores con error.tsx',
            language: 'tsx',
            code: `// app/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error a servicio de monitoreo
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Algo salió mal!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>
        Intentar de nuevo
      </button>
    </div>
  )
}

// app/dashboard/error.tsx - Error boundary específico
'use client'

export default function DashboardError({ error, reset }) {
  return (
    <div className="dashboard-error">
      <h2>Error en el Dashboard</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Recargar</button>
    </div>
  )
}`,
          },
        },
        {
          id: 'global-error',
          title: 'Error global',
          type: 'code',
          code: {
            title: 'global-error.tsx para errores en root layout',
            language: 'tsx',
            code: `// app/global-error.tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Error Global</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Intentar de nuevo</button>
      </body>
    </html>
  )
}`,
          },
        },
        {
          id: 'not-found-custom',
          title: 'Not Found personalizado',
          type: 'code',
          code: {
            title: 'Páginas 404 personalizadas',
            language: 'tsx',
            code: `// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>404 - Página No Encontrada</h2>
      <p>No pudimos encontrar la página que buscas.</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}

// app/blog/not-found.tsx - 404 específico para blog
export default function BlogNotFound() {
  return (
    <div>
      <h2>Post no encontrado</h2>
      <Link href="/blog">Ver todos los posts</Link>
    </div>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'environment-variables',
      title: 'Variables de Entorno',
      type: 'text',
      content: 'Configuración de variables de entorno',
      subsections: [
        {
          id: 'env-files',
          title: 'Archivos .env',
          type: 'code',
          code: {
            title: 'Tipos de archivos de entorno',
            language: 'plaintext',
            code: `# .env.local (no se versiona, más alta prioridad)
DATABASE_URL=postgresql://localhost:5432/mydb
SECRET_KEY=supersecret

# .env.development (desarrollo)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production (producción)
NEXT_PUBLIC_API_URL=https://api.example.com

# .env (valores por defecto)
NEXT_PUBLIC_APP_NAME=Mi App`,
          },
        },
        {
          id: 'env-usage',
          title: 'Uso de variables de entorno',
          type: 'code',
          code: {
            title: 'Acceder a variables de entorno',
            language: 'tsx',
            code: `// Variables del servidor (solo en Server Components)
export default async function ServerComponent() {
  const dbUrl = process.env.DATABASE_URL
  const apiKey = process.env.API_KEY

  // Estas variables NO están disponibles en el cliente

  return <div>Server Component</div>
}

// Variables públicas (disponibles en cliente)
'use client'

export default function ClientComponent() {
  // NEXT_PUBLIC_ hace que la variable esté disponible en el cliente
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const appName = process.env.NEXT_PUBLIC_APP_NAME

  return <div>{appName}</div>
}

// next.config.js - Exponer variables manualmente
module.exports = {
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR,
  },
}`,
          },
        },
      ],
    },
    {
      id: 'parallel-routes',
      title: 'Parallel Routes',
      type: 'text',
      content: 'Rutas paralelas para UIs complejas',
      subsections: [
        {
          id: 'parallel-routes-basico',
          title: 'Parallel Routes básicas',
          type: 'code',
          code: {
            title: 'Renderizar múltiples páginas en paralelo',
            language: 'tsx',
            code: `// Estructura:
// app/
//   @team/
//     page.tsx
//   @analytics/
//     page.tsx
//   layout.tsx
//   page.tsx

// app/layout.tsx
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  team: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div>
      <div>{children}</div>
      <div className="grid grid-cols-2 gap-4">
        <div>{team}</div>
        <div>{analytics}</div>
      </div>
    </div>
  )
}

// app/@team/page.tsx
export default function TeamPage() {
  return <div>Team Dashboard</div>
}

// app/@analytics/page.tsx
export default function AnalyticsPage() {
  return <div>Analytics Dashboard</div>
}`,
          },
        },
      ],
    },
    {
      id: 'intercepting-routes',
      title: 'Intercepting Routes',
      type: 'text',
      content: 'Interceptar rutas para modales y overlays',
      subsections: [
        {
          id: 'intercepting-routes-modal',
          title: 'Modal con intercepting route',
          type: 'code',
          code: {
            title: 'Abrir contenido en modal',
            language: 'tsx',
            code: `// Estructura:
// app/
//   photos/
//     [id]/
//       page.tsx
//     (..)photos/
//       [id]/
//         page.tsx
//   @modal/
//     (..)photos/
//       [id]/
//         page.tsx
//   layout.tsx

// app/layout.tsx
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

// app/@modal/(..)photos/[id]/page.tsx
import Modal from '@/components/Modal'

export default function PhotoModal({ params }) {
  return (
    <Modal>
      <img src={\`/photos/\${params.id}.jpg\`} alt="Photo" />
    </Modal>
  )
}`,
          },
        },
      ],
    },
    {
      id: 'deployment',
      title: 'Deployment',
      type: 'text',
      content: 'Desplegar aplicaciones Next.js',
      subsections: [
        {
          id: 'deployment-vercel',
          title: 'Deployment en Vercel',
          type: 'code',
          code: {
            title: 'Desplegar en Vercel (recomendado)',
            language: 'bash',
            code: `# Instalar Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod

# O push a GitHub y conecta el repo en vercel.com`,
          },
        },
        {
          id: 'deployment-standalone',
          title: 'Standalone build',
          type: 'code',
          code: {
            title: 'Build standalone para Docker',
            language: 'typescript',
            code: `// next.config.js
module.exports = {
  output: 'standalone',
}

// Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`,
          },
        },
        {
          id: 'deployment-static',
          title: 'Static Export',
          type: 'code',
          code: {
            title: 'Exportar como sitio estático',
            language: 'typescript',
            code: `// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true, // Requerido para static export
  },
}

// Build
// pnpm build

// Los archivos estáticos estarán en /out
// Despliega /out a cualquier hosting estático (Netlify, Cloudflare Pages, etc.)

// Limitaciones:
// - No hay API Routes
// - No hay Server Components dinámicos
// - No hay revalidación
// - No hay Image Optimization`,
          },
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Mejores Prácticas',
      type: 'text',
      content: 'Recomendaciones y patrones comunes',
      subsections: [
        {
          id: 'server-first',
          title: 'Server-first approach',
          type: 'text',
          content: 'Usa Server Components por defecto. Solo usa Client Components cuando necesites interactividad, hooks de React, o APIs del navegador. Esto reduce el JavaScript enviado al cliente y mejora el rendimiento.',
        },
        {
          id: 'data-fetching-patterns',
          title: 'Patrones de data fetching',
          type: 'code',
          code: {
            title: 'Patrones recomendados',
            language: 'tsx',
            code: `// 1. Fetch en el nivel más alto posible
// app/dashboard/layout.tsx
export default async function DashboardLayout({ children }) {
  const user = await getUser()

  return (
    <div>
      <Header user={user} />
      {children}
    </div>
  )
}

// 2. Fetch en paralelo
const [posts, users] = await Promise.all([
  getPosts(),
  getUsers(),
])

// 3. Streaming con Suspense
<Suspense fallback={<Loading />}>
  <SlowComponent />
</Suspense>

// 4. Evitar waterfalls
// Mal:
const user = await getUser()
const posts = await getUserPosts(user.id) // Espera a user

// Bien:
const userPromise = getUser()
const postsPromise = getUserPosts((await userPromise).id)
const [user, posts] = await Promise.all([userPromise, postsPromise])`,
          },
        },
        {
          id: 'composition-patterns',
          title: 'Patrones de composición',
          type: 'code',
          code: {
            title: 'Componiendo Server y Client Components',
            language: 'tsx',
            code: `// Pasar Server Components como children a Client Components
// ClientWrapper.tsx
'use client'

export default function ClientWrapper({ children }) {
  const [state, setState] = useState()

  return (
    <div>
      <button onClick={() => setState(...)}>Click</button>
      {children}
    </div>
  )
}

// page.tsx (Server Component)
export default async function Page() {
  const data = await getData()

  return (
    <ClientWrapper>
      <ServerComponent data={data} />
    </ClientWrapper>
  )
}`,
          },
        },
      ],
    },
  ],
}
