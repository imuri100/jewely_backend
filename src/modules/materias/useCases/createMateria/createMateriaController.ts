import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CreateMateriaUseCase } from './createMateriaUseCases'

class CreateMateriaController {
  async handle (request : Request, response : Response) : Promise<Response> {
    const { name, quantity, reference, user_id } = request.body

    const createMateriaUseCase = getCustomRepository(CreateMateriaUseCase)
    const materia = await createMateriaUseCase.execute({ name, quantity, reference, user_id })

    return response.status(201).json(materia)
  }
}

export { CreateMateriaController }
