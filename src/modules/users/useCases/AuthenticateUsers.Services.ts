import { compare } from 'bcrypt'
import { getRepository, EntityRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { Users } from '../models/Users'
import AuthConfig from '../../../config/auth'
import { AppError } from '../../../erros/AppError'

interface RequestUser {
    email: string;
    password: string;
}

interface ResponseUser {
    user: Users;
    token: string;
}

@EntityRepository(Users)
class AuthenticateUserServices {
  public async execute ({
    email,
    password
  }: RequestUser): Promise<ResponseUser> {
    const userRepository = getRepository(Users)

    const user = await userRepository.findOne({
      where: { email: email.trim() }
    })

    if (!user) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }

    const comparedPassword = await compare(password, user.password)
    if (!comparedPassword) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }

    const token = sign({}, AuthConfig.JWT.secret, {
      subject: user.id.toString(),
      expiresIn: AuthConfig.JWT.expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserServices
