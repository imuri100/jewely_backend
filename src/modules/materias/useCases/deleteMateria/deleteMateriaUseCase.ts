import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'

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
