import express from "express";
export const todoRouter = express.Router();
import { TodoController } from "../../controllers/api/todo.controller";
import { todoValidator } from "../../validators/todo.validator";
import { validate } from "../../middlewares";
const todoControllerInstance = new TodoController();

todoRouter.get("/", todoControllerInstance.index.bind(todoControllerInstance));
todoRouter.post("/", todoValidator, validate, todoControllerInstance.add.bind(todoControllerInstance));
todoRouter.put("/change-status/:id", todoControllerInstance.changeStatus.bind(todoControllerInstance));
todoRouter.put("/:id", todoValidator, validate, todoControllerInstance.update.bind(todoControllerInstance));
todoRouter.delete("/:id", todoControllerInstance.delete.bind(todoControllerInstance));
