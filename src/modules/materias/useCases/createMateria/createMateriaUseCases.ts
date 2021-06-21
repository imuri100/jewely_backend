import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { IMateriaProps } from '../../repositories/IMateriasRepository'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'

@EntityRepository(Materias)
class CreateMateriaUseCase {
  async execute ({ name, quantity, reference, user_id } : IMateriaProps) : Promise<Materias> {
    ensureIsValidUuid(user_id)
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.FindById(user_id)

    if (!user || user.cargo.trim() !== 'admin') {
      throw new AppError('user not found or you have not permision to create Materia')
    }
    const materiaRepository = getCustomRepository(MateriaRepositoty)

    let materia = await materiaRepository.findOne({ where: { reference } })

    if (!materia) {
      materia = await materiaRepository.createMateria({ name, quantity, reference, user_id })
    }

    return materia
  }
}

export { CreateMateriaUseCase }
