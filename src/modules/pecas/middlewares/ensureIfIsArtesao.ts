
import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../erros/AppError'
import { Users } from '../../users/models/Users'
import { UserRepository } from '../../users/repositories/UsersRespository'

@EntityRepository(Users)
class EnsureIfIsArtesao {
  async execute (id :string) : Promise<void> {
    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.FindById(id)

    if (!user || user.cargo !== 'artesao') {
      throw new AppError('user not found or you dont have permision of type artesao ')
    }
  }
}

export { EnsureIfIsArtesao }
