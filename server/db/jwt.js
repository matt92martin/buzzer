const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../../config')

const jwtSign = (obj) => {
    return new Promise((res, rej) => {
        jwt.sign(obj, jwtSecret, { expiresIn: '7d' }, function (err, token) {
            if (err) {
                return rej('Error')
            }
            res(token)
        })
    })
}

const jwtVerify = (token) => {
    return new Promise((res, rej) => {
        jwt.verify(token, jwtSecret, function (err, decoded) {
            if (err) {
                return rej('Error')
            }
            res(decoded)
        })
    })
}

module.exports = {
    jwtSign,
    jwtVerify,
}
