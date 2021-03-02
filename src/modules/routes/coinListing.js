const express = require('express')
const coinListingController = require("../controllers/coinListing.controller");

const router = express.Router();

router.get("/", coinListingController.getCoinRates);

module.exports = router;