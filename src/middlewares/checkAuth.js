const {
    AppError
} = require('../utils/error')
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        var newToken = token.replace("Bearer ", "");
        const decoded = jwt.verify(newToken, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (err) {
        next(new AppError(`Authentification Failed`, 401))
    }
};