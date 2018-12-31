var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect("mongodb://localhost/yelpcamp");


//Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


/*for (i = 0; i < campgrounds.length; i++) {
  Campground.create({
    name: campgrounds[i].name,
    image: campgrounds[i].image
  }, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log("New Campground!");
      console.log(campground);
    }
  });
}*/
Campground.find();


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  //Get Campgrounds from db
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("index", {campgrounds: campgrounds})
    }
  });
});


//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new")
});


//CREATE - adds new campground to DB
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
    Campground.create({
      name: name,
      image: image,
      description: desc
    }, function(err, campground) {
      if (err) {
        console.log(err);
      } else {
        console.log("New Campground!");
        console.log(campground);
      }
    });
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", (req, res) => {
  //Find campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, process.env.IP, (req, res) => {
  console.log("Server online");
});
