/**
 * 登录
 */
const Router = require('koa-router');
const signinModel = require('../model/signin');
// const controller = require('');

const router = new Router();

router.post('/signin', signinModel);

module.exports = router;