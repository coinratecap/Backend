const coinListingService = require('../services/coinListingService')
const coinListing = require('../models/CoinListing')

exports.getCoinRates = async (req, res) => {
    const results = await coinListingService.fetchAllCoinsDataFromExchanges()
    res.status(200).json({
        data: results,
        status: true
    })
}