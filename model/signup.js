const bcrypt = require('bcryptjs');
const moment = require('moment');
const { insertData, findUserData } = require('../lib/mysql');

const signupModel = async (ctx, next) => {
    let { username, password, avatar, isAdmin } = ctx.request.body;

    const sameUsers = await findUserData(username);
    if (sameUsers.length) {
        ctx.body = {
            code: 500,
            data: '该用户已经存在'
        }
    } else { // 加密密码并插入数据
        await new Promise((resolve, reject) => {
            bcrypt.genSalt((err, salt) => {
                if (err) return console.log('生成盐值出错', err);
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) return console.log('hash加密出错:', err);

                    let defaultAvatar = 'https://via.placeholder.com/150x150'
                    if (avatar) defaultAvatar = avatar;

                    try {
                        await insertData([username, hash, '0', defaultAvatar, moment().format('YYYY-MM-DD HH:mm:ss')]);
                        resolve();
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        })
        ctx.body = {
            code: 200,
            data: { username }
        }
    }

    
}

console.log(moment().format('YYYY-MM-DD HH:mm:ss'));

module.exports = signupModel;
