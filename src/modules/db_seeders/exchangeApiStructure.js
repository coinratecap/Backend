require("dotenv").config();
const Coin = require("../models/Coin");
const Exchange = require("../models/Exchange");
const ExchangeApiStructure = require("../models/ExchangeApiStructure");
exports.seedExchangeApiStructures = async () => {
    let exchanges = [
        new ExchangeApiStructure({
            exchange: (await Exchange.findOne({
                name: 'binance'
            })).id,
            coin: (await Coin.findOne({
                symbol: 'BTC'
            })).id,
            endPointPathParam: '',
            queryParams: {
                symbol: 'BTCUSD'
            },
            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            priceJsonPath: '$.weightedAvgPrice',

            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            volumeJsonPath: '$.volume',
        }),

        new ExchangeApiStructure({
            exchange: (await Exchange.findOne({
                name: 'ftx'
            })).id,
            coin: (await Coin.findOne({
                symbol: 'BTC'
            })).id,
            endPointPathParam: '/BTC/USD',
            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            priceJsonPath: '$.result.price',

            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            volumeJsonPath: '$.result.volumeUsd24h',
        }),
        new ExchangeApiStructure({
            exchange: (await Exchange.findOne({
                name: 'binance'
            })).id,
            coin: (await Coin.findOne({
                symbol: 'ETH'
            })).id,
            endPointPathParam: '',
            queryParams: {
                symbol: 'ETHUSD'
            },
            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            priceJsonPath: '$.weightedAvgPrice',

            ///See https://www.npmjs.com/package/jsonpath for syntax reference
            volumeJsonPath: '$.volume',
        }),
        new ExchangeApiStructure({
            exchange: (await Exchange.findOne({
                name: 'ftx'
            })).id,
            coin: (await Coin.findOne({
                symbol: 'ETH'
            })).id,
            endPointPathParam: '/ETH/USD',
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