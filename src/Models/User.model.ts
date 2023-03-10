import sequlize from ".";
import { BuildOptions, DataTypes, Model } from "sequelize";
import Todo, { TodoAttributes } from "./Todos.model";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  todos?: Array<TodoAttributes>;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class UserClass extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}


const User = <UserStatic>sequlize.define('User', {
  id : {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


export default User;
