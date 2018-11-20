const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { insertData } = require('../lib/mysql');
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

exports.decode = (token) => {
    return jwt.decode(token);
}

exports.varify = (ctx, mustAdmin) => new Promise((resolve, reject) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    if (jwtToken) {
        jwt.verify(jwtToken, SECRET_KEY, (err, payload) => {
            if (err) { // 1、token被篡改。2、token过期
                console.log('第一个错误', err);
                if (err.name === 'TokenExpiredError') {
                    reject('token过期');
                } else {
                    reject('无效的token');
                }
            } else {
                if (mustAdmin) {
                    const { isAdmin } = payload;
                    if (Number(isAdmin)) resolve();
                    else reject('没有权限');
                } else {
                    resolve();
                }
            }
        });
    } else {
        reject('请提供token');
    }
});
