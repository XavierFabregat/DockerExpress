import User from "../../Models/User.model";
import { returnSafeUser, returnSafeUsers } from "../../Lib/safeUser";
import seedUsers from "../../Migrations/User.seed";
import sequelize from "../../Models";
import { v4 as uuidv4 } from "uuid";

beforeAll(async () => {
  await sequelize.authenticate();
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});



describe("SafeUser", () => {
  it("should return a user without password", async () => {
    const user = await User.create({
      id: uuidv4(),
      username: "test",
      password: "test",
      avatarUrl: "https://i.imgur.com/4YK1Y0x.png",
    });
    if (!user) throw new Error("No user found");
    const safeUser = returnSafeUser(user);
    expect(safeUser).toEqual({
      id: user.id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      todos: user.todos,
    });
  });
});

describe("SafeUsers", () => {
  it('should return an array of users without password', async () => {
    await seedUsers();
    const users = await User.findAll();
    const safeUsers = returnSafeUsers(users);
    safeUsers.forEach((user, index) => {
      // @ts-expect-error
      expect(user.password).toBeUndefined();
    });
  });
});