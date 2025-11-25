<script setup>
defineProps({
  maxWidth: {
    type: String,
    default: '7xl',
    validator: (value) => ['5xl', '6xl', '7xl', '8xl', 'full'].includes(value)
  },
  padding: {
    type: Boolean,
    default: true
  }
})

const maxWidthClasses = {
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  '8xl': 'max-w-[88rem]',
  'full': 'max-w-full'
}
</script>

<template>
  <div
    :class="[
      'mx-auto',
      maxWidthClasses[maxWidth],
      padding && 'px-4 sm:px-6 lg:px-8'
    ]"
  >
    <slot />
  </div>
</template>
