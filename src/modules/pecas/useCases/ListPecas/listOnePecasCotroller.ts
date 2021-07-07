import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ListOnePecasUserCase } from './ListOnePecasUseCase'

class ListOnePecasController {
  async handle (request :Request, response : Response) :Promise<Response> {
    const { id: user_id } = request.user
    const { id } = request.params
    const listOnePecaUserCase = getCustomRepository(ListOnePecasUserCase)

    const peca = await listOnePecaUserCase.execute(id, user_id)

    return response.status(201).json(peca)
  }
}

export { ListOnePecasController }
