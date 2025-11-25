<script setup lang="ts">
import type { Cheatcode } from '~/types/cheatcode'

defineProps<{
  cheatcode: Cheatcode
}>()
</script>

<template>
  <div class="cheatsheet-container bg-(--color-bg-primary) shadow-lg rounded-xl overflow-hidden">
    <!-- Header -->
    <CheatsheetHeader :metadata="cheatcode.metadata" />

    <!-- Content -->
    <div class="p-6 sm:p-8">
      <!-- Secciones -->
      <CheatsheetSection
        v-for="section in cheatcode.sections"
        :key="section.id"
        :section="section"
        :is-root="true"
      />
    </div>

    <!-- Footer -->
    <div class="p-4 bg-(--color-bg-tertiary) text-center text-sm text-(--color-text-muted)">
      <p>Cheatcodes Platform • Last updated {{ cheatcode.metadata.lastUpdated }}</p>
    </div>
  </div>
</template>
