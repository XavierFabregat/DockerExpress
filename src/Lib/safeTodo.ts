import { TodoModel } from "../Models/Todos.model";
import { SafeTodo } from "../Types/Todo.type";
import { returnSafeUser } from "./safeUser";

export const safeTodo = (todo: TodoModel): SafeTodo => {
  const { id, title, description, completed, userId, createdAt, updatedAt, user } = todo;
  const safeUser = user && returnSafeUser(user) ;
  const safeTodo = { id, title, description, completed, userId, createdAt, updatedAt, user: safeUser };
  return safeTodo;
};

export const safeTodos = (todos: Array<TodoModel>): Array<SafeTodo> => {
  return todos.map(safeTodo);
};