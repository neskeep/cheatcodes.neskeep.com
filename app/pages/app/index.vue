<script setup lang="ts">
import type { Cheatcode, CheatcodeTag, CheatcodeCategory } from '~/types/cheatcode'

// Protect this route - require authentication
definePageMeta({
  middleware: 'auth'
})

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

// Search modal state - injected from layout
const isSearchOpen = inject<Ref<boolean>>('searchOpen', ref(false))

// Filter state
const selectedTags = ref<Set<CheatcodeTag>>(new Set())
const selectedCategories = ref<Set<CheatcodeCategory>>(new Set())
const selectedDifficulties = ref<Set<string>>(new Set())
const searchQuery = ref('')
const viewMode = ref<'grid' | 'compact'>('grid')

// Tag configuration with colors
const tagConfig: Record<CheatcodeTag, { label: string; color: string; group: string }> = {
  javascript: { label: 'JavaScript', color: '#F7DF1E', group: 'Lenguajes' },
  typescript: { label: 'TypeScript', color: '#3178C6', group: 'Lenguajes' },
  html: { label: 'HTML', color: '#E34F26', group: 'Lenguajes' },
  css: { label: 'CSS', color: '#1572B6', group: 'Lenguajes' },
  vue: { label: 'Vue', color: '#4FC08D', group: 'Frameworks' },
  react: { label: 'React', color: '#61DAFB', group: 'Frameworks' },
  nuxt: { label: 'Nuxt', color: '#00DC82', group: 'Frameworks' },
  next: { label: 'Next.js', color: '#000000', group: 'Frameworks' },
  framework: { label: 'Framework', color: '#9333EA', group: 'Tipo' },
  accessibility: { label: 'Accesibilidad', color: '#0066CC', group: 'Especialidad' },
  seo: { label: 'SEO', color: '#47A248', group: 'Especialidad' },
  performance: { label: 'Performance', color: '#FF6B6B', group: 'Especialidad' },
  frontend: { label: 'Frontend', color: '#00C9D4', group: 'Área' },
  backend: { label: 'Backend', color: '#6366F1', group: 'Área' },
}

// Category configuration
const categoryConfig: Record<CheatcodeCategory, { label: string; icon: string }> = {
  language: { label: 'Lenguaje', icon: '📝' },
  framework: { label: 'Framework', icon: '🏗️' },
  markup: { label: 'Markup', icon: '🏷️' },
  styling: { label: 'Estilos', icon: '🎨' },
  tooling: { label: 'Herramientas', icon: '🔧' },
}

// Difficulty configuration
const difficultyConfig = {
  beginner: { label: 'Principiante', color: '#22C55E', icon: '●' },
  intermediate: { label: 'Intermedio', color: '#F59E0B', icon: '●●' },
  advanced: { label: 'Avanzado', color: '#EF4444', icon: '●●●' },
}

// Get available tags grouped
const groupedTags = computed(() => {
  if (!cheatcodesData.value) return {}
  const tags = new Set<CheatcodeTag>()
  cheatcodesData.value.forEach(c => {
    c.metadata.tags?.forEach(t => tags.add(t))
  })

  const groups: Record<string, CheatcodeTag[]> = {}
  Array.from(tags).forEach(tag => {
    const group = tagConfig[tag]?.group || 'Otros'
    if (!groups[group]) groups[group] = []
    groups[group].push(tag)
  })
  return groups
})

// Get available categories
const availableCategories = computed(() => {
  if (!cheatcodesData.value) return []
  const cats = new Set<CheatcodeCategory>()
  cheatcodesData.value.forEach(c => {
    if (c.metadata.category) cats.add(c.metadata.category)
  })
  return Array.from(cats)
})

// Get available difficulties
const availableDifficulties = computed(() => {
  if (!cheatcodesData.value) return []
  const diffs = new Set<string>()
  cheatcodesData.value.forEach(c => {
    if (c.metadata.difficulty) diffs.add(c.metadata.difficulty)
  })
  return Array.from(diffs)
})

// Toggle functions
function toggleTag(tag: CheatcodeTag) {
  const newSet = new Set(selectedTags.value)
  if (newSet.has(tag)) {
    newSet.delete(tag)
  } else {
    newSet.add(tag)
  }
  selectedTags.value = newSet
}

