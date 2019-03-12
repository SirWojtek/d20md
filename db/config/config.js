
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
  production: {
    username: "d20MD",
    password: process.env.DB_PASSWORD,
    database: "d20md",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    seederStorage: "sequelize"
  }
};
