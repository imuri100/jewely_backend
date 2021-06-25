
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { DeleteMateriaUseCase } from './deleteMateriaUseCase'

class DeleteMateriaController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteMateriaUseCase = getCustomRepository(DeleteMateriaUseCase)
    await deleteMateriaUseCase.execute(id)

    return response.status(204).send()
  }
}

export { DeleteMateriaController }
