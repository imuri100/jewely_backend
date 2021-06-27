import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Materias } from '../../materias/models/Materias'
import { Users } from '../../users/models/Users'

@Entity('stockUsers')
class StockUsers {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    name : string

    @Column()
    quantity : number

    @Column()
    materia_id : string

    @Column()
    materia_reference : number

    @Column()
    user_id : string

    @ManyToMany(() => Materias, () => Materias)
    @JoinColumn({ name: 'materia_id' })
    materias: Materias;

    @ManyToMany(() => Users, () => Users)
    @JoinColumn({ name: 'user_id' })
    users: Users;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_At: Date;
}

export { StockUsers }
