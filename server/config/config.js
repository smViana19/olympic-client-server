const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bdatividade2", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
