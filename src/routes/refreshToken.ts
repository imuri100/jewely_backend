import express from 'express'
import { AuthenticateUserServices } from '../modules/users/services/AuthenticateUsers.Services'

const refreshToken = express.Router()

refreshToken.post('/', async (request, response) => {
  const { oldToken } = request.body

  if (!oldToken) {
    return response.status(400).json('error : oldToken is required')
  }

  const authenticateUsers = new AuthenticateUserServices()

  const {
    token: refreshToken,
    user, old_Token
  } = await authenticateUsers.refreshToken(oldToken)

  return response.status(200).json({ user, refreshToken, old_Token })
})

export { refreshToken }
