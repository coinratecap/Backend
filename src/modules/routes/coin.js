const express = require('express')
const coinController = require("../controllers/coin.controller");
const multer = require("../../config/multer")

const router = express.Router();

router.get("/", coinController.getAllCoins);
router.post("/add-coin", multer.upload.any(), coinController.createCoin);
router.get("/details/:id", coinController.getCoinById);
router.delete("/delete/:id", coinController.deleteCoin)
// router.put("/update/:id", multer.upload.any(), coinController.)

module.exports = router;