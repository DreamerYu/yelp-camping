var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {

  checkCampgroundOwnership: function(req, res, next) {
    if(req.isAuthenticated()) {
      Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
          req.flash("error", "Campground not found");
          console.log(err);
          res.redirect("back");
        } else {
          if(foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "Permission Denied");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "Please Login");
      res.redirect("back");
    }
  },

  checkCommentOwnership: function(req, res, next) {
    if(req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
          req.flash("error", "Something went wrong");
          console.log(err);
          res.redirect("back");
        } else {
          if(foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            console.log("Permission denied");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "Please Login");
      res.redirect("/login");
    }
  },

  isLoggedIn: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Must Login to perform action.");
    res.redirect("/login");
  },

  isVerified: function (req, res, next) {
    if(req.user.verified == true) {
      return next();
    }
    req.flash("error", "Check your email for verified.");
    res.redirect("/");
  }

}

module.exports = middlewareObj;
