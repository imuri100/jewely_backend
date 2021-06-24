/* eslint-disable no-useless-constructor */

import { EntityRepository, getCustomRepository } from 'typeorm'
import { hash } from 'bcrypt'
import { UserRepository } from '../../repositories/UsersRespository'
import { AppError } from '../../../../erros/AppError'
import { Users } from '../../models/Users'
interface RequestProps {
    id : string
    name: string;
    cargo: 'artesao' | 'administrador';
    password: string;
    avatar: string;
}
@EntityRepository(Users)
class UpdateUserUseCase {
  public async execute ({
    id,
    name,
    password,
    avatar,
    cargo
  }: RequestProps): Promise<Users> {
    const userRespository = getCustomRepository(UserRepository)
    const findedUser = await userRespository.FindById(id)

    if (!findedUser) {
      throw new AppError(' User not found ', 302)
    }

    const hashedPassword = await hash(password, 8)

    const user = await userRespository.UpdateUser({
      name,
      password: hashedPassword,
      avatar,
      cargo
    }, findedUser)

    return user
  }
}
export { UpdateUserUseCase }
