const express = require('express')
const exchangesController = require("../controllers/exchange.controller");

const router = express.Router();

router.get("/all", exchangesController.getAllExchanges);

module.exports = router;