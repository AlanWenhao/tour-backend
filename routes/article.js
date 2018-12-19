/**
 * 增删改查文章
 */
const { addArticleModel, queryArticlesModel, deleteArticleModel, queryArticleByIdModel,
    plusViewTimeModel, thumbModel }  = require('../model/article');
const varify = require('../middlewares/varify');

const Router = require('koa-router');
const model = require('../lib/mysql');

const router = new Router();

router.post('/addArticle', varify(false), addArticleModel);
router.post('/deleteArticle', varify(false), deleteArticleModel);
router.post('/queryArticleById', queryArticleByIdModel);
router.post('/queryArticles', queryArticlesModel);

router.post('/plusViewTime', plusViewTimeModel);
router.post('/thumb', varify(false), thumbModel);

module.exports = router;
