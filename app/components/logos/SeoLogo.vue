<script setup>
defineProps({
  size: {
    type: String,
    default: '24'
  }
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- SEO / Search optimization icon -->
    <circle cx="11" cy="11" r="6" stroke="#47A248" stroke-width="2" fill="none"/>
    <path d="M15.5 15.5L20 20" stroke="#47A248" stroke-width="2" stroke-linecap="round"/>
    <path d="M11 8v6M8 11h6" stroke="#47A248" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>
