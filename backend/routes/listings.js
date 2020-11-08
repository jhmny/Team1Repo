const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
let Listing = require("../models/listing.model");

router.route("/").get((req, res) => {
  Listing.find()
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/filter").post((req, res) => {
  const keys = Object.keys(req.body);
  var filter = {};
  var i = 0;
  for(i = 0; i < keys.length; i++){
    if(req.body[keys[i]].length !=0){
      filter[keys[i]] = req.body[keys[i]];
    }
  }
  //console.log(req.body);
  //console.log(filter); these two should match, excluding empty arrays

  Listing.find(filter, function (err, listings) {
    if (err) {
      console.log("bad");
      res.json(err);
    }
  }).then(function (listings) {
    //console.log("good");
    res.json(listings);
  });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const size = req.body.size;
  const color = req.body.color;
  const condition = req.body.condition;
  const price = Number(req.body.price);
  const likes = Number(req.body.likes);
  const sold = false;
  const image = req.body.images;
  //const date = req.body.date;
  //const date = Date.parse(req.body.date);

  //console.log(username + " " + name + " " + description + " " + size + " " + color + " " + condition + " " + price + " " + likes);
console.log(req.body);
  const newListing = new Listing({
    username,
    name,
    description,
    category,
    size,
    color,
    condition,
    price,
    likes,
    sold,
    image
  });

  console.log(newListing);

  newListing
    .save()
    /*
    (function (err, list) {
      console.log(list.) //link = list.id
    })
    */
    .then(() => res.send(newListing.id)) //(res.send('/listings/byuser'))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/byuser").post((req, res) => {
  User.find({ username: req.body.username }, function (err, listings) {
    if (err) {
      console.log("bad");
    }
  }).then(function (listings) {
    console.log("good");
    res.json(listings);
    console.log(listings);
  });
});

router.route("/:id").get((req, res) => {
  Listing.findById(req.params.id)
    .then((listings) => res.json(listings)) //, console.log(listings)
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Listing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Listing deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Listing.findById(req.params.id)
    .then((listings) => {
      listings.username = req.body.username;
      listings.name = req.body.name;
      listings.description = req.body.description;
      listings.size = req.body.size;
      listings.color = req.body.color;
      listings.condition = req.body.condition;
      listings.price = req.body.price;
      listings.images = req.file.path;

      listings
        .save()
        .then(() => res.json("Listing updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
<<<<<<< Updated upstream
      cb(null, '../frontend/uploads/')
=======
    cb(null, '../frontend/public/images')
>>>>>>> Stashed changes
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(400).end('only jpg, png are allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")


router.route("/upload").post((req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log("router upload post error got!")
      return res.status(400).json("Error: " + err);
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    })
  })
});

module.exports = router;