import { Request, Response } from 'express'
import { EntityRepository, getCustomRepository, getRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { PecasDeleted } from '../../models/PecaDeleted'
import { PecasRepository } from '../../repositories/pecasRepositoy'

@EntityRepository(PecasDeleted)
class DeleteRemainsOfPartsUseCase {
  async handle (request :Request, response : Response) :Promise<Response> {
    const { id: user_id } = request.user
    const { peca_id } = request.body
    ensureIsValidUuid(peca_id)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id: user_id } })

    const pecadeletdRepository = getRepository(PecasDeleted)
    const pecasRepository = getCustomRepository(PecasRepository)
    const peca = await pecasRepository.findOne({ where: { id: peca_id } })
    if (!user) {
      throw new AppError('user not found')
    } else if (!peca) {
      throw new AppError('Peca width this id not found')
    } else if (user.cargo !== 'administrador' && user.id !== peca.user_id) {
      throw new AppError('you dont have permission to see this peca deleted')
    }

    // const pecadeleted = pecadeletdRepository.create()
    const pecadeleted = await pecadeletdRepository.save({ peca_deleted: peca.name, peca_id: peca.id, userId: peca.user_id })

    await pecasRepository.delete(peca.id)

    return response.status(200).json(pecadeleted)
  }
}

export { DeleteRemainsOfPartsUseCase }
