import { EntityRepository, getCustomRepository } from 'typeorm'
import { IMateriaProps } from '../../repositories/IMateriasRepository'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { EnsureIfIsAdmin } from '../../middlewares/ensureIfIsAdmin'
import { EnsureIfIsArtesao } from '../../middlewares/ensureIfIsArtesao'
import { PecasRepository } from '../../repositories/pecasRepositoy'

interface ResponseProps {
  materia : Materias,
  message : string
}

@EntityRepository(Materias)
class CreatePecaUseCase {
  async execute ({ name, quantity, reference, user_id } : IMateriaProps) : Promise<ResponseProps> {
    ensureIsValidUuid(user_id)
    await new EnsureIfIsArtesao().execute(user_id)

    let newQuantity : number = quantity
    const pecasRepository = getCustomRepository(PecasRepository)
    let message
    let materia = await materiaRepository.findOne({ where: { reference } })
    materia ? message = 'reference already exits!' : message = ''
    if (!materia) {
      materia = await materiaRepository.findOne({ where: { name } })
      materia ? message = 'The Name of Materia already exists' : message = ''
      newQuantity = 0

      if (!materia) {
        materia = await materiaRepository.CreateMateria({ name, reference, user_id, quantity })
        message = ''
      }
    }

    await materiaRepository.save({ ...materia, quantity: materia.quantity += newQuantity })

    return { materia, message }
  }
}

export { CreatePecaUseCase }