function toggleCategory(cat: CheatcodeCategory) {
  const newSet = new Set(selectedCategories.value)
  if (newSet.has(cat)) {
    newSet.delete(cat)
  } else {
    newSet.add(cat)
  }
  selectedCategories.value = newSet
}

function toggleDifficulty(diff: string) {
  const newSet = new Set(selectedDifficulties.value)
  if (newSet.has(diff)) {
    newSet.delete(diff)
  } else {
    newSet.add(diff)
  }
  selectedDifficulties.value = newSet
}

// Clear all filters
function clearFilters() {
  selectedTags.value = new Set()
  selectedCategories.value = new Set()
  selectedDifficulties.value = new Set()
  searchQuery.value = ''
}

// Count active filters
const activeFilterCount = computed(() => {
  return selectedTags.value.size + selectedCategories.value.size + selectedDifficulties.value.size
})

// Filtered cheatcodes
const filteredCheatcodes = computed(() => {
  if (!cheatcodesData.value) return []

  return cheatcodesData.value.filter(c => {
    // Search query filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch =
        c.metadata.title.toLowerCase().includes(query) ||
        c.metadata.description.toLowerCase().includes(query) ||
        c.metadata.tags?.some(t => tagConfig[t]?.label.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }

    // Tag filter (OR logic)
    if (selectedTags.value.size > 0) {
      const hasTag = c.metadata.tags?.some(t => selectedTags.value.has(t))
      if (!hasTag) return false
    }

    // Category filter (OR logic)
    if (selectedCategories.value.size > 0) {
      if (!selectedCategories.value.has(c.metadata.category)) return false
    }

    // Difficulty filter (OR logic)
    if (selectedDifficulties.value.size > 0) {
      if (!c.metadata.difficulty || !selectedDifficulties.value.has(c.metadata.difficulty)) return false
    }

    return true
  })
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
</script>

<template>
  <div>
    <!-- Simple header banner -->
    <div class="bg-linear-to-r from-brand/10 to-accent/10 border-b border-border">
      <div class="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">
              Cheatcodes
            </h1>
            <p class="text-[var(--color-text-secondary)] text-sm mt-0.5">
              {{ filteredCheatcodes.length }} de {{ cheatcodesData?.length || 0 }} disponibles
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-4 text-sm">
            <div class="text-center">
              <div class="text-xl font-bold text-brand">{{ cheatcodesData?.length || 0 }}</div>
              <div class="text-[var(--color-text-muted)]">Total</div>
            </div>
            <div class="w-px h-10 bg-border" />
            <div class="text-center">
              <div class="text-xl font-bold text-accent">{{ cheatcodesData?.reduce((acc, c) => acc + c.sections.length, 0) || 0 }}</div>
              <div class="text-[var(--color-text-muted)]">Secciones</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <!-- Search bar -->
      <div class="mb-4">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar cheatcodes..."
            class="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-brand/50 transition-colors"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Filters toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <!-- Filters section -->
        <div class="flex-1 space-y-3">
          <!-- Categories row -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-[var(--color-text-muted)] w-16 shrink-0">Tipo:</span>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="cat in availableCategories"
                :key="cat"
                @click="toggleCategory(cat)"
                class="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all"
                :class="selectedCategories.has(cat)
                  ? 'bg-brand text-[var(--color-quantum-blue)] font-medium'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-brand/50'"
              >
                <span>{{ categoryConfig[cat]?.icon }}</span>
                {{ categoryConfig[cat]?.label || cat }}
              </button>
            </div>
          </div>

          <!-- Difficulty row -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-medium text-[var(--color-text-muted)] w-16 shrink-0">Nivel:</span>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="diff in availableDifficulties"
                :key="diff"
                @click="toggleDifficulty(diff)"
                class="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-all"
                :class="selectedDifficulties.has(diff)
                  ? 'bg-brand text-[var(--color-quantum-blue)] font-medium'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-brand/50'"
              >
                <span :style="{ color: selectedDifficulties.has(diff) ? 'inherit' : difficultyConfig[diff as keyof typeof difficultyConfig]?.color }">
                  {{ difficultyConfig[diff as keyof typeof difficultyConfig]?.icon }}
                </span>
                {{ difficultyConfig[diff as keyof typeof difficultyConfig]?.label }}
              </button>
            </div>
          </div>

          <!-- Tags row -->
          <div class="flex flex-wrap items-start gap-2">
            <span class="text-xs font-medium text-[var(--color-text-muted)] w-16 shrink-0 pt-1">Tags:</span>
            <div class="flex-1 flex flex-wrap gap-1.5">
              <template v-for="(tags, groupName) in groupedTags" :key="groupName">
                <button
                  v-for="tag in tags"
                  :key="tag"
                  @click="toggleTag(tag)"
                  class="flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full transition-all"
                  :class="selectedTags.has(tag)
                    ? 'text-white font-medium shadow-sm'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-brand/50'"
                  :style="selectedTags.has(tag) ? { backgroundColor: tagConfig[tag]?.color } : {}"
                >
                  <span
                    v-if="!selectedTags.has(tag)"
                    class="w-1.5 h-1.5 rounded-full"
                    :style="{ backgroundColor: tagConfig[tag]?.color }"
                  />
                  {{ tagConfig[tag]?.label || tag }}
                </button>
              </template>
            </div>
          </div>
        </div>

        <!-- View toggle -->
        <div class="flex items-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-0.5 self-start">
          <button
            @click="viewMode = 'grid'"
            class="p-1.5 rounded transition-colors"
            :class="viewMode === 'grid' ? 'bg-brand/20 text-brand' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'"
            title="Vista en cuadrícula"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="viewMode = 'compact'"
            class="p-1.5 rounded transition-colors"
            :class="viewMode === 'compact' ? 'bg-brand/20 text-brand' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'"
            title="Vista compacta"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Active filters chips (when any filter is selected) -->
      <div v-if="activeFilterCount > 0" class="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-[var(--color-border)]">
        <!-- Left side: Activos label + chips -->
        <div class="flex flex-wrap items-center gap-2 flex-1">
          <span class="text-xs text-[var(--color-text-muted)]">Activos:</span>

          <!-- Category chips -->
          <button
            v-for="cat in selectedCategories"
            :key="cat"
            @click="toggleCategory(cat)"
            class="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-brand/20 text-brand rounded-full hover:bg-brand/30 transition-colors"
          >
            {{ categoryConfig[cat]?.icon }} {{ categoryConfig[cat]?.label }}
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Difficulty chips -->
          <button
            v-for="diff in selectedDifficulties"
            :key="diff"
            @click="toggleDifficulty(diff)"
            class="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-brand/20 text-brand rounded-full hover:bg-brand/30 transition-colors"
          >
            {{ difficultyConfig[diff as keyof typeof difficultyConfig]?.label }}
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Tag chips -->
          <button
            v-for="tag in selectedTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full text-white hover:opacity-80 transition-opacity"
            :style="{ backgroundColor: tagConfig[tag]?.color }"
          >
            {{ tagConfig[tag]?.label }}
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Right side: Clear filters button -->
        <button
          @click="clearFilters"
          class="text-xs text-[var(--color-text-muted)] hover:text-brand transition-colors flex items-center gap-1 shrink-0"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpiar ({{ activeFilterCount }})
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="!cheatcodesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="bg-[var(--color-surface)] rounded-xl p-5 animate-pulse border border-[var(--color-border)]">
          <div class="h-10 w-10 bg-[var(--color-bg-tertiary)] rounded-lg mb-3" />
          <div class="h-5 bg-[var(--color-bg-tertiary)] rounded w-3/4 mb-2" />
          <div class="h-4 bg-[var(--color-bg-tertiary)] rounded w-full mb-3" />
          <div class="h-8 bg-[var(--color-bg-tertiary)] rounded" />
        </div>
      </div>

      <!-- Grid view -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="cheatcode in filteredCheatcodes"
          :key="cheatcode.metadata.id"
          :to="`/app/cheatcodes/${cheatcode.metadata.id}`"
          class="group neskeep-card overflow-hidden"
        >
          <!-- Card header with color accent -->
          <div
            class="h-1 transition-all duration-300 group-hover:h-1.5"
            :style="{ background: `linear-gradient(90deg, ${cheatcode.metadata.color || '#00C9D4'}, ${cheatcode.metadata.color || '#00C9D4'}88)` }"
          />

          <div class="p-4">
            <!-- Header -->
            <div class="flex items-start gap-3 mb-2">
              <!-- Logo -->
              <div class="w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <LogosCheatcodeLogo
                  :id="cheatcode.metadata.id"
                  size="28"
                  :fallback-icon="cheatcode.metadata.icon"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold text-[var(--color-text-primary)] group-hover:text-brand transition-colors truncate">
                    {{ cheatcode.metadata.title }}
                  </h3>
                  <span v-if="cheatcode.metadata.version" class="px-1.5 py-0.5 text-[9px] bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded shrink-0">
                    v{{ cheatcode.metadata.version }}
                  </span>
                </div>
                <div v-if="cheatcode.metadata.difficulty" class="flex items-center gap-1 mt-0.5">
                  <span
                    class="text-[9px]"
                    :style="{ color: difficultyConfig[cheatcode.metadata.difficulty]?.color }"
                  >{{ difficultyConfig[cheatcode.metadata.difficulty]?.icon }}</span>
                  <span class="text-[10px] text-[var(--color-text-muted)]">
                    {{ difficultyConfig[cheatcode.metadata.difficulty]?.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3">
              {{ cheatcode.metadata.description }}
            </p>

            <!-- Tags (max 3) -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                v-for="tag in cheatcode.metadata.tags?.slice(0, 3)"
                :key="tag"
                class="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
              >
                <span class="w-1 h-1 rounded-full" :style="{ backgroundColor: tagConfig[tag]?.color || '#888' }" />
                {{ tagConfig[tag]?.label || tag }}
              </span>
              <span
                v-if="cheatcode.metadata.tags && cheatcode.metadata.tags.length > 3"
                class="px-1.5 py-0.5 text-[9px] rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
              >
                +{{ cheatcode.metadata.tags.length - 3 }}
              </span>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
              <span class="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {{ cheatcode.sections.length }} secciones
              </span>
              <span class="text-xs text-brand font-medium flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                Abrir
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Compact view -->
      <div v-else class="space-y-2">
        <NuxtLink
          v-for="cheatcode in filteredCheatcodes"
          :key="cheatcode.metadata.id"
          :to="`/app/cheatcodes/${cheatcode.metadata.id}`"
          class="group flex items-center gap-4 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:border-brand/50 transition-all"
        >
          <!-- Logo -->
          <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center">
            <LogosCheatcodeLogo
              :id="cheatcode.metadata.id"
              size="20"
              :fallback-icon="cheatcode.metadata.icon"
            />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-brand transition-colors truncate">
                {{ cheatcode.metadata.title }}
              </h3>
              <span v-if="cheatcode.metadata.version" class="px-1 py-0.5 text-[8px] bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded">
                v{{ cheatcode.metadata.version }}
              </span>
              <span
                v-if="cheatcode.metadata.difficulty"
                class="text-[8px]"
                :style="{ color: difficultyConfig[cheatcode.metadata.difficulty]?.color }"
              >{{ difficultyConfig[cheatcode.metadata.difficulty]?.icon }}</span>
            </div>
            <p class="text-[11px] text-[var(--color-text-muted)] truncate">
              {{ cheatcode.metadata.description }}
            </p>
          </div>

          <!-- Tags -->
          <div class="hidden sm:flex items-center gap-1 flex-shrink-0">
            <span
              v-for="tag in cheatcode.metadata.tags?.slice(0, 2)"
              :key="tag"
              class="w-2 h-2 rounded-full"
              :style="{ backgroundColor: tagConfig[tag]?.color || '#888' }"
              :title="tagConfig[tag]?.label || tag"
            />
            <span v-if="cheatcode.metadata.tags && cheatcode.metadata.tags.length > 2" class="text-[9px] text-[var(--color-text-muted)]">
              +{{ cheatcode.metadata.tags.length - 2 }}
            </span>
          </div>

          <!-- Sections count -->
          <span class="text-[10px] text-[var(--color-text-muted)] flex-shrink-0">
            {{ cheatcode.sections.length }} sec.
          </span>

          <!-- Arrow -->
          <svg class="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-brand transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="filteredCheatcodes && filteredCheatcodes.length === 0" class="text-center py-12">
        <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
          <svg class="w-7 h-7 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
          No se encontraron cheatcodes
        </h3>
        <p class="text-sm text-[var(--color-text-secondary)] mb-4">
          Intenta ajustar los filtros.
        </p>
        <button @click="clearFilters" class="btn-primary text-sm">
          Limpiar filtros
        </button>
      </div>
    </main>

    <!-- Search Modal (global search via ⌘K) -->
    <UiSearchModal
      :is-open="isSearchOpen"
      :cheatcodes="cheatcodesData || []"
      @close="isSearchOpen = false"
      base-path="/app"
    />
  </div>
</template>
