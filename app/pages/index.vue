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

// Features list
const features = [
  {
    icon: '⚡',
    title: 'Acceso instantaneo',
    description: 'Accede a todos los cheatcodes en el momento que compras. Sin esperas, sin suscripciones.'
  },
  {
    icon: '🔄',
    title: 'Updates gratis',
    description: 'Todos los cheatcodes futuros y actualizaciones incluidos. Tu compra aumenta de valor.'
  },
  {
    icon: '🎨',
    title: 'Diseño profesional',
    description: 'Syntax highlighting, modo oscuro y layouts responsivos diseñados profesionalmente.'
  },
  {
    icon: '🔍',
    title: 'Busqueda instantanea',
    description: 'Encuentra cualquier snippet en segundos con nuestra busqueda global potente.'
  },
  {
    icon: '📱',
    title: 'Funciona en todo',
    description: 'Accede desde cualquier dispositivo - desktop, tablet o movil. Tus cheatcodes van contigo.'
  },
  {
    icon: '🔒',
    title: 'Acceso de por vida',
    description: 'Paga una vez, accede para siempre. Sin fees recurrentes, sin fechas de expiracion.'
  }
]

// Included cheatcodes - using logo component names
const includedCheatcodes = [
  { name: 'JavaScript ES2024', logo: 'LogosJavaScriptLogo', available: true },
  { name: 'Vue 3', logo: 'LogosVueLogo', available: true },
  { name: 'React 18', logo: 'LogosReactLogo', available: 'coming' },
  { name: 'TypeScript', logo: 'LogosTypeScriptLogo', available: 'coming' },
  { name: 'CSS & Tailwind', logo: 'LogosTailwindLogo', available: 'coming' },
  { name: 'HTML5', logo: 'LogosHtmlLogo', available: 'coming' },
  { name: 'Node.js', logo: 'LogosNodeLogo', available: 'coming' },
  { name: 'Git & GitHub', logo: 'LogosGitLogo', available: 'coming' },
]

// FAQ
const faqs = [
  {
    question: '¿Es esto una suscripcion?',
    answer: '¡No! Es un pago unico por acceso de por vida. Pagas una vez y tienes acceso a todos los cheatcodes actuales y futuros para siempre.'
  },
  {
    question: '¿Que formatos estan disponibles?',
    answer: 'Todos los cheatcodes estan disponibles como paginas web hermosamente diseñadas con syntax highlighting, modo oscuro y busqueda instantanea. Accede desde cualquier dispositivo.'
  },
  {
    question: '¿Recibo las actualizaciones futuras?',
    answer: '¡Si! Todos los cheatcodes futuros y actualizaciones a los existentes estan incluidos en tu compra sin costo adicional.'
  },
]

// Testimonials
const testimonials = [
  {
    name: 'Maria Gonzalez',
    role: 'Senior Developer · TechFlow',
    content: 'Estos cheatcodes me han ahorrado incontables horas. La funcion de busqueda sola vale el precio.',
    avatar: 'M'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Freelance Developer',
    content: 'Por fin, una referencia en la que realmente puedo confiar. Limpia, completa y siempre actualizada.',
    avatar: 'C'
  },
  {
    name: 'Ana Torres',
    role: 'Tech Lead · Shopify',
    content: 'Compre esto para todo mi equipo. La mejor inversion en productividad de desarrolladores que hemos hecho.',
    avatar: 'A'
  }
]

const openFaq = ref<number | null>(null)

// Typing effect for hero
const typedText = ref('')
const fullText = 'codigo.'
const typingComplete = ref(false)

onMounted(() => {
  // Typing effect
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i)
      i++
    } else {
      typingComplete.value = true
      clearInterval(typeInterval)
    }
  }, 150)
})
</script>

