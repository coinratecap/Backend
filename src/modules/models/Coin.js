const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const coinShema = mongoose.Schema({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
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
        required: [true, 'Market cap value is required'],
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