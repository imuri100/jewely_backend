import express from 'express'
import { createPecasController } from '../modules/pecas/useCases/CreatePeca'
import { listAllPecasByUser, listOnePecaControler } from '../modules/pecas/useCases/ListPecas'
import { deleteRemainsOfPartsUseCase, listRemainsOfPartsController } from '../modules/pecas/useCases/RemainsOfParts'

const PecasRouter = express.Router()
PecasRouter.get('/', async (request, response) => {
  return await listAllPecasByUser.handle(request, response)
})
PecasRouter.get('/list/deleted', async (request, response) => {
  return await listRemainsOfPartsController.handle(request, response)
})
PecasRouter.get('/:id', async (request, response) => {
  return await listOnePecaControler.handle(request, response)
})

PecasRouter.post('/', async (request, response) => {
  return await createPecasController.handle(request, response)
})

PecasRouter.delete('/delete', async (request, response) => {
  return await deleteRemainsOfPartsUseCase.handle(request, response)
})

export { PecasRouter }
