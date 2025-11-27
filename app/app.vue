<script setup lang="ts">
// Inject inline script to prevent flash of unstyled content (FOUC)
// This runs before Vue hydration to set the correct theme immediately
useHead({
  script: [
    {
      innerHTML: `
        (function() {
          const saved = localStorage.getItem('darkMode');
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          // Default to dark mode (brand design is dark-first)
          const isDark = saved ? saved === 'dark' : true;
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
      tagPosition: 'head',
    },
  ],
})

// Initialize dark mode state on client
const { loadPreference } = useDarkMode()

onMounted(() => {
  loadPreference()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
