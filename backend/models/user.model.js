var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req, res) {             
    var firstName = req.body.firstName;
    var lastName  = req.body. lastName;
    var email = req.body.email;
    var pass = req.body.password;

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password":pass
    }

db.collection('details').insertOne(data, function(err, collection){
    if (err) throw err;
    console.log("Record inserted Successfully");

});

    return res.redirect('signup_success.html');
})

app.get('/', function(req, res) {                                       //We may have to change the html file
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
    
}).listen(5000)

console.log("server listening at port 5000");