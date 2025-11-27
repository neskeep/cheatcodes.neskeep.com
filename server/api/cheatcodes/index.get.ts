import { getAllCheatcodes } from '../../utils/content'

export default defineEventHandler(async () => {
  // Return only metadata for all cheatcodes
  const cheatcodes = await getAllCheatcodes()
  return cheatcodes.map(c => c.metadata)
})
