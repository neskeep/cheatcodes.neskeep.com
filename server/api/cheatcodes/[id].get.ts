import { getCheatcode } from '../../utils/content'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cheatcode ID is required',
    })
  }

  const cheatcode = await getCheatcode(id)

  if (!cheatcode) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Cheatcode not found',
    })
  }

  return cheatcode
})
