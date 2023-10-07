export class TodoItemDto {
  id: string;
  name: string;
  description: string;
  deadline: Date;
  done?: boolean;
}
