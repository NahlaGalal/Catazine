const express = require("express");

const articlesControllers = require("../Controllers/articlesControllers");
const isAuth = require("../util/isAuth");

const router = express.Router();

router.get("/", articlesControllers.getHome);

router.get("/Articles", articlesControllers.getArticles);

router.get("/Article/:articleId", articlesControllers.getArticle);

router.get("/add-article", isAuth, articlesControllers.getAddArticle);

router.post("/add-article", isAuth, articlesControllers.postAddArticle);

module.exports = router;