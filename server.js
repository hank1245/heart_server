const express = require("express");
const cors = require("cors");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { db } = require("./config/db");

// configuration =========================
app.set("port", process.env.PORT || 5001);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Root");
});

db.connect();

app.get("/click", (req, res) => {
  db.query("UPDATE Click set count=count+1 WHERE id=1", (error, rows) => {
    if (error) throw error;
  });
  db.query("SELECT * FROM Click", (error, rows) => {
    if (error) throw error;
    res.send(rows);
  });
});

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});
