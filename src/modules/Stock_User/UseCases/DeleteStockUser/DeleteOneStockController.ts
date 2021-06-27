import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { DeleteOneStockUseCase } from './DeleteOneStockUseCase'

class DeleteOneStockController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const user_id = request.params.id
    const user_idLogged = request.user.id
    const materia_reference = request.params.reference
    const deleteOneStockUseCase = getCustomRepository(DeleteOneStockUseCase)

    await deleteOneStockUseCase.execute({ user_id, user_idLogged, materia_reference })

    return response.status(204).send()
  }
}
export { DeleteOneStockController }
