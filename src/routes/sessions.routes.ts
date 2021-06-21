import express from 'express'
import { AuthenticateUserServices } from '../modules/users/services/AuthenticateUsers.Services'

const sessionsRouter = express.Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUsers = new AuthenticateUserServices()

  const { user, token } = await authenticateUsers.execute({
    email,
    password
  })

  return response.status(200).json({ user, token })
})

export default sessionsRouter
