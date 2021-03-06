import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CreatePecaUseCase } from './createPecaUseCases'

class CreatePecasController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.user

    const { name, materia_reference } = request.body
    const newFileName = `${request.protocol}://${request.headers.host}`
    const createPecaUseCase = getCustomRepository(CreatePecaUseCase)
    const peca = await createPecaUseCase.execute({ name, materia_reference, user_id: id, PDF_url: newFileName })

    return response.status(201).json(peca)
  }
}

export { CreatePecasController }
