import sequlize from ".";
import { BuildOptions, DataTypes, Model } from "sequelize";
import User, { UserAttributes } from "./User.model";

export interface TodoAttributes {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserAttributes;
}

export interface TodoModel extends Model<TodoAttributes>, TodoAttributes {}
export class TodoClass extends Model<TodoModel, TodoAttributes> {}


export type TodoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TodoModel;
}

const Todo = <TodoStatic>sequlize.define('Todo', {
  id : {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    }
  }
});

Todo.belongsTo(User, { 
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
});

User.hasMany(Todo, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'todos',
});


export default Todo;