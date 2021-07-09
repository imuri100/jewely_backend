import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { RemainsOfPartsUseCase } from './ListRemainsOfPartsUseCase'

class ListRemainsOfPartsController {
  async handle (request :Request, response : Response) :Promise<Response> {
    const { id: user_id } = request.user

    const remainsOfPartsUseCase = getCustomRepository(RemainsOfPartsUseCase)
    const restos = await remainsOfPartsUseCase.execute(user_id)

    return response.status(200).json(restos)
  }
}

export { ListRemainsOfPartsController }
