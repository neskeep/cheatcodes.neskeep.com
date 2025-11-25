export interface CheatcodeMetadata {
  id: string
  title: string
  language: string
  version?: string
  description: string
  lastUpdated: string
  icon?: string
  logo?: string // URL or path to logo image
  color?: string
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

export interface CheatcodeSection {
  id: string
  title: string
  type: 'text' | 'code' | 'table' | 'list'
  content?: string
  items?: string[]
  code?: CodeExample
  table?: ContentTable
  subsections?: CheatcodeSection[]
}

export interface Cheatcode {
  metadata: CheatcodeMetadata
  sections: CheatcodeSection[]
}

export interface CheatcodeList {
  [key: string]: Cheatcode
}
