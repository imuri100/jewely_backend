import { Pecas } from '../models/Pecas'

interface IPecasProps {

    name : string,
    materia_reference : Array<{reference : number, quantity : number}>,
    user_id : string,
    stock_User_id : string,
    PDF_url:string;

}

interface IPecasRepository {
    CreatePecas({ name, user_id, materia_reference, stock_User_id, host } : Pecas) : Promise<Pecas>
    FindPecaById(id:string):Promise<Pecas | null>
}

export { IPecasProps, IPecasRepository, Pecas }
