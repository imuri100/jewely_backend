import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { EnsureIfIsAdmin } from '../../../materias/middlewares/ensureIfIsAdmin'
import { EnsureIfIsArtesao } from '../../../pecas/middlewares/ensureIfIsArtesao'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { StockUsers } from '../../models/stockUsers'
import { StockUserRespository } from '../../repositories/stockRespository'

type ITypeUserProps = {
    user_idLogged : string
    user_id : string;
    materia_reference : string

}

@EntityRepository(StockUsers)
class DeleteOneStockUseCase {
  public async execute ({ user_id, user_idLogged, materia_reference }:ITypeUserProps) : Promise<void> {
    await new EnsureIfIsAdmin().execute(user_idLogged)
    await new EnsureIfIsArtesao().execute(user_id)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(user_idLogged)

    const stockRespository = getCustomRepository(StockUserRespository)

    const findStockUser = await stockRespository.FindOneStockByUser_id(user_id, materia_reference)
    console.log(findStockUser)
    if (!user) {
      throw new AppError('user Logged not found', 401)
    } else if (!findStockUser) {
      throw new AppError(`The Stock with this user_id ${user_id}
      and  materia_reference ${materia_reference} was not found to Delete `, 401)
    }

    await stockRespository.delete(findStockUser.id)
  }
}
export { DeleteOneStockUseCase }
