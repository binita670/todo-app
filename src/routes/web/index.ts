import express from "express";
export const webRouter = express.Router();
import { todoRouter } from "./todo";

webRouter.use("/", todoRouter);
