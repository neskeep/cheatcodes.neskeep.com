<script setup lang="ts">
// Redirect /app/cheatcodes/ to /app
definePageMeta({
  middleware: 'auth'
})

// Perform redirect
await navigateTo('/app', { replace: true })
</script>

<template>
  <div class="min-h-screen bg-bg flex items-center justify-center">
    <p class="text-gray-400">Redirigiendo...</p>
  </div>
</template>
