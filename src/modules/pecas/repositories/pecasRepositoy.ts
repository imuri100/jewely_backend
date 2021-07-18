import { EntityRepository, Repository } from 'typeorm'
import { IPecasProps, IPecasRepository, Pecas } from './IPecasRepository'

@EntityRepository(Pecas)
class PecasRepository extends Repository<Pecas> implements IPecasRepository {
  public async CreatePecas ({ name, user_id, materia_reference, stock_User_id, PDF_url } : IPecasProps) : Promise<Pecas> {
    const peca = this.create({ name, materia_reference, user_id, stock_User_id, armazen: false, PDF_url })

    await this.save(peca)

    return peca
  }

  async FindPecaById (id:string):Promise<Pecas | null> {
    const materia = await this.findOne({ where: { id } })

    return materia || null
  }
}

export { PecasRepository }
