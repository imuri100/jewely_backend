import {
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    reset_token : string

    @Column()
    reset_token_expires : string

    @Column()
    password: string;

    @Column()
    cargo: 'artesao' | 'administrador';

    @CreateDateColumn()
    created_At: Date;

    @UpdateDateColumn()
    updated_At: Date;
}
export { Users }
