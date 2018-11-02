const Koa = require('koa');
const config = require('./config');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');

const app = new Koa();

app.use(async ctx => {
    ctx.body = 'hello';
});

app.use(signinRouter.routes());
app.use(signupRouter.routes());

app.listen(config.port, () => {
    console.log(`server is runing on http://${config.HOST}:${config.PORT}`);
});
