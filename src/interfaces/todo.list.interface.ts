import { Todo } from "../entities/todo.entity";

export interface TodoListInterface {
    data: Todo[];
    total: number;
    pageNum: number,
    pageLimit: number,
    currentPage: number;
    from: number;
    to: number;
}