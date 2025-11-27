<script setup lang="ts">
// This page handles Supabase auth callbacks (email confirmation, OAuth, etc.)
definePageMeta({
  layout: false
})

const user = useSupabaseUser()
const router = useRouter()
const route = useRoute()
const supabase = useSupabaseClient()
const error = ref('')
const isProcessing = ref(true)

// Watch for user to be set after auth callback is processed
watch(user, (newUser) => {
  if (newUser) {
    router.push('/app')
  }
}, { immediate: true })

onMounted(async () => {
  // Check for hash fragments first (OAuth flow)
  if (typeof window !== 'undefined' && window.location.hash) {
    // Let Supabase handle the hash - it will update the user automatically
    const { data, error: hashError } = await supabase.auth.getSession()
    if (hashError) {
      console.error('Hash error:', hashError)
      error.value = 'Error al procesar la autenticación.'
      isProcessing.value = false
      return
    }
    if (data.session) {
      router.push('/app')
      return
    }
  }

  // Check for code in query params (email confirmation flow)
  const code = route.query.code as string

  if (code) {
    try {
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

      if (exchangeError) {
        console.error('Exchange error:', exchangeError)
        // If code exchange fails, user might already be confirmed
        // Try to get the current session
        const { data: sessionData } = await supabase.auth.getSession()
        if (sessionData.session) {
          router.push('/app')
          return
        }
        error.value = 'El enlace de confirmación ya fue utilizado o ha expirado. Si ya confirmaste tu cuenta, intenta iniciar sesión.'
        isProcessing.value = false
        return
      }

      if (data.user) {
        // Success - redirect to app
        router.push('/app')
      } else {
        error.value = 'No se pudo confirmar tu cuenta.'
        isProcessing.value = false
      }
    } catch (e) {
      console.error('Confirm error:', e)
      error.value = 'Ocurrió un error al confirmar tu cuenta.'
      isProcessing.value = false
    }
  } else if (user.value) {
    // Already logged in, redirect
    router.push('/app')
  } else {
    // Check if there's an existing session
    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session) {
      router.push('/app')
      return
    }
    // No code and no user
    error.value = 'No se encontró código de confirmación'
    isProcessing.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-bg text-white flex items-center justify-center">
    <!-- Particles Background -->
    <ParticlesBackground />

    <!-- Processing state -->
    <div v-if="isProcessing && !error" class="text-center relative z-10">
      <div class="animate-spin w-12 h-12 border-4 border-brand border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-400">Confirmando tu cuenta...</p>
    </div>

    <!-- Error state -->
    <div v-else class="text-center max-w-md mx-auto px-4 relative z-10">
      <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-xl font-bold mb-2">Error de confirmación</h1>
        <p class="text-gray-400 text-sm">{{ error }}</p>
      </div>
      <NuxtLink
        to="/login"
        class="btn-glow text-bg font-semibold px-6 py-3 rounded-lg inline-block"
      >
        Volver a iniciar sesión
      </NuxtLink>
    </div>
  </div>
</template>
