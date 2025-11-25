<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  href: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const component = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
  return { type: 'button', disabled: props.disabled }
})

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none'

  const sizes = {
    sm: 'rounded-lg px-4 py-2 text-sm',
    md: 'rounded-xl px-6 py-3 text-base',
    lg: 'rounded-xl px-8 py-4 text-lg',
    xl: 'rounded-2xl px-10 py-5 text-xl'
  }

  const variants = {
    primary: 'btn-glow text-bg shadow-lg hover:shadow-xl',
    secondary: 'bg-surface text-white border border-border hover:border-brand/60 hover:shadow-glow-sm',
    outline: 'btn-outline shadow-lg hover:shadow-xl',
    ghost: 'text-brand hover:bg-brand/10'
  }

  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>

<template>
  <component
    :is="component"
    v-bind="componentProps"
    :class="classes"
  >
    <slot />
  </component>
</template>
