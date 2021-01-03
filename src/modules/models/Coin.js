const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        unique: true,
    },
    oneHr: {
        type: Number,
        required: [true, 'Hourly rate is required'],
        unique: true,
    },
    twentyfourHr: {
        type: String,
        required: [true, 'Daily rate is required'],
        unique: true,
    },
    volume: {
        type: Number,
        required: [true, 'volume is required'],
        unique: true,
    },
    marketCap: {
        type: Number,
        required: [true, 'Market cap value is required'],
        unique: true,
    },
    liquidity: {
        type: Number,
        required: [true, 'Liquidity value is required'],
        unique: true,
    },
    weeklyGraph: {
        type: Array,
        required: [true, 'Weekly graph is required'],
        unique: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Coin", coinShema);
coinShema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});