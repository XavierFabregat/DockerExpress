import { Todo } from "./Todo.type";

export interface SafeUser {
  id: string;
  username: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  todos?: Array<Todo>;
}