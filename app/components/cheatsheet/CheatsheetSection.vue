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
  <section :id="isRoot ? sectionAnchor : undefined" class="scroll-mt-24">
    <!-- Section header -->
    <h2
      v-if="isRoot"
      class="text-xl font-semibold text-white mb-4 flex items-center gap-3 group"
    >
      <span class="w-1 h-6 bg-brand rounded-full"></span>
      <span>{{ section.title }}</span>
      <a
        :href="`#${sectionAnchor}`"
        class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-brand transition-opacity"
        aria-label="Link to section"
      >
        #
      </a>
    </h2>
    <h3
      v-else
      class="text-lg font-medium text-gray-200 mb-3"
    >
      {{ section.title }}
    </h3>

    <!-- Text content -->
    <p v-if="section.type === 'text' && section.content" class="text-gray-400 leading-relaxed">
      {{ section.content }}
    </p>

    <!-- List content -->
    <ul v-if="section.type === 'list' && section.items" class="space-y-2 ml-1">
      <li v-for="(item, index) in section.items" :key="index" class="flex items-start gap-3 text-gray-400">
        <span class="w-1.5 h-1.5 mt-2.5 bg-brand rounded-full shrink-0"></span>
        <span class="leading-relaxed">{{ item }}</span>
      </li>
    </ul>

    <!-- Code block -->
    <CheatsheetCodeBlock v-if="section.type === 'code' && section.code" :code="section.code" />

    <!-- Package install tabs -->
    <CheatsheetPackageManagerTabs
      v-if="section.type === 'package-install' && section.packageCommands"
      :commands="section.packageCommands"
    />

    <!-- Table -->
    <CheatsheetTable v-if="section.type === 'table' && section.table" :table="section.table" />

    <!-- Subsections -->
    <div v-if="section.subsections" class="mt-6 space-y-6 pl-4 border-l border-border/50">
      <CheatsheetSection
        v-for="subsection in section.subsections"
        :key="subsection.id"
        :section="subsection"
      />
    </div>
  </section>
</template>
