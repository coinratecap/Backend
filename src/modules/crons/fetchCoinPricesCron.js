const coinListingService = require('../services/coinListingService')
const cron = require('node-cron')

exports.scheduleCron = () => {
  /// runs the function every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('Running fetchAllCoinsFromExchange cron job')
    coinListingService.fetchAllCoinsDataFromExchangesToDb()
  })
}
