const express = require('express')
const coinAnalysisController = require("../controllers/coinanalysis.controller");

const router = express.Router();

router.get("/:coinId", coinAnalysisController.getCoinAnalysis);
router.post("/:coinId", coinAnalysisController.addAnalysisForCoin)
router.put("/update/:coinId", coinAnalysisController.updateCoinAnalysisDetails)

module.exports = router;