const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const config = require('./config');

const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');

const app = new Koa();
app.use(cors());
app.use(bodyParser());

app.use(signinRouter.routes());
app.use(signupRouter.routes());

app.listen(config.PORT, () => {
    console.log(`server is runing on http://${config.HOST}:${config.PORT}`);
});
