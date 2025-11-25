<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border/50 bg-surface/20 relative">
    <UiContainer>
      <div class="py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Brand Column -->
          <div class="md:col-span-2">
            <NuxtLink to="/" class="inline-block mb-4">
              <Logo size="lg" />
            </NuxtLink>
            <p class="text-gray-400 mb-6 max-w-md">
              Cheatsheets profesionales para desarrolladores. Aprende, practica y domina cualquier lenguaje.
            </p>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="font-semibold text-white mb-4">Contacto</h3>
            <div class="space-y-2 text-gray-400 text-sm">
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@neskeep.com" class="hover:text-brand transition-colors">
                  hello@neskeep.com
                </a>
              </p>
              <p class="flex items-center gap-2">
                <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Republica Dominicana
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-sm">
            &copy; {{ currentYear }} Neskeep. Todos los derechos reservados.
          </p>
          <div class="flex items-center gap-4 text-gray-500 text-sm">
            <p>Hecho con <span class="text-brand">codigo</span> y datos.</p>
            <span class="text-gray-600">|</span>
            <NuxtLink to="/privacy" class="hover:text-brand transition-colors">
              Privacidad
            </NuxtLink>
            <span class="text-gray-600">|</span>
            <NuxtLink to="/terms" class="hover:text-brand transition-colors">
              Terminos
            </NuxtLink>
          </div>
        </div>
      </div>
    </UiContainer>
  </footer>
</template>
