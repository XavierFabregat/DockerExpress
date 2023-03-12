import app from '../../app';
import request from 'supertest';
import sequelize from '../../Models';
import seedTodos from '../../Migrations/Todos.seed';
import { v4 as uuidv4 } from 'uuid';
import seedUsers from '../../Migrations/User.seed';
import User from '../../Models/User.model';
import Todo from '../../Models/Todos.model';

beforeAll(async () => {
  await sequelize.authenticate();
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Todos API', () => {
  describe('GET /api/v1/todos', () => {
    it('should return an empty list if there are no todos', async () => {
      const res = await request(app).get('/api/v1/todos');
      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.message).toEqual('Success');
    });

    it('should return a list of todos', async () => {
      await seedUsers();
      await seedTodos();
      const res = await request(app).get('/api/v1/todos');
      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data.length).toEqual(12);
      expect(res.body.message).toEqual('Success');
    });
  });

  describe('POST /api/v1/todos', () => {
    
    it('should not create a todo if the title is not provided', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      })
      const res = await request(app).post('/api/v1/todos').send({
        description: 'Test description',
        userId: user.id,
      });
      expect(res.status).toEqual(400);
      expect(res.body.status).toEqual(400);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Title, description and userId are required');
    });
    
    it('should not create a todo if the description is not provided', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      })
      const res = await request(app).post('/api/v1/todos').send({
        title: 'Test title',
        userId: user.id,
      });
      expect(res.status).toEqual(400);
      expect(res.body.status).toEqual(400);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Title, description and userId are required');
    });
    
    it('should not create a todo if the userId is not provided', async () => {
      const res = await request(app).post('/api/v1/todos').send({
        title: 'Test title',
        description: 'Test description',
      });
      expect(res.status).toEqual(400);
      expect(res.body.status).toEqual(400);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Title, description and userId are required');
    });

    it('should not create a todo if the user does not exist', async () => {
      const res = await request(app).post('/api/v1/todos').send({
        title: 'Test title',
        description: 'Test description',
        userId: uuidv4(),
      });
      expect(res.status).toEqual(404);
      expect(res.body.status).toEqual(404);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('User does not exist');
    });

    it('should create a todo', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      })
      const res = await request(app).post('/api/v1/todos').send({
        title: 'Test title',
        description: 'Test description',
        userId: user.id,
      });

      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toStrictEqual({
        id: expect.any(String),
        title: 'Test title',
        description: 'Test description',
        completed: false,
        userId: user.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          id: user.id,
          username: user.username,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          avatarUrl: user.avatarUrl,
        },

      });

    });
  });

  describe('GET /api/v1/todos/:id', () => {

    it('should not return a todo if the todo does not exist', async () => {
      const res = await request(app).get(`/api/v1/todos/${uuidv4()}`);
      expect(res.status).toEqual(404);
      expect(res.body.status).toEqual(404);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Todo does not exist');
    });

    it('should return a todo', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      })
      const todo = await Todo.create({
        id: uuidv4(),
        title: 'Test title 1',
        description: 'Test description 1',
        completed: false,
        userId: user.id,
      });
      const res = await request(app).get(`/api/v1/todos/${todo.id}`);

      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toStrictEqual({
        id: todo.id,
        title: 'Test title 1',
        description: 'Test description 1',
        completed: false,
        userId: user.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          id: user.id,
          username: 'Test',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          avatarUrl: null,
        },
      });
    });

  });

  describe('PATCH /api/v1/todos/:id', () => {

    it('should not update a todo if either the title, description or completed is not provided', async () => {
      const res = await request(app).patch(`/api/v1/todos/${uuidv4()}`).send({});
      expect(res.status).toEqual(403);
      expect(res.body.status).toEqual(403);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Either a title, description or completed is required');
    });

    it('should not update a todo if the todo does not exist', async () => {
      const res = await request(app).patch(`/api/v1/todos/${uuidv4()}`).send({
        title: 'Test title',
        description: 'Test description',
        completed: false,
      });
      expect(res.status).toEqual(404);
      expect(res.body.status).toEqual(404);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Todo does not exist');
    });


    it('should return an update a todo', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      })
      const todo = await Todo.create({
        id: uuidv4(),
        title: 'Test title 1',
        description: 'Test description 1',
        completed: false,
        userId: user.id,
      });
      const res = await request(app).patch(`/api/v1/todos/${todo.id}`).send({
        title: 'Test title 2',
        description: 'Test description 2',
        completed: true,
      })

      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toStrictEqual({
        id: todo.id,
        title: 'Test title 2',
        description: 'Test description 2',
        completed: true,
        userId: user.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          id: user.id,
          username: 'Test',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          avatarUrl: null,
        }
      });
      expect(res.body.message).toEqual('Todo updated successfully');
    });

  });

  describe('DELETE /api/v1/todos/:id', () => {
    
    it('should not delete a todo if the todo does not exist', async () => {
      const res = await request(app).delete(`/api/v1/todos/${uuidv4()}`);
      expect(res.status).toEqual(404);
      expect(res.body.status).toEqual(404);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Todo does not exist');
    });

    it('should delete a todo', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      });

      const todo = await Todo.create({
        id: uuidv4(),
        title: 'Test title 1',
        description: 'Test description 1',
        completed: false,
        userId: user.id,
      });

      const res = await request(app).delete(`/api/v1/todos/${todo.id}`);

      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Todo deleted successfully');
    });

  });

  describe('PATCH /api/v1/todos/:id/complete', () => {

    it('should not complete a todo if the todo does not exist', async () => {
      const res = await request(app).patch(`/api/v1/todos/${uuidv4()}/complete`);
      expect(res.status).toEqual(404);
      expect(res.body.status).toEqual(404);
      expect(res.body.data).toEqual(null);
      expect(res.body.message).toEqual('Todo does not exist');
    });

    it('should complete a todo', async () => {
      const user = await User.create({
        id: uuidv4(),
        username: 'Test',
        password: 'Test',
      });

      const todo = await Todo.create({
        id: uuidv4(),
        title: 'Test title 1',
        description: 'Test description 1',
        completed: false,
        userId: user.id,
      });

      const res = await request(app).patch(`/api/v1/todos/${todo.id}/complete`);

      expect(res.status).toEqual(200);
      expect(res.body.status).toEqual(200);
      expect(res.body.data).toStrictEqual({
        id: todo.id,
        title: 'Test title 1',
        description: 'Test description 1',
        completed: true,
        userId: user.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        user: {
          id: user.id,
          username: 'Test',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          avatarUrl: null,
        }
      });
      expect(res.body.message).toEqual('Todo completed successfully');
    });

  });
});