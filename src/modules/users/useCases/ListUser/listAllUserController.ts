
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../repositories/UsersRespository'

class ListAllUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const userRespository = getCustomRepository(UserRepository)
    const user = await userRespository.find()

    return response.status(200).json(user)
  }
}

export { ListAllUserController }
