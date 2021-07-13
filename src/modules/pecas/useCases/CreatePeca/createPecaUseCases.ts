/* eslint-disable prefer-promise-reject-errors */
import { EntityRepository, getCustomRepository, getRepository } from 'typeorm'
import { PecasRepository } from '../../repositories/pecasRepositoy'
import { Pecas } from '../../models/Pecas'
import { IPecasProps } from '../../repositories/IPecasRepository'
import { StockUserRespository } from '../../../Stock_User/repositories/stockRespository'
import { AppError } from '../../../../erros/AppError'
import { EnsureIfIsArtesao } from '../../middlewares/ensureIfIsArtesao'
import { GerarPDF } from '../../../jobs/gerarPDF'
import { Users } from '../../../users/models/Users'

interface ResponseProps {
    peca : Pecas,
    FileName : string
}
@EntityRepository(Pecas)
class CreatePecaUseCase {
  async execute ({ name, materia_reference, user_id } : Omit<IPecasProps, 'reference'| 'stock_User_id'>) : Promise<ResponseProps> {
    try {
      const newNamePice = name.trim()
      await new EnsureIfIsArtesao().execute(user_id)

      const stockUserRespository = getCustomRepository(StockUserRespository)
      const materiaStockUser = await stockUserRespository.find({ where: { user_id } })
      const pecasRepositoy = getCustomRepository(PecasRepository)
      const references : typeof materia_reference = []

      // removendo Duplicados
      const filteredDupliced : Promise<typeof materia_reference> = new Promise((resolve, reject) => {
        const duplicadRemoved : typeof materia_reference = []

        materia_reference.forEach(item => {
          const duplicated = duplicadRemoved.findIndex(redITem => {
            return item.reference === redITem.reference
          }) > -1

          if (!duplicated) {
            duplicadRemoved.push(item)
            resolve(duplicadRemoved)
          } else {
            reject((new Error('erro ao remover os duplicados')))
          }
        })
      })
      const StokUserId : any = []
      const removed = await filteredDupliced
      await removed.reduce(async (prevValue : any, currentValue) : Promise<number> => {
        const findPeca = await pecasRepositoy.findOne({ where: { user_id, name: newNamePice } })

        if (findPeca) {
          throw new AppError('this Peca Already Exists')
        }

        const reference = materiaStockUser.find(stock => stock.materia_reference === currentValue.reference)

        if (!reference) {
          throw new AppError(` Materias with  reference ${currentValue.reference} does not exist in the STOCK user`)
        } else if (reference.quantity < currentValue.quantity) {
          throw new AppError(`Amount  of insufficiente Materia ${currentValue.reference} in the  STOCK user`)
        } else if (reference.status === false || reference.message.length >= 1) {
          throw new AppError(` You need to accept this Materia ${currentValue.reference} in your the  STOCK user before`)
        }
        // deminuir na quantidade do stok do usuario

        reference.quantity -= currentValue.quantity
        await stockUserRespository.save(reference)

        prevValue = {
          reference: reference.materia_reference,
          quantity: currentValue.quantity
        }
        references.push(prevValue)
        StokUserId.push(reference.id)

        return prevValue
      }, {})

      const peca = await pecasRepositoy.CreatePecas({
        name,
        stock_User_id: StokUserId,
        user_id,
        materia_reference: references

      })
      const user = await getRepository(Users).findOne({ where: { id: user_id } })
      const FileName = GerarPDF(peca, user)
      return { FileName, peca }
    } catch (error) {
      throw new AppError(error.message.toString())
    }
  }
}

export { CreatePecaUseCase }
