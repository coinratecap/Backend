require("dotenv").config();
const Coin = require("../models/Coin");
const Exchange = require("../models/Exchange");
const ExchangeApiStructure = require("../models/ExchangeApiStructure");
exports.seedExchanges = async () => {
    let exchanges = [
        new ExchangeApiStructure({
            exchange: Exchange.findOne({
                name: 'binance'
            }),
            coin: Coin.findOne({
                symbol: 'BTC'
            }),
            endPointPath: '',
            queryParams: {
                symbol: 'BTCUSD'
            },
            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            priceJsonPath: '$.weightedAvgPrice',

            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            volumeJsonPath: '$.volume',
        }),

        new ExchangeApiStructure({
            exchange: Exchange.findOne({
                name: 'ftx'
            }),
            coin: Coin.findOne({
                symbol: 'BTC'
            }),
            endPointPath: '/BTC/USD',
            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            priceJsonPath: '$.result.price',

            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            volumeJsonPath: '$.result.volumeUsd24h',
        }),

        new ExchangeApiStructure({
            exchange: Exchange.findOne({
                name: 'kraken'
            }),
            coin: Coin.findOne({
                symbol: 'ETH'
            }),
            endPointPath: '',
            queryParams: "pair=ETHUSD",
            priceJsonPath: '$.result.XXBTZUSD.o',
            volumeJsonPath: '$.result.XXBTZUSD.v[1]',
        }),

        new ExchangeApiStructure({
            exchange: Exchange.findOne({
                name: 'ftx'
            }),
            coin: Coin.findOne({
                symbol: 'ETH'
            }),
            endPointPath: '/ETH/USD',
            priceJsonPath: '$.result.price',
            volumeJsonPath: '$.result.volumeUsd24h',
        }),
    ];

    for (var i = 0; i < exchanges.length; i++) {
        try {
            console.log(await exchanges[i].save())
        } catch (e) {
            console.error(e)
        }
    }
};