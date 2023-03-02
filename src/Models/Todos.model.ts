import sequlize from ".";
import { DataTypes } from "sequelize";
import User from "./User.model";

const Todo = sequlize.define('Todo', {
  id : {
    type: DataTypes.UUIDV4,
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
    type: DataTypes.UUIDV4,
    allowNull: false,
  }
});

Todo.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default Todo;