import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ensureIsValidUuid } from '../../users/validators/ensureIsValiduuid'
import { CreateVendasUseCase } from './createVendasUseCase'

class VendasController {
  async handle (request: Request, response : Response) {
    try {
      const { pecaId } = request.body
      ensureIsValidUuid(pecaId)

      const userId = request.user.id
      const createVendasUseCase = getCustomRepository(CreateVendasUseCase)
      const venda = await createVendasUseCase.execute(pecaId, userId)

      return response.status(201).json(venda)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

export { VendasController }
