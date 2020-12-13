exports.login_get = function (req, res, next) {
  res.render("login", { pageTitle: "Login", path: '/login' });
};

exports.login_post = function (req, res, next) {
  res.send("Not Implemented");
};
