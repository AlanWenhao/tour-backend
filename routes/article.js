/**
 * 增删改查文章
 */
const { addArticleModel }  = require('../model/article');

const Router = require('koa-router');
const model = require('../lib/mysql');

const router = new Router();

router.post('/addArticle', addArticleModel);

module.exports = router;
