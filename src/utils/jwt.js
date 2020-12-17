const jwt = require('jsonwebtoken')


let sign = (payload, expiresIn = '240h') => {
    return jwt.sign({
        data: payload,
    }, process.env.JWT_SECRET, {
        expiresIn
    })

};

let verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    sign,
    verify
}