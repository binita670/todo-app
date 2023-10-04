import { Express, Request, Response} from 'express';
import { common } from '../constants';
import { webRouter } from './web';
import { apiRouter } from './api';

export const routes = (app: Express) => {
    app.use(common.apiPrefix, apiRouter);
    app.use(webRouter);
    app.use("*", (req: Request, res: Response) => {
        const requestTypes = [
            "application/json", "application/json; charset=utf-8"
        ];
        if (!req.headers.accept || req.headers['content-type']) {
            res.status(404);
            return res.render("error/404", {
                layout: false
            });
        }

        if(requestTypes.includes(req?.headers.accept) || req.xhr || req.originalUrl.includes('/api/')){
            return res.status(404).send({
                statusCode: 404,
                msg:"Route not found"
            });
        }
    });
}

