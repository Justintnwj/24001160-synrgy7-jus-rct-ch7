const config = {
  DB_USERNAME: "postgres",
  DB_PASSWORD: "123456",
  DB_HOST: "127.0.0.1",
  DB_NAME: "database",
};

module.exports = {
  development: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: `${config.DB_NAME}_development`,
    host: config.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: `${config.DB_NAME}_test`,
    host: config.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: `${config.DB_NAME}_production`,
    host: config.DB_HOST,
    dialect: "postgres",
  },
};
