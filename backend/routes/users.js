const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    //console.log("F: ", firstname, "L: ", lastname, "E: ", email, "P: ", password);
    
    var newUser = new User({
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