<script setup lang="ts">
defineEmits<{
  click: []
}>()

const isMac = ref(false)

onMounted(() => {
  isMac.value = navigator.platform.toUpperCase().indexOf('MAC') >= 0
})
</script>

<template>
  <button
    @click="$emit('click')"
    class="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border)] rounded-lg transition-colors border border-[var(--color-border)]"
  >
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <span class="hidden sm:inline">Search...</span>
    <div class="hidden sm:flex items-center gap-1 ml-2">
      <kbd class="kbd">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
      <kbd class="kbd">K</kbd>
    </div>
  </button>
</template>
