import express from 'express'
import { createMateriaController } from '../modules/materias/useCases/createMateria'

const materiaRoutes = express.Router()

materiaRoutes.post('/', async (request, response) => {
  return await createMateriaController.handle(request, response)
})

export { materiaRoutes }
