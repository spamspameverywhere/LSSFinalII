"use strict";

////////////////////////
///Require modules
////////////////////////

require("dotenv").config({silent: true});
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import express = require("express");
let mongoose = require("mongoose");
import passport = require("passport");

////////////////////////
///Constants
////////////////////////

const app = express();

////////////////////////
///Require models
////////////////////////

require("./models/comment");
require("./models/post");
require("./models/user");

require("./passport/passport");

////////////////////////
///Port
////////////////////////

app.listen(3000, function() {
  console.log("App server running on port 3000.");
});

////////////////////////
///Parse
////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

////////////////////////
///Express static
////////////////////////

app.use("/models", express.static(__dirname + "/models"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/public", express.static(__dirname + "/public"));

////////////////////////
///Views: EJS
////////////////////////

app.set("views", "./views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

////////////////////////
///Data: MongoDB, Mongoose, Mongo Express
////////////////////////

mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to PinterRedditBook DB");
});

////////////////////////
///Require routes
////////////////////////

//let cRoutes = require("./routes/cRoutes");
let pRoutes = require("./routes/pRoutes");
let uRoutes = require("./routes/uRoutes");

//app.use("/commentshell", cRoutes);
app.use("/postshell", pRoutes);
app.use("/usershell", uRoutes);

app.get("/*", (req, res, next) => {
  return res.render("index");
});

app.use((error: any, req, res, next) => {
  console.log(error);
  res.status(500).send(error);
})

////////////////////////
///Export
////////////////////////

export = app;
