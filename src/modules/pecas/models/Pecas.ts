import {
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  JoinColumn

} from 'typeorm'
import { Materias } from '../../materias/models/Materias'
import { Users } from '../../users/models/Users'

@Entity('pecas')
class Pecas {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    reference: number;

    @Column()
    user_id: string;

    @Column()
    quantity: number;

    @Column()
    materia_reference: Array<string>;

    @OneToMany(() => Materias, () => Materias)
    @JoinColumn({ name: 'materia_reference' })
    materias: Materias;

    @OneToMany(() => Users, () => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_At: Date;
}
export { Pecas }
