const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const server = require('koa-static');
const koaBody = require('koa-body');
const path = require('path');
const config = require('./config');

const ctxBodyMiddleWare = require('./middlewares/ctxBody');

const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const categoryRouter = require('./routes/category');
const articleRouter = require('./routes/article');
const commentRouter = require('./routes/comment');
const uploadRouter = require('./routes/upload');



const app = new Koa();
app.use(bodyParser());
app.use(ctxBodyMiddleWare);
app.use(server(path.join(__dirname, 'upload')));
// app.use(koaBody({
//     formidable: {
//         maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
//     }
// }));
app.use(cors());

app.use(signinRouter.routes());
app.use(signupRouter.routes());
app.use(categoryRouter.routes());
app.use(articleRouter.routes());
app.use(commentRouter.routes());
app.use(uploadRouter.routes());

app.listen(config.PORT, () => {
    console.log(`server is runing on http://${config.HOST}:${config.PORT}`);
});
