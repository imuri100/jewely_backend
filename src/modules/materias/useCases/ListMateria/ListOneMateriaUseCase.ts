import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'

@EntityRepository(Materias)
class ListOneMateriaUseCase {
  async execute (id : string) : Promise<Materias> {
    const materiaRepository = getCustomRepository(MateriaRepositoty)
    const materia = await materiaRepository.FindById(id)
    if (!materia) {
      throw new AppError('materia not found')
    }
    return materia
  }
}

export { ListOneMateriaUseCase }
