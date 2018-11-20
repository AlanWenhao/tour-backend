const { varify } = require('../utils/jwt');
const { insertCategory } = require('../lib/mysql');

exports.addCategoryModel = async (ctx) => {
    try {
        await varify(ctx, true);
    } catch (err) {
        console.log('category捕获的认证错误：', err);
        return ctx.error(err);
    }

    const { name } = ctx.request.body;
    try {
        await insertCategory([name]);
        ctx.success('');
    } catch(err) {
        ctx.error(err);
    }
}
