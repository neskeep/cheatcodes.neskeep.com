<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'
import type { SearchResult } from '~/composables/useSearch'

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

const { searchQuery, search } = useSearch()
const searchInput = ref<HTMLInputElement>()
const selectedIndex = ref(0)
const results = ref<SearchResult[]>([])

const handleSearch = () => {
  results.value = search(props.cheatcodes, searchQuery.value)
  selectedIndex.value = 0
}

const navigateToResult = (result: SearchResult) => {
  const path = result.sectionId
    ? `${props.basePath}/cheatcodes/${result.cheatcodeId}#section-${result.sectionId}`
    : `${props.basePath}/cheatcodes/${result.cheatcodeId}`
  navigateTo(path)
  emit('close')
  searchQuery.value = ''
  results.value = []
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter' && results.value[selectedIndex.value]) {
    navigateToResult(results.value[selectedIndex.value])
  } else if (e.key === 'Escape') {
    emit('close')
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
    results.value = []
    selectedIndex.value = 0
  }
})

const getTypeIcon = (type: SearchResult['type']) => {
  switch (type) {
    case 'title': return 'H'
    case 'code': return '<>'
    default: return 'T'
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="emit('close')"
        @keydown="handleKeydown"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="emit('close')" />

        <!-- Modal -->
        <div class="relative min-h-screen flex items-start justify-center pt-[10vh] px-4">
          <div class="relative w-full max-w-2xl bg-[var(--color-bg-primary)] rounded-xl shadow-2xl overflow-hidden">
            <!-- Search input -->
            <div class="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
              <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search cheatcodes..."
                class="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none text-lg"
                @input="handleSearch"
              />
              <kbd class="kbd">ESC</kbd>
            </div>

            <!-- Results -->
            <div class="max-h-[60vh] overflow-y-auto">
              <div v-if="searchQuery.length < 2" class="p-8 text-center text-[var(--color-text-muted)]">
                Type at least 2 characters to search
              </div>

              <div v-else-if="results.length === 0" class="p-8 text-center text-[var(--color-text-muted)]">
                No results found for "{{ searchQuery }}"
              </div>

              <div v-else class="py-2">
                <button
                  v-for="(result, index) in results"
                  :key="`${result.cheatcodeId}-${result.sectionId}-${index}`"
                  class="w-full px-4 py-3 flex items-start gap-3 hover:bg-[var(--color-bg-tertiary)] transition-colors text-left"
                  :class="{ 'bg-[var(--color-bg-tertiary)]': index === selectedIndex }"
                  @click="navigateToResult(result)"
                  @mouseenter="selectedIndex = index"
                >
                  <!-- Icon -->
                  <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-bg-tertiary)] text-sm font-medium">
                    {{ result.cheatcodeIcon || getTypeIcon(result.type) }}
                  </span>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-[var(--color-text-primary)]">
                        {{ result.sectionTitle }}
                      </span>
                      <span
                        class="px-1.5 py-0.5 text-xs rounded"
                        :class="{
                          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300': result.type === 'title',
                          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300': result.type === 'code',
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300': result.type === 'content'
                        }"
                      >
                        {{ result.type }}
                      </span>
                    </div>
                    <p class="text-sm text-[var(--color-text-secondary)] truncate mt-0.5">
                      {{ result.snippet }}
                    </p>
                    <div class="flex items-center gap-1 mt-1 text-xs text-[var(--color-text-muted)]">
                      <span v-for="(p, i) in result.path" :key="i">
                        {{ p }}
                        <span v-if="i < result.path.length - 1" class="mx-1">/</span>
                      </span>
                    </div>
                  </div>

                  <!-- Arrow -->
                  <svg class="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                  <kbd class="kbd">↑</kbd>
                  <kbd class="kbd">↓</kbd>
                  to navigate
                </span>
                <span class="flex items-center gap-1">
                  <kbd class="kbd">Enter</kbd>
                  to select
                </span>
              </div>
              <span>{{ results.length }} results</span>
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
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
