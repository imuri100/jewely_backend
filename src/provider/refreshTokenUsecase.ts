import { EntityRepository, getRepository } from 'typeorm'
import { RefreshToken } from '../database/model/refreshToken'
import { AppError } from '../erros/AppError'

@EntityRepository(RefreshToken)
class RefreshTokenUseCase {
  async execute (refreshToken : string) : Promise<RefreshToken> {
    const refreshTokenRepository = getRepository(RefreshToken)

    const token = await refreshTokenRepository.findOne({ where: { id: refreshToken } })

    if (!token) {
      throw new AppError('token invalid')
    }

    return token
  }
}

export { RefreshTokenUseCase }
