const express = require("express");
const router = express.Router();
const homeCtrl = require("../controllers/admin/home");

/* GET home page. */
router.get("/", homeCtrl.home);
router.post("/addCoinToExchange", homeCtrl.addCoinToExchange);

module.exports = router;
