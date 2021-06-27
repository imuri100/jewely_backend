import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { EnsureIfIsAdmin } from '../../../materias/middlewares/ensureIfIsAdmin'
import { CreateStockUsersUseCase } from './createStockUserCase'

class CreateStockUsersController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.user

    await new EnsureIfIsAdmin().execute(id)
    const { quantity, user_id, materia_reference } = request.body

    const createStockUsersUseCase = getCustomRepository(CreateStockUsersUseCase)

    const createStock = await createStockUsersUseCase.execute({ quantity, materia_reference, user_id })

    return response.status(201).json(createStock)
  }
}
export { CreateStockUsersController }
