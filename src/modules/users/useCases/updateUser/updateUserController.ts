
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UpdateUserUseCase } from './updateUserUserCase'

class UpdateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      avatar,
      cargo
    } = request.body

    const { id } = request.params

    const updateUserUseCase = getCustomRepository(UpdateUserUseCase)
    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      avatar,
      cargo
    })

    return response.status(200).json(user)
  }
}

export { UpdateUserController }
