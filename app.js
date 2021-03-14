const express = require("express");
const connectDatabase = require("./helpers/db/connectDatabase");
const path = require("path");
const bodyParser = require("body-parser")
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 

const main = require("./routes/main");
const posts = require("./routes/posts");
app.use("/", main);
app.use("/posts", posts);

app.listen(port, hostname, () =>
  console.log(`Example app listenin on http://${hostname}:${port}`)
);
