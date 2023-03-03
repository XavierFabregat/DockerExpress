import sequlize from ".";
import { DataTypes } from "sequelize";
import Todo from "./Todos.model";


const User = sequlize.define('User', {
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
