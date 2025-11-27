import type { Cheatcode } from '../types'

export const reactCheatcode: Cheatcode = {
  metadata: {
    id: 'react',
    title: 'React',
    language: 'React',
    category: 'framework',
    tags: ['react', 'javascript', 'framework', 'frontend'],
    version: '19',
    description: 'Guía completa de React 19: Hooks, Componentes, Estado, Server Components, Actions y más',
    lastUpdated: '2025-11-26',
    logo: '/logos/react.svg',
    color: '#61DAFB',
    difficulty: 'intermediate',
  },
  sections: [
    // ============ INSTALACIÓN Y CONFIGURACIÓN ============
    {
      id: 'installation',
      title: 'Instalación y Configuración del Proyecto',
      type: 'text',
      content: 'React 19 introduce nuevas características como Server Components, Actions, y mejoras significativas en el rendimiento. Puedes crear proyectos con Vite, Next.js o Create React App.',
      subsections: [
        {
          id: 'create-react-vite',
          title: 'Crear Proyecto con Vite (Recomendado)',
          type: 'package-install',
          packageCommands: {
            npm: 'npm create vite@latest my-app -- --template react-ts',
            pnpm: 'pnpm create vite my-app --template react-ts',
            yarn: 'yarn create vite my-app --template react-ts',
            bun: 'bun create vite my-app --template react-ts',
          },
        },
        {
          id: 'install-deps',
          title: 'Instalar Dependencias e Iniciar Servidor',
          type: 'package-install',
          packageCommands: {
            npm: 'cd my-app && npm install && npm run dev',
            pnpm: 'cd my-app && pnpm install && pnpm dev',
            yarn: 'cd my-app && yarn && yarn dev',
            bun: 'cd my-app && bun install && bun dev',
          },
        },
        {
          id: 'install-react-19',
          title: 'Actualizar a React 19',
          type: 'package-install',
          packageCommands: {
            npm: 'npm install react@19 react-dom@19',
            pnpm: 'pnpm add react@19 react-dom@19',
            yarn: 'yarn add react@19 react-dom@19',
            bun: 'bun add react@19 react-dom@19',
          },
        },
        {
          id: 'create-next-app',
          title: 'Alternativa: Crear con Next.js 15 (Full-Stack)',
          type: 'package-install',
          packageCommands: {
            npm: 'npx create-next-app@latest',
            pnpm: 'pnpm create next-app',
            yarn: 'yarn create next-app',
            bun: 'bun create next-app',
          },
        },
      ],
    },

    // ============ COMPONENTES FUNCIONALES ============
    {
      id: 'functional-components',
      title: 'Componentes Funcionales',
      type: 'code',
      subsections: [
        {
          id: 'basic-component',
          title: 'Componente Básico',
          type: 'code',
          code: {
            title: 'Componente Funcional con TypeScript',
            code: `import { FC } from 'react'

// Componente simple sin props
function Welcome() {
  return <h1>¡Hola, Mundo!</h1>
}

// Componente con props (forma moderna)
interface GreetingProps {
  name: string
  age?: number
}

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h1>¡Hola, {name}!</h1>
      {age && <p>Tienes {age} años</p>}
    </div>
  )
}

// Componente con FC type (menos común ahora)
const GreetingFC: FC<GreetingProps> = ({ name, age }) => {
  return (
    <div>
      <h1>¡Hola, {name}!</h1>
      {age && <p>Tienes {age} años</p>}
    </div>
  )
}

// Exportar componente
export default Greeting`,
            language: 'tsx',
          },
        },
        {
          id: 'component-props',
          title: 'Props y Children',
          type: 'code',
          code: {
            title: 'Trabajando con Props y Children',
            code: `import { ReactNode } from 'react'

// Props con children
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// Props con valores por defecto
interface ButtonProps {
  text: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
}

function Button({
  text,
  variant = 'primary',
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

// Spread props
interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean
}

function CustomDiv({ highlighted, ...props }: DivProps) {
  return (
    <div
      {...props}
      className={\`\${props.className} \${highlighted ? 'highlight' : ''}\`}
    />
  )
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ JSX SINTAXIS ============
    {
      id: 'jsx-syntax',
      title: 'JSX Sintaxis',
      type: 'code',
      code: {
        title: 'Fundamentos de JSX',
        code: `function JSXExamples() {
  const name = 'Juan'
  const age = 25
  const isLoggedIn = true
  const items = ['Manzana', 'Banana', 'Naranja']
  const user = { name: 'María', role: 'admin' }

  return (
    <div>
      {/* Interpolación de variables */}
      <h1>Hola, {name}</h1>
      <p>Tienes {age} años</p>

      {/* Expresiones JavaScript */}
      <p>{age >= 18 ? 'Adulto' : 'Menor'}</p>
      <p>{2 + 2}</p>
      <p>{name.toUpperCase()}</p>

      {/* Renderizado condicional */}
      {isLoggedIn && <p>Bienvenido de vuelta</p>}
      {isLoggedIn ? <Dashboard /> : <Login />}

      {/* Renderizado de listas */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Atributos dinámicos */}
      <div className={isLoggedIn ? 'active' : 'inactive'}>
        <img src="/logo.png" alt="Logo" />
      </div>

      {/* Inline styles */}
      <div style={{ color: 'red', fontSize: '20px' }}>
        Texto rojo
      </div>

      {/* Comentarios en JSX */}
      {/* Este es un comentario */}

      {/* Fragmentos */}
      <>
        <h1>Título</h1>
        <p>Párrafo</p>
      </>

      {/* Fragmentos con key */}
      {items.map(item => (
        <React.Fragment key={item}>
          <dt>{item}</dt>
          <dd>Descripción de {item}</dd>
        </React.Fragment>
      ))}
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ useState HOOK ============
    {
      id: 'use-state',
      title: 'useState Hook',
      type: 'code',
      subsections: [
        {
          id: 'use-state-basic',
          title: 'Uso Básico de useState',
          type: 'code',
          code: {
            title: 'Estado en Componentes Funcionales',
            code: `import { useState } from 'react'

function Counter() {
  // Estado simple
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Juan')
  const [isActive, setIsActive] = useState(false)

  // Estado con tipo explícito
  const [user, setUser] = useState<User | null>(null)

  // Estado con valor inicial de función (lazy initialization)
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('data')
    return saved ? JSON.parse(saved) : []
  })

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>

      {/* Actualización basada en estado previo */}
      <button onClick={() => setCount(prev => prev + 1)}>
        Incrementar (seguro)
      </button>

      {/* Toggle booleano */}
      <button onClick={() => setIsActive(!isActive)}>
        Toggle
      </button>
      <button onClick={() => setIsActive(prev => !prev)}>
        Toggle (seguro)
      </button>
    </div>
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'use-state-objects',
          title: 'useState con Objetos y Arrays',
          type: 'code',
          code: {
            title: 'Actualizando Objetos y Arrays Inmutables',
            code: `import { useState } from 'react'

interface User {
  name: string
  age: number
  email: string
}

function UserProfile() {
  // Estado con objeto
  const [user, setUser] = useState<User>({
    name: 'Juan',
    age: 25,
    email: 'juan@example.com'
  })

  // Actualizar una propiedad del objeto
  const updateName = (newName: string) => {
    setUser(prev => ({
      ...prev,
      name: newName
    }))
  }

  // Actualizar múltiples propiedades
  const updateUser = () => {
    setUser(prev => ({
      ...prev,
      name: 'María',
      age: 30
    }))
  }

  // Estado con array
  const [todos, setTodos] = useState<string[]>([])

  // Agregar elemento
  const addTodo = (text: string) => {
    setTodos(prev => [...prev, text])
  }

  // Eliminar elemento
  const removeTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
  }

  // Actualizar elemento
  const updateTodo = (index: number, newText: string) => {
    setTodos(prev => prev.map((todo, i) =>
      i === index ? newText : todo
    ))
  }

  // Array de objetos
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', done: false },
    { id: 2, name: 'Item 2', done: true }
  ])

  // Actualizar propiedad de un objeto en array
  const toggleDone = (id: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ))
  }

  return <div>{/* UI aquí */}</div>
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ useEffect HOOK ============
    {
      id: 'use-effect',
      title: 'useEffect Hook',
      type: 'code',
      subsections: [
        {
          id: 'use-effect-basic',
          title: 'Uso Básico de useEffect',
          type: 'code',
          code: {
            title: 'Efectos Secundarios y Ciclo de Vida',
            code: `import { useState, useEffect } from 'react'

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Se ejecuta después de cada render
  useEffect(() => {
    console.log('Componente renderizado')
  })

  // Se ejecuta solo al montar (componentDidMount)
  useEffect(() => {
    console.log('Componente montado')

    // Cleanup al desmontar (componentWillUnmount)
    return () => {
      console.log('Componente desmontado')
    }
  }, []) // Array de dependencias vacío

  // Se ejecuta cuando userId cambia
  useEffect(() => {
    setLoading(true)

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })

    // Cleanup de la petición anterior
    return () => {
      // Cancelar fetch si es necesario
    }
  }, [userId]) // Se ejecuta cuando userId cambia

  // Múltiples dependencias
  useEffect(() => {
    console.log('userId o user cambió')
  }, [userId, user])

  return <div>{loading ? 'Cargando...' : user?.name}</div>
}`,
            language: 'tsx',
          },
        },
        {
          id: 'use-effect-examples',
          title: 'Casos de Uso Comunes de useEffect',
          type: 'code',
          code: {
            title: 'Patrones Comunes con useEffect',
            code: `import { useState, useEffect } from 'react'

function EffectExamples() {
  // 1. Event Listeners
  useEffect(() => {
    const handleResize = () => {
      console.log('Ventana redimensionada')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 2. Timers
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timer ejecutado')
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 3. Intervals
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 4. Subscripciones
  useEffect(() => {
    const subscription = someObservable.subscribe(data => {
      console.log(data)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 5. LocalStorage
  const [name, setName] = useState(() =>
    localStorage.getItem('name') || ''
  )

  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

  // 6. Document title
  useEffect(() => {
    document.title = \`Contador: \${count}\`
  }, [count])

  // 7. Fetch data
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      const response = await fetch('/api/data')
      const result = await response.json()

      if (!cancelled) {
        setData(result)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [])

  return <div>{count}</div>
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ useContext HOOK ============
    {
      id: 'use-context',
      title: 'useContext Hook',
      type: 'code',
      code: {
        title: 'Context API para Estado Global',
        code: `import { createContext, useContext, useState, ReactNode } from 'react'

// 1. Crear el contexto
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Crear el Provider
interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }

  return context
}

// 4. Usar en componentes
function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className={theme}>
      <h1>Mi App</h1>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
      </button>
    </header>
  )
}

// 5. Envolver la app con el Provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>Contenido</main>
    </ThemeProvider>
  )
}

// Ejemplo con múltiples contextos
interface User {
  name: string
  email: string
}

const UserContext = createContext<User | null>(null)
const AuthContext = createContext<{ login: () => void; logout: () => void } | undefined>(undefined)

function AppWithMultipleContexts() {
  return (
    <ThemeProvider>
      <UserContext.Provider value={{ name: 'Juan', email: 'juan@example.com' }}>
        <AuthContext.Provider value={{ login: () => {}, logout: () => {} }}>
          <App />
        </AuthContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ useRef HOOK ============
    {
      id: 'use-ref',
      title: 'useRef Hook',
      type: 'code',
      code: {
        title: 'Referencias y Valores Mutables',
        code: `import { useRef, useEffect, useState } from 'react'

function RefExamples() {
  // 1. Acceder a elementos DOM
  const inputRef = useRef<HTMLInputElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const scrollToDiv = () => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // 2. Almacenar valores mutables (no causa re-render)
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
    console.log(\`Renderizado \${renderCount.current} veces\`)
  })

  // 3. Almacenar valor anterior
  const [count, setCount] = useState(0)
  const prevCountRef = useRef<number>()

  useEffect(() => {
    prevCountRef.current = count
  }, [count])

  const prevCount = prevCountRef.current

  // 4. Almacenar timers/intervals
  const timerRef = useRef<NodeJS.Timeout>()

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log('Tick')
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // 5. Almacenar instancia de clase
  const myClassRef = useRef(new MyClass())

  // 6. Callback ref (para medir dimensiones, etc.)
  const [height, setHeight] = useState(0)

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Enfocar Input</button>

      <div ref={divRef}>Contenido para scroll</div>
      <button onClick={scrollToDiv}>Scroll a div</button>

      <p>Contador: {count}</p>
      <p>Anterior: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>

      <div ref={measuredRef}>Medir mi altura</div>
      <p>Altura: {height}px</p>

      <button onClick={startTimer}>Iniciar Timer</button>
      <button onClick={stopTimer}>Detener Timer</button>
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ useMemo y useCallback ============
    {
      id: 'use-memo-callback',
      title: 'useMemo y useCallback',
      type: 'code',
      subsections: [
        {
          id: 'use-memo',
          title: 'useMemo - Memoización de Valores',
          type: 'code',
          code: {
            title: 'Optimizar Cálculos Costosos',
            code: `import { useMemo, useState } from 'react'

function ExpensiveComponent({ items }: { items: number[] }) {
  const [count, setCount] = useState(0)

  // Sin useMemo - se recalcula en cada render
  const sum = items.reduce((a, b) => a + b, 0)

  // Con useMemo - solo se recalcula cuando items cambia
  const memoizedSum = useMemo(() => {
    console.log('Calculando suma...')
    return items.reduce((a, b) => a + b, 0)
  }, [items])

  // Filtrado costoso
  const expensiveFiltering = useMemo(() => {
    console.log('Filtrando items...')
    return items.filter(item => item > 10).map(item => item * 2)
  }, [items])

  // Objeto/array memoizado (evita re-renders innecesarios)
  const config = useMemo(() => ({
    threshold: 10,
    items: items.length
  }), [items])

  // Ordenamiento costoso
  const sortedItems = useMemo(() => {
    console.log('Ordenando...')
    return [...items].sort((a, b) => a - b)
  }, [items])

  return (
    <div>
      <p>Suma: {memoizedSum}</p>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Incrementar (no recalcula suma)
      </button>
    </div>
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'use-callback',
          title: 'useCallback - Memoización de Funciones',
          type: 'code',
          code: {
            title: 'Evitar Re-creación de Funciones',
            code: `import { useCallback, useState, memo } from 'react'

// Componente hijo memoizado
const Button = memo(({ onClick, children }: {
  onClick: () => void
  children: React.ReactNode
}) => {
  console.log('Button renderizado')
  return <button onClick={onClick}>{children}</button>
})

function ParentComponent() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // Sin useCallback - nueva función en cada render
  const handleClick1 = () => {
    console.log('Clicked')
  }

  // Con useCallback - misma referencia de función
  const handleClick2 = useCallback(() => {
    console.log('Clicked')
  }, []) // Sin dependencias - función estable

  // Con dependencias - se actualiza cuando count cambia
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1)
  }, []) // Usa forma funcional, no necesita count en deps

  // Con dependencia externa
  const handleLog = useCallback(() => {
    console.log(\`Count is: \${count}\`)
  }, [count]) // Se actualiza cuando count cambia

  // Pasar datos a la función
  const handleItemClick = useCallback((id: number) => {
    console.log(\`Item \${id} clicked\`)
  }, [])

  // Combinado con useEffect
  const fetchData = useCallback(async () => {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData]) // fetchData es estable, no causa loops infinitos

  return (
    <div>
      <p>Count: {count}</p>
      <input value={text} onChange={e => setText(e.target.value)} />

      {/* Button NO se re-renderiza cuando text cambia */}
      <Button onClick={handleClick2}>
        Click me
      </Button>

      <Button onClick={handleIncrement}>
        Increment
      </Button>
    </div>
  )
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ useReducer ============
    {
      id: 'use-reducer',
      title: 'useReducer Hook',
      type: 'code',
      code: {
        title: 'Gestión de Estado Complejo',
        code: `import { useReducer } from 'react'

// 1. Definir tipos
interface State {
  count: number
  user: { name: string; email: string } | null
  loading: boolean
  error: string | null
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_USER'; payload: { name: string; email: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }

// 2. Definir reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }

    case 'DECREMENT':
      return { ...state, count: state.count - 1 }

    case 'RESET':
      return { ...state, count: 0 }

    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    default:
      return state
  }
}

// 3. Usar en componente
function Counter() {
  const initialState: State = {
    count: 0,
    user: null,
    loading: false,
    error: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // También puedes usar lazy initialization
  const [state2, dispatch2] = useReducer(
    reducer,
    { initialCount: 10 },
    (init) => ({
      count: init.initialCount,
      user: null,
      loading: false,
      error: null
    })
  )

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>

      <button onClick={() => dispatch({
        type: 'SET_USER',
        payload: { name: 'Juan', email: 'juan@example.com' }
      })}>
        Set User
      </button>

      {state.user && <p>User: {state.user.name}</p>}
    </div>
  )
}

// Ejemplo con context
const CountContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | undefined>(undefined)

export function CountProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ CUSTOM HOOKS ============
    {
      id: 'custom-hooks',
      title: 'Custom Hooks',
      type: 'code',
      code: {
        title: 'Crear Hooks Personalizados Reutilizables',
        code: `import { useState, useEffect, useCallback, useRef } from 'react'

// 1. Hook para Fetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url)
        const result = await response.json()

        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}

// 2. Hook para LocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

// 3. Hook para Debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// 4. Hook para Window Size
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

// 5. Hook para Previous Value
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// 6. Hook para Toggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle] as const
}

// Uso de los hooks
function MyComponent() {
  const { data, loading, error } = useFetch<User[]>('/api/users')
  const [name, setName] = useLocalStorage('name', '')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const { width, height } = useWindowSize()
  const [isOpen, toggleOpen] = useToggle()
  const prevCount = usePrevious(count)

  return <div>{/* UI aquí */}</div>
}`,
        language: 'tsx',
      },
    },

    // ============ REACT 19: use() HOOK ============
    {
      id: 'use-hook',
      title: 'React 19: use() Hook',
      type: 'code',
      code: {
        title: 'Nuevo Hook use() para Promises y Context',
        code: `import { use, Suspense } from 'react'

// 1. use() con Promises (nuevo en React 19)
async function fetchUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`)
  return response.json()
}

function UserProfile({ userId }: { userId: number }) {
  // use() puede leer promises directamente
  const user = use(fetchUser(userId))

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// Debe envolverse con Suspense
function App() {
  return (
    <Suspense fallback={<div>Cargando usuario...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  )
}

// 2. use() con Context (alternativa a useContext)
const ThemeContext = createContext('light')

function ThemedButton() {
  // Puedes usar use() en lugar de useContext
  const theme = use(ThemeContext)

  return <button className={theme}>Click me</button>
}

// 3. use() puede usarse condicionalmente (a diferencia de otros hooks)
function ConditionalData({ shouldFetch }: { shouldFetch: boolean }) {
  let data = null

  if (shouldFetch) {
    // Esto es VÁLIDO con use() pero NO con useEffect u otros hooks
    data = use(fetchData())
  }

  return <div>{data ? JSON.stringify(data) : 'No data'}</div>
}

// 4. use() en loops (también válido)
function MultipleUsers({ userIds }: { userIds: number[] }) {
  return (
    <div>
      {userIds.map(id => {
        // Válido con use()
        const user = use(fetchUser(id))
        return <div key={id}>{user.name}</div>
      })}
    </div>
  )
}

// 5. Cache de promises con use()
const cache = new Map()

function getCachedData(key: string) {
  if (!cache.has(key)) {
    cache.set(key, fetch(\`/api/data/\${key}\`).then(r => r.json()))
  }
  return cache.get(key)
}

function CachedComponent({ dataKey }: { dataKey: string }) {
  const data = use(getCachedData(dataKey))
  return <div>{JSON.stringify(data)}</div>
}`,
        language: 'tsx',
      },
    },

    // ============ REACT 19: ACTIONS ============
    {
      id: 'actions',
      title: 'React 19: Actions y useActionState',
      type: 'code',
      subsections: [
        {
          id: 'form-actions',
          title: 'Form Actions (Nuevo en React 19)',
          type: 'code',
          code: {
            title: 'Manejo de Formularios con Actions',
            code: `import { useActionState } from 'react'

// Action function - puede ser async
async function updateName(prevState: any, formData: FormData) {
  const name = formData.get('name') as string

  // Simular API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (name.length < 3) {
    return { error: 'El nombre debe tener al menos 3 caracteres' }
  }

  // Actualizar en servidor
  await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ name })
  })

  return { success: true, name }
}

function UpdateNameForm() {
  // useActionState maneja el estado de la action
  const [state, formAction, isPending] = useActionState(updateName, {
    error: null,
    success: false,
    name: ''
  })

  return (
    <form action={formAction}>
      <input name="name" type="text" disabled={isPending} />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Actualizando...' : 'Actualizar Nombre'}
      </button>

      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.success && <p style={{ color: 'green' }}>¡Actualizado!</p>}
    </form>
  )
}

// Con useTransition para acciones personalizadas
import { useTransition } from 'react'

function CustomActionButton() {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await fetch('/api/action', { method: 'POST' })
      // Actualizar UI
    })
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Procesando...' : 'Ejecutar Acción'}
    </button>
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'server-actions',
          title: 'Server Actions (React 19 + Next.js)',
          type: 'code',
          code: {
            title: 'Actions del Servidor',
            code: `// app/actions.ts (Next.js 15)
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string

  // Ejecutado en el servidor
  const todo = await db.todo.create({
    data: { title, completed: false }
  })

  revalidatePath('/todos')
  return { success: true, todo }
}

export async function deleteTodo(id: number) {
  await db.todo.delete({ where: { id } })
  revalidatePath('/todos')
  return { success: true }
}

// app/components/TodoForm.tsx
'use client'

import { useActionState } from 'react'
import { createTodo } from '../actions'

export function TodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, null)

  return (
    <form action={formAction}>
      <input name="title" placeholder="Nueva tarea" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creando...' : 'Crear Todo'}
      </button>
    </form>
  )
}

// app/components/TodoItem.tsx
'use client'

import { useTransition } from 'react'
import { deleteTodo } from '../actions'

export function TodoItem({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTodo(id)
    })
  }

  return (
    <div>
      <span>{title}</span>
      <button onClick={handleDelete} disabled={isPending}>
        {isPending ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  )
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ REACT 19: useFormStatus ============
    {
      id: 'use-form-status',
      title: 'React 19: useFormStatus',
      type: 'code',
      code: {
        title: 'Hook para Estado de Formularios',
        code: `import { useFormStatus } from 'react-dom'

// Componente de botón de submit que lee el estado del form
function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  )
}

// Componente de input que se deshabilita durante submit
function FormInput({ name, label }: { name: string; label: string }) {
  const { pending } = useFormStatus()

  return (
    <div>
      <label>{label}</label>
      <input name={name} disabled={pending} />
    </div>
  )
}

// Indicador de progreso
function FormProgress() {
  const { pending } = useFormStatus()

  if (!pending) return null

  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" />
    </div>
  )
}

// Formulario completo
async function submitForm(formData: FormData) {
  'use server' // Next.js server action

  const email = formData.get('email')
  const password = formData.get('password')

  await new Promise(resolve => setTimeout(resolve, 2000))

  return { success: true }
}

function LoginForm() {
  return (
    <form action={submitForm}>
      <FormInput name="email" label="Email" />
      <FormInput name="password" label="Password" />

      <FormProgress />
      <SubmitButton />
    </form>
  )
}

// Con useActionState para manejo de estado
import { useActionState } from 'react'

function SignupForm() {
  const [state, formAction] = useActionState(submitForm, null)

  return (
    <form action={formAction}>
      <FormInput name="name" label="Nombre" />
      <FormInput name="email" label="Email" />

      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">¡Registro exitoso!</p>}

      <SubmitButton />
    </form>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ REACT 19: useOptimistic ============
    {
      id: 'use-optimistic',
      title: 'React 19: useOptimistic',
      type: 'code',
      code: {
        title: 'Actualizaciones Optimistas de UI',
        code: `import { useOptimistic, useTransition } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

async function updateTodo(id: number, completed: boolean) {
  // Simular API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const response = await fetch(\`/api/todos/\${id}\`, {
    method: 'PATCH',
    body: JSON.stringify({ completed })
  })

  return response.json()
}

function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition()

  // useOptimistic permite actualizar la UI inmediatamente
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )

  const [optimisticUpdate, setOptimisticUpdate] = useOptimistic(
    todos,
    (state, { id, completed }: { id: number; completed: boolean }) => {
      return state.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    }
  )

  const handleToggle = (id: number, completed: boolean) => {
    // Actualizar UI optimistamente
    setOptimisticUpdate({ id, completed: !completed })

    // Actualizar en servidor
    startTransition(async () => {
      await updateTodo(id, !completed)
    })
  }

  const handleAdd = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }

    // Mostrar inmediatamente en UI
    addOptimisticTodo(newTodo)

    // Guardar en servidor
    startTransition(async () => {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo)
      })
    })
  }

  return (
    <div>
      {optimisticUpdate.map(todo => (
        <div key={todo.id} style={{ opacity: isPending ? 0.5 : 1 }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo.id, todo.completed)}
          />
          <span style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
        </div>
      ))}

      <button onClick={() => handleAdd('Nueva tarea')}>
        Agregar Todo
      </button>
    </div>
  )
}

// Ejemplo con likes optimistas
function Post({ postId, initialLikes }: { postId: number; initialLikes: number }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    initialLikes,
    (state, amount: number) => state + amount
  )

  const [isPending, startTransition] = useTransition()

  const handleLike = () => {
    addOptimisticLike(1)

    startTransition(async () => {
      await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' })
    })
  }

  return (
    <div>
      <p>Likes: {optimisticLikes}</p>
      <button onClick={handleLike} disabled={isPending}>
        ❤️ Me gusta
      </button>
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ SERVER COMPONENTS ============
    {
      id: 'server-components',
      title: 'React Server Components (RSC)',
      type: 'code',
      code: {
        title: 'Componentes del Servidor (Next.js 15)',
        code: `// app/page.tsx (Server Component por defecto)
async function getData() {
  const response = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Siempre datos frescos
  })
  return response.json()
}

// Server Component - puede ser async
export default async function Page() {
  const data = await getData()

  return (
    <div>
      <h1>Server Component</h1>
      <p>Estos datos se obtienen en el servidor</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

// app/components/ClientComponent.tsx
'use client' // Marca como Client Component

import { useState } from 'react'

export function ClientComponent({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>Client Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
      {children}
    </div>
  )
}

// app/components/HybridPage.tsx
import { ClientComponent } from './ClientComponent'

async function fetchUsers() {
  const res = await fetch('https://api.example.com/users')
  return res.json()
}

// Server Component que usa Client Component
export default async function HybridPage() {
  const users = await fetchUsers()

  return (
    <div>
      <h1>Hybrid Page</h1>

      {/* Server-rendered list */}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* Client Component con interactividad */}
      <ClientComponent>
        <p>Este contenido se pasa como children</p>
      </ClientComponent>
    </div>
  )
}

// Streaming con Suspense
import { Suspense } from 'react'

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return <div>Datos cargados después de 3 segundos</div>
}

export default function StreamingPage() {
  return (
    <div>
      <h1>Streaming Page</h1>

      {/* Se muestra inmediatamente */}
      <p>Contenido rápido</p>

      {/* Se hace streaming cuando esté listo */}
      <Suspense fallback={<div>Cargando datos lentos...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}

// Server Component: Beneficios
// 1. Acceso directo a base de datos
// 2. Mantener código sensible en el servidor
// 3. Bundle size más pequeño (no se envía JS al cliente)
// 4. Mejor SEO
// 5. Streaming y Suspense

// Client Component: Cuándo usar
// 1. Necesitas interactividad (onClick, onChange, etc.)
// 2. Necesitas useState, useEffect, hooks
// 3. Necesitas acceso a browser APIs
// 4. Necesitas event listeners`,
        language: 'tsx',
      },
    },

    // ============ SUSPENSE Y LAZY LOADING ============
    {
      id: 'suspense-lazy',
      title: 'Suspense y Lazy Loading',
      type: 'code',
      code: {
        title: 'Carga Diferida de Componentes',
        code: `import { Suspense, lazy } from 'react'

// 1. Lazy loading de componentes
const HeavyComponent = lazy(() => import('./HeavyComponent'))
const Dashboard = lazy(() => import('./Dashboard'))
const Settings = lazy(() => import('./Settings'))

function App() {
  return (
    <div>
      <h1>Mi App</h1>

      {/* Componente con lazy loading */}
      <Suspense fallback={<div>Cargando componente...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}

// 2. Múltiples componentes lazy
function MultiLazyApp() {
  const [page, setPage] = useState('dashboard')

  return (
    <div>
      <nav>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('settings')}>Settings</button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        {page === 'dashboard' && <Dashboard />}
        {page === 'settings' && <Settings />}
      </Suspense>
    </div>
  )
}

// 3. Suspense anidado
function NestedSuspense() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />

      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>

      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
    </Suspense>
  )
}

// 4. Suspense con data fetching (React 19)
function UserProfile({ userId }: { userId: number }) {
  const user = use(fetchUser(userId)) // React 19

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<div>Cargando usuario...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  )
}

// 5. Error Boundary con Suspense
import { ErrorBoundary } from 'react-error-boundary'

function AppWithErrorHandling() {
  return (
    <ErrorBoundary fallback={<div>Error al cargar</div>}>
      <Suspense fallback={<div>Cargando...</div>}>
        <DataComponent />
      </Suspense>
    </ErrorBoundary>
  )
}

// 6. SuspenseList (experimental)
import { SuspenseList } from 'react'

function TodoList() {
  return (
    <SuspenseList revealOrder="forwards">
      {todoIds.map(id => (
        <Suspense key={id} fallback={<TodoSkeleton />}>
          <TodoItem id={id} />
        </Suspense>
      ))}
    </SuspenseList>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ ERROR BOUNDARIES ============
    {
      id: 'error-boundaries',
      title: 'Error Boundaries',
      type: 'code',
      code: {
        title: 'Manejo de Errores en Componentes',
        code: `import { Component, ReactNode } from 'react'

// 1. Error Boundary con clase (aún necesario)
interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado:', error, errorInfo)
    // Enviar a servicio de logging
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h1>Algo salió mal</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// 2. Uso del Error Boundary
function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <MyComponent />
    </ErrorBoundary>
  )
}

// 3. Error Boundary con react-error-boundary (librería)
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h1>Error</h1>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reintentar</button>
    </div>
  )
}

function AppWithLibrary() {
  const handleError = (error: Error, info: { componentStack: string }) => {
    // Log a servicio
    console.error('Error:', error)
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Reset app state
      }}
    >
      <MyComponent />
    </ReactErrorBoundary>
  )
}

// 4. Múltiples Error Boundaries
function MultiErrorBoundaries() {
  return (
    <ErrorBoundary>
      <Header />

      <ErrorBoundary fallback={<SidebarError />}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<ContentError />}>
        <MainContent />
      </ErrorBoundary>
    </ErrorBoundary>
  )
}

// 5. Componente que lanza error (para testing)
function BuggyComponent() {
  const [count, setCount] = useState(0)

  if (count > 5) {
    throw new Error('Count demasiado alto')
  }

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ MANEJO DE FORMULARIOS ============
    {
      id: 'forms',
      title: 'Manejo de Formularios',
      type: 'code',
      subsections: [
        {
          id: 'controlled-forms',
          title: 'Formularios Controlados',
          type: 'code',
          code: {
            title: 'Inputs Controlados con useState',
            code: `import { useState, FormEvent } from 'react'

function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    country: '',
    subscribe: false,
    gender: '',
    interests: [] as string[]
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxArray = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value)
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
    // Enviar a API
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Text input */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
      />

      {/* Email input */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      {/* Textarea */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Mensaje"
      />

      {/* Select */}
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Selecciona país</option>
        <option value="mx">México</option>
        <option value="es">España</option>
        <option value="ar">Argentina</option>
      </select>

      {/* Checkbox único */}
      <label>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        Suscribirse al newsletter
      </label>

      {/* Radio buttons */}
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Masculino
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Femenino
        </label>
      </div>

      {/* Múltiples checkboxes */}
      <div>
        {['Sports', 'Music', 'Reading'].map(interest => (
          <label key={interest}>
            <input
              type="checkbox"
              value={interest}
              checked={formData.interests.includes(interest)}
              onChange={handleCheckboxArray}
            />
            {interest}
          </label>
        ))}
      </div>

      <button type="submit">Enviar</button>
    </form>
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'uncontrolled-forms',
          title: 'Formularios No Controlados',
          type: 'code',
          code: {
            title: 'Usando useRef y FormData',
            code: `import { useRef, FormEvent } from 'react'

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Opción 1: Usar refs
    console.log({
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    // Opción 2: Usar FormData
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData.entries())
      console.log(data)
    }

    // Reset form
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        ref={nameRef}
        name="name"
        type="text"
        defaultValue="Juan"
      />

      <input
        ref={emailRef}
        name="email"
        type="email"
        defaultValue="juan@example.com"
      />

      <button type="submit">Enviar</button>
    </form>
  )
}

// React 19: Server Actions con FormData
async function submitForm(formData: FormData) {
  'use server'

  const data = {
    name: formData.get('name'),
    email: formData.get('email')
  }

  await saveToDatabase(data)
  return { success: true }
}

function ServerActionForm() {
  return (
    <form action={submitForm}>
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <button type="submit">Enviar</button>
    </form>
  )
}`,
            language: 'tsx',
          },
        },
      ],
    },

    // ============ EVENTOS ============
    {
      id: 'events',
      title: 'Manejo de Eventos',
      type: 'code',
      code: {
        title: 'Event Handlers en React',
        code: `import { MouseEvent, KeyboardEvent, ChangeEvent, FormEvent } from 'react'

function EventExamples() {
  // Click events
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked:', e.currentTarget)
    console.log('Coords:', e.clientX, e.clientY)
  }

  const handleDoubleClick = () => {
    console.log('Double clicked')
  }

  // Keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log('Key:', e.key)

    if (e.key === 'Enter') {
      console.log('Enter pressed')
    }

    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      console.log('Ctrl+S pressed')
    }
  }

  // Input events
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Value:', e.target.value)
  }

  // Form events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
  }

  // Mouse events
  const handleMouseEnter = () => console.log('Mouse entered')
  const handleMouseLeave = () => console.log('Mouse left')
  const handleMouseMove = (e: MouseEvent) => {
    console.log('Mouse at:', e.clientX, e.clientY)
  }

  // Focus events
  const handleFocus = () => console.log('Focused')
  const handleBlur = () => console.log('Blurred')

  // Inline event handler
  const handleInline = () => console.log('Inline')

  // Event handler con parámetros
  const handleWithParam = (id: number, e: MouseEvent) => {
    console.log('ID:', id)
  }

  return (
    <div>
      {/* Click events */}
      <button onClick={handleClick}>Click me</button>
      <button onDoubleClick={handleDoubleClick}>Double click</button>

      {/* Keyboard events */}
      <input onKeyDown={handleKeyDown} placeholder="Press Enter" />

      {/* Input events */}
      <input onChange={handleChange} placeholder="Type something" />

      {/* Form events */}
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>

      {/* Mouse events */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ width: 200, height: 200, border: '1px solid black' }}
      >
        Hover over me
      </div>

      {/* Focus events */}
      <input onFocus={handleFocus} onBlur={handleBlur} />

      {/* Inline handler */}
      <button onClick={() => console.log('Inline')}>
        Inline
      </button>

      {/* Handler con parámetros */}
      <button onClick={(e) => handleWithParam(123, e)}>
        With param
      </button>

      {/* Prevenir propagación */}
      <div onClick={() => console.log('Parent')}>
        <button onClick={(e) => {
          e.stopPropagation()
          console.log('Child only')
        }}>
          Stop propagation
        </button>
      </div>

      {/* Prevenir default */}
      <a href="#" onClick={(e) => {
        e.preventDefault()
        console.log('Link clicked but not followed')
      }}>
        Click me
      </a>
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ RENDERIZADO CONDICIONAL ============
    {
      id: 'conditional-rendering',
      title: 'Renderizado Condicional',
      type: 'code',
      code: {
        title: 'Diferentes Formas de Renderizado Condicional',
        code: `function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest')
  const [items, setItems] = useState<string[]>([])

  return (
    <div>
      {/* 1. if/else con variable */}
      {(() => {
        if (isLoggedIn) {
          return <Dashboard />
        } else {
          return <Login />
        }
      })()}

      {/* 2. Operador ternario */}
      {isLoggedIn ? <Dashboard /> : <Login />}

      {/* 3. && para renderizar o nada */}
      {isLoggedIn && <WelcomeMessage />}
      {items.length > 0 && <ItemsList items={items} />}

      {/* 4. Guardia para null/undefined */}
      {!isLoggedIn && <p>Por favor inicia sesión</p>}

      {/* 5. Switch con objeto */}
      {{
        admin: <AdminPanel />,
        user: <UserDashboard />,
        guest: <GuestView />
      }[userRole]}

      {/* 6. Múltiples condiciones */}
      {isLoggedIn && userRole === 'admin' && <AdminSettings />}

      {/* 7. Operador OR para fallback */}
      {items.length > 0 ? (
        <ItemsList items={items} />
      ) : (
        <EmptyState />
      )}

      {/* 8. Renderizado condicional complejo */}
      {(() => {
        if (!isLoggedIn) return <Login />
        if (userRole === 'admin') return <AdminPanel />
        if (userRole === 'user') return <UserDashboard />
        return <GuestView />
      })()}

      {/* 9. Componente helper para renderizado */}
      <Show when={isLoggedIn} fallback={<Login />}>
        <Dashboard />
      </Show>

      {/* 10. Early return en componente */}
      <ConditionalComponent isLoggedIn={isLoggedIn} />
    </div>
  )
}

// Helper component para renderizado condicional
function Show({
  when,
  children,
  fallback
}: {
  when: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return when ? children : (fallback || null)
}

// Componente con early return
function ConditionalComponent({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (!isLoggedIn) {
    return <Login />
  }

  return <Dashboard />
}`,
        language: 'tsx',
      },
    },

    // ============ LISTAS Y KEYS ============
    {
      id: 'lists-keys',
      title: 'Listas y Keys',
      type: 'code',
      code: {
        title: 'Renderizado de Listas',
        code: `interface User {
  id: number
  name: string
  email: string
}

function ListExamples() {
  const numbers = [1, 2, 3, 4, 5]
  const users: User[] = [
    { id: 1, name: 'Juan', email: 'juan@example.com' },
    { id: 2, name: 'María', email: 'maria@example.com' },
    { id: 3, name: 'Pedro', email: 'pedro@example.com' }
  ]

  return (
    <div>
      {/* 1. Array simple */}
      <ul>
        {numbers.map(num => (
          <li key={num}>{num}</li>
        ))}
      </ul>

      {/* 2. Array de objetos */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

      {/* 3. Con componente */}
      <div>
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* 4. Con index (solo si no hay ID único) */}
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>

      {/* 5. Filtrado y mapeo */}
      <ul>
        {users
          .filter(user => user.name.startsWith('J'))
          .map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
      </ul>

      {/* 6. Map con fragmentos */}
      {users.map(user => (
        <React.Fragment key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </React.Fragment>
      ))}

      {/* 7. Lista con acciones */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleEdit(user.id)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* 8. Lista anidada */}
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* 9. Lista con estado vacío */}
      {users.length > 0 ? (
        users.map(user => <UserCard key={user.id} user={user} />)
      ) : (
        <EmptyState message="No hay usuarios" />
      )}

      {/* 10. Lista con separadores */}
      {users.map((user, index) => (
        <React.Fragment key={user.id}>
          <UserCard user={user} />
          {index < users.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  )
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ PORTALS ============
    {
      id: 'portals',
      title: 'Portals',
      type: 'code',
      code: {
        title: 'Renderizar Fuera de la Jerarquía DOM',
        code: `import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

// 1. Modal básico con Portal
function Modal({ isOpen, onClose, children }: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  )
}

// 2. Portal a elemento específico
function CustomPortal({ children }: { children: React.ReactNode }) {
  return createPortal(
    children,
    document.getElementById('portal-root')!
  )
}

// 3. Tooltip con Portal
function Tooltip({ text, children }: {
  text: string
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsVisible(true)
  }

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y
          }}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  )
}

// 4. Drawer/Sidebar con Portal
function Drawer({ isOpen, onClose, children }: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return createPortal(
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        {children}
      </div>
    </>,
    document.body
  )
}

// 5. Toast/Notification con Portal
function Toast({ message, type }: {
  message: string
  type: 'success' | 'error' | 'info'
}) {
  return createPortal(
    <div className={\`toast toast-\${type}\`}>
      {message}
    </div>,
    document.getElementById('toast-container')!
  )
}

// Uso de los componentes
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Abrir Modal
      </button>

      <button onClick={() => setIsDrawerOpen(true)}>
        Abrir Drawer
      </button>

      <Tooltip text="Este es un tooltip">
        <span>Hover me</span>
      </Tooltip>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Modal Content</h1>
        <p>Este contenido está en un portal</p>
      </Modal>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <h2>Drawer Content</h2>
      </Drawer>
    </div>
  )
}`,
        language: 'tsx',
      },
    },

    // ============ PATRONES COMUNES ============
    {
      id: 'patterns',
      title: 'Patrones Comunes',
      type: 'code',
      subsections: [
        {
          id: 'compound-components',
          title: 'Compound Components',
          type: 'code',
          code: {
            title: 'Componentes Compuestos',
            code: `import { createContext, useContext, useState, ReactNode } from 'react'

// Tabs compound component pattern
interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function Tabs({ children, defaultTab }: {
  children: ReactNode
  defaultTab: string
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  )
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list">{children}</div>
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')

  const { activeTab, setActiveTab } = context

  return (
    <button
      className={\`tab \${activeTab === value ? 'active' : ''}\`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabPanel must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className="tab-panel">{children}</div>
}

// Asignar como propiedades estáticas
Tabs.List = TabList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

// Uso
function App() {
  return (
    <Tabs defaultTab="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="tab1">
        <h2>Contenido Tab 1</h2>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <h2>Contenido Tab 2</h2>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <h2>Contenido Tab 3</h2>
      </Tabs.Panel>
    </Tabs>
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'render-props',
          title: 'Render Props',
          type: 'code',
          code: {
            title: 'Patrón Render Props',
            code: `// Mouse tracker con render prop
function MouseTracker({ render }: {
  render: (position: { x: number; y: number }) => React.ReactNode
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <>{render(position)}</>
}

// Uso
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>Mouse position: {x}, {y}</h1>
      )}
    />
  )
}

// Data fetcher con render prop
function DataFetcher<T>({ url, render }: {
  url: string
  render: (data: {
    data: T | null
    loading: boolean
    error: Error | null
  }) => React.ReactNode
}) {
  const { data, loading, error } = useFetch<T>(url)

  return <>{render({ data, loading, error })}</>
}

// Uso
function UserList() {
  return (
    <DataFetcher<User[]>
      url="/api/users"
      render={({ data, loading, error }) => {
        if (loading) return <div>Cargando...</div>
        if (error) return <div>Error: {error.message}</div>
        if (!data) return null

        return (
          <ul>
            {data.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )
      }}
    />
  )
}`,
            language: 'tsx',
          },
        },
        {
          id: 'hoc',
          title: 'Higher-Order Components',
          type: 'code',
          code: {
            title: 'HOC para Reutilización de Lógica',
            code: `import { ComponentType } from 'react'

// HOC para loading state
function withLoading<P extends object>(
  Component: ComponentType<P>
) {
  return function WithLoadingComponent(
    props: P & { loading: boolean }
  ) {
    const { loading, ...rest } = props

    if (loading) {
      return <div>Cargando...</div>
    }

    return <Component {...(rest as P)} />
  }
}

// HOC para autenticación
function withAuth<P extends object>(
  Component: ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth()

    if (loading) return <div>Cargando...</div>
    if (!user) return <div>No autorizado</div>

    return <Component {...props} />
  }
}

// HOC para data fetching
function withData<T, P extends object>(
  Component: ComponentType<P & { data: T }>,
  url: string
) {
  return function WithDataComponent(props: P) {
    const { data, loading, error } = useFetch<T>(url)

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return null

    return <Component {...props} data={data} />
  }
}

// Uso
function UserProfile({ user }: { user: User }) {
  return <div>{user.name}</div>
}

const UserProfileWithLoading = withLoading(UserProfile)
const ProtectedUserProfile = withAuth(UserProfile)
const UserProfileWithData = withData<User, {}>(UserProfile, '/api/user')

// Componer múltiples HOCs
const EnhancedProfile = withAuth(withLoading(UserProfile))`,
            language: 'tsx',
          },
        },
      ],
    },
  ],
}
