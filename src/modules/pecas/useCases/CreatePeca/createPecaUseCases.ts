import { EntityRepository, getCustomRepository } from 'typeorm'
import { IMateriaProps } from '../../repositories/IMateriasRepository'
import { Materias } from '../../models/Materias'
import { MateriaRepositoty } from '../../repositories/materiaRepository'
import { ensureIsValidUuid } from '../../../users/validators/ensureIsValiduuid'
import { EnsureIfIsAdmin } from '../../middlewares/ensureIfIsAdmin'
import { EnsureIfIsArtesao } from '../../middlewares/ensureIfIsArtesao'
import { PecasRepository } from '../../repositories/pecasRepositoy'
import { Pecas } from '../../models/Pecas'
import { IPecasProps } from '../../repositories/IPecasRepository'

@EntityRepository(Pecas)
class CreatePecaUseCase {
  async execute ({ name, quantity, reference, user_id, materia_reference } : IPecasProps) : Promise<IPecasProps> {}
}

export { CreatePecaUseCase }
