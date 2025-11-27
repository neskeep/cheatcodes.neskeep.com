<script setup lang="ts">
// Redirect if already logged in
const user = useSupabaseUser()
const router = useRouter()

watch(user, (newUser) => {
  if (newUser) {
    router.push('/app')
  }
}, { immediate: true })

// Page meta
definePageMeta({
  layout: false
})

useHead({
  title: 'Iniciar sesión | Cheatcodes by Neskeep',
  meta: [
    { name: 'description', content: 'Inicia sesión para acceder a tus cheatcodes de programación' },
  ],
})

// Auth state
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')
const showForgotPassword = ref(false)
const successMessage = ref('')

// Handle login
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor completa todos los campos'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (authError) {
      if (authError.message === 'Invalid login credentials') {
        error.value = 'Email o contraseña incorrectos'
      } else if (authError.message === 'Email not confirmed') {
        error.value = 'Por favor confirma tu email antes de iniciar sesión'
      } else {
        error.value = authError.message
      }
    }
  } catch (e) {
    error.value = 'Ocurrió un error inesperado'
  } finally {
    isLoading.value = false
  }
}

// Handle forgot password
const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = 'Por favor ingresa tu email'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (authError) {
      error.value = authError.message
    } else {
      successMessage.value = '¡Revisa tu email para el link de recuperación!'
      showForgotPassword.value = false
    }
  } catch (e) {
    error.value = 'Ocurrió un error inesperado'
  } finally {
    isLoading.value = false
  }
}

// Handle OAuth
const handleOAuth = async (provider: 'google') => {
  isLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/confirm`,
      },
    })

    if (authError) {
      error.value = authError.message
    }
  } catch (e) {
    error.value = 'Ocurrió un error inesperado'
  } finally {
    isLoading.value = false
  }
}

// Form submission
const handleSubmit = () => {
  if (showForgotPassword.value) {
    handleForgotPassword()
  } else {
    handleLogin()
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0C0F1C] text-white flex flex-col">
    <!-- Particles Background -->
    <ParticlesBackground />

    <!-- Main content -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Card -->
        <div class="bg-[#1A1E2A]/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold mb-2">
              {{ showForgotPassword ? 'Recuperar contraseña' : 'Bienvenido de vuelta' }}
            </h1>
            <p class="text-gray-400 text-sm">
              {{ showForgotPassword ? 'Ingresa tu email para recuperar tu contraseña' : 'Inicia sesión para acceder a tus cheatcodes' }}
            </p>
          </div>

          <!-- Success message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-[#A6FF3A]/10 border border-[#A6FF3A]/20 rounded-lg text-[#A6FF3A] text-sm"
          >
            {{ successMessage }}
          </div>

          <!-- Error message -->
          <div
            v-if="error"
            class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {{ error }}
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full px-4 py-3 bg-[#0C0F1C] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00C9D4] transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div v-if="!showForgotPassword">
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 bg-[#0C0F1C] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00C9D4] transition-colors"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <!-- Forgot password link -->
            <div v-if="!showForgotPassword" class="text-right">
              <button
                type="button"
                @click="showForgotPassword = true; error = ''; successMessage = ''"
                class="text-sm text-[#00C9D4] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
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
                Cargando...
              </span>
              <span v-else>
                {{ showForgotPassword ? 'Enviar link de recuperación' : 'Iniciar sesión' }}
              </span>
            </button>
          </form>

          <!-- Back to login from forgot password -->
          <div v-if="showForgotPassword" class="mt-4 text-center">
            <button
              @click="showForgotPassword = false; error = ''; successMessage = ''"
              class="text-sm text-[#00C9D4] hover:underline"
            >
              Volver a iniciar sesión
            </button>
          </div>

          <!-- Divider -->
          <div v-if="!showForgotPassword" class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-[#1A1E2A]/50 text-gray-500">o continúa con</span>
            </div>
          </div>

          <!-- Google OAuth -->
          <button
            v-if="!showForgotPassword"
            type="button"
            :disabled="isLoading"
            @click="handleOAuth('google')"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 rounded-lg transition-all disabled:opacity-50"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>

          <!-- Register link -->
          <div v-if="!showForgotPassword" class="mt-6 text-center text-sm text-gray-400">
            ¿No tienes cuenta?
            <NuxtLink
              to="/registro"
              class="text-[#00C9D4] hover:underline font-medium ml-1"
            >
              Regístrate
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
