const Article = require("../Models/articles");
const User = require("../Models/Users");
const Category = require("../Models/categories");
const Tag = require("../Models/tags");

const { categories, tags } = require("../util/categories_tags");

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

exports.getHome = (req, res, next) => {
  let usersArticles = [];
  Article.find()
    .limit(3)
    .then(articles => {
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
      return Category.find();
    })
    .then(allCategories => {
      res.render("Home", {
        title: "Catazine",
        docType: "/",
        articles: usersArticles,
        tags,
        categories: allCategories
      });
    })
    .catch(err => console.log(err));
};

exports.getArticles = (req, res, next) => {
  const MAX_ARTICLES = 3;
  const page = +req.query.page || 1;
  let numArticles;
  Article.find()
    .countDocuments()
    .then(num => {
      numArticles = num;
      return Article.find()
        .skip((page - 1) * MAX_ARTICLES)
        .limit(MAX_ARTICLES);
    })
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
        articles: usersArticles,
        currentPage: page,
        lastPage: Math.ceil(numArticles / MAX_ARTICLES)
      });
    });
};

exports.getArticle = (req, res, next) => {
  const { articleId } = req.params;
  let userArticle, member;
  Article.findById(articleId)
    .then(article => {
      const arMonth = arMonthes[article.date.getMonth()];
      const day = article.date.getDate();
      const year = article.date.getFullYear();
      userArticle = { ...article._doc, date: `${day} ${arMonth} ${year}` };
      return User.findById(article.user.userId);
    })
    .then(user => {
      member = user;
      return Category.find();
    })
    .then(allCategories => {
      res.render("Article", {
        title: userArticle.header,
        docType: "",
        article: userArticle,
        member,
        tags,
        categories: allCategories
      });
    });
};

exports.getAddArticle = (req, res, next) => {
  res.render("addArticle", {
    title: "Add Article",
    docType: "",
    categories,
    tags
  });
};

exports.postAddArticle = (req, res, next) => {
  const image = req.files.articleImage;
  const { header, category, tags, content } = req.body;
  const article = new Article({
    header,
    imageUrl: image[0].path,
    content,
    tags,
    category,
    user: { userId: req.user._id, name: req.user.name },
    date: Date.now()
  });
  article
    .save()
    .then(article =>
      User.findByIdAndUpdate(req.user._id, {
        $push: {
          articles: {
            _id: article._id,
            header
          }
        }
      })
    )
    .then(() =>
      Category.findOneAndUpdate(
        { name: category },
        {
          $push: {
            articles: article._id
          }
        }
      )
    )
    .then(() =>
      Tag.updateMany(
        { name: { $in: tags } },
        { $push: { articles: article._id } }
      )
    )
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
};

exports.getCategoryArticles = (req, res, next) => {
  const categoryName = req.params.name;
  const MAX_ARTICLES = 3;
  const page = +req.query.page || 1;
  let numArticles;
  Category.findOne({ name: categoryName })
    .then(category => {
      return Article.find({ _id: { $in: category.articles } });
    })
    .then(articles => {
      numArticles = articles.length;
      res.render("Articles", {
        title: `${categoryName} category`,
        docType: "",
        articles: articles.slice((page - 1) * MAX_ARTICLES, page * MAX_ARTICLES),
        currentPage: page,
        lastPage: Math.ceil(numArticles / MAX_ARTICLES)
      });
    })
    .catch(err => console.log(err));
};

exports.getTagArticles = (req, res, next) => {
  const tagName = req.params.name;
  const MAX_ARTICLES = 3;
  const page = +req.query.page || 1;
  let numArticles;
  Tag.findOne({ name: tagName })
    .then(tag => {
      return Article.find({ _id: { $in: tag.articles } });
    })
    .then(articles => {
      numArticles = articles.length;
      res.render("Articles", {
        title: `${tagName} tag`,
        docType: "",
        articles: articles.slice((page - 1) * MAX_ARTICLES, page * MAX_ARTICLES),
        currentPage: page,
        lastPage: Math.ceil(numArticles / MAX_ARTICLES)
      });
    })
    .catch(err => console.log(err));
};
