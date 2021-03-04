require("dotenv").config();
const Coin = require("../models/Coin");
const Exchange = require("../models/Exchange")

exports.seedExchanges = async () => {
    let exchangeApiStructures = [
        new Exchange({
            name: 'binance',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: 'url',
            website: 'url',
            facebook: 'url',
            twitter: 'url',
            reddit: 'url',
            coins: (await Coin.find()).map(c => c.id),
            apiEndPoint: 'https://api.binance.us/api/v3/ticker/24hr'
        }),
        new Exchange({
            name: 'kraken',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: 'url',
            website: 'url',
            facebook: 'url',
            twitter: 'url',
            reddit: 'url',
            coins: (await Coin.find()).map(c => c.id),
            apiEndPoint: 'https://api.kraken.com/0/public/Ticker'
        }),
        new Exchange({
            name: 'ftx',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: 'url',
            website: 'url',
            facebook: 'url',
            twitter: 'url',
            reddit: 'url',
            coins: (await Coin.find()).map(c => c.id),
            apiEndPoint: 'https://ftx.com/api/markets'
        }),
    ];

    for (var i = 0; i < exchangeApiStructures.length; i++) {
        try {
            console.log(await exchangeApiStructures[i].save())
        } catch (e) {
            console.error(e)
        }
    }
};