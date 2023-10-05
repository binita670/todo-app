import { Response } from "express";
import { TodoService } from "../../services/todo.service";
import { TodoListInterface } from "../../interfaces/todo.list.interface";
import { TypedQuery } from "../../interfaces/typed-query.interface";
import { Pagination } from "../../interfaces";

export class TodoController {
    private viewPage = '../todo';
    private service: TodoService;
    private innerPage = '';
    private url = '/todo'

    constructor() {
        this.service = new TodoService();
    }

    async index(req: TypedQuery<Pick<Pagination, "page" | "limit">>, res: Response){
        try{
            this.innerPage = this.viewPage + '/index';
            const data = await this.service.findAll(req.query);
            res.render('layout/base', this.viewData(data));
        }catch(error: any){
            throw new Error(error);
        }
    }

    viewData(data: TodoListInterface) {
        return {
          ...data,
          innerPage: this.innerPage,
          url: this.url
        };
    }
}



