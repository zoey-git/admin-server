const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const body = require('koa-body')
const static = require('koa-static')
const { IGNORE_ROUTERS, TOKEN_KEY, HOST } = require('./config/index')
const { checkToken } = require('./utils/index')
const menu = require('./routers/menu')
const user = require('./routers/user')
const role = require('./routers/role')
const upload = require('./routers/upload')
const path = require('path')
const session = require('koa-session')
const app = new Koa()


const router = new Router()

router.use('/menu', menu)
router.use('/user', user)
router.use('/role', role)
router.use('/upload', upload)

app.use(body({
    multipart: true,
    strict:false,
    formidable: {
        maxFileSize: 200 * 1024 * 1024   
    }
}))

app.keys = ['some secret hurr']
app.use(session({
    httpOnly: true
}, app))

app.use(checkToken(TOKEN_KEY, IGNORE_ROUTERS))
app.use(router.routes())

app.use(static(path.join(__dirname, './public')));

app.use(async (ctx, next) => {
    next()
    if (ctx.status === 404) {
        return ctx.body = {
            code: 404,
            msg: '404'
        }
    }
})


app.listen(HOST, () => {
    console.log(`[demo] route-use-middleware is starting at port ${HOST}`)
})