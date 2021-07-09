
import express from 'express'
import { GenerateToken } from '../modules/jobs/genereteToken'

const sessionsRouter = express.Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUsers = new GenerateToken()

  const { user, token, refreshToken } = await authenticateUsers.execute({
    email,
    password
  })

  return response.status(200).json({ user, token, refreshToken })
})

export default sessionsRouter
