import Todo from "../../Models/Todos.model";
import User from "../../Models/User.model";
import { safeTodo as retSafeTodo, safeTodos } from "../../Lib/safeTodo";
import seedTodos from "../../Migrations/Todos.seed";
import sequelize from "../../Models";
import { v4 as uuidv4 } from "uuid";
import seedUsers from "../../Migrations/User.seed";

beforeAll(async () => {
  await sequelize.authenticate();
});

afterEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("SafeTodo", () => {
  it('should return a todo with a user that does not contain a password', async () => {
    const user = await User.create({
      id: uuidv4(),
      username: "test",
      password: "test",
    });
    const todo = await Todo.create({
      id: uuidv4(),
      title: "test",
      description: "test",
      completed: false,
      userId: user.id,
    });
    const todoWithUser = await Todo.findByPk(todo.id, {
        include: [{ model: User, as: "user" }]});

    if (!todoWithUser) throw new Error("No todo found");

    const safeTodo = retSafeTodo(todoWithUser);

    expect(safeTodo).toEqual({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      userId: todo.userId,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      user: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatarUrl: user.avatarUrl,
      }
    });
  });
});

describe("SafeTodos", () => {
  it('should return an array of todos with a user that does not contain a password', async () => {
    await seedUsers();
    await seedTodos();
    const todos = await Todo.findAll({ include: [{ model: User, as: "user" }]});
    const safeTodosArray = safeTodos(todos);
    safeTodosArray.forEach((todo) => {
      // @ts-expect-error
      expect(todo.user!.password).toBeUndefined();
    });
  });
});