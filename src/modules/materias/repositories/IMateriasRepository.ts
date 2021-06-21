import { Materias } from '../models/Materias'

interface IMateriaProps {
    name : string,
    quantity:number,
    reference : number,
    user_id : string
}

interface IMateriasRepository {
    createMateria({ name, quantity, reference, user_id } : IMateriaProps) : Promise<Materias>
}

export { IMateriaProps, IMateriasRepository, Materias }
