import type { Cheatcode, CheatcodeSection } from '~/types/cheatcode'

export interface SearchResult {
  cheatcodeId: string
  cheatcodeTitle: string
  cheatcodeIcon?: string
  cheatcodeColor?: string
  sectionId: string
  sectionTitle: string
  type: 'cheatcode' | 'section' | 'content' | 'code' | 'table'
  snippet: string
  matchedText: string
  path: string[]
  score: number
  codeLanguage?: string
  copyableCode?: string
}

export interface GroupedResults {
  cheatcodeId: string
  cheatcodeTitle: string
  cheatcodeIcon?: string
  cheatcodeColor?: string
  results: SearchResult[]
  bestScore: number
}

// Recent searches storage
const RECENT_SEARCHES_KEY = 'cheatcodes-recent-searches'
const MAX_RECENT_SEARCHES = 5

export const useSearch = () => {
  const searchQuery = ref('')
  const recentSearches = ref<string[]>([])

  // Load recent searches from localStorage
  const loadRecentSearches = () => {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem(RECENT_SEARCHES_KEY)
        if (saved) {
          recentSearches.value = JSON.parse(saved)
        }
      } catch {}
    }
  }

  // Save a search to recent
  const saveRecentSearch = (query: string) => {
    if (!query || query.length < 2) return
    const trimmed = query.trim().toLowerCase()

    // Remove if exists, add to front
    const filtered = recentSearches.value.filter(s => s !== trimmed)
    filtered.unshift(trimmed)
    recentSearches.value = filtered.slice(0, MAX_RECENT_SEARCHES)

    if (import.meta.client) {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.value))
    }
  }

  // Clear recent searches
  const clearRecentSearches = () => {
    recentSearches.value = []
    if (import.meta.client) {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    }
  }

  // Normalize text for accent-insensitive search
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
  }

  // Fuzzy match score - higher is better
  const fuzzyScore = (text: string, query: string): number => {
    const lowerText = normalizeText(text)
    const lowerQuery = normalizeText(query)

    // Exact match - highest score
    if (lowerText === lowerQuery) return 100

    // Starts with query - very high
    if (lowerText.startsWith(lowerQuery)) return 90

    // Contains exact query
    if (lowerText.includes(lowerQuery)) {
      // Earlier in string = higher score
      const position = lowerText.indexOf(lowerQuery)
      return 80 - Math.min(position / 10, 30)
    }

    // Word boundary match (e.g., "arr" matches "Array")
    const words = lowerText.split(/[\s\-_./]+/)
    for (const word of words) {
      if (word.startsWith(lowerQuery)) return 70
    }

    // Fuzzy: all query chars appear in order
    let queryIdx = 0
    let consecutiveBonus = 0
    let lastMatchIdx = -1

    for (let i = 0; i < lowerText.length && queryIdx < lowerQuery.length; i++) {
      if (lowerText[i] === lowerQuery[queryIdx]) {
        if (lastMatchIdx === i - 1) consecutiveBonus += 5
        lastMatchIdx = i
        queryIdx++
      }
    }

    if (queryIdx === lowerQuery.length) {
      // All chars matched
      const baseScore = 40 + consecutiveBonus
      return Math.min(baseScore, 65)
    }

    return 0 // No match
  }

  // Highlight matched text in a string
  const highlightMatch = (text: string, query: string): { text: string; highlighted: string } => {
    const normalizedText = normalizeText(text)
    const normalizedQuery = normalizeText(query)
    const idx = normalizedText.indexOf(normalizedQuery)

    if (idx >= 0) {
      const before = text.slice(0, idx)
      const match = text.slice(idx, idx + query.length)
      const after = text.slice(idx + query.length)
      return {
        text,
        highlighted: `${before}<mark>${match}</mark>${after}`
      }
    }

    return { text, highlighted: text }
  }

  // Create snippet around match
  const createSnippet = (text: string, query: string, maxLength: number = 100): string => {
    const normalizedText = normalizeText(text)
    const normalizedQuery = normalizeText(query)
    const idx = normalizedText.indexOf(normalizedQuery)

    if (idx === -1) return text.slice(0, maxLength) + (text.length > maxLength ? '...' : '')

    const start = Math.max(0, idx - 30)
    const end = Math.min(text.length, idx + query.length + 50)

    let snippet = text.slice(start, end)
    if (start > 0) snippet = '...' + snippet
    if (end < text.length) snippet = snippet + '...'

    return snippet
  }

  // Search in a section recursively
  const searchInSection = (
    section: CheatcodeSection,
    query: string,
    cheatcode: Cheatcode,
    path: string[] = []
  ): SearchResult[] => {
    const results: SearchResult[] = []
    const currentPath = [...path, section.title]

    // Search in section title
    const titleScore = fuzzyScore(section.title, query)
    if (titleScore > 0) {
      results.push({
        cheatcodeId: cheatcode.metadata.id,
        cheatcodeTitle: cheatcode.metadata.title,
        cheatcodeIcon: cheatcode.metadata.icon,
        cheatcodeColor: cheatcode.metadata.color,
        sectionId: section.id,
        sectionTitle: section.title,
        type: 'section',
        snippet: section.content?.slice(0, 100) || section.title,
        matchedText: section.title,
        path: currentPath,
        score: titleScore + 10, // Bonus for title match
      })
    }

    // Search in content
    if (section.content) {
      const contentScore = fuzzyScore(section.content, query)
      if (contentScore > 0) {
        results.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: section.id,
          sectionTitle: section.title,
          type: 'content',
          snippet: createSnippet(section.content, query),
          matchedText: query,
          path: currentPath,
          score: contentScore,
        })
      }
    }

    // Search in list items
    if (section.items) {
      for (const item of section.items) {
        const itemScore = fuzzyScore(item, query)
        if (itemScore > 0) {
          results.push({
            cheatcodeId: cheatcode.metadata.id,
            cheatcodeTitle: cheatcode.metadata.title,
            cheatcodeIcon: cheatcode.metadata.icon,
            cheatcodeColor: cheatcode.metadata.color,
            sectionId: section.id,
            sectionTitle: section.title,
            type: 'content',
            snippet: item,
            matchedText: query,
            path: currentPath,
            score: itemScore,
          })
          break // Only first matching item to avoid duplicates
        }
      }
    }

    // Search in code
    if (section.code) {
      const codeScore = fuzzyScore(section.code.code, query)
      const titleCodeScore = fuzzyScore(section.code.title || '', query)
      const bestCodeScore = Math.max(codeScore, titleCodeScore)

      if (bestCodeScore > 0) {
        const lines = section.code.code.split('\n')
        const matchingLine = lines.find(line =>
          fuzzyScore(line, query) > 0
        ) || lines[0]

        results.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: section.id,
          sectionTitle: section.title,
          type: 'code',
          snippet: matchingLine?.trim() || section.code.title || '',
          matchedText: query,
          path: currentPath,
          score: bestCodeScore + 5, // Small bonus for code
          codeLanguage: section.code.language,
          copyableCode: section.code.code,
        })
      }
    }

    // Search in packageCommands
    if (section.packageCommands) {
      const commands = Object.entries(section.packageCommands)
      for (const [manager, command] of commands) {
        if (command) {
          const cmdScore = fuzzyScore(command, query)
          if (cmdScore > 0) {
            results.push({
              cheatcodeId: cheatcode.metadata.id,
              cheatcodeTitle: cheatcode.metadata.title,
              cheatcodeIcon: cheatcode.metadata.icon,
              cheatcodeColor: cheatcode.metadata.color,
              sectionId: section.id,
              sectionTitle: section.title,
              type: 'code',
              snippet: `${manager}: ${command}`,
              matchedText: query,
              path: currentPath,
              score: cmdScore + 5,
              codeLanguage: 'bash',
              copyableCode: command,
            })
            break // Only first matching command
          }
        }
      }
    }

    // Search in table
    if (section.table) {
      const tableContent = [
        ...section.table.headers,
        ...section.table.rows.flat()
      ].join(' ')

      const tableScore = fuzzyScore(tableContent, query)
      if (tableScore > 0) {
        // Find the matching cell
        let matchingCell = ''
        for (const row of section.table.rows) {
          for (const cell of row) {
            if (fuzzyScore(cell, query) > 0) {
              matchingCell = cell
              break
            }
          }
          if (matchingCell) break
        }

        results.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: section.id,
          sectionTitle: section.title,
          type: 'table',
          snippet: matchingCell || section.table.headers.join(' | '),
          matchedText: query,
          path: currentPath,
          score: tableScore,
        })
      }
    }

    // Search in subsections recursively
    if (section.subsections) {
      for (const subsection of section.subsections) {
        results.push(...searchInSection(subsection, query, cheatcode, currentPath))
      }
    }

    return results
  }

  // Main search function
  const search = (cheatcodes: Cheatcode[], query: string): SearchResult[] => {
    if (!query || query.length < 1) return []

    const allResults: SearchResult[] = []

    for (const cheatcode of cheatcodes) {
      // Search in cheatcode title
      const titleScore = fuzzyScore(cheatcode.metadata.title, query)
      if (titleScore > 0) {
        allResults.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: '',
          sectionTitle: cheatcode.metadata.title,
          type: 'cheatcode',
          snippet: cheatcode.metadata.description,
          matchedText: cheatcode.metadata.title,
          path: [cheatcode.metadata.title],
          score: titleScore + 20, // Big bonus for cheatcode title
        })
      }

      // Search in description
      const descScore = fuzzyScore(cheatcode.metadata.description, query)
      if (descScore > 0 && titleScore === 0) {
        allResults.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: '',
          sectionTitle: cheatcode.metadata.title,
          type: 'cheatcode',
          snippet: cheatcode.metadata.description,
          matchedText: query,
          path: [cheatcode.metadata.title],
          score: descScore + 15,
        })
      }

      // Search in tags
      const matchingTag = cheatcode.metadata.tags?.find(tag =>
        fuzzyScore(tag, query) > 0
      )
      if (matchingTag && titleScore === 0) {
        allResults.push({
          cheatcodeId: cheatcode.metadata.id,
          cheatcodeTitle: cheatcode.metadata.title,
          cheatcodeIcon: cheatcode.metadata.icon,
          cheatcodeColor: cheatcode.metadata.color,
          sectionId: '',
          sectionTitle: cheatcode.metadata.title,
          type: 'cheatcode',
          snippet: `Tag: ${matchingTag}`,
          matchedText: matchingTag,
          path: [cheatcode.metadata.title],
          score: fuzzyScore(matchingTag, query) + 10,
        })
      }

      // Search in sections
      for (const section of cheatcode.sections) {
        allResults.push(...searchInSection(section, query, cheatcode))
      }
    }

    // Sort by score (highest first)
    allResults.sort((a, b) => b.score - a.score)

    // Dedupe by unique key
    const seen = new Set<string>()
    const uniqueResults = allResults.filter(r => {
      const key = `${r.cheatcodeId}-${r.sectionId}-${r.type}-${r.snippet.slice(0, 50)}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    return uniqueResults.slice(0, 30)
  }

  // Group results by cheatcode
  const groupResults = (results: SearchResult[]): GroupedResults[] => {
    const groups = new Map<string, GroupedResults>()

    for (const result of results) {
      const existing = groups.get(result.cheatcodeId)
      if (existing) {
        existing.results.push(result)
        existing.bestScore = Math.max(existing.bestScore, result.score)
      } else {
        groups.set(result.cheatcodeId, {
          cheatcodeId: result.cheatcodeId,
          cheatcodeTitle: result.cheatcodeTitle,
          cheatcodeIcon: result.cheatcodeIcon,
          cheatcodeColor: result.cheatcodeColor,
          results: [result],
          bestScore: result.score,
        })
      }
    }

    // Sort groups by best score
    return Array.from(groups.values())
      .sort((a, b) => b.bestScore - a.bestScore)
  }

  // Initialize
  if (import.meta.client) {
    loadRecentSearches()
  }

  return {
    searchQuery,
    recentSearches: readonly(recentSearches),
    search,
    groupResults,
    highlightMatch,
    saveRecentSearch,
    clearRecentSearches,
    loadRecentSearches,
  }
}
