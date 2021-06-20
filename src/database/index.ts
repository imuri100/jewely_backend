import { createConnection } from 'typeorm'
export async function connection (): Promise<void> {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: ['./src/modules/users/models/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations'
    }
  })
}
