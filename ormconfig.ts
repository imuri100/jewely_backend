export default {

  type: 'postgres',
  host: process.env.DB_HOST_NAME,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  entities: ['./src/modules/users/models/*.ts', './src/modules/materias/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations'
  }

}
