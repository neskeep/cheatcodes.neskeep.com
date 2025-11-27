<script setup lang="ts">
import type { PackageManager } from '~/composables/usePackageManager'

interface PackageCommand {
  npm?: string
  pnpm?: string
  yarn?: string
  bun?: string
}

const props = defineProps<{
  commands: PackageCommand
  title?: string
}>()

// Use shared package manager state with hydration-safe approach
const { selectedManager, isHydrated, setPackageManager, ensureHydrated } = usePackageManager()

const isCopied = ref(false)

// Package manager config
const managers: { id: PackageManager; label: string }[] = [
  { id: 'npm', label: 'npm' },
  { id: 'pnpm', label: 'pnpm' },
  { id: 'yarn', label: 'yarn' },
  { id: 'bun', label: 'bun' },
]

// Filter to only show managers that have commands
const availableManagers = computed(() => {
  return managers.filter(m => props.commands[m.id])
})

// Get the active manager for this component (fallback if selected not available)
const activeManager = computed(() => {
  if (props.commands[selectedManager.value]) {
    return selectedManager.value
  }
  // Fallback to first available
  const first = availableManagers.value[0]
  return first?.id || 'npm'
})

// Get current command
const currentCommand = computed(() => {
  return props.commands[activeManager.value] || ''
})

// Copy to clipboard
const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(currentCommand.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

// Hydration sync - deferred to prevent mismatch
onMounted(() => {
  ensureHydrated()
})
</script>

<template>
  <div class="my-4">
    <h4 v-if="title" class="text-sm font-medium text-gray-300 mb-2">
      {{ title }}
    </h4>

    <div class="rounded-lg border border-border/50 overflow-hidden bg-[#1a1b26]">
      <!-- Tabs -->
      <div class="flex items-center border-b border-border/50 bg-surface/30">
        <button
          v-for="manager in availableManagers"
          :key="manager.id"
          @click="setPackageManager(manager.id)"
          class="px-4 py-2.5 text-sm font-medium transition-all relative"
          :class="activeManager === manager.id
            ? 'text-brand'
            : 'text-gray-500 hover:text-gray-300'"
        >
          {{ manager.label }}
          <!-- Active indicator -->
          <span
            v-if="activeManager === manager.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
          />
        </button>

        <!-- Copy button -->
        <button
          @click="copyCommand"
          class="ml-auto mr-2 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
          :class="isCopied
            ? 'bg-green-500/20 text-green-400'
            : 'text-gray-500 hover:text-gray-300 hover:bg-surface/50'"
        >
          <svg v-if="isCopied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {{ isCopied ? 'Copiado!' : 'Copiar' }}
        </button>
      </div>

      <!-- Command display -->
      <div class="p-4 font-mono text-sm text-gray-300 overflow-x-auto">
        <code>{{ currentCommand }}</code>
      </div>
    </div>
  </div>
</template>
