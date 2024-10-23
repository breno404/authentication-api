import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import UserModel from './UserModel'

export enum ContactType {
    EMAIL = 'email',
    PHONE = 'phone'
}

//'$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe'

@Entity({ name: 'tb_addresses' })
class AddressModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255 })
    street!: string

    @Column({ type: 'varchar', length: 255 })
    city!: string

    @Column({ type: 'varchar', length: 255 })
    state!: string

    @Column({ type: 'varchar', length: 255 })
    zip!: string

    @ManyToOne(() => UserModel, (user) => user.addresses)
    user!: UserModel

}

export default AddressModel
