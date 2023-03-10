import { Sequelize } from 'sequelize';
import config from '../config';


const sequelize = new Sequelize(process.env.DATABASE_URL || config.development.connectionString ,{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
);



export default sequelize;