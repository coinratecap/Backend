const express = require('express')
const coinController = require("../controllers/coin.controller");
const { getCoinPrice } = require('../services/coin')
const multer = require("../../config/multer");
const { response } = require('express');

const router = express.Router();

router.get("/", coinController.getAllCoins);
router.post("/add-coin", multer.upload.any(), coinController.createCoin);
router.get("/details/:id", coinController.getCoinById);
router.delete("/delete/:id", coinController.deleteCoin)
// router.put("/update/:id", multer.upload.any(), coinController.)

// this is for test-only purpose
router.get("/price", async (req, res, next) => {
    try {
        const price = await getCoinPrice()
        res.status(200).json(price.last)
    } catch (error) {
        next(error)
    }
})

module.exports = router;