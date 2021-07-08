
import { compare } from 'bcrypt'
import { getRepository, EntityRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { Users } from '../users/models/Users'
import { AppError } from '../../erros/AppError'
import AuthConfig from '../../config/auth'
import { GenerateRefreshToken } from '../../provider/generateRefreshToken'
import { RefreshToken } from '../../database/model/refreshToken'
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

    const token = sign({
      cargo: user.cargo,
      email: user.email
    }, AuthConfig.JWT.secret, {
      subject: user.id.toString(),
      expiresIn: AuthConfig.JWT.expiresIn

    })

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
