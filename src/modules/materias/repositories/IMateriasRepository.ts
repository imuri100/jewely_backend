import { Materias } from '../models/Materias'

interface IMateriaProps {
    name : string,
    quantity:number,
    reference : number,
    user_id : string
}

interface IMateriasRepository {
    CreateMateria({ name, quantity, reference, user_id } : IMateriaProps) : Promise<Materias>
    FindById(id:string):Promise<Materias | null>
}

export { IMateriaProps, IMateriasRepository, Materias }
