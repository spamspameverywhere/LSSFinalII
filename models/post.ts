"use strict";

////////////////////////
///Require modules
////////////////////////

let mongoose = require("mongoose");

////////////////////////
///Build schema
////////////////////////

let PostSchema = new mongoose.Schema({
  timestamps: Date,
  title: {type: String, required: true},
  imageUrl: String,
  postText: String,
  origPoster: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  origPosterName: String,
  rePostedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

////////////////////////
///Export
////////////////////////

export let Post = mongoose.model("Post", PostSchema);
export let newPost = mongoose.model("newPost", PostSchema);
