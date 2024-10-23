import dotenv from 'dotenv'

dotenv.config()

export default {
    JWT_SECRET: process.env.JWT_SECRET ?? '',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? '',
    PORT: +(process.env.PORT ?? 3000),
    MYSQL_DATABASE_HOST: process.env.MYSQL_DATABASE_HOST ?? 'localhost',
    MYSQL_DATABASE_PORT: +(process.env.MYSQL_DATABASE_PORT ?? 3306),
    MYSQL_DATABASE_USERNAME: process.env.MYSQL_DATABASE_USERNAME ?? 'root',
    MYSQL_DATABASE_PASSWORD: process.env.MYSQL_DATABASE_PASSWORD ?? 'root',
    MYSQL_DATABASE_DATABASE: process.env.MYSQL_DATABASE_DATABASE ?? 'test',
    POSTGRES_DATABASE_HOST: process.env.POSTGRES_DATABASE_HOST ?? 'localhost',
    POSTGRES_DATABASE_PORT: +(process.env.POSTGRES_DATABASE_PORT ?? 5432),
    POSTGRES_DATABASE_USERNAME: process.env.POSTGRES_USERNAME ?? 'root',
    POSTGRES_DATABASE_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'root',
    POSTGRES_DATABASE_DATABASE: process.env.POSTGRES_DATABASE ?? 'test'
}