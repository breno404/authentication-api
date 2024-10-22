const UserModel = {
    id: 1,
    username: 'johndoe',
    password: '$2a$10$faWKD.j8fY2GdQ6wadHYW.bfIVjrY1y6M5pvH8.VR99mHCkUCZDRe',
    isActive: true,
    isAdmin: true,
    roles: ['admin', 'user'],
    permissions: ['create', 'read', 'update', 'delete'],
    name: 'John Doe',
    age: 22,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
    },
    contact: [
        {
            type: 'email',
            value: 'JG5pG@example.com'
        },
        {
            type: 'phone',
            value: '555-555-5555'
        },
        {
            type: 'phone',
            value: '999-999-9999'
        }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export default UserModel