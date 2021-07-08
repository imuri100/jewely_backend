import { AceptStockUser } from './aceptStockUser'
import { ListAllStockController } from './listAllStockUserController'
import { ListOneStockController } from './ListOneStockUserController'

const listOneStockController = new ListOneStockController()
const listAllStockController = new ListAllStockController()
const aceptStockUser = new AceptStockUser()

export { listOneStockController, listAllStockController, aceptStockUser }
