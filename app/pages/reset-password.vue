<script setup lang="ts">
// Page meta
definePageMeta({
  layout: false
})

useHead({
  title: 'Nueva contraseña | Cheatcodes by Neskeep',
  meta: [
    { name: 'description', content: 'Establece tu nueva contraseña' },
  ],
})

// Auth state
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const isProcessing = ref(true)
const isSessionReady = ref(false)
const error = ref('')
const successMessage = ref('')

// Handle password reset session on mount
onMounted(async () => {
  // For password reset, Supabase sends a hash fragment with access_token
  // or a code that needs the original code_verifier (PKCE)
  // The @nuxtjs/supabase module handles the hash automatically

  // First check if there's already a session (from hash fragment processing)
  const { data: sessionData } = await supabase.auth.getSession()

  if (sessionData.session) {
    // Session exists - user can update password
    isSessionReady.value = true
    isProcessing.value = false
    return
  }

  // Check for hash fragment (implicit flow)
  if (typeof window !== 'undefined' && window.location.hash) {
    // Hash contains access_token - Supabase client should handle this
    // Wait a moment for the auth state to update
    await new Promise(resolve => setTimeout(resolve, 500))

    const { data: retrySession } = await supabase.auth.getSession()
    if (retrySession.session) {
      isSessionReady.value = true
      isProcessing.value = false
      return
    }
  }

  // Check for code in query params
  const code = route.query.code as string

  if (code) {
    try {
      // Try to exchange code - this requires code_verifier from the same browser session
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Exchange error:', exchangeError)
        // Code exchange failed - likely opened in different browser or code_verifier expired
        error.value = 'El enlace de recuperación debe abrirse en el mismo navegador donde lo solicitaste. Si el problema persiste, solicita un nuevo enlace.'
      } else {
        isSessionReady.value = true
      }
    } catch (e) {
      console.error('Code exchange error:', e)
      error.value = 'Ocurrió un error al procesar el enlace de recuperación.'
    }
  } else {
    // No session, no hash, no code
    error.value = 'No se encontró un enlace de recuperación válido. Solicita uno nuevo desde la página de inicio de sesión.'
  }

  isProcessing.value = false
})

// Handle password update
const handleUpdatePassword = async () => {
  if (!password.value || !confirmPassword.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.updateUser({
      password: password.value,
    })

    if (authError) {
      error.value = authError.message
    } else {
      successMessage.value = '¡Contraseña actualizada correctamente!'
      setTimeout(() => {
        router.push('/app')
      }, 2000)
    }
  } catch (e) {
    error.value = 'Ocurrió un error inesperado'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0C0F1C] text-white flex flex-col">
    <!-- Particles Background -->
    <ParticlesBackground />

    <!-- Main content -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
      <!-- Processing state -->
      <div v-if="isProcessing" class="text-center">
        <div class="animate-spin w-12 h-12 border-4 border-[#00C9D4] border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-400">Verificando enlace de recuperación...</p>
      </div>

      <div v-else class="w-full max-w-md">
        <!-- Card -->
        <div class="bg-[#1A1E2A]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold mb-2">Nueva contraseña</h1>
            <p class="text-gray-400 text-sm">
              Ingresa tu nueva contraseña
            </p>
          </div>

          <!-- Success message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-[#A6FF3A]/10 border border-[#A6FF3A]/20 rounded-lg text-[#A6FF3A] text-sm text-center"
          >
            <svg class="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ successMessage }}
            <p class="text-gray-400 mt-2 text-xs">Redirigiendo...</p>
          </div>

          <!-- Error message (when session not ready) -->
          <div
            v-if="error && !isSessionReady"
            class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
          >
            <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 class="text-xl font-bold text-white mb-2">Enlace inválido</h2>
            <p class="text-red-400 text-sm mb-4">{{ error }}</p>
            <NuxtLink
              to="/login"
              class="text-[#00C9D4] hover:underline font-medium"
            >
              Solicitar nuevo enlace
            </NuxtLink>
          </div>

          <!-- Error message (form validation errors) -->
          <div
            v-if="error && isSessionReady"
            class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {{ error }}
          </div>

          <!-- Form (only show when session is ready) -->
          <form v-if="!successMessage && isSessionReady" @submit.prevent="handleUpdatePassword" class="space-y-4">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
                Nueva contraseña
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 bg-[#0C0F1C] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00C9D4] transition-colors"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="w-full px-4 py-3 bg-[#0C0F1C] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00C9D4] transition-colors"
                placeholder="Repite tu contraseña"
              />
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#00C9D4] hover:bg-[#00e5f2] text-[#0C0F1C] font-semibold py-3 rounded-lg transition-all hover:shadow-[0_0_25px_rgba(0,201,212,0.4)] disabled:opacity-50"
            >
              <span v-if="isLoading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Actualizando...
              </span>
              <span v-else>Actualizar contraseña</span>
            </button>
          </form>

          <!-- Login link (only show when session is ready or after success) -->
          <div v-if="isSessionReady || successMessage" class="mt-6 text-center text-sm text-gray-400">
            <NuxtLink
              to="/login"
              class="text-[#00C9D4] hover:underline font-medium"
            >
              Volver a iniciar sesión
            </NuxtLink>
          </div>
        </div>

        <!-- Back to home -->
        <div class="mt-6 text-center">
          <NuxtLink
            to="/"
            class="text-sm text-gray-500 hover:text-[#00C9D4] transition-colors inline-flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
