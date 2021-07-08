import { getRepository } from 'typeorm'
import { RefreshToken } from '../database/model/refreshToken'
import dayjs from 'dayjs'
class GenerateRefreshToken {
  async execute (userId: string) : Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'second').unix()

    const refreshTokenRepository = getRepository(RefreshToken)
    const refreshToken = refreshTokenRepository.create({
      userId,
      expiresIn
    })

    await refreshTokenRepository.save(refreshToken)

    return refreshToken
  }
}

export { GenerateRefreshToken }
