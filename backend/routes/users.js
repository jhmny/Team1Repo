
//Allows us to create a route to the database from the server
//Insomnia was used to test this
const router = require('express').Router();
let User = require('../models/user.model');

//This will allow us to encrypt users passwords
var bcrypt = require('bcrypt');
//const { route } = require('./listings');

//This will add a random salt at the end of our hashed password.
//Allows for more security the higher it is , but computationally difficult
var saltLength = 10;


//This is how we will obtain info stored in the database
router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/sign_up').get((req, res) => { 
    res.send('ey')
})

//Allows people to sign up and this is sent to the database
router.route('/sign_up').post((req, res) => {          

    bcrypt.hash(req.body.password, saltLength, function (err, hash) {

    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = hash; //hash;

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


/*
This post function allows us to use an existing email and password
stored in mongodb. We use findOne() function which compares the email
obtained from the login page with an email in the database.If it exists
then we check the password the user entered, hash it and then compare it with
the hashed password in the database.
*/
router.route('/login').post((req, res) => {

    User.findOne({ 'email': req.body.email }, function (err, user) {
        if (err) return handleError(err);
    
    }).then(function(user) {
        if(!user) {
            console.log('not here')
            res.send('bad');
        }
        else {
            console.log('here');
            bcrypt.compare(req.body.password, user.password, function (err, result){
                if(result == true) {
                    
                    res.send('users');
                }
                else {
                    res.send('bad');
                }
            });
        }
        
    }); 

});


//We can find a user by the unique id that is given to their account
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//In order to delete a users account we need to have their id
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Listing deleted. '))
        .catch(err => res.status(400).json('Error: ' + err));
});

//This is used to update the users profile
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(users => {
            bcrypt.hash(req.body.password, saltLength, function (err, hash) {
                users.username = req.body.username;
                users.firstname = req.body.firstname;
                users.lastname = req.body.lastname;
                users.email = req.body.email;
                users.password = hash;

                users.save()
                    .then(() => res.json('Listing updated.'))
                    .catch(err => res.status(400).json('Error: ' + err));

            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;