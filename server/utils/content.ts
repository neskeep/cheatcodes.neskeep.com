// Server-side content loading utilities
// Using dynamic imports to avoid Nitro bundling issues

import type { Cheatcode, CheatcodeList } from '../../content/types'

let cachedCheatcodes: CheatcodeList | null = null

export const loadCheatcodes = async (): Promise<CheatcodeList> => {
  if (cachedCheatcodes) {
    return cachedCheatcodes
  }

  const [
    { javascriptCheatcode },
    { vueCheatcode },
    { htmlCheatcode },
    { cssCheatcode },
    { accessibilityCheatcode },
    { seoCheatcode },
    { reactCheatcode },
  ] = await Promise.all([
    import('../../content/javascript'),
    import('../../content/vue'),
    import('../../content/html'),
    import('../../content/css'),
    import('../../content/accessibility'),
    import('../../content/seo'),
    import('../../content/react'),
  ])

  cachedCheatcodes = {
    javascript: javascriptCheatcode,
    vue: vueCheatcode,
    html: htmlCheatcode,
    css: cssCheatcode,
    accessibility: accessibilityCheatcode,
    seo: seoCheatcode,
    react: reactCheatcode,
  }

  return cachedCheatcodes
}

export const getCheatcode = async (id: string): Promise<Cheatcode | undefined> => {
  const cheatcodes = await loadCheatcodes()
  return cheatcodes[id]
}

export const getAllCheatcodes = async (): Promise<Cheatcode[]> => {
  const cheatcodes = await loadCheatcodes()
  return Object.values(cheatcodes)
}
