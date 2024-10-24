import AddressModel from '@/models/AddressModel'
import ContactModel from '@/models/ContactModel'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

//'$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe'

@Entity({ name: 'tb_users' })
class UserModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255 })
    username!: string

    @Column({ type: 'varchar', length: 255 })
    password!: string

    @Column({ type: 'boolean', default: true })
    isActive!: boolean

    @Column({ type: 'boolean', default: false })
    isAdmin!: boolean

    @Column({ type: 'varchar', length: 255 })
    name!: string

    @Column({ type: 'integer' })
    age!: number

    @OneToMany(() => AddressModel, (address) => address.user)
    addresses!: AddressModel[]

    @OneToMany(() => ContactModel, (contact) => contact.user)
    contacts!: ContactModel[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date
    @Column({ type: 'timestamp', nullable: true })
    deletedAt!: Date | null
}

export default UserModel
