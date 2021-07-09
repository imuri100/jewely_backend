import dayjs from 'dayjs'
import { EntityRepository, getCustomRepository, getRepository } from 'typeorm'
import { RefreshToken } from '../database/model/refreshToken'
import { AppError } from '../erros/AppError'
import { Token } from '../modules/jobs/Token'
import { Users } from '../modules/users/models/Users'
import { UserRepository } from '../modules/users/repositories/UsersRespository'
import { GenerateRefreshToken } from './generateRefreshToken'

@EntityRepository(Users)
class RefreshTokenUseCase {
  async execute (refresh_Token : RefreshToken) {
    const refreshTokenRepository = getRepository(RefreshToken)

    const refreshTokenFinded = await refreshTokenRepository.findOne({ where: { id: refresh_Token } })

    if (!refreshTokenFinded) {
      throw new AppError('token invalid')
    }

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id: refreshTokenFinded.userId } })
    if (!user) {
      throw new AppError('user not found to gerate new Refresh Token')
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshTokenFinded.expiresIn))
    const token = Token(user)
    if (refreshTokenExpired) {
      await refreshTokenRepository.delete(refreshTokenFinded)
      const generateRefreshToken = new GenerateRefreshToken()

      const refreshToken = await generateRefreshToken.execute(refreshTokenFinded.userId)

      return { token, refreshToken }
    }

    return { token }
  }
}

export { RefreshTokenUseCase }
