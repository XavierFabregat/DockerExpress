import sequlize from ".";
import { DataTypes } from "sequelize";
import User from "./User.model";

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