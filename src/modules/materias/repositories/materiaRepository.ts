import { EntityRepository, Repository } from 'typeorm'
import { Materias } from '../models/Materias'
import { IMateriaProps, IMateriasRepository } from './IMateriasRepository'

@EntityRepository(Materias)
class MateriaRepositoty extends Repository<Materias> implements IMateriasRepository {
  public async CreateMateria ({ name, quantity, reference, user_id } : IMateriaProps) : Promise<Materias> {
    const materia = this.create({ name, quantity, reference, user_id })

    await this.save(materia)

    return materia
  }

  async FindById (id:string):Promise<Materias | null> {
    const materia = await this.findOne({ where: { id } })

    return materia || null
  }
}

export { MateriaRepositoty }
