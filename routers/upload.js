const Router = require('koa-router')
const router = new Router()

const { head, excel } = require('../controllers/upload')

router
    .post('/head', head)
    .post('/excel', excel)

module.exports = router.routes()