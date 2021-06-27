import express from 'express'
import { createMateriaController } from '../modules/materias/useCases/createMateria'
import { listAllMateriaController, listOneMateriaController } from '../modules/materias/useCases/ListMateria'
import { updateMateriaController } from '../modules/materias/useCases/updateMateria'
import { deleteMateriaController } from '../modules/materias/useCases/deleteMateria'

const materiaRoutes = express.Router()

materiaRoutes.get('/', async (request, response) => {
  return await listAllMateriaController.handle(request, response)
})

materiaRoutes.get('/:id', async (request, response) => {
  return await listOneMateriaController.handle(request, response)
})

materiaRoutes.post('/', async (request, response) => {
  return await createMateriaController.handle(request, response)
})

materiaRoutes.put('/', async (request, response) => {
  return await updateMateriaController.handle(request, response)
})

materiaRoutes.delete('/:id', async (request, response) => {
  return await deleteMateriaController.handle(request, response)
})

export { materiaRoutes }
