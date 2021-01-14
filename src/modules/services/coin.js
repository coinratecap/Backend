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
    const coin = await Coin.findById(id);
    return coin
}

exports.createCoin = async payload => {
    const coin = await Coin.create(payload);
    return coin
}