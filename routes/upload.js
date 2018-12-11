/**
 * 上传文件
 */
const koaBody = require('koa-body');
const { uploadModel } = require('../model/upload');
const varify = require('../middlewares/varify');

const Router = require('koa-router');

const router = new Router();

router.post('/upload', koaBody({
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}), uploadModel);

module.exports = router;