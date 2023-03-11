import * as dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    db_username: process.env.DEV_POSTGRES_USER!,
    db_password: process.env.DEV_POSTGRES_PASSWORD!,
    db_name: process.env.DEV_POSTGRES_DB!,
    connectionString: process.env.DEV_DATABASE_URL!,
  },
  test: {
    connectionString: process.env.TEST_DATABASE_URL!,
  },
  docker: {
    db_username: process.env.POSTGRES_USER!,
    db_password: process.env.POSTGRES_PASSWORD!,
    db_name: process.env.POSTGRES_DB!,
    connectionString: process.env.DATABASE_URL!,
  }
};

export default config;