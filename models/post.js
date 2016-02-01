"use strict";
var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({
    timestamps: Date,
    title: { type: String, required: true },
    imageUrl: String,
    postText: String,
    origPoster: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    origPosterName: String,
    rePostedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});
exports.Post = mongoose.model("Post", PostSchema);
exports.newPost = mongoose.model("newPost", PostSchema);
