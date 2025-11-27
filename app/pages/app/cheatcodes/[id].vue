<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'
import type { Ref } from 'vue'
import { onMounted, onUnmounted } from 'vue'

// Protect this route - require authentication
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

// Search modal state - injected from layout
const isSearchOpen = inject<Ref<boolean>>('searchOpen', ref(false))

// Keyboard shortcut for search - store handler ref for cleanup
let keydownHandler: ((e: KeyboardEvent) => void) | null = null

onMounted(() => {
  keydownHandler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isSearchOpen.value = true
    }
  }
  window.addEventListener('keydown', keydownHandler)
})
const cheatcodeId = route.params.id as string

// Fetch cheatcode data
const { data: cheatcode, error } = await useFetch<Cheatcode>(`/api/cheatcodes/${cheatcodeId}`)

// Fetch all cheatcodes for "related" sidebar
const { data: allCheatcodes } = await useFetch<Cheatcode[]>('/api/cheatcodes')

// Filter related cheatcodes (same category or shared tags, excluding current)
const relatedCheatcodes = computed(() => {
  if (!allCheatcodes.value || !cheatcode.value?.metadata) return []

  const current = cheatcode.value
  const currentId = current.metadata.id
  const currentCategory = current.metadata.category
  const currentTags = current.metadata.tags || []

  return allCheatcodes.value
    .filter(c => c?.metadata?.id && c.metadata.id !== currentId)
    .filter(c =>
      c.metadata.category === currentCategory ||
      c.metadata.tags?.some(tag => currentTags.includes(tag))
    )
    .slice(0, 4)
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Cheatcode not found',
  })
}

// Set page meta
useHead({
  title: `${cheatcode.value?.metadata.title} Cheatsheet | Neskeep Cheatcodes`,
  meta: [
    { name: 'description', content: cheatcode.value?.metadata.description || '' },
  ],
})

// Sidebar states
const isTocOpen = ref(false)
const activeSection = ref('')
const visitedSections = ref<Set<string>>(new Set())
const scrollProgress = ref(0)

// Store refs for cleanup
let sectionObserver: IntersectionObserver | null = null
let scrollHandler: (() => void) | null = null

// Track scroll position for active section and progress
onMounted(() => {
  // IntersectionObserver for active section
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
          visitedSections.value.add(entry.target.id)
        }
      })
    },
    { rootMargin: '-10% 0px -80% 0px' }
  )

  // Observe all section headings
  document.querySelectorAll('[id^="section-"]').forEach((el) => {
    sectionObserver!.observe(el)
  })

  // Track scroll progress
  scrollHandler = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  }

  window.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()
})

// Cleanup all event listeners and observers
onUnmounted(() => {
  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler)
  }
  if (sectionObserver) {
    sectionObserver.disconnect()
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})

// Check if section has been visited (scrolled past)
const isSectionVisited = (sectionId: string) => {
  return visitedSections.value.has(`section-${sectionId}`)
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    isTocOpen.value = false
  }
}

</script>

