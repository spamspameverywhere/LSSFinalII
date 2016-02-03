"use strict";

////////////////////////
///Require modules
////////////////////////

let mongoose = require("mongoose");

////////////////////////
///Build schema
////////////////////////

let CommentSchema = new mongoose.Schema({
  timestamps: Date,
  commentText: String,
  postedTo: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
  commenterName: String
});

////////////////////////
///Export
////////////////////////

export let Comment = mongoose.model("Comment", CommentSchema);
export let newComment = mongoose.model("newComment", CommentSchema);
