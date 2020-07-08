const Router = require('koa-router')
const router = new Router()

const { getDemoList, addDemo, update } = require('../controllers/demo')


router
    .get('/', getDemoList)
    .post('/', addDemo)
    .post('/update', update)


module.exports = router.routes()