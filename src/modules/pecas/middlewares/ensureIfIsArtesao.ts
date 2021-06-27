
import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../erros/AppError'
import { Users } from '../../users/models/Users'
import { UserRepository } from '../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../users/validators/ensureIsValiduuid'

@EntityRepository(Users)
class EnsureIfIsArtesao {
  async execute (id :string) : Promise<void> {
    ensureIsValidUuid(id)
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(id)

    if (!user) {
      throw new AppError('user not found ')
    } else if (user.cargo !== 'artesao') {
      throw new AppError('user in  body request dont have permision of type artesao ')
    }
  }
}

export { EnsureIfIsArtesao }
