import { Request, Response } from "express";
import config from "config";
import { AppException } from "../app.exception";
import { meta } from "../../constants";
import { NextFunction } from "connect";

export const globalExceptionHandler = (
  error: AppException,
  req: Request,
  res: Response,
  /* eslint-disable */
  next: NextFunction,
) => {
  if (
    req.headers["content-type"] === "application/json" ||
    req.headers["accept"] === "application/json"
  ) {
    return res.status(error.status || 500).json({
      meta: meta,
      error: error.message,
      ...(config.get("nodeEnv") === "development"
        ? { stack: error.stack }
        : {}),
    });
  }
  return res.status(error.status || 500).render("error/500");
};
