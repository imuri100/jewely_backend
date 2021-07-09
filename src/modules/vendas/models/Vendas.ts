import {
  CreateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Entity

} from 'typeorm'

@Entity('vendas')
class Vendas {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    peca_name: string;

    @Column()
    pecaId: string;

    @Column()
    userId: string

    @CreateDateColumn()
    created_At: Date;
}
export {
  Vendas
}
