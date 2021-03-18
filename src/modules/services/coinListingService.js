const Coin = require('../models/Coin')
const ExchangeApiStructure = require('../models/ExchangeApiStructure')
const fetch = require('node-fetch')
const qs = require('qs')
const jsonPath = require('jsonpath')
const Exchange = require('../models/Exchange')
const CoinListing = require('../models/CoinListing')

exports.fetchAllCoinsDataFromExchangesToDb = async (jobId) => {
  const allCoins = await Coin.find()
  for (let coinIndex in allCoins) {
    const coin = allCoins[coinIndex]
    const exchangeApiEndPoints = await ExchangeApiStructure.find({
      coin: coin.id,
    })
    const allExchangeResults = []

    for (let exchangeEndPointIndex in exchangeApiEndPoints) {
      const coinExchangeEndPoint = exchangeApiEndPoints[exchangeEndPointIndex]
      const url = await getFullExchangeUrl(coinExchangeEndPoint)
      const responseJson = await (await fetch(url)).json()
      const priceString = jsonPath.value(
        responseJson,
        coinExchangeEndPoint.priceJsonPath,
      )
      const volumeString = jsonPath.value(
        responseJson,
        coinExchangeEndPoint.volumeJsonPath,
      )

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
          volume: volumeValue,
          coin,
        }
        allExchangeResults.push(entry)
      }
    }

    console.log(
      'all exchange results for coin : ',
      coin.symbol,
      ' => ',
      allExchangeResults,
    )
    if (allExchangeResults.length == 0) continue

    const averageVolume =
      allExchangeResults.reduce((total, next) => total + next.volume, 0) /
      allExchangeResults.length
    const volumeWeightedPrice = getVolumeWeightedPrice(allExchangeResults)
    storeCoinDataIntoDb(coin, volumeWeightedPrice, averageVolume, jobId)
    console.log(
      'volume weighted price of ',
      coin.symbol,
      ' => ',
      volumeWeightedPrice,
    )
  }
}

exports.getCoinListing = async () => {
  const coinListingEntries = await CoinListing.find()
  const results = []
  for (coinListingIndex in coinListingEntries) {
    const coinListing = coinListingEntries[coinListingIndex]
    const symbol = (await Coin.findById(coinListing.coin)).symbol
    results.push({
      price: coinListing.price,
      coinSymbol: symbol,
    })
  }
  console.log('result = ', results)
  return results
}

const getFullExchangeUrl = async (coinExchangeEndPoint) => {
  const exchange = await Exchange.findById(coinExchangeEndPoint.exchange)
  const exchangeApiEndPoint = exchange.apiEndPoint
  const query = qs.stringify(coinExchangeEndPoint.queryParams?.toJSON() ?? '')
  let url = `${exchangeApiEndPoint}${
    coinExchangeEndPoint.endPointPathParam ?? ''
  }`
  if (query.trim().length > 0) {
    url += `?${query}`
  }
  return url
}

//coinExchangeResults : [Object]
const getVolumeWeightedPrice = (coinExchangeResults) => {
  const totalVolume = coinExchangeResults.reduce(
    (previous, current, currentIndex) => {
      return previous + current.volume
    },
    0,
  )
  let averagePrice = 0.0
  for (entryIndex in coinExchangeResults) {
    const coinExchangeResult = coinExchangeResults[entryIndex]
    averagePrice +=
      coinExchangeResult.price * (coinExchangeResult.volume / totalVolume)
  }
  return averagePrice
}

const storeCoinDataIntoDb = (coin, averageVolume, coinAveragePrice, jobId) => {
  new CoinListing({
    coin,
    volume: averageVolume,
    price: coinAveragePrice,
    jobId,
  }).save()
}
