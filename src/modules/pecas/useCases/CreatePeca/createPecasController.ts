import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { CreatePecaUseCase } from './createPecaUseCases'

class CreatePecasController {
  public async handle (request : Request, response : Response) : Promise<Response> {
    const { id } = request.user

    const { name, materia_reference } = request.body
    const createPecaUseCase = getCustomRepository(CreatePecaUseCase)
    const { FileName: FilePathPDF, peca } = await createPecaUseCase.execute({ name, materia_reference, user_id: id })
    const fileName = FilePathPDF.replace('./src', '')
    const newFileName = `${request.protocol}://${request.headers.host}`.concat(fileName)
    return response.status(201).json({ FilePathPDF: newFileName, peca })
  }
}

export { CreatePecasController }
