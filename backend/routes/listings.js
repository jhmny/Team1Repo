const router = require("express").Router();
const multer = require("multer");
let Listing = require("../models/listing.model");

router.route("/").get((req, res) => {
  Listing.find()
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const description = req.body.description;
  const size = req.body.size;
  const color = req.body.color;
  const condition = req.body.condition;
  const price = Number(req.body.price);
  const likes = Number(req.body.likes);
  //const date = req.body.date;
  //const date = Date.parse(req.body.date);

  //console.log(username + " " + name + " " + description + " " + size + " " + color + " " + condition + " " + price + " " + likes);

  const newListing = new Listing({
    username,
    name,
    description,
    size,
    color,
    condition,
    price,
    likes,
    //date,
  });

  console.log(newListing);

  newListing
    .save()
    .then(() => console.log("good")) //(res.send('/listings/byuser'))
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

      listings
        .save()
        .then(() => res.json("Listing updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.fieldname);
  },
  fileFilter(req, file, cb) {
    ext = file.filename.str.slice(-4);
    if (ext == ".jpg" || ext == ".png") {
      cb(null, true);
    } else {
      cb(res.send("File save Error"), false);
    }
  },
});

var upload = multer({ storage: storage });

router.route("/upload").post((req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json("Error: " + err);
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
