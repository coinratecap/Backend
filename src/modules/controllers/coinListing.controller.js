const coinListingService = require('../services/coinListingService')
const coinListing = require('../models/CoinListing')

exports.getCoinRates = async (req, res) => {
  const results = await coinListingService.getCoinListing()
  res.status(200).json({
    data: results,
    status: true,
  })
}

exports.triggerCoinDataFetchFromExchange = async (req, res) => {
  await coinListingService.fetchAllCoinsDataFromExchangesToDb()
  const results = await coinListingService.getCoinListing()
  res.status(200).json({
    data : results,
    status: true,
  })
}
