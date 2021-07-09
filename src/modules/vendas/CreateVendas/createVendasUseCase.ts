import { EntityRepository, getRepository } from 'typeorm'
import { AppError } from '../../../erros/AppError'
import { EnsureIfIsAdmin } from '../../materias/middlewares/ensureIfIsAdmin'
import { StockUsers } from '../../Stock_User/models/stockUsers'
import { Users } from '../../users/models/Users'
import { Vendas } from '../models/Vendas'

@EntityRepository(Vendas)
class CreateVendasUseCase {
  async execute (pecaId:string, userId : string) : Promise<Vendas> {
    const vendasRepository = getRepository(Vendas)
    const userRepository = getRepository(Users)
    const pecaInStok = getRepository(StockUsers)

    await new EnsureIfIsAdmin().execute(userId)

    const user = await userRepository.findOne({ where: { id: userId } })
    const peca = await pecaInStok.findOne({ where: { id: pecaId } })

    if (!user) {
      throw new AppError('user not found', 401)
    } else if (!peca) {
      throw new AppError('this pice not found in stock of users')
    }

    const venda = vendasRepository.create({ peca_name: peca.name, pecaId: peca.id, userId: user.id })
    await vendasRepository.save(venda)
    await pecaInStok.save({ ...peca, vendido: true })

    return venda
  }
}

export { CreateVendasUseCase }
