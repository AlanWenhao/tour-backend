const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { insertData } = require('../lib/mysql');
const { SECRET_KEY } = require('../config');

const sign = (payload) => {
    // see https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
    // default algorithm HS256
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: 3600
    });
}

const varify = (mustAdmin) => (ctx) => {
    const { username, password, avatar, isAdmin } = ctx.request.body;
    bcrypt.genSalt((err, salt) => {
        if (err) return console.log(err);
        bcrypt.hash(password, salt, async (err, hash) => {
            password = hash;
            const result = await insertData([username, password, 'https://via.placeholder.com/150x150', 0, moment().format('YYYY-MM-DD HH:mm:ss')]);
            console.log('插入返回的结果是', result);
        })
    })
}

module.exports = {
    sign,
    varify
}
