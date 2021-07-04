import { EntityRepository, Repository } from 'typeorm'
import { IPecasProps, IPecasRepository, Pecas } from './IPecasRepository'

@EntityRepository(Pecas)
class PecasRepository extends Repository<Pecas> implements IPecasRepository {
  public async CreatePecas ({ name, reference, user_id, materia_reference, stock_User_id } : IPecasProps) : Promise<Pecas> {
    const peca = this.create({ name, reference, materia_reference, user_id, stock_User_id })

    await this.save(peca)

    return peca
  }

  //   async FindById (id:string):Promise<Pecas | null> {
  //     const materia = await this.findOne({ where: { id } })

//     return materia || null
//   }
}

export { PecasRepository }
