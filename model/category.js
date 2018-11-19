const { varify } = require('../utils/jwt');
const { insertCategory } = require('../lib/mysql');

exports.addCategoryModel = async (ctx) => {
    try {
        await varify(ctx, true);
    } catch (err) {
        console.log('category捕获的认证错误：', err);
        return ctx.body = { code: 500, message: err };
    }

    const { name } = ctx.request.body;
    try {
        await insertCategory([name]);
        ctx.body = { code: 200, data: '' };
    } catch(err) {
        ctx.body = { code: 500, message: err };
    }
}
