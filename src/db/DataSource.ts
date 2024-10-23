import { DataSource, EntitySchema, MixedList } from "typeorm"

import env from "@/config/env"
import Address from '@/models/AddressModel'
import Contact from '@/models/ContactModel'
import Permission from '@/models/PermissionModel'
import Role from '@/models/RoleModel'
import User from '@/models/UserModel'

const entities: MixedList<string | Function | EntitySchema<any>> | undefined = [
    User,
    Address,
    Contact,
    Role,
    Permission
]

const MysqlDataSource = new DataSource({
    type: "mysql",
    host: env.MYSQL_DATABASE_HOST,
    port: env.MYSQL_DATABASE_PORT,
    username: env.MYSQL_DATABASE_USERNAME,
    password: env.MYSQL_DATABASE_PASSWORD,
    database: env.MYSQL_DATABASE_DATABASE,
    entities
})

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: env.POSTGRES_DATABASE_HOST,
    port: env.POSTGRES_DATABASE_PORT,
    username: env.POSTGRES_DATABASE_USERNAME,
    password: env.POSTGRES_DATABASE_PASSWORD,
    database: env.POSTGRES_DATABASE_DATABASE,
    entities
})

async function initializeDataSource(dataSource: DataSource, type: string) {
    if (!dataSource.isInitialized) {
        try {
            await dataSource.initialize();
            console.log(`Conectado ao banco de dados ${type}`);
        } catch (err) {
            console.error(`Erro ao conectar ao banco de dados ${type}:`, (err as Error).toString());
        }
    }
}

export async function getMysqlDataSource() {
    await initializeDataSource(MysqlDataSource, "MySQL");
    return MysqlDataSource;
}

export async function getPostgresDataSource() {
    await initializeDataSource(PostgresDataSource, "PostgreSQL");
    return PostgresDataSource;
}

export default { getMysqlDataSource, getPostgresDataSource }