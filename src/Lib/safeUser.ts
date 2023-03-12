import type { UserAttributes, UserModel } from '../Models/User.model';
import type { SafeUser } from '../Types/User.type';

export function returnSafeUser(user: UserModel | UserAttributes): SafeUser {
  const { username, todos, avatarUrl, createdAt, updatedAt, id  } = user;
  const userWithoutPassword = { id, username, avatarUrl, createdAt, updatedAt, todos };
  return userWithoutPassword;
}

export function returnSafeUsers(users: UserModel[]): SafeUser[] {
  const usersWithoutPassword = users.map(returnSafeUser);
  return usersWithoutPassword;
}