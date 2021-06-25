import { EntityRepository, getRepository } from 'typeorm'
import { EnsureIfIsArtesao } from '../pecas/middlewares/ensureIfIsArtesao'
import { ensureIsValidUuid } from '../users/validators/ensureIsValiduuid'
import { StockUsers } from './models/stockUsers'

type IStockUsers = {
    peca_name : string;
    quantity : number;
    materia_id : string;
    user_id : string;
    materia_reference : number

}

@EntityRepository(StockUsers)
class CreateStockUsersServives {
  public async execute ({ materia_id, peca_name, quantity, user_id, materia_reference } :IStockUsers) : Promise<any> {
    ensureIsValidUuid(user_id)
    await new EnsureIfIsArtesao().execute(user_id)

    const stockRespository = getRepository(StockUsers)
    // verificar se ja existe
    const findMateriaInStock = await stockRespository.findOne({ where: { materia_reference } })

    if (!findMateriaInStock) {
      const newVerify = await stockRespository.findOne({ where: { peca_name } })

      if (!newVerify || (newVerify.peca_name !== peca_name && newVerify.materia_reference !== materia_reference)) {
        // se nao tiver no stoke esta materia tem que criar
        const stock = stockRespository.create({ peca_name, quantity, user_id, materia_id })
        await stockRespository.save(stock)

        return stock
      }
    }
    // se existir tem apenas actualizar
    await stockRespository.save({ ...findMateriaInStock, peca_name, quantity, user_id })
  }
} export { CreateStockUsersServives }
