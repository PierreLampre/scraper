var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/", function(req, res) {
  db.Article.find({
    "saved": false
  }).limit(15)
    .then(function (data) {
        var hbsObject = {
            articles: data
        };
        res.render("index", hbsObject);
    })
    .catch(function (error) {
      res.send(error)
    });
});

router.get("/scrape", function (req, res) {

  axios.get("https://thehardtimes.net/music/emo-screamo/").then(function (response) {

    var $ = cheerio.load(response.data);

    $("article").each(function (i, element) {

      var result = {};

      result.title = $(this)
        .children(".post-header")
        .children("h2")
        .children("a")
        .text();
      result.summary = $(this)
        .children(".post-content")
        .children("p")
        .text();
      result.link = $(this)
        .children(".post-header")
        .children("h2")
        .children("a")
        .attr("href");    

      db.Article.create(result)
        .then(function (dbArticle) {

          console.log(dbArticle);
          
        })
        .catch(function (err) {

          console.log(err);
        });
    });

    res.send("Scrape Complete");
  });
});

router.get("/articles", function (req, res) {
  
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.get("/articles/:id", function (req, res) {
  
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/articles/:id", function (req, res) {

  db.Note.create(req.body)
    .then(function (dbData) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbData._id } }, { new: true });
    })
    .then(function (dbData) {
      res.json(dbData);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;