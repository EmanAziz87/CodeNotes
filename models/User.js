const Sequelize = require("sequelize");
const Database = require("../config/db");

const User = Database.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = User;
