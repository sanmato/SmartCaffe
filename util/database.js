const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("smartcaffe", "root", "server1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
