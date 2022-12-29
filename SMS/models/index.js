const Sequelize = require("sequelize");
const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: 'mysql',
  operatorsAliases: false,

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sms = require("./Sms.js")(sequelize, Sequelize);

module.exports = db;
