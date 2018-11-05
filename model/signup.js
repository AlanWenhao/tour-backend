const bcrypt = require('bcryptjs');
const moment = require('moment');
const { insertData } = require('../lib/mysql');

const signupModel = async (ctx) => {
    let { username, password, avatar, isAdmin } = ctx.request.body;
    console.log(typeof username, typeof password);
    bcrypt.genSalt((err, salt) => {
        if (err) return console.log('生成盐值出错', err);
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) console.log('hash加密出错:', err);
            password = hash;
            try {
                const result = await insertData([username, password, 'https://via.placeholder.com/150x150', '0', moment().format('YYYY-MM-DD HH:mm:ss')]);
                ctx.body = {
                    code: 200,
                    data: { username }
                }
                console.log(result);
            } catch (err) {
                console.log('数据库保存出错', err);
            }
        })
    })
}

module.exports = signupModel;
