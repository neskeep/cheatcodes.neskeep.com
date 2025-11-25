<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'

// Protect this route - require authentication
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()

// Set page meta
useHead({
  title: 'Dashboard | Neskeep Cheatcodes',
  meta: [
    { name: 'description', content: 'Your programming cheatsheets dashboard' },
  ],
})

// Fetch all cheatcodes (full data for search)
const { data: cheatcodesData } = await useAsyncData<Cheatcode[]>('all-cheatcodes', async () => {
  const metadataList = await $fetch<{ id: string }[]>('/api/cheatcodes')
  const fullCheatcodes = await Promise.all(
    metadataList.map(m => $fetch<Cheatcode>(`/api/cheatcodes/${m.id}`))
  )
  return fullCheatcodes
})

// Search modal state
const isSearchOpen = ref(false)

// Filter state
const selectedCategory = ref<string | null>(null)

// Categories derived from cheatcodes
const categories = computed(() => {
  if (!cheatcodesData.value) return []
  const langs = new Set(cheatcodesData.value.map(c => c.metadata.language))
  return Array.from(langs).sort()
})

// Filtered cheatcodes
const filteredCheatcodes = computed(() => {
  if (!cheatcodesData.value) return []
  if (!selectedCategory.value) return cheatcodesData.value
  return cheatcodesData.value.filter(c => c.metadata.language === selectedCategory.value)
})

// Keyboard shortcut for search
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isSearchOpen.value = true
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})

// Logout
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-secondary)]">
    <!-- Header -->
    <header class="bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/app" class="text-[var(--color-text-primary)]">
            <Logo size="md" />
          </NuxtLink>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UiSearchButton @click="isSearchOpen = true" />
            <UiThemeToggle />

            <!-- User menu -->
            <div class="relative group">
              <button class="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[#00C9D4] transition-colors">
                <div class="w-8 h-8 rounded-full bg-[#00C9D4] flex items-center justify-center text-white font-semibold text-sm">
                  {{ user?.email?.charAt(0).toUpperCase() }}
                </div>
                <svg class="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown -->
              <div class="absolute right-0 mt-2 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="px-4 py-3 border-b border-[var(--color-border)]">
                  <p class="text-sm text-[var(--color-text-muted)]">Signed in as</p>
                  <p class="text-sm font-medium text-[var(--color-text-primary)] truncate">{{ user?.email }}</p>
                </div>
                <div class="p-2">
                  <button
                    @click="logout"
                    class="w-full text-left px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Welcome banner -->
    <div class="bg-gradient-to-r from-[#00C9D4]/10 to-[#A6FF3A]/10 border-b border-[var(--color-border)]">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">
              Welcome back!
            </h1>
            <p class="text-[var(--color-text-secondary)] mt-1">
              Access all your programming cheatcodes below.
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-4 text-sm">
            <div class="text-center">
              <div class="text-xl font-bold text-[#00C9D4]">{{ cheatcodesData?.length || 0 }}</div>
              <div class="text-[var(--color-text-muted)]">Cheatcodes</div>
            </div>
            <div class="w-px h-10 bg-[var(--color-border)]" />
            <div class="text-center">
              <div class="text-xl font-bold text-[#A6FF3A]">{{ cheatcodesData?.reduce((acc, c) => acc + c.sections.length, 0) || 0 }}</div>
              <div class="text-[var(--color-text-muted)]">Sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Search bar -->
      <div class="mb-8">
        <button
          @click="isSearchOpen = true"
          class="w-full flex items-center gap-3 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[#00C9D4] transition-all text-[var(--color-text-muted)] text-left"
        >
          <svg class="w-5 h-5 text-[#00C9D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search cheatcodes, sections, code...</span>
          <kbd class="kbd ml-auto">&#8984;K</kbd>
        </button>
      </div>

      <!-- Category filters -->
      <div class="mb-8">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm font-medium text-[var(--color-text-secondary)] mr-2">Filter:</span>
          <button
            @click="selectedCategory = null"
            class="px-4 py-2 text-sm rounded-lg transition-all duration-200"
            :class="selectedCategory === null
              ? 'bg-[#00C9D4] text-white shadow-[0_0_15px_rgba(0,201,212,0.4)]'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[#00C9D4] hover:text-[#00C9D4]'"
          >
            All
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-2 text-sm rounded-lg transition-all duration-200"
            :class="selectedCategory === cat
              ? 'bg-[#00C9D4] text-white shadow-[0_0_15px_rgba(0,201,212,0.4)]'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[#00C9D4] hover:text-[#00C9D4]'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="!cheatcodesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="bg-[var(--color-surface)] rounded-xl p-6 animate-pulse border border-[var(--color-border)]">
          <div class="h-12 w-12 bg-[var(--color-bg-tertiary)] rounded-lg mb-4" />
          <div class="h-6 bg-[var(--color-bg-tertiary)] rounded w-3/4 mb-2" />
          <div class="h-4 bg-[var(--color-bg-tertiary)] rounded w-full mb-4" />
          <div class="h-10 bg-[var(--color-bg-tertiary)] rounded" />
        </div>
      </div>

      <!-- Cheatcodes grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
          v-for="cheatcode in filteredCheatcodes"
          :key="cheatcode.metadata.id"
          :to="`/app/cheatcodes/${cheatcode.metadata.id}`"
          class="group neskeep-card overflow-hidden"
        >
          <!-- Card header with color accent -->
          <div
            class="h-1.5 transition-all duration-300 group-hover:h-2"
            :style="{ background: `linear-gradient(90deg, ${cheatcode.metadata.color || '#00C9D4'}, ${cheatcode.metadata.color || '#00C9D4'}88)` }"
          />

          <div class="p-6">
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div
                class="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              >
                {{ cheatcode.metadata.icon || '&#128196;' }}
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[#00C9D4] transition-colors">
                  {{ cheatcode.metadata.title }}
                </h3>
                <p class="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                  {{ cheatcode.metadata.description }}
                </p>
                <div class="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span v-if="cheatcode.metadata.version" class="px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded">
                    v{{ cheatcode.metadata.version }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {{ cheatcode.sections.length }} sections
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span class="text-xs text-[var(--color-text-muted)]">
                Updated {{ cheatcode.metadata.lastUpdated }}
              </span>
              <div class="flex items-center gap-1 text-[#00C9D4] text-sm font-medium group-hover:gap-2 transition-all">
                <span>Open</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="filteredCheatcodes && filteredCheatcodes.length === 0" class="text-center py-16">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
          <svg class="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
          No cheatcodes found
        </h3>
        <p class="text-[var(--color-text-secondary)] mb-6">
          Try selecting a different category.
        </p>
        <button
          @click="selectedCategory = null"
          class="btn-primary"
        >
          Show all cheatcodes
        </button>
      </div>
    </main>

    <!-- Search Modal -->
    <UiSearchModal
      :is-open="isSearchOpen"
      :cheatcodes="cheatcodesData || []"
      @close="isSearchOpen = false"
      base-path="/app"
    />
  </div>
</template>
