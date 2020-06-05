var User = require("../models/Users");
var Cart = require("../models/Cart");

module.exports = function(req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(function(user) {
        req.user = user;
        next();
      })
      .catch(function(err) {
      console.log(err.message);
        res.redirect("/");
      });
  } else res.redirect("/");
};
