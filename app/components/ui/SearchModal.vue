<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'
import type { SearchResult, GroupedResults } from '~/composables/useSearch'

const props = withDefaults(defineProps<{
  isOpen: boolean
  cheatcodes: Cheatcode[]
  basePath?: string
}>(), {
  basePath: ''
})

const emit = defineEmits<{
  close: []
}>()

const {
  searchQuery,
  recentSearches,
  search,
  groupResults,
  highlightMatch,
  saveRecentSearch,
  clearRecentSearches,
  loadRecentSearches
} = useSearch()

const searchInput = ref<HTMLInputElement>()
const selectedIndex = ref(0)
const results = ref<SearchResult[]>([])
const grouped = ref<GroupedResults[]>([])
const copiedCode = ref<string | null>(null)
const viewMode = ref<'flat' | 'grouped'>('flat')

// Flatten grouped results for keyboard navigation
const flatResults = computed(() => results.value)

const handleSearch = () => {
  results.value = search(props.cheatcodes, searchQuery.value)
  grouped.value = groupResults(results.value)
  selectedIndex.value = 0
}

const navigateToResult = (result: SearchResult) => {
  saveRecentSearch(searchQuery.value)
  closeModal()

  // If we have a section, scroll to it smoothly
  if (result.sectionId) {
    nextTick(() => {
      const element = document.getElementById(`section-${result.sectionId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
}

const closeModal = () => {
  emit('close')
  searchQuery.value = ''
  results.value = []
  grouped.value = []
  selectedIndex.value = 0
  copiedCode.value = null
}

const copyCode = async (code: string, event: Event) => {
  event.stopPropagation()
  try {
    await navigator.clipboard.writeText(code)
    copiedCode.value = code
    setTimeout(() => {
      copiedCode.value = null
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const useRecentSearch = (query: string) => {
  searchQuery.value = query
  handleSearch()
  nextTick(() => {
    searchInput.value?.focus()
  })
}

// Scroll selected item into view
const scrollSelectedIntoView = () => {
  nextTick(() => {
    const selected = document.querySelector('[data-selected="true"]')
    selected?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  })
}

// Handle keyboard events
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, flatResults.value.length - 1)
    scrollSelectedIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollSelectedIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const result = flatResults.value[selectedIndex.value]
    if (result) {
      navigateToResult(result)
    }
  } else if (e.key === 'Escape') {
    e.preventDefault()
    closeModal()
  } else if (e.key === 'Tab' && !e.shiftKey && flatResults.value[selectedIndex.value]?.copyableCode) {
    // Tab to copy code
    e.preventDefault()
    copyCode(flatResults.value[selectedIndex.value].copyableCode!, e)
  }
}

// Register global keydown listener
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  loadRecentSearches()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      searchInput.value?.focus()
    })
    document.body.style.overflow = 'hidden'
  } else {
    searchQuery.value = ''
    results.value = []
    grouped.value = []
    selectedIndex.value = 0
    document.body.style.overflow = ''
  }
})

// Type icons and labels
const typeConfig = {
  cheatcode: { icon: '📚', label: 'Cheatcode', class: 'bg-brand/20 text-brand' },
  section: { icon: '📑', label: 'Seccion', class: 'bg-blue-500/20 text-blue-400' },
  content: { icon: '📝', label: 'Contenido', class: 'bg-gray-500/20 text-gray-400' },
  code: { icon: '💻', label: 'Codigo', class: 'bg-green-500/20 text-green-400' },
  table: { icon: '📊', label: 'Tabla', class: 'bg-purple-500/20 text-purple-400' },
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeModal"
          aria-hidden="true"
        />

        <!-- Modal container - click on empty space closes modal -->
        <div
          class="relative min-h-screen flex items-center justify-center py-8 sm:py-12 px-4"
          @click.self="closeModal"
        >
          <div class="relative w-full max-w-2xl bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden border border-[var(--color-border)]">

            <!-- Search input -->
            <div class="flex items-center gap-3 px-5 py-4 border-b border-[var(--color-border)]">
              <svg class="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                :placeholder="cheatcodes.length === 1 ? `Buscar en ${cheatcodes[0]?.metadata?.title || 'cheatcode'}...` : 'Buscar...'"
                class="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none text-lg"
                @input="handleSearch"
              />
              <div class="flex items-center gap-2">
                <button
                  v-if="searchQuery"
                  @click="searchQuery = ''; results = []; grouped = []"
                  class="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <kbd class="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded border bg-surface border-border text-gray-500">ESC</kbd>
              </div>
            </div>

            <!-- Results container -->
            <div class="max-h-[65vh] overflow-y-auto">

              <!-- Empty state: Show recent searches -->
              <div v-if="!searchQuery" class="p-5">
                <!-- Recent searches -->
                <div v-if="recentSearches.length > 0" class="mb-6">
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                      Busquedas recientes
                    </h3>
                    <button
                      @click="clearRecentSearches"
                      class="text-xs text-[var(--color-text-muted)] hover:text-brand transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="recent in recentSearches"
                      :key="recent"
                      @click="useRecentSearch(recent)"
                      class="px-3 py-1.5 text-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-brand/20 hover:text-brand transition-all flex items-center gap-2"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ recent }}
                    </button>
                  </div>
                </div>

                <!-- Quick actions: show sections from first cheatcode -->
                <div v-if="cheatcodes.length > 0">
                  <h3 class="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                    Secciones disponibles
                  </h3>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="section in cheatcodes[0]?.sections?.slice(0, 6)"
                      :key="section.id"
                      @click="useRecentSearch(section.title.split(' ')[0])"
                      class="text-left px-3 py-2 text-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-lg hover:bg-brand/20 hover:text-brand transition-all truncate"
                    >
                      {{ section.title }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- No results -->
              <div v-else-if="searchQuery && results.length === 0" class="p-8 text-center">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                  <svg class="w-8 h-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-[var(--color-text-secondary)] mb-2">
                  No se encontraron resultados para
                </p>
                <p class="text-[var(--color-text-primary)] font-medium">
                  "{{ searchQuery }}"
                </p>
              </div>

              <!-- Results list -->
              <div v-else class="py-2">
                <button
                  v-for="(result, index) in results"
                  :key="`${result.cheatcodeId}-${result.sectionId}-${index}`"
                  :data-selected="index === selectedIndex"
                  class="w-full px-4 py-3 flex items-start gap-3 transition-colors text-left group"
                  :class="index === selectedIndex
                    ? 'bg-brand/10'
                    : 'hover:bg-[var(--color-bg-tertiary)]'"
                  @click="navigateToResult(result)"
                  @mouseenter="selectedIndex = index"
                >
                  <!-- Logo/Icon -->
                  <div
                    class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                    :style="{ backgroundColor: `${result.cheatcodeColor || '#00C9D4'}15` }"
                  >
                    <LogosCheatcodeLogo
                      :id="result.cheatcodeId"
                      size="24"
                      :fallback-icon="result.cheatcodeIcon"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <!-- Title row -->
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-semibold text-[var(--color-text-primary)]">
                        {{ result.sectionTitle }}
                      </span>
                      <span
                        class="px-1.5 py-0.5 text-[10px] font-medium rounded"
                        :class="typeConfig[result.type].class"
                      >
                        {{ typeConfig[result.type].label }}
                      </span>
                    </div>

                    <!-- Snippet -->
                    <p class="text-sm text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                      {{ result.snippet }}
                    </p>

                    <!-- Breadcrumb path -->
                    <div class="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-muted)]">
                      <span
                        v-for="(p, i) in result.path"
                        :key="i"
                        class="flex items-center"
                      >
                        <span class="truncate max-w-[100px]">{{ p }}</span>
                        <svg v-if="i < result.path.length - 1" class="w-3 h-3 mx-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2 flex-shrink-0 self-center">
                    <!-- Copy code button (for code results) -->
                    <button
                      v-if="result.copyableCode"
                      @click="copyCode(result.copyableCode, $event)"
                      class="p-1.5 rounded-md transition-all"
                      :class="copiedCode === result.copyableCode
                        ? 'bg-green-500/20 text-green-400'
                        : 'text-[var(--color-text-muted)] hover:text-brand hover:bg-brand/10 opacity-0 group-hover:opacity-100'"
                      :title="copiedCode === result.copyableCode ? 'Copiado!' : 'Copiar codigo'"
                    >
                      <svg v-if="copiedCode === result.copyableCode" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>

                    <!-- Navigate arrow -->
                    <svg
                      class="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-brand transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)]/50">
              <div class="flex items-center gap-4">
                <span class="hidden sm:flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 text-[10px] font-medium rounded border bg-surface border-border text-gray-500">↑</kbd>
                  <kbd class="px-1.5 py-0.5 text-[10px] font-medium rounded border bg-surface border-border text-gray-500">↓</kbd>
                  navegar
                </span>
                <span class="hidden sm:flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 text-[10px] font-medium rounded border bg-surface border-border text-gray-500">Enter</kbd>
                  abrir
                </span>
                <span class="hidden sm:flex items-center gap-1">
                  <kbd class="px-1.5 py-0.5 text-[10px] font-medium rounded border bg-surface border-border text-gray-500">Tab</kbd>
                  copiar
                </span>
              </div>
              <span v-if="results.length > 0" class="text-brand font-medium">
                {{ results.length }} resultado{{ results.length === 1 ? '' : 's' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
