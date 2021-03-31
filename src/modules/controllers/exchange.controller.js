let exchangesRepository = require('../services/exchange.services');

exports.getAllExchanges = async (req, res) => {
    try {
        let exchanges = await exchangesRepository.getAllExchanges()
        res.status(200).json({
            data: exchanges,
            status: true
        })

    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

