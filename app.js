const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const resBodyMiddware = require('./middlewares/methods');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');

const app = new Koa();

app.use(bodyParser());
// app.use(resBodyMiddware());

app.use(signinRouter.routes());
app.use(signupRouter.routes());

app.listen(config.PORT, () => {
    console.log(`server is runing on http://${config.HOST}:${config.PORT}`);
});
