<script setup lang="ts">
// Public landing page - no auth required
definePageMeta({
  layout: false
})

// Set page meta
useHead({
  title: 'Cheatcodes by Neskeep - Premium Programming Reference Guides',
  meta: [
    { name: 'description', content: 'Get lifetime access to comprehensive programming cheatsheets. One payment, forever access to JavaScript, Vue, CSS, HTML, React, and more.' },
  ],
})

// Enable card glow effect that follows cursor
useCardGlow()

// Hero rotating words
const rotatingWords = ['codigo.', 'productividad.', 'eficiencia.', 'resultados.']
const currentWordIndex = ref(0)
const currentWord = ref('')
const isDeleting = ref(false)

// Included cheatcodes
const includedCheatcodes = [
  {
    id: 'javascript',
    name: 'JavaScript ES2024',
    logo: 'javascript',
    available: true,
    color: '#F7DF1E',
    section: 'Array Methods',
    url: 'javascript'
  },
  {
    id: 'vue',
    name: 'Vue 3',
    logo: 'vue',
    available: true,
    color: '#42B883',
    section: 'Composition API',
    url: 'vue'
  },
  { id: 'react', name: 'React 18', logo: 'react', available: 'coming', color: '#61DAFB' },
  { id: 'typescript', name: 'TypeScript', logo: 'typescript', available: 'coming', color: '#3178C6' },
  { id: 'tailwind', name: 'CSS & Tailwind', logo: 'tailwind', available: 'coming', color: '#38BDF8' },
  { id: 'html', name: 'HTML5', logo: 'html', available: 'coming', color: '#E34F26' },
  { id: 'node', name: 'Node.js', logo: 'node', available: 'coming', color: '#339933' },
  { id: 'git', name: 'Git & GitHub', logo: 'git', available: 'coming', color: '#F05032' },
]

// Selected cheatcode for preview
const selectedCheatcode = ref(includedCheatcodes[0])

// Code examples for each cheatcode
interface CodeExample {
  name: string
  comment: string
  code: string
  result: string
}

