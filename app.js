const express = require("express");
const connectDatabase = require("./helpers/db/connectDatabase");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/handlebars/generateDate").generateDate;

dotenv.config({ path: "./config/env/config.env" });

connectDatabase();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();

app.use(fileUpload());

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    helpers: {
      generateDate,
    },
  })
);
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const myMiddleware = (req, res, next) => {
  console.log("MY NAME IS ALPEREN");
  next();
};

app.use("/", myMiddleware);

const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);

app.listen(port, hostname, () =>
  console.log(`Example app listenin on http://${hostname}:${port}`)
);
