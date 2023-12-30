const express = require("express");
require("./config/db");
const app = express();

app.get("/", (req, res) => res.send("API Running"));

//Initialize Middleware
app.use(express.json({ extended: false }));

//Defining Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
