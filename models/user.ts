"use strict";

////////////////////////
///Require modules
////////////////////////

import crypto = require("crypto");
import jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

////////////////////////
///Build schema
////////////////////////

let UserSchema = new mongoose.Schema({
  username: {type: String, unique: true, lowercase: true},
  email: {type: String, unique: true, lowercase: true},
  passwordHash: String,
  cPasswordHash: String,
  salt: String,
  token: Object,
  uPosts: {
    postsOwn: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    postsOthers: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
  },
  uComments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

UserSchema.method("setPassword", function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
});

UserSchema.method("confirmPassword", function(pwdConfirm) {
  this.cPasswordHash = crypto.pbkdf2Sync(pwdConfirm, this.salt, 1000, 64).toString("hex");
  return (this.cPasswordHash === this.passwordHash);
});

UserSchema.method("validatePassword", function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return (hash === this.passwordHash);
});

UserSchema.method("generateJWT", function() {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email
  }, process.env.JWT_SECRET);
});

////////////////////////
///Export
////////////////////////

export let User = mongoose.model("User", UserSchema);
export let newUser = mongoose.model("newUser", UserSchema);
