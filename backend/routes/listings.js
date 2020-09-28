const router = require('express').Router();
let Listing = require('../models/listing.model');

router.route('/').get((req, res) => {
  Listing.find()
    .then(listings => res.json(listings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const description = req.body.description;
    const size = req.body.size;
    const color = req.body.color;
    const condition = req.body.condition;
    const price = Number(req.body.price);
    const likes = Number(req.body.likes);
    const date = Date.parse(req.body.date);


    const newListing = new Listing({
        username,
        name,
        description,
        size,
        color,
        condition,
        price,
        likes,
        date,
    });

    newListing.save()
    .then(() => res.json('Listing added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Listing.findById(req.params.id)
      .then(listings => res.json(listings))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Listing.findByIdAndDelete(req.params.id)
      .then(() => res.json('Listing deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Listing.findById(req.params.id)
      .then(listings => {
          listings.username = req.body.username;
          listings.name = req.body.name;
          listings.description = req.body.description;
          listings.size = req.body.size;
          listings.color = req.body.color;
          listings.condition = req.body.condition;
          listings.price = req.body.price;

          listings.save()
            .then(() => res.json('Listing updated.'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;