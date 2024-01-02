const Database = require("./config/db");
const User = require("./models/User");

Database.sync({ alter: true }).then(async () => {
  await User.create({
    name: "test",
    email: "email-test",
    password: "password-test",
    avatar: "avatar-test",
    date: Date.now(),
  });
});
