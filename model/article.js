const { varify } = require('../utils/jwt');
const insertArticle = require('../lib/mysql');

exports.addArticleModel = async (ctx) => {
    await varify(false);
    const { categoryId, title, summary, content, moment } = ctx.request.body;
    const author = '';
    const pv = 0;
    const thumb = 0;
    await insertArticle([categoryId, title, author, summary, content, moment, pv, thumb]);
    ctx.body = { code: 200, data: '' };
}
