import { DeleteRemainsOfPartsUseCase } from './deletePecas'
import { ListRemainsOfPartsController } from './ListRemainsOfPartsController'

const deleteRemainsOfPartsUseCase = new DeleteRemainsOfPartsUseCase()
const listRemainsOfPartsController = new ListRemainsOfPartsController()

export { deleteRemainsOfPartsUseCase, listRemainsOfPartsController }
