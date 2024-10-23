import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import UserModel from './UserModel'

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

    @ManyToOne(() => UserModel, (user) => user.roles)
    user!: UserModel
}

export default RoleModel
