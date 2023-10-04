import { DataSource } from 'typeorm';
import config, { IConfig } from 'config';
import path from 'path';
const dbConfig = config.get<IConfig>('db');

export const appDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.get('host'),
    port: dbConfig.get('port'),
    username: dbConfig.get('username'),
    password: dbConfig.get('password'),
    database: dbConfig.get('databaseName'),
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')]
});

appDataSource.initialize()
    .then(() => {
        console.log("Database has been connected successfully.")
    })
    .catch((err) => {
        console.error("Error during connecting to database", err)
    });
