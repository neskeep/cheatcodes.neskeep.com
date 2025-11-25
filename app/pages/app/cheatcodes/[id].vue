<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'

// Protect this route - require authentication
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const cheatcodeId = route.params.id as string

// Fetch cheatcode data
const { data: cheatcode, error } = await useFetch<Cheatcode>(`/api/cheatcodes/${cheatcodeId}`)

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

// Sidebar state
const isSidebarOpen = ref(true)
const activeSection = ref('')

// Track scroll position for active section
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-20% 0px -70% 0px' }
  )

  // Observe all section headings
  document.querySelectorAll('[id^="section-"]').forEach((el) => {
    observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-secondary)]">
    <!-- Top navigation -->
    <nav class="bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Menu toggle for sidebar -->
            <button
              @click="isSidebarOpen = !isSidebarOpen"
              class="p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors lg:hidden"
            >
              <svg class="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <NuxtLink to="/app" class="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[#00C9D4] transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="font-medium hidden sm:inline">All cheatcodes</span>
            </NuxtLink>
          </div>

          <div v-if="cheatcode" class="flex items-center gap-3">
            <span class="text-2xl">{{ cheatcode.metadata.icon }}</span>
            <span class="font-semibold text-[var(--color-text-primary)]">{{ cheatcode.metadata.title }}</span>
            <span v-if="cheatcode.metadata.version" class="text-sm text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-2 py-0.5 rounded">
              v{{ cheatcode.metadata.version }}
            </span>
          </div>

          <UiThemeToggle />
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- Sidebar -->
      <aside
        class="fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-72 bg-[var(--color-bg-primary)] border-r border-[var(--color-border)] overflow-y-auto z-10 transform transition-transform duration-200 lg:transform-none"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <div class="p-4 pb-20">
          <h3 class="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Contents
          </h3>
          <nav v-if="cheatcode" class="space-y-1">
            <button
              v-for="section in cheatcode.sections"
              :key="section.id"
              @click="scrollToSection(section.id)"
              class="w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200"
              :class="activeSection === `section-${section.id}`
                ? 'bg-[#00C9D4] text-white shadow-[0_0_15px_rgba(0,201,212,0.4)]'
                : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'"
            >
              {{ section.title }}
            </button>
          </nav>
        </div>

        <!-- Sidebar footer -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]">
          <a
            href="https://cheatcodes.neskeep.com"
            class="flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[#00C9D4] transition-colors"
          >
            <span>Powered by</span>
            <span class="font-semibold">
              <span class="text-[#00C9D4]">nes</span>keep
            </span>
          </a>
        </div>
      </aside>

      <!-- Backdrop for mobile -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-5 lg:hidden backdrop-blur-sm"
        @click="isSidebarOpen = false"
      />

      <!-- Main content -->
      <main class="flex-1 min-w-0 px-4 py-8 sm:px-6 lg:px-8 lg:ml-0">
        <div v-if="cheatcode" class="max-w-4xl mx-auto">
          <CheatsheetLayout :cheatcode="cheatcode" />
        </div>
      </main>
    </div>
  </div>
</template>
