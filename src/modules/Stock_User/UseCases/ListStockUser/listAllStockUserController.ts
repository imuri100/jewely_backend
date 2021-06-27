import { Request, Response } from 'express'
import { getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { StockUsers } from '../../models/stockUsers'

class ListAllStockController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const user_id = request.user.id
    ensureIsValidUuid(user_id)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(user_id)

    if (!user || user.cargo === 'artesao') {
      throw new AppError('you not have permission to view All Stocks becouse you are  Atersao', 401)
    }
    const stockRespository = getRepository(StockUsers)

    const findStockUser = await stockRespository.find({})

    return response.json(findStockUser)
  }
}
export { ListAllStockController }
