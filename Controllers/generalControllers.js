exports.getContact = (req, res, next) =>
  res.render("Contact", {
    title: "Contact Us",
    docType: "/contact"
  });

exports.getAbout = (req, res, next) =>
  res.render("About", {
    title: "About Us",
    docType: "/about"
  });
