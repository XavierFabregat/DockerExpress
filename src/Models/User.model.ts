import sequlize from ".";
import { DataTypes } from "sequelize";
import Todo from "./Todos.model";


const User = sequlize.define('User', {
  id : {
    type: DataTypes.STRING,
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
  }
});

User.hasMany(Todo, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Todo.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default User;
