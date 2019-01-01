/**
 * 增删改查文章类别
 */
const { addCategoryModel, deleteCategoryModel, queryCategoryModel, editCategoryModel } = require('../model/category');
const varify = require('../middlewares/varify');

const Router = require('koa-router');

const router = new Router();

router.post('/addCategory', varify(true),  addCategoryModel);
router.post('/deleteCategory', varify(true), deleteCategoryModel);
router.post('/queryCategory', queryCategoryModel);
router.post('/editCategory', varify(true), editCategoryModel);

module.exports = router;
