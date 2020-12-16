const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/user/home');

/* GET home page. */
router.get('/', homeCtrl.home);

module.exports = router;