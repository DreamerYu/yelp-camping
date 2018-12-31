var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var keys = require('../config/keys');
var googleMapsClient = require('@google/maps').createClient({
  key: keys.googleMapsKey
});


//Campground Routes
router.get("/", (req, res) => {
  console.log(req.user);
  //Get Campgrounds from db
  Campground.find({}, (err, campgrounds) => {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds
      });
    }
  });
});


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, middleware.isVerified, (req, res) => {
  res.render("campgrounds/new");
});


//CREATE - adds new campground to DB
router.post("/", middleware.isLoggedIn, middleware.isVerified, (req, res) => {
  console.log(req.body.address)
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var address = req.body.address;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
    Campground.create({
      name: name,
      price: price,
      image: image,
      description: desc,
      address: address,
      author: author
    }, function(err, campground) {
      if (err) {
        console.log(err);
      } else {
        /*console.log("New Campground!");
        console.log(campground);*/
      }
    });
  res.redirect("/campgrounds");
});

//Find campground with provided ID
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if(err) {
      console.log(err);
    } else {
      var address = foundCampground.address;
      googleMapsClient.geocode({
        address: address
      }, (err, response) => {
        if(!err) {
          var coordinates = response.json.results[0].geometry.location;
          res.render("campgrounds/show", {
            campground: foundCampground,
            coordinates: coordinates
          });
        } else {
          console.log(err);
        }
      });
    }
  });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  //
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Delete Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});



module.exports = router;
