import request from 'supertest';
import { AppFactory } from '../../factories/app';
import { common } from '../../../src/constants';
import moment from 'moment';
import { CreateTodoDto } from '../../../src/dto';

describe('TodoController (e2e)', () => {
    jest.setTimeout(5000);
    let app: AppFactory;

    beforeAll(async () => {
        app = await AppFactory.new();
    });

    afterEach(async () => {
        if (app) await app.cleanDB();
    });

    afterAll(async () => {
        if (app) { 
            await app.close();
            await app.cleanDB({ dropDB: true });
        }
    });

    it('/POST Add new item in the todo list', async () => {
        await addItem();
    });

    async function addItem(){
        const itemPayload= {
            name: 'test',
            description:'test',
            deadline: moment().add(10, 'days').format("YYYY/MM/DD HH:mm")
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
        const updatedPayload = {
            name: 'test new',
            description:'test new',
            deadline: moment().add(10, 'days').format("YYYY/MM/DD HH:mm")
        };
        const response = await request(app.appInstance)
            .put(`${common.apiPrefix}/todos/${item?.body?.data?.id}`)
            .set('Accept', 'application/json')
            .send(updatedPayload);
            expect(response.statusCode).toEqual(200);
    });

    it('/DELETE Delete item from the todo list', async () => {
        const item = await addItem();
        const response = await request(app.appInstance)
            .delete(`${common.apiPrefix}/todos/${item?.body?.data?.id}`)
            .set('Accept', 'application/json')
            expect(response.statusCode).toEqual(204);
    });
});
