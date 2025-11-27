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
    <!-- Title and description -->
    <div v-if="code.title || code.description" class="mb-2">
      <h4 v-if="code.title" class="text-sm font-medium text-gray-300">
        {{ code.title }}
      </h4>
      <p v-if="code.description" class="text-sm text-gray-500 mt-1">
        {{ code.description }}
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="bg-[#1a1b26] rounded-lg overflow-hidden p-4 border border-border/50">
      <div class="animate-pulse h-24 bg-gray-800/50 rounded"></div>
    </div>

    <!-- Code block with copy button -->
    <div v-else class="group relative rounded-lg overflow-hidden border border-border/50 bg-[#1a1b26]">
      <!-- Copy button -->
      <button
        @click="copyCode"
        class="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
        :class="isCopied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-surface/80 text-gray-400 border border-border/50 opacity-0 group-hover:opacity-100 hover:text-white hover:border-brand/50'"
      >
        <svg v-if="isCopied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {{ isCopied ? 'Copiado!' : 'Copiar' }}
      </button>

      <!-- Language badge -->
      <span
        v-if="code.language"
        class="absolute top-3 left-3 text-[10px] font-medium uppercase tracking-wider text-gray-500 bg-surface/50 px-2 py-0.5 rounded"
      >
        {{ code.language }}
      </span>

      <!-- Code content -->
      <div
        class="code-block pt-10"
        v-html="highlightedCode"
      />
    </div>
  </div>
</template>

<style>
.code-block pre {
  margin: 0;
  padding: 1rem;
  padding-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.7;
  overflow-x: auto;
  background: transparent !important;
}

.code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace;
}

/* Custom scrollbar for code blocks */
.code-block pre::-webkit-scrollbar {
  height: 6px;
}

.code-block pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.code-block pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.code-block pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
