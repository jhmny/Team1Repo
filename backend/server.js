var http = require('http');
var fs = require('fs');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');       //Helps connect to mongodb database

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*We take the connection string from MongoDB 
and use a .env to connect our database to the
server running on port 8080
*/
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open',() => {console.log("MongoDb database connected!");})

const listingsRouter = require('./routes/listings');

app.use('/listings', listingsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});







