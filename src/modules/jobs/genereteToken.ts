
import { compare } from 'bcrypt'
import { getRepository, EntityRepository } from 'typeorm'
import { Users } from '../users/models/Users'
import { AppError } from '../../erros/AppError'
import { GenerateRefreshToken } from '../../provider/generateRefreshToken'
import { RefreshToken } from '../../database/model/refreshToken'
import { Token } from './Token'
interface RequestUser {
    email: string;
    password: string;
}

interface ResponseUser {
    user: Users;
    token: string;
    refreshToken : RefreshToken
}

@EntityRepository(Users)
class GenerateToken {
  public async execute ({
    email,
    password
  }: RequestUser): Promise<ResponseUser> {
    const userRepository = getRepository(Users)

    const user = await userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }

    const comparedPassword = await compare(password, user.password)
    if (!comparedPassword) {
      throw new AppError('Incorrect Email/password  combination', 401)
    }

    const token = Token(user)

    const generateRefreshTokenProvider = new GenerateRefreshToken()
    const refreshToken = await generateRefreshTokenProvider.execute(user.id)

    return {
      user,
      token,
      refreshToken
    }
  }
}

export { GenerateToken }
