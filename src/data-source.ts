import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();


const settings = (): DataSourceOptions => {
    const nodeEnv: string | undefined = process.env.NODE_ENV;
    
    if (nodeEnv === "test") {
        return {
          type: "sqlite",
          database: ":memory:",
          synchronize: true,
          entities: ['./src/entities/*{.ts,.js}'],
        };
    }

    const dbName: string | undefined = process.env.DB_NAME;

    if (!dbName) throw new Error("Missing env var: 'DB_NAME'");

    return{
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
    };
};

export const MyDataSource = new DataSource(settings());