<template>
  <div class="min-h-screen bg-bg">
    <!-- Mobile TOC toggle button -->
    <button
      @click="isTocOpen = !isTocOpen"
      class="fixed bottom-6 right-6 z-50 lg:hidden p-3 bg-brand text-bg rounded-full shadow-lg hover:bg-brand/90 transition-colors"
      aria-label="Toggle table of contents"
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    </button>

    <UiContainer class="py-6">
      <!-- Breadcrumb -->
      <nav class="mb-6" aria-label="Breadcrumb">
        <ol class="flex items-center gap-2 text-sm">
          <li>
            <NuxtLink to="/app" class="text-gray-400 hover:text-brand transition-colors">
              Dashboard
            </NuxtLink>
          </li>
          <li class="text-gray-600">/</li>
          <li class="text-gray-300 font-medium">{{ cheatcode?.metadata.title }}</li>
        </ol>
      </nav>

      <!-- 3-column layout -->
      <div class="flex gap-8">
        <!-- Left sidebar: Table of Contents -->
        <aside
          class="fixed top-20 bottom-0 left-0 z-40 w-72 bg-surface/95 backdrop-blur-lg transform transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto lg:w-56 lg:shrink-0 lg:transform-none lg:bg-transparent lg:backdrop-blur-none"
          :class="isTocOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        >
          <div class="h-full overflow-y-auto p-6 pt-4 lg:p-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)]">
            <!-- Mobile close button -->
            <button
              @click="isTocOpen = false"
              class="absolute top-2 right-4 p-2 text-gray-400 hover:text-white lg:hidden"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              En esta página
            </h3>

            <!-- TOC with progress indicators -->
            <nav v-if="cheatcode" class="relative">
              <!-- Progress line background -->
              <div class="absolute left-[3px] top-0 bottom-0 w-0.5 bg-border/30 rounded-full" />

              <!-- Progress line fill (no transition for real-time tracking) -->
              <div
                class="absolute left-[3px] top-0 w-0.5 bg-brand rounded-full"
                :style="{ height: `${scrollProgress}%` }"
              />

              <div class="space-y-0.5">
                <button
                  v-for="section in cheatcode.sections"
                  :key="section.id"
                  @click="scrollToSection(section.id)"
                  class="w-full text-left pl-5 pr-3 py-2 text-sm transition-all duration-200 relative group"
                  :class="activeSection === `section-${section.id}`
                    ? 'text-brand font-medium'
                    : isSectionVisited(section.id)
                      ? 'text-gray-300 hover:text-brand'
                      : 'text-gray-500 hover:text-gray-300'"
                >
                  <!-- Dot indicator -->
                  <span
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full border-2 transition-all duration-200"
                    :class="activeSection === `section-${section.id}`
                      ? 'bg-brand border-brand scale-110'
                      : isSectionVisited(section.id)
                        ? 'bg-brand/50 border-brand/50'
                        : 'bg-surface border-gray-600 group-hover:border-gray-400'"
                  />
                  {{ section.title }}
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <!-- Mobile backdrop -->
        <div
          v-if="isTocOpen"
          class="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          @click="isTocOpen = false"
        />

        <!-- Main content -->
        <main class="flex-1 min-w-0">
          <article v-if="cheatcode" class="prose prose-invert max-w-none">
            <!-- Header -->
            <header class="mb-8 pb-6 border-b border-border">
              <div class="flex items-start gap-4">
                <!-- Logo -->
                <div class="shrink-0 w-14 h-14 rounded-xl bg-surface flex items-center justify-center">
                  <LogosCheatcodeLogo
                    :id="cheatcode.metadata.id"
                    size="32"
                    :fallback-icon="cheatcode.metadata.icon"
                  />
                </div>

                <div class="flex-1">
                  <div class="flex flex-wrap items-center gap-3 mb-2">
                    <h1 class="text-2xl sm:text-3xl font-bold text-white m-0">
                      {{ cheatcode.metadata.title }}
                    </h1>
                    <span
                      v-if="cheatcode.metadata.version"
                      class="text-xs font-medium px-2 py-1 rounded-full bg-brand/20 text-brand"
                    >
                      v{{ cheatcode.metadata.version }}
                    </span>
                    <!-- Last updated -->
                    <span class="text-xs text-gray-500 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ cheatcode.metadata.lastUpdated }}
                    </span>
                  </div>
                  <p class="text-gray-400 m-0">{{ cheatcode.metadata.description }}</p>

                  <!-- Tags -->
                  <div v-if="cheatcode.metadata.tags?.length" class="flex flex-wrap gap-2 mt-3">
                    <span
                      v-for="tag in cheatcode.metadata.tags"
                      :key="tag"
                      class="text-xs px-2 py-1 rounded-md bg-surface text-gray-400"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </header>

            <!-- Sections -->
            <div class="space-y-8">
              <CheatsheetSection
                v-for="section in cheatcode.sections"
                :key="section.id"
                :section="section"
                :is-root="true"
              />
            </div>
          </article>
        </main>

        <!-- Right sidebar: Related cheatcodes -->
        <aside class="hidden xl:block w-64 shrink-0">
          <div class="sticky top-24">
            <!-- Related cheatcodes -->
            <div v-if="relatedCheatcodes.length > 0" class="mb-8">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Relacionados
              </h3>
              <div class="space-y-2">
                <NuxtLink
                  v-for="related in relatedCheatcodes"
                  :key="related.metadata.id"
                  :to="`/app/cheatcodes/${related.metadata.id}`"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface/50 transition-colors group"
                >
                  <div class="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
                    <LogosCheatcodeLogo
                      :id="related.metadata.id"
                      size="20"
                      :fallback-icon="related.metadata.icon"
                    />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-gray-300 group-hover:text-brand transition-colors truncate">
                      {{ related.metadata.title }}
                    </p>
                    <p class="text-xs text-gray-500 truncate">
                      {{ related.metadata.category }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Quick actions -->
            <div class="space-y-3">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Acciones
              </h3>
              <NuxtLink
                to="/app"
                class="flex items-center gap-2 text-sm text-gray-400 hover:text-brand transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Volver al dashboard
              </NuxtLink>
            </div>

            <!-- Community placeholder -->
            <div class="mt-8 p-4 rounded-lg bg-surface/30 border border-border/50">
              <h4 class="text-sm font-medium text-gray-300 mb-2">Comunidad</h4>
              <p class="text-xs text-gray-500">
                Próximamente: comentarios, sugerencias y contribuciones de la comunidad.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </UiContainer>

    <!-- Search Modal - searches ONLY in current cheatcode -->
    <UiSearchModal
      :is-open="isSearchOpen"
      :cheatcodes="cheatcode ? [cheatcode] : []"
      @close="isSearchOpen = false"
      base-path="/app"
    />
  </div>
</template>

<style scoped>
/* Prose overrides for dark theme */
.prose {
  --tw-prose-body: var(--color-text-secondary);
  --tw-prose-headings: var(--color-text-primary);
  --tw-prose-code: var(--color-brand);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}
</style>
