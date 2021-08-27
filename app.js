//external imports

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

const app = express();
dotenv.config();

// database connections
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connectiong successful"))
  .catch((err) => console.log(err));

// request parsers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine

app.set("view enjine", "ejs");

// set static folder (public folder)
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//404 not found hanler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
