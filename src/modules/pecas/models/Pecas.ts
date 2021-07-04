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

@Entity('pecas')
class Pecas {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    reference: number;

    @Column({ array: true })
    stock_User_id : string;

    @Column()
    user_id: string

    @Column({ array: true, type: 'jsonb', default: () => "'[]'" })
    materia_reference: [{reference : number, quantity: number }];

    @OneToMany(() => Users, () => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_At: Date;
}
export { Pecas }
