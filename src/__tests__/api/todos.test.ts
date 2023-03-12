import app from '../../app';
import request from 'supertest';
import sequelize from '../../Models';
import seedTodos from '../../Migrations/Todos.seed';
import { v4 as uuidv4 } from 'uuid';

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
  describe('GET /api/todos', () => {
    it('should pass this test', () => {
      expect(true).toBe(true);
    })
  });
});