import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  name: String,
  upvotes: Number,
  comments: [],
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
