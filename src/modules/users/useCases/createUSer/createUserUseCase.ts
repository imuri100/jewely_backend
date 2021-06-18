/* eslint-disable no-useless-constructor */

import { EntityRepository, getCustomRepository } from 'typeorm'
import { hash } from 'bcrypt'
import { UserRepository, IusersProps } from '../../repositories/UsersRespository'
import { AppError } from '../../../../erros/AppError'
import { Users } from '../../models/Users'

@EntityRepository(Users)
class CreateUserUseCase {
  public async execute ({
    name,
    email,
    password,
    avatar,
    cargo
  }: IusersProps): Promise<IusersProps> {
    const userRespository = getCustomRepository(UserRepository)
    const findedUser = await userRespository.FindByEmail(email)

    if (findedUser) throw new AppError(' The User already exists! ', 302)

    const hashedPassword = await hash(password, 8)

    const user = await userRespository.CreateUser({
      name,
      email,
      password: hashedPassword,
      avatar,
      cargo
    })

    return user
  }
}
export { CreateUserUseCase }
