import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { ListOneMateriaUseCase } from './ListOneMateriaUseCase'

class ListOneMateriaController {
  async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.params
    ensureIsValidUuid(id)
    const listOneMateriaUseCase = getCustomRepository(ListOneMateriaUseCase)
    const materia = await listOneMateriaUseCase.execute(id)

    return response.status(200).json(materia)
  }
}

export { ListOneMateriaController }
