const momentjs = require('moment');
const { varify, decode } = require('../utils/jwt');
const staticUrl = require('../utils/static-url');
const { insertArticle, updateArticle, deleteArticle, queryCategoryById,
        queryAuthorCateArticles, queryAuthorArticles, queryCateArticles, queryArticles,
        queryAuthorCateArtNum, queryAuthorArtNum, queryCateArtNum, queryArtNum,
        queryArticleNum, queryArticleById, plusViewTime, plusThumb } = require('../lib/mysql');

/**
 * 新增文章
 */
exports.addArticleModel = async (ctx) => {
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { categoryId, title, poster, summary, content } = ctx.request.body;
    const categoryList = await queryCategoryById(categoryId);
    const author = decode(jwtToken).username;
    const moment = momentjs().format('YYYY-MM-DD');
    const pv = 0;
    const thumb = 0;
    const finalPoster = poster ? poster : staticUrl();
    await insertArticle([categoryId, categoryList[0].name, title, finalPoster, author, summary, content, moment, pv, thumb]);
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
    const { offset, limit, matchAuthor, categoryId }  = ctx.request.body;
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const author = decode(jwtToken) ? decode(jwtToken).username : null;
    let result;
    let count;
    try {
        if (matchAuthor && categoryId) {
            result = await queryAuthorCateArticles([author, categoryId, offset, limit]);
            count = await queryAuthorCateArtNum(author, categoryId);
        } else if (!matchAuthor && categoryId) {
            result = await queryCateArticles([categoryId, offset, limit]);
            count = await queryCateArtNum(categoryId);
        } else if (matchAuthor && !categoryId) {
            result = await queryAuthorArticles([author, offset, limit]);
            count = await queryAuthorArtNum(author);
        } else {
            console.log('查询全部');
            result = await queryArticles([offset, limit]);
            count = await queryArtNum();
        }
        ctx.success({ list: result, total: count[0].count }, 200);
    } catch (err) {
        ctx.error(err, 500);
    }
}

/**
 * 根据id查询文章
 */
exports.queryArticleByIdModel = async (ctx) => {
    const { id } = ctx.request.body;
    try {
        const res = await queryArticleById(id);
        ctx.success(res[0], 200);
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

/**
 * 增加浏览量
 */
exports.plusViewTimeModel = async (ctx) => {
    const { id } = ctx.request.body;
    try {
        await plusViewTime(id);
        ctx.success(null, 200);
    } catch (err) {
        console.log(err);
    }
}

/**
 * 点赞
 */
exports.thumbModel = async (ctx) => {
    const { id } = ctx.request.body;
    try {
        await plusThumb(id);
        ctx.success(null, 200);
    } catch (err) {
        console.log(err);
    }
}