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
            is_active: req.body.is_active,
            description: req.body.description,
            name: req.body.name,
            symbol: req.body.symbol
        }
        let uploadImages = req.files;
        //get the uploaded images
        let logo = uploadImages.find(({ fieldname }) => fieldname === `logo`);
        payload.logo = logo.path;

        let coin = await coinRepository.createCoin(payload)
        res.status(200).json({
            msg: "Coin created",
            status: true,
            data: coin
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err, status: false })
    }
}




