import { SafeUser } from './User.type';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: SafeUser;
}