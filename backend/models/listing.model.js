const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    username: { // The user who listed it
        type: String,
        required: true,
        trim: true
    },
    name: { // Name of the listing
        type: String,
        required: true,
        trime: true,
    },
    description: { // Text description of listing
        type: String,
        required: true,
        trim: true
    },
    size: { // The size of the listing 
        type: String,
        required: true,
        trim: true
    },
    color: { // The color of the listing
        type: String,
        required: true,
        trim: true
    },
    condition: { // The condition of the listing
        type: String,
        required: true,
        trim: true
    },
    price: {  // The price of the listing
        type: Number, 
        required: true
    }, 
    //likes: { type: Number }, // How many likes there are for listing
    /*
    date: { // The date it was created
        type: Date, 
        default: Date.now
    }
    */
},  {
    timestamps: true,
})

const Listing = mongoose.model(`Listing`, listingSchema);

module.exports = Listing;