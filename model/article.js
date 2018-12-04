const { varify, decode } = require('../utils/jwt');
const { insertArticle, updateArticle, deleteArticle, queryAuthorArticles, queryArticles, queryArticleNum, 
        updateArticle } = require('../lib/mysql');

/**
 * 新增文章
 */
exports.addArticleModel = async (ctx) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { categoryId, title, summary, content, moment } = ctx.request.body;
    const author = decode(jwtToken).username;
    const pv = 0;
    const thumb = 0;
    await insertArticle([categoryId, title, author, summary, content, moment, pv, thumb]);
    return ctx.success('添加文章成功', 200);
}

/**
 * 修改文章
 */
exports.updateArticleModel = async (ctx) => {
    const { title, summary, content, id } = ctx.request.body;
    try {
        await updateArticle([title, summary, content, id]);
    } catch (err) {
        return ctx.error(err, 500);
    }
    ctx.success('更新成功', 200);
}

/**
 * 删除文章
 */
exports.deleteArticleModel = async (ctx) => {
    const { id }  = ctx.request.body;
    try {
        await deleteArticle(id);
    } catch (err) {
        return ctx.error(err, 500);
    }
    ctx.success('删除成功', 200);
}

/**
 * limit: 5
 * offset: 0
 * matchAuthor: true
 * categoryId: 1
 * 
 * 查询【用户】文章
 */
exports.queryArticlesModel = async (ctx) => {
    const { offset, limit, matchAuth, categoryId }  = ctx.request.body;
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const author = decode(jwtToken).username;
    let result;
    let count;
    try {
        if (matchAuth && categoryId) {
            result = await queryAuthorCateArticles([author, categoryId, offset, limit]);
            count = await queryAuthorCateArticleNum(author, categoryId);
        } else if (!matchAuth && categoryId) {
            result = await queryCateArticles([categoryId, offset, limit]);
            count = await queryCateArticleNum(categoryId);
        } else if (matchAuth && !categoryId) {
            result = await queryAuthorArticles([author, offset, limit]);
            count = await queryAuthorArticleNum(author);
        } else {
            result = await queryArticles([offset, limit]);
            count = await queryArticleNum();
        }

        ctx.success({ list: result, total: count[0].count }, 200);
    } catch (err) {
        ctx.error(err, 500);
    }

}

/**
 * 查询【所有】文章
 */
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
