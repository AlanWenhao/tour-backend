const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/**
 * 生成token
 */
exports.sign = (payload) => {
    // see https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
    // default algorithm HS256
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: 3600
    });
}

/**
 * 解析token
 */
exports.decode = (token) => {
    return jwt.decode(token);
}
