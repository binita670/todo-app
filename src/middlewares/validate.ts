import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { meta } from "../constants";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("🚀 ~ file: validate.ts:8 ~ validate ~ errors:", errors.array());
        if (req.headers["content-type"] === "application/json") {
            return res.status(422).json({
                meta: meta,
                errors: errors.array()
            });
        }
        return res.redirect("back");
    }
    return next();
};
