import { Request, Response } from 'express'

import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { StockUsers } from '../../models/stockUsers'
import { StockUserRespository } from '../../repositories/stockRespository'

@EntityRepository(StockUsers)
class AceptStockUser {
  public async handle (request : Request, response : Response) : Promise<Response> {
    try {
      const { id } = request.user
      const { materia_id } = request.body

      ensureIsValidUuid(id)

      const userRepository = getCustomRepository(UserRepository)
      const user = await userRepository.FindById(id)

      const stockRespository = getCustomRepository(StockUserRespository)

      if (!user) {
        throw new AppError('user Logged not found', 401)
      }

      const findStockUser = await stockRespository.findOne({ where: { status: false, materia_id, user_id: id } })

      if (!findStockUser) {
        throw new AppError('materia in stock user not found or status Already true', 404)
      }
      const StockUser = await stockRespository.save({ ...findStockUser, message: '', status: true })

      return response.status(200).json(StockUser)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}
export { AceptStockUser }
