const express = require('express')
const adminController = require("../controllers/admin.controller");

const router = express.Router();

router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/", adminController.getAllAdmins)

module.exports = router;