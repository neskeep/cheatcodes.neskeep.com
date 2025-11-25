<script setup lang="ts">
import type { CheatcodeMetadata } from '~/types/cheatcode'

const props = defineProps<{
  metadata: CheatcodeMetadata
}>()

// Use the cheatcode color or default to blue
const headerStyle = computed(() => ({
  background: `linear-gradient(135deg, ${props.metadata.color || '#3b82f6'}, ${adjustColor(props.metadata.color || '#3b82f6', -20)})`,
}))

// Darken a hex color
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '')
  const num = parseInt(hex, 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount))
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`
}
</script>

<template>
  <div class="text-white p-6 sm:p-8" :style="headerStyle">
    <div class="flex items-center gap-4">
      <!-- Logo or Icon -->
      <div v-if="metadata.logo || metadata.icon" class="shrink-0">
        <img
          v-if="metadata.logo"
          :src="metadata.logo"
          :alt="`${metadata.title} logo`"
          class="w-16 h-16 object-contain"
        />
        <div v-else-if="metadata.icon" class="text-5xl sm:text-6xl">
          {{ metadata.icon }}
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h1 class="text-2xl sm:text-4xl font-bold mb-2 truncate">
          {{ metadata.title }}
        </h1>
        <p class="text-white/80 text-sm sm:text-lg mb-2 line-clamp-2">
          {{ metadata.description }}
        </p>
        <div class="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
          <span v-if="metadata.version" class="bg-white/20 px-2 py-0.5 rounded">
            v{{ metadata.version }}
          </span>
          <span>{{ metadata.lastUpdated }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
