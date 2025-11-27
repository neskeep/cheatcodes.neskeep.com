import type { Cheatcode } from '../types'

export const vueCheatcode: Cheatcode = {
  metadata: {
    id: 'vue',
    title: 'Vue 3',
    language: 'Vue',
    category: 'framework',
    tags: ['vue', 'javascript', 'framework', 'frontend'],
    version: '3.5+',
    description: 'Guía completa de Vue 3 cubriendo Composition API, Reactividad, Componentes, Directivas, Enrutamiento, Gestión de Estado y más',
    lastUpdated: '2025-11-21',
    logo: '/logos/vue.svg',
    color: '#42b883',
    difficulty: 'intermediate',
  },
  sections: [
    // ============ INSTALACIÓN Y CONFIGURACIÓN ============
    {
      id: 'installation',
      title: 'Instalación y Configuración del Proyecto',
      type: 'text',
      content: 'Los proyectos Vue 3 se crean comúnmente con create-vue (herramienta oficial de scaffolding) o Vite.',
      subsections: [
        {
          id: 'create-project',
          title: 'Crear un Nuevo Proyecto Vue 3',
          type: 'package-install',
          packageCommands: {
            npm: 'npm create vue@latest',
            pnpm: 'pnpm create vue@latest',
            yarn: 'yarn create vue@latest',
            bun: 'bun create vue@latest',
          },
        },
        {
          id: 'install-deps',
          title: 'Instalar Dependencias',
          type: 'package-install',
          packageCommands: {
            npm: 'cd my-app && npm install && npm run dev',
            pnpm: 'cd my-app && pnpm install && pnpm dev',
            yarn: 'cd my-app && yarn && yarn dev',
            bun: 'cd my-app && bun install && bun dev',
          },
        },
        {
          id: 'vite-alternative',
          title: 'Alternativa con Vite Directo',
          type: 'package-install',
          packageCommands: {
            npm: 'npm create vite@latest my-app -- --template vue',
            pnpm: 'pnpm create vite@latest my-app --template vue',
            yarn: 'yarn create vite my-app --template vue',
            bun: 'bun create vite my-app --template vue',
          },
        },
      ],
    },

    // ============ FUNDAMENTOS DE COMPONENTES ============
    {
      id: 'component-setup',
      title: 'Estructura de Componentes',
      type: 'code',
      subsections: [
        {
          id: 'script-setup',
          title: 'Sintaxis Script Setup',
          type: 'code',
          code: {
            title: 'Componente Básico con <script setup>',
            code: `<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Props (propiedades)
const props = defineProps<{
  title: string
  count?: number
}>()

// Emits (eventos)
const emit = defineEmits<{
  update: [value: number]
  delete: []
}>()

// Estado reactivo
const message = ref('¡Hola Vue!')
const items = ref<string[]>([])

// Computada
const upperMessage = computed(() => message.value.toUpperCase())

// Métodos
const handleClick = () => {
  emit('update', props.count + 1)
}

// Ciclo de vida
onMounted(() => {
  console.log('Componente montado')
})
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ upperMessage }}</p>
    <button @click="handleClick">Hazme clic</button>
  </div>
</template>

<style scoped>
h1 {
  color: v-bind(props.color);
}
</style>`,
            language: 'vue',
          },
        },
        {
          id: 'options-api',
          title: 'Options API (Alternativa)',
          type: 'code',
          code: {
            title: 'Componente con Options API',
            code: `<script>
export default {
  name: 'MiComponente',
  props: {
    title: String,
    count: { type: Number, default: 0 }
  },
  emits: ['update', 'delete'],
  data() {
    return {
      message: '¡Hola Vue!',
      items: []
    }
  },
  computed: {
    upperMessage() {
      return this.message.toUpperCase()
    }
  },
  methods: {
    handleClick() {
      this.$emit('update', this.count + 1)
    }
  },
  mounted() {
    console.log('Componente montado')
  }
}
</script>`,
            language: 'vue',
          },
        },
      ],
    },

    // ============ NÚCLEO DE REACTIVIDAD ============
    {
      id: 'reactivity',
      title: 'Sistema de Reactividad',
      type: 'code',
      subsections: [
        {
          id: 'ref-reactive',
          title: 'ref() vs reactive()',
          type: 'code',
          code: {
            title: 'Creando Datos Reactivos',
            code: `import { ref, reactive, toRefs } from 'vue'

// ref() - para primitivos (acceder con .value)
const count = ref(0)
const message = ref('Hola')
const user = ref({ name: 'Juan', age: 30 })

count.value++ // acceso con .value
console.log(user.value.name) // acceso anidado

// reactive() - para objetos (no necesita .value)
const state = reactive({
  count: 0,
  message: 'Hola',
  nested: {
    value: 42
  }
})

state.count++ // acceso directo
state.nested.value = 100

// toRefs() - convierte reactive a refs
const { count, message } = toRefs(state)
// Ahora count y message son refs`,
            language: 'typescript',
          },
        },
        {
          id: 'computed',
          title: 'Propiedades Computadas',
          type: 'code',
          code: {
            title: 'Valores Computados',
            code: `import { ref, computed } from 'vue'

const firstName = ref('Juan')
const lastName = ref('García')

// Computada de solo lectura
const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

// Computada con escritura
const fullNameWritable = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(value) {
    const parts = value.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1]
  }
})

fullNameWritable.value = 'María López' // activa el setter`,
            language: 'typescript',
          },
        },
        {
          id: 'watch',
          title: 'Observadores',
          type: 'code',
          code: {
            title: 'Observando Datos Reactivos',
            code: `import { ref, reactive, watch, watchEffect } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Juan' })

// Observar un ref
watch(count, (newVal, oldVal) => {
  console.log(\`Contador: \${oldVal} → \${newVal}\`)
})

// Observar una propiedad reactiva
watch(() => state.name, (newVal) => {
  console.log('Nombre cambió:', newVal)
})

// Observar múltiples fuentes
watch([count, () => state.name], ([newCount, newName]) => {
  console.log('Múltiples valores cambiaron')
})

// watchEffect - seguimiento automático de dependencias
watchEffect(() => {
  console.log(\`El contador es \${count.value}\`)
  // Se re-ejecuta automáticamente cuando count cambia
})

// Detener observación
const stop = watch(count, () => {})
stop() // limpieza`,
            language: 'typescript',
          },
        },
      ],
    },

    // ============ SINTAXIS DE PLANTILLAS ============
    {
      id: 'template-syntax',
      title: 'Sintaxis de Plantillas',
      type: 'table',
      subsections: [
        {
          id: 'interpolation',
          title: 'Interpolación de Texto y Expresiones',
          type: 'code',
          code: {
            title: 'Expresiones en Plantillas',
            code: `<template>
  <!-- Interpolación de texto -->
  <p>{{ message }}</p>

  <!-- Expresiones JavaScript -->
  <p>{{ count + 1 }}</p>
  <p>{{ ok ? 'SÍ' : 'NO' }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>

  <!-- Llamadas a métodos -->
  <p>{{ formatDate(date) }}</p>

  <!-- HTML crudo (¡cuidado!) -->
  <div v-html="rawHtml"></div>

  <!-- Enlace de atributos -->
  <div :id="dynamicId" :class="className"></div>
</template>`,
            language: 'vue',
          },
        },
        {
          id: 'directives-table',
          title: 'Directivas Principales',
          type: 'table',
          table: {
            title: 'Directivas de Plantillas Vue',
            headers: ['Directiva', 'Atajo', 'Ejemplo', 'Descripción'],
            rows: [
              { Directive: 'v-bind', Shorthand: ':', Example: ':href="url"', Description: 'Enlazar atributo dinámicamente' },
              { Directive: 'v-on', Shorthand: '@', Example: '@click="handler"', Description: 'Adjuntar escuchador de eventos' },
              { Directive: 'v-model', Shorthand: '-', Example: 'v-model="text"', Description: 'Enlace de datos bidireccional' },
              { Directive: 'v-if', Shorthand: '-', Example: 'v-if="show"', Description: 'Renderizado condicional (elimina del DOM)' },
              { Directive: 'v-else-if', Shorthand: '-', Example: 'v-else-if="type === 2"', Description: 'Condición else if' },
              { Directive: 'v-else', Shorthand: '-', Example: 'v-else', Description: 'Condición else' },
              { Directive: 'v-show', Shorthand: '-', Example: 'v-show="visible"', Description: 'Alternar visibilidad (display CSS)' },
              { Directive: 'v-for', Shorthand: '-', Example: 'v-for="item in items"', Description: 'Renderizado de listas' },
              { Directive: 'v-slot', Shorthand: '#', Example: '#header', Description: 'Slots nombrados' },
              { Directive: 'v-pre', Shorthand: '-', Example: 'v-pre', Description: 'Omitir compilación' },
              { Directive: 'v-once', Shorthand: '-', Example: 'v-once', Description: 'Renderizar solo una vez' },
              { Directive: 'v-memo', Shorthand: '-', Example: 'v-memo="[value]"', Description: 'Memoizar subárbol (Vue 3.2+)' },
            ],
          },
        },
      ],
    },

    // ============ RENDERIZADO CONDICIONAL Y DE LISTAS ============
    {
      id: 'rendering',
      title: 'Renderizado Condicional y de Listas',
      type: 'code',
      code: {
        title: 'Ejemplos de v-if, v-show y v-for',
        code: `<template>
  <!-- Renderizado Condicional -->
  <div v-if="type === 'A'">Tipo A</div>
  <div v-else-if="type === 'B'">Tipo B</div>
  <div v-else>Ni A ni B</div>

  <!-- v-show (alternar display) -->
  <div v-show="isVisible">Contenido visible</div>

  <!-- Renderizado de Listas -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}: {{ item.name }}
    </li>
  </ul>

  <!-- Iteración de objetos -->
  <div v-for="(value, key, index) in object" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>

  <!-- Rango -->
  <span v-for="n in 10" :key="n">{{ n }}</span>

  <!-- v-for con componente -->
  <TodoItem
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
  />
</template>`,
        language: 'vue',
      },
    },

    // ============ MANEJO DE EVENTOS ============
    {
      id: 'events',
      title: 'Manejo de Eventos',
      type: 'code',
      code: {
        title: 'Escuchadores de Eventos y Modificadores',
        code: `<template>
  <!-- Manejador de método -->
  <button @click="handleClick">Hazme clic</button>

  <!-- Manejador en línea -->
  <button @click="count++">Incrementar</button>

  <!-- Objeto de evento -->
  <button @click="(event) => console.log(event)">Registrar Evento</button>

  <!-- Modificadores de eventos -->
  <form @submit.prevent="onSubmit">Enviar</form>
  <button @click.stop="doThis">Detener Propagación</button>
  <button @click.once="doThis">Una vez</button>
  <div @click.self="doThat">Solo propio</div>
  <div @scroll.passive="onScroll">Pasivo</div>

  <!-- Modificadores de teclas -->
  <input @keyup.enter="submit" />
  <input @keyup.ctrl.s="save" />
  <input @keyup.page-down="onPageDown" />

  <!-- Modificadores de ratón -->
  <button @click.left="leftClick">Clic izquierdo</button>
  <button @click.right.prevent="rightClick">Clic derecho</button>
  <button @click.middle="middleClick">Clic central</button>

  <!-- Múltiples manejadores -->
  <button @click="one($event), two($event)">Múltiple</button>
</template>

<script setup>
const handleClick = (event) => {
  console.log('¡Clic!', event.target)
}

const onSubmit = () => {
  console.log('Formulario enviado')
}
</script>`,
        language: 'vue',
      },
    },

    // ============ ENLACES DE ENTRADA DE FORMULARIOS ============
    {
      id: 'forms',
      title: 'Enlaces de Entrada de Formularios',
      type: 'code',
      code: {
        title: 'v-model con Diferentes Tipos de Entrada',
        code: `<script setup>
import { ref } from 'vue'

const text = ref('')
const message = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const multiSelect = ref([])
</script>

<template>
  <!-- Texto -->
  <input v-model="text" placeholder="Ingresa texto" />

  <!-- Área de texto -->
  <textarea v-model="message" placeholder="Multilínea"></textarea>

  <!-- Checkbox -->
  <input type="checkbox" v-model="checked" />

  <!-- Múltiples checkboxes -->
  <input type="checkbox" value="Carlos" v-model="checkedNames" />
  <input type="checkbox" value="Juan" v-model="checkedNames" />
  <input type="checkbox" value="Miguel" v-model="checkedNames" />

  <!-- Radio -->
  <input type="radio" value="Uno" v-model="picked" />
  <input type="radio" value="Dos" v-model="picked" />

  <!-- Select -->
  <select v-model="selected">
    <option disabled value="">Por favor selecciona</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <!-- Select múltiple -->
  <select v-model="multiSelect" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <!-- Modificadores -->
  <input v-model.lazy="text" />      <!-- sincroniza en change -->
  <input v-model.number="age" />     <!-- convierte a número -->
  <input v-model.trim="message" />   <!-- elimina espacios -->
</template>`,
        language: 'vue',
      },
    },

    // ============ HOOKS DEL CICLO DE VIDA ============
    {
      id: 'lifecycle',
      title: 'Hooks del Ciclo de Vida',
      type: 'code',
      subsections: [
        {
          id: 'lifecycle-composition',
          title: 'Ciclo de Vida en Composition API',
          type: 'code',
          code: {
            title: 'Hooks del Ciclo de Vida del Componente',
            code: `import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onActivated,
  onDeactivated
} from 'vue'

// Antes de agregar el componente al DOM
onBeforeMount(() => {
  console.log('Antes de montar')
})

// Después de montar el componente (DOM listo)
onMounted(() => {
  console.log('Montado - puede acceder al DOM')
  // Llamadas API, configurar escuchadores de eventos, etc.
})

// Antes de que los datos reactivos provoquen re-renderizado
onBeforeUpdate(() => {
  console.log('Antes de actualizar')
})

// Después de actualizar el DOM
onUpdated(() => {
  console.log('Actualizado - DOM fresco')
})

// Antes de destruir el componente
onBeforeUnmount(() => {
  console.log('Antes de desmontar - hora de limpiar')
})

// Después de destruir el componente
onUnmounted(() => {
  console.log('Desmontado')
  // Eliminar escuchadores de eventos, limpiar timers
})

// Capturar errores de componentes hijos
onErrorCaptured((err, instance, info) => {
  console.error('Error capturado:', err)
  return false // detener propagación
})

// Para componentes con <keep-alive>
onActivated(() => console.log('Activado'))
onDeactivated(() => console.log('Desactivado'))`,
            language: 'typescript',
          },
        },
        {
          id: 'lifecycle-diagram',
          title: 'Orden del Ciclo de Vida',
          type: 'list',
          items: [
            'setup() - Inicialización del componente',
            'onBeforeMount() - Antes de insertar en el DOM',
            'onMounted() - Componente montado, DOM listo',
            'onBeforeUpdate() - Antes del re-renderizado (cuando cambian datos reactivos)',
            'onUpdated() - Después del re-renderizado y actualización del DOM',
            'onBeforeUnmount() - Antes de eliminar el componente',
            'onUnmounted() - Componente destruido, limpieza completa',
          ],
        },
      ],
    },

    // ============ COMUNICACIÓN ENTRE COMPONENTES ============
    {
      id: 'props-emits',
      title: 'Props y Emits',
      type: 'code',
      subsections: [
        {
          id: 'props-def',
          title: 'Definiendo Props',
          type: 'code',
          code: {
            title: 'Props con TypeScript',
            code: `<script setup lang="ts">
// Declaración en tiempo de ejecución
const props = defineProps({
  title: String,
  count: { type: Number, required: true },
  tags: { type: Array, default: () => [] },
  user: {
    type: Object,
    required: true,
    validator: (value) => value.id > 0
  }
})

// Declaración basada en TypeScript (recomendado)
interface Props {
  title: string
  count: number
  tags?: string[]
  user: { id: number; name: string }
}

const props = defineProps<Props>()

// Con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  title: 'Título por Defecto',
  tags: () => []
})

// Acceder a props
console.log(props.title)
console.log(props.count)
</script>`,
            language: 'typescript',
          },
        },
        {
          id: 'emits-def',
          title: 'Definiendo Emits',
          type: 'code',
          code: {
            title: 'Eventos Personalizados con TypeScript',
            code: `<script setup lang="ts">
// Declaración en tiempo de ejecución
const emit = defineEmits(['update', 'delete', 'save'])

// Declaración con TypeScript (recomendado)
const emit = defineEmits<{
  update: [id: number, value: string]
  delete: []
  save: [data: { name: string; age: number }]
}>()

// Con validación
const emit = defineEmits({
  update: (id: number, value: string) => {
    return id > 0 && value.length > 0
  },
  delete: null,
  save: null
})

// Emitir eventos
emit('update', 42, 'nuevo valor')
emit('delete')
emit('save', { name: 'Juan', age: 30 })
</script>

<template>
  <button @click="emit('update', props.id, 'valor')">
    Actualizar
  </button>
</template>`,
            language: 'typescript',
          },
        },
      ],
    },

    // ============ SLOTS ============
    {
      id: 'slots',
      title: 'Slots',
      type: 'code',
      code: {
        title: 'Uso de Slots y Slots con Alcance',
        code: `<!-- Componente Padre -->
<template>
  <BaseCard>
    <!-- Slot por defecto -->
    <p>Esto va en el slot por defecto</p>

    <!-- Slots nombrados -->
    <template #header>
      <h1>Título de la Tarjeta</h1>
    </template>

    <template #footer>
      <button>Guardar</button>
    </template>

    <!-- Slots con alcance -->
    <template #item="{ item, index }">
      <div>{{ index }}: {{ item.name }}</div>
    </template>
  </BaseCard>
</template>

<!-- Componente BaseCard -->
<template>
  <div class="card">
    <header>
      <!-- Slot nombrado con fallback -->
      <slot name="header">
        <h2>Encabezado por Defecto</h2>
      </slot>
    </header>

    <main>
      <!-- Slot por defecto -->
      <slot></slot>
    </main>

    <footer>
      <slot name="footer"></slot>
    </footer>

    <!-- Slot con alcance (pasar datos al padre) -->
    <div v-for="(item, index) in items" :key="item.id">
      <slot name="item" :item="item" :index="index">
        {{ item.name }}
      </slot>
    </div>
  </div>
</template>`,
        language: 'vue',
      },
    },

    // ============ COMPOSABLES ============
    {
      id: 'composables',
      title: 'Composables (Lógica Reutilizable)',
      type: 'code',
      code: {
        title: 'Creando y Usando Composables',
        code: `// composables/useMouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}

// composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return { data, error, loading, refetch: fetchData }
}

// Uso en un componente
<script setup>
import { useMouse } from '@/composables/useMouse'
import { useFetch } from '@/composables/useFetch'

const { x, y } = useMouse()
const { data, loading, error } = useFetch('/api/users')
</script>`,
        language: 'typescript',
      },
    },

    // ============ PROVIDE / INJECT ============
    {
      id: 'provide-inject',
      title: 'Provide / Inject',
      type: 'code',
      code: {
        title: 'Inyección de Dependencias',
        code: `<!-- Componente Padre -->
<script setup>
import { ref, provide } from 'vue'

const theme = ref('dark')
const updateTheme = (newTheme) => {
  theme.value = newTheme
}

// Proveer a todos los descendientes
provide('theme', theme)
provide('updateTheme', updateTheme)

// Con TypeScript
import type { InjectionKey, Ref } from 'vue'

const themeKey: InjectionKey<Ref<string>> = Symbol('theme')
provide(themeKey, theme)
</script>

<!-- Componente Hijo/Descendiente -->
<script setup>
import { inject } from 'vue'

// Inyectar desde ancestro
const theme = inject('theme')
const updateTheme = inject('updateTheme')

// Con valor por defecto
const theme = inject('theme', 'light')

// Con TypeScript
const theme = inject(themeKey)
if (theme) {
  console.log(theme.value) // tipado seguro
}
</script>`,
        language: 'vue',
      },
    },

    // ============ REFERENCIAS DE PLANTILLA ============
    {
      id: 'template-refs',
      title: 'Referencias de Plantilla',
      type: 'code',
      code: {
        title: 'Accediendo a Elementos DOM y Componentes',
        code: `<script setup>
import { ref, onMounted } from 'vue'

// Ref de elemento
const input = ref<HTMLInputElement | null>(null)

// Ref de componente
const childComponent = ref<InstanceType<typeof ChildComponent> | null>(null)

onMounted(() => {
  // Acceder al elemento DOM nativo
  input.value?.focus()

  // Acceder a métodos/propiedades del componente hijo
  childComponent.value?.someMethod()
})

// Refs de función
const setInputRef = (el) => {
  if (el) {
    el.focus()
  }
}
</script>

<template>
  <!-- Ref de elemento -->
  <input ref="input" />

  <!-- Ref de componente -->
  <ChildComponent ref="childComponent" />

  <!-- Ref de función -->
  <input :ref="setInputRef" />

  <!-- Ref en v-for -->
  <ul>
    <li v-for="item in items" :key="item" :ref="(el) => itemRefs.push(el)">
      {{ item }}
    </li>
  </ul>
</template>`,
        language: 'vue',
      },
    },

    // ============ COMPONENTES ASÍNCRONOS ============
    {
      id: 'async-components',
      title: 'Componentes Asíncronos y Suspense',
      type: 'code',
      code: {
        title: 'Carga Diferida de Componentes',
        code: `<script setup>
import { defineAsyncComponent } from 'vue'

// Componente asíncrono simple
const AsyncModal = defineAsyncComponent(() =>
  import('./components/Modal.vue')
)

// Con opciones
const AsyncModalWithOptions = defineAsyncComponent({
  loader: () => import('./components/Modal.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000
})
</script>

<template>
  <!-- Usando Suspense -->
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</template>

<!-- Setup Asíncrono -->
<script setup>
// Await de nivel superior (requiere Suspense en el padre)
const data = await fetch('/api/data').then(r => r.json())
</script>`,
        language: 'vue',
      },
    },

    // ============ TELEPORT ============
    {
      id: 'teleport',
      title: 'Teleport',
      type: 'code',
      code: {
        title: 'Renderizar Contenido Fuera de la Jerarquía de Componentes',
        code: `<template>
  <!-- Teleport al body -->
  <Teleport to="body">
    <div class="modal">
      <p>Contenido del modal</p>
    </div>
  </Teleport>

  <!-- Teleport a elemento específico -->
  <Teleport to="#modal-container">
    <Modal />
  </Teleport>

  <!-- Teleport condicional -->
  <Teleport to="body" :disabled="!isMobile">
    <MobileMenu />
  </Teleport>

  <!-- Múltiples teleports al mismo destino -->
  <Teleport to="#notifications">
    <Notification />
  </Teleport>
  <Teleport to="#notifications">
    <AnotherNotification />
  </Teleport>
</template>`,
        language: 'vue',
      },
    },

    // ============ DIRECTIVAS PERSONALIZADAS ============
    {
      id: 'custom-directives',
      title: 'Directivas Personalizadas',
      type: 'code',
      code: {
        title: 'Creando Directivas Personalizadas',
        code: `// directives/focus.ts
import type { Directive } from 'vue'

// Directiva de función simple
export const vFocus: Directive = (el) => {
  el.focus()
}

// Directiva con hooks de ciclo de vida
export const vClickOutside: Directive = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// Uso en un componente
<script setup>
import { vFocus, vClickOutside } from '@/directives'

const handleClickOutside = () => {
  console.log('¡Clic afuera!')
}
</script>

<template>
  <input v-focus />
  <div v-click-outside="handleClickOutside">
    Haz clic fuera de mí
  </div>
</template>

// Registrar globalmente (main.ts)
import { createApp } from 'vue'
import { vFocus } from './directives/focus'

const app = createApp(App)
app.directive('focus', vFocus)`,
        language: 'typescript',
      },
    },

    // ============ TRANSICIONES ============
    {
      id: 'transitions',
      title: 'Transiciones y Animaciones',
      type: 'code',
      code: {
        title: 'Componente Transition',
        code: `<template>
  <!-- Transición básica -->
  <Transition name="fade">
    <p v-if="show">Hola</p>
  </Transition>

  <!-- Transición con modo -->
  <Transition name="slide" mode="out-in">
    <component :is="currentView" />
  </Transition>

  <!-- Grupo de transición (para listas) -->
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>

  <!-- Hooks de JavaScript -->
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <div v-if="show">Contenido</div>
  </Transition>
</template>

<style>
/* Clases de transición */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Transiciones de lista */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>`,
        language: 'vue',
      },
    },

    // ============ RENDIMIENTO ============
    {
      id: 'performance',
      title: 'Optimización de Rendimiento',
      type: 'code',
      subsections: [
        {
          id: 'perf-v-memo',
          title: 'Directiva v-memo',
          type: 'code',
          code: {
            title: 'Memoizar Renderizados Costosos',
            code: `<template>
  <!-- Solo re-renderiza si las dependencias cambian -->
  <div v-memo="[item.id, item.selected]">
    <ExpensiveComponent :item="item" />
  </div>

  <!-- Útil en v-for -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>{{ item.name }}</p>
  </div>
</template>`,
            language: 'vue',
          },
        },
        {
          id: 'perf-tips',
          title: 'Mejores Prácticas de Rendimiento',
          type: 'list',
          items: [
            'Usar v-show para elementos que se alternan frecuentemente (se mantiene en el DOM)',
            'Usar v-if para componentes renderizados condicionalmente (se elimina del DOM)',
            'Usar v-once para contenido estático que nunca cambia',
            'Usar shallowRef() para estructuras de datos inmutables grandes',
            'Usar shallowReactive() cuando solo cambian propiedades de nivel superior',
            'Cargar rutas y componentes pesados de forma diferida con defineAsyncComponent()',
            'Usar scroll virtual para listas grandes (vue-virtual-scroller)',
            'Evitar definiciones de funciones en línea en plantillas',
            'Usar v-memo para prevenir re-renderizados innecesarios',
            'Mantener las propiedades computadas puras y ligeras',
          ],
        },
      ],
    },

    // ============ TYPESCRIPT ============
    {
      id: 'typescript',
      title: 'Integración con TypeScript',
      type: 'code',
      code: {
        title: 'Vue 3 con TypeScript',
        code: `<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

// Anotaciones de tipo
const count: Ref<number> = ref(0)
const message: Ref<string> = ref('Hola')

// Tipos inferidos
const auto = ref(42) // Ref<number>

// Objeto reactivo con interfaz
interface User {
  id: number
  name: string
  email: string
}

const user: Ref<User> = ref({
  id: 1,
  name: 'Juan',
  email: 'juan@ejemplo.com'
})

// Computada con tipo
const doubled: ComputedRef<number> = computed(() => count.value * 2)

// Props con interfaz
interface Props {
  title: string
  items: string[]
  user?: User
}

const props = defineProps<Props>()

// Emits con tipos
const emit = defineEmits<{
  update: [id: number]
  delete: [id: number, confirmed: boolean]
}>()

// Ref de plantilla con tipo
const input = ref<HTMLInputElement>()
const modal = ref<InstanceType<typeof Modal>>()
</script>`,
        language: 'typescript',
      },
    },
  ],
}
