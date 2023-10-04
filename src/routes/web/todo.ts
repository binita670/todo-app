import express from 'express';
export const todoRouter  = express.Router();
import { TodoController } from '../../controllers/web/todo.controller';
const todoControllerInstance = new TodoController();

todoRouter.get('/', todoControllerInstance.index.bind(todoControllerInstance));
