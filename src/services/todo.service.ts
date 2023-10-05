import { CreateTodoDto } from "../dto";
import { appDataSource } from "../database/database";
import { Todo } from "../entities/todo.entity";
import { TodoListInterface } from "../interfaces/todo.list.interface";
import { LessThan, Repository } from "typeorm";
import { Pagination } from "../interfaces";
import moment from 'moment';

export class TodoService {
    private repository: Repository<Todo>;
    constructor() {
        this.repository = appDataSource.getRepository(Todo);
    }

    async findAll(query: Pick<Pagination, "page" | "limit" | "type">): Promise<TodoListInterface> {
        const { page = 1, limit = 10, type = null} = query; 
        const skip = (page - 1) * limit;
        if(type){
            let { data = [], total = 0 } = await this.getFilteredData(skip, limit, type);
        }
        let { data = [], total = 0 } = await this.getData(skip, limit);
        let from = ((page - 1) * limit) + 1;
        let to = from + (data.length - 1);
        return { 
            data, 
            total,
            pageNum: page,
            pageLimit: limit,
            currentPage: page,
            pageCount: Math.ceil(total/limit),
            from,
            to
        };
    }

    async getData(skip: number, limit: number){
        const [data, total] = await this.repository.findAndCount({
            skip,
            take: limit,
            order: {
                id: 'DESC'
            },
        });
        return {
            data,
            total
        }
    }

    async getFilteredData(skip: number, limit: number, type: string){
        const [data, total] = await this.repository.findAndCount({
            skip,
            take: limit,
            order: {
                id: 'DESC'
            },
            where: {
                deadline: type === "done" ? LessThan(Date.now()) : GreaterThan(Date.now())
            }
        });
        return {
            data,
            total
        }
    }

    async add(data: CreateTodoDto){
        let { name, description, deadline} = data;
        deadline = moment(deadline, "YYYY-MM-DD").toDate();
        const newTodoData = this.repository.create({name, description, deadline});
        return this.repository.save(newTodoData);
    }

    async update(data: CreateTodoDto, id: string ){
        const { name, description, deadline } = data;
        const todoData = await this.findOrFail(id);
        todoData.name = name; 
        todoData.description = description;
        todoData.deadline = moment(deadline, "YYYY-MM-DD").toDate();
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