<template>
  <div class="min-h-screen bg-bg text-white">
    <!-- Particles Background -->
    <ParticlesBackground />

    <!-- Navigation -->
    <Nav />

    <!-- Hero Section using Hero component -->
    <Hero
      title="Menos busquedas,<br /><span class='text-brand'>mas codigo.</span>"
      subtitle="Cheatsheets de programacion profesionales con busqueda instantanea, syntax highlighting y acceso de por vida. Paga una vez, consulta para siempre."
      size="large"
      align="left"
    >
      <template #actions>
        <NuxtLink
          to="/login"
          class="btn-glow text-bg font-semibold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2"
        >
          Obtener acceso — $29
        </NuxtLink>
        <a
          href="#contenido"
          class="btn-outline font-semibold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2"
        >
          Ver contenido
        </a>
      </template>
    </Hero>

    <!-- Stats -->
    <section class="relative pb-20 sm:pb-32">
      <UiContainer>
        <div class="grid grid-cols-3 gap-8 max-w-lg">
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-brand">8+</div>
            <div class="text-sm text-gray-500">Cheatcodes</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-accent">100+</div>
            <div class="text-sm text-gray-500">Secciones</div>
          </div>
          <div>
            <div class="text-3xl sm:text-4xl font-bold text-white">∞</div>
            <div class="text-sm text-gray-500">Updates</div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Features Section -->
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

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group card-glow p-6"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {{ feature.icon }}
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-400 text-sm">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Content/Preview Section -->
    <section id="contenido" class="relative py-20 sm:py-32 bg-surface/30">
      <UiContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Casos <span class="text-brand">destacados</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Cheatsheets completos cubriendo los conceptos mas importantes para desarrollo web moderno.
          </p>
        </div>

        <!-- Included cheatcodes grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div
            v-for="cheatcode in includedCheatcodes"
            :key="cheatcode.name"
            class="bg-surface/50 border border-border rounded-xl p-4 flex items-center gap-3 hover:border-brand/30 transition-all"
          >
            <component :is="cheatcode.logo" size="32" />
            <div>
              <p class="font-medium text-white text-sm">{{ cheatcode.name }}</p>
              <p
                class="text-xs"
                :class="cheatcode.available === true ? 'text-accent' : 'text-gray-500'"
              >
                {{ cheatcode.available === true ? 'Disponible' : 'Proximamente' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Code preview mockup -->
        <div class="relative rounded-2xl overflow-hidden border border-border shadow-2xl max-w-4xl mx-auto">
          <div class="bg-surface px-4 py-3 border-b border-border flex items-center gap-3">
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div class="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div class="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div class="flex-1 text-center">
              <span class="text-xs text-gray-500">cheatcodes.neskeep.com</span>
            </div>
          </div>
          <div class="bg-bg p-6 sm:p-10">
            <!-- Mock code block -->
            <div class="bg-surface/50 rounded-xl p-6 font-mono text-sm overflow-x-auto border border-border">
              <div class="text-gray-500 mb-4">// Array Methods Cheatsheet</div>
              <div>
                <span class="text-[#ff7b72]">const</span>
                <span class="text-[#79c0ff]"> numbers</span>
                <span class="text-gray-300"> = [</span>
                <span class="text-[#a5d6ff]">1</span>
                <span class="text-gray-300">, </span>
                <span class="text-[#a5d6ff]">2</span>
                <span class="text-gray-300">, </span>
                <span class="text-[#a5d6ff]">3</span>
                <span class="text-gray-300">, </span>
                <span class="text-[#a5d6ff]">4</span>
                <span class="text-gray-300">, </span>
                <span class="text-[#a5d6ff]">5</span>
                <span class="text-gray-300">];</span>
              </div>
              <div class="mt-2">
                <span class="text-[#ff7b72]">const</span>
                <span class="text-[#79c0ff]"> doubled</span>
                <span class="text-gray-300"> = </span>
                <span class="text-[#79c0ff]">numbers</span>
                <span class="text-gray-300">.</span>
                <span class="text-[#d2a8ff]">map</span>
                <span class="text-gray-300">(</span>
                <span class="text-[#79c0ff]">n</span>
                <span class="text-[#ff7b72]"> =></span>
                <span class="text-[#79c0ff]"> n</span>
                <span class="text-gray-300"> * </span>
                <span class="text-[#a5d6ff]">2</span>
                <span class="text-gray-300">);</span>
              </div>
              <div class="mt-4 text-gray-600">// Result: [2, 4, 6, 8, 10]</div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Testimonials -->
    <section id="testimonios" class="relative py-20 sm:py-32">
      <UiContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Que dicen nuestros <span class="text-brand">clientes</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Desarrolladores que ya mejoraron su flujo de trabajo.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="card-glow p-6"
          >
            <div class="flex items-center gap-1 text-accent mb-4">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-300 mb-6 text-sm leading-relaxed">
              "{{ testimonial.content }}"
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-bg font-bold text-sm">
                {{ testimonial.avatar }}
              </div>
              <div>
                <p class="font-medium text-white text-sm">{{ testimonial.name }}</p>
                <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </UiContainer>
    </section>

    <!-- Pricing -->
    <section class="relative py-20 sm:py-32 bg-surface/30">
      <UiContainer max-width="5xl">
        <div class="card-glow p-8 sm:p-12 text-center relative overflow-hidden">
          <!-- Glow effect -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-brand rounded-full opacity-5 blur-[100px]" />
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-accent rounded-full opacity-5 blur-[80px]" />

          <div class="relative">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <span>Oferta por tiempo limitado</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              Acceso de por vida
            </h2>

            <div class="mb-6">
              <span class="text-5xl sm:text-6xl font-bold">$29</span>
              <span class="text-gray-500 ml-2 line-through">$79</span>
            </div>

            <p class="text-gray-400 mb-8 max-w-md mx-auto">
              Un pago. Acceso para siempre. Todos los cheatcodes actuales y futuros incluidos.
            </p>

            <ul class="text-left max-w-sm mx-auto space-y-3 mb-8">
              <li class="flex items-center gap-3 text-gray-300 text-sm">
                <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Todos los cheatcodes actuales (2+ y creciendo)
              </li>
              <li class="flex items-center gap-3 text-gray-300 text-sm">
                <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Todas las actualizaciones y adiciones futuras
              </li>
              <li class="flex items-center gap-3 text-gray-300 text-sm">
                <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Busqueda instantanea en todo el contenido
              </li>
              <li class="flex items-center gap-3 text-gray-300 text-sm">
                <svg class="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Modo oscuro y diseño responsivo
              </li>
            </ul>

            <NuxtLink
              to="/login"
              class="btn-glow text-bg font-semibold px-8 py-4 rounded-lg text-lg inline-block w-full sm:w-auto"
            >
              Obtener acceso de por vida
            </NuxtLink>

            <p class="mt-4 text-sm text-gray-500">
              Garantia de satisfaccion de 30 dias. Sin preguntas.
            </p>
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

    <!-- Contact/CTA Section -->
    <section class="relative py-20 sm:py-32 bg-surface/30">
      <UiContainer>
        <div class="text-center">
          <h2 class="text-3xl sm:text-4xl font-bold mb-6">
            ¿Listo para <span class="text-brand">transformar</span> tu workflow?
          </h2>
          <p class="text-lg text-gray-400 mb-8">
            Unete a los desarrolladores que ya mejoraron su productividad.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink
              to="/login"
              class="btn-glow text-bg font-semibold px-8 py-4 rounded-lg text-lg"
            >
              Obtener acceso — $29
            </NuxtLink>
          </div>
          <p class="mt-8 text-sm text-gray-500">
            O escribenos directamente a
            <a href="mailto:hello@neskeep.com" class="text-brand hover:underline">hello@neskeep.com</a>
          </p>
        </div>
      </UiContainer>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>
