import UserModel from '@/models/UserModel'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

//'$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe'

@Entity({ name: 'tb_roles' })
class RoleModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'boolean', default: true })
    isUser!: boolean

    @Column({ type: 'boolean', default: false })
    isManager!: boolean

    @Column({ type: 'boolean', default: false })
    isTechnical!: boolean

    @OneToOne(() => UserModel)
    @JoinColumn({ name: 'userId' })
    user!: UserModel
}

export default RoleModel
