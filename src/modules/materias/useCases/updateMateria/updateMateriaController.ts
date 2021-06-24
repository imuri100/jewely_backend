
/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UpdateMateriaUseCase } from './updateMateriaUseCase'
import { EnsureIfIsAdmin } from '../../middlewares/ensureIfIsAdmin'

class UpdateMateriaController {
  async handle (request : Request, response : Response) : Promise<Response> {
    const id_user = request.user.id
    await getCustomRepository(EnsureIfIsAdmin).execute(id_user)
    const { name, quantity, reference, user_id } = request.body

    const createMateriaUseCase = getCustomRepository(UpdateMateriaUseCase)
    const materia = await createMateriaUseCase.execute({ name, quantity, reference, user_id })

    return response.status(201).json(materia)
  }
}

export { UpdateMateriaController }
