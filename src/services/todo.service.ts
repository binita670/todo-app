import { CreateTodoDto } from "../dto";
import { appDataSource } from "../database/database";
import { Todo } from "../entities/todo.entity";
import { TodoListInterface } from "../interfaces/todo.list.interface";
import { Repository } from "typeorm";
import { Pagination } from "../interfaces";

export class TodoService {
    private repository: Repository<Todo>;
    constructor() {
        this.repository = appDataSource.getRepository(Todo);
    }

    async findAll(query: Pick<Pagination, "page" | "limit">): Promise<TodoListInterface> {
        const { page = 1, limit = 10} = query; 
        const skip = (page - 1) * limit;
        const [data, total] = await this.repository.findAndCount({
            skip,
            take: limit,
        });
        let from = ((page - 1) * limit) + 1;
        let to = from + (data.length - 1);
        return { 
            data, 
            total,
            pageNum: page,
            pageLimit: limit,
            currentPage: page,
            from,
            to
        };
    }

    async add(data: CreateTodoDto){
        const { name, description, deadline} = data;
        const newTodoData = this.repository.create({name, description, deadline});
        return this.repository.save(newTodoData);
    }

    async update(data: CreateTodoDto, id: string ){
        const { name, description, deadline } = data;
        const todoData = await this.findOrFail(id);
        todoData.name = name; 
        todoData.description = description;
        todoData.deadline = deadline;
        return this.repository.save(todoData);
    }

    async delete(id: string){
        const todoData = await this.findOrFail(id);
        return this.repository.remove(todoData);
    }

    async findOrFail(id: string){
        const data = await this.repository.findOneOrFail({where: {id: Number(id)}});
        if(!data){
            throw new Error("Todo data not found.");
        }
        return data;
    }
}