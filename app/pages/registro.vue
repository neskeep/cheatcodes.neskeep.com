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
  title: 'Crear cuenta | Cheatcodes by Neskeep',
  meta: [
    { name: 'description', content: 'Crea tu cuenta y obtén acceso a cheatcodes de programación de alta calidad' },
  ],
})

// Auth state
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const error = ref('')
const successMessage = ref('')

// Handle register
const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
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
    const { error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    })

    if (authError) {
      if (authError.message === 'User already registered') {
        error.value = 'Este email ya está registrado. ¿Quieres iniciar sesión?'
      } else {
        error.value = authError.message
      }
    } else {
      successMessage.value = '¡Cuenta creada! Revisa tu email para confirmar tu cuenta.'
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
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
            <h1 class="text-2xl font-bold mb-2">Crear cuenta</h1>
            <p class="text-gray-400 text-sm">
              Obtén acceso de por vida a todos los cheatcodes
            </p>
          </div>

          <!-- Success message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-[#A6FF3A]/10 border border-[#A6FF3A]/20 rounded-lg text-[#A6FF3A] text-sm"
          >
            {{ successMessage }}
            <NuxtLink to="/login" class="block mt-2 underline hover:text-white">
              Ir a iniciar sesión
            </NuxtLink>
          </div>

          <!-- Error message -->
          <div
            v-if="error"
            class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
          >
            {{ error }}
            <NuxtLink v-if="error.includes('iniciar sesión')" to="/login" class="block mt-2 underline hover:text-white">
              Ir a iniciar sesión
            </NuxtLink>
          </div>

          <!-- Google OAuth (first for better UX) -->
          <button
            type="button"
            :disabled="isLoading"
            @click="handleOAuth('google')"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 rounded-lg transition-all disabled:opacity-50 mb-6"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Registrarse con Google
          </button>

          <!-- Divider -->
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-[#1A1E2A]/50 text-gray-500">o regístrate con email</span>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-4">
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

            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
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
                Creando cuenta...
              </span>
              <span v-else>Crear cuenta</span>
            </button>
          </form>

          <!-- Terms -->
          <p class="mt-4 text-xs text-gray-500 text-center">
            Al registrarte, aceptas nuestros
            <a href="#" class="text-[#00C9D4] hover:underline">Términos de servicio</a>
            y
            <a href="#" class="text-[#00C9D4] hover:underline">Política de privacidad</a>
          </p>

          <!-- Login link -->
          <div class="mt-6 text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?
            <NuxtLink
              to="/login"
              class="text-[#00C9D4] hover:underline font-medium ml-1"
            >
              Inicia sesión
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
