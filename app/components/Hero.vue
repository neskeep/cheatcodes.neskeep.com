<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  align: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center'].includes(value)
  },
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  }
})

const alignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center'
}

const sizeClasses = {
  small: 'min-h-[40vh] py-16',
  medium: 'min-h-[50vh] py-20',
  large: 'min-h-[70vh] py-24',
  xlarge: 'min-h-[90vh] py-32'
}

const titleClasses = {
  small: 'text-3xl md:text-4xl lg:text-5xl',
  medium: 'text-4xl md:text-5xl lg:text-6xl',
  large: 'text-5xl md:text-6xl lg:text-7xl',
  xlarge: 'text-6xl md:text-7xl lg:text-8xl'
}
</script>

<template>
  <section
    :class="[
      sizeClasses[size],
      'relative flex flex-col justify-center overflow-hidden'
    ]"
  >
    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />

    <UiContainer>
      <div
        :class="[
          'flex flex-col space-y-6 relative z-10',
          alignClasses[align]
        ]"
      >
        <h1
          :class="[
            titleClasses[size],
            'font-bold text-white leading-tight max-w-5xl',
            align === 'center' && 'mx-auto'
          ]"
          v-html="title"
          data-reveal
        />

        <p
          v-if="subtitle"
          :class="[
            'text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl',
            align === 'center' && 'mx-auto'
          ]"
          data-reveal
          data-delay="100ms"
        >
          {{ subtitle }}
        </p>

        <div
          v-if="$slots.actions"
          :class="[
            'flex flex-wrap gap-4 pt-4',
            align === 'center' && 'justify-center'
          ]"
          data-reveal
          data-delay="200ms"
        >
          <slot name="actions" />
        </div>
      </div>
    </UiContainer>
  </section>
</template>

