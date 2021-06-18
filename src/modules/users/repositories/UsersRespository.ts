import { Repository, EntityRepository } from 'typeorm'
import { Users } from '../models/Users'
import { IUserRespository, IusersProps } from './IusersRepository'

@EntityRepository(Users)
class UserRepository extends Repository<Users> implements IUserRespository {
  public async CreateUser ({
    name,
    email,
    password,
    avatar,
    cargo
  }: IusersProps): Promise<Users> {
    const user = this.create({
      name,
      email,
      avatar,
      password,
      cargo

    })

    await this.save(user)

    return user
  }

  async FindById (id:string) : Promise<Users | null> {
    const user = await this.findOne({ where: { id } })

    return user || null
  }

  async FindByEmail (email:string) : Promise<Users | null> {
    const user = await this.findOne({ where: { email } })

    return user || null
  }

  async DeleteUSer (id:string) : Promise<void> {
    await this.delete(id)
  }

  public async UpdateUser ({
    name,
    email,
    avatar,
    cargo
  }: IusersProps, userFinded : IusersProps): Promise<Users> {
    const user = await this.save({ ...userFinded, name, email, avatar, cargo })

    return user
  }
}

export { UserRepository, IusersProps }
