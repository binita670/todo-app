import { Todo } from "../entities/todo.entity";

export interface TodoListInterface {
    data: Todo[];
}

export interface FilterTodoListInterface {
    type: string
}