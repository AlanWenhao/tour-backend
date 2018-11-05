/**
 * 注册
 */
const Router = require('koa-router');
const signupModel = require('../model/signup');

const router = new Router();

router.post('/signup', signupModel);

module.exports = router;