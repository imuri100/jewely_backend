import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { EnsureIfIsAdmin } from '../../../materias/middlewares/ensureIfIsAdmin'
import { UpdateStockUserCase } from './UpdateStockUserCase'

class UpdateStockUserController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.user

    await new EnsureIfIsAdmin().execute(id)
    const { quantity, user_id } = request.body
    const reference = request.params.reference
    const user = request.params.id

    const updateStockUserCase = getCustomRepository(UpdateStockUserCase)

    const stockUpdated = await updateStockUserCase.execute(
      { quantity, materia_reference: Number(reference.trim()), user_id }, user)

    return response.status(200).json(stockUpdated)
  }
}
export { UpdateStockUserController }
