import express from 'express';
export const todoRouter  = express.Router();
import { TodoController } from '../../controllers/api/todo.controller';
const todoControllerInstance = new TodoController();

todoRouter.post('/', todoControllerInstance.add.bind(todoControllerInstance));
todoRouter.put('/:id', todoControllerInstance.update.bind(todoControllerInstance));
todoRouter.delete('/:id', todoControllerInstance.delete.bind(todoControllerInstance));
