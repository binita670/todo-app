import express, { Express } from  'express';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';
import { routes } from '../routes';

class ExpressLoader {
    public init(app: Express){
        app.use(express.json());
        app.use(cors());
        app.use(express.static(path.join(__dirname, '../../public')));
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');
        app.use(methodOverride('_method'));
        routes(app);
    };
}

export const expressLoader =  new ExpressLoader();