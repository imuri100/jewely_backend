import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { PecasRepository } from '../../repositories/pecasRepositoy'

class ListAllPiceByUser {
  async handle (request :Request, response : Response) :Promise<Response> {
    const { id: user_id } = request.user
    let { perPage, page } : any = request.query

    if (!page) {
      perPage = 1
    }
    if (!perPage) {
      perPage = 3
    }

    const limit = parseInt(perPage)
    const skip = (page - 1) * perPage

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id: user_id } })

    const pecasRepository = getCustomRepository(PecasRepository)
    //
    // .take(10)
    let pecas = await pecasRepository.find({ where: { armazen: true }, skip, take: limit })
    if (!user) {
      throw new AppError('user not found')
    } else if (user.cargo !== 'administrador') {
      pecas = await pecasRepository.find({ where: { user_id } })
    }

    return response.status(200).json({ page, perPage, data: pecas })
  }
}

export { ListAllPiceByUser }
