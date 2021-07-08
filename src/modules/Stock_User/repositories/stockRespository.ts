import { EntityRepository, Repository } from 'typeorm'
import { IStockUsersRepositories, StockUsers, IStockUsers } from './implementations/IStockRespository'

@EntityRepository(StockUsers)
class StockUserRespository extends Repository<StockUsers> implements IStockUsersRepositories {
  public async CreateStock ({ data, user_id, quantity } : IStockUsers) : Promise<StockUsers> {
    const stock = this.create({
      name: data.name,
      quantity,
      user_id: user_id,
      materia_id: data.id,
      materia_reference: data.reference,
      status: false,
      message: `Você recebeu uma nova Materia de  ${data.name}`

    })

    return await this.save(stock)
  }

  public async FindOneStockByReference (materia_reference : number) : Promise<StockUsers | null> {
    return await this.findOne({ where: { materia_reference } }) || null
  }

  public async FindOneStockByUser_id (user_id : string, materia_reference : string) : Promise<StockUsers | null> {
    return await this.findOne({ where: { user_id, materia_reference } }) || null
  }
}

export { StockUserRespository }
