import { EntityRepository, getRepository } from 'typeorm'
import { RefreshToken } from '../database/model/refreshToken'
import dayjs from 'dayjs'
@EntityRepository(RefreshToken)
class GenerateRefreshToken {
  async execute (userId: string) : Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'minute').unix()

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
