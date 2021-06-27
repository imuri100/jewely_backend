import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { StockUsers } from '../../models/stockUsers'
import { StockUserRespository } from '../../repositories/stockRespository'

type ITypeUserProps = {
    user_idLogged : string
    user_id : string;

}

@EntityRepository(StockUsers)
class ListOneStockUseCase {
  public async execute ({ user_id, user_idLogged }:ITypeUserProps) : Promise<StockUsers[]> {
    ensureIsValidUuid(user_id)
    ensureIsValidUuid(user_idLogged)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(user_idLogged)
    // if (!user || user.id !== user_idLoged && user.cargo !== 'administrador') {
    //   throw new AppError('user not found to look this Stock ')
    // }
    const stockRespository = getCustomRepository(StockUserRespository)

    const findStockUser = await stockRespository.find({})
    if (!user) {
      throw new AppError('user Logged not found', 401)
    } else if (findStockUser.length <= 0) {
      throw new AppError(`The Stock with this user_id ${user_id} was not found`, 401)
    } else if (findStockUser[0].user_id !== user_idLogged && user.cargo !== 'administrador') {
      throw new AppError('You not have permission to see this Stock user', 401)
    }

    return findStockUser
  }
}
export { ListOneStockUseCase }
