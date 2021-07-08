import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity('freshToken')
class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    expiresIn : number

    @Column()
    userId : string
}

export { RefreshToken }
