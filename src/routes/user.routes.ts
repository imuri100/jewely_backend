import express from 'express'
import { createUserController } from '../modules/users/useCases/createUSer'
import { updateUserController } from '../modules/users/useCases/updateUser'
import { deleteUSerController } from '../modules/users/useCases/deleteUser'
import { listAllUserController, listOneUserController } from '../modules/users/useCases/ListUser'

const UserRoutes = express.Router()

UserRoutes.get('/', async (request, response) => {
  return listAllUserController.handle(request, response)
})

UserRoutes.get('/:id', async (request, response) => {
  return await listOneUserController.handle(request, response)
})

UserRoutes.post('/', async (request, response) => {
  return await createUserController.handle(request, response)
})

UserRoutes.put('/:id', async (request, response) => {
  return await updateUserController.handle(request, response)
})

UserRoutes.delete('/:id', async (request, response) => {
  return await deleteUSerController.handle(request, response)
})

export { UserRoutes }
