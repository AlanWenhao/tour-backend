const { varify, decode } = require('../utils/jwt');
const { insertArticle } = require('../lib/mysql');

exports.addArticleModel = async (ctx) => {
    // 权限验证
    try {
        await varify(ctx, false);
    } catch (err) {
        console.log('上传文章认证错误', err);
        return ctx.error(err);
    }

    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { categoryId, title, summary, content, moment } = ctx.request.body;
    const author = decode(jwtToken).username;
    const pv = 0;
    const thumb = 0;
    await insertArticle([categoryId, title, author, summary, content, moment, pv, thumb]);
    return ctx.success('');
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
