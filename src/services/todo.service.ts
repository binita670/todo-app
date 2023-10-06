import { CreateTodoDto } from "../dto";
import { appDataSource } from "../database/database";
import { Todo } from "../entities/todo.entity";
import { FilterTodoListInterface, TodoListInterface } from "../interfaces/todo.list.interface";
import { Repository } from "typeorm";
import moment from "moment";

export class TodoService {
    repository: Repository<Todo>;
    constructor() {
        this.repository = appDataSource.getRepository(Todo);
    }

    async findAll(query: Partial<FilterTodoListInterface>): Promise<TodoListInterface> {
        const { type = null } = query;
        let data: Todo[];
        if (type) {
            data = await this.getFilteredData(type);
        } else {
            data = await this.getData();
        }
        return {
            data
        };
    }

    async getData() {
        return this.repository.find({
            order: {
                id: "DESC"
            }
        });
    }

    async getFilteredData(type: string) {
        const whereCondition = { where: {} };
        if(type === "done" || type === "up-coming"){
            whereCondition.where = {
                done: type === 'done' ? true : false
            }
        }
        return this.repository.find({
            order: {
                id: "DESC"
            },
            ...whereCondition
        });
    }

    async add(data: CreateTodoDto) {
        let { name, description, deadline } = data;
        deadline = moment(deadline, "YYYY-MM-DD HH:mm").toDate();
        const newTodoData = this.repository.create({ name, description, deadline });
        return this.repository.save(newTodoData);
    }

    async update(data: CreateTodoDto, id: string) {
        const { name, description, deadline } = data;
        const todoData = await this.findOrFail(id);
        todoData.name = name;
        todoData.description = description;
        todoData.deadline = moment(deadline, "YYYY-MM-DD HH:mm").toDate();
        return this.repository.save(todoData);
    }

    async delete(id: string) {
        const todoData = await this.findOrFail(id);
        return this.repository.remove(todoData);
    }

    async findOrFail(id: string) {
        const data = await this.repository.findOneOrFail({ where: { id: Number(id) } });
        if (!data) {
            throw new Error("Todo data not found.");
        }
        return data;
    }

    async changeStatus(id: string){
        const todoData = await this.findOrFail(id);
        todoData.done = !todoData?.done;
        return this.repository.save(todoData);
    }
}
