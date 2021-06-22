import { EntityRepository, getCustomRepository } from 'typeorm'
import { IMateriaProps } from '../../repositories/IMateriasRepository'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { EnsureIfIsAdmin } from '../../middlewares/ensureIfIsAdmin'

interface ResponseProps {
  materia : Materias,
  message : string
}

@EntityRepository(Materias)
class CreateMateriaUseCase {
  async execute ({ name, quantity, reference, user_id } : IMateriaProps) : Promise<ResponseProps> {
    ensureIsValidUuid(user_id)
    await new EnsureIfIsAdmin().execute(user_id)

    let newQuantity : number = quantity
    const materiaRepository = getCustomRepository(MateriaRepositoty)
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

export { CreateMateriaUseCase }
