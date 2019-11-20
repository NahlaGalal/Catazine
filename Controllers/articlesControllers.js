const Article = require("../Models/articles");
const User = require("../Models/Users");

const arMonthes = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمير"
];

exports.getHome = (req, res, next) =>
  Article.find()
    .limit(3)
    .then(articles => {
      let usersArticles = [];
      articles.forEach(article => {
        const month = arMonthes[article.date.getMonth()];
        const day = article.date.getDate();
        const year = article.date.getFullYear();
        usersArticles.push({
          ...article._doc,
          day,
          month,
          year
        });
      });
      res.render("Home", {
        title: "Catazine",
        docType: "/",
        articles: usersArticles
      });
    });

exports.getArticles = (req, res, next) =>
  Article.find()
    .then(articles => {
      let usersArticles = [];
      articles.forEach(article => {
        const arMonth = arMonthes[article.date.getMonth()];
        const day = article.date.getDate();
        const year = article.date.getFullYear();
        usersArticles.push({
          ...article._doc,
          date: `${day} ${arMonth} ${year}`
        });
      });
      res.render("Articles", {
        title: "Articles",
        docType: "/articles",
        articles: usersArticles
      });
    });

exports.getArticle = (req, res, next) => {
  const { articleId } = req.params;
  let userArticle;
  Article.findById(articleId)
    .then(article => {
      const arMonth = arMonthes[article.date.getMonth()];
      const day = article.date.getDate();
      const year = article.date.getFullYear();
      userArticle = { ...article._doc, date: `${day} ${arMonth} ${year}` };
      return User.findById(article.user.userId);
    })
    .then(member => {
      console.log(member);
      res.render("Article", {
        title: "Article",
        docType: "",
        article: userArticle,
        member
      });
    });
};
