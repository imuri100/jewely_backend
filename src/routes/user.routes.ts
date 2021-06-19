import express from 'express'
import { createUserController } from '../modules/users/useCases/createUSer'
import { updateUserController } from '../modules/users/useCases/updateUser'
import { deleteUSerController } from '../modules/users/useCases/deleteUser'
import { listAllUserController, listOneUserController } from '../modules/users/useCases/ListUser'

const routes = express.Router()
routes.get('/', async (request, response) => {
  return listAllUserController.handle(request, response)
})

routes.get('/:id', async (request, response) => {
  return await listOneUserController.handle(request, response)
})

routes.post('/', async (request, response) => {
  return await createUserController.handle(request, response)
})

routes.put('/:id', async (request, response) => {
  return await updateUserController.handle(request, response)
})

routes.delete('/:id', async (request, response) => {
  return await deleteUSerController.handle(request, response)
})

export default routes
