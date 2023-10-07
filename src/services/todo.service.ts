import { CreateTodoDto } from "../dto";
import { Todo } from "../entities/todo.entity";
import { FilterTodoListInterface } from "../interfaces/todo-list.interface";
import { Repository } from "typeorm";
import moment from "moment";
import { AppException } from "../exceptions";
import { appDataSource } from "../database/data-source";

export class TodoService {
  repository: Repository<Todo>;
  constructor() {
    this.repository = appDataSource.getRepository(Todo);
  }

  async findAll(query: Partial<FilterTodoListInterface>): Promise<Todo[]> {
    const { type = null } = query;
    if (type) {
      return this.getFilteredData(type);
    }
    return this.getData();
  }

  async getData() {
    return this.repository.find({
      order: {
        id: "DESC",
      },
    });
  }

  async getFilteredData(type: string) {
    const whereCondition = { where: {} };
    if (type === "done" || type === "up-coming") {
      whereCondition.where = {
        done: type === "done" ? true : false,
      };
    }
    return this.repository.find({
      order: {
        id: "DESC",
      },
      ...whereCondition,
    });
  }

  async add(data: CreateTodoDto) {
    const { name, description, deadline } = data;
    this.validateDeadlineDate(deadline);
    const newTodoData = this.repository.create({
      name,
      description,
      deadline: moment(deadline, "YYYY-MM-DD HH:mm").toDate(),
    });
    return this.repository.save(newTodoData);
  }

  validateDeadlineDate(dateTime: Date){
    if(moment(dateTime, "YYYY-MM-DD HH:mm").isBefore(moment())){
      throw new Error("Deadline date must not be previous date.");
    }
  }

  async update(data: CreateTodoDto, id: string) {
    const { name, description, deadline } = data;
    const todoData = await this.findOne(id);
    todoData.name = name;
    todoData.description = description;
    todoData.deadline = moment(deadline, "YYYY-MM-DD HH:mm").toDate();
    this.validateDeadlineDate(deadline);
    return this.repository.save(todoData);
  }

  async delete(id: string) {
    const todoData = await this.findOne(id);
    return this.repository.remove(todoData);
  }

  async findOne(id: string) {
    const data = await this.repository.findOne({ where: { id: Number(id) } });
    if (!data) {
      throw new AppException(404, "Todo data not found.");
    }
    return data;
  }

  async changeStatus(id: string) {
    const todoData = await this.findOne(id);
    todoData.done = !todoData?.done;
    return this.repository.save(todoData);
  }
}
