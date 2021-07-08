import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { StockUsers } from '../../models/stockUsers'
import { StockUserRespository } from '../../repositories/stockRespository'

type ITypeUserProps = {
    user_idLogged : string
    term : boolean

}

@EntityRepository(StockUsers)
class ListOneStockUseCase {
  public async execute ({ user_idLogged, term }:ITypeUserProps) : Promise<StockUsers[]> {
    ensureIsValidUuid(user_idLogged)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(user_idLogged)

    const stockRespository = getCustomRepository(StockUserRespository)

    if (!user) {
      throw new AppError('user Logged not found', 401)
    }

    const findStockUser = await stockRespository.find({ where: { status: term, user_id: user.id } })

    return findStockUser
  }
}
export { ListOneStockUseCase }
