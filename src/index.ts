import config from 'config';
import { Express } from 'express';
import server from './server';
import './database/database';

let bootstrap = () => {
    const app: Express = server();
    app.listen(config.get('server.port'), () => {
        console.log(`Express running at port: ${config.get('server.port')}`);
    });
}

bootstrap();