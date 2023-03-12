import sequelize from '../../Models';
import seedUsers from '../../Migrations/User.seed';
import User from '../../Models/User.model';

beforeAll(async () => {
  await sequelize.authenticate();
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Seeding the user table', () => {
  it('should seed the user table', async () => {
    await seedUsers();
    const users = await User.findAll();
    expect(users.length).toBe(4);
  });
});