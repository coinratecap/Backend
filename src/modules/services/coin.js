const cron = require('node-cron')
const got = require('got')

const Coin = require("../models/Coin");


exports.getAllCoins = async () => {
    const coins = await Coin.find();
    return coins;
};

exports.deleteCoin = async (id) => {
    const coin = await Coin.findByIdAndRemove(id);
    return coin
}

exports.editCoinDetails = async (payload, id) => {
    const coin = await Coin.findByIdAndUpdate(id, payload, {
        new: true
    })
    return coin
}


exports.getCoinById = async id => {
    // console.log(id);
    const coin = await Coin.findById(id);
    return coin
}

exports.createCoin = async payload => {
    const coin = await Coin.create(payload);
    return coin
}
exports.getCoinPrice = async () => {
    const url = 'https://api.gemini.com/v1/pubticker/btcusd'
    try {
        const response = await got(url, { responseType: 'json' })
        return response.body
    } catch (error) {
        console.log(error)
    }
}



