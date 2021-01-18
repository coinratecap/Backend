let coinAnalysisRepository = require('../services/coinanalysis');

exports.getCoinAnalysis = async (req, res) => {

    try {
        let { coinId } = req.params;
        let analysis = await coinAnalysisRepository.getAnalysisDetailsForCoin(coinId);
        res.status(200).json({
            data: analysis,
            status: true
        })

    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}

exports.addAnalysisForCoin = async (req, res) => {
    try {
        let payload = {
            coinId: req.params.coinId,
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

        console.log(req.body, req.params);

        let coinanalysis = await coinAnalysisRepository.addCoinAnalysis(payload)
        res.status(200).json({
            msg: "Coin analysis created",
            status: true,
            data: coinanalysis
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err, status: false })
    }
}

exports.updateCoinAnalysisDetails = async (req, res) => {
    try {
        let { coinId } = req.params;
        let updatedData = await coinAnalysisRepository.updateCoinAnalysis(req.body, coinId)
        res.status(200).json({
            msg: "Updated Coin analysis",
            status: true,
            data: updatedData
        })
    } catch (err) {
        res.status(400).json({ error: err, status: false })
    }
}