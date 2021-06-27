import { Pecas } from '../models/Pecas'

interface IPecasProps {

    name : string,
    reference : number
    quantity:number,
    materia_reference : Array<string>,
    user_id : string
}

interface IPecasRepository {
    CreatePecas({ name, quantity, reference, user_id, materia_reference } : IPecasProps) : Promise<Pecas>
    // FindById(id:string):Promise<Materias | null>
}

export { IPecasProps, IPecasRepository, Pecas }
