var http = require('http');
var fs = require('fs');

const mongoose = require('mongoose');       //Helps connect to mongodb database

require('dotenv').config();

/*Both constants below help us connect our database to our server */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',() => {console.log("MongoDb database connected!");})


// Creates a server on localhost
http.createServer(function (req, res) {
    fs.readFile('frontend/homepage.html', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
    return res.end();
    })
}).listen(8080);
    console.log("Server is up");






