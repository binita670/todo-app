import { Response } from "express";
import { TodoService } from "../../services/todo.service";
import { TodoListInterface } from "../../interfaces/todo.list.interface";
import { TypedQuery } from "../../interfaces/typed-query.interface";
import { Pagination } from "../../interfaces";

export class TodoController {
    private viewPage = '../todo';
    private service: TodoService;
    private innerPage = '';

    constructor() {
        this.service = new TodoService();
    }

    async index(req: TypedQuery<Pick<Pagination, "page" | "limit">>, res: Response){
        try{
            this.innerPage = this.viewPage + '/index';
            const data = await this.service.findAll(req.query);
            res.render('layout/base', this.viewData(data));
        }catch(error: any){
            console.log("🚀 ~ file: todo.controller.ts:9 ~ TodoController ~ index ~ error:", error)
            throw new Error(error);
        }
    }

    viewData(data: TodoListInterface) {
        return {
          ...data,
          innerPage: this.innerPage
        };
    }
}