const codeExamples: Record<string, { methods: CodeExample[] }> = {
  javascript: {
    methods: [
      {
        name: '.map()',
        comment: '// .map() - Transforma cada elemento',
        code: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);`,
        result: '// [2, 4, 6]'
      },
      {
        name: '.filter()',
        comment: '// .filter() - Filtra elementos',
        code: `const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);`,
        result: '// [2, 4]'
      },
      {
        name: '.reduce()',
        comment: '// .reduce() - Reduce a un valor',
        code: `const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);`,
        result: '// 10'
      },
      {
        name: '.find()',
        comment: '// .find() - Encuentra el primero',
        code: `const users = [{id: 1}, {id: 2}];
const user = users.find(u => u.id === 2);`,
        result: '// {id: 2}'
      },
      {
        name: '.some()',
        comment: '// .some() - Verifica si alguno cumple',
        code: `const nums = [1, 2, 3, 4, 5];
const hasEven = nums.some(n => n % 2 === 0);`,
        result: '// true'
      },
    ]
  },
  vue: {
    methods: [
      {
        name: 'ref()',
        comment: '// ref() - Estado reactivo',
        code: `const count = ref(0);
count.value++;`,
        result: '// count.value = 1'
      },
      {
        name: 'computed()',
        comment: '// computed() - Valor derivado',
        code: `const count = ref(2);
const doubled = computed(() => count.value * 2);`,
        result: '// doubled.value = 4'
      },
      {
        name: 'watch()',
        comment: '// watch() - Observar cambios',
        code: `watch(count, (newVal, oldVal) => {
  console.log('Changed:', oldVal, '->', newVal);
});`,
        result: '// Logs on change'
      },
      {
        name: 'onMounted()',
        comment: '// onMounted() - Lifecycle hook',
        code: `onMounted(() => {
  console.log('Component mounted!');
});`,
        result: '// Runs after mount'
      },
      {
        name: 'defineProps()',
        comment: '// defineProps() - Props tipados',
        code: `const props = defineProps<{
  title: string;
  count?: number;
}>();`,
        result: '// props.title, props.count'
      },
    ]
  }
}

// Current selected method
const selectedMethodIndex = ref(0)

// Get current examples based on selected cheatcode
const currentExamples = computed(() => {
  const id = selectedCheatcode.value.id
  return codeExamples[id]?.methods || codeExamples.javascript.methods
})

const currentExample = computed(() => currentExamples.value[selectedMethodIndex.value])

// Select a cheatcode
const selectCheatcode = (cheatcode: typeof includedCheatcodes[0]) => {
  if (cheatcode.available === true) {
    selectedCheatcode.value = cheatcode
    selectedMethodIndex.value = 0
  }
}

// Select a method
const selectMethod = (index: number) => {
  selectedMethodIndex.value = index
}

// FAQ
const faqs = [
  {
    question: '¿Es esto una suscripcion?',
    answer: '¡No! Es un pago unico por acceso de por vida. Puedes comprar un cheatcode individual por $5 o acceder a todo el catalogo por $100. Sin pagos recurrentes.'
  },
  {
    question: '¿Cual es la diferencia entre los planes?',
    answer: 'Con el plan Individual ($5) obtienes 1 cheatcode de tu eleccion. Con el plan Completo ($100) obtienes todos los cheatcodes actuales (8+) y todos los que agreguemos en el futuro.'
  },
  {
    question: '¿Que formatos estan disponibles?',
    answer: 'Todos los cheatcodes estan disponibles como paginas web hermosamente diseñadas con syntax highlighting, modo oscuro y busqueda instantanea. Accede desde cualquier dispositivo.'
  },
  {
    question: '¿Recibo las actualizaciones?',
    answer: '¡Si! Actualizamos los cheatcodes mensualmente. Todas las actualizaciones estan incluidas en tu compra sin costo adicional, tanto para el plan Individual como el Completo.'
  },
  {
    question: '¿Puedo comprar mas cheatcodes despues?',
    answer: 'Claro. Si empiezas con el plan Individual, puedes comprar cheatcodes adicionales cuando quieras. Si decides pasar al plan Completo, contactanos y te damos un descuento por lo que ya pagaste.'
  },
]

const openFaq = ref<number | null>(null)

// Typing effect for hero with word rotation
let typingTimeout: ReturnType<typeof setTimeout> | null = null

const typeWord = () => {
  const fullWord = rotatingWords[currentWordIndex.value]
  let speed = 150

  if (isDeleting.value) {
    currentWord.value = fullWord.substring(0, currentWord.value.length - 1)
    speed = 75
  } else {
    currentWord.value = fullWord.substring(0, currentWord.value.length + 1)
    speed = 150
  }

  if (!isDeleting.value && currentWord.value === fullWord) {
    // Pause at end of word
    speed = 2000
    isDeleting.value = true
  } else if (isDeleting.value && currentWord.value === '') {
    isDeleting.value = false
    currentWordIndex.value = (currentWordIndex.value + 1) % rotatingWords.length
    speed = 500
  }

  typingTimeout = setTimeout(typeWord, speed)
}

onMounted(() => {
  typeWord()
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<template>
  <div class="min-h-screen bg-bg text-white">
    <!-- Particles Background -->
    <ParticlesBackground />

    <!-- Navigation -->
    <Nav />

    <!-- Hero Section -->
    <section class="relative pt-12 pb-20 sm:pt-20 sm:pb-32">
      <UiContainer>
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Menos busquedas,<br />
            <span class="text-brand">mas {{ currentWord }}<span class="animate-pulse">|</span></span>
          </h1>

          <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Cheatsheets de programacion profesionales con busqueda instantanea, syntax highlighting y acceso de por vida. Paga una vez, consulta para siempre.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#pricing"
              class="btn-glow text-bg font-semibold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2"
            >
              Ver planes desde $5
            </a>
            <a
              href="#contenido"
              class="btn-outline font-semibold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2"
            >
              Ver contenido
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-brand">8+</div>
              <div class="text-sm text-gray-500">Cheatcodes</div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-accent">100+</div>
              <div class="text-sm text-gray-500">Secciones</div>
            </div>
            <div class="text-center">
              <div class="text-3xl sm:text-4xl font-bold text-white">∞</div>
              <div class="text-sm text-gray-500">Updates</div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Features Section - Bento Grid -->
    <section id="caracteristicas" class="relative py-20 sm:py-32">
      <UiContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Servicios que <span class="text-brand">escalan</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Cada caracteristica diseñada para ayudarte a programar mas rapido y mejor.
          </p>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          <!-- Card 1: Acceso instantaneo - Large -->
          <div
            class="bento-glow group bg-linear-to-br from-brand/20 to-brand/5 border border-brand/20 p-6 md:col-span-2 md:row-span-2 flex flex-col justify-between hover:border-brand/40"
            style="--glow-color: #00C9D4"
          >
            <div>
              <div class="w-14 h-14 rounded-xl bg-brand/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span class="text-3xl">⚡</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3">Acceso instantaneo</h3>
              <p class="text-gray-400 text-base leading-relaxed">
                Accede a todos los cheatcodes en el momento que compras. Sin esperas, sin suscripciones. Todo listo para usar desde el primer segundo.
              </p>
            </div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl group-hover:bg-brand/20 transition-all pointer-events-none" />
          </div>

          <!-- Card 2: Updates gratis -->
          <div
            class="bento-glow group bg-linear-to-br from-accent/20 to-accent/5 border border-accent/20 p-6 flex flex-col justify-between hover:border-accent/40"
            style="--glow-color: #A6FF3A"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🔄</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Updates gratis</h3>
              <p class="text-gray-400 text-sm">Todos los cheatcodes futuros incluidos.</p>
            </div>
          </div>

          <!-- Card 3: Diseño profesional -->
          <div
            class="bento-glow group bg-linear-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 p-6 flex flex-col justify-between hover:border-purple-500/40"
            style="--glow-color: #A855F7"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🎨</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Diseño profesional</h3>
              <p class="text-gray-400 text-sm">Syntax highlighting y modo oscuro.</p>
            </div>
          </div>

          <!-- Card 4: Busqueda instantanea - Wide -->
          <div
            class="bento-glow group bg-linear-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 p-6 lg:col-span-2 flex flex-col justify-between hover:border-blue-500/40"
            style="--glow-color: #3B82F6"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🔍</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Busqueda instantanea</h3>
              <p class="text-gray-400 text-sm">Encuentra cualquier snippet en segundos con nuestra busqueda global potente.</p>
            </div>
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
          </div>

          <!-- Card 5: Acceso de por vida -->
          <div
            class="bento-glow group bg-linear-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 p-6 flex flex-col justify-between hover:border-emerald-500/40"
            style="--glow-color: #10B981"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span class="text-2xl">🔒</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Acceso de por vida</h3>
              <p class="text-gray-400 text-sm">Paga una vez, accede para siempre.</p>
            </div>
          </div>

          <!-- Card 6: Instala como App (PWA) - Wide -->
          <div
            class="bento-glow group bg-linear-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/20 p-6 lg:col-span-2 flex flex-col justify-between hover:border-orange-500/40"
            style="--glow-color: #F97316"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <span class="text-2xl">📱</span>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-bold text-white">Instala como App</h3>
                  <span class="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">PWA</span>
                </div>
                <p class="text-gray-400 text-sm">Añade Cheatcodes a la pantalla de inicio de tu telefono y accede como una app nativa. Funciona offline para que consultes sin conexion.</p>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Content/Preview Section -->
    <section id="contenido" class="relative py-20 sm:py-32 bg-surface/30">
      <UiContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Tu stack de <span class="text-brand">cheatcodes</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Referencias completas para las tecnologias mas usadas en desarrollo web moderno.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 items-start">
          <!-- Left: Cheatcodes Stack -->
          <div class="space-y-4">
            <!-- Available Now -->
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span class="text-sm font-medium text-accent uppercase tracking-wide">Disponibles ahora</span>
              </div>
              <div class="space-y-3">
                <button
                  v-for="cheatcode in includedCheatcodes.filter(c => c.available === true)"
                  :key="cheatcode.id"
                  @click="selectCheatcode(cheatcode)"
                  class="group relative w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all cursor-pointer"
                  :class="selectedCheatcode.id === cheatcode.id
                    ? 'bg-brand/10 border-2 border-brand'
                    : 'bg-linear-to-br from-surface to-surface/50 border border-accent/30 hover:border-accent/60'"
                >
                  <div
                    class="w-12 h-12 rounded-lg flex items-center justify-center transition-transform"
                    :class="selectedCheatcode.id === cheatcode.id ? 'scale-110' : 'group-hover:scale-110'"
                    :style="{ backgroundColor: cheatcode.color + '20' }"
                  >
                    <LogosCheatcodeLogo :id="cheatcode.logo" size="28" />
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-white">{{ cheatcode.name }}</p>
                    <p class="text-sm text-gray-400">{{ cheatcode.section }}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">Incluido</span>
                    <svg class="w-5 h-5 text-gray-500 group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- Coming Soon -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-2 h-2 rounded-full bg-gray-500" />
                <span class="text-sm font-medium text-gray-500 uppercase tracking-wide">Proximamente</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div
                  v-for="cheatcode in includedCheatcodes.filter(c => c.available !== true)"
                  :key="cheatcode.id"
                  class="bg-surface/30 border border-border/50 rounded-xl p-3 flex items-center gap-3 opacity-60 hover:opacity-80 transition-opacity"
                >
                  <div class="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                    <LogosCheatcodeLogo :id="cheatcode.logo" size="20" />
                  </div>
                  <p class="text-sm text-gray-400 font-medium truncate">{{ cheatcode.name.split(' ')[0] }}</p>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-3 text-center">
                + mas tecnologias en camino. Tu compra incluye todos los futuros cheatcodes.
              </p>
            </div>
          </div>

          <!-- Right: Code Preview -->
          <div class="relative">
            <!-- Floating badge -->
            <div class="absolute -top-3 -right-3 z-10 bg-brand text-bg text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              Interactivo
            </div>

            <!-- Browser mockup -->
            <div class="rounded-2xl overflow-hidden border border-border shadow-2xl bg-bg">
              <!-- Browser header -->
              <div class="bg-surface px-4 py-3 border-b border-border flex items-center gap-3">
                <div class="flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div class="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div class="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div class="flex-1">
                  <div class="bg-bg/50 rounded-lg px-3 py-1.5 text-xs text-gray-500 text-center max-w-xs mx-auto">
                    cheatcodes.neskeep.com/{{ selectedCheatcode.url || selectedCheatcode.id }}
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5">
                <!-- Section header -->
                <div class="flex items-center gap-3 mb-4">
                  <LogosCheatcodeLogo :id="selectedCheatcode.logo" size="24" />
                  <div>
                    <h4 class="text-sm font-semibold text-white">{{ selectedCheatcode.section }}</h4>
                    <p class="text-xs text-gray-500">{{ selectedCheatcode.name }}</p>
                  </div>
                </div>

                <!-- Code block with transition -->
                <div class="bg-surface/50 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-border mb-4 min-h-[140px]">
                  <div class="text-gray-500 mb-3">{{ currentExample.comment }}</div>
                  <pre class="text-gray-300 whitespace-pre-wrap">{{ currentExample.code }}</pre>
                  <div class="mt-2 text-accent">{{ currentExample.result }}</div>
                </div>

                <!-- Interactive method pills -->
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="(method, index) in currentExamples"
                    :key="method.name"
                    @click="selectMethod(index)"
                    class="text-xs px-3 py-1.5 rounded-md transition-all cursor-pointer hover:scale-105"
                    :class="selectedMethodIndex === index
                      ? 'bg-brand/20 text-brand font-medium ring-1 ring-brand/50'
                      : 'bg-surface text-gray-400 hover:text-white hover:bg-surface/80'"
                  >
                    {{ method.name }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Decorative glow -->
            <div
              class="absolute -bottom-4 -left-4 w-32 h-32 rounded-full blur-3xl -z-10 transition-colors duration-500"
              :style="{ backgroundColor: selectedCheatcode.color + '33' }"
            />
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10" />
          </div>
        </div>

        <!-- Pricing Preview -->
        <div class="mt-16 relative">
          <div class="card-glow p-6 sm:p-8 relative overflow-hidden">
            <!-- Animated border glow -->
            <div class="absolute inset-0 bg-linear-to-r from-brand via-accent to-brand opacity-20 blur-xl" />

            <div class="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <!-- Left: Offer info -->
              <div class="flex-1 text-center lg:text-left">
                <div class="inline-flex items-center gap-2 bg-accent/20 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                  <span class="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  Pago unico · Acceso de por vida
                </div>
                <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Desde <span class="text-brand">$5</span> por cheatcode
                </h3>
                <p class="text-gray-400">
                  Compra individual o accede a todo el catalogo con actualizaciones mensuales incluidas.
                </p>
              </div>

              <!-- Right: CTA -->
              <div class="flex flex-col items-center lg:items-end gap-3">
                <a
                  href="#pricing"
                  class="btn-glow text-bg font-semibold px-8 py-4 rounded-lg text-lg whitespace-nowrap"
                >
                  Ver planes
                </a>
                <div class="flex items-center gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Pago unico
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Updates mensuales
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- FAQ -->
    <section id="faqs" class="relative py-20 sm:py-32">
      <UiContainer max-width="5xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Preguntas <span class="text-brand">frecuentes</span>
          </h2>
          <p class="text-lg text-gray-400">
            Todo lo que necesitas saber antes de empezar
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="card-glow overflow-hidden"
          >
            <button
              @click="openFaq = openFaq === index ? null : index"
              class="w-full p-6 text-left flex items-center justify-between hover:bg-surface/50 transition-colors"
            >
              <span class="font-medium text-white">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4"
                :class="{ 'rotate-180': openFaq === index }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="openFaq === index"
              class="px-6 pb-6 text-gray-400 text-sm"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="relative py-20 sm:py-32 bg-surface/30">
      <UiContainer max-width="5xl">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Elige tu <span class="text-brand">plan</span>
          </h2>
          <p class="text-lg text-gray-400">
            Pago unico. Acceso de por vida. Actualizaciones mensuales incluidas.
          </p>
        </div>

        <!-- Pricing Cards Grid -->
        <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <!-- Plan Individual -->
          <div class="card-glow p-8 relative overflow-hidden">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-white mb-2">Individual</h3>
              <p class="text-gray-400 text-sm">Perfecto para empezar con un lenguaje especifico</p>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <div class="flex items-baseline gap-1">
                <span class="text-4xl font-bold text-white">$5</span>
                <span class="text-gray-400">/ cheatcode</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">Pago unico · Acceso de por vida</p>
            </div>

            <!-- Features list -->
            <div class="space-y-3 mb-8">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">1 cheatcode a tu eleccion</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Actualizaciones mensuales incluidas</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Busqueda instantanea</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Acceso web y PWA</span>
              </div>
            </div>

            <!-- CTA -->
            <NuxtLink
              to="/login"
              class="block w-full text-center btn-outline font-semibold px-6 py-3 rounded-lg"
            >
              Elegir cheatcode
            </NuxtLink>
          </div>

          <!-- Plan Completo -->
          <div class="card-glow p-8 relative overflow-hidden ring-2 ring-accent">
            <!-- Popular badge -->
            <div class="absolute -top-px left-1/2 -translate-x-1/2">
              <span class="bg-accent text-bg text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-lg">
                Mejor valor
              </span>
            </div>

            <!-- Glow effects -->
            <div class="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-brand/20 rounded-full blur-2xl -z-10" />

            <div class="mb-6 pt-4">
              <h3 class="text-xl font-bold text-white mb-2">Acceso Completo</h3>
              <p class="text-gray-400 text-sm">Todo el catalogo actual y futuro para siempre</p>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl text-gray-500 line-through">$200</span>
                <span class="text-4xl font-bold text-white">$100</span>
              </div>
              <p class="text-sm text-gray-500 mt-1">Pago unico · Acceso de por vida</p>
              <div class="inline-flex items-center gap-1 mt-2 bg-accent/20 text-accent text-xs font-medium px-2 py-1 rounded-full">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Ahorra 50%
              </div>
            </div>

            <!-- Features list -->
            <div class="space-y-3 mb-8">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm"><strong class="text-white">Todos</strong> los cheatcodes actuales (8+)</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm"><strong class="text-white">Todos</strong> los cheatcodes futuros</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Actualizaciones mensuales de por vida</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Busqueda instantanea y syntax highlighting</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <svg class="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-300 text-sm">Instala como app (PWA) y usa offline</span>
              </div>
            </div>

            <!-- CTA -->
            <NuxtLink
              to="/login"
              class="block w-full text-center btn-glow text-bg font-semibold px-6 py-3 rounded-lg"
            >
              Obtener acceso completo
            </NuxtLink>
          </div>
        </div>

        <!-- Trust badges -->
        <div class="flex items-center justify-center gap-6 mt-10 text-xs text-gray-500">
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pago seguro
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Stripe
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Garantizado
          </span>
        </div>

        <!-- Contact -->
        <p class="mt-10 text-center text-sm text-gray-500">
          ¿Tienes dudas?
          <a href="https://wa.me/18092225466" target="_blank" rel="noopener" class="text-brand hover:underline inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escribenos por WhatsApp
          </a>
        </p>
      </UiContainer>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>
