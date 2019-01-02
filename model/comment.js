const momentjs = require('moment');
const { decode } = require('../utils/jwt');
const { addComment, getCommentsByid } = require('../lib/mysql');

exports.addCommentModel = async (ctx) => {
    console.log(ctx.request.body);
    const { content, articleId } = ctx.request.body;
    const jwtToken = ctx.headers.authorization; // 客户端发送的token
    const { username, avatar } = decode(jwtToken);
    const moment = momentjs().format('YYYY-MM-DD');
    const child = [];
    try {
        await addComment([username, avatar, articleId, content, moment, '[]']);
        ctx.success('评论成功', 200);
    } catch(err) {
        ctx.error(err, 500);
    }
}

exports.getCommentsModel = async (ctx) => {
    const { articleId } = ctx.request.body;
    try {
        const data = await getCommentsByid(articleId);
        ctx.success(data, 200);
    } catch(err) {  
        ctx.error(err, 500);
    }
}
