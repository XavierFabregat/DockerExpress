import app from '../app';
import request from 'supertest';
import sequelize from '../Models';

beforeAll(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/v1/users', () => {
  it('should return 404 if user pool is empty', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(404);
    //expect(res.body).toEqual({});
  });
});