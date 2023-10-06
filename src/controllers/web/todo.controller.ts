import { Response } from "express";
import { TodoService } from "../../services/todo.service";
import { FilterTodoListInterface } from "../../interfaces/todo-list.interface";
import { TypedQuery } from "../../interfaces/typed-query.interface";
import { Todo } from "../../entities/todo.entity";

export class TodoController {
    private viewPage = '../todo';
    private service: TodoService;
    private innerPage = '';
    private url = '/todo'

    constructor() {
        this.service = new TodoService();
    }

    async index(req: TypedQuery<Partial<FilterTodoListInterface>>, res: Response){
        try{
            this.innerPage = this.viewPage + '/index';
            const data = await this.service.findAll(req.query);
            res.render('layout/base', this.viewData(data));
        }catch(error: any){
            throw new Error(error);
        }
    }

    viewData(data: Todo[]) {
        return {
          ...data,
          innerPage: this.innerPage,
          url: this.url
        };
    }
}



