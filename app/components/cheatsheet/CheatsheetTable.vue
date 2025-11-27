<script setup lang="ts">
import type { ContentTable } from '~/types/cheatcode'

defineProps<{
  table: ContentTable
}>()

// Helper to detect if content looks like code
const isCodeLike = (text: string) => {
  if (!text) return false
  return text.includes('(') || text.includes('{') || text.includes('[') || text.startsWith('.')
}
</script>

<template>
  <div class="my-4">
    <h4 v-if="table.title" class="text-sm font-medium text-gray-300 mb-3">
      {{ table.title }}
    </h4>
    <div class="overflow-x-auto rounded-lg border border-border/50">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-surface/50">
            <th
              v-for="header in table.headers"
              :key="header"
              class="border-b border-border/50 px-4 py-3 text-left font-medium text-gray-300 text-xs uppercase tracking-wider"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border/30">
          <tr
            v-for="(row, index) in table.rows"
            :key="index"
            class="hover:bg-surface/30 transition-colors"
          >
            <td
              v-for="header in table.headers"
              :key="header"
              class="px-4 py-3 text-gray-400"
            >
              <code
                v-if="isCodeLike(row[header])"
                class="text-xs bg-brand/10 text-brand px-1.5 py-0.5 rounded font-mono"
              >
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
