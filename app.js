const express = require("express");
const connectDatabase = require("./helpers/db/connectDatabase");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/handlebars/generateDate").generateDate;
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require('method-override')



dotenv.config({ path: "./config/env/config.env" });

connectDatabase();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();

app.use(
  expressSession({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

//flash-message middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

app.use(fileUpload());

app.use(express.static("public"));

app.use(methodOverride("_method"))


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

//display link middleware

app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});

const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require("./routes/admin/index")

const { Mongoose } = require("mongoose");
const { networkInterfaces } = require("os");
app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/admin", admin);

app.listen(port, hostname, () =>
  console.log(`Example app listenin on http://${hostname}:${port}`)
);
