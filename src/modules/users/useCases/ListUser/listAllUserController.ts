
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../repositories/UsersRespository'

class ListAllUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    let { perPage, page } : any = request.query

    if (!page) {
      perPage = 1
    }
    if (!perPage) {
      perPage = 3
    }

    const limit = parseInt(perPage)
    const skip = (page - 1) * perPage

    const userRespository = getCustomRepository(UserRepository)
    const user = await userRespository.find({ skip, take: limit })

    return response.status(200).json({ page, perPage, data: user })
  }
}

export { ListAllUserController }
