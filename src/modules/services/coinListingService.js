const CoinListing = require("../models/CoinListing");
const Coin = require('../models/Coin')
const ExchangeApiStructure = require('../models/ExchangeApiStructure')
const fetch = require('node-fetch')
const qs = require('qs')
const jsonPath = require('jsonpath')

exports.fetchAllCoinsDataFromExchanges = async (jobId = '1') => {
    const allCoins = await Coin.find()
    const finalResults = []
    for (let coin in allCoins) {
        const exchangeApiEndPoints = await ExchangeApiStructure.find({
            coin: coin.id
        })
        const allExchangeResults = []

        for (let exchangeEndPoint in exchangeApiEndPoints) {
            const query = qs.stringify(exchangeEndPoint.queryParams)
            const responseJson = (await fetch(exchangeEndPoint.endPointPath + '?' + query)).json()
            const priceString = jsonPath.value(responseJson, exchangeEndPoint.priceJsonPath)
            const volumeString = jsonPath.value(responseJson, exchangeEndPoint.volumeJsonPath)

            let priceValue, volumeValue
            if (priceString) {
                priceValue = Number.parseFloat(priceString)
            }
            if (volumeString) {
                volumeValue = Number.parseFloat(volumeString)
            }
            if (priceValue && volumeValue) {
                const entry = {
                    price: priceValue,
                    volume: volumeValue
                }
                allExchangeResults.push(entry)
                console.log('got price and volume entry : ', coin, ' => ', entry)
            }
        }

        console.log('all exchange results for coin : ', coin, ' => ', allExchangeResults)
        finalResults.concat(allExchangeResults)
    }
    return finalResults
}