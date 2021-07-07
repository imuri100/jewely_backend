import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { IPecasProps, Pecas } from '../../repositories/IPecasRepository'
import { PecasRepository } from '../../repositories/pecasRepositoy'

@EntityRepository(Pecas)
class ListOnePecasUserCase {
  async execute (id : string, user_id : string) : Promise<IPecasProps> {
    ensureIsValidUuid(id)
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id: user_id } })

    const pecasRepository = getCustomRepository(PecasRepository)
    const peca = await pecasRepository.findOne({ where: { id } })

    if (!user) {
      throw new AppError('user not found')
    }
    if (!peca) {
      throw new AppError('peca not found')
    } else if (peca.user_id !== user_id && user.cargo !== 'administrador') {
      throw new AppError('you dont have permission to see this Pice')
    }

    return peca
  }
}

export { ListOnePecasUserCase }
