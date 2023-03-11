import { Sequelize } from 'sequelize';
import config from '../config';




const sequelize = process.env.LOCAL 
  ? new Sequelize(config.development.connectionString, {
    dialectOptions: {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
    }
  })
  : new Sequelize(process.env.DATABASE_URL || config.development.connectionString ,{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
);



export default sequelize;