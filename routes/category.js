/**
 * 增删改查文章类别
 */
const { addCategoryModel } = require('../model/category');

const Router = require('koa-router');
const model = require('../lib/mysql');

const router = new Router();

router.post('/addCategory', addCategoryModel);

module.exports = router;
