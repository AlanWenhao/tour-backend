const { insertCategory } = require('../lib/mysql');

exports.addCategoryModel = async (ctx) => {
    const { name } = ctx.request.body;
    try {
        const res = await insertCategory([name]);
        console.log(res);
    } catch(err) {
        return ctx.error(err);
    }
    console.log('走到了这里');
    ctx.success('');
    console.log('body之后');
}
