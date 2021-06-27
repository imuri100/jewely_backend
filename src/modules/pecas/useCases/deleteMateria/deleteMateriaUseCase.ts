import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { Materias } from '../../../materias/models/Materias'
import { MateriaRepositoty } from '../../../materias/repositories/materiaRepository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'

@EntityRepository(Materias)
class DeleteMateriaUseCase {
  async execute (id : string) : Promise<void> {
    ensureIsValidUuid(id)

    const materiaRepository = getCustomRepository(MateriaRepositoty)
    const materia = await materiaRepository.findOne({ where: { id } })
    if (!materia) {
      throw new AppError('materia not found to delete')
    }
    await materiaRepository.delete(id)
  }
}
export { DeleteMateriaUseCase }
