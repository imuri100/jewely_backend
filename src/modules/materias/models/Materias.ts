import {
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn,
  OneToMany,
  JoinColumn

} from 'typeorm'
import { Users } from '../../users/models/Users'

@Entity('materias')
class Materias {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    reference: number;

    @Column()
    user_id: string;

    @OneToMany(() => Users, () => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_At: Date;
}
export { Materias }
