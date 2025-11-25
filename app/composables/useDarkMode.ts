export const useDarkMode = () => {
  const isDark = useState('darkMode', () => false)

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
        // Check system preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      updateDOM()
    }
  }

  return {
    isDark,
    toggle,
    loadPreference,
  }
}
