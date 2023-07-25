import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const MyDataSource = new DataSource({
    migrationsTableName: "migrations",
    type: "postgres",
    host: "localhost",
    port: Number(process.env.PORT),
    username: process.env.DB_USER!,
    password: process.env.PASSWORD!,
    database: process.env.DB_NAME!,
    logging: false,
    synchronize: false,
    name: "default",
    entities: ['./src/entities/*{.ts,.js}'],
    migrations: ['./src/migrations/*{.ts,.js}']
});