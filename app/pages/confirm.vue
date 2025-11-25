<script setup lang="ts">
// This page handles Supabase auth callbacks (email confirmation, OAuth, etc.)
// The @nuxtjs/supabase module automatically processes the auth callback
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
  // The @nuxtjs/supabase module should handle the code exchange automatically
  // But if there's a code in the URL and no user yet, we wait a bit
  const code = route.query.code as string

  if (code) {
    // Give the module time to process the callback
    await new Promise(resolve => setTimeout(resolve, 2000))

    // If still no user, check if we're authenticated
    if (!user.value) {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        router.push('/app')
      } else {
        error.value = 'No se pudo confirmar tu cuenta. El enlace puede haber expirado.'
        isProcessing.value = false
      }
    }
  } else if (!user.value) {
    // No code and no user - something went wrong
    error.value = 'No se encontró código de confirmación'
    isProcessing.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-bg text-white flex items-center justify-center">
    <!-- Processing state -->
    <div v-if="isProcessing && !error" class="text-center">
      <div class="animate-spin w-12 h-12 border-4 border-brand border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-400">Confirmando tu cuenta...</p>
    </div>

    <!-- Error state -->
    <div v-else class="text-center max-w-md mx-auto px-4">
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
