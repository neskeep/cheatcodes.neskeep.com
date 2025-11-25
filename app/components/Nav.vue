<script setup lang="ts">
const user = useSupabaseUser()
const isMenuOpen = ref(false)

// Navigation items for landing page
const landingNavigation = [
  { name: 'Caracteristicas', href: '#caracteristicas' },
  { name: 'Contenido', href: '#contenido' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'FAQs', href: '#faqs' }
]

// Navigation items for app
const appNavigation = [
  { name: 'Cheatcodes', href: '/app' },
]

const route = useRoute()
const isLandingPage = computed(() => route.path === '/')

const navigation = computed(() => isLandingPage.value ? landingNavigation : appNavigation)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Active section tracking for landing page
const activeSection = ref('')

const setupActiveSection = () => {
  if (!isLandingPage.value) return

  const sections = ['caracteristicas', 'contenido', 'testimonios', 'faqs']

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )

  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }
  })
}

onMounted(() => {
  setupActiveSection()
})

// Helper to check if anchor link is active
const isActive = (href: string) => {
  if (!href.startsWith('#')) return false
  const sectionId = href.replace('#', '')
  return activeSection.value === sectionId
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-border/50">
    <UiContainer>
      <nav class="flex items-center justify-between py-4" aria-label="Navegacion principal">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Inicio - Cheatcodes by Neskeep"
        >
          <Logo size="lg" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <!-- Landing page anchors -->
          <template v-if="isLandingPage">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="relative text-gray-300 hover:text-brand transition-colors font-medium py-1"
              :class="{ 'text-brand': isActive(item.href) }"
            >
              {{ item.name }}
              <!-- Active indicator -->
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300"
                :class="isActive(item.href) ? 'w-full' : 'w-0'"
              />
            </a>
          </template>

          <!-- App navigation links -->
          <template v-else>
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="relative text-gray-300 hover:text-brand transition-colors font-medium py-1"
              active-class="text-brand"
            >
              {{ item.name }}
            </NuxtLink>
          </template>

          <!-- Auth buttons -->
          <template v-if="user">
            <NuxtLink
              to="/app"
              class="btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
            >
              Dashboard
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-gray-300 hover:text-brand transition-colors font-medium"
            >
              Iniciar sesion
            </NuxtLink>
            <NuxtLink
              to="/login"
              class="btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
            >
              Obtener acceso
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-gray-300 hover:text-brand transition-colors"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden pb-4 space-y-3"
        >
          <!-- Landing page anchors -->
          <template v-if="isLandingPage">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="block px-4 py-2 text-gray-300 hover:text-brand hover:bg-surface/50 rounded-lg transition-all relative"
              :class="{
                'text-brand bg-brand/10 border-l-2 border-brand': isActive(item.href)
              }"
              @click="closeMenu"
            >
              {{ item.name }}
            </a>
          </template>

          <!-- App navigation links -->
          <template v-else>
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-4 py-2 text-gray-300 hover:text-brand hover:bg-surface/50 rounded-lg transition-all"
              active-class="text-brand bg-brand/10 border-l-2 border-brand"
              @click="closeMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </template>

          <div class="px-4 pt-2 space-y-3">
            <template v-if="user">
              <NuxtLink
                to="/app"
                class="block w-full text-center btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
                @click="closeMenu"
              >
                Dashboard
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="block w-full text-center text-gray-300 hover:text-brand transition-colors font-medium py-2"
                @click="closeMenu"
              >
                Iniciar sesion
              </NuxtLink>
              <NuxtLink
                to="/login"
                class="block w-full text-center btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
                @click="closeMenu"
              >
                Obtener acceso
              </NuxtLink>
            </template>
          </div>
        </div>
      </Transition>
    </UiContainer>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-20" aria-hidden="true"></div>
</template>
