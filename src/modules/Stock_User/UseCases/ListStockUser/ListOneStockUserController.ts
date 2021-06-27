import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ListOneStockUseCase } from './ListOneStockUseCase'

class ListOneStockController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.params
    const user_idLogged = request.user.id

    const listOneStockUseCase = getCustomRepository(ListOneStockUseCase)

    const createStock = await listOneStockUseCase.execute({ user_id: id, user_idLogged })

    return response.status(201).json(createStock)
  }
}
export { ListOneStockController }
