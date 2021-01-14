let coinRepository = require('../services/coin');
const { v4: uuidv4 } = require('uuid');

exports.getAllCoins = async (req, res) => {
    try {
        let coins = await coinRepository.getAllCoins();
        res.status(200).json({
            data: coins,
            status: true
        })

    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.getCoinById = async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id)
        let coin = await coinRepository.getCoinById(id);
        res.status(200).json({
            data: coin,
            status: true
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.deleteCoin = async (req, res) => {
    try {
        let { id } = req.params
        await coinRepository.deleteCoin(id);
        res.status(200).json({
            msg: "Coin Deleted",
            status: true
        })

    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.createCoin = async (req, res) => {
    try {
        let payload = {
            id: uuidv4(),
            is_active: req.body.is_active,
            description: req.body.description,
            name: req.body.name,
            price: req.body.price,
            changeOneHr: req.body.changeOneHr,
            changeTwentyFourHr: req.body.changeTwentyFourHr,
            changeSevenDay: req.body.changeSevenDay,
            changeFourteenDay: req.body.changeFourteenDay,
            changeThirtyDay: req.body.changeThirtyDay,
            changeSixtyDay: req.body.changeSixtyDay,
            changeOneYear: req.body.changeOneYear,
            fullyDilutedValuation: req.body.fullyDilutedValuation,
            maxSupply: req.body.maxSupply,
            circulatingSupply: req.body.circulatingSupply,
            allTimeHigh: req.body.allTimeHigh,
            allTimeLow: req.body.allTimeLow,
            weeklyGraph: req.body.weeklyGraph,
            website: req.body.website,
            technical_doc: req.body.technical_doc,
            twitter: req.body.twitter,
            reddit: req.body.reddit,
            volume: req.body.volume,
            marketCap: req.body.marketCap,
            liquidity: req.body.liquidity,
            marketCapRank: req.body.marketCapRank
        }
        let uploadImages = req.files;
        //get the uploaded images
        let symbol = uploadImages.find(({ fieldname }) => fieldname === `symbol`);
        let logo = uploadImages.find(({ fieldname }) => fieldname === `logo`);
        payload.logo = logo.path;
        payload.symbol = symbol.path

        let coin = await coinRepository.createCoin(payload)
        res.status(200).json({
            msg: "Coin created",
            status: true,
            data: coin
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}


