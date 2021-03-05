const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const exchangeApiStructureSchema = mongoose.Schema({
    exchange: {
        type: mongoose.Types.ObjectId,
        ref: 'Exchange',
        required: true,
    },
    coin: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Coin'
    },
    endPointPathParam: {
        type: String,
    },
    queryParams: {
        type: Map,
        of: String,
    },
    ///See https://www.npmjs.com/package/jsonpath for syntax reference
    priceJsonPath: {
        type: String,
        required: true
    },

    ///See https://www.npmjs.com/package/jsonpath for syntax reference
    volumeJsonPath: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

exchangeApiStructureSchema.plugin(uniqueValidator, {
    message: `{PATH} already in use`
});
module.exports = mongoose.model("ExchangeApiStructure", exchangeApiStructureSchema);