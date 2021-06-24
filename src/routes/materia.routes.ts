import express from 'express'
import { createMateriaController } from '../modules/materias/useCases/createMateria'
import { listAllMateriaController, listOneMateriaController } from '../modules/materias/useCases/ListMateria'
import { updateMateriaController } from '../modules/materias/useCases/updateMateria'
import { ensureAuthenticade } from '../modules/users/middleware/ensureAuthenticad'
import { deleteMateriaController } from '../modules/materias/useCases/deleteMateria'

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

materiaRoutes.put('/', ensureAuthenticade, async (request, response) => {
  return await updateMateriaController.handle(request, response)
})

materiaRoutes.delete('/:id', ensureAuthenticade, async (request, response) => {
  return await deleteMateriaController.handle(request, response)
})

export { materiaRoutes }
