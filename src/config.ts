const config = {
  development: {
    db_username: process.env.DEV_POSTGRES_USER!,
    db_password: process.env.DEV_POSTGRES_PASSWORD!,
    db_name: process.env.DEV_POSTGRES_DB!,
  },
  test: {},
};

export default config;