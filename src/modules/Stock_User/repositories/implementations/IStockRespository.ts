import { Materias } from '../../../materias/repositories/IMateriasRepository'
import { StockUsers } from '../../models/stockUsers'

type IStockUsers = {
   data : Materias,
   user_id : string,
   quantity : number

}

interface IStockProps {
    quantity : number,
     user_id : string,
     materia_reference : number
}

interface IStockUsersRepositories {
  CreateStock({
    data, user_id
  } : IStockUsers) : Promise<StockUsers>

  FindOneStockByReference(materia_reference : number) : Promise<StockUsers | null>
  FindOneStockByUser_id(user_id : string, materia_reference : string) : Promise<StockUsers | null>

}

export { IStockUsersRepositories, StockUsers, IStockUsers, IStockProps }
