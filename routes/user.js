const Router = require('koa-router');
const varify = require('../middlewares/varify');
const { getUserListModel, changeAdminModel } = require('../model/user');

const router = new Router();

router.post('/getUserList', varify(true), getUserListModel);
router.post('/changeAdmin', varify(true), changeAdminModel);

module.exports = router;
