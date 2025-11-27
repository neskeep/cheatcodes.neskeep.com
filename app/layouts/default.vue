<script setup lang="ts">
// Search modal state shared between Nav and pages
const isSearchOpen = ref(false)

// Provide the search state to child components
provide('searchOpen', isSearchOpen)

const openSearch = () => {
  isSearchOpen.value = true
}

// Check if we're in the app section
const route = useRoute()
const isAppPage = computed(() => route.path.startsWith('/app'))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <Nav @open-search="openSearch" />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter v-if="isAppPage" />
    <Footer v-else />
  </div>
</template>
