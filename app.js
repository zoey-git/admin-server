const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const menu = require('./routers/menu')
const user = require('./routers/user')

const app = new Koa()


const router = new Router()

router.use('/menu', menu)
router.use('/user', user)

app.use(bodyParser())
app.use(router.routes())

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})