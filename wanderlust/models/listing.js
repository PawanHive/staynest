const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/golden-mountain-peaks-at-sunrise-with-scattered-trees-OYAPYg90DbM",
        set: (v) => v === "" ? "https://unsplash.com/photos/golden-mountain-peaks-at-sunrise-with-scattered-trees-OYAPYg90DbM" : v,                                                       // ternary operator, this will show when image defined but has empty value
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
