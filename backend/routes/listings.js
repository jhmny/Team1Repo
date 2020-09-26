
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

module.exports = router;