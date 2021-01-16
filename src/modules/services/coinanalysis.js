const CoinAnalysis = require("../models/CoinAnalysis");


exports.getAnalysisDetailsForCoin = async coin => {
    const analysis = await CoinAnalysis.find({
        coinId: coin
    });
    return analysis;
};

exports.addCoinAnalysis = async payload => {
    const analysis = await CoinAnalysis.create(payload);
    return analysis
}

exports.updateCoinAnalysis = async (payload, coinId) => {
    const analysis = await CoinAnalysis.findOneAndUpdate({
        coinId
    }, payload, { new: true });
    return analysis
}

