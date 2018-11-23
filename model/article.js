const { varify, decode } = require('../utils/jwt');
const { insertArticle, queryAllArticles, queryArticleNum, deleteArticle, updateArticle } = require('../lib/mysql');

exports.addArticleModel = async (ctx) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { categoryId, title, summary, content, moment } = ctx.request.body;
    const author = decode(jwtToken).username;
    const pv = 0;
    const thumb = 0;
    await insertArticle([categoryId, title, author, summary, content, moment, pv, thumb]);
    return ctx.success('添加文章成功', 200);
}

exports.updateArticleModel = async (ctx) => {
    const { title, summary, content, id } = ctx.request.body;
    try {
        await updateArticle([title, summary, content, id]);
    } catch (err) {
        return ctx.error(err, 500);
    }
    ctx.success('更新成功', 200);
}

exports.deleteArticleModel = async (ctx) => {
    const { id }  = ctx.request.body;
    try {
        await deleteArticle(id);
    } catch (err) {
        return ctx.error(err, 500);
    }
    ctx.success('删除成功', 200);
}

exports.queryAllArticlesModel = async (ctx) => {
    const { offset, limit }  = ctx.request.body;
    try {
        const result = await queryAllArticles([offset, limit]);
        const count = await queryArticleNum();
        ctx.success({ list: result, total: count[0].count }, 200);
    } catch (err) {
        return ctx.error(err, 500);
    }
}
