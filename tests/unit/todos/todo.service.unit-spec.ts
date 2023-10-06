import { CreateTodoDto, TodoItemDto } from '../../../src/dto';
import { TodoService } from '../../../src/services/todo.service';

const mockTodosRepository = () => ({
    findOneOrFail: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
});

const mockItem = {
    name: 'Todo 1',
    description: 'This is simple todo.',
    deadline: new Date()
};

const mockMoment = {
    toDate: jest.fn(),
};
  
describe('TodoService (unit)', () => {
    let createTodoDto: CreateTodoDto;
    let todoData: TodoItemDto;
    let todoService: TodoService;
    const id = '1';

    beforeEach(() => {
        createTodoDto = {
            name: mockItem.name,
            description: mockItem.description,
            deadline: mockItem.deadline,
        };

        todoData = {
            id: '1',
            name: mockItem.name,
            description: mockItem.description,
            deadline: mockItem.deadline
        };

        todoService = new TodoService();
        todoService.repository = mockTodosRepository() as any;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('add item to todo list', () => {
        it('should create and save a new todo', async () => {
            todoService.repository.create = jest.fn().mockReturnValue(createTodoDto);
            todoService.repository.save = jest.fn().mockResolvedValue(createTodoDto);
            const result = await todoService.add(createTodoDto);
            expect(todoService.repository.create).toHaveBeenCalledWith(createTodoDto);
            expect(todoService.repository.save).toHaveBeenCalledTimes(1);
            expect(result).toBeDefined();
        });
    });

    describe('update todo item', () => {
        it('should update the todo item and return the saved data', async () => {
          const data = {
            name: 'Updated Todo',
            description: 'Updated description',
            deadline: new Date(),
          };

          todoService.repository.findOneOrFail = jest.fn().mockResolvedValue(todoData);
          todoService.repository.save = jest.fn().mockResolvedValue(todoData);
          todoService.findOrFail = jest.fn().mockResolvedValue(todoData);
          mockMoment.toDate.mockReturnValue(data.deadline);
          
          const result = await todoService.update(data, todoData.id);
          expect(todoService.repository.save).toHaveBeenCalledWith({
            ...todoData,
            name: data.name,
            description: data.description,
            deadline: mockMoment.toDate(),
          });
          expect(result).toBeDefined();
        });
    });

    describe('findOrFail', () => {
        it('should return the data when found', async () => {
          todoService.repository.findOneOrFail = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.findOrFail(id);
          expect(todoService.repository.findOneOrFail).toHaveBeenCalledWith({ where: { id: Number(id) } });
          expect(result).toEqual(todoData);
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.repository.findOneOrFail = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.findOrFail(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.repository.findOneOrFail).toHaveBeenCalledWith({ where: { id: Number(id) } });
        });
    });

    describe('delete todo item', () => {
        it('should delete the todo item', async () => {
          todoService.findOrFail = jest.fn().mockResolvedValue(todoData);
          todoService.repository.remove = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.delete(id);
          expect(todoService.findOrFail).toHaveBeenCalledWith(id);
          expect(todoService.repository.remove).toHaveBeenCalledWith(todoData);
          expect(result).toBeTruthy();
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.findOrFail = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.delete(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.findOrFail).toHaveBeenCalledWith(id);
          expect(todoService.repository.remove).not.toHaveBeenCalled();
        });
    });

    describe('changeStatus', () => {
        it('should toggle the status and return the updated data', async () => {
          todoService.findOrFail = jest.fn().mockResolvedValue(todoData);
          todoService.repository.save = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.changeStatus(id);
          expect(todoService.findOrFail).toHaveBeenCalledWith(id);
          const todoStatusData = {
            ...todoData,
            done: false
          }
          expect(todoService.repository.save).toHaveBeenCalledWith({ ...todoData, done: !todoStatusData.done });
          expect(result).toEqual(todoData);
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.findOrFail = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.delete(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.findOrFail).toHaveBeenCalledWith(id);
          expect(todoService.repository.save).not.toHaveBeenCalled();
        });
      });
});
