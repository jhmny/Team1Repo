const router = require('express').Router();
let User = require('../models/user.model');
var bcrypt = require('bcrypt');
var saltLength = 10;

router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});
/* Need to create Delete and update for users
and I need to make login as well
*/
router.route('/sign_up').post((req, res) => {          

    bcrypt.hash(req.body.password, saltLength, function (err, hash) {

    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = hash;

    const newUser = new User({
        
        username,
        firstname,
        lastname,
        email,
        password

    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))

});

});

module.exports = router;