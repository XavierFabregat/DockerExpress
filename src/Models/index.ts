import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    username: process.env.DEV_POSTGRES_USER!,
    password: process.env.DEV_POSTGRES_PASSWORD!,
    database: process.env.DEV_POSTGRES_DB!,
  },
  test: {},
}

const sequlize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: 'localhost',
    dialect: 'postgres',
});

// sequlize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err: Error) => {
//     console.error('Unable to connect to the database:', err);
//   });

export default sequlize;