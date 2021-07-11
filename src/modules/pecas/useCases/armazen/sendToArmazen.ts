import { Request, Response } from 'express'
import { EntityRepository, getCustomRepository } from 'typeorm'
import { AppError } from '../../../../erros/AppError'
import { UserRepository } from '../../../users/repositories/UsersRespository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { EnsureIfIsArtesao } from '../../middlewares/ensureIfIsArtesao'
import { Pecas } from '../../repositories/IPecasRepository'
import { PecasRepository } from '../../repositories/pecasRepositoy'

@EntityRepository(Pecas)
class SendToArmazen {
  async handle (request :Request, response : Response) : Promise<Response> {
    const { id } = request.user
    const { peca_id } = request.body
    await new EnsureIfIsArtesao().execute(id)
    ensureIsValidUuid(peca_id)

    const userRepository = getCustomRepository(UserRepository)
    const user = await userRepository.findOne({ where: { id } })

    const pecasRepository = getCustomRepository(PecasRepository)
    const peca = await pecasRepository.findOne({ where: { id: peca_id } })

    if (!user) {
      throw new AppError('user not found')
    }
    if (!peca) {
      throw new AppError('piece not found to send warehouses')
    } else if (peca.user_id !== user.id) {
      throw new AppError('This piece belongs to another user')
    }

    await pecasRepository.save({ ...peca, armazen: true })

    return response.status(200).json({ message: 'The piece was  send the main store' })
  }
}

export { SendToArmazen }
