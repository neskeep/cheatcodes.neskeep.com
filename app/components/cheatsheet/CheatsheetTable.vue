<script setup lang="ts">
import type { ContentTable } from '~/types/cheatcode'

defineProps<{
  table: ContentTable
}>()
</script>

<template>
  <div class="my-4">
    <h4 v-if="table.title" class="text-sm font-semibold text-(--color-text-primary) mb-2">
      {{ table.title }}
    </h4>
    <div class="overflow-x-auto rounded-lg border border-(--color-border)">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-(--color-bg-tertiary)">
            <th
              v-for="header in table.headers"
              :key="header"
              class="border-b border-(--color-border) px-4 py-3 text-left font-semibold text-(--color-text-primary)"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in table.rows"
            :key="index"
            class="hover:bg-(--color-bg-tertiary) transition-colors"
          >
            <td
              v-for="header in table.headers"
              :key="header"
              class="border-b border-(--color-border) px-4 py-3 text-(--color-text-secondary)"
            >
              <code v-if="row[header] && (row[header].includes('(') || row[header].includes('{'))" class="text-xs bg-(--color-code-bg) text-(--color-code-text) px-1.5 py-0.5 rounded font-mono">
                {{ row[header] }}
              </code>
              <span v-else>{{ row[header] || '' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
