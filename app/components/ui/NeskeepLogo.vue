<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Neskeep Logo Mark -->
    <div
      class="relative flex items-center justify-center"
      :class="{
        'w-6 h-6': size === 'sm',
        'w-8 h-8': size === 'md' || !size,
        'w-10 h-10': size === 'lg'
      }"
    >
      <!-- Outer glow effect -->
      <div class="absolute inset-0 bg-[#00C9D4] rounded-lg opacity-20 blur-sm" />

      <!-- Main logo container -->
      <div
        class="relative bg-gradient-to-br from-[#00C9D4] to-[#00a8b3] rounded-lg flex items-center justify-center"
        :class="{
          'w-6 h-6': size === 'sm',
          'w-8 h-8': size === 'md' || !size,
          'w-10 h-10': size === 'lg'
        }"
      >
        <!-- N letter stylized -->
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="text-white"
          :class="{
            'w-4 h-4': size === 'sm',
            'w-5 h-5': size === 'md' || !size,
            'w-6 h-6': size === 'lg'
          }"
        >
          <path
            d="M6 18V6L12 12L18 6V18"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Text -->
    <span
      v-if="showText !== false"
      class="font-bold tracking-tight text-[var(--color-text-primary)]"
      :class="{
        'text-lg': size === 'sm',
        'text-xl': size === 'md' || !size,
        'text-2xl': size === 'lg'
      }"
    >
      <span class="text-[#00C9D4]">nes</span><span>keep</span>
    </span>
  </div>
</template>
