export const useDarkMode = () => {
  // Default to dark mode (brand design is dark-first)
  const isDark = useState('darkMode', () => true)

  const toggle = () => {
    isDark.value = !isDark.value
    updateDOM()
    savePreference()
  }

  const updateDOM = () => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
  }

  const savePreference = () => {
    if (import.meta.client) {
      localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
    }
  }

  const loadPreference = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('darkMode')
      if (saved) {
        isDark.value = saved === 'dark'
      } else {
        // Default to dark mode for brand consistency, or use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark || true // Default to dark if no preference
      }
      updateDOM()
    }
  }

  // Initialize on first call (client-side only)
  const init = () => {
    if (import.meta.client) {
      loadPreference()
    }
  }

  return {
    isDark,
    toggle,
    loadPreference,
    init,
  }
}
