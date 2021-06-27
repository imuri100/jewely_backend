import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { MateriaRepositoty } from '../../../materias/repositories/materiaRepository'
import { EnsureIfIsArtesao } from '../../../pecas/middlewares/ensureIfIsArtesao'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { StockUsers } from '../../models/stockUsers'
import { IStockProps } from '../../repositories/implementations/IStockRespository'
import { StockUserRespository } from '../../repositories/stockRespository'

@EntityRepository(StockUsers)
class CreateStockUsersUseCase {
  public async execute ({ quantity, user_id, materia_reference } :IStockProps) : Promise<StockUsers> {
    await new EnsureIfIsArtesao().execute(user_id)
    const userRepository = getCustomRepository(UserRepository)
    const findArtesao = await userRepository.FindById(user_id)

    if (!findArtesao || findArtesao.cargo !== 'artesao') {
      throw new AppError('user is not type Artesao or user Artesao not found')
    }
    const stockRespository = getCustomRepository(StockUserRespository)
    // verificar se ja existe
    const materiaRepository = getCustomRepository(MateriaRepositoty)
    const findMateriaByReference = await materiaRepository.findOne({ where: { reference: materia_reference } })

    if (!findMateriaByReference) {
      throw new AppError(`materia with this reference ${materia_reference} not  found`)
    }

    let findMateriaInStock = await stockRespository.findOne({ where: { materia_reference, user_id } })

    if (!findMateriaInStock) {
      console.log(findMateriaByReference)
      if (quantity > findMateriaByReference.quantity) {
        throw new AppError('The amount of this material is insufficeint')
      }

      findMateriaInStock = await stockRespository.CreateStock({ data: findMateriaByReference, user_id: findArtesao.id, quantity })

      findMateriaByReference.quantity -= quantity
      await materiaRepository.save(findMateriaByReference)

      return findMateriaInStock
    }

    if (quantity > findMateriaByReference.quantity) {
      throw new AppError(`The amount of this material (${findMateriaByReference.reference}) is insufficeint`)
    }

    await stockRespository.save({ ...findMateriaInStock, quantity: findMateriaInStock.quantity += quantity })
    findMateriaByReference.quantity -= quantity
    await materiaRepository.save(findMateriaByReference)

    return findMateriaInStock
  }
} export { CreateStockUsersUseCase }
