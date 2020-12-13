const Message = require("../models/Message");

exports.showMessages = (req, res, next) => {
  Message.find({}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render("index", { result: results, pageTitle: 'MembersOnly', path: '/' });
  });
};
