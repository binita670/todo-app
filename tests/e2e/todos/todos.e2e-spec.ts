import request from 'supertest';
import { AppFactory } from '../../factories/app';
import { CreateTodoDto } from '../../../src/dto';
import { common } from '../../../src/constants';

describe('TodoController (e2e)', () => {
    jest.setTimeout(5000);
    let app: AppFactory;

    beforeAll(async () => {
        app = await AppFactory.new();
    });

    // afterEach(async () => {
    //     if (app) await app.cleanDB();
    // });

    afterAll(async () => {
        if (app) await app.close();
    });

    it('/POST Add new item in the todo list', async () => {
        await addItem();
    });

    async function addItem(){
        const itemPayload: CreateTodoDto = {
            name: 'test',
            description:'test',
            deadline: new Date()
        };
        const response = await request(app.appInstance)
            .post(`${common.apiPrefix}/todos`)
            .set('Accept', 'application/json')
            .send(itemPayload);
            expect(response.statusCode).toEqual(200);
        return response;
    }

    it('/GET Get all the item from the todo list', async () => {
        const response = await request(app.appInstance)
            .get(`${common.apiPrefix}/todos`)
            .set('Accept', 'application/json')
            expect(response.statusCode).toEqual(200);
    });

    it('/UPDATE Update item from the todo list', async () => {
        const item = await addItem();
        const updatedPayload: CreateTodoDto = {
            name: 'test new',
            description:'test new',
            deadline: new Date()
        };
        const response = await request(app.appInstance)
            .put(`${common.apiPrefix}/todos/${item?.body?.id}`)
            .set('Accept', 'application/json')
            .send(updatedPayload);
            expect(response.statusCode).toEqual(200);
    });

    it('/DELETE Delete item from the todo list', async () => {
        const item = await addItem();
        const response = await request(app.appInstance)
            .delete(`${common.apiPrefix}/todos/${item?.body?.id}`)
            .set('Accept', 'application/json')
            expect(response.statusCode).toEqual(204);
    });
});
