import app from '../app';
import request from 'supertest';
import sequelize from '../Models';
import seedUsers from '../Migrations/User.seed';
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

describe('User Controller', () => {

  describe('GET /api/v1/users', () => {
    it('should return 200 if user pool is empty', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.status).toBe(200);
    });
  
    it('should return success response if user pool is empty', async () => {
      const res = await request(app).get('/api/v1/users');
      expect(res.body.status).toBe(200);
      expect(res.body.data).toHaveLength(0);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe("Success");
    });
  
  
    it('should return 200 if user pool is not empty', async () => {
      await seedUsers();
      const res = await request(app).get('/api/v1/users');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(200);
      expect(res.body.data).toHaveLength(4);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe("Success");
    });
  
    it('should take out the password from the users returned', async () => {
      await seedUsers();
      const res = await request(app).get('/api/v1/users');
      expect(res.body.data[0].password).toBe(undefined);
    });
  });
  
  describe('POST /api/v1/users', () => {
    it('should return 400 if username is not provided', async () => {
      const res = await request(app).post('/api/v1/users').send({
        password: 'password',
        repeatPassword: 'password',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Username and password are required");
    });
  
    it('should return 400 if password is not provided', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'username',
        repeatPassword: 'password',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Username and password are required");
    });
  
    it('should return 400 if repeatPassword is not provided', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'username',
        password: 'password',
      });
      expect(res.status).toBe(400);
      expect(res.body.status).toBe(400);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Username and password are required");
    });
  
    it('should return 400 if passwords do not match', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'username',
        password: 'password',
        repeatPassword: 'password1',
      });
      expect(res.status).toBe(403);
      expect(res.body.status).toBe(403);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Passwords do not match");
    });
  
    it('should return 403 if password is less than 6 characters', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'username',
        password: 'pass',
        repeatPassword: 'pass',
      });
      expect(res.status).toBe(403);
      expect(res.body.status).toBe(403);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Error in input validation : Password invalid.");
    });
  
    it('should return 403 if password does not contain a special character', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'username',
        password: 'password',
        repeatPassword: 'password',
      });
  
      expect(res.status).toBe(403);
      expect(res.body.status).toBe(403);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Error in input validation : Password invalid.");
    });
  
    it('should return 409 if username is already taken', async () => {
      await seedUsers();
      const res = await request(app).post('/api/v1/users').send({
        username: 'testTest',
        password: 'password-',
        repeatPassword: 'password-',
      });
      expect(res.status).toBe(409);
      expect(res.body.status).toBe(409);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("Username already taken");
    });
  
    it('should return 201 if user is created', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'testUser',
        password: 'test-test',
        repeatPassword: 'test-test',
      });
      expect(res.status).toBe(201);
      expect(res.body.status).toBe(201);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe("User created successfully");
    });
  
    it('should have user info without password in the response', async () => {
      const res = await request(app).post('/api/v1/users').send({
        username: 'testUser',
        password: 'test-test',
        repeatPassword: 'test-test',
      });
      expect(res.body.data.password).toBe(undefined);
      expect(res.body.data.username).toBe('testUser');
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.createdAt).toBeDefined();
      expect(res.body.data.updatedAt).toBeDefined();
      expect(res.body.data.todos).toStrictEqual([]);
    });
  });
  
  describe('GET /api/v1/users/:id', () => {
    it('should return 404 if user is not found', async () => {
      const res = await request(app).get(`/api/v1/users/${uuidv4()}`);
      console.log(res.body)
      expect(res.status).toBe(404);
      expect(res.body.status).toBe(404);
      expect(res.body.data).toBe(null);
      expect(res.body.error).toStrictEqual({});
      expect(res.body.message).toBe("User not found");
    });

    it('should return 200 if user is found', async () => {
      const user = await request(app).post('/api/v1/users').send({
        username: 'testUser',
        password: 'test-test',
        repeatPassword: 'test-test',
      });
      const res = await request(app).get(`/api/v1/users/${user.body.data.id}`);
      expect(res.status).toBe(200);
      expect(res.body.status).toBe(200);
      expect(res.body.error).toBe(false);
      expect(res.body.message).toBe('Success');
    });
    it('should return the user info without password', async () => {
      const user = await request(app).post('/api/v1/users').send({
        username: 'testUser',
        password: 'test-test',
        repeatPassword: 'test-test',
      });
      const res = await request(app).get(`/api/v1/users/${user.body.data.id}`);
      expect(res.body.data).toStrictEqual({
        id: user.body.data.id,
        username: user.body.data.username,
        avatarUrl: user.body.data.avatarUrl,
        createdAt: user.body.data.createdAt,
        updatedAt: user.body.data.updatedAt,
        todos: user.body.data.todos,
      })
    });
  });

});

