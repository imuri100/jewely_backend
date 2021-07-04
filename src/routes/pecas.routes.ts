import express from 'express'
import { createPecasController } from '../modules/pecas/useCases/CreatePeca'

const PecasRouter = express.Router()

PecasRouter.post('/', async (request, response) => {
  return createPecasController.handle(request, response)
})

export { PecasRouter }
