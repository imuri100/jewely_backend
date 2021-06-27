import express from 'express'
import { createStockUsersController } from '../modules/Stock_User/UseCases/createStockUser'
import { deleteOneStockController } from '../modules/Stock_User/UseCases/DeleteStockUser'
import { listAllStockController, listOneStockController } from '../modules/Stock_User/UseCases/ListStockUser'
import { updateStockUserController } from '../modules/Stock_User/UseCases/UpdateStockUser'

const stoskUserRoutes = express.Router()

stoskUserRoutes.get('/', async (request, response) => {
  return await listAllStockController.handle(request, response)
})

stoskUserRoutes.get('/:id', async (request, response) => {
  return await listOneStockController.handle(request, response)
})

stoskUserRoutes.post('/', async (request, response) => {
  return await createStockUsersController.handle(request, response)
})

stoskUserRoutes.put('/materia_reference/:reference/user/:id', async (request, response) => {
  return await updateStockUserController.handle(request, response)
})
stoskUserRoutes.delete('/materia_reference/:reference/user/:id', async (request, response) => {
  return await deleteOneStockController.handle(request, response)
})
export { stoskUserRoutes }
