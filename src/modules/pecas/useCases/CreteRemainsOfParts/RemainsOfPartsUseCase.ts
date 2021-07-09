import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { PecasRepository } from '../../repositories/pecasRepositoy'

class RemainsOfPartsUseCase {
  async execute (request :Request, response : Response) :Promise<Response> {
    try {
      const { id: user_id } = request.user

      const userRepository = getCustomRepository(UserRepository)
      const user = await userRepository.findOne({ where: { id: user_id } })

      const pecasRepository = getCustomRepository(PecasRepository)
      let peca = await pecasRepository.find({})
      if (!user) {
        throw new AppError('user not found')
      } else if (user.cargo !== 'administrador') {
        peca = await pecasRepository.find({ where: { user_id } })
      }

      return response.status(200).json(peca)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { RemainsOfPartsUseCase }
