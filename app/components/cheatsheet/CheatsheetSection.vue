<script setup lang="ts">
import type { CheatcodeSection } from '~/types/cheatcode'

const props = defineProps<{
  section: CheatcodeSection
  isRoot?: boolean
}>()

// Genera el ID de ancla para la sección
const sectionAnchor = computed(() => `section-${props.section.id}`)
</script>

<template>
  <div :id="isRoot ? sectionAnchor : undefined" class="cheatsheet-section mb-6 scroll-mt-20">
    <h2 class="text-xl font-bold text-(--color-text-primary) mb-3 border-b-2 border-(--color-accent) pb-2 flex items-center gap-2">
      <span class="w-1 h-6 bg-(--color-accent) rounded-full"></span>
      {{ section.title }}
    </h2>

    <!-- Text content -->
    <div v-if="section.type === 'text' && section.content" class="text-(--color-text-secondary) leading-relaxed">
      {{ section.content }}
    </div>

    <!-- List content -->
    <ul v-if="section.type === 'list' && section.items" class="space-y-2 text-(--color-text-secondary) ml-2">
      <li v-for="(item, index) in section.items" :key="index" class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 mt-2 bg-(--color-accent) rounded-full shrink-0"></span>
        <span class="leading-relaxed">{{ item }}</span>
      </li>
    </ul>

    <!-- Code block -->
    <CheatsheetCodeBlock v-if="section.type === 'code' && section.code" :code="section.code" />

    <!-- Table -->
    <CheatsheetTable v-if="section.type === 'table' && section.table" :table="section.table" />

    <!-- Subsections -->
    <div v-if="section.subsections" class="ml-4 mt-4 space-y-4 pl-4 border-l-2 border-(--color-border)">
      <CheatsheetSection
        v-for="subsection in section.subsections"
        :key="subsection.id"
        :section="subsection"
      />
    </div>
  </div>
</template>
