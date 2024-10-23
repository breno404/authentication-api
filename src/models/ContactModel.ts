import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import UserModel from './UserModel'

export enum ContactType {
    EMAIL = 'email',
    PHONE = 'phone'
}

//'$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe'

@Entity({ name: 'tb_contacts' })
class ContactModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'enum', enum: ContactType, default: ContactType.EMAIL })
    type!: ContactType

    @Column({ type: 'varchar', length: 255 })
    value!: string

    @ManyToOne(() => UserModel, (user) => user.contacts)
    user!: UserModel

}

export default ContactModel
