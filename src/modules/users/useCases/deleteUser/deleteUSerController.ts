
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { DeleteUserUseCase } from './deleteUSerUseCase'

class DeleteUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteUserUseCase = getCustomRepository(DeleteUserUseCase)
    await deleteUserUseCase.execute(id)

    return response.status(204).send()
  }
}

export { DeleteUserController }
