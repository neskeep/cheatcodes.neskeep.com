<script setup>
const user = useSupabaseUser()
const isMenuOpen = ref(false)

const navigation = [
  { name: 'Cheatcodes', href: '/app/cheatcodes' },
  { name: 'Pricing', href: '/pricing' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-border/50">
    <UiContainer>
      <nav class="flex items-center justify-between py-4" aria-label="Main navigation">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Home - Neskeep Cheatcodes"
        >
          <Logo size="lg" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="relative text-gray-300 hover:text-brand transition-colors font-medium py-1"
            active-class="text-brand"
          >
            {{ item.name }}
            <span
              class="absolute -bottom-1 left-0 h-0.5 bg-brand transition-all duration-300 w-0"
            />
          </NuxtLink>

          <!-- Auth buttons -->
          <template v-if="user">
            <NuxtLink
              to="/app"
              class="inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none rounded-lg px-4 py-2 text-sm btn-glow text-bg shadow-lg hover:shadow-xl"
            >
              Dashboard
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="text-gray-300 hover:text-brand transition-colors font-medium"
            >
              Iniciar sesion
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none rounded-lg px-4 py-2 text-sm btn-glow text-bg shadow-lg hover:shadow-xl"
            >
              Empezar gratis
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2 text-gray-300 hover:text-brand transition-colors"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
        >
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMenuOpen"
          class="md:hidden pb-4 space-y-3"
        >
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block px-4 py-2 text-gray-300 hover:text-brand hover:bg-surface/50 rounded-lg transition-all"
            active-class="text-brand bg-brand/10 border-l-2 border-brand"
            @click="closeMenu"
          >
            {{ item.name }}
          </NuxtLink>

          <div class="px-4 pt-2 space-y-3">
            <template v-if="user">
              <NuxtLink
                to="/app"
                class="inline-flex items-center justify-center font-semibold transition-all duration-300 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none rounded-lg px-4 py-2 text-sm btn-glow text-bg shadow-lg hover:shadow-xl"
                @click="closeMenu"
              >
                Dashboard
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="block w-full text-center text-gray-300 hover:text-brand transition-colors font-medium py-2"
                @click="closeMenu"
              >
                Iniciar sesion
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="inline-flex items-center justify-center font-semibold transition-all duration-300 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none rounded-lg px-4 py-2 text-sm btn-glow text-bg shadow-lg hover:shadow-xl"
                @click="closeMenu"
              >
                Empezar gratis
              </NuxtLink>
            </template>
          </div>
        </div>
      </Transition>
    </UiContainer>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-20" aria-hidden="true"></div>
</template>
