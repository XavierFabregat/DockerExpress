import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
import config from '../config';
dotenv.config();



const sequlize = new Sequelize(
  config.development.db_name,
  config.development.db_username,
  config.development.db_password, 
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);


export default sequlize;