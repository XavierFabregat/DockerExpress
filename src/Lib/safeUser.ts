import type { UserModel } from '../Models/User.model';
import type { SafeUser } from '../Types/User.type';

export function returnSafeUser(user: UserModel): SafeUser {
  const { username, todos, avatarUrl, createdAt, updatedAt, id  } = user;
  const userWithoutPassword = { id, username, avatarUrl, createdAt, updatedAt, todos };
  return userWithoutPassword;
}

export function returnSafeUsers(users: UserModel[]): SafeUser[] {
  const usersWithoutPassword = users.map(returnSafeUser);
  console.log(usersWithoutPassword)
  return usersWithoutPassword;
}