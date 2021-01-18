const express = require('express')
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/", adminController.getAllAdmins)

// TODO: We should talk about whether we create other routes or use here. 

router.post('/exchange/', homeCtrl.addExchange)
router.put('/exchange/:id', homeCtrl.updateEchange)
router.delete('/exchange/:id', homeCtrl.deleteExchange)

module.exports = router;
