import { getAllCheatcodes } from '#content'

export default defineEventHandler(() => {
  // Return only metadata for all cheatcodes
  const cheatcodes = getAllCheatcodes()
  return cheatcodes.map(c => c.metadata)
})
