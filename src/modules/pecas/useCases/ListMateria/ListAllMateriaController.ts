import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { MateriaRepositoty } from '../../repositories/materiaRepository'

class ListAllMateriaController {
  async handle (request : Request, response : Response) : Promise<Response> {
    const materiaRepository = getCustomRepository(MateriaRepositoty)
    const materia = await materiaRepository.find({ })

    return response.status(200).json(materia)
  }
}

export { ListAllMateriaController }
