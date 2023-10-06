import { Express, Request, Response } from "express";
import { common } from "../constants";
import { webRouter } from "./web";
import { apiRouter } from "./api";

export const routes = (app: Express) => {
    app.use(common.apiPrefix, apiRouter); // API Router
    app.use(webRouter); // Web Router

    // Not Found Routes Handler
    app.all("*", (req: Request, res: Response) => {
        const requestTypes = ["application/json", "application/json; charset=utf-8"];
        if (requestTypes.includes(req?.headers.accept || "") || req.xhr || req.originalUrl.includes("/api/")) {
            return res.status(404).send({
                status: 404,
                message: "Route not found ☹️"
            });
        }
        res.status(404);
        return res.render("error/404");
    });
};
