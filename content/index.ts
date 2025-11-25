import type { CheatcodeList } from '~/types/cheatcode'
import { javascriptCheatcode } from './javascript'
import { vueCheatcode } from './vue'
import { htmlCheatcode } from './html'
import { cssCheatcode } from './css'
import { accessibilityCheatcode } from './accessibility'
import { seoCheatcode } from './seo'

// Export all cheatcodes
export const cheatcodes: CheatcodeList = {
  javascript: javascriptCheatcode,
  vue: vueCheatcode,
  html: htmlCheatcode,
  css: cssCheatcode,
  accessibility: accessibilityCheatcode,
  seo: seoCheatcode,
  // TODO: Add more cheatcodes
  // nuxt: nuxtCheatcode,
  // react: reactCheatcode,
  // next: nextCheatcode,
  // php: phpCheatcode,
}

// Helper to get all cheatcode IDs
export const getCheatcodeIds = () => Object.keys(cheatcodes)

// Helper to get a specific cheatcode
export const getCheatcode = (id: string) => cheatcodes[id]

// Helper to get all cheatcodes as array
export const getAllCheatcodes = () => Object.values(cheatcodes)
