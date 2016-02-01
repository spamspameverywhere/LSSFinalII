"use strict";
require("dotenv").config({ silent: true });
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var app = express();
require("./models/comment");
require("./models/post");
require("./models/user");
require("./passport/passport");
app.listen(3000, function () {
    console.log("App server running on port 3000.");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use("/models", express.static(__dirname + "/models"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/public", express.static(__dirname + "/public"));
app.set("views", "./views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to LSSFinal DB");
});
var pRoutes = require("./routes/pRoutes");
var uRoutes = require("./routes/uRoutes");
app.use("/postshell", pRoutes);
app.use("/usershell", uRoutes);
app.get("/*", function (req, res, next) {
    return res.render("index");
});
app.use(function (error, req, res, next) {
    console.log(error);
    res.status(500).send(error);
});
module.exports = app;
