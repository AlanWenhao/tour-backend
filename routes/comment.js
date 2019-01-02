/**
 * 评论功能
 */
const Router = require('koa-router');
const varify = require('../middlewares/varify');
const { addCommentModel, getCommentsModel } = require('../model/comment');

const router = new Router();

router.post('/addComment', varify(false), addCommentModel);
router.post('/getComments', getCommentsModel);

module.exports = router;
