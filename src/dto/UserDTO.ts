
type Roles = ("manager" | "technical" | "user")[]
type Permissions = ("create" | "read" | "update" | "delete" | "destroy")[]

export type InputData = {
    id: number,
    name: string,
    isAdmin: boolean,
    isActive: boolean,
    username: string,
    isManager: boolean,
    isTechnical: boolean,
    isUser: boolean,
    canCreate: boolean,
    canRead: boolean,
    canUpdate: boolean,
    canDelete: boolean,
    canDestroy: boolean
}

type OutputData = {
    id: number,
    username: string,
    name: string,
    isAdmin: boolean,
    isActive: boolean,
    roles: Roles
    permissions: Permissions,
}

export default function UserDTO(data: InputData): OutputData {
    const roles: ("manager" | "technical" | "user")[] = []
    const permissions: ("create" | "read" | "update" | "delete" | "destroy")[] = []

    if (data.isManager) roles.push('manager')
    if (data.isTechnical) roles.push('technical')
    if (data.isUser) roles.push('user')

    if (data.canCreate) permissions.push('create')
    if (data.canRead) permissions.push('read')
    if (data.canUpdate) permissions.push('update')
    if (data.canDelete) permissions.push('delete')
    if (data.canDestroy) permissions.push('destroy')

    return {
        id: data.id,
        username: data.username,
        name: data.name,
        roles,
        permissions,
        isActive: data.isActive,
        isAdmin: data.isAdmin
    }
}