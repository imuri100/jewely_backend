import { Pecas } from '../models/Pecas'

interface IPecasProps {

    name : string,
    reference: number,
    materia_reference : Array<{reference : number, quantity : number}>,
    user_id : string,
    stock_User_id : Array<string>
}

interface IPecasRepository {
    CreatePecas({ name, reference, user_id, materia_reference, stock_User_id } : Pecas) : Promise<Pecas>
    // FindById(id:string):Promise<Materias | null>
}

export { IPecasProps, IPecasRepository, Pecas }
