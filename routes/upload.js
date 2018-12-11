/**
 * 上传文件
 */
const koaBody = require('koa-body');
const { uploadModel } = require('../model/upload');
const varify = require('../middlewares/varify');

const Router = require('koa-router');

const router = new Router();

router.post('/upload', varify(), uploadModel);

module.exports = router;