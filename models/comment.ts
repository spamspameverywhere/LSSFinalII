"use strict";

////////////////////////
///Require modules
////////////////////////

let mongoose = require("mongoose");

////////////////////////
///Build schema
////////////////////////

let CommentSchema = new mongoose.Schema({
  timestamps: {type: Date, required: true},
  commentText: {type: String, required: true},
  postedTo: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
  commenter: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  commenterName: String
});

////////////////////////
///Export
////////////////////////

export let Comment = mongoose.model("Comment", CommentSchema);
export let newComment = mongoose.model("newComment", CommentSchema);
