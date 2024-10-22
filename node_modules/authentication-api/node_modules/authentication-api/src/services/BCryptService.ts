import bcrypt from 'bcryptjs'

export async function compare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}

export async function hash(password: string) {
    return bcrypt.hash(password, 10)
}

export default { hash, compare }