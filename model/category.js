const { insertCategory, deleteCategory, queryCategory, editCategory } = require('../lib/mysql');
const staticUrl = require('../utils/static-url');

/**
 * 新增分类
 */
exports.addCategoryModel = async (ctx) => {
    const { name } = ctx.request.body;
    const picture = staticUrl();
    const categoryArr = await queryCategory(name);
    if (categoryArr.length > 0) return ctx.error('该类目已存在', 400);
    try {
        const res = await insertCategory([name, picture]);
        console.log(res);
    } catch(err) {
        return ctx.error(err, 500);
    }
    ctx.success('');
}

/**
 * 删除分类
 */
exports.deleteCategoryModel = async (ctx) => {
    const { id } = ctx.request.body;
    try {
        const res = await deleteCategory(id);
        if (res.affectedRows === 0) {
            return ctx.error('删除失败，请核对id', 400);
        }
    } catch (err) {
        return ctx.error(err, 500);
    }
    ctx.success('删除成功', 200);
}

/**
 * 查询分类
 */
exports.queryCategoryModel = async (ctx) => {
    try {
        const res =  await queryCategory();
        console.log('查询到的分类', res);
        return ctx.success(res, 200);
    } catch (err) {
        console.log('查询捕获错误', err);
        return ctx.error(err, 500);
    }
}

exports.editCategoryModel = async (ctx) => {
    const { name, id } = ctx.request.body;
    try {
        const res = await editCategory([name, id]);
        if (res.affectedRows !== 1) return ctx.error('更改出错', 500);
    } catch (err) {
        console.log('修改类目出错：', err);
        return ctx.error('更改出错', 500);
    }
    ctx.success('更改成功', 200);
}
