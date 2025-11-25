<script setup lang="ts">
import type { CodeExample } from '~/types/cheatcode'

const props = defineProps<{
  code: CodeExample
}>()

const { highlightCode } = useCodeHighlight()

const highlightedCode = ref('')
const isLoading = ref(true)
const isCopied = ref(false)

onMounted(async () => {
  try {
    const lang = props.code.language || 'javascript'
    highlightedCode.value = await highlightCode(props.code.code, lang)
  } catch (error) {
    console.error('Failed to highlight code:', error)
    highlightedCode.value = `<pre><code>${props.code.code}</code></pre>`
  } finally {
    isLoading.value = false
  }
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}
</script>

<template>
  <div class="my-4">
    <h4 v-if="code.title" class="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
      {{ code.title }}
    </h4>
    <p v-if="code.description" class="text-sm text-[var(--color-text-secondary)] mb-2">
      {{ code.description }}
    </p>
    <div v-if="isLoading" class="bg-[var(--color-code-bg)] rounded-lg overflow-hidden p-4">
      <div class="animate-pulse h-32 bg-gray-800 rounded"></div>
    </div>
    <div v-else class="code-block-wrapper">
      <button
        @click="copyCode"
        class="copy-button"
        :class="{ copied: isCopied }"
      >
        <span v-if="isCopied" class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </span>
        <span v-else class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </span>
      </button>
      <div
        class="rounded-lg overflow-hidden code-block"
        v-html="highlightedCode"
      />
    </div>
  </div>
</template>

<style>
.code-block pre {
  margin: 0;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
}

.code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}
</style>
