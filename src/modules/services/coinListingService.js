const CoinListing = require("../models/CoinListing");
const ExchangeApiStructure = require('../models/ExchangeApiStructure')
const fetch = require('node-fetch')
const qs = require('qs')
const jsonPath = require('jsonpath')

exports.fetchAllCoinsDataFromExchanges = async (jobId = '1') => {
    const allCoinApis = await ExchangeApiStructure.find()

    allCoinApis.forEach((coinApiModel) => {
        const query = qs.stringify(coinApiModel.queryParams)
        const responseJson = (await fetch(coinApiModel.endPointPath + '?' + query)).json()
        const priceString = jsonPath.value(responseJson, coinApiModel.priceJsonPath)
        const volumeString = jsonPath.value(responseJson, coinApiModel.volumeJsonPath)

        let priceValue, volumeValue
        if (priceString) {
            priceValue = Number.parseFloat(priceString)
        }
        if (volumeString) {
            volumeValue = Number.parseFloat(volumeString)
        }


        new CoinListing({
            coin: coinApiModel.coin,
            exchange: coinApiModel.exchange,
            price: priceValue,
            volume: volumeValue,
            jobId

        }).save((erro, result) => {
            console.log()
        })
    })
}