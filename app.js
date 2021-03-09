const express = require("express");
const connectDatabase = require("./helpers/db/connectDatabase");
const path = require("path");
const exphbs = require("express-handlebars");

const dotenv = require("dotenv");


dotenv.config({ path: "./config/env/config.env" });


connectDatabase();


const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("site/index");
});

app.get("/about", (req, res) => {
  res.render("site/about");
});

app.get("/blog", (req, res) => {
  res.render("site/blog");
});

app.get("/contact", (req, res) => {
  res.render("site/contact");
});

app.get("/login", (req, res) => {
  res.render("site/login");
});

app.get("/register", (req, res) => {
  res.render("site/register");
});

app.listen(port, hostname, () =>
  console.log(`Example app listenin on http://${hostname}:${port}`)
);
