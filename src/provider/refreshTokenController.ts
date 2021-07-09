import { getCustomRepository } from 'typeorm'
import { RefreshTokenUseCase } from './refreshTokenUsecase'
import { Request, Response } from 'express'
import { ensureIsValidUuid } from '../modules/users/validators/ensureIsValiduuid'
class RefreshTokenControler {
  async hendle (request : Request, response : Response) {
    try {
      const { refresh_token } = request.body
      ensureIsValidUuid(refresh_token)
      const freshTokenUserCase = getCustomRepository(RefreshTokenUseCase)

      const token = await freshTokenUserCase.execute(refresh_token)

      return response.json(token)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { RefreshTokenControler }
