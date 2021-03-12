const fetchCoinPricesCron = require('./fetchCoinPricesCron')

exports.setupCronJobs = () => {
  fetchCoinPricesCron.scheduleCron()
}