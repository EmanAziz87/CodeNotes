const express = require("express");
const Database = require("./config/db");
const app = express();

//Connecting To Database

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
