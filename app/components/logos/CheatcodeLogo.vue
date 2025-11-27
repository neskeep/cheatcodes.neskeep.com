<script setup lang="ts">
const props = defineProps<{
  id: string
  size?: string
  fallbackIcon?: string
}>()

// Map of cheatcode IDs to their logo components
const logoComponents: Record<string, any> = {
  javascript: resolveComponent('LogosJavaScriptLogo'),
  vue: resolveComponent('LogosVueLogo'),
  html: resolveComponent('LogosHtmlLogo'),
  css: resolveComponent('LogosCssLogo'),
  accessibility: resolveComponent('LogosAccessibilityLogo'),
  seo: resolveComponent('LogosSeoLogo'),
  react: resolveComponent('LogosReactLogo'),
  typescript: resolveComponent('LogosTypeScriptLogo'),
  tailwind: resolveComponent('LogosTailwindLogo'),
  node: resolveComponent('LogosNodeLogo'),
  git: resolveComponent('LogosGitLogo'),
  nuxt: resolveComponent('LogosNuxtLogo'),
  next: resolveComponent('LogosNextLogo'),
  php: resolveComponent('LogosPhpLogo'),
}

const logoComponent = computed(() => logoComponents[props.id])
const hasLogo = computed(() => !!logoComponent.value)
</script>

<template>
  <component
    v-if="hasLogo"
    :is="logoComponent"
    :size="size || '24'"
  />
  <span v-else class="text-sm">{{ fallbackIcon || '📄' }}</span>
</template>
