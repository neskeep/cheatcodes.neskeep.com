import type { Cheatcode, CheatcodeSection } from '~/types/cheatcode'

export interface SearchResult {
  cheatcodeId: string
  cheatcodeTitle: string
  cheatcodeIcon?: string
  sectionId: string
  sectionTitle: string
  type: 'title' | 'content' | 'code'
  snippet: string
  path: string[]
}

export const useSearch = () => {
  const searchQuery = ref('')
  const searchResults = ref<SearchResult[]>([])
  const isSearching = ref(false)

  const searchInSection = (
    section: CheatcodeSection,
    query: string,
    cheatcodeId: string,
    cheatcodeTitle: string,
    cheatcodeIcon: string | undefined,
    path: string[] = []
  ): SearchResult[] => {
    const results: SearchResult[] = []
    const lowerQuery = query.toLowerCase()
    const currentPath = [...path, section.title]

    // Search in title
    if (section.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        cheatcodeId,
        cheatcodeTitle,
        cheatcodeIcon,
        sectionId: section.id,
        sectionTitle: section.title,
        type: 'title',
        snippet: section.title,
        path: currentPath,
      })
    }

    // Search in content
    if (section.content && section.content.toLowerCase().includes(lowerQuery)) {
      const index = section.content.toLowerCase().indexOf(lowerQuery)
      const start = Math.max(0, index - 40)
      const end = Math.min(section.content.length, index + query.length + 40)
      const snippet = (start > 0 ? '...' : '') +
        section.content.slice(start, end) +
        (end < section.content.length ? '...' : '')

      results.push({
        cheatcodeId,
        cheatcodeTitle,
        cheatcodeIcon,
        sectionId: section.id,
        sectionTitle: section.title,
        type: 'content',
        snippet,
        path: currentPath,
      })
    }

    // Search in list items
    if (section.items) {
      section.items.forEach(item => {
        if (item.toLowerCase().includes(lowerQuery)) {
          results.push({
            cheatcodeId,
            cheatcodeTitle,
            cheatcodeIcon,
            sectionId: section.id,
            sectionTitle: section.title,
            type: 'content',
            snippet: item,
            path: currentPath,
          })
        }
      })
    }

    // Search in code
    if (section.code) {
      if (section.code.code.toLowerCase().includes(lowerQuery)) {
        const lines = section.code.code.split('\n')
        const matchingLine = lines.find(line => line.toLowerCase().includes(lowerQuery))

        results.push({
          cheatcodeId,
          cheatcodeTitle,
          cheatcodeIcon,
          sectionId: section.id,
          sectionTitle: section.title,
          type: 'code',
          snippet: matchingLine?.trim() || section.code.title,
          path: currentPath,
        })
      }
    }

    // Search in subsections recursively
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        results.push(...searchInSection(
          subsection,
          query,
          cheatcodeId,
          cheatcodeTitle,
          cheatcodeIcon,
          currentPath
        ))
      })
    }

    return results
  }

  const search = (cheatcodes: Cheatcode[], query: string): SearchResult[] => {
    if (!query || query.length < 2) return []

    const results: SearchResult[] = []

    cheatcodes.forEach(cheatcode => {
      // Search in cheatcode title/description
      if (cheatcode.metadata.title.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          sectionId: '',
          sectionTitle: cheatcode.metadata.title,
          type: 'title',
          snippet: cheatcode.metadata.description,
          path: [cheatcode.metadata.title],
        })
      }

      // Search in sections
      cheatcode.sections.forEach(section => {
        results.push(...searchInSection(
          section,
          query,
          cheatcode.metadata.id,
          cheatcode.metadata.title,
          cheatcode.metadata.icon
        ))
      })
    })

    // Limit results and dedupe
    const seen = new Set<string>()
    return results.filter(r => {
      const key = `${r.cheatcodeId}-${r.sectionId}-${r.type}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 20)
  }

  return {
    searchQuery,
    searchResults,
    isSearching,
    search,
  }
}
