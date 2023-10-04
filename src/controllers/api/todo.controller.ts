import { Request, Response } from "express";
import { TodoService } from "../../services/todo.service";
import { CreateTodoDto } from "../../dto";
import { IdParam, TypedRequest } from "../../interfaces";

export class TodoController {
    private service: TodoService;

    constructor() {
        this.service = new TodoService();
    }

    async add(req: TypedRequest<CreateTodoDto>, res: Response){
        try{
            const data = await this.service.add(req.body);
            return res.status(200).send(data);
        }catch(error: any){
            throw new Error(error);
        }
    }

    async update(req: TypedRequest<CreateTodoDto, IdParam>, res: Response){
        try{
            const data = await this.service.update(req.body, req.params.id);
            return res.status(200).send(data);
        }catch(error: any){
            throw new Error(error);
        }
    }

    async delete(req: Request, res: Response){
        try{
            await this.service.delete(req.params.id);
            return res.status(204).send("success");
        }catch(error: any){
            throw new Error(error);
        }
    }
}

