import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { EnsureIfIsArtesao } from '../../../pecas/middlewares/ensureIfIsArtesao'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { StockUsers } from '../../models/stockUsers'
import { IStockProps } from '../../repositories/implementations/IStockRespository'
import { StockUserRespository } from '../../repositories/stockRespository'

@EntityRepository(StockUsers)
class UpdateStockUserCase {
  public async execute ({ quantity, user_id, materia_reference } :IStockProps, user : string) : Promise<StockUsers> {
    await new EnsureIfIsArtesao().execute(user)
    await new EnsureIfIsArtesao().execute(user_id)

    const userRepository = getCustomRepository(UserRepository)
    const findAUserArtesao = await userRepository.FindById(user)

    if (!findAUserArtesao) {
      throw new AppError('user not found to update this stock')
    }
    const stockRespository = getCustomRepository(StockUserRespository)
    // verificar se ja existe

    const findMateriaInStock = await stockRespository.findOne(
      { where: { materia_reference, user_id: findAUserArtesao.id } })
    if (!findMateriaInStock) {
      throw new AppError(`materia with this reference ${materia_reference} Or with this User ${user} not  found`)
    } else if (findMateriaInStock.user_id === findAUserArtesao.id &&
        findMateriaInStock.materia_reference === materia_reference) {
      await stockRespository.save({ ...findMateriaInStock, quantity })

      return findMateriaInStock
    }

    findMateriaInStock.user_id = user_id
    await stockRespository.save({ ...findMateriaInStock, quantity })

    return findMateriaInStock
  }
} export { UpdateStockUserCase }
