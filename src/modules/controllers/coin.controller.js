let coinRepository = require('../services/coin');

exports.getAllCoins = async (req, res) => {
    try {
        let coins = await coinRepository.getAllCoins();
        res.json(200).json({
            data: coins,
            status: true
        })

    } catch (err) {
        res.json(400).json({ error: err, status: false })
    }
}

exports.getCoinById = async (req, res) => {
    try {
        let { id } = req.param
        let coin = await coinRepository.getCoinById(id);
        res.json(200).json({
            data: coin,
            status: true
        })

    } catch (err) {
        res.json(400).json({ error: err, status: false })
    }
}

exports.deleteCoin = async (req, res) => {
    try {
        let { id } = req.param
        await coinRepository.deleteCoin(id);
        res.json(200).json({
            msg: "Coin Deleted",
            status: true
        })

    } catch (err) {
        res.json(400).json({ error: err, status: false })
    }
}

exports.createCoin = async (req, res) => {
    let payload = {
        name: req.body.name,
        price: req.body.price,
        oneHr: req.body.oneHr,
        twentyfourHr: req.body.twentyfourHr,
        volume: req.body.volume,
        marketCap: req.body.marketCap,
        liquidity: req.body.liquidity,
        weeklyGraph: req.body.weeklyGraph
    }
    try {

        let coin = await coinRepository.createCoin(payload)
        res.json(200).json({
            msg: "Coin created",
            status: true,
            data: coin
        })
    } catch (err) {
        res.json(400).json({ error: err, status: false })
    }
}