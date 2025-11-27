<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'

const props = defineProps<{
  cheatcodes?: Cheatcode[]
}>()

const emit = defineEmits<{
  openSearch: []
}>()

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const isMenuOpen = ref(false)

// Navigation items for landing page
const landingNavigation = [
  { name: 'Caracteristicas', href: '#caracteristicas' },
  { name: 'Contenido', href: '#contenido' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Pricing', href: '#pricing' }
]

const route = useRoute()
const isLandingPage = computed(() => route.path === '/')
const isAppPage = computed(() => route.path.startsWith('/app'))
const isDashboard = computed(() => route.path === '/app')
const isCheatcodePage = computed(() => route.path.startsWith('/app/cheatcodes/'))

const navigation = computed(() => isLandingPage.value ? landingNavigation : [])

// Logout
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

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

  const sections = ['caracteristicas', 'contenido', 'faqs', 'pricing']

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
        <!-- Logo - redirects to /app when in app, otherwise to landing -->
        <NuxtLink
          :to="isAppPage ? '/app' : '/'"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          :aria-label="isAppPage ? 'Dashboard - Cheatcodes' : 'Inicio - Cheatcodes by Neskeep'"
        >
          <Logo size="lg" :showIcon="true" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
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

          <!-- App navigation: Search button (only on cheatcode pages) + Theme toggle + User menu -->
          <template v-if="isAppPage">
            <!-- Search button - only show when viewing a specific cheatcode -->
            <button
              v-if="isCheatcodePage"
              @click="emit('openSearch')"
              class="flex items-center gap-2 px-3 py-2 bg-surface/50 border border-border rounded-lg hover:border-brand/50 transition-colors text-gray-400 hover:text-gray-300"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="text-sm">Buscar...</span>
              <kbd class="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-surface rounded border border-border font-mono">
                <span class="text-[10px]">⌘</span>K
              </kbd>
            </button>

            <!-- Theme toggle (disabled temporarily) -->
            <!-- <UiThemeToggle /> -->

            <!-- User menu -->
            <div class="relative group">
              <button class="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 border border-border hover:border-brand/50 transition-colors">
                <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-bg font-semibold text-sm">
                  {{ user?.email?.charAt(0).toUpperCase() }}
                </div>
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown -->
              <div class="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="px-4 py-3 border-b border-border">
                  <p class="text-sm text-gray-500">Conectado como</p>
                  <p class="text-sm font-medium text-white truncate">{{ user?.email }}</p>
                </div>
                <div class="p-2">
                  <button
                    @click="logout"
                    class="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-bg hover:text-white rounded-lg transition-colors"
                  >
                    Cerrar sesion
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- Auth buttons (landing page) -->
          <template v-else-if="!isAppPage">
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
                class="btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
              >
                Iniciar sesion
              </NuxtLink>
            </template>
          </template>
        </div>

        <!-- Mobile: Search button (always visible) + Menu Button -->
        <div class="flex items-center gap-2 md:hidden">
          <!-- Search button - always visible on mobile for cheatcode pages -->
          <button
            v-if="isCheatcodePage"
            @click="emit('openSearch')"
            class="p-2.5 bg-surface/50 border border-border rounded-lg hover:border-brand/50 transition-colors text-gray-400 hover:text-brand"
            aria-label="Buscar"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Menu Button -->
          <button
            class="p-2 text-gray-300 hover:text-brand transition-colors"
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
        </div>
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

          <!-- App mobile menu -->
          <template v-if="isAppPage">
            <!-- User info -->
            <div class="px-4 py-2 border-t border-border mt-2">
              <p class="text-sm text-gray-500">Conectado como</p>
              <p class="text-sm font-medium text-white truncate">{{ user?.email }}</p>
            </div>

            <!-- Logout button -->
            <button
              @click="logout(); closeMenu()"
              class="w-full px-4 py-2 text-left text-gray-400 hover:text-white hover:bg-surface/50 rounded-lg transition-colors"
            >
              Cerrar sesion
            </button>
          </template>

          <!-- Landing page auth buttons -->
          <div v-if="!isAppPage" class="px-4 pt-2 space-y-3">
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
                class="block w-full text-center btn-glow text-bg font-semibold px-5 py-2.5 rounded-lg"
                @click="closeMenu"
              >
                Iniciar sesion
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
