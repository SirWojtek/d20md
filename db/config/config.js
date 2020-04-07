
module.exports = {
  development: {
    username: "server",
    password: "d20mdPassword",
    database: "d20md",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
    seederStorage: "sequelize"
  },
  travis: {
    username: "travis",
    database: "d20md",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    logging: false,
    seederStorage: "sequelize"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_SERVICE_HOST,
    dialect: "mysql",
    seederStorage: "sequelize"
  }
};
