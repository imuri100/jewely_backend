import express from 'express'
import { createPecasController } from '../modules/pecas/useCases/CreatePeca'
import { listAllPecasByUser, listOnePecaControler } from '../modules/pecas/useCases/ListPecas'

const PecasRouter = express.Router()
PecasRouter.get('/', async (request, response) => {
  return await listAllPecasByUser.handle(request, response)
})

PecasRouter.get('/:id', async (request, response) => {
  return await listOnePecaControler.handle(request, response)
})

PecasRouter.post('/', async (request, response) => {
  return await createPecasController.handle(request, response)
})

export { PecasRouter }
