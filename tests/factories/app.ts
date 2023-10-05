import { DataSource } from 'typeorm';
import { Server } from 'http';
import { bootstrap } from '../../src/index';
import { appDataSource } from '../../src/database/database';

export class AppFactory {
    constructor(
        public readonly appInstance: Server,
        public readonly dbConnection: DataSource,
    ) {}

    static async new() {
        const app = bootstrap();
        while (!appDataSource.isInitialized) {
            await new Promise((res) => setTimeout(res, 1000));
        }
        return new AppFactory(app, appDataSource);
    }

    async close() {
        if (this.dbConnection) await this.dbConnection.destroy();
        if (this.appInstance) this.appInstance.close();
    }

    async cleanDB() {
        if (this.dbConnection.isInitialized) {
            const entities = this.dbConnection.entityMetadatas;
            for (const entity of entities) {
                const queryRunner = this.dbConnection.manager.getRepository(
                    entity.name
                );
                // delete everything from table ignoring relations
                await queryRunner.query(
                    `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
                );
            }
        }
    }
}
