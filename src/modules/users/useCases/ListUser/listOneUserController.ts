
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ListOneUSerUseCase } from './listOneUSerUseCase'

class ListOneUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listOneUserUsecase = getCustomRepository(ListOneUSerUseCase)
    const user = await listOneUserUsecase.execute(id)

    return response.status(200).json(user)
  }
}

export { ListOneUserController }
