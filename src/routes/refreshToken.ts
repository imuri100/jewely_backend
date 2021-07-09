import express from 'express'
import { RefreshTokenControler } from '../provider/refreshTokenController'

const refreshToken = express.Router()
const refresh_tokenController = new RefreshTokenControler()

refreshToken.post('/', async (request, response) => {
  return await refresh_tokenController.hendle(request, response)
})

export { refreshToken }
