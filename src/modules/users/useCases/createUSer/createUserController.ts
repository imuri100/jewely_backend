
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CreateUserUseCase } from './createUserUseCase'

class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      avatar,
      cargo
    } = request.body

    const createUserUseCase = getCustomRepository(CreateUserUseCase)
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      avatar,
      cargo
    })

    return response.status(200).json(user)
  }
}

export { CreateUserController }
