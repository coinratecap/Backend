const coinListingService = require('../services/coinListingService')
const cron = require('node-cron')
const uuid = require('uuid')

exports.scheduleCron = () => {
  /// runs the function every 5 minutes
  cron.schedule('*/1 * * * *', () => {
    const jobId = uuid.v4()
    console.log('Running fetchAllCoinsFromExchange cron job with job id : ' , jobId)
    coinListingService.fetchAllCoinsDataFromExchangesToDb(jobId)
  })
}
