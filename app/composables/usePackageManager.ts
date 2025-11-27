export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

const STORAGE_KEY = 'preferred-package-manager'
const DEFAULT_MANAGER: PackageManager = 'pnpm'

// Shared state across all component instances
// Start with default value for SSR consistency
const selectedManager = ref<PackageManager>(DEFAULT_MANAGER)
const isHydrated = ref(false)

export function usePackageManager() {
  // Initialize from localStorage after hydration (call this in onMounted)
  const initFromStorage = () => {
    if (isHydrated.value) return

    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY) as PackageManager
      if (saved && ['npm', 'pnpm', 'yarn', 'bun'].includes(saved)) {
        selectedManager.value = saved
      }
      isHydrated.value = true
    }
  }

  // Set the package manager (updates all instances)
  const setPackageManager = (manager: PackageManager) => {
    selectedManager.value = manager
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, manager)
    }
  }

  // Check if already hydrated (for components mounting after initial load)
  const ensureHydrated = () => {
    if (import.meta.client && !isHydrated.value) {
      // Use nextTick to ensure we're past hydration
      nextTick(() => {
        initFromStorage()
      })
    }
  }

  return {
    selectedManager: readonly(selectedManager),
    isHydrated: readonly(isHydrated),
    setPackageManager,
    initFromStorage,
    ensureHydrated
  }
}
