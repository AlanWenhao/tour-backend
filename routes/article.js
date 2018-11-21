/**
 * 增删改查文章
 */
const { addArticleModel }  = require('../model/article');
const varify = require('../middlewares/varify');

const Router = require('koa-router');
const model = require('../lib/mysql');

const router = new Router();

router.post('/addArticle', varify(false), addArticleModel);

module.exports = router;
