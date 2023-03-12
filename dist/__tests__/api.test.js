"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const Models_1 = __importDefault(require("../Models"));
const User_seed_1 = __importDefault(require("../Migrations/User.seed"));
const uuid_1 = require("uuid");
beforeAll(async () => {
    await Models_1.default.authenticate();
});
afterEach(async () => {
    await Models_1.default.sync({ force: true });
});
afterAll(async () => {
    await Models_1.default.close();
});
describe('User Controller', () => {
    describe('GET /api/v1/users', () => {
        it('should return 200 if user pool is empty', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/users');
            expect(res.status).toBe(200);
        });
        it('should return success response if user pool is empty', async () => {
            const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/users');
            expect(res.body.status).toBe(200);
            expect(res.body.data).toHaveLength(0);
            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe("Success");
        });
        it('should return 200 if user pool is not empty', async () => {
            await (0, User_seed_1.default)();
            const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/users');
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(200);
            expect(res.body.data).toHaveLength(4);
            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe("Success");
        });
        it('should take out the password from the users returned', async () => {
            await (0, User_seed_1.default)();
            const res = await (0, supertest_1.default)(app_1.default).get('/api/v1/users');
            expect(res.body.data[0].password).toBe(undefined);
        });
    });
    describe('POST /api/v1/users', () => {
        it('should return 400 if username is not provided', async () => {
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            await (0, User_seed_1.default)();
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
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
            const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/users/${(0, uuid_1.v4)()}`);
            expect(res.status).toBe(404);
            expect(res.body.status).toBe(404);
            expect(res.body.data).toBe(null);
            expect(res.body.error).toStrictEqual({});
            expect(res.body.message).toBe("User not found");
        });
        it('should return 200 if user is found', async () => {
            const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                username: 'testUser',
                password: 'test-test',
                repeatPassword: 'test-test',
            });
            const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/users/${user.body.data.id}`);
            expect(res.status).toBe(200);
            expect(res.body.status).toBe(200);
            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe('Success');
        });
        it('should return the user info without password', async () => {
            const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                username: 'testUser',
                password: 'test-test',
                repeatPassword: 'test-test',
            });
            const res = await (0, supertest_1.default)(app_1.default).get(`/api/v1/users/${user.body.data.id}`);
            expect(res.body.data).toStrictEqual({
                id: user.body.data.id,
                username: user.body.data.username,
                avatarUrl: user.body.data.avatarUrl,
                createdAt: user.body.data.createdAt,
                updatedAt: user.body.data.updatedAt,
                todos: user.body.data.todos,
            });
        });
    });
    describe('PATCH /api/v1/users/:id/:updatedValue', () => {
        describe('Update username', () => {
            it('should return 404 if user is not found', async () => {
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${(0, uuid_1.v4)()}/username`);
                expect(res.status).toBe(404);
                expect(res.body.status).toBe(404);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe("User not found");
            });
            it('should return 409 and error response if username is already taken', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser2',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/username`).send({
                    newUsername: 'testUser2',
                });
                expect(res.status).toBe(409);
                expect(res.body.status).toBe(409);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe("Username already taken");
            });
            it('should return 403 and error response if newUsername is not provided', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/username`).send({});
                expect(res.status).toBe(403);
                expect(res.body.status).toBe(403);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe('New username required');
            });
            it('should return 400 and error response if username is invalid', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/username`).send({
                    newUsername: 'fail'
                });
                expect(res.status).toBe(403);
                expect(res.body.status).toBe(403);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe('Error in input validation : Username must be at least 6 characters');
            });
            it('should return 200 and success response if username is updated', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/username`).send({
                    newUsername: 'success'
                });
                expect(res.status).toBe(200);
                expect(res.body.data).toStrictEqual({
                    id: user.body.data.id,
                    username: 'success',
                    avatarUrl: user.body.data.avatarUrl,
                    createdAt: user.body.data.createdAt,
                    updatedAt: res.body.data.updatedAt,
                    todos: user.body.data.todos,
                });
                expect(res.body.status).toBe(200);
                expect(res.body.error).toBe(false);
                expect(res.body.message).toBe('User updated successfully');
            });
            it('should change the updatedAt field', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/username`).send({
                    newUsername: 'success'
                });
                expect(res.body.data.updatedAt).not.toBe(user.body.data.updatedAt);
            });
        });
        describe('Update password', () => {
            it('should return 404 if user is not found', async () => {
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${(0, uuid_1.v4)()}/password`);
                expect(res.status).toBe(404);
                expect(res.body.status).toBe(404);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe("User not found");
            });
            it('should return 400 and error response if password is not provided', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/password`).send({});
                expect(res.status).toBe(400);
                expect(res.body.status).toBe(400);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe('Password and repeat password are required');
            });
            it('should return 403 and error response if password is invalid', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/password`).send({
                    password: 'fail',
                    repeatPassword: 'fail',
                });
                expect(res.status).toBe(403);
                expect(res.body.status).toBe(403);
                expect(res.body.data).toBe(null);
                expect(res.body.error).toStrictEqual({});
                expect(res.body.message).toBe('Error in input validation : Password/s invalid.');
            });
            it('should return 200 and success response if password is updated', async () => {
                const user = await (0, supertest_1.default)(app_1.default).post('/api/v1/users').send({
                    username: 'testUser',
                    password: 'test-test',
                    repeatPassword: 'test-test',
                });
                const res = await (0, supertest_1.default)(app_1.default).patch(`/api/v1/users/${user.body.data.id}/password`).send({
                    password: 'success-test',
                    repeatPassword: 'success-test',
                });
                expect(res.status).toBe(200);
                expect(res.body.data).toStrictEqual({
                    id: user.body.data.id,
                    username: user.body.data.username,
                    avatarUrl: user.body.data.avatarUrl,
                    createdAt: user.body.data.createdAt,
                    updatedAt: res.body.data.updatedAt,
                    todos: user.body.data.todos,
                });
                expect(res.body.status).toBe(200);
                expect(res.body.error).toBe(false);
                expect(res.body.message).toBe('User updated successfully');
            });
        });
    });
});
describe('Todo Controllers', () => {
    it('should pass this test', () => {
        expect(1).toBe(1);
    });
});
