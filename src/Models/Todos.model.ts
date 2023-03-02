import sequlize from ".";
import { DataTypes } from "sequelize";

const Todo = sequlize.define('Todo', {
  id : {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Todo;