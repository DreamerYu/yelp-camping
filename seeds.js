var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {name: "Granite Pass",
   image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
   description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  },
  {
   name: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
   iamge: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
   descrition: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  },
  {
    name: "Canyon Retreat",
    image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
    description: "Lots of sun"
  }
]

function seedDB() {
  //Removes all Campgrounds
  Campground.remove({}, (err) => {
    /*if(err) {
      console.log(err);
    } else {
      console.log("Removed Campgrounds");
      data.forEach((seed) => {
        Campground.create(seed, (err, Campground) => {
          if(err) {
            console.log(err);
          } else {
            console.log("added data");
            Comment.create({
              text: "Place is great, wish it had wifi",
              author: "Homer"
            }, (err, comment) => {
              if(err) {
                console.log(err);
              } else {
                console.log(comment);
                Campground.comments.push(comment);
                Campground.save();
              }
            });
          }
        });
      });
    } */
  });
}

module.exports = seedDB;
