import express from "express";
import Article from "../models/article.model";

const router = express.Router();

router.route("/").get((req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:name").get((req, res) => {
  const articleName = req.params.name;

  Article.findOne({ name: articleName })
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const upvotes = Number(req.body.upvotes);
  const comments = req.body.comments;

  const newArticle = new Article({ name, upvotes, comments });

  newArticle
    .save()
    .then(() => res.json("Article added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:name/upvote").post(async (req, res) => {
  const articleName = req.params.name;

  try {
    const articleInfo = await Article.findOne({ name: articleName });
    await Article.updateOne(
      { name: articleName },
      { $set: { upvotes: articleInfo.upvotes + 1 } }
    );

    const updatedArticleInfo = await Article.findOne({ name: articleName });
    console.log(updatedArticleInfo);
    res.status(200).json(updatedArticleInfo);
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

router.route("/:name/add-comment").post(async (req, res) => {
  const articleName = req.params.name;
  const { username, text } = req.body;
  console.log(req.body);
  try {
    const articleInfo = await Article.findOne({ name: articleName });
    await Article.updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );

    const updatedArticleInfo = await Article.findOne({ name: articleName });
    console.log(updatedArticleInfo);

    res.status(200).json(updatedArticleInfo);
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

module.exports = router;
