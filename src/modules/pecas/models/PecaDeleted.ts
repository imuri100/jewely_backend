import {
  Column,
  PrimaryGeneratedColumn,
  Entity

} from 'typeorm'

@Entity('restospecas')
class PecasDeleted {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column()
      peca_deleted: string;

      @Column()
      userId: string;

      @Column()
      peca_id: string
}
export { PecasDeleted }
