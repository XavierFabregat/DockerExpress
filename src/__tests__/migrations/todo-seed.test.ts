import sequelize from '../../Models';
import seedTodos from '../../Migrations/Todos.seed';
import seedUsers from '../../Migrations/User.seed';
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

describe('Seeding the todo table', () => {

  it('should not be able to seed the todo table without seeding the user table', async () => {
    try {
      await seedTodos();
      throw new Error('The todo seed is not crashing the test');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should seed the todo table', async () => {
    // seed todo only works ater seeding the user, so we must make sure the user seed is not crashing the test
    try {
      await seedUsers()
    } catch (error) {
      throw new Error(`The user seed is crashing the test: ${error}`);
    }
    await seedTodos();
    const todos = await Todo.findAll();
    expect(todos.length).toBe(12);
  });
});


