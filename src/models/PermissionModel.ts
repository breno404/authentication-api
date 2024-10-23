import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

//'$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe'

@Entity({ name: 'tb_permissions' })
class PermissionModel {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'boolean', default: true })
    canCreate!: boolean

    @Column({ type: 'boolean', default: true })
    canRead!: boolean

    @Column({ type: 'boolean', default: false })
    canUpdate!: boolean

    @Column({ type: 'boolean', default: false })
    canDelete!: boolean

    @Column({ type: 'boolean', default: false })
    canDestroy!: boolean



}

export default PermissionModel
