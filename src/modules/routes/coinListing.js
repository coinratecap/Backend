const express = require('express')
const coinListingController = require("../controllers/coinListing.controller");

const router = express.Router();

router.get("/", coinListingController.getCoinRates);
router.get("/trigger", coinListingController.triggerCoinDataFetchFromExchange);

module.exports = router;