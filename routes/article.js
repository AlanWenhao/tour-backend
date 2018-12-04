/**
 * 增删改查文章
 */
const { addArticleModel, queryUserArticlesModel, queryAllArticlesModel, deleteArticleModel }  = require('../model/article');
const varify = require('../middlewares/varify');

const Router = require('koa-router');
const model = require('../lib/mysql');

const router = new Router();

router.post('/addArticle', varify(false), addArticleModel);
router.post('/deleteArticle', varify(false), deleteArticleModel);
router.post('/queryUserArticles', queryUserArticlesModel);
router.post('/queryAllArticles', queryAllArticlesModel);

module.exports = router;
