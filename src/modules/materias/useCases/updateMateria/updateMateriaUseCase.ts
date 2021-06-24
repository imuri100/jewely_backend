/* eslint-disable no-useless-constructor */

import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { MateriaRepositoty } from '../../repositories/materiaRepository'
import { IMateriaProps, Materias } from '../../repositories/IMateriasRepository'
import { UserRepository } from '../../../users/repositories/UsersRespository'

@EntityRepository(Materias)
class UpdateMateriaUseCase {
  async execute ({ name, quantity, reference, user_id } : IMateriaProps) : Promise<IMateriaProps> {
    ensureIsValidUuid(user_id)

    const userRepository = getCustomRepository(UserRepository)
    const materiaRepository = getCustomRepository(MateriaRepositoty)
    let materia = await materiaRepository.findOne({ where: { reference } })
    if (!materia) {
      throw new AppError('materia with this reference not found to update')
    } else if (materia.name === name.trim() && materia.reference !== reference) {
      materia = await materiaRepository.findOne({ where: { reference } })
      throw new AppError(`uma materia com este nome ja foi cadastrada sua  referencia é ${materia?.reference}`)
    }
    if (await userRepository.findOne({ where: { id: user_id } })) {
      throw new AppError('this user not exist')
    }
    await materiaRepository.save({ ...materia, name, quantity, reference })

    return materia
  }
}
export { UpdateMateriaUseCase }
