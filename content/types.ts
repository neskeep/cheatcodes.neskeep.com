// Shared types for content files - duplicated from app/types/cheatcode.ts
// to avoid bundling issues with aliases in server context

export type CheatcodeCategory = 'language' | 'framework' | 'markup' | 'styling' | 'tooling'

export type CheatcodeTag =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'vue'
  | 'react'
  | 'nuxt'
  | 'next'
  | 'php'
  | 'framework'
  | 'accessibility'
  | 'seo'
  | 'performance'
  | 'frontend'
  | 'backend'
  | 'server-side'
  | 'ssr'
  | 'ssg'

export interface CheatcodeMetadata {
  id: string
  title: string
  language: string
  category: CheatcodeCategory
  tags: CheatcodeTag[]
  version?: string
  description: string
  lastUpdated: string
  icon?: string
  logo?: string
  color?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
}

export interface CodeExample {
  title: string
  code: string
  language?: string
  description?: string
}

export interface TableRow {
  [key: string]: string
}

export interface ContentTable {
  title: string
  headers: string[]
  rows: TableRow[]
}

export interface PackageCommands {
  npm?: string
  pnpm?: string
  yarn?: string
  bun?: string
}

export interface CheatcodeSection {
  id: string
  title: string
  type: 'text' | 'code' | 'table' | 'list' | 'package-install'
  content?: string
  items?: string[]
  code?: CodeExample
  table?: ContentTable
  packageCommands?: PackageCommands
  subsections?: CheatcodeSection[]
}

export interface Cheatcode {
  metadata: CheatcodeMetadata
  sections: CheatcodeSection[]
}

export interface CheatcodeList {
  [key: string]: Cheatcode
}
