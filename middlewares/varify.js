const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRET_KEY } = require('../config');

const jwtVerify = promisify(jwt.verify);

module.exports = (mustAdmin) => async (ctx, next) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    if (jwtToken) {
        try {
            const  payload = await jwtVerify(jwtToken, SECRET_KEY);
            if (mustAdmin) {
                const { isAdmin } = payload;
                if (Number(isAdmin)) {
                    await next();
                } else {
                    return ctx.error('没有权限', 400);
                }
            } else {
                await next();
            }
        } catch (err) {
            console.log('错误', err);
            if (err.name === 'TokenExpiredError')  return ctx.error('登录过期，请重新登录', 401);
            else return ctx.error('无效token', 401);
        }
    } else {
        return ctx.error('请登录后操作', 401);
    }
}
