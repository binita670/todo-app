import express from "express";
export const apiRouter = express.Router();
import { todoRouter } from "./todo";

apiRouter.use("/todos", todoRouter);
