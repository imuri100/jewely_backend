import { EntityRepository, Repository } from 'typeorm'
import { IPecasProps, IPecasRepository, Pecas } from './IPecasRepository'

@EntityRepository(Pecas)
class PecasRepository extends Repository<Pecas> implements IPecasRepository {
  public async CreatePecas ({ name, quantity, reference, user_id, materia_reference } : IPecasProps) : Promise<Pecas> {
    const peca = this.create({ name, quantity, reference, materia_reference, user_id })

    await this.save(peca)

    return peca
  }

  //   async FindById (id:string):Promise<Pecas | null> {
  //     const materia = await this.findOne({ where: { id } })

//     return materia || null
//   }
}

export { PecasRepository }
