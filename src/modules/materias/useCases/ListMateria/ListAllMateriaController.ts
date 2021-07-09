import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { MateriaRepositoty } from '../../repositories/materiaRepository'

class ListAllMateriaController {
  async handle (request : Request, response : Response) : Promise<Response> {
    let { perPage, page } : any = request.query

    if (!page) {
      perPage = 1
    }
    if (!perPage) {
      perPage = 3
    }

    const limit = parseInt(perPage)
    const skip = (page - 1) * perPage
    const materiaRepository = getCustomRepository(MateriaRepositoty)
    const materia = await materiaRepository.find({ skip, take: limit })

    return response.status(200).json({ page, perPage, data: materia })
  }
}

export { ListAllMateriaController }
