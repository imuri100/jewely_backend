import express from 'express'
import { createUserController } from '../modules/users/useCases/createUSer'
import { updateUserController } from '../modules/users/useCases/updateUser'
import { deleteUSerController } from '../modules/users/useCases/deleteUser'
import { listAllUserController, listOneUserController } from '../modules/users/useCases/ListUser'
import { ensureAuthenticade } from '../modules/users/middleware/ensureAuthenticad'

const UserRoutes = express.Router()

UserRoutes.get('/', ensureAuthenticade, async (request, response) => {
  return listAllUserController.handle(request, response)
})

UserRoutes.get('/:id', ensureAuthenticade, async (request, response) => {
  return await listOneUserController.handle(request, response)
})

UserRoutes.post('/', async (request, response) => {
  return await createUserController.handle(request, response)
})

UserRoutes.put('/:id', ensureAuthenticade, async (request, response) => {
  return await updateUserController.handle(request, response)
})

UserRoutes.delete('/:id', ensureAuthenticade, async (request, response) => {
  return await deleteUSerController.handle(request, response)
})

export { UserRoutes }
