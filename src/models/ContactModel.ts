import UserModel from '@/models/UserModel'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export enum ContactType {
    EMAIL = 'email',
    PHONE = 'phone'
}

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
