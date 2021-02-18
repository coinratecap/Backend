const adminRepostory = require('../services/admin');
const { hash, compare } = require('../../utils/bcrypt')
const { sign } = require("../../utils/jwt")


exports.registerAdmin = async (req, res) => {

    try {
        let payload = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: await hash(req.body.password)
        }


        let admin = await adminRepostory.createAdmin(payload)
        res.status(200).json({
            msg: "Admin created",
            status: true,
            data: admin
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err, status: false })
    }
}

exports.loginAdmin = async (req, res, next) => {
    try {
        let {
            email,
            password
        } = req.body;

        console.log(email, password);
        let admin = await adminRepostory.getAdminByEmail(email);
        if (!admin) {
            res.status(400).json({ msg: `Wrong Login Details`, status: 400 })
        }
        let match = await compare(password, admin.password);
        if (match) {
            let token = await sign(admin);
            res.status(200).json({
                success: true,
                token: token,
                data: admin
            })
        } else {
            res.status(400).json({ msg: `Wrong Login Details`, status: 400 })
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err, status: false })
    }
}

exports.getAllAdmins = async (req, res) => {
    try {
        let admins = await adminRepostory.getAllAdmins();
        res.status(200).json({
            success: true,
            data: admins
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err, status: false })
    }
}