import type { CheatcodeList } from './types'

// Import cheatcodes - using static imports for all
import { javascriptCheatcode } from './javascript'
import { vueCheatcode } from './vue'
import { htmlCheatcode } from './html'
import { cssCheatcode } from './css'
import { accessibilityCheatcode } from './accessibility'
import { seoCheatcode } from './seo'
import { reactCheatcode } from './react'
// TODO: Add nuxt, next, php once Nitro bundling issue is resolved
// import { nuxtCheatcode } from './nuxt'
// import { nextCheatcode } from './next'
// import { phpCheatcode } from './php'

// Export all cheatcodes
export const cheatcodes: CheatcodeList = {
  javascript: javascriptCheatcode,
  vue: vueCheatcode,
  html: htmlCheatcode,
  css: cssCheatcode,
  accessibility: accessibilityCheatcode,
  seo: seoCheatcode,
  react: reactCheatcode,
  // TODO: Add these once Nitro bundling issue is resolved
  // nuxt: nuxtCheatcode,
  // next: nextCheatcode,
  // php: phpCheatcode,
}

// Helper to get all cheatcode IDs
export const getCheatcodeIds = () => Object.keys(cheatcodes)

// Helper to get a specific cheatcode
export const getCheatcode = (id: string) => cheatcodes[id]

// Helper to get all cheatcodes as array
export const getAllCheatcodes = () => Object.values(cheatcodes)
