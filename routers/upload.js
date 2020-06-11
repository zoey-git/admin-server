const Router = require('koa-router')
const router = new Router()

const { head, excel, orderExcel } = require('../controllers/upload')

router
    .post('/head', head)
    .post('/excel', excel)
    .post('/orderExcel', orderExcel)

module.exports = router.routes()