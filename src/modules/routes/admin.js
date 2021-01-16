const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/admin/home');

/* GET home page. */
router.get('/', homeCtrl.home);

// TODO: We should talk about whether we create other routes or use here. 

router.post('/exchange/', homeCtrl.addExchange)
router.put('/exchange/:id', homeCtrl.updateEchange)
router.delete('/exchange/:id', homeCtrl.deleteExchange)

module.exports = router;
