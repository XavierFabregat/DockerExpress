import seedUsers from "./User.seed";
import seedTodos from "./Todos.seed";

async function seed() {
  try {
    await seedUsers();
    await seedTodos();
  } catch (error) {
    console.log("🚀 ~ file: index.ts:19 ~ seed ~ error", error);
  }
};

seed();

