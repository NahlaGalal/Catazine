const express = require("express");

const articlesControllers = require("../Controllers/articlesControllers");

const router = express.Router();

router.get("/", articlesControllers.getHome);

router.get("/Articles", articlesControllers.getArticles);

router.get("/Article", articlesControllers.getArticle);

module.exports = router;