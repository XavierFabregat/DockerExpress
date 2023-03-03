import { Sequelize } from 'sequelize';
import config from '../config';

let sequelize!: Sequelize;

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize(
    config.docker.db_name,
    config.docker.db_username,
    config.docker.db_password,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
} else {
  sequelize = new Sequelize(config.docker.connectionString)
}



export default sequelize;