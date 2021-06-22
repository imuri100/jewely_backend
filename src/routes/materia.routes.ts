import express from 'express'
import { createMateriaController } from '../modules/materias/useCases/createMateria'
import { listAllMateriaController, listOneMateriaController } from '../modules/materias/useCases/ListMateria'
import { ensureAuthenticade } from '../modules/users/middleware/ensureAuthenticad'

const materiaRoutes = express.Router()

materiaRoutes.get('/', ensureAuthenticade, async (request, response) => {
  return await listAllMateriaController.handle(request, response)
})

materiaRoutes.get('/:id', ensureAuthenticade, async (request, response) => {
  return await listOneMateriaController.handle(request, response)
})

materiaRoutes.post('/', ensureAuthenticade, async (request, response) => {
  return await createMateriaController.handle(request, response)
})

export { materiaRoutes }
