require("dotenv").config();
const Coin = require("../models/Coin");
const Exchange = require("../models/Exchange")
const ExchangeApiStructure = require("../models/ExchangeApiStructure");

exports.seedExchangeApiStructures = async () => {
    let exchangeApiStructures = [
        new Exchange({
            name: 'binance',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: '',
            website: '',
            facebook: '',
            twitter: '',
            reddit: '',
            coins: Coin.find(),
            apiEndPoint: 'https://api.binance.us/api/v3/ticker/24hr'
        }),
        new Exchange({
            name: 'kraken',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: '',
            website: '',
            facebook: '',
            twitter: '',
            reddit: '',
            coins: Coin.find(),
            apiEndPoint: 'https://api.kraken.com/0/public/Ticker'
        }),
        new Exchange({
            name: 'ftx',
            volume: 0,
            trust: 1,
            trustRank: 1,
            centralized: false,
            image: '',
            website: '',
            facebook: '',
            twitter: '',
            reddit: '',
            coins: Coin.find(),
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