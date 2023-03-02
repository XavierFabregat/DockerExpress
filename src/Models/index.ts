import { Sequelize } from 'sequelize';
import * as dotenv from "dotenv";
dotenv.config();

const sequlize = new Sequelize(process.env.POSTGRES_DB!, process.env.POSTGRES_USER!, process.env.POSTGRES_PASSWORD!, {
    host: 'localhost',
    dialect: 'postgres',
});

sequlize.sync();
sequlize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequlize;