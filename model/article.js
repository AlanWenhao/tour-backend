const { varify, decode } = require('../utils/jwt');
const { insertArticle } = require('../lib/mysql');

exports.addArticleModel = async (ctx) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { categoryId, title, summary, content, moment } = ctx.request.body;
    const author = decode(jwtToken).username;
    const pv = 0;
    const thumb = 0;
    await insertArticle([categoryId, title, author, summary, content, moment, pv, thumb]);
    return ctx.success('添加文章成功', 200);
}

exports.deleteArticle = async () => {
    try {
        await variry(ctx, false);
    } catch (err) {
        return ctx.error(err);
    }


}

exports.listArticle = async (ctx) => {
    
}
