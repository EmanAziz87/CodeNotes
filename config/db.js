const Sequelize = require("sequelize");
const config = require("config");
const dbPass = config.get("dbPass");

const Database = new Sequelize("codenotes", "postgres", dbPass, {
  host: "localhost",
  dialect: "postgres",
});

(async function test() {
  try {
    await Database.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = Database;
