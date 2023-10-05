import express, { Express, NextFunction, Request, Response } from  'express';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';
import { routes } from '../routes';
import moment from 'moment';

class ExpressLoader {
    public init(app: Express){
        app.use(express.json());
        app.use(cors());
        app.use(express.static(path.join(__dirname, '../../public')));
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'ejs');
        app.use(methodOverride('_method'));
        app.use(async (req: Request, res: Response, next: NextFunction) => {
            res.locals.query = req.query;
            res.locals.url = req.url;
            res.locals.formatDate = (dateTime: string) => moment(dateTime).format("MMM Do YYYY, h:mm:ss a");
            next();
        });
        routes(app);
    };
}

export const expressLoader =  new ExpressLoader();