import { EntityRepository, getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { PecasDeleted } from '../../models/PecaDeleted'

@EntityRepository(PecasDeleted)
class RemainsOfPartsUseCase {
  async execute (user_id : string) :Promise<PecasDeleted[]> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id: user_id } })

    const pecadeletdRepository = getRepository(PecasDeleted)
    let peca = await pecadeletdRepository.find({})
    if (!user) {
      throw new AppError('user not found')
    } else if (user.cargo !== 'administrador') {
      peca = await pecadeletdRepository.find({ where: { userId: user_id } })
    }

    return peca
  }
}

export { RemainsOfPartsUseCase }
