const Router = require('koa-router')

const router = new Router()


router.get('/', (ctx) => {
    ctx.body = {
        code: 300
    }
})


module.exports = router.routes()