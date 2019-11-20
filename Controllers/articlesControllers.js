exports.getHome = (req, res, next) =>
  res.render("Home", {
    title: "Catazine",
    docType: "/"
  });

exports.getArticles = (req, res, next) =>
  res.render("Articles", {
    title: "Articles",
    docType: "/articles"
  });

exports.getArticle = (req, res, next) =>
  res.render("Article", {
    title: "Article",
    docType: ""
  });
