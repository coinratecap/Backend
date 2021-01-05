const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinShema = mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Code is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    oneHr: {
        type: Number,
        required: [true, 'Hourly rate is required']
    },
    twentyfourHr: {
        type: String,
        required: [true, 'Daily rate is required']
    },
    volume: {
        type: Number,
        required: [true, 'Volume is required']
    },
    marketCap: {
        type: Number,
        required: [true, 'Market Cap value is required'],
    },
    marketCapRank: {
        type: Number,
        required: [true, 'Market Cap rank is required'],
    },
    maxSupply: {
        type: Number,
        required: [true, 'Max Supply is required'],
    },
    allTimeHigh: {
        type: Number,
        required: [true, 'All Time High is required'],
    },
    allTimeLow: {
        type: Number,
        required: [true, 'All Time Low is required'],
    },
    circulatingSupply: {
        type: Number,
        required: [true, 'Circulating Supply is required'],
    },
    liquidity: {
        type: Number,
        required: [true, 'Liquidity value is required']
    },
    weeklyGraph: {
        type: Array,
        required: [true, 'Weekly graph is required']
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Coin", coinShema);
coinShema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});