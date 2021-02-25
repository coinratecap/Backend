const mongoose = require("mongoose");

const coinListingSchema = mongoose.Schema({
    //this will point to the type of coin we are adding the entr , eg : bitcoiny
    coin: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Name is required'],
        ref: 'Coin'
    },
    //price in USD
    price: {
        type: Number,
        required: [true, "coin value"],
    },
    volume: {
        type: Number,
    },
    exchange: {
        type: mongoose.Types.ObjectId,
        required: [true, "Exchange is required"],
        ref: 'Exchange'
    },
    jobId: {
        type: String,
        required: false
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("CoinListing", coinListingSchema);