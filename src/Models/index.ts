import { Sequelize } from 'sequelize';
import config from '../config';

const { NODE_ENV, LOCAL, DATABASE_URL } = process.env;




const sequelize = LOCAL 
  ? new Sequelize(NODE_ENV === 'TEST' ? config.test.connectionString : config.development.connectionString, {
    dialectOptions: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    },
    logging: false
  })
  : new Sequelize( DATABASE_URL || config.development.connectionString ,{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
);



export default sequelize;