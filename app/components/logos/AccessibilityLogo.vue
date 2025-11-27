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
    <!-- Accessibility universal symbol -->
    <circle cx="12" cy="12" r="10" stroke="#0066CC" stroke-width="2" fill="none"/>
    <circle cx="12" cy="7" r="2" fill="#0066CC"/>
    <path d="M12 10v4M12 14l-3 4M12 14l3 4M8 12h8" stroke="#0066CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>
