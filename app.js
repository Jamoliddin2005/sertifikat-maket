const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash')
const logger = require("morgan");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const passport = require('passport')
const helmet = require("helmet");
const userMiddleware = require('./middleware/user')

require('./helper/db')()

var indexRouter = require("./routes/index");
var addRouter = require("./routes/add");
var accountRouter = require("./routes/account");
var adminRouter = require("./routes/admin");
var adminAddRouter = require("./routes/category");
var authRouter = require("./routes/auth");
const keys = require('./keys')

var app = express();






app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", ".hbs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(flash())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.get('*', (req, res, next) => {
  res.locals.user = req.user || null
  next()
})


app.use("/", indexRouter);
app.use("/add", addRouter);
app.use("/account", accountRouter);
app.use("/admin", adminRouter);
app.use("/admin/add", adminAddRouter);
app.use("/auth", authRouter);
app.use(userMiddleware)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
