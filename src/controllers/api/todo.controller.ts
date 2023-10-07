import { NextFunction, Request, Response } from "express";
import { TodoService } from "../../services/todo.service";
import { CreateTodoDto } from "../../dto";
import { IdParam, TypedRequest } from "../../interfaces";
import { TypedQuery } from "../../interfaces/typed-query.interface";
import { FilterTodoListInterface } from "../../interfaces/todo-list.interface";
import { responseFormat } from "../../helper";
import { AppException } from "../../exceptions";

export class TodoController {
  private service: TodoService;

  constructor() {
    this.service = new TodoService();
  }

  async index(
    req: TypedQuery<FilterTodoListInterface>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.findAll(req.query);
      res.status(200).send(responseFormat(data));
    } catch (error: any) {
      return next(new AppException(error.status || 400, error.message));
    }
  }

  async add(
    req: TypedRequest<CreateTodoDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.add(req.body);
      return res.status(200).send(responseFormat(data));
    } catch (error: any) {
      return next(new AppException(error.status || 400, error.message));
    }
  }

  async update(
    req: TypedRequest<CreateTodoDto, IdParam>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.update(req.body, req.params.id);
      return res.status(200).send(responseFormat(data));
    } catch (error: any) {
      return next(new AppException(error.status || 400, error.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(req.params.id);
      return res.status(204).send(responseFormat({ message: "success" }));
    } catch (error: any) {
      return next(new AppException(error.status || 400, error.message));
    }
  }

  async changeStatus(
    req: TypedRequest<CreateTodoDto, IdParam>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await this.service.changeStatus(req.params.id);
      return res.status(200).send(responseFormat(data));
    } catch (error: any) {
      return next(new AppException(error.status || 400, error.message));
    }
  }
}
