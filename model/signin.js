const bcrypt = require('bcryptjs');
const { sign } = require('../utils/jwt');
const { findUserData } = require('../lib/mysql');

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const signinModel = async (ctx) => {
    const { username, password } = ctx.request.body;
    const doc = await findUserData(username);
    if (doc.length === 0) {
        ctx.body = {
            code: 500,
            message: '该用户不存在'
        }
    } else {
        if (comparePassword(password, doc[0].pass)) {
            const jwtToken = sign({
                username: doc[0].username,
                password: doc[0].pass,
                isAdmin: doc[0].is_admin,
                avatar: doc[0].avatar,
                moment: doc[0].moment
            });
            ctx.body = {
                code: 200,
                data: { token: jwtToken }
            }
        } else {
            ctx.body = {
                code: 500,
                message: '密码错误'
            }
        }
        
        
    }
}

module.exports = signinModel;
