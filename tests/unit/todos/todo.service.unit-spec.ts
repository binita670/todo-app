import { CreateTodoDto, TodoItemDto } from '../../../src/dto';
import { TodoService } from '../../../src/services/todo.service';

const mockTodosRepository = () => ({
    findOne: jest.fn(),
    find: jest.fn(),
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

    describe('findAll', () => {
        const mockFilteredData = [{ ...todoData, done: true }];
        const mockData = [{ id: '2', createTodoDto, done: false}];

        it('should return filtered data when type is provided', async () => {
          const query = { type: 'done' };
          todoService.getFilteredData = jest.fn().mockResolvedValue(mockFilteredData);
          todoService.getData = jest.fn().mockResolvedValue(mockFilteredData);
          const result = await todoService.findAll(query);
          expect(todoService.getFilteredData).toHaveBeenCalledWith(query.type);
          expect(todoService.getData).not.toHaveBeenCalled();
          expect(result).toEqual(mockFilteredData);
        });
    
        it('should return unfiltered data when type is not provided', async () => {
          const query = {};
          todoService.getData = jest.fn().mockResolvedValue(mockData);
          todoService.getFilteredData = jest.fn().mockResolvedValue(mockData);
          const result = await todoService.findAll(query);
          expect(todoService.getData).toHaveBeenCalled();
          expect(todoService.getFilteredData).not.toHaveBeenCalled();
          expect(result).toEqual(mockData);
        });
    });

    describe('getData', () => {
        const mockData = [{ ...todoData, done: true }];
        it('should return data in descending order of ID', async () => {
          todoService.repository.find = jest.fn().mockResolvedValue(mockData);
          const result = await todoService.getData();
          expect(todoService.repository.find).toHaveBeenCalledWith({
            order: {
              id: 'DESC',
            },
          });
          expect(result).toEqual(mockData);
        });
    });

    describe('getFilteredData', () => {
        const mockData = [{ ...todoData, done: true }];

        it('should return filtered data based on the provided type', async () => {
          const type = 'done';
          todoService.repository.find = jest.fn().mockResolvedValue(mockData);
          const result = await todoService.getFilteredData(type);
          expect(todoService.repository.find).toHaveBeenCalledWith({
            order: {
              id: 'DESC',
            },
            where: {
              done: true,
            },
          });
          expect(result).toEqual(mockData);
        });
    
        it('should return unfiltered data when type is not "done" or "up-coming"', async () => {
          const type = 'invalid';
          todoService.repository.find = jest.fn().mockResolvedValue(mockData);
          const result = await todoService.getFilteredData(type);
          expect(todoService.repository.find).toHaveBeenCalledWith({
            order: {
              id: 'DESC',
            },
            where: {}
          });
          expect(result).toEqual(mockData);
        });
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

          todoService.repository.findOne = jest.fn().mockResolvedValue(todoData);
          todoService.repository.save = jest.fn().mockResolvedValue(todoData);
          todoService.findOne = jest.fn().mockResolvedValue(todoData);
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

    describe('findOne', () => {
        it('should return the data when found', async () => {
          todoService.repository.findOne = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.findOne(id);
          expect(todoService.repository.findOne).toHaveBeenCalledWith({ where: { id: Number(id) } });
          expect(result).toEqual(todoData);
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.repository.findOne = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.findOne(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.repository.findOne).toHaveBeenCalledWith({ where: { id: Number(id) } });
        });
    });

    describe('delete todo item', () => {
        it('should delete the todo item', async () => {
          todoService.findOne = jest.fn().mockResolvedValue(todoData);
          todoService.repository.remove = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.delete(id);
          expect(todoService.findOne).toHaveBeenCalledWith(id);
          expect(todoService.repository.remove).toHaveBeenCalledWith(todoData);
          expect(result).toBeTruthy();
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.findOne = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.delete(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.findOne).toHaveBeenCalledWith(id);
          expect(todoService.repository.remove).not.toHaveBeenCalled();
        });
    });

    describe('changeStatus', () => {
        it('should toggle the status and return the updated data', async () => {
          todoService.findOne = jest.fn().mockResolvedValue(todoData);
          todoService.repository.save = jest.fn().mockResolvedValue(todoData);
          const result = await todoService.changeStatus(id);
          expect(todoService.findOne).toHaveBeenCalledWith(id);
          const todoStatusData = {
            ...todoData,
            done: false
          }
          expect(todoService.repository.save).toHaveBeenCalledWith({ ...todoData, done: !todoStatusData.done });
          expect(result).toEqual(todoData);
        });
    
        it('should throw an error when data is not found', async () => {
          todoService.findOne = jest.fn().mockRejectedValue(new Error('Todo data not found.'));
          await expect(todoService.delete(id)).rejects.toThrow('Todo data not found.');
          expect(todoService.findOne).toHaveBeenCalledWith(id);
          expect(todoService.repository.save).not.toHaveBeenCalled();
        });
      });
});
