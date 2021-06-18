import { EntityRepository, getCustomRepository } from 'typeorm'
import { ensureIsValidUuid } from '../../validators/ensureIsValiduuid'
import { Users } from '../../models/Users'
import { UserRepository } from '../../repositories/UsersRespository'
import { AppError } from '../../../../erros/AppError'

@EntityRepository(Users)
class ListOneUSerUseCase {
  public async execute (id: string): Promise<Users> {
    ensureIsValidUuid(id)
    const userRespository = getCustomRepository(UserRepository)
    const userFinded = await userRespository.FindById(id)
    if (!userFinded) {
      throw new AppError(
        'User not found,  please create one , or try with outher id  '
      )
    }

    return userFinded
  }
}

export { ListOneUSerUseCase }
