import { Users } from '../models/Users'

interface IusersProps {
    name: string;
    cargo: 'artesao' | 'administrador';
    email: string;
    password: string;
    avatar: string;
}

interface IUserRespository {

    CreateUser({ name, cargo, email, password, avatar } : IusersProps) : Promise<Users>
    FindById(id : string) : Promise<Users | null>
    FindByEmail(email : string) : Promise<Users | null>
    DeleteUSer(id : string) : Promise<void>
    UpdateUser({ name, cargo, avatar } : IusersProps, userFinded : Users) : Promise<Users>

}
export { IusersProps, IUserRespository }
