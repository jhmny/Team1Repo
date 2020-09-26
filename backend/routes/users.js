const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        firstname,
        lastname,
        email,
        password

    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))

});

module.exports = router;