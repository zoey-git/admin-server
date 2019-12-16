const Router = require('koa-router')
const router = new Router()

const { head } = require('../controllers/upload')

router
    .post('/head', head)

module.exports = router.routes()