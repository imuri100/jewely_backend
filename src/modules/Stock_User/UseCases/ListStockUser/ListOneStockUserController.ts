import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ListOneStockUseCase } from './ListOneStockUseCase'

class ListOneStockController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const user_idLogged = request.user.id
    const { term } = request.body

    const listOneStockUseCase = getCustomRepository(ListOneStockUseCase)

    const createStock = await listOneStockUseCase.execute({ user_idLogged, term })

    return response.status(200).json(createStock)
  }
}
export { ListOneStockController }
